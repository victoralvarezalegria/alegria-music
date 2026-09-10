import type { Metadata } from "next";

// Ported verbatim from victor-site-handoff/funnel/apply.html.
// Copy, layout, styles and scripts are unchanged. Only the internal links were
// made absolute ("masterclass.html" -> "/masterclass") so they resolve as app
// routes instead of files.

export const metadata: Metadata = {
  title: "Book Your Free 1% Method Strategy Session",
  robots: { index: false, follow: false },
};

const css = `/* Layout mirrors precisionbrass.info/application-page. Palette + type are
   Victor's (same tokens as index.html / registered.html). */
:root {
    --bg: #1A1D24;
    --bg-raised: #212530;
    --ink: #E8E8E8;
    --muted: #8A8F9A;
    --accent: #FF6B35;
    --hairline: rgba(232, 232, 232, 0.12);
    --serif: "Cormorant Garamond", Georgia, serif;
}
* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: "Space Grotesk", Helvetica, Arial, sans-serif; background: var(--bg); color: var(--ink); }
.topbar { height: 4px; background: var(--accent); }
.wrap { max-width: 1100px; margin: 0 auto; padding: 0 20px; }

h1 { font-family: var(--serif); font-weight: 600; font-size: 60px; line-height: 1.12; color: #fff; text-align: center; padding-top: 44px; letter-spacing: -0.5px; }
.red { color: var(--accent); font-weight: 700; font-size: 21px; line-height: 1.7; text-align: center; margin-top: 44px; }
.plain { font-size: 21px; line-height: 1.7; text-align: center; color: var(--ink); margin-top: 30px; }

.steps { margin-top: 56px; font-size: 21px; line-height: 1.5; color: var(--ink); }
.steps p { margin-bottom: 30px; }
.steps b { color: #fff; }
.steps a { color: var(--accent); text-decoration: none; }
.steps a:hover { text-decoration: underline; }

.cal { max-width: 1000px; margin: 50px auto 0; border-radius: 8px; overflow: hidden; background: #fff; }
.calendly-inline-widget { min-width: 320px; height: 760px; transition: height .25s ease; }
.calendly-inline-widget iframe { display: block; border: 0; }
.booked-msg { display: none; max-width: 640px; margin: 20px auto 0; padding: 16px 20px; border-radius: 6px; background: rgba(255,107,53,0.10); border: 1px solid rgba(255,107,53,0.5); color: #fff; font-size: 17px; line-height: 1.55; text-align: center; }
.booked-msg.open { display: block; }
.booked-msg a { color: var(--accent); }

.notes { margin-top: 22px; font-size: 15px; line-height: 1.8; color: var(--muted); text-align: center; font-style: italic; }
.points { max-width: 900px; margin: 56px auto 0; }
.points p { font-size: 21px; line-height: 1.6; color: var(--ink); margin-bottom: 28px; }
.ready { font-family: var(--serif); font-size: 36px; line-height: 1.3; color: #fff; text-align: center; margin-top: 56px; font-weight: 600; font-style: italic; }
.cap { font-size: 21px; line-height: 1.7; text-align: center; color: var(--ink); margin-top: 34px; }

.footer { margin-top: 90px; padding: 30px 24px 40px; background: var(--bg-raised); border-top: 1px solid var(--hairline); text-align: center; }
.footer .copy { font-weight: 500; font-size: 14px; margin-bottom: 12px; color: var(--ink); }
.footer a { color: var(--accent); text-decoration: none; font-size: 13px; }
.footer a:hover { text-decoration: underline; }
.footer .links { margin-bottom: 18px; }
.footer .links span { color: var(--muted); margin: 0 8px; }
.disclaimer { max-width: 860px; margin: 0 auto; font-size: 12px; color: var(--muted); line-height: 1.6; }
.disclaimer p { margin-bottom: 8px; }

@media (max-width: 860px) {
    h1 { font-size: 36px; padding-top: 30px; }
    .red, .plain, .steps, .points p, .cap { font-size: 17px; }
    .steps { margin-top: 36px; }
    .cal { margin-top: 30px; }
    .calendly-inline-widget { height: 1000px; }
    .ready { font-size: 27px; }
}`;

const bodyHtml = `<div class="topbar"></div>

<div class="wrap">

    <h1>Book Your Free 1% Method Strategy Session On This Page</h1>

    <div class="red">Lock in your time before the breakthrough strategy call bookings close to see if you qualify<br>(we only work with limited clients at a time)</div>

    <p class="plain">Others were on this exact page, in your position, and it was their pivotal moment in transforming their playing.</p>

    <p class="plain">Book your time today before we hit our member cap</p>

    <div class="steps">
        <p><b>Step 1.</b> Watch Victor's famous masterclass (if you have not watched, <a href="/masterclass">click here for replay</a>)</p>
        <p><b>Step 2.</b> Choose time for no cost strategy call</p>
    </div>

    <div class="cal" id="book">
        <div class="calendly-inline-widget" id="calendly"
             data-url="https://calendly.com/victoralvarezalegria/30min?hide_gdpr_banner=1"
             style="min-width:320px;height:760px;"></div>
    </div>

    <div class="booked-msg" id="bookedMsg">
        Your call is booked. Taking you to the next step&hellip; If nothing happens, <a href="/booked" id="bookedLink">click here</a>.
    </div>

    <div class="notes">
        *Make sure you are choosing your correct time zone*<br>
        *If the calendar doesn't load after a few seconds, try refreshing the page.<br>
        *Note that this is not a sales call*
    </div>

    <div class="points">
        <p>&#128073; Note that we don't make an offer to everyone, this call is about determining whether you can grow your playing using the 1% Method model, and whether our approach and community align with your goals.</p>
        <p>&#128073; Our process does not work for everyone. If we determine that we can't help, we&rsquo;ll happily refer you to a service or company that can meet your needs.</p>
        <p>&#128073; It doesn't matter if you're an absolute beginner, intermediate, advanced, professional, returning to the instrument, or even recovering from an injury. The aim of the 1% Method is to get everyone inside to consistent growth.</p>
    </div>

    <div class="ready">Are you ready to become my next biggest success story?</div>

    <p class="cap">Book your time today before we hit our member cap</p>

</div>

<div class="footer">
    <div class="copy">&copy;2026 Victor Alegria Music</div>
    <div class="links">
    </div>
    <div class="disclaimer">
        <p>This site is not a part of the Facebook website or Facebook Inc. Additionally, this site is NOT endorsed by Facebook in any way. FACEBOOK is a trademark of FACEBOOK, Inc.</p>
        <p>NOT GOOGLE: This site is not a part of the Google website or Google Inc. Additionally, this site is NOT endorsed by Google in any way.</p>
    </div>
</div>`;

const bodyScript1 = `
/* Calendly posts "calendly.event_scheduled" to this window when a slot is booked.
   The payload carries the event + invitee URIs (never the email). We hand those
   to /api/book, which looks the invitee up with Victor's Calendly token and
   subscribes them to the "Booked Call" list in ActiveCampaign. Then on to /booked.
   The AC key is never in this file: page source is public to every visitor. */
var BOOK_ENDPOINT = "/api/book";
var BOOKED_PAGE = "/booked";   /* cleanUrls: /booked.html 308s to /booked */
var bookedMsg = document.getElementById('bookedMsg');
var sent = false;

/* Calendly posts "calendly.page_height" every time its content changes size
   (month view, time list, form, confirmation). The frame follows it, so the
   calendar never scrolls inside its own box. payload.height arrives as a
   string like "1052px": parse it, bound it, and set BOTH the wrapper and the
   iframe, or the wrapper grows while the iframe stays at the inline 760px. */
window.addEventListener('message', function (e) {
    if (e.origin !== 'https://calendly.com') return;
    var d = e.data || {};
    if (d.event !== 'calendly.page_height' || !d.payload || !d.payload.height) return;
    var h = parseInt(d.payload.height, 10);
    if (!(h > 300 && h < 6000)) return;
    var box = document.getElementById('calendly');
    if (!box) return;
    box.style.height = (h + 4) + 'px';
    var f = box.querySelector('iframe');
    if (f) f.style.height = (h + 4) + 'px';
});

window.addEventListener('message', function (e) {
    if (e.origin !== 'https://calendly.com') return;
    var d = e.data || {};
    if (d.event !== 'calendly.event_scheduled' || sent) return;
    sent = true;
    var payload = d.payload || {};
    var eventUri = payload.event && payload.event.uri ? payload.event.uri : '';
    var inviteeUri = payload.invitee && payload.invitee.uri ? payload.invitee.uri : '';
    bookedMsg.classList.add('open');
    bookedMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });
    try { sessionStorage.setItem('va_booked', '1'); } catch (e2) {}

    var go = function () { window.location.href = BOOKED_PAGE; };
    fetch(BOOK_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ eventUri: eventUri, inviteeUri: inviteeUri }),
        keepalive: true
    }).then(function (r) { return r.json().catch(function () { return {}; }); })
      .then(function (data) {
          if (data && data.firstName) {
              try { sessionStorage.setItem('va_name', data.firstName); } catch (e3) {}
          }
          go();
      }, go);
    setTimeout(go, 6000);
});
`;

export default function Page() {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&display=swap" rel="stylesheet" />
      <link href="https://assets.calendly.com/assets/external/widget.css" rel="stylesheet" />
      <style dangerouslySetInnerHTML={{ __html: css }} />

      <div dangerouslySetInnerHTML={{ __html: bodyHtml }} />
      <script src="https://assets.calendly.com/assets/external/widget.js" async></script>
      <script
        id="body-1"
        dangerouslySetInnerHTML={{ __html: bodyScript1 }}
      />
    </>
  );
}
