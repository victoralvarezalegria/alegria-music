// POST /api/t/sale   header x-sale-secret: <CC_SALE_SECRET>
//   { email, amount, currency?, date?, note?, vid?, firstName?, lastName?, phone? }
//
// Victor closes on the phone. Those sales are the ones that decide whether an ad
// set lives or dies, and no webhook will ever tell us about them, so there has to
// be a door a human can walk through. The shared secret is the whole gate: this
// route writes revenue, so it must never be callable from a page.
//
// The external id is deterministic (email + date + amount), so pasting the same
// sale twice is a no-op instead of doubling the ROAS.
//
// Ported from the kit's api/t/sale.js onto a Web Request.

import { createHash, timingSafeEqual } from 'node:crypto';
import { recordConversion } from '@/lib/tracking/convert.js';
import { isUuid, normalizeEmail } from '@/lib/tracking/identity.js';
import { headerOf, readJson, json } from '@/lib/tracking/http.js';

export const dynamic = 'force-dynamic';

const NOINDEX = { 'X-Robots-Tag': 'noindex, nofollow' };

export async function POST(request) {
  const secret = process.env.CC_SALE_SECRET;
  if (!secret) return json({ ok: false, error: 'not_configured' }, 500, NOINDEX);
  const given = headerOf(request, 'x-sale-secret');
  if (!constantEquals(given, secret)) return json({ ok: false, error: 'unauthorized' }, 401, NOINDEX);

  const { body } = await readJson(request, 16 * 1024);
  const b = body || {};
  const email = normalizeEmail(b.email);
  if (!email) return json({ ok: false, error: 'invalid_email' }, 400, NOINDEX);

  const amount = Number(b.amount);
  if (!Number.isFinite(amount) || amount < 0) return json({ ok: false, error: 'invalid_amount' }, 400, NOINDEX);

  // Date defaults to today in ISO. It is part of the idempotency key, so a blank
  // date and a typed date for the same sale are two different rows: always pass it.
  const dateRaw = String(b.date || '').trim();
  const when = dateRaw ? new Date(dateRaw) : new Date();
  if (isNaN(when.getTime())) return json({ ok: false, error: 'invalid_date' }, 400, NOINDEX);
  const dateKey = when.toISOString().slice(0, 10);

  const externalId = 'manual:' + createHash('sha1')
    .update(email + '|' + dateKey + '|' + amount.toFixed(2), 'utf8')
    .digest('hex');

  const out = await recordConversion({
    vid: isUuid(b.vid) ? b.vid : null,
    email,
    type: 'purchase',
    value: amount,
    currency: b.currency || 'USD',
    source: 'manual',
    externalId,
    occurredAt: when.toISOString(),
    firstName: b.firstName,
    lastName: b.lastName,
    phone: b.phone,
    meta: b.note ? { note: String(b.note).slice(0, 1000) } : null,
    req: request,
  });

  return json({ ok: out.ok, status: out.status, externalId }, out.ok ? 200 : 422, NOINDEX);
}

function constantEquals(a, b) {
  const ab = Buffer.from(String(a), 'utf8');
  const bb = Buffer.from(String(b), 'utf8');
  if (ab.length !== bb.length) return false;
  return timingSafeEqual(ab, bb);
}
