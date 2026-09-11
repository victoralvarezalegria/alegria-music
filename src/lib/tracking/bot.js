// Bot filter. One regex, shared by /api/t/event and /go/[slug] so the two
// never disagree about what a bot is. Bots are FLAGGED, never dropped: the row
// still lands with is_bot=true and the views exclude it, so the filter can be
// audited against real traffic instead of trusted blindly.
//
// Kept deliberately narrow. A false positive here silently deletes a real
// person from every attribution table, which is worse than an extra
// Lighthouse run in the direct bucket.

export const BOT_RE = /(bot|crawl|spider|headless|lighthouse|facebookexternalhit|slurp|python-requests|curl)/i;

export function isBotUa(ua) {
  return BOT_RE.test(String(ua || ''));
}

export default isBotUa;
