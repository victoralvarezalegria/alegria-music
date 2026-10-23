// GET /go/<slug>   ->  302 to the link's destination, tagged
//
// Tracking links (HYROS-style short links) on Victor's own domain. A slug row
// in cc_links says where it goes and which UTMs to stamp on. This route:
//   1. reads the link (active only; unknown or paused -> the home page)
//   2. makes sure the visitor has a tv cookie (mints one when absent, same
//      string /api/t/init uses, so the click and every later page share an id)
//   3. writes one cc_link_clicks row, bot-flagged, never blocking the redirect
//   4. 302s to destination + the link's UTMs + tl=<slug>
//
// tl=<slug> is what ties the click to the session /t.js opens on the landing
// page: /api/t/event copies it to cc_sessions.link_slug and cc_touches.link_slug,
// and cc_link_stats joins on it. The destination may be off-domain (skool.com,
// YouTube); tl is appended there too, harmlessly, so the same link can be
// swapped to an on-domain page later without changing anything else.
//
// 302, not 301: a permanent redirect gets cached by the browser and the click
// row stops being written. Cache-Control no-store for the same reason.
//
// 2026-10-23 (attribution finish):
//   - tl_first / tl_last (slug) and tc_first / tc_last (the cc_link_clicks id,
//     our click id) are set as first-party cookies on THIS response, 90 days.
//     The EU consent banner can stop t.js from loading on /watch, but it cannot
//     un-set a cookie the redirect already wrote, so the opt-in and booking
//     routes still know which link sent the person. tl_first is never replaced.
//   - the destination also carries tc=<click id> so the landing page has it.
//   - fail loud: when the tracking DB is not configured or not answering, the
//     link no longer dumps people on the home page. It sends them to the
//     funnel (GO_FALLBACK_URL, default /watch) with tl=<slug>, still sets the
//     cookies, and says X-Tracking: off. An unknown or paused slug still goes home.

import { insert, upsert, select, sbReady } from '@/lib/tracking/sb.js';
import { isUuid } from '@/lib/tracking/identity.js';
import { isBotUa } from '@/lib/tracking/bot.js';
import { readCookies, headerOf, geoOf, userAgentOf, clientIp, isIp } from '@/lib/tracking/http.js';
import { goCookies } from '@/lib/tracking/source.js';

export const dynamic = 'force-dynamic';

const HOME = 'https://www.alegriamusic.net/';
const SLUG_RE = /^[a-z0-9][a-z0-9-]{1,48}$/;
const TWO_YEARS = 63072000;
const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];
// Where a link goes when the tracking DB cannot say. All live links point at
// /watch (audit 2026-10-23), so that is the safe default.
const FALLBACK = () => process.env.GO_FALLBACK_URL || 'https://www.alegriamusic.net/watch';

export async function GET(request, ctx) {
  const params = ctx && ctx.params ? await ctx.params : {};
  const slug = String(params.slug || '').trim().toLowerCase();

  const headers = new Headers({
    'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
    'X-Robots-Tag': 'noindex, nofollow',
  });

  if (!SLUG_RE.test(slug)) return redirect(HOME, headers);

  const cookies = readCookies(request);
  if (!sbReady()) return fallback(slug, cookies, headers, 'not_configured');

  const found = await select(
    'cc_links',
    'slug=eq.' + encodeURIComponent(slug) + '&active=is.true&select=id,slug,destination,utm_source,utm_medium,utm_campaign,utm_content,utm_term&limit=1'
  );
  if (!found.ok) {
    console.error('go: cc_links read failed, sending to fallback', found.status, found.error, found.message);
    return fallback(slug, cookies, headers, 'db_error');
  }
  const link = Array.isArray(found.data) ? found.data[0] : null;
  if (!link || !link.destination) return redirect(HOME, headers);

  let dest;
  try { dest = new URL(link.destination); } catch { return redirect(HOME, headers); }
  if (dest.protocol !== 'https:' && dest.protocol !== 'http:') return redirect(HOME, headers);
  for (const k of UTM_KEYS) {
    const v = link[k];
    if (typeof v === 'string' && v.trim() && !dest.searchParams.has(k)) dest.searchParams.set(k, v.trim().slice(0, 200));
  }
  dest.searchParams.set('tl', slug);

  // Cookie first, then mint. The same header string /api/t/init sets, so the
  // landing page's t.js finds a valid cookie and never calls init for a new one.
  let vid = isUuid(cookies.tv) ? cookies.tv : '';
  if (!vid) {
    vid = crypto.randomUUID();
    headers.append('Set-Cookie', `tv=${vid}; Path=/; Max-Age=${TWO_YEARS}; SameSite=Lax; Secure`);
  }

  const ua = userAgentOf(request);
  const isBot = isBotUa(ua);
  const ip = clientIp(request) || '';
  const now = new Date().toISOString();
  let clickId = '';

  try {
    // Visitor row first so the click can carry the id; the FK on sessions and
    // events points here too, and a minted id must exist before t.js posts.
    const visitor = { id: vid, user_agent: ua || null, last_seen_at: now, is_bot: isBot, geo: geoOf(request) };
    if (isIp(ip)) visitor.first_ip = ip;
    await upsert('cc_visitors', visitor, 'id', { returning: 'minimal' });

    const click = {
      link_id: link.id,
      slug,
      visitor_id: vid,
      user_agent: ua || null,
      referrer: headerOf(request, 'referer').slice(0, 1000) || null,
      geo: geoOf(request),
      is_bot: isBot,
      ts: now,
    };
    if (isIp(ip)) click.ip = ip;
    // returning=representation for the id: that row id IS the click id that
    // rides along in tc_* cookies, ?tc= and the Calendly link.
    const r = await insert('cc_link_clicks', click, { returning: 'representation' });
    if (!r.ok) console.error('go: click insert failed', r.error, r.message);
    else if (Array.isArray(r.data) && r.data[0] && r.data[0].id != null) clickId = String(r.data[0].id);
  } catch (e) {
    console.error('go: unexpected', e && e.message);
  }

  if (clickId) dest.searchParams.set('tc', clickId);
  for (const c of goCookies(cookies, slug, clickId)) headers.append('Set-Cookie', c);
  return redirect(dest.toString(), headers);
}

// Tracking is off or the DB did not answer: still land the person on the
// funnel with the slug, and keep the slug in first-party cookies.
function fallback(slug, cookies, headers, why) {
  let dest;
  try { dest = new URL(FALLBACK()); } catch { dest = new URL('https://www.alegriamusic.net/watch'); }
  dest.searchParams.set('tl', slug);
  for (const c of goCookies(cookies, slug, '')) headers.append('Set-Cookie', c);
  headers.set('X-Tracking', 'off; ' + why);
  return redirect(dest.toString(), headers);
}

function redirect(to, headers) {
  headers.set('Location', to);
  return new Response(null, { status: 302, headers });
}
