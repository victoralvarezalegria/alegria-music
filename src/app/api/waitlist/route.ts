// POST /api/waitlist   { firstName, lastName?, email, phone }
// Ported from victor-site-handoff/funnel/api/waitlist.js. Same validation, same
// status codes, same JSON shapes.
//
// Adds a person to Victor's ActiveCampaign "waitlist" list after the call slots
// fill up, and tags them "Waitlist". Phone goes on the standard AC phone field.
//
// The API key lives ONLY in Vercel env vars. Never inline it into a page.

const AC_URL = process.env.AC_URL; // https://<account>.api-us1.com
const AC_KEY = process.env.AC_KEY; // Settings > Developer > API Key
const AC_WAITLIST_LIST_ID = process.env.AC_WAITLIST_LIST_ID; // numeric id: "waitlist"
const AC_WAITLIST_TAG_ID = process.env.AC_WAITLIST_TAG_ID; // numeric id: "Waitlist"

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  let body: {
    email?: string;
    firstName?: string;
    lastName?: string;
    phone?: string;
  };
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "invalid_body" }, { status: 400 });
  }

  const email = (body.email || "").trim().toLowerCase();
  const firstName = clean(body.firstName);
  const lastName = clean(body.lastName);
  const phone = clean(body.phone);

  // Enforced server-side too: client-side validation is a UX nicety anyone can
  // bypass with a devtools fetch.
  if (!isValidEmail(email)) {
    return Response.json({ ok: false, error: "invalid_email" }, { status: 400 });
  }
  if (!firstName) {
    return Response.json({ ok: false, error: "missing_name" }, { status: 400 });
  }
  if (phone && !isValidPhone(phone)) {
    return Response.json({ ok: false, error: "invalid_phone" }, { status: 400 });
  }
  if (!AC_URL || !AC_KEY || !AC_WAITLIST_LIST_ID || !AC_WAITLIST_TAG_ID) {
    console.error("waitlist: missing AC env vars");
    return Response.json({ ok: false, error: "not_configured" }, { status: 500 });
  }

  const headers = { "Api-Token": AC_KEY, "Content-Type": "application/json" };

  try {
    // 1) Create or update the contact. sync is idempotent.
    const contact: Record<string, string> = { email, firstName };
    if (lastName) contact.lastName = lastName;
    if (phone) contact.phone = phone;

    const syncRes = await fetch(`${AC_URL}/api/3/contact/sync`, {
      method: "POST",
      headers,
      body: JSON.stringify({ contact }),
    });
    const syncJson = await syncRes.json();
    const contactId = syncJson?.contact?.id;
    if (!contactId) {
      console.error("waitlist: contact/sync failed", JSON.stringify(syncJson).slice(0, 500));
      return Response.json({ ok: false, error: "contact_sync_failed" }, { status: 502 });
    }

    // 2) Subscribe to the Waitlist list. status 1 = subscribed.
    const listRes = await fetch(`${AC_URL}/api/3/contactLists`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        contactList: {
          list: Number(AC_WAITLIST_LIST_ID),
          contact: Number(contactId),
          status: 1,
        },
      }),
    });
    if (!listRes.ok) {
      const txt = await listRes.text();
      console.error("waitlist: contactLists failed", listRes.status, txt.slice(0, 500));
      return Response.json(
        { ok: false, error: "list_subscribe_failed", contactId },
        { status: 502 },
      );
    }

    // 3) The tag is the real waitlist marker. Victor's automation triggers on it.
    const tagRes = await fetch(`${AC_URL}/api/3/contactTags`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        contactTag: { contact: Number(contactId), tag: Number(AC_WAITLIST_TAG_ID) },
      }),
    });
    if (!tagRes.ok) {
      const txt = await tagRes.text();
      console.error("waitlist: contactTags failed", tagRes.status, txt.slice(0, 300));
      return Response.json({ ok: false, error: "tag_failed", contactId }, { status: 502 });
    }

    return Response.json({ ok: true, contactId, tagged: true });
  } catch (err) {
    console.error("waitlist: unexpected", err);
    return Response.json({ ok: false, error: "unexpected" }, { status: 500 });
  }
}

export async function GET() {
  return Response.json(
    { ok: false, error: "method_not_allowed" },
    { status: 405, headers: { Allow: "POST" } },
  );
}

function clean(v: unknown): string {
  return typeof v === "string" ? v.trim().slice(0, 200) : "";
}

function isValidEmail(v: string): boolean {
  // Deliberately stricter than a@b.c: requires a real TLD.
  return /^[^\s@]+@[^\s@.]+(\.[^\s@.]+)*\.[A-Za-z]{2,}$/.test(v) && v.length <= 254;
}

function isValidPhone(v: string): boolean {
  // Digits, spaces, +, -, (, ). 7 to 20 digits. International audience.
  const digits = v.replace(/\D/g, "");
  return /^[+\d\s().-]+$/.test(v) && digits.length >= 7 && digits.length <= 20;
}
