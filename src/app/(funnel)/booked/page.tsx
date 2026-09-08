import type { Metadata } from "next";

// Ported verbatim from victor-site-handoff/funnel/booked.html.
// Copy, layout, styles and scripts are unchanged. Only the internal links were
// made absolute ("masterclass.html" -> "/masterclass") so they resolve as app
// routes instead of files.

export const metadata: Metadata = {
  title: "Your Call Is Booked. Watch This First.",
  robots: { index: false, follow: false },
};

const css = `:root {
    --bg: #1A1D24;
    --bg-raised: #212530;
    --ink: #E8E8E8;
    --muted: #8A8F9A;
    --accent: #FF6B35;
    --accent-dark: #E85A26;
    --hairline: rgba(232, 232, 232, 0.12);
    --serif: "Cormorant Garamond", Georgia, serif;
}
* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: "Space Grotesk", Helvetica, Arial, sans-serif; background: var(--bg); color: var(--ink); }
.topbar { height: 4px; background: var(--accent); }
.wrap { max-width: 1060px; margin: 0 auto; padding: 0 24px; }
.center { text-align: center; }

/* === HERO === */
.hero { padding: 56px 0 0; text-align: center; }
.confirmed { color: var(--accent); font-weight: 500; font-size: 13px; letter-spacing: 0.18em; text-transform: uppercase; margin-bottom: 18px; }
h1 { font-family: var(--serif); font-weight: 600; font-size: 56px; line-height: 1.08; color: #fff; letter-spacing: -0.5px; max-width: 16ch; margin: 0 auto; }
.important { margin: 22px auto 0; max-width: 60ch; font-size: 18px; line-height: 1.55; color: var(--ink); }
.important b { color: var(--accent); font-weight: 700; letter-spacing: 0.06em; }

/* === HERO VIDEO (Victor's pre-call welcome, self-hosted) === */
.hero-video { position: relative; width: 100%; max-width: 860px; margin: 0 auto 36px; aspect-ratio: 16/9; background: #000; border: 1px solid var(--hairline); border-radius: 8px; overflow: hidden; box-shadow: 0 18px 50px rgba(0,0,0,0.45); }
.hero-video video { display: block; width: 100%; height: 100%; object-fit: cover; }
/* === CALL CARD === */
.call { max-width: 620px; margin: 34px auto 0; padding: 26px 28px; background: var(--bg-raised); border: 1px solid var(--hairline); border-radius: 8px; }
.call .k { color: var(--accent); font-weight: 500; font-size: 12px; letter-spacing: 0.18em; text-transform: uppercase; margin-bottom: 8px; }
.call .when { font-family: var(--serif); font-weight: 600; font-size: 30px; color: #fff; line-height: 1.2; }
.call .tz { font-size: 13px; color: var(--muted); margin-top: 6px; }
.call .mail { font-size: 15px; color: var(--ink); line-height: 1.6; margin-top: 14px; }
.call .mail b { color: #fff; }

/* === VIDEO === */
.mandatory { margin-top: 56px; }
.tag { display: inline-block; padding: 7px 14px; border-radius: 4px; background: var(--accent); color: #fff; font-weight: 700; font-size: 12px; letter-spacing: 0.16em; text-transform: uppercase; }
h2 { font-family: var(--serif); font-weight: 600; font-size: 38px; line-height: 1.15; color: #fff; margin-top: 14px; }
h2 a { color: var(--accent); text-decoration: none; }
h2 a:hover { text-decoration: underline; }
.video { position: relative; width: 100%; max-width: 860px; margin: 26px auto 0; aspect-ratio: 16/9; background: var(--bg-raised); border: 1px solid var(--hairline); border-radius: 8px; overflow: hidden; }
.video iframe { position: absolute; inset: 0; width: 100%; height: 100%; border: 0; }
.video .ph { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 14px; background: radial-gradient(120% 140% at 50% 0%, #262b38 0%, #1c2029 60%, #171a21 100%); }
.play { width: 74px; height: 74px; border-radius: 100%; border: 2px solid rgba(255,255,255,0.28); background: rgba(255,255,255,0.05); display: flex; align-items: center; justify-content: center; }
.play::after { content: ""; width: 0; height: 0; margin-left: 6px; border-top: 13px solid transparent; border-bottom: 13px solid transparent; border-left: 21px solid #fff; }
.ph-label { font-size: 12px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--muted); }

.cta { display: inline-block; margin-top: 28px; padding: 18px 40px; background: var(--accent); color: #fff; font-weight: 700; font-size: 17px; text-decoration: none; border-radius: 5px; letter-spacing: 0.06em; text-transform: uppercase; box-shadow: 0 12px 30px rgba(255,107,53,0.28); transition: background .15s ease, transform .15s ease; }
.cta:hover { background: var(--accent-dark); transform: translateY(-2px); }
.cta-note { max-width: 62ch; margin: 18px auto 0; font-size: 15px; line-height: 1.6; color: var(--muted); }
.cta-note b { color: var(--accent); }

/* === CHECKLIST === */
.check { max-width: 640px; margin: 64px auto 0; }
.check h2 { text-align: center; }
.check ol { list-style: none; margin-top: 26px; counter-reset: c; }
.check li { position: relative; padding: 18px 20px 18px 66px; margin-bottom: 12px; background: var(--bg-raised); border: 1px solid var(--hairline); border-radius: 8px; font-size: 17px; line-height: 1.5; color: #fff; font-weight: 500; }
.check li::before { counter-increment: c; content: counter(c); position: absolute; left: 18px; top: 16px; width: 32px; height: 32px; border-radius: 100%; background: var(--accent); color: #fff; display: flex; align-items: center; justify-content: center; font-size: 15px; font-weight: 700; }
.check li small { display: block; font-size: 14px; color: var(--muted); font-weight: 400; margin-top: 4px; }
.check li a { color: var(--accent); text-decoration: none; }
.check li a:hover { text-decoration: underline; }

/* === WARNING === */
.warn { max-width: 640px; margin: 34px auto 0; padding: 26px 28px; border-radius: 8px; border: 1px solid rgba(255,107,53,0.45); background: rgba(255,107,53,0.08); text-align: center; }
.warn .k { color: var(--accent); font-weight: 700; font-size: 12px; letter-spacing: 0.18em; text-transform: uppercase; margin-bottom: 10px; }
.warn p { font-size: 16px; line-height: 1.6; color: #fff; font-weight: 500; }
.warn p + p { margin-top: 10px; }

/* === PROOF === */
.proof { margin-top: 84px; padding-top: 56px; border-top: 1px solid var(--hairline); }
.proof h2 { text-align: center; max-width: 30ch; margin-left: auto; margin-right: auto; }
.proof p.lead { text-align: center; font-size: 16px; color: var(--muted); margin-top: 10px; line-height: 1.6; }
.grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-top: 30px; }
.card { background: var(--bg-raised); border: 1px solid var(--hairline); border-radius: 8px; overflow: hidden; }
.card .video { max-width: none; margin: 0; border: 0; border-radius: 0; }
.card .play { width: 54px; height: 54px; }
.card .ph-label { font-size: 10px; }
.card .cap { padding: 12px 14px 14px; font-size: 14px; line-height: 1.5; color: var(--ink); }
.card .cap b { color: #fff; }
.grid.two { grid-template-columns: repeat(2, 1fr); }
.grid.two .play { width: 74px; height: 74px; }
.grid.two .ph-label { font-size: 12px; }

/* === FOOTER === */
.footer { margin-top: 84px; padding: 34px 24px 44px; background: var(--bg-raised); border-top: 1px solid var(--hairline); text-align: center; }
.footer .copy { font-weight: 500; font-size: 14px; margin-bottom: 12px; color: var(--ink); }
.footer a { color: var(--accent); text-decoration: none; font-size: 13px; }
.footer a:hover { text-decoration: underline; }
.footer .links { margin-bottom: 18px; }
.footer .links span { color: var(--muted); margin: 0 8px; }
.disclaimer { max-width: 860px; margin: 0 auto; font-size: 12px; color: var(--muted); line-height: 1.6; }
.disclaimer p { margin-bottom: 8px; }

@media (max-width: 860px) {
    .hero { padding-top: 40px; }
    .hero-video { margin-bottom: 26px; border-radius: 6px; }
    h1 { font-size: 38px; }
    h2 { font-size: 29px; }
    .important { font-size: 16px; }
    .call .when { font-size: 24px; }
    .grid, .grid.two { grid-template-columns: 1fr; }
    .check li { font-size: 16px; }
}`;

const bodyHtml = `<div class="topbar"></div>

<div class="wrap">

    <!-- ===== HERO ===== -->
    <!-- Copy mirrors Harrisson's call-booked page line for line. Only the names changed. -->
    <header class="hero">
        <!-- Victor's pre-call welcome video. Source: Timo's Drive share 2026-09-08, transcoded 1920x1080 30fps. -->
        <div class="hero-video">
            <video controls playsinline preload="metadata" poster="/assets/victor-precall-poster.jpg">
                <source src="/assets/victor-precall.mp4" type="video/mp4">
            </video>
        </div>
        <h1 id="h1">Congrats, Your Call is Booked... Nice!</h1>
        <p class="important"><b>IMPORTANT</b> Please watch the masterclass replay and read everything below prior to your call!</p>

        <div class="call" id="callCard">
            <div class="k">Mark your calendar!</div>
            <div class="when" id="callWhen"></div>
            <div class="tz" id="callTz"></div>
            <div class="mail">Your exact time, location and details of your ZOOM call with us have also been sent to your email<br>(be on the look out for it)</div>
        </div>
    </header>

    <!-- ===== MANDATORY REPLAY ===== -->
    <section class="mandatory center">
        <span class="tag">Mandatory</span>
        <h2>Watch the masterclass replay before your call</h2>
        <a class="cta" href="/masterclass">Enter the Masterclass Viewing Room</a>
        <p class="cta-note"><b>IMPORTANT:</b> Everything we cover on your call builds on the masterclass. Watching it first makes the most of our time together.</p>
    </section>

    <!-- ===== CHECKLIST ===== -->
    <section class="check">
        <h2>How to Prepare for Call Checklist</h2>
        <ol>
            <li>Watch Masterclass <small><a href="/masterclass">(Click here if you haven't)</a></small></li>
            <li>Bring your partner to call</li>
            <li>Be in a quiet place</li>
        </ol>

        <div class="warn">
            <p>DO NOT BE DRIVING OR RUNNING ERRANDS AT YOUR SCHEDULED TIME. BE IN A QUIET PLACE WHERE YOU CAN FOCUS 100%.</p>
            <p>IF YOU DO NOT TAKE THIS CALL SERIOUSLY, YOU WILL NOT BE OFFERED INTO OUR PROGRAM, IT IS THAT SIMPLE</p>
        </div>
    </section>

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
        fetch('/api/book', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: q.email,
                firstName: full[0] || '',
                lastName: full.slice(1).join(' '),
                startTime: q.start || ''
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
      <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&display=swap" rel="stylesheet" />
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
