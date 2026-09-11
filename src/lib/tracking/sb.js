// Thin PostgREST client for the attribution tables. No npm dependency: the
// Supabase JS client pulls in a websocket stack we never use, and these routes
// run on a cold serverless function where every KB of import costs milliseconds.
//
// ENV (set on Victor's Vercel project):
//   CC_SUPABASE_URL          https://agbldmgbxzrrxznwbxar.supabase.co (Victor's project)
//   CC_SUPABASE_SERVICE_KEY  service role key. NEVER ship this to a browser.
//
// Every cc_ table has RLS ON with no policies, so the service role is the only
// thing that can read or write them. That is deliberate: the dashboard reads
// through /api/t/report, which runs its own admin gate.

const URL_BASE = () => (process.env.CC_SUPABASE_URL || '').replace(/\/+$/, '');
const KEY = () => process.env.CC_SUPABASE_SERVICE_KEY || '';

export function sbReady() {
  return Boolean(URL_BASE() && KEY());
}

function headers(extra) {
  const key = KEY();
  return Object.assign(
    {
      apikey: key,
      Authorization: 'Bearer ' + key,
      'Content-Type': 'application/json',
    },
    extra || {}
  );
}

// Raw request. Returns { ok, status, data, error }. Never throws on an HTTP
// error: callers decide what a 409 or a 404 means for them.
async function request(path, init) {
  if (!sbReady()) return { ok: false, status: 0, data: null, error: 'no_credentials' };
  let r;
  try {
    r = await fetch(URL_BASE() + '/rest/v1/' + path, init);
  } catch (e) {
    return { ok: false, status: 0, data: null, error: (e && e.message) || 'fetch_failed' };
  }
  const text = await r.text();
  let data = null;
  if (text) { try { data = JSON.parse(text); } catch { data = text; } }
  if (!r.ok) {
    // PostgREST puts the Postgres SQLSTATE in .code. 23505 = unique violation,
    // which several callers treat as "already recorded, all good".
    const code = data && data.code ? String(data.code) : String(r.status);
    return { ok: false, status: r.status, data, error: code, message: (data && data.message) || text };
  }
  return { ok: true, status: r.status, data, error: null };
}

// INSERT. opts.returning 'representation' (default) | 'minimal'.
export async function insert(table, row, opts) {
  const o = opts || {};
  return request(table, {
    method: 'POST',
    headers: headers({
      Prefer: 'return=' + (o.returning === 'minimal' ? 'minimal' : 'representation'),
    }),
    body: JSON.stringify(row),
  });
}

// UPSERT via on_conflict. `conflict` is the column list PostgREST resolves on.
export async function upsert(table, row, conflict, opts) {
  const o = opts || {};
  const qs = conflict ? '?on_conflict=' + encodeURIComponent(conflict) : '';
  const prefer = [
    'resolution=merge-duplicates',
    'return=' + (o.returning === 'minimal' ? 'minimal' : 'representation'),
  ];
  return request(table + qs, {
    method: 'POST',
    headers: headers({ Prefer: prefer.join(',') }),
    body: JSON.stringify(row),
  });
}

// Call a Postgres function. A scalar-returning function (cc_report returns jsonb)
// comes back as the raw value; a set-returning one comes back as an array. Callers
// handle both rather than guessing.
export async function rpc(fn, args) {
  return request('rpc/' + fn, {
    method: 'POST',
    headers: headers({ Accept: 'application/json' }),
    body: JSON.stringify(args || {}),
  });
}

// SELECT. `query` is a raw PostgREST query string without the leading ?.
export async function select(table, query) {
  return request(table + (query ? '?' + query : ''), {
    method: 'GET',
    headers: headers({ Accept: 'application/json' }),
  });
}

// PATCH rows matching `query`.
export async function update(table, query, patch, opts) {
  const o = opts || {};
  return request(table + (query ? '?' + query : ''), {
    method: 'PATCH',
    headers: headers({
      Prefer: 'return=' + (o.returning === 'minimal' ? 'minimal' : 'representation'),
    }),
    body: JSON.stringify(patch),
  });
}

// Convenience: first row of a select, or null.
export async function selectOne(table, query) {
  const r = await select(table, query);
  if (!r.ok || !Array.isArray(r.data) || !r.data.length) return null;
  return r.data[0];
}

export const isDuplicate = (r) => r && (r.error === '23505' || r.status === 409);
