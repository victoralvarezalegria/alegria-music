// Where did this person come from? One answer for every form and booking route,
// built from whatever survives on THIS request, best evidence first:
//
//   1. their own sessions in cc_sessions (t.js ran, consent given): the earliest
//      tagged session is first touch, the latest is last touch
//   2. the first-party cookies /go/<slug> set at click time: tl_first / tl_last
//      (link slug) and tc_first / tc_last (the cc_link_clicks id = click id).
//      These are set by the server on the redirect, so they exist even when the
//      EU consent banner kept t.js from ever loading.
//   3. the query string of the page the form sits on (?utm_...&tl=), sent by the
//      page itself, or read off the same-origin Referer header as a fallback
//
// The result goes to ActiveCampaign custom fields (ac-source.js) and into
// cc_conversions.meta, so a lead keeps its link even when no cc_sessions row
// exists for it.
//
// Rules (approved design, references/attribution-design-research.md):
//   - first touch is never an email click (email is not an acquisition source)
//   - last touch is the most recent tagged arrival, email included
//   - a touch whose link slug matches a /go cookie inherits that cookie's click id
//   - a touch that only knows its slug gets its UTMs from cc_links

import { select, sbReady } from './sb.js';
import { readCookies, headerOf } from './http.js';

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const isUuid = (v) => typeof v === 'string' && UUID_RE.test(v);

export const SLUG_RE = /^[a-z0-9][a-z0-9-]{1,48}$/;
export const CLICK_RE = /^[0-9]{1,18}$/;
export const ATTR_MAX_AGE = 7776000; // 90 days
export const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];
const EMAIL_SOURCES = ['activecampaign', 'email', 'newsletter'];

export function cleanSlug(v) {
  const s = typeof v === 'string' ? v.trim().toLowerCase() : '';
  return SLUG_RE.test(s) ? s : '';
}

export function cleanClick(v) {
  const s = v == null ? '' : String(v).trim();
  return CLICK_RE.test(s) ? s : '';
}

function str(v, max) {
  return typeof v === 'string' && v.trim() ? v.trim().slice(0, max || 200) : null;
}

/**
 * Set-Cookie strings for /go/<slug>. tl_last and tc_last always describe THIS
 * click; tl_first / tc_first are written only when the browser has none yet,
 * so the first video that ever sent this person keeps the credit.
 * Not HttpOnly on purpose: /apply reads them to stamp the Calendly link.
 * Nothing secret: a public slug and a row number.
 */
export function goCookies(existing, slug, clickId) {
  const c = existing || {};
  const s = cleanSlug(slug);
  if (!s) return [];
  const id = cleanClick(clickId);
  const attrs = `; Path=/; Max-Age=${ATTR_MAX_AGE}; SameSite=Lax; Secure`;
  const out = [`tl_last=${s}${attrs}`];
  // A click that failed to record has no id; clear the old one so tc_last can
  // never point at a different link's click.
  out.push(id ? `tc_last=${id}${attrs}` : `tc_last=; Path=/; Max-Age=0; SameSite=Lax; Secure`);
  if (!cleanSlug(c.tl_first)) {
    out.push(`tl_first=${s}${attrs}`);
    if (id) out.push(`tc_first=${id}${attrs}`);
  }
  return out;
}

/** Pick the tracking params out of a query string or a full URL. */
export function paramsFrom(raw) {
  const out = {};
  if (!raw || typeof raw !== 'string') return out;
  let sp;
  try {
    sp = raw.includes('://') ? new URL(raw).searchParams : new URLSearchParams(raw.startsWith('?') ? raw.slice(1) : raw);
  } catch {
    return out;
  }
  for (const k of UTM_KEYS) {
    const v = str(sp.get(k), 200);
    if (v) out[k] = v;
  }
  const tl = cleanSlug(sp.get('tl') || '');
  if (tl) {
    out.link = tl;
    // tc=<click id> is added by /go next to tl; meaningless without its slug.
    const tc = cleanClick(sp.get('tc') || '');
    if (tc) out.click_id = tc;
  }
  return out;
}

/** A Calendly utm value written by /apply: "<slug>" or "<slug>.<clickId>". */
export function parseLinkToken(raw) {
  const v = typeof raw === 'string' ? raw.trim().toLowerCase() : '';
  if (!v) return null;
  const [slugPart, clickPart] = v.split('.', 2);
  const link = cleanSlug(slugPart);
  if (!link) return null;
  const click_id = cleanClick(clickPart);
  return click_id ? { link, click_id } : { link };
}

function hasInfo(t) {
  return Boolean(t && (t.link || t.utm_source || t.utm_campaign || t.utm_content));
}

function isEmailTouch(t) {
  if (!t) return false;
  const src = String(t.utm_source || '').toLowerCase();
  const med = String(t.utm_medium || '').toLowerCase();
  return EMAIL_SOURCES.includes(src) || med === 'email';
}

function fromSession(s) {
  const t = { via: 'session', at: s.started_at || null };
  for (const k of UTM_KEYS) if (s[k]) t[k] = s[k];
  const link = cleanSlug(s.link_slug || '');
  if (link) t.link = link;
  return t;
}

/**
 * Pure merge of the three evidence sources. Exported for the selftest.
 * sessions: cc_sessions rows (oldest first). cookies: parsed request cookies.
 * page: paramsFrom() of the form page.
 */
export function mergeSource({ sessions, cookies, page }) {
  const c = cookies || {};
  const rows = Array.isArray(sessions) ? sessions.map(fromSession).filter(hasInfo) : [];
  const cFirst = cleanSlug(c.tl_first) ? { via: 'cookie', link: cleanSlug(c.tl_first) } : null;
  const cLast = cleanSlug(c.tl_last) ? { via: 'cookie', link: cleanSlug(c.tl_last) } : null;
  if (cFirst && cleanClick(c.tc_first)) cFirst.click_id = cleanClick(c.tc_first);
  if (cLast && cleanClick(c.tc_last)) cLast.click_id = cleanClick(c.tc_last);
  const p = hasInfo(page) ? Object.assign({ via: 'page' }, page) : null;

  const nonEmail = rows.filter((t) => !isEmailTouch(t));
  let first = nonEmail[0] || cFirst || (p && !isEmailTouch(p) ? p : null) || null;
  let last = p || rows[rows.length - 1] || cLast || null;

  // Click ids live only in the /go cookies. Hand them to the touch with the same slug.
  const attachClick = (t) => {
    if (!t || t.click_id || !t.link) return t;
    const copy = Object.assign({}, t);
    if (cLast && cLast.link === t.link && cLast.click_id) copy.click_id = cLast.click_id;
    else if (cFirst && cFirst.link === t.link && cFirst.click_id) copy.click_id = cFirst.click_id;
    return copy;
  };
  first = attachClick(first);
  last = attachClick(last);
  return { first, last };
}

/**
 * resolveSource({ request, vid, pageQs }) -> { vid, first, last }
 * Never throws; a failed DB read just means fewer layers of evidence.
 * vid falls back to the tv cookie that /go and /api/t/init set, which is what
 * makes a consent-blocked opt-in still land on the visitor that clicked.
 */
export async function resolveSource(args) {
  const a = args || {};
  const cookies = readCookies(a.request);
  const vid = isUuid(a.vid) ? a.vid : (isUuid(cookies.tv) ? cookies.tv : null);

  let page = paramsFrom(a.pageQs);
  if (!hasInfo(page)) {
    // Same-origin form posts carry the full page URL in Referer
    // (Referrer-Policy strict-origin-when-cross-origin).
    page = paramsFrom(headerOf(a.request, 'referer'));
  }

  let sessions = [];
  try {
    if (vid && sbReady()) {
      const r = await select(
        'cc_sessions',
        'visitor_id=eq.' + vid +
          '&is_bot=is.false&or=(utm_source.not.is.null,link_slug.not.is.null)' +
          '&select=started_at,utm_source,utm_medium,utm_campaign,utm_content,utm_term,link_slug' +
          '&order=started_at.asc&limit=200'
      );
      if (r.ok && Array.isArray(r.data)) sessions = r.data;
    }
  } catch (e) {
    console.error('source: session read failed', e && e.message);
  }

  const merged = mergeSource({ sessions, cookies, page });
  await fillUtmsFromLinks([merged.first, merged.last]);
  return { vid, first: merged.first, last: merged.last };
}

// A touch that knows only its slug (cookie fallback) gets the link's UTMs.
export async function fillUtmsFromLinks(touches) {
  const need = [...new Set(touches.filter((t) => t && t.link && !t.utm_source).map((t) => t.link))];
  if (!need.length || !sbReady()) return;
  try {
    const r = await select(
      'cc_links',
      'slug=in.(' + need.join(',') + ')&select=slug,utm_source,utm_medium,utm_campaign,utm_content,utm_term'
    );
    if (!r.ok || !Array.isArray(r.data)) return;
    const bySlug = new Map(r.data.map((l) => [l.slug, l]));
    for (const t of touches) {
      if (!t || !t.link || t.utm_source) continue;
      const l = bySlug.get(t.link);
      if (!l) continue;
      for (const k of UTM_KEYS) if (l[k] && !t[k]) t[k] = l[k];
    }
  } catch (e) {
    console.error('source: link read failed', e && e.message);
  }
}

/** Compact copy for cc_conversions.meta. */
export function sourceMeta(src) {
  if (!src) return null;
  const pick = (t) => {
    if (!t) return null;
    const o = {};
    for (const k of ['link', 'click_id', 'utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'via', 'at']) {
      if (t[k]) o[k] = t[k];
    }
    return o;
  };
  const first = pick(src.first);
  const last = pick(src.last);
  return first || last ? { first, last } : null;
}

export default resolveSource;
