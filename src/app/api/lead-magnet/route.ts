// POST /api/lead-magnet   { firstName, email, vid?, eventId? }
// The /guide sign-up: first name + email, then the visitor lands on /guide/download.
//
// Puts the contact on Victor's ActiveCampaign list "Lead Magnet" and tags them
// "Lead Magnet" (tag 7), so his nurture automations can start from either.
//
// The list is found BY NAME at runtime, not by a hard-coded id: the site's API
// key cannot create lists (AC answers 403), so the list is made by hand in AC.
// Until it exists, sign-ups still sync + tag and nobody is lost; the moment the
// list is created, new sign-ups join it with no redeploy. AC_LEAD_MAGNET_LIST_ID
// in the Vercel env overrides the lookup if it is ever set.
//
// The API key lives ONLY in Vercel env vars. Never inline it into a page.

import { recordConversion } from "@/lib/tracking/convert.js";

const AC_URL = process.env.AC_URL; // https://<account>.api-us1.com
const AC_KEY = process.env.AC_KEY; // Settings > Developer > API Key
const LIST_NAME = "Lead Magnet";
const LIST_ID_OVERRIDE = process.env.AC_LEAD_MAGNET_LIST_ID;
const TAG_ID = process.env.AC_LEAD_MAGNET_TAG_ID || "7"; // "Lead Magnet", created 2026-10-18

export const dynamic = "force-dynamic";

// Cached per warm instance once found. A miss is not cached, so the first
// sign-up after the list is created picks it up.
let cachedListId: number | null = null;

async function findListId(headers: Record<string, string>): Promise<number | null> {
  if (LIST_ID_OVERRIDE) return Number(LIST_ID_OVERRIDE);
  if (cachedListId) return cachedListId;
  const res = await fetch(`${AC_URL}/api/3/lists?limit=100`, { headers });
  if (!res.ok) return null;
  const json = await res.json();
  const lists: { id: string; name: string }[] = json?.lists || [];
  const hit = lists.find((l) => l.name.trim().toLowerCase() === LIST_NAME.toLowerCase());
  if (hit) cachedListId = Number(hit.id);
  return cachedListId;
}

export async function POST(request: Request) {
  let body: { email?: string; firstName?: string; vid?: unknown; eventId?: unknown };
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "invalid_body" }, { status: 400 });
  }

  const email = (body.email || "").trim().toLowerCase();
  const firstName = typeof body.firstName === "string" ? body.firstName.trim().slice(0, 80) : "";
  const vid = String(body.vid == null ? "" : body.vid).trim();
  const eventId = String(body.eventId == null ? "" : body.eventId).trim();

  if (!isValidEmail(email)) {
    return Response.json({ ok: false, error: "invalid_email" }, { status: 400 });
  }
  if (!firstName) {
    return Response.json({ ok: false, error: "missing_name" }, { status: 400 });
  }
  if (!AC_URL || !AC_KEY) {
    console.error("lead-magnet: missing AC env vars");
    return Response.json({ ok: false, error: "not_configured" }, { status: 500 });
  }

  const headers = { "Api-Token": AC_KEY, "Content-Type": "application/json" };

  // Same attribution leg as /api/subscribe, run in parallel with AC and
  // awaited before replying (Vercel freezes the function once it responds).
  const attribution = recordConversion({
    vid,
    email,
    firstName,
    type: "lead",
    source: "form",
    eventUuid: eventId,
    meta: { list: "lead-magnet", magnet: "audition-guide" },
    req: request,
  });
  const attributionStatus = async () => {
    try {
      const at = await attribution;
      return (at && at.status) || "skipped";
    } catch (e) {
      console.error("lead-magnet: attribution failed", e instanceof Error ? e.message : e);
      return "error";
    }
  };

  try {
    const syncRes = await fetch(`${AC_URL}/api/3/contact/sync`, {
      method: "POST",
      headers,
      body: JSON.stringify({ contact: { email, firstName } }),
    });
    const syncJson = await syncRes.json();
    const contactId = syncJson?.contact?.id;
    if (!contactId) {
      console.error("lead-magnet: contact/sync failed", JSON.stringify(syncJson).slice(0, 500));
      await attributionStatus();
      return Response.json({ ok: false, error: "contact_sync_failed" }, { status: 502 });
    }

    // Tag and list run side by side. Either one landing keeps the lead.
    const [tagged, listId] = await Promise.all([
      fetch(`${AC_URL}/api/3/contactTags`, {
        method: "POST",
        headers,
        body: JSON.stringify({ contactTag: { contact: Number(contactId), tag: Number(TAG_ID) } }),
      }).then(async (r) => {
        if (!r.ok) console.error("lead-magnet: contactTags failed", r.status, (await r.text()).slice(0, 300));
        return r.ok;
      }),
      findListId(headers).catch(() => null),
    ]);

    let listed = false;
    if (listId) {
      const listRes = await fetch(`${AC_URL}/api/3/contactLists`, {
        method: "POST",
        headers,
        body: JSON.stringify({ contactList: { list: listId, contact: Number(contactId), status: 1 } }),
      });
      listed = listRes.ok;
      if (!listRes.ok) {
        console.error("lead-magnet: contactLists failed", listRes.status, (await listRes.text()).slice(0, 300));
      }
    } else {
      console.error(`lead-magnet: AC list "${LIST_NAME}" not found; contact tagged only`);
    }

    const attributionResult = await attributionStatus();
    if (!tagged && !listed) {
      return Response.json({ ok: false, error: "subscribe_failed", contactId }, { status: 502 });
    }
    return Response.json({ ok: true, contactId, tagged, listed, list: listId, attribution: attributionResult });
  } catch (err) {
    console.error("lead-magnet: unexpected", err);
    await attributionStatus();
    return Response.json({ ok: false, error: "unexpected" }, { status: 500 });
  }
}

export async function GET() {
  return Response.json(
    { ok: false, error: "method_not_allowed" },
    { status: 405, headers: { Allow: "POST" } },
  );
}

function isValidEmail(v: string): boolean {
  // Deliberately stricter than a@b.c: requires a real TLD.
  return /^[^\s@]+@[^\s@.]+(\.[^\s@.]+)*\.[A-Za-z]{2,}$/.test(v) && v.length <= 254;
}
