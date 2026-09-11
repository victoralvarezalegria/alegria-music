// Meta Conversions API. The browser pixel already fires these events; this is the
// server-side copy that survives iOS tracking prevention, ad blockers and the
// 7-day Safari cookie cap.
//
// Dedup is the whole game: the browser event and the server event MUST carry the
// SAME event_id, or Meta counts one purchase twice and Tim optimises against a
// number that is not real. Every page mints an eventId per conversion and the same
// uuid lands in cc_conversions.event_uuid, which is what we send here.
//
// ENV: META_PIXEL_ID, META_CAPI_TOKEN, META_TEST_EVENT_CODE. Victor's pages carry
// no Meta pixel today, so neither is set and every call returns skipped. The
// moment a pixel is added, set both and the server copy starts flowing with
// no code change.

import { createHash } from 'node:crypto';

const GRAPH_VERSION = 'v21.0';

export const EVENT_NAME_BY_TYPE = {
  lead: 'Lead',
  registration: 'CompleteRegistration',
  booked_call: 'Schedule',
  purchase: 'Purchase',
};

const sha256 = (v) => createHash('sha256').update(v, 'utf8').digest('hex');

// Meta wants lowercase, trimmed, then SHA-256. Sending a raw email is a policy
// violation and Meta drops the event, so this is never optional.
export function hashEmail(raw) {
  const v = String(raw || '').trim().toLowerCase();
  if (!v || v.indexOf('@') < 1) return null;
  return sha256(v);
}

// Digits only with a country code and NO leading plus. A bare 10-digit number is
// US, which is the only assumption in this file and the only one Tim's funnel
// needs today (Victor's audience is international; a full number with a
// country code passes through untouched).
export function normalizePhone(raw) {
  let d = String(raw || '').replace(/\D/g, '');
  if (!d) return null;
  if (d.length === 10) d = '1' + d;
  if (d.length < 8 || d.length > 15) return null;
  return d;
}

export function hashPhone(raw) {
  const d = normalizePhone(raw);
  return d ? sha256(d) : null;
}

// Names: trimmed, lowercased, SHA-256. Meta matches on fn/ln only in combination
// with something else, so these raise match quality rather than standing alone.
export function hashName(raw) {
  const v = String(raw || '').trim().toLowerCase().replace(/\s+/g, ' ');
  if (!v) return null;
  return sha256(v);
}

/**
 * Fire one server event. Never throws: a CAPI outage must not fail a purchase
 * webhook or a form submit. Returns { status: 'sent' | 'skipped' | 'skipped:no_ip_ua' | 'error:<msg>' }.
 */
export async function sendCapi(args) {
  const a = args || {};
  const token = process.env.META_CAPI_TOKEN;
  const pixelId = process.env.META_PIXEL_ID;
  if (!token || !pixelId) return { status: 'skipped' };

  // Meta requires client_ip_address AND client_user_agent on every website event.
  // Sending without them does not half-work: the event is accepted and then
  // silently dropped from attribution, which looks like a tracking bug forever.
  if (!a.ip || !a.ua) return { status: 'skipped:no_ip_ua' };

  const testCode = process.env.META_TEST_EVENT_CODE;

  const user_data = {};
  const em = hashEmail(a.email);
  if (em) user_data.em = [em];
  const ph = hashPhone(a.phone);
  if (ph) user_data.ph = [ph];
  const fn = hashName(a.firstName);
  if (fn) user_data.fn = [fn];
  const ln = hashName(a.lastName);
  if (ln) user_data.ln = [ln];
  user_data.client_ip_address = a.ip;
  user_data.client_user_agent = a.ua;
  if (a.fbp) user_data.fbp = a.fbp;
  if (a.fbc) user_data.fbc = a.fbc;
  // external_id is the visitor id: the stable first-party key that ties a browser
  // to every later event. Hashed for consistency with the rest of user_data.
  const ext = [];
  if (a.vid) ext.push(sha256(String(a.vid).trim().toLowerCase()));
  if (a.externalId) ext.push(sha256(String(a.externalId).trim().toLowerCase()));
  if (ext.length) user_data.external_id = ext;

  const event = {
    event_name: a.eventName,
    event_time: Math.floor((a.eventTime ? new Date(a.eventTime).getTime() : Date.now()) / 1000),
    event_id: a.eventId,
    action_source: 'website',
    user_data,
  };
  if (a.eventSourceUrl) event.event_source_url = a.eventSourceUrl;
  if (a.value != null && a.value !== '') {
    event.custom_data = { value: Number(a.value), currency: (a.currency || 'USD').toUpperCase() };
  }

  const body = { data: [event] };
  if (testCode) body.test_event_code = testCode;

  try {
    const r = await fetch(
      `https://graph.facebook.com/${GRAPH_VERSION}/${pixelId}/events?access_token=${encodeURIComponent(token)}`,
      { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) }
    );
    if (!r.ok) {
      const txt = (await r.text()).slice(0, 200);
      console.error('capi: rejected', r.status, txt);
      return { status: ('error:' + r.status + ' ' + txt).slice(0, 300) };
    }
    return { status: 'sent' };
  } catch (e) {
    const msg = (e && e.message) || 'fetch_failed';
    console.error('capi: error', msg);
    return { status: ('error:' + msg).slice(0, 300) };
  }
}

export default sendCapi;
