"use client";
import { useSyncExternalStore } from "react";
import { getConsentServerSnapshot, getConsentSnapshot, subscribeConsent, type Consent } from "@/lib/consent";

// Server renders "no consent" (null); the browser reads the stored choice during hydration.
export function useConsent(): Consent {
  const snap = useSyncExternalStore(subscribeConsent, getConsentSnapshot, getConsentServerSnapshot);
  const v = snap.split("|")[0];
  return v === "all" || v === "essential" ? v : null;
}
export function useConsentBannerOpen(): boolean {
  const snap = useSyncExternalStore(subscribeConsent, getConsentSnapshot, getConsentServerSnapshot);
  const [v, open] = snap.split("|");
  return v === "none" || open === "open";
}
