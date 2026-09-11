// POST /api/t/registered   { vid, email?, eventId, firstName?, phone? }
//
// The registration conversion is written HERE and not from a browser event,
// because the viewing room (/masterclass, or /registered for a live class) is
// the page a lead lands on straight after the form, and "reached the
// masterclass" is the number an ad set gets optimised against. A conversion row
// that only exists if the browser finished a fetch is a conversion row that
// quietly under-counts on every flaky mobile connection.
//
// The email is optional: if the page cannot supply one, the visitor id is enough
// to find the person the form already created.
//
// Ported from the kit's api/t/registered.js onto a Web Request.

import { recordConversion } from '@/lib/tracking/convert.js';
import { isUuid, normalizeEmail } from '@/lib/tracking/identity.js';
import { selectOne } from '@/lib/tracking/sb.js';
import { readCookies, readJson, json } from '@/lib/tracking/http.js';

export const dynamic = 'force-dynamic';

export async function POST(request) {
  const { body } = await readJson(request, 8 * 1024);
  const b = body || {};
  const cookies = readCookies(request);
  const vid = isUuid(b.vid) ? b.vid : (isUuid(cookies.tv) ? cookies.tv : null);
  let email = normalizeEmail(b.email);

  // Cheap gate: the visitor must already exist, which means they loaded a page and
  // /api/t/init issued them a cookie. Without this, anyone who found this URL could
  // POST arbitrary emails and mint cc_persons rows all day.
  if (!vid) return json({ ok: false, error: 'unknown_visitor' }, 404);
  const visitor = await selectOne('cc_visitors', 'id=eq.' + vid + '&select=id&limit=1');
  if (!visitor) return json({ ok: false, error: 'unknown_visitor' }, 404);

  // No email on the page? The form that created this visitor already knows it.
  if (!email && vid) {
    const link = await selectOne(
      'cc_visitor_person_links',
      'visitor_id=eq.' + vid + '&select=person_id&order=linked_at.desc&limit=1'
    );
    if (link && link.person_id) {
      const p = await selectOne('cc_persons', 'id=eq.' + link.person_id + '&select=email&limit=1');
      if (p && p.email) email = p.email;
    }
  }
  if (!email) return json({ ok: false, status: 'no_identity' }, 200);

  const out = await recordConversion({
    vid,
    email,
    type: 'registration',
    source: 'page',
    eventUuid: isUuid(b.eventId) ? b.eventId : null,
    firstName: b.firstName,
    lastName: b.lastName,
    phone: b.phone,
    req: request,
  });

  return json({ ok: out.ok, status: out.status }, 200);
}
