// POST /api/t/init  ->  { vid }
//
// Issues the first-party visitor cookie. First-party is the entire point: a
// cookie set by a response on Victor's own domain survives Safari's third-party
// blocking, where an ad platform's own identifiers do not.
//
// The cookie is NOT HttpOnly, on purpose. /t.js reads it to attach the visitor
// id to form posts and to the Calendly utm_content field, and nothing secret
// ever lives in it: it is a random uuid whose meaning exists only in a table
// the browser cannot reach.
//
// It also mints _fbc from a fresh fbclid when Meta's own pixel has not yet. Meta
// accepts fb.1.<timestamp>.<fbclid> from the server, and having it on the very
// first request is what lets a Purchase three weeks later still match the ad.
//
// Ported from the kit's api/t/init.js onto a Web Request. Same validation, same
// cookie string, same precedence (cookie, then localStorage mirror, then new).

import { upsert, sbReady } from '@/lib/tracking/sb.js';
import { readCookies, readJson, json, geoOf, userAgentOf, clientIp, isIp } from '@/lib/tracking/http.js';
import { isUuid } from '@/lib/tracking/identity.js';

export const dynamic = 'force-dynamic';

const TWO_YEARS = 63072000;
const NINETY_DAYS = 7776000;

export async function POST(request) {
  const { body } = await readJson(request, 8 * 1024);
  const b = body || {};
  const cookies = readCookies(request);

  // Cookie wins, then the client's localStorage mirror, then a fresh id. The
  // mirror matters on iOS, where a 7-day cap can evict the cookie from under a
  // visitor who is still the same person on the same laptop.
  let vid = '';
  if (isUuid(cookies.tv)) vid = cookies.tv;
  else if (isUuid(b.vid)) vid = b.vid;
  else vid = crypto.randomUUID();

  const setCookies = [
    `tv=${vid}; Path=/; Max-Age=${TWO_YEARS}; SameSite=Lax; Secure`,
  ];

  let queryFbclid = '';
  try { queryFbclid = new URL(request.url).searchParams.get('fbclid') || ''; } catch { queryFbclid = ''; }
  const fbclid = firstParam(b.fbclid, queryFbclid);
  if (fbclid && !cookies._fbc) {
    const safe = String(fbclid).replace(/[^A-Za-z0-9_.-]/g, '').slice(0, 400);
    if (safe) setCookies.push(`_fbc=fb.1.${Date.now()}.${safe}; Path=/; Max-Age=${NINETY_DAYS}; SameSite=Lax; Secure`);
  }

  if (sbReady()) {
    const ip = clientIp(request) || '';
    const row = {
      id: vid,
      user_agent: userAgentOf(request) || null,
      geo: geoOf(request),
      last_seen_at: new Date().toISOString(),
    };
    // first_ip is inet: only send it when it parses, or PostgREST rejects the row.
    if (isIp(ip)) row.first_ip = ip;
    const r = await upsert('cc_visitors', row, 'id', { returning: 'minimal' });
    if (!r.ok) console.error('t/init: visitor upsert failed', r.error, r.message);
  }

  return json({ ok: true, vid }, 200, { 'Set-Cookie': setCookies });
}

function firstParam() {
  for (const v of arguments) if (typeof v === 'string' && v.trim()) return v.trim();
  return '';
}
