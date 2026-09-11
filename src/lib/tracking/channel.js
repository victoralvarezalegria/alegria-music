// Channel classifier. Pure, no I/O, no env reads, so it can be unit tested and,
// more importantly, so Timo can read the rule table and say "that one is wrong"
// without reading any code. Every rule is a row in RULES below. First match wins,
// top to bottom.
//
// The one thing that is NOT a rule: a self-referral (a link from one page of the
// funnel to another) never starts a new touch. It carries no new information about
// where the person came from, and counting it would hand the last-touch credit to
// the funnel itself.

export const META_SOURCES = ['facebook', 'fb', 'instagram', 'ig', 'meta'];
export const PAID_MEDIUMS = ['paid', 'cpc', 'ppc', 'paid_social', 'paid-social', 'ad', 'ads'];
export const EMAIL_SOURCES = ['activecampaign', 'email', 'newsletter'];

export const CLICK_ID_KEYS = ['fbclid', 'gclid', 'gbraid', 'wbraid', 'ttclid', 'msclkid'];

// Matcher fields a rule may use. A rule matches when EVERY field it declares matches.
//   clickIdAny      one of these click id params is present
//   utmSourceIn     utm_source (lowercased) is in this list
//   utmMediumIn     utm_medium (lowercased) is in this list
//   refHostAny      the referrer host contains one of these substrings
//   hasAcParam      the ?ac= subscriber id is present
//   noClickId       no click id of any kind is present
//   externalRef     there is a referrer and its host is not our own
export const RULES = [
  // --- Paid. Click ids are the strongest signal there is; a click id alone is enough.
  { id: 'paid_meta_utm',    channel: 'paid_meta',   is_paid: true,  source_system: 'meta',
    match: { utmSourceIn: META_SOURCES, utmMediumIn: PAID_MEDIUMS } },
  { id: 'paid_meta_click',  channel: 'paid_meta',   is_paid: true,  source_system: 'meta',
    match: { clickIdAny: ['fbclid'] } },
  { id: 'paid_google',      channel: 'paid_google', is_paid: true,  source_system: 'google',
    match: { clickIdAny: ['gclid', 'gbraid', 'wbraid'] } },
  { id: 'paid_tiktok',      channel: 'paid_tiktok', is_paid: true,  source_system: 'tiktok',
    match: { clickIdAny: ['ttclid'] } },
  // msclkid is captured because Meta is not the only place a click id can come from.
  // Nobody runs Bing ads for this funnel today, so this rule should never fire; if it ever does, the
  // spend is real and losing it would be worse than an extra channel label.
  { id: 'paid_bing',        channel: 'paid_bing',   is_paid: true,  source_system: 'bing',
    match: { clickIdAny: ['msclkid'] } },

  // --- Email. NEVER an acquisition source: the views deliberately exclude it from
  // first-source. It is here so a click from a broadcast is not miscounted as direct.
  { id: 'email_ac_param',   channel: 'email',       is_paid: false, source_system: 'activecampaign',
    match: { hasAcParam: true } },
  { id: 'email_medium',     channel: 'email',       is_paid: false, source_system: 'activecampaign',
    match: { utmMediumIn: ['email'] } },
  { id: 'email_source',     channel: 'email',       is_paid: false, source_system: 'activecampaign',
    match: { utmSourceIn: EMAIL_SOURCES } },

  // --- Organic social and video. utm_source rules come first so a tagged bio link
  // wins over whatever referrer the in-app browser happens to send (which is often
  // nothing at all on iOS).
  { id: 'youtube_utm',      channel: 'youtube',     is_paid: false, source_system: 'youtube',
    match: { utmSourceIn: ['youtube', 'yt'] } },
  { id: 'youtube_ref',      channel: 'youtube',     is_paid: false, source_system: 'youtube',
    match: { refHostAny: ['youtube.com', 'youtu.be'] } },
  { id: 'instagram_utm',    channel: 'instagram',   is_paid: false, source_system: null,
    match: { utmSourceIn: ['instagram', 'ig'], noClickId: true } },
  { id: 'instagram_ref',    channel: 'instagram',   is_paid: false, source_system: null,
    match: { refHostAny: ['instagram.com'], noClickId: true } },
  { id: 'facebook_utm',     channel: 'facebook',    is_paid: false, source_system: null,
    match: { utmSourceIn: ['facebook', 'fb'], noClickId: true } },
  { id: 'facebook_ref',     channel: 'facebook',    is_paid: false, source_system: null,
    match: { refHostAny: ['facebook.com'], noClickId: true } },
  { id: 'tiktok_utm',       channel: 'tiktok',      is_paid: false, source_system: null,
    match: { utmSourceIn: ['tiktok'], noClickId: true } },
  { id: 'tiktok_ref',       channel: 'tiktok',      is_paid: false, source_system: null,
    match: { refHostAny: ['tiktok.com'], noClickId: true } },
  { id: 'linkedin_utm',     channel: 'linkedin',    is_paid: false, source_system: null,
    match: { utmSourceIn: ['linkedin'], noClickId: true } },
  { id: 'linkedin_ref',     channel: 'linkedin',    is_paid: false, source_system: null,
    match: { refHostAny: ['linkedin.com', 'lnkd.in'], noClickId: true } },

  // --- Search and the long tail.
  { id: 'organic_search',   channel: 'organic_search', is_paid: false, source_system: null,
    match: { refHostAny: ['google.', 'bing.com', 'duckduckgo.com', 'search.yahoo.com', 'ecosia.org'], noClickId: true } },
  { id: 'referral',         channel: 'referral',    is_paid: false, source_system: null,
    match: { externalRef: true } },
];

export const DEFAULT_RESULT = {
  channel: 'direct', is_paid: false, source_system: null,
  click_id: null, click_id_type: null, rule: 'direct', self_referral: false,
};

function host(u) {
  if (!u) return '';
  try { return new URL(u).hostname.toLowerCase().replace(/^www\./, ''); } catch { return ''; }
}

function low(v) {
  return typeof v === 'string' ? v.trim().toLowerCase() : '';
}

// The click id that gets written to cc_touches. Priority order matters only when a
// URL somehow carries two, which happens when an ad link is reshared.
export function pickClickId(input) {
  for (const k of CLICK_ID_KEYS) {
    const v = input && input[k];
    if (typeof v === 'string' && v.trim()) return { click_id: v.trim().slice(0, 512), click_id_type: k };
  }
  return { click_id: null, click_id_type: null };
}

function matches(match, ctx) {
  if (match.clickIdAny && !match.clickIdAny.some((k) => Boolean(ctx.clickIds[k]))) return false;
  if (match.noClickId && ctx.anyClickId) return false;
  if (match.utmSourceIn && !match.utmSourceIn.includes(ctx.utm_source)) return false;
  if (match.utmMediumIn && !match.utmMediumIn.includes(ctx.utm_medium)) return false;
  if (match.refHostAny && !match.refHostAny.some((h) => ctx.refHost.includes(h))) return false;
  if (match.hasAcParam && !ctx.ac) return false;
  if (match.externalRef && !ctx.externalRef) return false;
  return true;
}

/**
 * classifyChannel({ url, referrer, utm_source, utm_medium, fbclid, gclid, ..., ac })
 * Returns { channel, is_paid, source_system, click_id, click_id_type, rule, self_referral }.
 * `self_referral` true means the caller must NOT open a new touch.
 */
export function classifyChannel(input) {
  const i = input || {};
  const clickIds = {};
  let anyClickId = false;
  for (const k of CLICK_ID_KEYS) {
    const v = typeof i[k] === 'string' ? i[k].trim() : '';
    clickIds[k] = v;
    if (v) anyClickId = true;
  }

  const selfHost = host(i.url) || low(i.host);
  const refHost = host(i.referrer);
  const externalRef = Boolean(refHost) && refHost !== selfHost;
  const selfReferral = Boolean(refHost) && Boolean(selfHost) && refHost === selfHost;

  const ctx = {
    clickIds,
    anyClickId,
    refHost,
    externalRef,
    utm_source: low(i.utm_source),
    utm_medium: low(i.utm_medium),
    ac: typeof i.ac === 'string' ? i.ac.trim() : '',
  };

  const ids = pickClickId(i);
  let hit = null;
  for (const rule of RULES) {
    if (matches(rule.match, ctx)) { hit = rule; break; }
  }

  // A self-referral with no new campaign information carries no source. Flag it so
  // the caller keeps the touch it already has instead of overwriting it with 'direct'.
  const noNewInfo = !anyClickId && !ctx.utm_source && !ctx.utm_medium && !ctx.ac;

  if (!hit) {
    return Object.assign({}, DEFAULT_RESULT, {
      click_id: ids.click_id,
      click_id_type: ids.click_id_type,
      self_referral: selfReferral && noNewInfo,
    });
  }

  return {
    channel: hit.channel,
    is_paid: hit.is_paid,
    source_system: hit.source_system,
    click_id: ids.click_id,
    click_id_type: ids.click_id_type,
    rule: hit.id,
    self_referral: selfReferral && noNewInfo,
  };
}

export default classifyChannel;
