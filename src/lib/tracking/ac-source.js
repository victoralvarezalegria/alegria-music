// Source into ActiveCampaign. After a form or a booking has synced the contact,
// this writes where the person came from onto AC custom contact fields, so
// Victor can see "which video brought this lead" inside AC and segment on it.
//
// This file CREATES NOTHING in AC. The fields are made by hand (Contacts >
// Manage Fields, type Text, with the personalization tags below). At runtime
// the field list is read once per warm instance and matched on the
// personalization tag (or the title, normalized: "First UTM Source" ->
// FIRST_UTM_SOURCE). A field that does not exist is skipped and named in the
// result; a missing field never fails a sign-up.
//
// First touch is never overwritten: FIRST_* fields are only written when the
// contact's current value is empty. LAST_* fields are written on every
// sign-up or booking that knows a source, and never blanked by one that does not.
//
// Uses the same mechanics as Timo's fb-funnel subscribe.js (fieldValues
// [{ field, value }]), sent with PUT /api/3/contacts/{id}.

export const AC_SOURCE_FIELDS = {
  first: {
    utm_source: 'FIRST_UTM_SOURCE',
    utm_campaign: 'FIRST_UTM_CAMPAIGN',
    utm_content: 'FIRST_UTM_CONTENT',
    link: 'FIRST_LINK',
    click_id: 'FIRST_CLICK_ID',
  },
  last: {
    utm_source: 'LAST_UTM_SOURCE',
    utm_campaign: 'LAST_UTM_CAMPAIGN',
    utm_content: 'LAST_UTM_CONTENT',
    link: 'LAST_LINK',
    click_id: 'LAST_CLICK_ID',
  },
};

export const AC_SOURCE_TAGS = [
  ...Object.values(AC_SOURCE_FIELDS.first),
  ...Object.values(AC_SOURCE_FIELDS.last),
];

const FIELD_TTL_MS = 10 * 60 * 1000;
let cache = { at: 0, map: null };

export function normalizeTag(v) {
  return String(v || '').trim().toUpperCase().replace(/[^A-Z0-9]+/g, '_').replace(/^_+|_+$/g, '');
}

// For the selftest: forget the cached field list.
export function _resetFieldCache() {
  cache = { at: 0, map: null };
}

/** Map of PERSTAG -> AC field id, for the tags this file cares about. */
export async function fieldMap(acUrl, apiKey) {
  if (cache.map && Date.now() - cache.at < FIELD_TTL_MS) return cache.map;
  const base = String(acUrl || '').replace(/\/+$/, '') + '/api/3';
  const map = new Map();
  let offset = 0;
  for (let page = 0; page < 10; page++) {
    const r = await fetch(`${base}/fields?limit=100&offset=${offset}`, { headers: { 'Api-Token': apiKey } });
    if (!r.ok) throw new Error('fields_http_' + r.status);
    const j = await r.json();
    const fields = Array.isArray(j && j.fields) ? j.fields : [];
    for (const f of fields) {
      for (const cand of [normalizeTag(f.perstag), normalizeTag(f.title)]) {
        if (AC_SOURCE_TAGS.includes(cand) && !map.has(cand)) map.set(cand, String(f.id));
      }
    }
    if (fields.length < 100) break;
    offset += 100;
  }
  cache = { at: Date.now(), map };
  return map;
}

/** Which source fields exist in AC, for /api/health. Read-only. */
export async function sourceFieldStatus(acUrl, apiKey) {
  if (!acUrl || !apiKey) return { ok: false, error: 'not_configured' };
  try {
    const map = await fieldMap(acUrl, apiKey);
    const found = AC_SOURCE_TAGS.filter((t) => map.has(t));
    const missing = AC_SOURCE_TAGS.filter((t) => !map.has(t));
    return { ok: missing.length === 0, found, missing };
  } catch (e) {
    return { ok: false, error: (e && e.message) || 'unexpected' };
  }
}

function val(v) {
  return v == null ? '' : String(v).trim().slice(0, 255);
}

/**
 * Pure: which fieldValues to send. existing = Map(fieldId -> current value).
 * Returns { fieldValues: [{field, value}], missing: [PERSTAG] }.
 */
export function planFieldValues(source, map, existing) {
  const s = source || {};
  const fieldValues = [];
  const missing = [];
  for (const which of ['first', 'last']) {
    const touch = s[which];
    if (!touch) continue;
    for (const [key, tag] of Object.entries(AC_SOURCE_FIELDS[which])) {
      const value = val(touch[key]);
      if (!value) continue;
      const id = map.get(tag);
      if (!id) { missing.push(tag); continue; }
      if (which === 'first' && existing && val(existing.get(id))) continue; // first touch stays
      fieldValues.push({ field: id, value });
    }
  }
  return { fieldValues, missing };
}

/**
 * writeSourceToAc({ acUrl, apiKey, contactId, source })
 * -> { status: 'written' | 'nothing_to_write' | 'no_source' | 'no_fields' | 'error:<msg>', written, missing }
 * Never throws.
 */
export async function writeSourceToAc(args) {
  const a = args || {};
  const source = a.source || {};
  if (!source.first && !source.last) return { status: 'no_source', written: 0, missing: [] };
  if (!a.acUrl || !a.apiKey || !a.contactId) return { status: 'error:not_configured', written: 0, missing: [] };
  const base = String(a.acUrl).replace(/\/+$/, '') + '/api/3';
  const headers = { 'Api-Token': a.apiKey, 'Content-Type': 'application/json' };
  try {
    const map = await fieldMap(a.acUrl, a.apiKey);
    if (!map.size) {
      console.error('ac-source: none of the source fields exist in ActiveCampaign yet (' + AC_SOURCE_TAGS.join(', ') + ')');
      return { status: 'no_fields', written: 0, missing: AC_SOURCE_TAGS.slice() };
    }

    // Current values, only needed to protect first touch.
    let existing = null;
    const firstIds = Object.values(AC_SOURCE_FIELDS.first).map((t) => map.get(t)).filter(Boolean);
    if (source.first && firstIds.length) {
      existing = new Map();
      const r = await fetch(`${base}/contacts/${encodeURIComponent(a.contactId)}/fieldValues`, { headers });
      if (!r.ok) {
        // Cannot prove the first-touch fields are empty, so do not touch them.
        console.error('ac-source: fieldValues read failed', r.status);
        for (const id of firstIds) existing.set(id, '(unknown)');
      } else {
        const j = await r.json();
        for (const fv of (j && j.fieldValues) || []) existing.set(String(fv.field), fv.value);
      }
    }

    const plan = planFieldValues(source, map, existing);
    if (!plan.fieldValues.length) return { status: 'nothing_to_write', written: 0, missing: plan.missing };

    const r = await fetch(`${base}/contacts/${encodeURIComponent(a.contactId)}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify({ contact: { fieldValues: plan.fieldValues } }),
    });
    if (!r.ok) {
      const txt = (await r.text()).slice(0, 300);
      console.error('ac-source: contact update failed', r.status, txt);
      return { status: 'error:http_' + r.status, written: 0, missing: plan.missing };
    }
    return { status: 'written', written: plan.fieldValues.length, missing: plan.missing };
  } catch (e) {
    const msg = (e && e.message) || 'unexpected';
    console.error('ac-source: error', msg);
    return { status: ('error:' + msg).slice(0, 200), written: 0, missing: [] };
  }
}

export default writeSourceToAc;
