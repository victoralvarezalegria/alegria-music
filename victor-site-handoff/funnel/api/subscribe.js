// POST /api/subscribe   { email, firstName, source? }
// Subscribes a masterclass registrant to Victor's ActiveCampaign list.
//
// source: omitted / anything else -> LIVE registration (index.html). List 5
//         "Registered for Webinar", whose automation "Masterclass LIVE" sends
//         the join link + countdown emails.
// source: "ondemand" -> the evergreen watch.html page. List 10 "Automated
//         Masterclass Leads" + tag 3 "Automated Masterclass Lead". Deliberately NOT list 5: those contacts already
//         have the replay and must never get "we start in 30 minutes".
//
// The API key lives ONLY in Vercel env vars. It must never be inlined into
// index.html: anything in the page source is readable by every visitor, and an
// AC key grants full account access (contacts, campaigns, exports).
//
// Account: victoralvarezalegria44473 (CLIENT). Never point this at Timo's own
// account (trombonetimollc4599) or at another client's (hballmusic).

const AC_URL = process.env.AC_URL;          // https://<account>.api-us1.com
const AC_KEY = process.env.AC_KEY;          // Settings > Developer > API Key
const AC_LIST_ID = process.env.AC_LIST_ID;  // numeric id: "Registered for Webinar"
const AC_TAG_ID = process.env.AC_TAG_ID;    // numeric id: "Masterclass Registrant" (optional)
const AC_ONDEMAND_LIST_ID = process.env.AC_ONDEMAND_LIST_ID; // numeric id: "Automated Masterclass Leads" (list 10)
const AC_ONDEMAND_TAG_ID = process.env.AC_ONDEMAND_TAG_ID;   // numeric id: "Automated Masterclass Lead" (tag 3, optional)

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'method_not_allowed' });
  }

  const body = typeof req.body === 'string' ? safeJson(req.body) : (req.body || {});
  const email = (body.email || '').trim();
  const firstName = (body.firstName || '').trim();
  const source = (body.source || '').trim().toLowerCase();
  const onDemand = source === 'ondemand';
  const listId = onDemand ? AC_ONDEMAND_LIST_ID : AC_LIST_ID;
  const tagId = onDemand ? AC_ONDEMAND_TAG_ID : AC_TAG_ID;

  // Enforced server-side too: client-side validation is a UX nicety that anyone
  // can bypass with a devtools fetch.
  if (!isValidEmail(email)) {
    return res.status(400).json({ ok: false, error: 'invalid_email' });
  }
  if (!AC_URL || !AC_KEY || !listId) {
    // An on-demand sign-up with no AC_ONDEMAND_LIST_ID fails here on purpose:
    // falling back to list 5 would fire the live countdown at a replay viewer.
    console.error('subscribe: missing AC env vars', { onDemand });
    return res.status(500).json({ ok: false, error: 'not_configured' });
  }

  const headers = { 'Api-Token': AC_KEY, 'Content-Type': 'application/json' };

  try {
    // 1) Create or update the contact. sync is idempotent, so a repeat
    //    registration updates rather than erroring on a duplicate.
    const syncRes = await fetch(`${AC_URL}/api/3/contact/sync`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ contact: { email, firstName } }),
    });
    const syncJson = await syncRes.json();
    const contactId = syncJson?.contact?.id;

    if (!contactId) {
      console.error('subscribe: contact/sync failed', JSON.stringify(syncJson).slice(0, 500));
      return res.status(502).json({ ok: false, error: 'contact_sync_failed' });
    }

    // 2) Subscribe to the list. status 1 = subscribed.
    const listRes = await fetch(`${AC_URL}/api/3/contactLists`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        contactList: { list: Number(listId), contact: Number(contactId), status: 1 },
      }),
    });

    if (!listRes.ok) {
      const txt = await listRes.text();
      console.error('subscribe: contactLists failed', listRes.status, txt.slice(0, 500));
      // The contact exists, so report partial success rather than losing the lead.
      return res.status(502).json({ ok: false, error: 'list_subscribe_failed', contactId });
    }

    // 3) Tag the contact so registrations are trackable and segmentable
    //    independent of list membership. Optional: a missing AC_TAG_ID skips
    //    this leg, and a tag failure never blocks the registration.
    let tagged = false;
    if (tagId) {
      const tagRes = await fetch(`${AC_URL}/api/3/contactTags`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          contactTag: { contact: Number(contactId), tag: Number(tagId) },
        }),
      });
      tagged = tagRes.ok;
      if (!tagRes.ok) {
        const txt = await tagRes.text();
        console.error('subscribe: contactTags failed', tagRes.status, txt.slice(0, 300));
      }
    }

    return res.status(200).json({ ok: true, contactId, tagged, list: Number(listId) });
  } catch (err) {
    console.error('subscribe: unexpected', err);
    return res.status(500).json({ ok: false, error: 'unexpected' });
  }
}

function isValidEmail(v) {
  // Deliberately stricter than a@b.c: requires a real TLD.
  return /^[^\s@]+@[^\s@.]+(\.[^\s@.]+)*\.[A-Za-z]{2,}$/.test(v) && v.length <= 254;
}

function safeJson(s) {
  try { return JSON.parse(s); } catch { return {}; }
}
