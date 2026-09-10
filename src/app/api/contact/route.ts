// POST /api/contact   { name, email, subject?, message }
// The contact form on /contact. Writes the enquiry into Víctor's
// ActiveCampaign: contact sync (name + email), tag "Website Contact"
// (AC_CONTACT_TAG_ID, defaults to tag 5 in his account), and the message as a
// note on the contact so it is readable inside AC. No list subscription: the
// page promises a reply, not a newsletter.
//
// Víctor sees new enquiries in AC under the tag, and can get an email per
// enquiry with a 2-step automation there: trigger "tag Website Contact is
// added" -> action "Send notification email". The API cannot build that.
//
// The API key lives ONLY in Vercel env vars. Never inline it into a page.

const AC_URL = process.env.AC_URL; // https://<account>.api-us1.com
const AC_KEY = process.env.AC_KEY; // Settings > Developer > API Key
const AC_CONTACT_TAG_ID = process.env.AC_CONTACT_TAG_ID || "5"; // "Website Contact"

const TOPICS: Record<string, string> = {
  lesson: "Online Lesson / Masterclass",
  concert: "Solo Concert",
  orchestral: "Orchestral Engagement",
  media: "Press / Media",
  other: "Other",
};

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  let body: { name?: string; email?: string; subject?: string; message?: string };
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "invalid_body" }, { status: 400 });
  }

  const name = clean(body.name, 200);
  const email = (typeof body.email === "string" ? body.email : "").trim().toLowerCase();
  const subject = clean(body.subject, 40);
  const message = clean(body.message, 5000);

  if (!isValidEmail(email)) {
    return Response.json({ ok: false, error: "invalid_email" }, { status: 400 });
  }
  if (!name) {
    return Response.json({ ok: false, error: "missing_name" }, { status: 400 });
  }
  if (!message) {
    return Response.json({ ok: false, error: "missing_message" }, { status: 400 });
  }
  if (!AC_URL || !AC_KEY) {
    console.error("contact: missing AC env vars");
    return Response.json({ ok: false, error: "not_configured" }, { status: 500 });
  }

  const headers = { "Api-Token": AC_KEY, "Content-Type": "application/json" };
  const [firstName, ...rest] = name.split(/\s+/);
  const lastName = rest.join(" ");

  try {
    // 1) Create or update the contact. sync is idempotent.
    const contact: Record<string, string> = { email, firstName };
    if (lastName) contact.lastName = lastName;
    const syncRes = await fetch(`${AC_URL}/api/3/contact/sync`, {
      method: "POST",
      headers,
      body: JSON.stringify({ contact }),
    });
    const syncJson = await syncRes.json();
    const contactId = syncJson?.contact?.id;
    if (!contactId) {
      console.error("contact: contact/sync failed", JSON.stringify(syncJson).slice(0, 500));
      return Response.json({ ok: false, error: "contact_sync_failed" }, { status: 502 });
    }

    // 2) The message itself, as a note on the contact. This is the enquiry;
    //    if it fails the submit fails, so the visitor is told to email instead.
    const topic = TOPICS[subject] || subject || "(no topic chosen)";
    const note = [
      "Website contact form (alegriamusic.net/contact)",
      `Topic: ${topic}`,
      "",
      message,
    ].join("\n");
    const noteRes = await fetch(`${AC_URL}/api/3/notes`, {
      method: "POST",
      headers,
      body: JSON.stringify({ note: { note, relid: Number(contactId), reltype: "Subscriber" } }),
    });
    if (!noteRes.ok) {
      const txt = await noteRes.text();
      console.error("contact: note failed", noteRes.status, txt.slice(0, 300));
      return Response.json({ ok: false, error: "note_failed", contactId }, { status: 502 });
    }

    // 3) Tag, so enquiries are findable and can trigger a notification
    //    automation. Best effort: a tag failure never loses the message.
    let tagged = false;
    const tagRes = await fetch(`${AC_URL}/api/3/contactTags`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        contactTag: { contact: Number(contactId), tag: Number(AC_CONTACT_TAG_ID) },
      }),
    });
    tagged = tagRes.ok;
    if (!tagRes.ok) {
      const txt = await tagRes.text();
      console.error("contact: contactTags failed", tagRes.status, txt.slice(0, 300));
    }

    return Response.json({ ok: true, contactId, tagged });
  } catch (err) {
    console.error("contact: unexpected", err);
    return Response.json({ ok: false, error: "unexpected" }, { status: 500 });
  }
}

export async function GET() {
  return Response.json(
    { ok: false, error: "method_not_allowed" },
    { status: 405, headers: { Allow: "POST" } },
  );
}

function clean(v: unknown, max: number): string {
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}

function isValidEmail(v: string): boolean {
  return /^[^\s@]+@[^\s@.]+(\.[^\s@.]+)*\.[A-Za-z]{2,}$/.test(v) && v.length <= 254;
}
