// POST /api/book   { eventUri, inviteeUri }   (from the Calendly embed on /apply)
//             or   { email, firstName, lastName?, startTime? }   (from /booked when
//                  Calendly's own redirect passes event details)
// Ported from victor-site-handoff/funnel/api/book.js. Same validation, same
// status codes, same JSON shapes: /apply reads `firstName`.
//
// Calendly's embed only tells the page THAT a booking happened (event + invitee
// URIs), never the email. So when we get URIs, we look the invitee up with
// Victor's Calendly personal access token (CALENDLY_TOKEN). Without that token
// this route cannot learn who booked, and returns need_calendly_token.
//
// Keys live ONLY in Vercel env vars. Never inline them into a page.
//
// 2026-09-11: attribution. /apply appends the visitor id to the Calendly URL as
// utm_content, and Calendly hands it straight back on the invitee resource
// under tracking.utm_content. That is the only way to know WHICH visitor
// booked: the Calendly iframe is a different origin, so the booking itself
// carries no cookie of ours. Body vid is the fallback for the /booked path.
// recordConversion is awaited after the AC legs and never changes the reply.

import { recordConversion } from "@/lib/tracking/convert.js";
import { isUuid } from "@/lib/tracking/identity.js";

const AC_URL = process.env.AC_URL; // https://<account>.api-us1.com
const AC_KEY = process.env.AC_KEY; // Settings > Developer > API Key
const AC_BOOKED_LIST_ID = process.env.AC_BOOKED_LIST_ID; // numeric id: "Booked Call"
const AC_BOOKED_TAG_ID = process.env.AC_BOOKED_TAG_ID; // optional numeric tag id
const CALENDLY_TOKEN = process.env.CALENDLY_TOKEN; // Calendly > Integrations > API & webhooks
// Same route on Timo's Vercel project, which holds a working copy of Víctor's
// Calendly token and writes to the SAME ActiveCampaign list 8. Used only when
// this deployment's own CALENDLY_TOKEN is missing or rejected (401/403), so a
// bad env var here can never lose a booking again. Set BOOK_FALLBACK_URL="" to
// disable.
const BOOK_FALLBACK_URL =
  process.env.BOOK_FALLBACK_URL ?? "https://webinar-registration-steel.vercel.app/api/book";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  let body: {
    email?: string;
    firstName?: string;
    lastName?: string;
    eventUri?: string;
    inviteeUri?: string;
    startTime?: string;
    vid?: unknown;
    eventId?: unknown;
  };
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "invalid_body" }, { status: 400 });
  }

  let email = (body.email || "").trim().toLowerCase();
  let firstName = clean(body.firstName);
  let lastName = clean(body.lastName);
  const eventUri = clean(body.eventUri);
  const inviteeUri = clean(body.inviteeUri);
  let startTime = clean(body.startTime);
  let vid = isUuid(body.vid) ? String(body.vid) : "";
  const eventId = isUuid(body.eventId) ? String(body.eventId) : null;

  // Embed path: no email, only Calendly URIs. Look the invitee up.
  if (!email && inviteeUri) {
    if (!isCalendlyUri(inviteeUri)) {
      return Response.json({ ok: false, error: "bad_invitee_uri" }, { status: 400 });
    }
    if (!CALENDLY_TOKEN) {
      console.error("book: inviteeUri received but CALENDLY_TOKEN is not set");
      const fb = await forwardToFallback({ eventUri, inviteeUri });
      if (fb) return fb;
      return Response.json({ ok: false, error: "need_calendly_token" }, { status: 500 });
    }
    try {
      const invRes = await fetch(inviteeUri, {
        headers: { Authorization: `Bearer ${CALENDLY_TOKEN}` },
      });
      const invJson = await invRes.json().catch(() => null);
      const inv = invJson?.resource;
      if (!invRes.ok || !inv?.email) {
        // 401/403 = CALENDLY_TOKEN is not a valid token for Víctor's Calendly
        // account (the exact failure that lost every booking made on /apply
        // between 2026-09-08 and 2026-09-10). 404 = the URI is not visible to
        // that token (wrong account, or a made-up test URI). /api/health
        // reports which one it is without a booking.
        const error =
          invRes.status === 401 || invRes.status === 403
            ? "calendly_auth_failed"
            : invRes.status === 404
              ? "calendly_not_found"
              : "calendly_lookup_failed";
        console.error("book: calendly invitee lookup failed", invRes.status, error,
          JSON.stringify(invJson).slice(0, 300));
        if (error === "calendly_auth_failed") {
          const fb = await forwardToFallback({ eventUri, inviteeUri });
          if (fb) return fb;
        }
        return Response.json({ ok: false, error }, { status: 502 });
      }
      email = String(inv.email).trim().toLowerCase();
      firstName = clean(inv.first_name) || clean((inv.name || "").split(" ")[0]);
      lastName = clean(inv.last_name) || clean((inv.name || "").split(" ").slice(1).join(" "));
      // The visitor id /apply planted in the Calendly link comes back here.
      const tracked = inv.tracking && inv.tracking.utm_content ? String(inv.tracking.utm_content).trim() : "";
      if (isUuid(tracked)) vid = tracked;
      if (eventUri && isCalendlyUri(eventUri)) {
        const evRes = await fetch(eventUri, {
          headers: { Authorization: `Bearer ${CALENDLY_TOKEN}` },
        });
        const ev = (await evRes.json())?.resource;
        if (evRes.ok && ev?.start_time) startTime = clean(ev.start_time);
      }
    } catch (e) {
      console.error("book: calendly lookup error", e instanceof Error ? e.message : e);
      return Response.json({ ok: false, error: "calendly_lookup_failed" }, { status: 502 });
    }
  }

  // Enforced server-side too: client-side validation is a UX nicety anyone can
  // bypass with a devtools fetch.
  if (!isValidEmail(email)) {
    return Response.json({ ok: false, error: "invalid_email" }, { status: 400 });
  }
  if (!AC_URL || !AC_KEY || !AC_BOOKED_LIST_ID) {
    console.error("book: missing AC env vars");
    return Response.json({ ok: false, error: "not_configured" }, { status: 500 });
  }

  const headers = { "Api-Token": AC_KEY, "Content-Type": "application/json" };

  try {
    // 1) Create or update the contact. sync is idempotent: a repeat booking
    //    updates rather than erroring on a duplicate.
    const contact: Record<string, string> = { email };
    if (firstName) contact.firstName = firstName;
    if (lastName) contact.lastName = lastName;

    const syncRes = await fetch(`${AC_URL}/api/3/contact/sync`, {
      method: "POST",
      headers,
      body: JSON.stringify({ contact }),
    });
    const syncJson = await syncRes.json();
    const contactId = syncJson?.contact?.id;

    if (!contactId) {
      console.error("book: contact/sync failed", JSON.stringify(syncJson).slice(0, 500));
      return Response.json({ ok: false, error: "contact_sync_failed" }, { status: 502 });
    }

    // 2) Subscribe to the "Booked Call" list. status 1 = subscribed. This is
    //    what fires Victor's automation.
    const listRes = await fetch(`${AC_URL}/api/3/contactLists`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        contactList: {
          list: Number(AC_BOOKED_LIST_ID),
          contact: Number(contactId),
          status: 1,
        },
      }),
    });

    if (!listRes.ok) {
      const txt = await listRes.text();
      console.error("book: contactLists failed", listRes.status, txt.slice(0, 500));
      return Response.json(
        { ok: false, error: "list_subscribe_failed", contactId },
        { status: 502 },
      );
    }

    // 3) Optional tag. A missing tag id skips this leg, and a tag failure never
    //    blocks the booking.
    let tagged = false;
    if (AC_BOOKED_TAG_ID) {
      const tagRes = await fetch(`${AC_URL}/api/3/contactTags`, {
        method: "POST",
        headers,
        body: JSON.stringify({
          contactTag: { contact: Number(contactId), tag: Number(AC_BOOKED_TAG_ID) },
        }),
      });
      tagged = tagRes.ok;
      if (!tagRes.ok) {
        const txt = await tagRes.text();
        console.error("book: contactTags failed", tagRes.status, txt.slice(0, 300));
      }
    }

    // 4) Leave a note on the contact with the Calendly details, so Victor can
    //    see which slot was booked from inside AC. Best effort only.
    if (eventUri || startTime) {
      const note = [
        "Booked a call via /apply.",
        startTime ? `Start: ${startTime}` : "",
        eventUri ? `Calendly event: ${eventUri}` : "",
        inviteeUri ? `Calendly invitee: ${inviteeUri}` : "",
      ]
        .filter(Boolean)
        .join("\n");
      // Awaited: the function is frozen once the response is sent, so a
      // fire-and-forget request here never completes.
      try {
        const noteRes = await fetch(`${AC_URL}/api/3/notes`, {
          method: "POST",
          headers,
          body: JSON.stringify({
            note: { note, relid: Number(contactId), reltype: "Subscriber" },
          }),
        });
        if (!noteRes.ok) console.error("book: note failed", noteRes.status);
      } catch (e) {
        console.error("book: note failed", e instanceof Error ? e.message : e);
      }
    }

    // 5) Attribution. Awaited, because the function is frozen the instant the
    //    response is sent. The external id prefers the Calendly invitee URI; the
    //    /booked fallback (no URI, just redirect params) gets a deterministic key
    //    from the email and the slot, so the two paths firing for the same
    //    booking collapse onto one row instead of counting the call twice.
    const externalId = inviteeUri || (startTime ? "cal:" + email + "|" + startTime : null);
    let attribution = "skipped";
    try {
      const at = await recordConversion({
        vid,
        email,
        firstName,
        lastName,
        type: "booked_call",
        source: "calendly",
        externalId,
        eventUuid: eventId,
        occurredAt: startTime || null,
        acContactId: String(contactId),
        meta: { calendly_event: eventUri || null, calendly_invitee: inviteeUri || null },
        req: request,
      });
      attribution = (at && at.status) || "skipped";
    } catch (e) {
      console.error("book: attribution failed", e instanceof Error ? e.message : e);
      attribution = "error";
    }

    return Response.json({ ok: true, contactId, tagged, firstName, attribution });
  } catch (err) {
    console.error("book: unexpected", err);
    return Response.json({ ok: false, error: "unexpected" }, { status: 500 });
  }
}

export async function GET() {
  return Response.json(
    { ok: false, error: "method_not_allowed" },
    { status: 405, headers: { Allow: "POST" } },
  );
}

// Hands the booking to BOOK_FALLBACK_URL and relays its answer. Returns null
// when no fallback is configured or it cannot be reached, so the caller falls
// through to its own error.
async function forwardToFallback(body: { eventUri: string; inviteeUri: string }) {
  if (!BOOK_FALLBACK_URL) return null;
  try {
    const r = await fetch(BOOK_FALLBACK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const j = await r.json().catch(() => null);
    if (!j) return null;
    console.error("book: handled by fallback", BOOK_FALLBACK_URL, r.status, j.error || "ok");
    return Response.json({ ...j, via: "fallback" }, { status: r.status });
  } catch (e) {
    console.error("book: fallback unreachable", e instanceof Error ? e.message : e);
    return null;
  }
}

function isCalendlyUri(u: string): boolean {
  return /^https:\/\/api\.calendly\.com\/scheduled_events\/[A-Za-z0-9-]+(\/invitees\/[A-Za-z0-9-]+)?$/.test(u);
}

function clean(v: unknown): string {
  return typeof v === "string" ? v.trim().slice(0, 300) : "";
}

function isValidEmail(v: string): boolean {
  // Deliberately stricter than a@b.c: requires a real TLD.
  return /^[^\s@]+@[^\s@.]+(\.[^\s@.]+)*\.[A-Za-z]{2,}$/.test(v) && v.length <= 254;
}
