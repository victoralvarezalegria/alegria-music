// POST /api/waitlist   { firstName, email, phone }
// Adds a person to Victor's ActiveCampaign list 9 "waitlist" (AC_WAITLIST_LIST_ID)
// after the masterclass call slots filled up, and tags them "Waitlist"
// (AC_WAITLIST_TAG_ID). Victor's plan is at its list cap, so list 9 is the old
// empty ZZ DRAFTS list renamed. Phone goes on the standard AC phone field.
//
// The API key lives ONLY in Vercel env vars. Never inline it into a page.
// Account: victoralvarezalegria44473 (CLIENT). Never point this at Timo's own
// account (trombonetimollc4599) or at another client's (hballmusic).

const AC_URL = process.env.AC_URL;                          // https://<account>.api-us1.com
const AC_KEY = process.env.AC_KEY;                          // Settings > Developer > API Key
const AC_WAITLIST_LIST_ID = process.env.AC_WAITLIST_LIST_ID; // numeric id: list 9 "waitlist"
const AC_WAITLIST_TAG_ID = process.env.AC_WAITLIST_TAG_ID;   // numeric id: "Waitlist" tag

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'method_not_allowed' });
  }

  const body = typeof req.body === 'string' ? safeJson(req.body) : (req.body || {});
  const email = (body.email || '').trim().toLowerCase();
  const firstName = clean(body.firstName);
  const lastName = clean(body.lastName);
  const phone = clean(body.phone);

  // Enforced server-side too: client-side validation is a UX nicety anyone can
  // bypass with a devtools fetch.
  if (!isValidEmail(email)) {
    return res.status(400).json({ ok: false, error: 'invalid_email' });
  }
  if (!firstName) {
    return res.status(400).json({ ok: false, error: 'missing_name' });
  }
  if (phone && !isValidPhone(phone)) {
    return res.status(400).json({ ok: false, error: 'invalid_phone' });
  }
  if (!AC_URL || !AC_KEY || !AC_WAITLIST_LIST_ID || !AC_WAITLIST_TAG_ID) {
    console.error('waitlist: missing AC env vars');
    return res.status(500).json({ ok: false, error: 'not_configured' });
  }

  const headers = { 'Api-Token': AC_KEY, 'Content-Type': 'application/json' };

  try {
    // 1) Create or update the contact. sync is idempotent.
    const contact = { email, firstName };
    if (lastName) contact.lastName = lastName;
    if (phone) contact.phone = phone;

    const syncRes = await fetch(`${AC_URL}/api/3/contact/sync`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ contact }),
    });
    const syncJson = await syncRes.json();
    const contactId = syncJson?.contact?.id;
    if (!contactId) {
      console.error('waitlist: contact/sync failed', JSON.stringify(syncJson).slice(0, 500));
      return res.status(502).json({ ok: false, error: 'contact_sync_failed' });
    }

    // 2) Subscribe to the Waitlist list. status 1 = subscribed.
    const listRes = await fetch(`${AC_URL}/api/3/contactLists`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        contactList: { list: Number(AC_WAITLIST_LIST_ID), contact: Number(contactId), status: 1 },
      }),
    });
    if (!listRes.ok) {
      const txt = await listRes.text();
      console.error('waitlist: contactLists failed', listRes.status, txt.slice(0, 500));
      return res.status(502).json({ ok: false, error: 'list_subscribe_failed', contactId });
    }

    // 3) The tag is the real waitlist marker. Victor's automation triggers on it.
    const tagRes = await fetch(`${AC_URL}/api/3/contactTags`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ contactTag: { contact: Number(contactId), tag: Number(AC_WAITLIST_TAG_ID) } }),
    });
    if (!tagRes.ok) {
      const txt = await tagRes.text();
      console.error('waitlist: contactTags failed', tagRes.status, txt.slice(0, 300));
      return res.status(502).json({ ok: false, error: 'tag_failed', contactId });
    }

    return res.status(200).json({ ok: true, contactId, tagged: true });
  } catch (err) {
    console.error('waitlist: unexpected', err);
    return res.status(500).json({ ok: false, error: 'unexpected' });
  }
}

function clean(v) {
  return typeof v === 'string' ? v.trim().slice(0, 200) : '';
}

function isValidEmail(v) {
  // Deliberately stricter than a@b.c: requires a real TLD.
  return /^[^\s@]+@[^\s@.]+(\.[^\s@.]+)*\.[A-Za-z]{2,}$/.test(v) && v.length <= 254;
}

function isValidPhone(v) {
  // Digits, spaces, +, -, (, ). 7 to 20 digits. International audience.
  const digits = v.replace(/\D/g, '');
  return /^[+\d\s().-]+$/.test(v) && digits.length >= 7 && digits.length <= 20;
}

function safeJson(s) {
  try { return JSON.parse(s); } catch { return {}; }
}
