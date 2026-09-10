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

const AC_URL = process.env.AC_URL; // https://<account>.api-us1.com
const AC_KEY = process.env.AC_KEY; // Settings > Developer > API Key
const AC_BOOKED_LIST_ID = process.env.AC_BOOKED_LIST_ID; // numeric id: "Booked Call"
const AC_BOOKED_TAG_ID = process.env.AC_BOOKED_TAG_ID; // optional numeric tag id
const CALENDLY_TOKEN = process.env.CALENDLY_TOKEN; // Calendly > Integrations > API & webhooks

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  let body: {
    email?: string;
    firstName?: string;
    lastName?: string;
    eventUri?: string;
    inviteeUri?: string;
    startTime?: string;
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

  // Embed path: no email, only Calendly URIs. Look the invitee up.
  if (!email && inviteeUri) {
    if (!isCalendlyUri(inviteeUri)) {
      return Response.json({ ok: false, error: "bad_invitee_uri" }, { status: 400 });
    }
    if (!CALENDLY_TOKEN) {
      console.error("book: inviteeUri received but CALENDLY_TOKEN is not set");
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
        return Response.json({ ok: false, error }, { status: 502 });
      }
      email = String(inv.email).trim().toLowerCase();
      firstName = clean(inv.first_name) || clean((inv.name || "").split(" ")[0]);
      lastName = clean(inv.last_name) || clean((inv.name || "").split(" ").slice(1).join(" "));
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

    return Response.json({ ok: true, contactId, tagged, firstName });
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
