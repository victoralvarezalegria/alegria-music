// POST /api/subscribe   { email, firstName, source? }
// Ported from victor-site-handoff/funnel/api/subscribe.js. Same validation,
// same status codes, same JSON shapes: the pages read `ok`, `error`, `contactId`.
//
// source: omitted / anything else -> LIVE registration (/masterclass-live).
//         List "Registered for Webinar", whose automation "Masterclass LIVE"
//         sends the join link + countdown emails.
// source: "ondemand" -> the evergreen /watch page. List "Automated Masterclass
//         Leads" + its tag. Deliberately NOT the live list: those contacts
//         already have the replay and must never get "we start in 30 minutes".
//
// The API key lives ONLY in Vercel env vars. It must never be inlined into a
// page: anything in the page source is readable by every visitor, and an AC key
// grants full account access (contacts, campaigns, exports).
//
// 2026-09-11: attribution leg. recordConversion writes the lead row (cc_persons,
// cc_visitor_person_links, cc_conversions) keyed on the visitor id the form
// carries. It runs IN PARALLEL with the ActiveCampaign calls and is awaited
// before the response goes out (Vercel freezes the function the moment the
// response is sent, so fire-and-forget would never finish). It never changes
// the reply: a sign-up is confirmed by ActiveCampaign, not by us managing to
// write an attribution row.

import { recordConversion } from "@/lib/tracking/convert.js";

const AC_URL = process.env.AC_URL; // https://<account>.api-us1.com
const AC_KEY = process.env.AC_KEY; // Settings > Developer > API Key
const AC_LIST_ID = process.env.AC_LIST_ID; // numeric id: "Registered for Webinar"
const AC_TAG_ID = process.env.AC_TAG_ID; // numeric id: "Masterclass Registrant" (optional)
const AC_ONDEMAND_LIST_ID = process.env.AC_ONDEMAND_LIST_ID; // "Automated Masterclass Leads"
const AC_ONDEMAND_TAG_ID = process.env.AC_ONDEMAND_TAG_ID; // "Automated Masterclass Lead" (optional)

// Talks to a third-party API on every call, so it must never be prerendered.
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  let body: { email?: string; firstName?: string; source?: string; vid?: unknown; eventId?: unknown };
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "invalid_body" }, { status: 400 });
  }

  const email = (body.email || "").trim();
  const firstName = (body.firstName || "").trim();
  const source = (body.source || "").trim().toLowerCase();
  const onDemand = source === "ondemand";
  const listId = onDemand ? AC_ONDEMAND_LIST_ID : AC_LIST_ID;
  const tagId = onDemand ? AC_ONDEMAND_TAG_ID : AC_TAG_ID;
  // Attribution fields. Both optional: a visitor with JS disabled or a blocked
  // /api/t/init still gets their sign-up saved, they just arrive as 'direct'.
  // String() before trim: a crafted body can send a number, an array or an
  // object here, and a malformed tracking field must never lose a lead.
  const vid = String(body.vid == null ? "" : body.vid).trim();
  const eventId = String(body.eventId == null ? "" : body.eventId).trim();

  // Enforced here as well as in the browser: client-side validation is a UX
  // nicety that anyone can bypass with a devtools fetch.
  if (!isValidEmail(email)) {
    return Response.json({ ok: false, error: "invalid_email" }, { status: 400 });
  }
  if (!AC_URL || !AC_KEY || !listId) {
    // An on-demand sign-up with no AC_ONDEMAND_LIST_ID fails here on purpose:
    // falling back to the live list would fire the countdown at a replay viewer.
    console.error("subscribe: missing AC env vars", { onDemand });
    return Response.json({ ok: false, error: "not_configured" }, { status: 500 });
  }

  const headers = { "Api-Token": AC_KEY, "Content-Type": "application/json" };

  // The attribution leg starts now and is collected right before each reply,
  // so it costs no extra wall-clock time on top of the AC round trips.
  const attribution = recordConversion({
    vid,
    email,
    firstName,
    type: "lead",
    source: "form",
    eventUuid: eventId,
    meta: { list: onDemand ? "ondemand" : "live" },
    req: request,
  });
  const attributionStatus = async () => {
    try {
      const at = await attribution;
      return (at && at.status) || "skipped";
    } catch (e) {
      console.error("subscribe: attribution failed", e instanceof Error ? e.message : e);
      return "error";
    }
  };

  try {
    // 1) Create or update the contact. sync is idempotent, so a repeat
    //    registration updates rather than erroring on a duplicate.
    const syncRes = await fetch(`${AC_URL}/api/3/contact/sync`, {
      method: "POST",
      headers,
      body: JSON.stringify({ contact: { email, firstName } }),
    });
    const syncJson = await syncRes.json();
    const contactId = syncJson?.contact?.id;

    if (!contactId) {
      console.error("subscribe: contact/sync failed", JSON.stringify(syncJson).slice(0, 500));
      await attributionStatus();
      return Response.json({ ok: false, error: "contact_sync_failed" }, { status: 502 });
    }

    // 2) Subscribe to the list. status 1 = subscribed.
    const listRes = await fetch(`${AC_URL}/api/3/contactLists`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        contactList: { list: Number(listId), contact: Number(contactId), status: 1 },
      }),
    });

    if (!listRes.ok) {
      const txt = await listRes.text();
      console.error("subscribe: contactLists failed", listRes.status, txt.slice(0, 500));
      // The contact exists, so report partial success rather than losing the lead.
      await attributionStatus();
      return Response.json(
        { ok: false, error: "list_subscribe_failed", contactId },
        { status: 502 },
      );
    }

    // 3) Tag the contact so registrations stay trackable independent of list
    //    membership. Optional: a missing tag id skips this leg, and a tag
    //    failure never blocks the registration.
    let tagged = false;
    if (tagId) {
      const tagRes = await fetch(`${AC_URL}/api/3/contactTags`, {
        method: "POST",
        headers,
        body: JSON.stringify({
          contactTag: { contact: Number(contactId), tag: Number(tagId) },
        }),
      });
      tagged = tagRes.ok;
      if (!tagRes.ok) {
        const txt = await tagRes.text();
        console.error("subscribe: contactTags failed", tagRes.status, txt.slice(0, 300));
      }
    }

    const attributionResult = await attributionStatus();
    return Response.json({ ok: true, contactId, tagged, list: Number(listId), attribution: attributionResult });
  } catch (err) {
    console.error("subscribe: unexpected", err);
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
