// GET /api/health
// One URL that says whether the funnel's plumbing is wired on THIS deployment:
// which env vars are present (true/false only, never values), whether the
// ActiveCampaign key authenticates, and whether CALENDLY_TOKEN authenticates
// as Víctor. Added 2026-09-10 after every /apply booking for two days was lost
// because CALENDLY_TOKEN was set to something Calendly rejects, and nothing on
// the site could show that without a real booking.

//
// 2026-10-23: tracking block. { ok, missing: [CC_SUPABASE_URL, ...], db } where
// db is a read-only probe of cc_links with the service key. tracking.ok=false
// makes the whole health check fail (503): the attribution chain recorded zero
// rows for six weeks because these vars were missing and nothing said so.
// acSourceFields lists which ActiveCampaign source fields exist (informational,
// not part of ok: a missing field only means that value is skipped).

import { trackingEnvStatus, select, sbReady } from "@/lib/tracking/sb.js";
import { sourceFieldStatus } from "@/lib/tracking/ac-source.js";

export const dynamic = "force-dynamic";

const ENV_VARS = [
  "AC_URL",
  "AC_KEY",
  "AC_LIST_ID",
  "AC_TAG_ID",
  "AC_ONDEMAND_LIST_ID",
  "AC_ONDEMAND_TAG_ID",
  "AC_BOOKED_LIST_ID",
  "AC_BOOKED_TAG_ID",
  "AC_WAITLIST_LIST_ID",
  "AC_WAITLIST_TAG_ID",
  "AC_CONTACT_TAG_ID",
  "CALENDLY_TOKEN",
] as const;

export async function GET() {
  const env: Record<string, boolean> = {};
  for (const k of ENV_VARS) env[k] = Boolean(process.env[k]);

  const activecampaign = await checkActiveCampaign();
  const calendly = await checkCalendly();
  const bookFallback = await checkBookFallback();
  const tracking = await checkTracking();
  const acSourceFields = await sourceFieldStatus(process.env.AC_URL, process.env.AC_KEY);

  const ok =
    env.AC_URL && env.AC_KEY && env.AC_LIST_ID && env.AC_ONDEMAND_LIST_ID &&
    env.AC_BOOKED_LIST_ID && env.AC_WAITLIST_LIST_ID && env.AC_WAITLIST_TAG_ID &&
    activecampaign.ok && (calendly.ok || bookFallback.ok) && tracking.ok;

  return Response.json(
    { ok, env, tracking, activecampaign, acSourceFields, calendly, bookFallback, checkedAt: new Date().toISOString() },
    { status: ok ? 200 : 503, headers: { "Cache-Control": "no-store" } },
  );
}

// Proves the fallback's token WITHOUT writing anything: a made-up Calendly URI
// must come back calendly_not_found (token accepted, URI unknown). Any auth
// error there means the fallback would also lose the booking.
async function checkBookFallback() {
  const url = process.env.BOOK_FALLBACK_URL ?? "https://webinar-registration-steel.vercel.app/api/book";
  if (!url) return { ok: false, error: "disabled" };
  const zero = "00000000-0000-0000-0000-000000000000";
  try {
    const r = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        eventUri: `https://api.calendly.com/scheduled_events/${zero}`,
        inviteeUri: `https://api.calendly.com/scheduled_events/${zero}/invitees/${zero}`,
      }),
    });
    const j = await r.json().catch(() => null);
    return { ok: j?.error === "calendly_not_found", url, response: j?.error ?? `http_${r.status}` };
  } catch (e) {
    return { ok: false, url, error: e instanceof Error ? e.message : "unexpected" };
  }
}

// Env names only, never values. The DB probe is a read of one cc_links id.
async function checkTracking() {
  const { ok: envOk, missing } = trackingEnvStatus() as { ok: boolean; missing: string[] };
  let db: { ok: boolean; error?: string } = { ok: false, error: "not_configured" };
  if (sbReady()) {
    try {
      const r = (await select("cc_links", "select=id&limit=1")) as { ok: boolean; status: number; error: string | null };
      db = r.ok ? { ok: true } : { ok: false, error: `http_${r.status} ${r.error ?? ""}`.trim() };
    } catch (e) {
      db = { ok: false, error: e instanceof Error ? e.message : "unexpected" };
    }
  }
  return { ok: envOk && db.ok, missing, db };
}

async function checkActiveCampaign() {
  const url = process.env.AC_URL;
  const key = process.env.AC_KEY;
  if (!url || !key) return { ok: false, error: "not_configured" };
  try {
    const r = await fetch(`${url}/api/3/users/me`, { headers: { "Api-Token": key } });
    const j = await r.json().catch(() => null);
    if (!r.ok || !j?.user) return { ok: false, error: `http_${r.status}` };
    return { ok: true, account: new URL(url).hostname.split(".")[0], user: j.user.username };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "unexpected" };
  }
}

async function checkCalendly() {
  const token = process.env.CALENDLY_TOKEN;
  if (!token) return { ok: false, error: "not_configured" };
  try {
    const r = await fetch("https://api.calendly.com/users/me", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const j = await r.json().catch(() => null);
    if (!r.ok || !j?.resource) {
      // 401 = the token is not a valid Calendly personal access token.
      return { ok: false, error: `http_${r.status}` };
    }
    return { ok: true, user: j.resource.name, scheduling: j.resource.scheduling_url };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "unexpected" };
  }
}
