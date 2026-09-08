// POST /api/book   { eventUri, inviteeUri }   (from the Calendly embed on /apply)
//             or   { email, firstName, lastName?, startTime? }   (from /booked when
//                  Victor's Calendly redirect passes event details)
// Creates or updates the contact in Victor's ActiveCampaign and subscribes them
// to the "Booked Call" list (AC_BOOKED_LIST_ID). Victor's automation is
// triggered by that list.
//
// Calendly's embed only tells the page THAT a booking happened (event + invitee
// URIs), never the email. So when we get URIs, we look the invitee up with
// Victor's Calendly personal access token (CALENDLY_TOKEN). Without that token
// this route cannot learn who booked, and returns need_calendly_token.
//
// Keys live ONLY in Vercel env vars. Never inline them into a page.
// Account: victoralvarezalegria44473 (CLIENT). Never point this at Timo's own
// account (trombonetimollc4599) or at another client's (hballmusic).

const AC_URL = process.env.AC_URL;                        // https://<account>.api-us1.com
const AC_KEY = process.env.AC_KEY;                        // Settings > Developer > API Key
const AC_BOOKED_LIST_ID = process.env.AC_BOOKED_LIST_ID;  // numeric id: "Booked Call" (8)
const AC_BOOKED_TAG_ID = process.env.AC_BOOKED_TAG_ID;    // optional numeric tag id
const CALENDLY_TOKEN = process.env.CALENDLY_TOKEN;        // Calendly > Integrations > API & webhooks > Personal access token

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'method_not_allowed' });
  }

  const body = typeof req.body === 'string' ? safeJson(req.body) : (req.body || {});
  let email = (body.email || '').trim().toLowerCase();
  let firstName = clean(body.firstName);
  let lastName = clean(body.lastName);
  const eventUri = clean(body.eventUri);
  const inviteeUri = clean(body.inviteeUri);
  let startTime = clean(body.startTime);

  // Embed path: no email, only Calendly URIs. Look the invitee up.
  if (!email && inviteeUri) {
    if (!isCalendlyUri(inviteeUri)) {
      return res.status(400).json({ ok: false, error: 'bad_invitee_uri' });
    }
    if (!CALENDLY_TOKEN) {
      console.error('book: inviteeUri received but CALENDLY_TOKEN is not set');
      return res.status(500).json({ ok: false, error: 'need_calendly_token' });
    }
    try {
      const invRes = await fetch(inviteeUri, { headers: { Authorization: `Bearer ${CALENDLY_TOKEN}` } });
      const inv = (await invRes.json())?.resource;
      if (!invRes.ok || !inv?.email) {
        console.error('book: calendly invitee lookup failed', invRes.status);
        return res.status(502).json({ ok: false, error: 'calendly_lookup_failed' });
      }
      email = String(inv.email).trim().toLowerCase();
      firstName = clean(inv.first_name) || clean((inv.name || '').split(' ')[0]);
      lastName = clean(inv.last_name) || clean((inv.name || '').split(' ').slice(1).join(' '));
      if (eventUri && isCalendlyUri(eventUri)) {
        const evRes = await fetch(eventUri, { headers: { Authorization: `Bearer ${CALENDLY_TOKEN}` } });
        const ev = (await evRes.json())?.resource;
        if (evRes.ok && ev?.start_time) startTime = clean(ev.start_time);
      }
    } catch (e) {
      console.error('book: calendly lookup error', e && e.message);
      return res.status(502).json({ ok: false, error: 'calendly_lookup_failed' });
    }
  }

  // Enforced server-side too: client-side validation is a UX nicety anyone can
  // bypass with a devtools fetch.
  if (!isValidEmail(email)) {
    return res.status(400).json({ ok: false, error: 'invalid_email' });
  }
  if (!AC_URL || !AC_KEY || !AC_BOOKED_LIST_ID) {
    console.error('book: missing AC env vars');
    return res.status(500).json({ ok: false, error: 'not_configured' });
  }

  const headers = { 'Api-Token': AC_KEY, 'Content-Type': 'application/json' };

  try {
    // 1) Create or update the contact. sync is idempotent: a repeat booking
    //    updates rather than erroring on a duplicate.
    const contact = { email };
    if (firstName) contact.firstName = firstName;
    if (lastName) contact.lastName = lastName;

    const syncRes = await fetch(`${AC_URL}/api/3/contact/sync`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ contact }),
    });
    const syncJson = await syncRes.json();
    const contactId = syncJson?.contact?.id;

    if (!contactId) {
      console.error('book: contact/sync failed', JSON.stringify(syncJson).slice(0, 500));
      return res.status(502).json({ ok: false, error: 'contact_sync_failed' });
    }

    // 2) Subscribe to the "Booked Call" list. status 1 = subscribed. This is
    //    what fires Victor's automation.
    const listRes = await fetch(`${AC_URL}/api/3/contactLists`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        contactList: { list: Number(AC_BOOKED_LIST_ID), contact: Number(contactId), status: 1 },
      }),
    });

    if (!listRes.ok) {
      const txt = await listRes.text();
      console.error('book: contactLists failed', listRes.status, txt.slice(0, 500));
      return res.status(502).json({ ok: false, error: 'list_subscribe_failed', contactId });
    }

    // 3) Optional tag. A missing AC_BOOKED_TAG_ID skips this leg, and a tag
    //    failure never blocks the booking.
    let tagged = false;
    if (AC_BOOKED_TAG_ID) {
      const tagRes = await fetch(`${AC_URL}/api/3/contactTags`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          contactTag: { contact: Number(contactId), tag: Number(AC_BOOKED_TAG_ID) },
        }),
      });
      tagged = tagRes.ok;
      if (!tagRes.ok) {
        const txt = await tagRes.text();
        console.error('book: contactTags failed', tagRes.status, txt.slice(0, 300));
      }
    }

    // 4) Leave a note on the contact with the Calendly details, so Victor can
    //    see which slot was booked from inside AC. Best effort only.
    if (eventUri || startTime) {
      const note = [
        'Booked a call via /apply.',
        startTime ? `Start: ${startTime}` : '',
        eventUri ? `Calendly event: ${eventUri}` : '',
        inviteeUri ? `Calendly invitee: ${inviteeUri}` : '',
      ].filter(Boolean).join('\n');
      // Awaited: Vercel freezes the function once the response is sent, so a
      // fire-and-forget request here never completes.
      try {
        const noteRes = await fetch(`${AC_URL}/api/3/notes`, {
          method: 'POST',
          headers,
          body: JSON.stringify({ note: { note, relid: Number(contactId), reltype: 'Subscriber' } }),
        });
        if (!noteRes.ok) console.error('book: note failed', noteRes.status);
      } catch (e) { console.error('book: note failed', e && e.message); }
    }

    return res.status(200).json({ ok: true, contactId, tagged, firstName });
  } catch (err) {
    console.error('book: unexpected', err);
    return res.status(500).json({ ok: false, error: 'unexpected' });
  }
}

function isCalendlyUri(u) {
  return /^https:\/\/api\.calendly\.com\/scheduled_events\/[A-Za-z0-9-]+(\/invitees\/[A-Za-z0-9-]+)?$/.test(u);
}

function clean(v) {
  return typeof v === 'string' ? v.trim().slice(0, 300) : '';
}

function isValidEmail(v) {
  // Deliberately stricter than a@b.c: requires a real TLD.
  return /^[^\s@]+@[^\s@.]+(\.[^\s@.]+)*\.[A-Za-z]{2,}$/.test(v) && v.length <= 254;
}

function safeJson(s) {
  try { return JSON.parse(s); } catch { return {}; }
}
