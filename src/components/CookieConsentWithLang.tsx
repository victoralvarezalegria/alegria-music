"use client";
import { useLanguage } from "@/contexts/LanguageContext";
import CookieConsent from "./CookieConsent";

// Site pages know the visitor's language; the banner follows it (EN/ES, else EN).
export default function CookieConsentWithLang() {
  const { lang } = useLanguage();
  return <CookieConsent lang={lang} />;
}
