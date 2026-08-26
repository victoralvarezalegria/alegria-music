// Subscribes a masterclass registrant to Victor's ActiveCampaign list.
//
// The API key is read from the environment and never reaches the client
// bundle. An ActiveCampaign key grants full account access, including
// exporting every contact, so it must not appear in any component.

const AC_URL = process.env.AC_URL; // https://<account>.api-us1.com
const AC_KEY = process.env.AC_KEY; // Settings > Developer > API Key
const AC_LIST_ID = process.env.AC_LIST_ID; // numeric id: "Registered for Webinar"

// Talks to a third-party API on every call, so it must never be prerendered.
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  let body: { email?: string; firstName?: string };
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "invalid_body" }, { status: 400 });
  }

  const email = (body.email || "").trim();
  const firstName = (body.firstName || "").trim();

  // Enforced here as well as in the browser: client-side validation is a UX
  // nicety that anyone can bypass with a devtools fetch.
  if (!isValidEmail(email)) {
    return Response.json({ ok: false, error: "invalid_email" }, { status: 400 });
  }
  if (!AC_URL || !AC_KEY || !AC_LIST_ID) {
    console.error("subscribe: missing AC env vars");
    return Response.json({ ok: false, error: "not_configured" }, { status: 500 });
  }

  const headers = {
    "Api-Token": AC_KEY,
    "Content-Type": "application/json",
  };

  try {
    // 1) Create or update the contact. sync is idempotent, so someone
    //    registering twice updates rather than erroring on a duplicate.
    const syncRes = await fetch(`${AC_URL}/api/3/contact/sync`, {
      method: "POST",
      headers,
      body: JSON.stringify({ contact: { email, firstName } }),
    });
    const syncJson = await syncRes.json();
    const contactId = syncJson?.contact?.id;

    if (!contactId) {
      console.error("subscribe: contact/sync failed", JSON.stringify(syncJson).slice(0, 500));
      return Response.json({ ok: false, error: "contact_sync_failed" }, { status: 502 });
    }

    // 2) Subscribe to the list. status 1 = subscribed.
    const listRes = await fetch(`${AC_URL}/api/3/contactLists`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        contactList: {
          list: Number(AC_LIST_ID),
          contact: Number(contactId),
          status: 1,
        },
      }),
    });

    if (!listRes.ok) {
      const txt = await listRes.text();
      console.error("subscribe: contactLists failed", listRes.status, txt.slice(0, 500));
      // The contact exists, so report partial failure rather than losing the lead.
      return Response.json(
        { ok: false, error: "list_subscribe_failed", contactId },
        { status: 502 },
      );
    }

    return Response.json({ ok: true, contactId });
  } catch (err) {
    console.error("subscribe: unexpected", err);
    return Response.json({ ok: false, error: "unexpected" }, { status: 500 });
  }
}

function isValidEmail(v: string): boolean {
  // Deliberately stricter than a@b.c: requires a real TLD.
  return /^[^\s@]+@[^\s@.]+(\.[^\s@.]+)*\.[A-Za-z]{2,}$/.test(v) && v.length <= 254;
}
