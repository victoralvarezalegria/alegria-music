// Cookie consent state (ePrivacy / GDPR opt-in, added 2026-09-17).
// "all" = analytics/marketing trackers may load (ActiveCampaign site tracking, first-party
// attribution). "essential" = nothing beyond what the site needs to work. A browser that
// sends Global Privacy Control is treated as "essential" without asking.
// Exposed as an external store (subscribe/getSnapshot) so components read it with
// useSyncExternalStore, the same pattern LanguageContext uses for localStorage.
export type Consent = "all" | "essential" | null;
const KEY = "va_consent";
const CONSENT_EVENT = "va-consent";
let settingsOpen = false;

export function readConsent(): Consent {
  if (typeof window === "undefined") return null;
  try {
    const nav = navigator as Navigator & { globalPrivacyControl?: boolean };
    if (nav.globalPrivacyControl) return "essential";
  } catch {}
  try {
    const v = localStorage.getItem(KEY);
    if (v === "all" || v === "essential") return v;
  } catch {}
  const m = document.cookie.match(/(?:^|; )va_consent=(all|essential)/);
  if (m) return m[1] as Consent;
  // No stored choice. Outside the opt-in countries (middleware sets va_geo=free) nothing needs
  // asking: trackers may load and no banner is shown. In an opt-in country, or unknown, ask.
  const geo = document.cookie.match(/(?:^|; )va_geo=(free|consent)/);
  return geo && geo[1] === "free" ? "all" : null;
}

export function writeConsent(v: Exclude<Consent, null>) {
  try { localStorage.setItem(KEY, v); } catch {}
  document.cookie = `${KEY}=${v}; path=/; max-age=${60 * 60 * 24 * 180}; SameSite=Lax; Secure`;
  settingsOpen = false;
  window.dispatchEvent(new Event(CONSENT_EVENT));
}

export function openConsentSettings() {
  settingsOpen = true;
  window.dispatchEvent(new Event(CONSENT_EVENT));
}

export function subscribeConsent(cb: () => void) {
  window.addEventListener(CONSENT_EVENT, cb);
  return () => window.removeEventListener(CONSENT_EVENT, cb);
}
/** "all" | "essential" | null, plus whether the settings panel was reopened. Server: null/closed. */
export function getConsentSnapshot(): string {
  return `${readConsent() ?? "none"}|${settingsOpen ? "open" : "closed"}`;
}
export function getConsentServerSnapshot(): string {
  return "none|closed";
}
