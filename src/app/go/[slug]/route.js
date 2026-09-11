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

import { insert, upsert, selectOne, sbReady } from '@/lib/tracking/sb.js';
import { isUuid } from '@/lib/tracking/identity.js';
import { isBotUa } from '@/lib/tracking/bot.js';
import { readCookies, headerOf, geoOf, userAgentOf, clientIp, isIp } from '@/lib/tracking/http.js';

export const dynamic = 'force-dynamic';

const HOME = 'https://www.alegriamusic.net/';
const SLUG_RE = /^[a-z0-9][a-z0-9-]{1,48}$/;
const TWO_YEARS = 63072000;
const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];

export async function GET(request, ctx) {
  const params = ctx && ctx.params ? await ctx.params : {};
  const slug = String(params.slug || '').trim().toLowerCase();

  const headers = new Headers({
    'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
    'X-Robots-Tag': 'noindex, nofollow',
  });

  if (!SLUG_RE.test(slug) || !sbReady()) return redirect(HOME, headers);

  const link = await selectOne(
    'cc_links',
    'slug=eq.' + encodeURIComponent(slug) + '&active=is.true&select=id,slug,destination,utm_source,utm_medium,utm_campaign,utm_content,utm_term&limit=1'
  );
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
  const cookies = readCookies(request);
  let vid = isUuid(cookies.tv) ? cookies.tv : '';
  if (!vid) {
    vid = crypto.randomUUID();
    headers.append('Set-Cookie', `tv=${vid}; Path=/; Max-Age=${TWO_YEARS}; SameSite=Lax; Secure`);
  }

  const ua = userAgentOf(request);
  const isBot = isBotUa(ua);
  const ip = clientIp(request) || '';
  const now = new Date().toISOString();

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
    const r = await insert('cc_link_clicks', click, { returning: 'minimal' });
    if (!r.ok) console.error('go: click insert failed', r.error, r.message);
  } catch (e) {
    console.error('go: unexpected', e && e.message);
  }

  return redirect(dest.toString(), headers);
}

function redirect(to, headers) {
  headers.set('Location', to);
  return new Response(null, { status: 302, headers });
}
