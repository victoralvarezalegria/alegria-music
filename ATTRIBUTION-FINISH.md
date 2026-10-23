# Attribution finish (branch `attribution-finish-2026-10-23`)

Goal: know which link / video brought each person who signs up for Victor's masterclass, and which of them later buy.
Background: `references/attribution-chain-audit.md` and `attribution-design-research.md` in the Victor workspace (0 rows ever recorded because 4 env vars were missing).

NOT merged, NOT deployed. Nothing was written to ActiveCampaign, Calendly or Supabase. All tests ran against local mocks.

## What changed

| Piece | Change |
|---|---|
| Fail loud | `sb.js` logs ONE `[tracking] DISABLED: missing env ...` error per cold start. `/api/health` now has `tracking: { ok, missing: [CC_SUPABASE_URL, ...], db }` (db = read-only probe of `cc_links`); `tracking.ok=false` turns health to 503. `/api/t/event` answers 503 instead of a silent 204. `/api/t/init` reports `tracking: false`. |
| `/go/<slug>` | Sets first-party cookies `tl_first` (only if absent) / `tl_last` = slug and `tc_first` / `tc_last` = click id (the `cc_link_clicks` row id), 90 days, Secure, SameSite=Lax. Adds `tc=<click id>` to the destination. If the DB is not configured or not answering, it now sends people to `/watch?tl=<slug>` (env `GO_FALLBACK_URL`) with the cookies and `X-Tracking: off`, instead of the home page. Unknown slugs still go home. |
| Source resolver | New `src/lib/tracking/source.js`: first / last touch from (1) the visitor's tagged `cc_sessions`, (2) the `/go` cookies, (3) the form page's own `?utm_...&tl=&tc=` (or the Referer). Email is never first touch. Slug-only touches get their UTMs from `cc_links`. Visitor id falls back to the `tv` cookie, so EU visitors who never accept the banner are still joined to their click. |
| Source into AC | New `src/lib/tracking/ac-source.js`. After the contact syncs, `/api/subscribe` (/watch), `/api/lead-magnet` (/guide), `/api/waitlist` and `/api/book` write the source to AC custom fields with `PUT /api/3/contacts/{id}`. Creates NO fields: reads the field list (cached 10 min), matches by personalization tag or title, skips missing fields. FIRST_* fields are only filled when empty. Never fails a sign-up. Response JSON has `acSource`. |
| `cc_conversions.meta.source` | Lead and booked_call rows carry `{ first, last }` (link, click_id, utm_*), so the link survives even when no session row exists. |
| Calendly | `/apply` adds `utm_term=<last slug>.<click id>` and `utm_campaign=<first slug>.<click id>` (from the cookies) next to the existing `utm_content=<visitor id>`. `/api/book` reads them from `invitee.tracking`, plus the cookies on the request. Verified in a browser: the iframe src carried `utm_term=high-notes.4300&utm_campaign=embouchure.4242`. |
| Forms | `/watch` and `/guide` send `qs: location.search` with the opt-in. |
| `t.js` | Removed the duplicate `tl` key (cosmetic). |
| Tests | `npm run build && npm run selftest:attribution` runs 51 checks: unit tests plus the built site started twice against a mock Supabase and a mock AC (once without the tracking env, once with it). 51/51 pass. |

## ActiveCampaign custom fields Timo must create (Contacts > Manage Fields, type Text)

| Field title | Personalization tag |
|---|---|
| First UTM Source | `FIRST_UTM_SOURCE` |
| First UTM Campaign | `FIRST_UTM_CAMPAIGN` |
| First UTM Content | `FIRST_UTM_CONTENT` |
| First Link | `FIRST_LINK` |
| First Click ID | `FIRST_CLICK_ID` |
| Last UTM Source | `LAST_UTM_SOURCE` |
| Last UTM Campaign | `LAST_UTM_CAMPAIGN` |
| Last UTM Content | `LAST_UTM_CONTENT` |
| Last Link | `LAST_LINK` |
| Last Click ID | `LAST_CLICK_ID` |

Any you skip are left out quietly. After deploy, `/api/health` shows `acSourceFields.found` / `missing`.

## Go-live checklist

1. Set on Victor's Vercel project (Production): `CC_SUPABASE_URL`, `CC_SUPABASE_SERVICE_KEY`, `CC_SALE_SECRET`, `CC_REPORT_SECRET` (values in MASTER.md). Optional: `GO_FALLBACK_URL`.
2. Create the 10 AC fields above.
3. Get approval, merge `attribution-finish-2026-10-23` into `master`, and deploy.
4. `GET https://www.alegriamusic.net/api/health` must show `tracking.ok: true`, `missing: []`, `db.ok: true`, and `acSourceFields.missing: []`.
5. Run the full test journey in Safari, reading the `cc_*` tables after each step:
   - Click `alegriamusic.net/go/embouchure`. It lands on `/watch?...&tl=embouchure&tc=<id>`, adds a `cc_link_clicks` row, and sets the `tl_*` / `tc_*` cookies.
   - Opt in with a test email. Check for a `cc_persons` row and a `cc_conversions` row (type lead, same `visitor_id`, `meta.source.last.link = embouchure`). The AC contact should show First/Last Link = embouchure.
   - Repeat once with "Reject all" on the banner. The lead still carries the visitor id and source.
   - Book on `/apply`. Check for `cc_conversions` booked_call with `meta.source`, and Calendly invitee tracking `utm_term = embouchure.<id>`.
   - Mark a test sale on the dashboard. Attribution should show it under embouchure.
6. Delete the test rows (cc_* rows for the test persons and visitors) and the test AC contacts. Cancel the test Calendly booking.

## Open questions for Timo (not decided in code)

- **Consent / legal:** the `tl_*`, `tc_*` and `tv` cookies are set by the `/go` redirect for every visitor, before the EU banner is answered (`tv` already was). Someone needs to sign off on that under ePrivacy, or `/go` should skip the cookies for `va_geo=consent` visitors.
- **Dashboard link credit:** `cc_link_stats` gives credit through `cc_sessions` / `cc_touches`. A consent-blocked lead has no session, so the Links tab does not count it yet. The link is in `cc_conversions.meta.source` and in `cc_link_clicks.visitor_id`. Fixing this means changing the SQL function (production DB, needs approval).
- **Sales are still manual** ("Mark a sale"). Victor's payment processor is still unknown.
