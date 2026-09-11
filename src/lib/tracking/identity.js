// Identity stitching. A person is one human keyed by a verified email. A visitor
// is one browser. The only thing that links them is an EXPLICIT identity event:
// a form submit, a Calendly booking, a click on a tagged email link, a payment.
//
// What this file deliberately does NOT do: merge two persons. Device and IP
// matching produces confident nonsense (shared laptops, office NAT, a partner's
// phone), and an attribution system that quietly welds two humans together is
// worse than one that leaves a duplicate for Timo to look at. Duplicates surface
// in /api/t/report?view=unmerged for a manual call.

import { insert, upsert, update, select, selectOne, isDuplicate, sbReady } from './sb.js';

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
export const isUuid = (v) => typeof v === 'string' && UUID_RE.test(v);

const EMAIL_RE = /^[^\s@]+@[^\s@.]+(\.[^\s@.]+)*\.[A-Za-z]{2,}$/;
export function normalizeEmail(raw) {
  const v = String(raw || '').trim().toLowerCase();
  if (!v || v.length > 254 || !EMAIL_RE.test(v)) return '';
  return v;
}

function clean(v, max) {
  return typeof v === 'string' && v.trim() ? v.trim().slice(0, max || 200) : null;
}

/**
 * Find or create the person for this email, link the visitor to them, and
 * back-fill person_id on everything that visitor has already done.
 * Returns { personId, email, created } or null when there is nothing to link.
 */
export async function linkVisitorToPerson(args) {
  const a = args || {};
  if (!sbReady()) return null;
  const email = normalizeEmail(a.email);
  if (!email) return null;

  // Only ever FILL blanks. A Calendly booking that says "Vic" must not overwrite
  // the "Victor" the person typed into the form themselves.
  const fresh = {
    email,
    phone: clean(a.phone, 40),
    first_name: clean(a.firstName, 100),
    last_name: clean(a.lastName, 100),
    ac_contact_id: clean(a.acContactId, 40),
  };

  let person = await selectOne('cc_persons', 'email=eq.' + encodeURIComponent(email) + '&select=*&limit=1');
  if (!person) {
    const ins = await insert('cc_persons', fresh);
    if (ins.ok && Array.isArray(ins.data) && ins.data[0]) {
      person = ins.data[0];
    } else if (isDuplicate(ins)) {
      // Two conversions landed in the same instant. Re-read the winner.
      person = await selectOne('cc_persons', 'email=eq.' + encodeURIComponent(email) + '&select=*&limit=1');
    }
    if (!person) return null;
  } else {
    const patch = {};
    for (const k of ['phone', 'first_name', 'last_name', 'ac_contact_id']) {
      if (fresh[k] && !person[k]) patch[k] = fresh[k];
    }
    if (Object.keys(patch).length) {
      await update('cc_persons', 'id=eq.' + person.id, patch, { returning: 'minimal' });
    }
  }

  const personId = person.id;
  const vid = isUuid(a.vid) ? a.vid : null;
  const source = clean(a.source, 40) || 'form';

  // Forwarded-link guard. An ?ac= click proves only that SOMEONE opened an email
  // in this browser: people forward newsletters to a spouse, a bandmate, a student.
  // If this browser already belongs to a person who identified themselves by a
  // real act (typed the form, booked the call, paid), an email click must never
  // bolt a second person onto it. Form, Calendly and payment events still may.
  if (vid && source === 'email_click') {
    const prior = await select(
      'cc_visitor_person_links',
      'visitor_id=eq.' + vid + '&source=in.(form,calendly,stripe,paypal,manual)&select=person_id&limit=5'
    );
    if (prior.ok && Array.isArray(prior.data) && prior.data.some((l) => l.person_id !== personId)) {
      console.warn('identity: email_click link suppressed, visitor already verified as another person', vid);
      return { personId, email, linked: false, suppressed: 'forwarded_link' };
    }
  }

  if (vid) {
    // The visitor row may not exist yet if the first thing they ever did was
    // submit a form with a stale localStorage id. Create it so the FK holds.
    await upsert('cc_visitors', { id: vid, last_seen_at: new Date().toISOString() }, 'id', { returning: 'minimal' });
    await upsert(
      'cc_visitor_person_links',
      { visitor_id: vid, person_id: personId, source: clean(a.source, 40) || 'form' },
      'visitor_id,person_id',
      { returning: 'minimal' }
    );
    // Back-fill. Only rows with a null person_id: never steal a row that is
    // already attributed to someone else.
    const q = 'visitor_id=eq.' + vid + '&person_id=is.null';
    await Promise.allSettled([
      update('cc_sessions', q, { person_id: personId }, { returning: 'minimal' }),
      update('cc_touches', q, { person_id: personId }, { returning: 'minimal' }),
      update('cc_events', q, { person_id: personId }, { returning: 'minimal' }),
    ]);
  }

  return { personId, email, created: !person.created_at ? true : undefined };
}

/**
 * A click on an ActiveCampaign link carries ?ac=%SUBSCRIBERID%, which is an AC
 * contact id, not an email. Resolve it against AC and link.
 * Cheap enough to run inline: one GET against AC's contact endpoint.
 * AC_URL and AC_KEY are the same env names /api/subscribe and /api/book already use.
 */
export async function stitchByAcContact(vid, acId) {
  const id = String(acId || '').trim();
  if (!isUuid(vid) || !/^\d{1,12}$/.test(id)) return null;
  const AC_URL = process.env.AC_URL;
  const AC_KEY = process.env.AC_KEY;
  if (!AC_URL || !AC_KEY) return null;

  try {
    const r = await fetch(`${AC_URL.replace(/\/+$/, '')}/api/3/contacts/${id}`, {
      headers: { 'Api-Token': AC_KEY },
    });
    if (!r.ok) {
      console.error('stitchByAcContact: lookup failed', r.status);
      return null;
    }
    const c = (await r.json())?.contact;
    if (!c || !c.email) return null;
    return await linkVisitorToPerson({
      vid,
      email: c.email,
      firstName: c.firstName,
      lastName: c.lastName,
      phone: c.phone,
      acContactId: id,
      source: 'email_click',
    });
  } catch (e) {
    console.error('stitchByAcContact: error', e && e.message);
    return null;
  }
}

// Persons that share a browser with another person. Not a merge: a review queue.
export async function findUnmerged(days) {
  const since = new Date(Date.now() - (days || 90) * 86400000).toISOString();
  const persons = await select('cc_persons', 'select=id,email,first_name,last_name,created_at&created_at=gte.' + since + '&order=created_at.desc&limit=500');
  if (!persons.ok || !Array.isArray(persons.data) || !persons.data.length) return [];
  const byId = new Map(persons.data.map((p) => [p.id, p]));
  const links = await select('cc_visitor_person_links', 'select=visitor_id,person_id,source,linked_at&limit=5000');
  if (!links.ok || !Array.isArray(links.data)) return [];
  const byVisitor = new Map();
  for (const l of links.data) {
    if (!byVisitor.has(l.visitor_id)) byVisitor.set(l.visitor_id, []);
    byVisitor.get(l.visitor_id).push(l);
  }
  const out = [];
  for (const [visitorId, group] of byVisitor) {
    if (group.length < 2) continue;
    const people = group.map((l) => byId.get(l.person_id)).filter(Boolean);
    if (people.length < 2) continue;
    // The moment the collision happened: the latest of the two link times, which
    // is when the second person appeared on a browser that already had one.
    const linkedAt = group.map((l) => l.linked_at).filter(Boolean).sort().pop() || null;
    out.push({
      visitor_id: visitorId,
      persons: people,
      sources: group.map((l) => l.source),
      linked_at: linkedAt,
    });
  }
  return out;
}
