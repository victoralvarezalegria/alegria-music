import type { Metadata } from "next";

// Ported verbatim from victor-site-handoff/funnel/apply.html.
// Copy, layout, styles and scripts are unchanged. Only the internal links were
// made absolute ("masterclass.html" -> "/masterclass") so they resolve as app
// routes instead of files.

export const metadata: Metadata = {
  title: "Book Your Free 1% Method Strategy Session",
  robots: { index: false, follow: false },
};

const css = `/* Victor's design system (same tokens as the approved /watch page, measured from alegriamusic.net):
   bg #1a1d24 / deep #15171c / card #22262f / raised #2a2e38 / line #2e3340 / text #e8e8e8 / muted #8a8f9a,
   one accent #FF6B35. Cormorant Garamond for display, Space Grotesk for everything else. */
:root {
    --bg: #1a1d24;
    --bg-deep: #15171c;
    --card: #22262f;
    --raised: #2a2e38;
    --line: #2e3340;
    --ink: #e8e8e8;
    --muted: #8a8f9a;
    --accent: #FF6B35;
    --accent-dark: #E85A26;
    --serif: "Cormorant Garamond", Georgia, serif;
    --sans: "Space Grotesk", Helvetica, Arial, sans-serif;
}
* { margin: 0; padding: 0; box-sizing: border-box; }
html { scroll-behavior: smooth; }
body {
    font-family: var(--sans); background: var(--bg); color: var(--ink);
    -webkit-font-smoothing: antialiased; overflow-x: hidden;
}
img { display: block; max-width: 100%; }

/* === HEADER === */
.bar {
    position: absolute; top: 0; left: 0; right: 0; z-index: 3;
    display: flex; align-items: center; gap: 12px;
    max-width: 1200px; margin: 0 auto; padding: 22px 32px;
}
.bar img { width: 26px; height: auto; }
.bar span { font-size: 12px; font-weight: 500; letter-spacing: 0.16em; text-transform: uppercase; color: var(--ink); }

/* === HERO === */
.hero { position: relative; isolation: isolate; overflow: hidden; padding: 132px 24px 72px; text-align: center; }
.hero-bg {
    position: absolute; inset: 0; z-index: -2;
    background: url(/images/victor-orchestra.jpg) center 30% / cover no-repeat;
    opacity: 0.22; filter: grayscale(0.25);
    animation: drift 24s ease-in-out infinite alternate;
}
.hero::after {
    content: ""; position: absolute; inset: 0; z-index: -1;
    background:
        radial-gradient(60% 55% at 50% 38%, rgba(255,107,53,0.08), transparent 70%),
        linear-gradient(180deg, rgba(26,29,36,0.55) 0%, rgba(26,29,36,0.82) 60%, var(--bg) 100%);
}
@keyframes drift { from { transform: scale(1.04); } to { transform: scale(1.12) translateY(-1.5%); } }
h1 {
    font-family: var(--serif); font-weight: 300; font-size: 64px; line-height: 1.06;
    letter-spacing: -0.01em; color: #fff; max-width: 980px; margin: 0 auto; text-wrap: balance;
}
.rule { width: 48px; height: 1px; background: var(--accent); margin: 30px auto 0; }
.red {
    max-width: 800px; margin: 30px auto 0; color: var(--accent); font-weight: 500; font-size: 14px;
    letter-spacing: 0.14em; text-transform: uppercase; line-height: 1.9;
}
.plain { max-width: 720px; margin: 26px auto 0; font-size: 19px; line-height: 1.7; color: #b9bdc6; }
.plain + .plain { margin-top: 14px; color: var(--ink); font-weight: 500; }

/* === STEPS (learn rows without the animation panel) === */
.points { max-width: 880px; margin: 0 auto; padding: 72px 32px 0; }
.learn-rows { display: flex; flex-direction: column; gap: 44px; }
.learn-row { display: grid; grid-template-columns: 96px 1fr; gap: 32px; align-items: start; }
.learn-row > * { min-width: 0; }
.learn-num { font-family: var(--serif); font-weight: 300; font-size: 56px; line-height: 1; color: var(--accent); }
.benefit { font-size: 17px; line-height: 1.75; color: #b9bdc6; padding-top: 8px; }
.benefit b { font-family: var(--serif); font-weight: 400; font-style: italic; font-size: 32px; line-height: 1.15; color: #fff; margin-right: 6px; }
.benefit a { color: var(--accent); text-decoration: none; }
.benefit a:hover { text-decoration: underline; }
.steps { padding-top: 72px; }

/* === CALENDLY BAND === */
.calband { background: var(--bg-deep); border-top: 1px solid var(--line); border-bottom: 1px solid var(--line); margin-top: 80px; padding: 72px 24px 64px; }
.calcard {
    max-width: 1040px; margin: 0 auto; background: var(--card); border: 1px solid var(--line);
    border-radius: 0.3rem; padding: 20px;
    box-shadow: 0 40px 90px -30px rgba(0,0,0,0.8), 0 0 80px -20px rgba(255,107,53,0.14);
}
.cal { border-radius: 0.2rem; overflow: hidden; background: #fff; }
#calendly { min-width: 320px; min-height: 760px; height: 760px; transition: height .25s ease; }
#calendly iframe { display: block; border: 0; }
.booked-msg { display: none; max-width: 640px; margin: 20px auto 0; padding: 16px 20px; border-radius: 0.3rem; background: rgba(255,107,53,0.10); border: 1px solid rgba(255,107,53,0.5); color: #fff; font-size: 17px; line-height: 1.55; text-align: center; }
/* Shown after Calendly reports the booking. Pinned to the viewport: Calendly's
   confirmation view resizes the frame and the page ends up scrolled far down,
   so an in-flow message under the calendar was never seen (Timo, 2026-09-10). */
.booked-msg.open { display: block; position: fixed; left: 50%; bottom: 24px; transform: translateX(-50%); width: calc(100% - 32px); max-width: 640px; margin: 0; z-index: 9999; background: var(--card); box-shadow: 0 16px 48px rgba(0,0,0,0.6); }
.booked-msg a { color: var(--accent); }
.notes { max-width: 1040px; margin: 26px auto 0; font-size: 13px; line-height: 1.9; color: var(--muted); text-align: center; letter-spacing: 0.02em; }

/* === NOTES AS ROWS === */
.notes-rows { padding-top: 88px; }

/* === CLOSE === */
.close-cta { text-align: center; padding: 88px 24px 104px; }
.ready { font-family: var(--serif); font-weight: 300; font-style: italic; font-size: 44px; line-height: 1.2; color: #fff; max-width: 820px; margin: 0 auto; text-wrap: balance; }
.cap { font-size: 17px; line-height: 1.7; color: #b9bdc6; margin-top: 22px; }
.cta-social { display: flex; flex-direction: column; align-items: center; gap: 10px; margin-top: 32px; }
.avatar-stack { display: flex; align-items: center; justify-content: center; }
.avatar-stack .av {
    width: 52px; height: 52px; border-radius: 50%; margin-left: -14px; flex: 0 0 auto;
    border: 3px solid var(--bg); box-shadow: 0 0 0 2px rgba(255,255,255,0.45);
    background: var(--card) center / cover no-repeat;
}
.avatar-stack .av:first-child { margin-left: 0; }
.stars { color: var(--accent); font-size: 18px; letter-spacing: 3px; line-height: 1; }
.proof-line { font-size: 14px; font-weight: 500; color: var(--ink); letter-spacing: 0.02em; }

/* === STATS BAND === */
.stats { background: var(--accent); }
.stats .in { max-width: 1120px; margin: 0 auto; padding: 44px 32px; display: grid; grid-template-columns: repeat(3, 1fr); text-align: center; }
.stats b { display: block; font-family: var(--serif); font-weight: 300; font-size: 48px; line-height: 1; color: #fff; }
.stats span { display: block; margin-top: 10px; font-size: 11px; font-weight: 500; letter-spacing: 0.18em; text-transform: uppercase; color: rgba(255,255,255,0.82); }

/* === FOOTER === */
.footer { padding: 44px 24px 52px; background: var(--bg-deep); border-top: 1px solid var(--line); text-align: center; }
.footer .copy { font-size: 13px; color: var(--ink); margin-bottom: 12px; letter-spacing: 0.04em; }
.footer a { color: var(--accent); text-decoration: none; font-size: 12px; letter-spacing: 0.08em; text-transform: uppercase; }
.footer .links { margin-bottom: 20px; }
.disclaimer { max-width: 860px; margin: 0 auto; font-size: 11px; color: var(--muted); line-height: 1.7; }
.disclaimer p { margin-bottom: 8px; }

/* === ENTRANCE === */
@media (prefers-reduced-motion: no-preference) {
    .rise { animation: rise 0.8s cubic-bezier(.2,.7,.2,1) both; }
    .d1 { animation-delay: 0.08s; } .d2 { animation-delay: 0.18s; } .d3 { animation-delay: 0.3s; } .d4 { animation-delay: 0.42s; }
}
@keyframes rise { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: none; } }
@media (prefers-reduced-motion: reduce) { .hero-bg { animation: none; } }

/* === MOBILE === */
@media (max-width: 860px) {
    .bar { padding: 18px 20px; }
    .hero { padding: 104px 20px 48px; }
    h1 { font-size: 40px; }
    .red { font-size: 12px; letter-spacing: 0.1em; }
    .plain { font-size: 17px; }
    .points { padding: 56px 20px 0; }
    .steps { padding-top: 56px; }
    .notes-rows { padding-top: 64px; }
    .learn-rows { gap: 36px; }
    .learn-row { grid-template-columns: 1fr; gap: 10px; }
    .learn-num { font-size: 44px; }
    .benefit { padding-top: 0; font-size: 16px; }
    .benefit b { display: block; font-size: 26px; margin: 0 0 8px; }
    .calband { margin-top: 56px; padding: 40px 12px 40px; }
    .calcard { padding: 8px; }
    #calendly { height: 1000px; }
    .close-cta { padding: 64px 20px 80px; }
    .ready { font-size: 30px; }
    .avatar-stack .av { width: 44px; height: 44px; margin-left: -12px; }
    .stats .in { grid-template-columns: 1fr; gap: 28px; padding: 40px 20px; }
    .stats b { font-size: 42px; }
}`;

const bodyHtml = `<header class="bar">
    <img src="/waitlist/assets/logo-alegria-white-59.47b95d50.webp" srcset="/waitlist/assets/logo-alegria-white-59.47b95d50.webp 1x, /waitlist/assets/logo-alegria-white-118.2fd43538.webp 2x" width="59" height="60" alt="Alegría">
    <span>Víctor Álvarez Alegría</span>
</header>

<section class="hero">
    <div class="hero-bg" aria-hidden="true"></div>
    <h1 class="rise d1">Book Your Free 1% Method Strategy Session On This Page</h1>
    <div class="rule rise d2"></div>
    <div class="red rise d2">Lock in your time before the breakthrough strategy call bookings close to see if you qualify<br>(we only work with limited clients at a time)</div>
    <p class="plain rise d3">Others were on this exact page, in your position, and it was their pivotal moment in transforming their playing.</p>
    <p class="plain rise d4">Book your time today before we hit our member cap</p>
</section>

<section class="points steps">
    <div class="learn-rows">
        <div class="learn-row">
            <div class="learn-num">01</div>
            <div class="benefit"><b>Step 1.</b> Watch Victor's famous masterclass (if you have not watched, <a href="/masterclass" data-t="apply-replay">click here for replay</a>)</div>
        </div>
        <div class="learn-row">
            <div class="learn-num">02</div>
            <div class="benefit"><b>Step 2.</b> Choose time for no cost strategy call</div>
        </div>
    </div>
</section>

<section class="calband">
    <div class="calcard">
    <div class="cal" id="book">
        <!-- No calendly-inline-widget class and no data-url here, both on purpose.
             widget.js scans for .calendly-inline-widget on load and stamps every
             match with data-processed, so a box carrying that class was marked
             done before the visitor id was known and the iframe never got built:
             the calendar showed up as an empty white area. The script below waits
             for widget.js, builds the final URL (with utm_content=<visitor id>)
             and calls initInlineWidget itself, which adds Calendly's own class. -->
        <div id="calendly"
             data-url-base="https://calendly.com/victoralvarezalegria/60min?hide_gdpr_banner=1"
             style="min-width:320px;height:760px;"></div>
    </div>
    </div>

    <div class="booked-msg" id="bookedMsg">
        Your call is booked. Taking you to the next step&hellip; If nothing happens, <a href="/booked" id="bookedLink">click here</a>.
    </div>

    <div class="notes">
        *Make sure you are choosing your correct time zone*<br>
        *If the calendar doesn't load after a few seconds, try refreshing the page.<br>
        *Note that this is not a sales call*
    </div>
</section>

<section class="points notes-rows">
    <div class="learn-rows">
        <div class="learn-row">
            <div class="learn-num">01</div>
            <div class="benefit">&#128073; Note that we don't make an offer to everyone, this call is about determining whether you can grow your playing using the 1% Method model, and whether our approach and community align with your goals.</div>
        </div>
        <div class="learn-row">
            <div class="learn-num">02</div>
            <div class="benefit">&#128073; Our process does not work for everyone. If we determine that we can't help, we&rsquo;ll happily refer you to a service or company that can meet your needs.</div>
        </div>
        <div class="learn-row">
            <div class="learn-num">03</div>
            <div class="benefit">&#128073; It doesn't matter if you're an absolute beginner, intermediate, advanced, professional, returning to the instrument, or even recovering from an injury. The aim of the 1% Method is to get everyone inside to consistent growth.</div>
        </div>
    </div>
</section>

<section class="close-cta">
    <div class="ready">Are you ready to become my next biggest success story?</div>
    <p class="cap">Book your time today before we hit our member cap</p>
    <div class="cta-social">
        <div class="avatar-stack" aria-hidden="true">
            <span class="av" style="background-image:url('/images/students/medellin-1.jpg')"></span>
                <span class="av" style="background-image:url('/images/students/medellin-2.jpg')"></span>
                <span class="av" style="background-image:url('/images/students/medellin-3.jpg')"></span>
                <span class="av" style="background-image:url('/images/students/medellin-4.jpg')"></span>
                <span class="av" style="background-image:url('/images/students/medellin-5.jpg')"></span>
                <span class="av" style="background-image:url('/images/students/medellin-6.jpg')"></span>
        </div>
        <div class="stars" role="img" aria-label="5 out of 5 stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
        <p class="proof-line">100+ online students worldwide</p>
    </div>
</section>

<section class="stats" aria-label="Victor Alegria in numbers">
    <div class="in">
        <div><b>18+</b><span>Years of experience</span></div>
        <div><b>30+</b><span>Countries performed</span></div>
        <div><b>100+</b><span>Online students worldwide</span></div>
    </div>
</section>

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
var calBox = document.getElementById('calendly');

/* Plant the visitor id in the Calendly URL. The Calendly iframe is a different
   origin, so the booking itself carries none of our cookies: utm_content is the
   only channel that survives the round trip, and Calendly hands it straight back
   on the invitee resource, where /api/book reads it. Without this, every booked
   call would arrive anonymous and no ad or link would ever get credit for it.
   utm_source=va-funnel is there so these show up as ours inside Calendly. */
var TRACK_VID = '';
function readVid() {
    var m = (' ' + document.cookie).match(/[; ]tv=([^;]*)/);
    if (m) { try { return decodeURIComponent(m[1]); } catch (e) { return m[1]; } }
    try { return localStorage.getItem('tv') || ''; } catch (e) { return ''; }
}
function initCalendly(vid) {
    TRACK_VID = vid || '';
    var base = calBox.getAttribute('data-url-base') || '';
    var url = base + (base.indexOf('?') === -1 ? '?' : '&') + 'utm_source=va-funnel' +
              (TRACK_VID ? '&utm_content=' + encodeURIComponent(TRACK_VID) : '');
    /* Deliberately NOT setting data-url here: widget.js scans the DOM for
       .calendly-inline-widget[data-url] and initialises it itself, which raced
       with the initInlineWidget call below and left the box marked
       data-processed with no iframe in it, so the calendar never appeared. */
    /* widget.js may not have arrived yet. Poll for it rather than guess: it is
       loaded async and there is no load event we can rely on across browsers. */
    var tries = 0;
    (function go() {
        if (window.Calendly && window.Calendly.initInlineWidget) {
            try { window.Calendly.initInlineWidget({ url: url, parentElement: calBox }); } catch (e) {}
            return;
        }
        if (++tries < 100) setTimeout(go, 100);
    })();
}
/* Resolve the id, but never let the calendar wait on it: a visitor who cannot
   book is a worse outcome than a booking we cannot attribute. */
(function () {
    var done = false;
    var fire = function (v) { if (done) return; done = true; initCalendly(v); };
    setTimeout(function () { fire(readVid()); }, 1500);
    if (window.__t && window.__t.vid) window.__t.vid().then(fire, function () { fire(readVid()); });
    else {
        var n = 0;
        (function wait() {
            if (window.__t && window.__t.vid) { window.__t.vid().then(fire, function () { fire(readVid()); }); return; }
            if (++n < 15) setTimeout(wait, 100);
        })();
    }
})();

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
    try { sessionStorage.setItem('va_booked', '1'); } catch (e2) {}
    /* One id for this booked call. Stored so /booked reuses it if its own
       fallback post fires too, and the two collapse onto one conversion row. */
    var eventId = '';
    try { eventId = (crypto && crypto.randomUUID) ? crypto.randomUUID() : ''; } catch (e7) {}
    try { sessionStorage.setItem('va_booked_eid', eventId); } catch (e8) {}

    var go = function () { window.location.href = BOOKED_PAGE; };
    fetch(BOOK_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ eventUri: eventUri, inviteeUri: inviteeUri, vid: TRACK_VID || readVid(), eventId: eventId }),
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
      <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&display=swap" rel="stylesheet" />
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
