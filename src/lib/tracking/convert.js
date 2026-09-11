// One door for every conversion: form lead, registration, booked call, purchase.
// Everything that records money or intent goes through here so that identity
// stitching, idempotency and the Meta server event can never drift apart.
//
// Idempotency has two keys, because the two ways a conversion arrives twice are
// different problems:
//   event_uuid          the browser retried, or a beacon fired twice
//   (source, external_id)  Stripe or PayPal redelivered the same webhook
// Both are unique indexes in the schema, so the database is the referee, not us.

import { insert, update, selectOne, isDuplicate, sbReady } from './sb.js';
import { linkVisitorToPerson, isUuid, normalizeEmail } from './identity.js';
import { sendCapi, EVENT_NAME_BY_TYPE } from './capi.js';
import { clientIp as ipOf, userAgentOf } from './http.js';

// clientIp and readCookies live in http.js so they understand both a Web
// Request (App Router) and a Node req (the original kit). Re-exported here so
// callers written against the kit keep working unchanged.
export { clientIp, readCookies } from './http.js';

function randomUuid() {
  return (globalThis.crypto && globalThis.crypto.randomUUID)
    ? globalThis.crypto.randomUUID()
    : null;
}

/**
 * recordConversion({ vid, email, type, value, currency, source, externalId,
 *                    eventUuid, occurredAt, meta, req, phone, firstName, lastName,
 *                    acContactId, eventSourceUrl })
 * Returns { ok, status, conversionId?, personId?, capi? }. Never throws.
 */
export async function recordConversion(args) {
  const a = args || {};
  try {
    if (!sbReady()) return { ok: false, status: 'no_credentials' };

    const type = String(a.type || '').trim();
    if (!EVENT_NAME_BY_TYPE[type]) return { ok: false, status: 'bad_type' };

    const email = normalizeEmail(a.email);
    const vid = isUuid(a.vid) ? a.vid : null;

    // A conversion needs a person. cc_conversions.person_id is NOT NULL, which is
    // the schema saying the same thing: an anonymous purchase is not attributable.
    const link = await linkVisitorToPerson({
      vid,
      email,
      phone: a.phone,
      firstName: a.firstName,
      lastName: a.lastName,
      acContactId: a.acContactId,
      source: a.source === 'page' ? 'form' : (a.source || 'form'),
    });
    if (!link || !link.personId) return { ok: false, status: 'no_person' };

    const eventUuid = isUuid(a.eventUuid) ? a.eventUuid : randomUuid();
    if (!eventUuid) return { ok: false, status: 'no_event_uuid' };

    // Latest session gives us the pixel cookies and the click ids, which is what
    // makes the server event match the browser event inside Meta.
    let session = null;
    if (vid) {
      session = await selectOne(
        'cc_sessions',
        'visitor_id=eq.' + vid + '&select=id,fbclid,gclid,device,landing_url&order=started_at.desc&limit=1'
      );
    }
    const device = (session && session.device) || {};
    const occurredAt = a.occurredAt ? new Date(a.occurredAt).toISOString() : new Date().toISOString();

    const row = {
      event_uuid: eventUuid,
      visitor_id: vid,
      person_id: link.personId,
      type,
      value: a.value != null && a.value !== '' ? Number(a.value) : null,
      currency: (a.currency || 'USD').toUpperCase(),
      occurred_at: occurredAt,
      source: a.source || 'form',
      external_id: a.externalId ? String(a.externalId).slice(0, 300) : null,
      fbclid: (session && session.fbclid) || null,
      gclid: (session && session.gclid) || null,
      meta: a.meta || null,
    };

    const ins = await insert('cc_conversions', row);
    if (!ins.ok) {
      if (isDuplicate(ins)) {
        // Already recorded under either unique key. Do NOT re-send to Meta.
        const existing = row.external_id
          ? await selectOne('cc_conversions', 'source=eq.' + encodeURIComponent(row.source) + '&external_id=eq.' + encodeURIComponent(row.external_id) + '&select=id&limit=1')
          : await selectOne('cc_conversions', 'event_uuid=eq.' + eventUuid + '&select=id&limit=1');
        return { ok: true, status: 'duplicate', conversionId: existing && existing.id, personId: link.personId };
      }
      console.error('recordConversion: insert failed', ins.error, ins.message);
      return { ok: false, status: 'insert_failed' };
    }

    const conversionId = Array.isArray(ins.data) && ins.data[0] ? ins.data[0].id : null;

    const capi = await sendCapi({
      eventName: EVENT_NAME_BY_TYPE[type],
      eventId: eventUuid,
      email: link.email,
      phone: a.phone,
      firstName: a.firstName,
      lastName: a.lastName,
      ip: a.ip || ipOf(a.req),
      ua: userAgentOf(a.req) || device.ua || null,
      fbp: device.fbp || null,
      fbc: device.fbc || null,
      vid,
      externalId: link.personId,
      value: row.value,
      currency: row.currency,
      eventTime: occurredAt,
      eventSourceUrl: a.eventSourceUrl || (session && session.landing_url) || null,
    });

    if (conversionId) {
      await update('cc_conversions', 'id=eq.' + conversionId, { capi_status: capi.status }, { returning: 'minimal' });
    }

    return { ok: true, status: 'recorded', conversionId, personId: link.personId, capi: capi.status };
  } catch (e) {
    console.error('recordConversion: unexpected', e && e.message);
    return { ok: false, status: 'error' };
  }
}

export default recordConversion;
