#!/usr/bin/env node
// Attribution selftest. Runs entirely on this machine: nothing touches the real
// ActiveCampaign, Calendly or Supabase. Two parts:
//
//   1. unit: the pure pieces (cookies /go sets, source merge, Calendly token
//      parse, AC field plan incl. "first touch never overwritten")
//   2. routes: starts a mock Supabase (PostgREST) + mock ActiveCampaign on
//      localhost, then the BUILT site (`next start`) twice:
//        a) with no CC_* env  -> fail loud (health 503 + missing list, /go
//           falls back to /watch?tl=, /api/t/event 503, ONE log line)
//        b) with mocked env   -> /go writes the click, sets tl_/tc_ cookies;
//           /api/subscribe with ONLY cookies (consent-blocked visitor) writes
//           the source to AC fields and cc_conversions.meta; /api/book same;
//           /apply ships the Calendly utm_term/utm_campaign stamping
//
// Usage:  npm run build && node scripts/attribution-selftest.mjs
// Exit code 0 = all passed.

import http from 'node:http';
import { spawn } from 'node:child_process';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
let failures = 0;
let mock = null;
let passes = 0;
function check(name, cond, detail) {
  if (cond) { passes++; console.log('  PASS ' + name); }
  else { failures++; console.log('  FAIL ' + name + (detail ? '\n       ' + detail : '')); }
}

// ---------------------------------------------------------------- 1. unit
console.log('\n1. Unit');
const source = await import(path.join(ROOT, 'src/lib/tracking/source.js'));
const acs = await import(path.join(ROOT, 'src/lib/tracking/ac-source.js'));

{
  const c = source.goCookies({}, 'embouchure', '4242');
  check('goCookies: first visit sets tl_first, tl_last, tc_first, tc_last',
    ['tl_first=embouchure', 'tl_last=embouchure', 'tc_first=4242', 'tc_last=4242'].every((p) => c.some((x) => x.startsWith(p + ';'))), JSON.stringify(c));
  check('goCookies: 90 days, Secure, SameSite=Lax, not HttpOnly',
    c.every((x) => x.includes('Max-Age=7776000') && x.includes('Secure') && x.includes('SameSite=Lax') && !/HttpOnly/i.test(x)));
  const c2 = source.goCookies({ tl_first: 'older-video' }, 'embouchure', '9');
  check('goCookies: tl_first is never replaced', !c2.some((x) => x.startsWith('tl_first=')) && !c2.some((x) => x.startsWith('tc_first=')), JSON.stringify(c2));
  const c3 = source.goCookies({}, 'embouchure', '');
  check('goCookies: no click id clears tc_last', c3.some((x) => x.startsWith('tc_last=;') && x.includes('Max-Age=0')));
  check('goCookies: junk slug -> no cookies', source.goCookies({}, 'Bad Slug!', '1').length === 0);
}
{
  const p = source.paramsFrom('?utm_source=youtube&utm_campaign=vid1&tl=embouchure&tc=77&x=1');
  check('paramsFrom: utm + tl + tc', p.utm_source === 'youtube' && p.utm_campaign === 'vid1' && p.link === 'embouchure' && p.click_id === '77', JSON.stringify(p));
  check('paramsFrom: tc without tl ignored', !source.paramsFrom('?tc=77').click_id);
  check('paramsFrom: full URL', source.paramsFrom('https://www.alegriamusic.net/watch?tl=abc-1').link === 'abc-1');
  check('parseLinkToken slug.click', JSON.stringify(source.parseLinkToken('embouchure.4242')) === '{"link":"embouchure","click_id":"4242"}');
  check('parseLinkToken slug only', JSON.stringify(source.parseLinkToken('embouchure')) === '{"link":"embouchure"}');
  check('parseLinkToken junk -> null', source.parseLinkToken('<script>') === null && source.parseLinkToken('') === null);
}
{
  // consent-blocked: no sessions, only cookies
  const m = source.mergeSource({ sessions: [], cookies: { tl_first: 'older-video', tc_first: '1', tl_last: 'embouchure', tc_last: '4242' }, page: {} });
  check('merge: cookies only -> first/last from /go cookies with click ids',
    m.first.link === 'older-video' && m.first.click_id === '1' && m.last.link === 'embouchure' && m.last.click_id === '4242', JSON.stringify(m));
  // sessions win for first touch, email never first, page wins for last
  const m2 = source.mergeSource({
    sessions: [
      { started_at: '2026-10-01', utm_source: 'activecampaign', utm_medium: 'email' },
      { started_at: '2026-10-02', utm_source: 'youtube', utm_campaign: 'v1', link_slug: 'embouchure' },
    ],
    cookies: { tl_last: 'embouchure', tc_last: '4242' },
    page: { utm_source: 'youtube', utm_campaign: 'v2', link: 'high-notes' },
  });
  check('merge: email session is never first touch', m2.first.utm_source === 'youtube' && m2.first.link === 'embouchure', JSON.stringify(m2.first));
  check('merge: session inherits click id from matching /go cookie', m2.first.click_id === '4242');
  check('merge: current page is last touch', m2.last.link === 'high-notes' && m2.last.via === 'page');
  const m3 = source.mergeSource({ sessions: [], cookies: {}, page: {} });
  check('merge: nothing known -> nulls', m3.first === null && m3.last === null);
}
{
  const map = new Map([['FIRST_LINK', '11'], ['FIRST_UTM_SOURCE', '12'], ['LAST_LINK', '21'], ['LAST_CLICK_ID', '25']]);
  const src = { first: { link: 'embouchure', utm_source: 'youtube', click_id: '1' }, last: { link: 'embouchure', click_id: '4242', utm_campaign: 'v1' } };
  const plan = acs.planFieldValues(src, map, new Map([['11', 'older-video']]));
  const byField = Object.fromEntries(plan.fieldValues.map((f) => [f.field, f.value]));
  check('AC plan: existing FIRST_LINK is not overwritten', !('11' in byField), JSON.stringify(plan));
  check('AC plan: empty FIRST_UTM_SOURCE is filled', byField['12'] === 'youtube');
  check('AC plan: LAST_* written', byField['21'] === 'embouchure' && byField['25'] === '4242');
  check('AC plan: missing fields skipped and named', plan.missing.includes('FIRST_CLICK_ID') && plan.missing.includes('LAST_UTM_CAMPAIGN'));
  check('AC plan: blank values never written', acs.planFieldValues({ last: { link: '' } }, map, null).fieldValues.length === 0);
  check('AC normalizeTag on titles', acs.normalizeTag('First UTM Source') === 'FIRST_UTM_SOURCE' && acs.normalizeTag('%LAST_LINK%') === 'LAST_LINK');
}

// ---------------------------------------------------------------- 2. routes
console.log('\n2. Routes (mock Supabase + mock ActiveCampaign, built site)');
if (!existsSync(path.join(ROOT, '.next', 'BUILD_ID'))) {
  console.log('  SKIP: no build. Run `npm run build` first.');
  finish();
}

const VID = '11111111-2222-4333-8444-555555555555';
const log = [];
mock = http.createServer((req, res) => {
  let body = '';
  req.on('data', (d) => { body += d; });
  req.on('end', () => {
    const u = new URL(req.url, 'http://x');
    let parsed = null;
    try { parsed = body ? JSON.parse(body) : null; } catch { parsed = body; }
    log.push({ method: req.method, path: u.pathname, query: u.search, body: parsed });
    const send = (status, obj) => { res.writeHead(status, { 'Content-Type': 'application/json' }); res.end(obj === undefined ? '' : JSON.stringify(obj)); };
    const p = u.pathname;
    // ---- Supabase PostgREST
    if (p === '/rest/v1/cc_links' && req.method === 'GET') {
      const q = decodeURIComponent(u.search);
      if (q.includes('slug=eq.embouchure') || q.includes('in.(')) {
        return send(200, [{ id: 'link-uuid', slug: 'embouchure', destination: 'https://www.alegriamusic.net/watch', utm_source: 'youtube', utm_medium: 'video', utm_campaign: 'embouchure-video', utm_content: 'description', utm_term: null }]);
      }
      if (q.includes('select=id&limit=1')) return send(200, [{ id: 'link-uuid' }]);
      return send(200, []);
    }
    if (p === '/rest/v1/cc_link_clicks' && req.method === 'POST') return send(201, [{ id: 4242 }]);
    if (p === '/rest/v1/cc_sessions' && req.method === 'GET') return send(200, []); // consent-blocked: t.js never ran
    if (p === '/rest/v1/cc_persons' && req.method === 'GET') return send(200, []);
    if (p === '/rest/v1/cc_persons' && req.method === 'POST') return send(201, [{ id: '99999999-2222-4333-8444-555555555555', email: parsed && parsed.email }]);
    if (p === '/rest/v1/cc_conversions' && req.method === 'POST') return send(201, [{ id: 1 }]);
    if (p.startsWith('/rest/v1/')) return send(req.method === 'GET' ? 200 : 201, req.method === 'GET' ? [] : undefined);
    // ---- ActiveCampaign
    if (p === '/api/3/users/me') return send(200, { user: { username: 'selftest' } });
    if (p === '/api/3/contact/sync') return send(201, { contact: { id: '77' } });
    if (p === '/api/3/contactLists' || p === '/api/3/contactTags' || p === '/api/3/notes') return send(201, {});
    if (p === '/api/3/fields') {
      // Deliberately partial: FIRST_CLICK_ID and LAST_UTM_CONTENT do not exist.
      return send(200, { fields: [
        { id: '11', title: 'First Link', perstag: 'FIRST_LINK' },
        { id: '12', title: 'First UTM Source', perstag: 'FIRST_UTM_SOURCE' },
        { id: '13', title: 'First UTM Campaign', perstag: 'FIRST_UTM_CAMPAIGN' },
        { id: '14', title: 'First UTM Content', perstag: '' },
        { id: '21', title: 'Last Link', perstag: 'LAST_LINK' },
        { id: '22', title: 'Last UTM Source', perstag: 'LAST_UTM_SOURCE' },
        { id: '23', title: 'Last UTM Campaign', perstag: 'LAST_UTM_CAMPAIGN' },
        { id: '25', title: 'Last Click ID', perstag: 'LAST_CLICK_ID' },
        { id: '30', title: 'Instrument', perstag: 'INSTRUMENT' },
      ] });
    }
    if (p === '/api/3/contacts/77/fieldValues') return send(200, { fieldValues: [{ field: '11', value: 'older-video' }] });
    if (p === '/api/3/contacts/77' && req.method === 'PUT') return send(200, { contact: { id: '77' } });
    return send(404, { error: 'mock: unknown ' + req.method + ' ' + p });
  });
});
await new Promise((r) => mock.listen(0, '127.0.0.1', r));
const MOCK = 'http://127.0.0.1:' + mock.address().port;

const BASE_ENV = {
  PATH: process.env.PATH,
  HOME: process.env.HOME,
  NODE_ENV: 'production',
  NEXT_TELEMETRY_DISABLED: '1',
  AC_URL: MOCK,
  AC_KEY: 'test-ac-key',
  AC_LIST_ID: '5',
  AC_ONDEMAND_LIST_ID: '10',
  AC_BOOKED_LIST_ID: '8',
  AC_WAITLIST_LIST_ID: '9',
  AC_WAITLIST_TAG_ID: '6',
  AC_LEAD_MAGNET_LIST_ID: '12',
  BOOK_FALLBACK_URL: '', // never call Timo's live fallback from a test
  GO_FALLBACK_URL: 'https://www.alegriamusic.net/watch',
};
const TRACK_ENV = {
  CC_SUPABASE_URL: MOCK,
  CC_SUPABASE_SERVICE_KEY: 'test-service-key',
  CC_SALE_SECRET: 'test-sale',
  CC_REPORT_SECRET: 'test-report',
};

async function startSite(env) {
  const port = 3900 + Math.floor(Math.random() * 90);
  const child = spawn(path.join(ROOT, 'node_modules', '.bin', 'next'), ['start', '-p', String(port), '-H', '127.0.0.1'], { cwd: ROOT, env, stdio: ['ignore', 'pipe', 'pipe'] });
  let out = '';
  child.stdout.on('data', (d) => { out += d; });
  child.stderr.on('data', (d) => { out += d; });
  const base = 'http://127.0.0.1:' + port;
  for (let i = 0; i < 100; i++) {
    try { await fetch(base + '/api/subscribe'); return { child, base, out: () => out }; } catch { await new Promise((r) => setTimeout(r, 200)); }
  }
  child.kill();
  throw new Error('site did not start:\n' + out);
}

const cookieHdr = (o) => Object.entries(o).map(([k, v]) => k + '=' + v).join('; ');
const setCookies = (res) => (res.headers.getSetCookie ? res.headers.getSetCookie() : []);

// ---- a) fail loud
{
  console.log(' a) tracking env missing');
  const site = await startSite({ ...BASE_ENV });
  try {
    const h = await fetch(site.base + '/api/health');
    const hj = await h.json();
    check('health: 503 when tracking env missing', h.status === 503, 'status ' + h.status);
    check('health: tracking.ok=false with all 4 names in missing',
      hj.tracking && hj.tracking.ok === false && ['CC_SUPABASE_URL', 'CC_SUPABASE_SERVICE_KEY', 'CC_SALE_SECRET', 'CC_REPORT_SECRET'].every((k) => hj.tracking.missing.includes(k)), JSON.stringify(hj.tracking));
    check('health: acSourceFields lists the 2 missing AC fields',
      hj.acSourceFields && hj.acSourceFields.missing.includes('FIRST_CLICK_ID') && hj.acSourceFields.missing.includes('LAST_UTM_CONTENT') && hj.acSourceFields.found.includes('FIRST_UTM_CONTENT'), JSON.stringify(hj.acSourceFields));

    const g = await fetch(site.base + '/go/embouchure', { redirect: 'manual' });
    const loc = g.headers.get('location') || '';
    check('/go without DB: 302 to /watch?tl=embouchure (not home)', g.status === 302 && loc.startsWith('https://www.alegriamusic.net/watch') && loc.includes('tl=embouchure'), g.status + ' ' + loc);
    check('/go without DB: X-Tracking off header', (g.headers.get('x-tracking') || '').startsWith('off'));
    check('/go without DB: still sets tl_first/tl_last', ['tl_first=embouchure', 'tl_last=embouchure'].every((p) => setCookies(g).some((c) => c.startsWith(p))), JSON.stringify(setCookies(g)));

    const e = await fetch(site.base + '/api/t/event', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ vid: VID, event_uuid: VID, type: 'page_view' }) });
    check('/api/t/event without DB: 503 (was a silent 204)', e.status === 503, 'status ' + e.status);
    await fetch(site.base + '/go/embouchure', { redirect: 'manual' });
    await new Promise((r) => setTimeout(r, 300));
    const lines = site.out().split('\n').filter((l) => l.includes('[tracking] DISABLED'));
    check('one clear log line per cold start (not per request)', lines.length === 1, lines.length + ' lines');
    check('log line names the missing vars', lines[0] && lines[0].includes('CC_SUPABASE_URL') && lines[0].includes('CC_SUPABASE_SERVICE_KEY'));
  } finally { site.child.kill(); }
}

// ---- b) mocked env, consent-blocked visitor
{
  console.log(' b) tracking env set (mocked), visitor never accepted cookies');
  const site = await startSite({ ...BASE_ENV, ...TRACK_ENV });
  try {
    const h = await fetch(site.base + '/api/health');
    const hj = await h.json();
    check('health: tracking.ok=true, missing=[] , db probe ok', hj.tracking && hj.tracking.ok === true && hj.tracking.missing.length === 0 && hj.tracking.db.ok === true, JSON.stringify(hj.tracking));

    log.length = 0;
    const g = await fetch(site.base + '/go/embouchure', { redirect: 'manual', headers: { Cookie: cookieHdr({ tv: VID }) } });
    const loc = g.headers.get('location') || '';
    const sc = setCookies(g);
    check('/go: 302 to /watch with UTMs + tl + tc', g.status === 302 && loc.includes('/watch?') && loc.includes('utm_source=youtube') && loc.includes('tl=embouchure') && loc.includes('tc=4242'), loc);
    check('/go: click row written with returning=representation', log.some((r) => r.path === '/rest/v1/cc_link_clicks' && r.method === 'POST' && r.body.slug === 'embouchure' && r.body.visitor_id === VID));
    check('/go: sets tl_first, tl_last, tc_first, tc_last', ['tl_first=embouchure', 'tl_last=embouchure', 'tc_first=4242', 'tc_last=4242'].every((p) => sc.some((c) => c.startsWith(p + ';'))), JSON.stringify(sc));
    const g2 = await fetch(site.base + '/go/embouchure', { redirect: 'manual', headers: { Cookie: cookieHdr({ tv: VID, tl_first: 'older-video', tc_first: '1' }) } });
    check('/go: existing tl_first kept', !setCookies(g2).some((c) => c.startsWith('tl_first=')));
    const g3 = await fetch(site.base + '/go/no-such-link', { redirect: 'manual' });
    check('/go: unknown slug still goes home', (g3.headers.get('location') || '') === 'https://www.alegriamusic.net/');

    // Opt-in from /watch with an EMPTY vid (t.js blocked by the banner): only cookies.
    log.length = 0;
    const cookies = { tv: VID, tl_first: 'embouchure', tc_first: '4242', tl_last: 'embouchure', tc_last: '4242' };
    const s = await fetch(site.base + '/api/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Cookie: cookieHdr(cookies) },
      body: JSON.stringify({ email: 'selftest@example.com', firstName: 'Self', source: 'ondemand', vid: '', eventId: '', qs: '' }),
    });
    const sj = await s.json();
    check('subscribe: ok, acSource=written', s.status === 200 && sj.ok && sj.acSource === 'written', JSON.stringify(sj));
    const put = log.find((r) => r.method === 'PUT' && r.path === '/api/3/contacts/77');
    const fv = put ? Object.fromEntries(put.body.contact.fieldValues.map((f) => [f.field, f.value])) : {};
    check('subscribe: LAST_LINK=embouchure, LAST_CLICK_ID=4242, LAST_UTM_SOURCE/CAMPAIGN from cc_links',
      fv['21'] === 'embouchure' && fv['25'] === '4242' && fv['22'] === 'youtube' && fv['23'] === 'embouchure-video', JSON.stringify(fv));
    check('subscribe: FIRST_LINK not overwritten (AC already had older-video)', !('11' in fv));
    check('subscribe: empty FIRST_* filled (source, campaign, content matched by title)', fv['12'] === 'youtube' && fv['13'] === 'embouchure-video' && fv['14'] === 'description', JSON.stringify(fv));
    check('subscribe: no AC field created (no POST /api/3/fields)', !log.some((r) => r.path === '/api/3/fields' && r.method !== 'GET'));
    const conv = log.find((r) => r.path === '/rest/v1/cc_conversions' && r.method === 'POST');
    check('subscribe: lead joined to the /go visitor via tv cookie (consent fallback)', conv && conv.body.visitor_id === VID, conv && JSON.stringify(conv.body));
    check('subscribe: cc_conversions.meta.source carries link + click id', conv && conv.body.meta && conv.body.meta.source && conv.body.meta.source.last.link === 'embouchure' && conv.body.meta.source.last.click_id === '4242');

    // Direct /watch?utm..&tl= link, no cookies at all: page qs is the source.
    log.length = 0;
    const s2 = await fetch(site.base + '/api/subscribe', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'selftest2@example.com', firstName: 'Self', source: 'ondemand', qs: '?utm_source=youtube&utm_campaign=v9&tl=embouchure&tc=4242' }),
    });
    const put2 = log.find((r) => r.method === 'PUT' && r.path === '/api/3/contacts/77');
    const fv2 = put2 ? Object.fromEntries(put2.body.contact.fieldValues.map((f) => [f.field, f.value])) : {};
    check('subscribe: page ?utm/tl/tc alone reaches AC', (await s2.json()).ok && fv2['21'] === 'embouchure' && fv2['23'] === 'v9' && fv2['25'] === '4242', JSON.stringify(fv2));

    // Lead magnet + waitlist use the same helper.
    log.length = 0;
    const lm = await (await fetch(site.base + '/api/lead-magnet', { method: 'POST', headers: { 'Content-Type': 'application/json', Cookie: cookieHdr(cookies) }, body: JSON.stringify({ email: 'selftest3@example.com', firstName: 'Self' }) })).json();
    check('lead-magnet: acSource=written', lm.ok && lm.acSource === 'written', JSON.stringify(lm));
    const wl = await (await fetch(site.base + '/api/waitlist', { method: 'POST', headers: { 'Content-Type': 'application/json', Cookie: cookieHdr(cookies) }, body: JSON.stringify({ email: 'selftest4@example.com', firstName: 'Self', phone: '+1 555 123 4567' }) })).json();
    check('waitlist: acSource=written', wl.ok && wl.acSource === 'written', JSON.stringify(wl));

    // Booking (the /booked path: email in the body, cookies on the request).
    log.length = 0;
    const b = await (await fetch(site.base + '/api/book', { method: 'POST', headers: { 'Content-Type': 'application/json', Cookie: cookieHdr(cookies) }, body: JSON.stringify({ email: 'selftest5@example.com', firstName: 'Self', startTime: '2026-11-01T15:00:00Z' }) })).json();
    const bconv = log.find((r) => r.path === '/rest/v1/cc_conversions' && r.method === 'POST');
    check('book: acSource=written and booked_call carries visitor + link', b.ok && b.acSource === 'written' && bconv && bconv.body.type === 'booked_call' && bconv.body.visitor_id === VID && bconv.body.meta.source.last.link === 'embouchure', JSON.stringify(b) + ' ' + (bconv && JSON.stringify(bconv.body)));

    const apply = await (await fetch(site.base + '/apply')).text();
    check('/apply: Calendly URL stamps utm_term (last link) and utm_campaign (first link)', apply.includes("'&utm_term=' + encodeURIComponent(lastTok)") && apply.includes("'&utm_campaign=' + encodeURIComponent(firstTok)"));
    const watch = await (await fetch(site.base + '/watch')).text();
    check('/watch: form sends its own query string (qs)', watch.includes('qs: location.search.slice(0, 1000)'));

    check('no request left this machine except to the mock', !site.out().includes('webinar-registration-steel'));
  } finally { site.child.kill(); }
}

finish();

function finish() {
  if (mock && mock.listening) mock.close();
  console.log(`\n${passes} passed, ${failures} failed`);
  process.exit(failures ? 1 : 0);
}
