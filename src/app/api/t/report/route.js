// GET /api/t/report?view=summary|roas|journey|live|unmerged|links[&days=7|30|90][&email=]
//   header x-report-secret: <CC_REPORT_SECRET>
//
// The read side. Everything here is Victor's revenue, his ad spend and his
// leads' email addresses, so it is gated. The gate today is a shared secret in
// a header: the dashboard (victor-alegria-music.vercel.app, a different Vercel
// project) will call this server-to-server from its own API route, which holds
// the secret and runs its own login check in front of it. Nothing in a browser
// ever sees the secret.
//
// Ported from the kit's api/t/report.js onto a Web Request. One addition: the
// `links` view, cc_link_stats(p_days), for the Links tab.

import { timingSafeEqual } from 'node:crypto';
import { select, selectOne, rpc, sbReady } from '@/lib/tracking/sb.js';
import { findUnmerged, isUuid, normalizeEmail } from '@/lib/tracking/identity.js';
import { headerOf, json } from '@/lib/tracking/http.js';

export const dynamic = 'force-dynamic';

const HDRS = { 'X-Robots-Tag': 'noindex, nofollow', 'Referrer-Policy': 'no-referrer' };

export async function GET(request) {
  const secret = process.env.CC_REPORT_SECRET;
  if (!secret) return json({ ok: false, error: 'not_configured' }, 500, HDRS);
  const given = headerOf(request, 'x-report-secret');
  if (!constantEquals(given, secret)) return json({ ok: false, error: 'unauthorized' }, 401, HDRS);

  if (!sbReady()) return json({ ok: false, error: 'no_credentials' }, 500, HDRS);

  let q;
  try { q = new URL(request.url).searchParams; } catch { q = new URLSearchParams(); }
  const view = String(q.get('view') || 'summary');

  // ?days=7|30|90. Anything else, including no value at all, means all time.
  // Whitelisted rather than parsed freely: the value reaches a SQL function, and
  // "only these three" is a rule that cannot be argued with later.
  const ALLOWED_DAYS = [7, 30, 90];
  const rawDays = parseInt(q.get('days') || '', 10);
  const days = ALLOWED_DAYS.includes(rawDays) ? rawDays : null;

  try {
    // summary and roas both come out of one cc_report call, so a dashboard that
    // wants both for the same window pays for one query per view rather than
    // re-deriving the window twice.
    if (view === 'summary' || view === 'roas') {
      const r = await rpc('cc_report', { p_days: days });
      if (!r.ok) {
        console.error('t/report: cc_report failed', r.error, r.message);
        return json({ ok: false, error: 'report_failed' }, 502, HDRS);
      }
      const payload = Array.isArray(r.data) ? r.data[0] : r.data;
      const rows = (payload && payload[view]) || [];
      return json({ ok: true, view, days, rows }, 200, HDRS);
    }

    if (view === 'links') {
      const r = await rpc('cc_link_stats', { p_days: days });
      if (!r.ok) {
        console.error('t/report: cc_link_stats failed', r.error, r.message);
        return json({ ok: false, error: 'report_failed' }, 502, HDRS);
      }
      return json({ ok: true, view, days, rows: rowsOf(r) }, 200, HDRS);
    }

    if (view === 'live') {
      const since = new Date(Date.now() - 86400000).toISOString();
      const r = await select(
        'cc_sessions',
        'select=id,visitor_id,person_id,started_at,last_seen_at,channel,is_paid,landing_path,geo,page_views,is_bot,utm_campaign,utm_content,link_slug' +
          '&started_at=gte.' + since + '&order=started_at.desc&limit=500'
      );
      const rows = rowsOf(r);
      // One extra read for the names, rather than one per row.
      const ids = [...new Set(rows.map((s) => s.person_id).filter(Boolean))];
      const emails = await emailsByPersonId(ids);
      return json({
        ok: true,
        view,
        rows: rows.map((s) => Object.assign({}, s, { email: emails.get(s.person_id) || null })),
      }, 200, HDRS);
    }

    if (view === 'unmerged') {
      // Flattened to the two emails the page actually renders. The full person
      // objects stay out of the response: this is a "are these the same human"
      // glance, and the journey view is where you go to decide.
      const groups = await findUnmerged(90);
      const rows = groups.map((g) => {
        const a = g.persons[0] || {};
        const b = g.persons[1] || {};
        return {
          visitor_id: g.visitor_id,
          email_a: a.email || null,
          email_b: b.email || null,
          sources: g.sources || [],
          linked_at: g.linked_at || a.created_at || null,
          extra: g.persons.length > 2 ? g.persons.length - 2 : 0,
        };
      });
      return json({ ok: true, view, rows }, 200, HDRS);
    }

    if (view === 'journey') {
      const target = normalizeEmail(q.get('email'));
      if (!target) return json({ ok: false, error: 'email_required' }, 400, HDRS);
      const person = await selectOne('cc_persons', 'email=eq.' + encodeURIComponent(target) + '&select=*&limit=1');
      if (!person) return json({ ok: false, error: 'not_found' }, 404, HDRS);

      const pid = person.id;
      const [links, sessions, touches, events, conversions, firstSource] = await Promise.all([
        select('cc_visitor_person_links', 'person_id=eq.' + pid + '&select=*&order=linked_at.asc'),
        select('cc_sessions', 'person_id=eq.' + pid + '&select=*&order=started_at.asc&limit=200'),
        select('cc_touches', 'person_id=eq.' + pid + '&select=*&order=touch_time.asc&limit=200'),
        select('cc_events', 'person_id=eq.' + pid + '&select=id,event_uuid,session_id,type,url,payload,ts&order=ts.desc&limit=200'),
        select('cc_conversions', 'person_id=eq.' + pid + '&select=*&order=occurred_at.asc'),
        select('cc_person_first_source', 'person_id=eq.' + pid + '&select=*&limit=1'),
      ]);

      const touchList = rowsOf(touches);
      const bySession = new Map();
      for (const t of touchList) bySession.set(t.session_id, t);

      return json({
        ok: true,
        view,
        person,
        first_source: rowsOf(firstSource)[0] || null,
        links: rowsOf(links),
        sessions: rowsOf(sessions).map((s) => Object.assign({}, s, { touch: bySession.get(s.id) || null })),
        events: rowsOf(events),
        conversions: rowsOf(conversions),
      }, 200, HDRS);
    }

    return json({ ok: false, error: 'unknown_view' }, 400, HDRS);
  } catch (e) {
    console.error('t/report: unexpected', e && e.message);
    return json({ ok: false, error: 'unexpected' }, 500, HDRS);
  }
}

function rowsOf(r) {
  return r && r.ok && Array.isArray(r.data) ? r.data : [];
}

async function emailsByPersonId(ids) {
  const out = new Map();
  if (!ids.length) return out;
  const valid = ids.filter(isUuid);
  if (!valid.length) return out;
  const r = await select('cc_persons', 'id=in.(' + valid.join(',') + ')&select=id,email&limit=500');
  for (const p of rowsOf(r)) out.set(p.id, p.email);
  return out;
}

function constantEquals(a, b) {
  const ab = Buffer.from(String(a), 'utf8');
  const bb = Buffer.from(String(b), 'utf8');
  if (ab.length !== bb.length) return false;
  return timingSafeEqual(ab, bb);
}
