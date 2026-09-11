// POST /api/t/event   { vid, event_uuid, type, url, ...payload }
//
// The single write path for everything /t.js observes. It does four jobs:
//   1. filter bots, so Victor's channel table is not 30 percent Lighthouse
//   2. sessionize, 30-minute inactivity gap, the same window GA4 uses
//   3. open ONE touch per session, carrying the landing capture
//   4. store the raw event
//
// It answers 204 with no body. Nothing the browser does depends on the reply, and
// a tracker that makes a page wait for its own analytics is a tracker that gets
// blamed for a slow funnel.
//
// Ported from the kit's api/t/event.js onto a Web Request. One addition: the
// tl=<slug> query param that /go/<slug> appends is captured as link_slug on the
// session and the touch, which is what cc_link_stats joins on.

import { insert, upsert, update, selectOne, isDuplicate, sbReady } from '@/lib/tracking/sb.js';
import { classifyChannel } from '@/lib/tracking/channel.js';
import { isUuid, stitchByAcContact } from '@/lib/tracking/identity.js';
import { isBotUa } from '@/lib/tracking/bot.js';
import { readCookies, readJson, json, empty, geoOf, userAgentOf } from '@/lib/tracking/http.js';

export const dynamic = 'force-dynamic';

const SESSION_GAP_MS = 30 * 60 * 1000;
const MAX_PAYLOAD_BYTES = 8 * 1024;
const TYPES = ['page_view', 'page_close', 'video', 'cta_click', 'email_click', 'custom'];
const SLUG_RE = /^[a-z0-9][a-z0-9-]{1,48}$/;

export async function POST(request) {
  const { body, tooLarge } = await readJson(request, MAX_PAYLOAD_BYTES);
  if (tooLarge) return empty(413);
  const b = body || {};

  const cookies = readCookies(request);
  const vid = isUuid(b.vid) ? b.vid : (isUuid(cookies.tv) ? cookies.tv : '');
  const eventUuid = isUuid(b.event_uuid) ? b.event_uuid : '';
  const type = TYPES.includes(b.type) ? b.type : '';
  if (!vid || !eventUuid || !type) return json({ ok: false, error: 'bad_request' }, 400);

  if (!sbReady()) return empty(204);

  const ua = userAgentOf(request);
  const isBot = isBotUa(ua);
  const now = new Date();
  const nowIso = now.toISOString();
  const geo = geoOf(request);

  try {
    // Visitor row first: every other insert has an FK to it.
    await upsert(
      'cc_visitors',
      { id: vid, user_agent: ua || null, last_seen_at: nowIso, is_bot: isBot, geo },
      'id',
      { returning: 'minimal' }
    );

    const session = await resolveSession({ vid, body: b, type, ua, geo, isBot, now });

    const writes = [
      insert(
        'cc_events',
        {
          event_uuid: eventUuid,
          visitor_id: vid,
          session_id: session ? session.id : null,
          person_id: session ? session.person_id || null : null,
          type,
          url: str(b.url, 1000),
          payload: eventPayload(b, type),
          ts: nowIso,
        },
        { returning: 'minimal' }
      ),
    ];

    if (session) {
      const patch = { last_seen_at: nowIso };
      if (type === 'page_view' && !session.__created) {
        patch.page_views = (Number(session.page_views) || 0) + 1;
      }
      if (type === 'page_close') {
        const scroll = intOrNull(b.max_scroll);
        if (scroll != null) patch.max_scroll = Math.max(scroll, Number(session.max_scroll) || 0);
        const t = intOrNull(b.time_on_page_ms);
        if (t != null) patch.time_on_site_ms = (Number(session.time_on_site_ms) || 0) + t;
      }
      writes.push(update('cc_sessions', 'id=eq.' + session.id, patch, { returning: 'minimal' }));
    }

    // The AC stitch is the one leg that talks to a third party. It runs alongside
    // the writes rather than after them so a slow AC never pushes this past 1.5s.
    const acId = str(b.ac, 40);
    if (acId) writes.push(stitchByAcContact(vid, acId));

    const settled = await Promise.allSettled(writes);
    const evt = settled[0];
    if (evt.status === 'fulfilled' && evt.value && !evt.value.ok && !isDuplicate(evt.value)) {
      console.error('t/event: insert failed', evt.value.error, evt.value.message);
    }
  } catch (e) {
    console.error('t/event: unexpected', e && e.message);
  }

  return empty(204);
}

// Reuse the live session, or open a new one from the landing capture.
async function resolveSession(ctx) {
  const { vid, body, type, ua, geo, isBot, now } = ctx;
  const cutoff = new Date(now.getTime() - SESSION_GAP_MS).toISOString();

  const live = await selectOne(
    'cc_sessions',
    'visitor_id=eq.' + vid + '&last_seen_at=gte.' + cutoff +
      '&select=id,person_id,page_views,max_scroll,time_on_site_ms,channel&order=last_seen_at.desc&limit=1'
  );
  if (live) return live;

  const cls = classifyChannel({
    url: body.url,
    referrer: body.referrer,
    utm_source: body.utm_source,
    utm_medium: body.utm_medium,
    fbclid: body.fbclid,
    gclid: body.gclid,
    gbraid: body.gbraid,
    wbraid: body.wbraid,
    ttclid: body.ttclid,
    msclkid: body.msclkid,
    ac: body.ac,
  });

  // Tracking link slug. Validated against the same pattern cc_links enforces,
  // so a crafted ?tl= can never write junk into a join column.
  const tl = str(body.tl, 50);
  const linkSlug = tl && SLUG_RE.test(tl) ? tl : null;

  const row = {
    visitor_id: vid,
    started_at: now.toISOString(),
    last_seen_at: now.toISOString(),
    landing_url: str(body.url, 1000),
    landing_path: str(body.path, 300),
    referrer: str(body.referrer, 1000),
    utm_source: str(body.utm_source, 200),
    utm_medium: str(body.utm_medium, 200),
    utm_campaign: str(body.utm_campaign, 200),
    utm_term: str(body.utm_term, 200),
    utm_content: str(body.utm_content, 200),
    fbclid: str(body.fbclid, 512),
    gclid: str(body.gclid, 512),
    gbraid: str(body.gbraid, 512),
    wbraid: str(body.wbraid, 512),
    ttclid: str(body.ttclid, 512),
    msclkid: str(body.msclkid, 512),
    ac_contact_id: str(body.ac, 40),
    link_slug: linkSlug,
    channel: cls.channel,
    is_paid: cls.is_paid,
    device: {
      ua: ua || null,
      screen: str(body.screen, 24),
      viewport: str(body.viewport, 24),
      tz: str(body.tz, 60),
      lang: str(body.lang, 20),
      mobile: Boolean(body.mobile),
      fbp: str(body.fbp, 120),
      fbc: str(body.fbc, 400),
    },
    geo,
    is_bot: isBot,
    page_views: type === 'page_view' ? 1 : 0,
  };

  const ins = await insert('cc_sessions', row);
  if (!ins.ok || !Array.isArray(ins.data) || !ins.data[0]) {
    console.error('t/event: session insert failed', ins.error, ins.message);
    return null;
  }
  const created = ins.data[0];
  created.__created = true;

  // A self-referral carries no new source, so it must not open a touch that would
  // later take last-touch credit away from the ad that actually did the work.
  // Bots never get a touch either: they would otherwise inflate every channel.
  // A tracking link click is new information even when the referrer is our own
  // host (a /go/ link on the site itself), so it always opens a touch.
  if ((!cls.self_referral || linkSlug) && !isBot) {
    const touch = await insert(
      'cc_touches',
      {
        session_id: created.id,
        visitor_id: vid,
        person_id: created.person_id || null,
        channel: cls.channel,
        source_system: cls.source_system,
        campaign: row.utm_campaign,
        adset: row.utm_term,
        ad: row.utm_content,
        is_paid: cls.is_paid,
        click_id: cls.click_id,
        click_id_type: cls.click_id_type,
        link_slug: linkSlug,
        touch_time: row.started_at,
      },
      { returning: 'minimal' }
    );
    if (!touch.ok && !isDuplicate(touch)) console.error('t/event: touch insert failed', touch.error, touch.message);
  }

  return created;
}

// Only the fields that belong to this event type. The landing capture already
// lives on the session, so repeating it on every row would triple the table.
function eventPayload(body, type) {
  const p = {};
  if (type === 'page_view') {
    p.path = str(body.path, 300);
    p.referrer = str(body.referrer, 1000);
    p.title = str(body.title, 300);
  } else if (type === 'page_close') {
    p.max_scroll = intOrNull(body.max_scroll);
    p.time_on_page_ms = intOrNull(body.time_on_page_ms);
  } else if (type === 'video') {
    p.video_id = str(body.video_id, 200);
    p.action = str(body.action, 30);
    p.percent = intOrNull(body.percent);
  } else if (type === 'cta_click') {
    p.name = str(body.name, 200);
    p.href = str(body.href, 1000);
  } else {
    p.name = str(body.name, 200);
  }
  if (body.payload && typeof body.payload === 'object') p.extra = body.payload;
  for (const k of Object.keys(p)) if (p[k] == null) delete p[k];
  return Object.keys(p).length ? p : null;
}

function str(v, max) { return typeof v === 'string' && v.trim() ? v.trim().slice(0, max) : null; }
function intOrNull(v) { const n = parseInt(v, 10); return Number.isFinite(n) ? n : null; }
