"use client";
import Link from "next/link";
import { writeConsent } from "@/lib/consent";
import { useConsentBannerOpen } from "@/hooks/useConsent";

// Consent banner (GDPR / ePrivacy opt-in, 2026-09-17). Shown until a choice is stored;
// "Accept all" and "Reject all" carry equal weight. Reopened from the footer's
// "Cookie settings" link. English and Spanish; other site languages fall back to English.
const COPY = {
  en: {
    text: "This site uses cookies for analytics and to remember you across visits (ActiveCampaign site tracking and first-party attribution). Essential cookies always work; the rest only with your consent.",
    accept: "Accept all",
    reject: "Reject all",
    policy: "Privacy policy",
  },
  es: {
    text: "Este sitio usa cookies para analítica y para recordarte entre visitas (seguimiento de ActiveCampaign y atribución propia). Las cookies esenciales funcionan siempre; el resto solo con tu consentimiento.",
    accept: "Aceptar todo",
    reject: "Rechazar todo",
    policy: "Política de privacidad",
  },
};

export default function CookieConsent({ lang }: { lang?: string }) {
  const open = useConsentBannerOpen();
  if (!open) return null;
  const c = lang === "es" ? COPY.es : COPY.en;
  const choose = (v: "all" | "essential") => writeConsent(v);
  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-label={c.policy}
      style={{
        position: "fixed", left: 16, right: 16, bottom: 16, zIndex: 2147483000,
        maxWidth: 720, margin: "0 auto", padding: "16px 18px", borderRadius: 14,
        background: "#14161c", color: "#f2f2f2", border: "1px solid rgba(255,255,255,0.14)",
        boxShadow: "0 18px 50px rgba(0,0,0,0.5)", fontSize: 14, lineHeight: 1.5,
        display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center",
      }}
    >
      <p style={{ margin: 0, flex: "1 1 320px" }}>
        {c.text}{" "}
        <Link href="/privacy" style={{ color: "#ffb38a", textDecoration: "underline" }}>{c.policy}</Link>
      </p>
      <div style={{ display: "flex", gap: 8, flex: "0 0 auto" }}>
        <button type="button" onClick={() => choose("essential")} style={btn(false)}>{c.reject}</button>
        <button type="button" onClick={() => choose("all")} style={btn(true)}>{c.accept}</button>
      </div>
    </div>
  );
}

function btn(primary: boolean): React.CSSProperties {
  return {
    minWidth: 120, minHeight: 40, padding: "10px 16px", borderRadius: 10, cursor: "pointer",
    fontSize: 14, fontWeight: 600, letterSpacing: 0.2,
    background: primary ? "#f2f2f2" : "transparent", color: primary ? "#14161c" : "#f2f2f2",
    border: "1px solid rgba(255,255,255,0.55)",
  };
}
