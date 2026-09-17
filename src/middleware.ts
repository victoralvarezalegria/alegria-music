import { NextResponse, type NextRequest } from "next/server";

// Geo flag for the cookie banner (2026-09-17). Vercel stamps the visitor's country on every
// request (x-vercel-ip-country). Visitors from countries where tracking needs opt-in consent
// (EU/EEA, UK, Switzerland) get va_geo=consent and see the banner; everyone else gets
// va_geo=free and the trackers load without one. Unknown country (local dev) = consent.
const CONSENT_COUNTRIES = new Set([
  "AT","BE","BG","HR","CY","CZ","DK","EE","FI","FR","DE","GR","HU","IE","IT","LV","LT","LU","MT","NL","PL","PT","RO","SK","SI","ES","SE",
  "IS","LI","NO","GB","CH",
]);

export function middleware(req: NextRequest) {
  const res = NextResponse.next();
  if (!req.cookies.get("va_geo")) {
    const country = (req.headers.get("x-vercel-ip-country") || "").toUpperCase();
    const flag = !country || CONSENT_COUNTRIES.has(country) ? "consent" : "free";
    res.cookies.set("va_geo", flag, { path: "/", maxAge: 60 * 60 * 24 * 30, sameSite: "lax" });
  }
  return res;
}

export const config = { matcher: ["/((?!api/|_next/|.*\\..*).*)"] };
