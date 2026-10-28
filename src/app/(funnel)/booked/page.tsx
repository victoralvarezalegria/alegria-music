import type { Metadata } from "next";

// Ported verbatim from victor-site-handoff/funnel/booked.html.
// Copy, layout, styles and scripts are unchanged. Only the internal links were
// made absolute ("masterclass.html" -> "/masterclass") so they resolve as app
// routes instead of files.

export const metadata: Metadata = {
  title: "Your Call Is Booked. Watch This First.",
  robots: { index: false, follow: false },
};

const css = `/* Redesigned 2026-10-24 on alegriamusic.net's design system, same tokens and components as /watch. */
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
.important { margin: 28px auto 0; max-width: 60ch; font-size: 18px; line-height: 1.6; color: var(--ink); }
.important b { color: var(--accent); font-weight: 700; letter-spacing: 0.06em; }

/* === WELCOME VIDEO === */
.hero-video {
    position: relative; width: 100%; max-width: 960px; margin: 44px auto 0; aspect-ratio: 16/9;
    background: #000; border: 1px solid var(--line); border-radius: 18px; overflow: hidden;
    box-shadow: 0 30px 80px -24px rgba(0,0,0,0.85), 0 0 0 1px rgba(255,107,53,0.14), 0 0 90px -20px rgba(255,107,53,0.35);
}
.hero-video video { display: block; width: 100%; height: 100%; object-fit: cover; }

/* === CALL CARD === */
.call {
    max-width: 640px; margin: 40px auto 0; padding: 30px 32px; text-align: center;
    background: var(--raised); border: 1px solid var(--line); border-radius: 0.6rem;
    box-shadow: 0 30px 60px -30px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,107,53,0.06);
}
.call .k { color: var(--accent); font-weight: 500; font-size: 12px; letter-spacing: 0.22em; text-transform: uppercase; margin-bottom: 10px; }
.call .when { font-family: var(--serif); font-weight: 400; font-size: 36px; color: #fff; line-height: 1.2; }
.call .tz { font-size: 13px; color: var(--muted); margin-top: 6px; }
.call .mail { font-size: 15px; color: #b9bdc6; line-height: 1.7; margin-top: 16px; }
.call .mail b { color: #fff; }

/* === MANDATORY REPLAY === */
.mandatory { max-width: 860px; margin: 0 auto; padding: 96px 24px 0; text-align: center; }
.tag { display: block; color: var(--accent); font-weight: 700; font-size: 13px; letter-spacing: 0.22em; text-transform: uppercase; }
h2 { font-family: var(--serif); font-weight: 300; font-size: 48px; line-height: 1.1; color: #fff; margin-top: 16px; text-wrap: balance; }
.cta {
    position: relative; display: inline-flex; align-items: center; justify-content: center;
    margin-top: 34px; padding: 21px 42px; min-height: 60px;
    background: var(--accent); color: #fff; text-decoration: none;
    font-family: var(--sans); font-weight: 600; font-size: 15px; letter-spacing: 0.12em; text-transform: uppercase;
    border-radius: 0.3rem;
    box-shadow: 0 0 0 0 rgba(255,107,53,0.45), 0 18px 40px -14px rgba(255,107,53,0.7);
    transition: background 0.2s ease, transform 0.2s ease;
    animation: glow 2.8s ease-in-out infinite;
}
.cta:hover { background: var(--accent-dark); transform: translateY(-2px); }
.cta:active { transform: translateY(1px); }
.cta:focus-visible { outline: 2px solid #fff; outline-offset: 4px; }
@keyframes glow {
    0%, 100% { box-shadow: 0 0 0 0 rgba(255,107,53,0.40), 0 18px 40px -14px rgba(255,107,53,0.7); }
    50% { box-shadow: 0 0 0 10px rgba(255,107,53,0), 0 18px 48px -12px rgba(255,107,53,0.9); }
}
.cta-social { display: flex; flex-direction: column; align-items: center; gap: 10px; margin-top: 24px; }
.avatar-stack { display: flex; align-items: center; justify-content: center; }
.avatar-stack .av {
    width: 52px; height: 52px; border-radius: 50%; margin-left: -14px; flex: 0 0 auto;
    border: 3px solid var(--bg); box-shadow: 0 0 0 2px rgba(255,255,255,0.45);
    background: var(--card) center / cover no-repeat;
}
.avatar-stack .av:first-child { margin-left: 0; }
.stars { color: var(--accent); font-size: 18px; letter-spacing: 3px; line-height: 1; }
.proof-line { font-size: 14px; font-weight: 500; color: var(--ink); letter-spacing: 0.02em; }
.cta-note { max-width: 62ch; margin: 30px auto 0; font-size: 16px; line-height: 1.7; color: #b9bdc6; }
.cta-note b { color: var(--accent); }

/* === CHECKLIST (learn rows) === */
.check { max-width: 760px; margin: 0 auto; padding: 104px 32px 0; }
.check h2 { text-align: center; }
.check .rule { margin: 22px auto 56px; }
.learn-rows { display: flex; flex-direction: column; gap: 44px; }
.learn-row { display: grid; grid-template-columns: 110px 1fr; gap: 28px; align-items: start; padding-bottom: 44px; border-bottom: 1px solid var(--line); }
.learn-row:last-child { border-bottom: 0; padding-bottom: 0; }
.learn-row > * { min-width: 0; }
.learn-num { font-family: var(--serif); font-weight: 300; font-size: 64px; line-height: 0.9; color: var(--accent); }
.benefit { font-size: 17px; line-height: 1.75; color: #b9bdc6; }
.benefit b { display: block; font-family: var(--serif); font-weight: 400; font-style: italic; font-size: 36px; line-height: 1.15; color: #fff; }
.benefit small { display: block; font-size: 15px; margin-top: 10px; }
.benefit a { color: var(--accent); text-decoration: none; }
.benefit a:hover { text-decoration: underline; }

/* === WARNING === */
.warn {
    max-width: 760px; margin: 72px auto 0; padding: 32px 34px; text-align: center;
    background: var(--raised); border: 1px solid var(--line); border-top: 3px solid var(--accent); border-radius: 0.3rem;
    box-shadow: 0 30px 60px -30px rgba(0,0,0,0.7);
}
.warn p { font-size: 16px; line-height: 1.7; color: #fff; font-weight: 500; letter-spacing: 0.02em; }
.warn p + p { margin-top: 14px; }

.spacer { height: 104px; }

/* === STATS BAND === */
.stats { background: var(--accent); }
.stats .in { max-width: 1120px; margin: 0 auto; padding: 44px 32px; display: grid; grid-template-columns: repeat(3, 1fr); text-align: center; }
.stats b { display: block; font-family: var(--serif); font-weight: 300; font-size: 48px; line-height: 1; color: #fff; }
.stats span { display: block; margin-top: 10px; font-size: 11px; font-weight: 500; letter-spacing: 0.18em; text-transform: uppercase; color: rgba(255,255,255,0.82); }

/* === FOOTER === */
.footer { padding: 44px 24px 52px; background: var(--bg-deep); border-top: 1px solid var(--line); text-align: center; }
.footer .copy { font-size: 13px; color: var(--ink); margin-bottom: 12px; letter-spacing: 0.04em; }
.footer a { color: var(--accent); text-decoration: none; font-size: 12px; letter-spacing: 0.08em; text-transform: uppercase; }
.footer a:hover { text-decoration: underline; }
.footer .links { margin-bottom: 20px; }
.footer .links span { color: var(--muted); margin: 0 10px; }
.disclaimer { max-width: 860px; margin: 0 auto; font-size: 11px; color: var(--muted); line-height: 1.7; }
.disclaimer p { margin-bottom: 8px; }

@media (prefers-reduced-motion: no-preference) {
    .rise { animation: rise 0.8s cubic-bezier(.2,.7,.2,1) both; }
    .d1 { animation-delay: 0.08s; } .d2 { animation-delay: 0.18s; } .d3 { animation-delay: 0.3s; } .d4 { animation-delay: 0.42s; }
}
@keyframes rise { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: none; } }
@media (prefers-reduced-motion: reduce) { .hero-bg, .cta { animation: none; } }

@media (max-width: 860px) {
    .bar { padding: 18px 20px; }
    .hero { padding: 104px 20px 48px; }
    h1 { font-size: 40px; }
    h2 { font-size: 34px; }
    .important { font-size: 16px; }
    .hero-video { margin-top: 32px; border-radius: 12px; }
    .call { padding: 24px 20px; margin-top: 28px; }
    .call .when { font-size: 28px; }
    .cta { font-size: 14px; padding: 19px 26px; letter-spacing: 0.1em; }
    .avatar-stack .av { width: 44px; height: 44px; margin-left: -12px; }
    .mandatory { padding: 64px 20px 0; }
    .check { padding: 72px 20px 0; }
    .learn-rows { gap: 32px; }
    .learn-row { grid-template-columns: 56px 1fr; gap: 14px; padding-bottom: 32px; }
    .learn-num { font-size: 40px; }
    .benefit b { font-size: 27px; }
    .warn { margin-top: 48px; padding: 26px 20px; }
    .spacer { height: 72px; }
    .stats .in { grid-template-columns: 1fr; gap: 28px; padding: 40px 20px; }
    .stats b { font-size: 42px; }
}`;

const proof = `<div class="cta-social">
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
        </div>`;

const bodyHtml = `<header class="bar">
    <img src="/waitlist/assets/logo-alegria-white-59.47b95d50.webp" srcset="/waitlist/assets/logo-alegria-white-59.47b95d50.webp 1x, /waitlist/assets/logo-alegria-white-118.2fd43538.webp 2x" width="59" height="60" alt="Alegría">
    <span>Víctor Álvarez Alegría</span>
</header>

<section class="hero">
    <div class="hero-bg" aria-hidden="true"></div>
    <h1 id="h1" class="rise d1">Congrats, Your Call is Booked... Nice!</h1>
    <div class="rule rise d2"></div>
    <p class="important rise d3"><b>IMPORTANT</b> Please watch the masterclass replay and read everything below prior to your call!</p>

    <!-- Victor's pre-call welcome video. Source: Timo's Drive share 2026-09-08, transcoded 1920x1080 30fps. -->
    <div class="hero-video rise d4">
        <video controls playsinline preload="metadata" poster="/assets/victor-precall-poster.jpg">
            <source src="/assets/victor-precall.mp4" type="video/mp4">
            <track kind="captions" srclang="en" label="English" src="/assets/victor-precall.vtt" default>
        </video>
    </div>

    <div class="call" id="callCard">
        <div class="k">Mark your calendar!</div>
        <div class="when" id="callWhen"></div>
        <div class="tz" id="callTz"></div>
        <div class="mail">Your exact time, location and details of your ZOOM call with us have also been sent to your email<br>(be on the look out for it)</div>
    </div>
</section>

<section class="mandatory">
    <span class="tag">Mandatory</span>
    <h2>Watch the masterclass replay before your call</h2>
    <a class="cta" href="/masterclass">Enter the Masterclass Viewing Room</a>
    ${proof}
    <p class="cta-note"><b>IMPORTANT:</b> Everything we cover on your call builds on the masterclass. Watching it first makes the most of our time together.</p>
</section>

<section class="check">
    <h2>How to Prepare for Call Checklist</h2>
    <div class="rule"></div>
    <div class="learn-rows">
        <div class="learn-row">
            <div class="learn-num">01</div>
            <div class="benefit"><b>Watch Masterclass</b> <small><a href="/masterclass">(Click here if you haven't)</a></small></div>
        </div>
        <div class="learn-row">
            <div class="learn-num">02</div>
            <div class="benefit"><b>Bring your partner to call</b></div>
        </div>
        <div class="learn-row">
            <div class="learn-num">03</div>
            <div class="benefit"><b>Be in a quiet place</b></div>
        </div>
    </div>

    <div class="warn">
        <p>DO NOT BE DRIVING OR RUNNING ERRANDS AT YOUR SCHEDULED TIME. BE IN A QUIET PLACE WHERE YOU CAN FOCUS 100%.</p>
        <p>IF YOU DO NOT TAKE THIS CALL SERIOUSLY, YOU WILL NOT BE OFFERED INTO OUR PROGRAM, IT IS THAT SIMPLE</p>
    </div>
</section>

<div class="spacer"></div>

<section class="stats" aria-label="Victor Alegria in numbers">
    <div class="in">
        <div><b>19+</b><span>Years of experience</span></div>
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

const headScript0 = `
/* Read the redirect params (from /apply, or from Calendly's own redirect if
   Victor enables "pass event details"), then scrub them from the URL so the
   invitee's name never sits in the address bar or in any analytics referrer. */
(function () {
    try {
        var q = new URLSearchParams(window.location.search);
        window.__vaParams = {
            start: q.get('event_start_time'),
            name:  q.get('invitee_full_name') || (function(){ try { return sessionStorage.getItem('va_name'); } catch (e) { return null; } })(),
            email: q.get('invitee_email')
        };
        if (window.location.search) history.replaceState(null, '', window.location.pathname);
    } catch (e) { window.__vaParams = {}; }
})();
`;
const bodyScript0 = `
(function () {
    var q = window.__vaParams || {};
    var name = (q.name || '').trim().split(' ')[0].replace(/[<>]/g, '');
    if (name) {
        /* textContent only: the name rides in from a URL anyone can craft. */
        document.getElementById('h1').textContent = 'Congrats ' + name + ', Your Call is Booked... Nice!';
    }
    if (q.start) {
        var d = new Date(q.start);
        if (!isNaN(d.getTime())) {
            try {
                document.getElementById('callWhen').textContent = d.toLocaleString(undefined, {
                    weekday: 'long', month: 'long', day: 'numeric', hour: 'numeric', minute: '2-digit'
                });
                var tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
                if (tz) document.getElementById('callTz').textContent = 'Shown in your local time (' + tz + ')';
            } catch (e) {}
        }
    }

    /* Safety net. If Victor turns on Calendly's own redirect to this page (with
       "pass event details"), the visitor may arrive here without /apply having
       posted the booking. Post it from here instead, once. */
    var alreadyPosted = false;
    try { alreadyPosted = sessionStorage.getItem('va_booked') === '1'; } catch (e) {}
    if (!alreadyPosted && q.email) {
        var full = (q.name || '').trim().split(' ');
        try { sessionStorage.setItem('va_booked', '1'); } catch (e) {}
        /* Attribution: the visitor id (cookie, then the localStorage mirror) and
           the event id /apply minted, if it did, so the two posts share one row. */
        var bkVid = '';
        var bkm = (' ' + document.cookie).match(/[; ]tv=([^;]*)/);
        if (bkm) { try { bkVid = decodeURIComponent(bkm[1]); } catch (e7) { bkVid = bkm[1]; } }
        if (!bkVid) { try { bkVid = localStorage.getItem('tv') || ''; } catch (e8) {} }
        var bkEid = '';
        try { bkEid = sessionStorage.getItem('va_booked_eid') || ''; } catch (e9) {}
        if (!bkEid) { try { bkEid = (crypto && crypto.randomUUID) ? crypto.randomUUID() : ''; } catch (e10) {} }
        fetch('/api/book', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: q.email,
                firstName: full[0] || '',
                lastName: full.slice(1).join(' '),
                startTime: q.start || '',
                vid: bkVid || null,
                eventId: bkEid || null
            }),
            keepalive: true
        }).catch(function () {});
    }
})();
`;

export default function Page() {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&display=swap" rel="stylesheet" />
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <script
        id="head-0"
        dangerouslySetInnerHTML={{ __html: headScript0 }}
      />
      <div dangerouslySetInnerHTML={{ __html: bodyHtml }} />
      <script
        id="body-0"
        dangerouslySetInnerHTML={{ __html: bodyScript0 }}
      />
    </>
  );
}
