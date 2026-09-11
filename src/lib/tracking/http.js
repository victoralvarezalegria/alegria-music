// Request adapters for the App Router. The kit was written against Vercel's
// (req, res) handlers, where req.headers is a plain object. App Router route
// handlers receive a Web Request, where headers is a Headers instance. Every
// helper here accepts either shape so the lib files stay shared with the
// original kit line for line.

const NO_STORE = 'no-store, no-cache, must-revalidate, max-age=0';

export function headerOf(req, name) {
  if (!req || !req.headers) return '';
  const h = req.headers;
  if (typeof h.get === 'function') return h.get(name) || '';
  const v = h[name] || h[String(name).toLowerCase()];
  return Array.isArray(v) ? v.join(', ') : (v ? String(v) : '');
}

export function clientIp(req) {
  const first = headerOf(req, 'x-forwarded-for').split(',')[0].trim();
  return first || headerOf(req, 'x-real-ip') || null;
}

export function readCookies(req) {
  const raw = headerOf(req, 'cookie');
  const out = {};
  for (const part of raw.split(';')) {
    const i = part.indexOf('=');
    if (i < 1) continue;
    const k = part.slice(0, i).trim();
    if (!k) continue;
    try { out[k] = decodeURIComponent(part.slice(i + 1).trim()); }
    catch { out[k] = part.slice(i + 1).trim(); }
  }
  return out;
}

// Country / region / city from Vercel's edge headers. null when none are set
// (local dev, or a non-Vercel host), so the column stays null rather than {}.
export function geoOf(req) {
  const geo = {
    country: short(headerOf(req, 'x-vercel-ip-country')),
    region: short(headerOf(req, 'x-vercel-ip-country-region')),
    city: decodeSafe(short(headerOf(req, 'x-vercel-ip-city'))),
  };
  return (geo.country || geo.region || geo.city) ? geo : null;
}

export function userAgentOf(req) {
  return headerOf(req, 'user-agent').slice(0, 600);
}

// Body as a plain object, never throws. The raw text is returned too so the
// caller can enforce a size cap before doing anything else.
export async function readJson(request, maxBytes) {
  let text = '';
  try { text = await request.text(); } catch { text = ''; }
  if (maxBytes && text && Buffer.byteLength(text, 'utf8') > maxBytes) {
    return { body: null, tooLarge: true };
  }
  let body = {};
  if (text) { try { body = JSON.parse(text); } catch { body = {}; } }
  if (!body || typeof body !== 'object' || Array.isArray(body)) body = {};
  return { body, tooLarge: false };
}

export function json(data, status, extraHeaders) {
  const headers = new Headers({ 'Cache-Control': NO_STORE, 'Content-Type': 'application/json' });
  if (extraHeaders) {
    for (const [k, v] of Object.entries(extraHeaders)) {
      if (Array.isArray(v)) for (const item of v) headers.append(k, item);
      else headers.set(k, v);
    }
  }
  return new Response(JSON.stringify(data), { status: status || 200, headers });
}

export function empty(status, extraHeaders) {
  const headers = new Headers({ 'Cache-Control': NO_STORE });
  if (extraHeaders) for (const [k, v] of Object.entries(extraHeaders)) headers.set(k, v);
  return new Response(null, { status: status || 204, headers });
}

export function isIp(v) {
  if (!v) return false;
  if (/^\d{1,3}(\.\d{1,3}){3}$/.test(v)) return v.split('.').every((n) => Number(n) <= 255);
  return /^[0-9a-f:]+$/i.test(v) && v.includes(':');
}

function short(v) { return v ? String(v).slice(0, 120) : null; }
function decodeSafe(v) { if (!v) return null; try { return decodeURIComponent(v); } catch { return v; } }
