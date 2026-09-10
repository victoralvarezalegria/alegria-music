// GET /api/health
// One URL that says whether the funnel's plumbing is wired on THIS deployment:
// which env vars are present (true/false only, never values), whether the
// ActiveCampaign key authenticates, and whether CALENDLY_TOKEN authenticates
// as Víctor. Added 2026-09-10 after every /apply booking for two days was lost
// because CALENDLY_TOKEN was set to something Calendly rejects, and nothing on
// the site could show that without a real booking.

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

  const ok =
    env.AC_URL && env.AC_KEY && env.AC_LIST_ID && env.AC_ONDEMAND_LIST_ID &&
    env.AC_BOOKED_LIST_ID && env.AC_WAITLIST_LIST_ID && env.AC_WAITLIST_TAG_ID &&
    activecampaign.ok && calendly.ok;

  return Response.json(
    { ok, env, activecampaign, calendly, checkedAt: new Date().toISOString() },
    { status: ok ? 200 : 503, headers: { "Cache-Control": "no-store" } },
  );
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
