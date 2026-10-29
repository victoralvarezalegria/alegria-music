import type { Metadata } from "next";

// Masterclass replay room, 2026-10-29. Same job as Harrisson's /training-room
// (headline, "deleting soon" warning, replay, then the booking), built on the
// approved /watch design system. The Calendly band and its booking script are the
// /apply ones unchanged, so a booking here still lands in AC "Booked Call" and on /booked.
// Proof is limited to what Victor already shows in public: the student results he
// names in the masterclass and on /bookings, and the conductor photos from the home page.

export const metadata: Metadata = {
  title: "Masterclass Replay. Victor Alegria",
  description: "The replay of Victor Alegria's 1% Method Masterclass: 4 secrets to win auditions faster. Available for a limited time.",
  robots: { index: false, follow: false },
};

const css = `/* Victor's design system (same tokens as the approved /watch and /apply pages):
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
.hero { position: relative; isolation: isolate; overflow: hidden; padding: 124px 24px 40px; text-align: center; }
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
.eyebrow {
    color: var(--accent); font-weight: 500; font-size: 12px; letter-spacing: 0.22em;
    text-transform: uppercase; margin-bottom: 24px;
}
h1 {
    font-family: var(--serif); font-weight: 300; font-size: 60px; line-height: 1.06;
    letter-spacing: -0.01em; color: #fff; max-width: 980px; margin: 0 auto; text-wrap: balance;
}
h1 .h1b {
    display: block; font-style: italic; font-weight: 300; font-size: 42px;
    margin-top: 14px; color: var(--ink);
}

/* === COUNTDOWN (72 hours per visitor, see the script) === */
.timer { max-width: 640px; margin: 34px auto 0; text-align: center; }
.timer-label {
    font-size: 13px; font-weight: 500; letter-spacing: 0.16em; text-transform: uppercase; color: var(--accent);
}
.clock { display: flex; justify-content: center; gap: 12px; margin-top: 16px; }
.unit {
    min-width: 92px; padding: 14px 10px 12px; background: var(--card);
    border: 1px solid var(--line); border-top: 2px solid var(--accent); border-radius: 0.3rem;
}
.unit b {
    display: block; font-family: var(--serif); font-weight: 300; font-size: 50px; line-height: 1;
    color: #fff; font-variant-numeric: tabular-nums;
}
.unit span { display: block; margin-top: 8px; font-size: 10px; font-weight: 500; letter-spacing: 0.18em; text-transform: uppercase; color: var(--muted); }
.timer.closed .clock { display: none; }

/* === REPLAY === */
.stage { padding: 0 24px; text-align: center; }
.video {
    position: relative; width: 100%; max-width: 1000px; margin: 0 auto; aspect-ratio: 16/9;
    background: var(--card); border: 1px solid var(--line); border-radius: 18px; overflow: hidden;
    box-shadow: 0 30px 70px -30px rgba(0,0,0,0.8), 0 0 90px -10px rgba(255,107,53,0.28), 0 0 0 1px rgba(255,107,53,0.08);
}
.video iframe { position: absolute; inset: 0; width: 100%; height: 100%; border: 0; }
.video .ph {
    position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center;
    gap: 14px; padding: 24px; background: radial-gradient(120% 140% at 50% 0%, #262b38 0%, #1c2029 60%, #171a21 100%);
}
.ph-title { font-family: var(--serif); font-weight: 300; font-style: italic; font-size: 34px; color: #fff; }
.ph-label { font-size: 14px; line-height: 1.6; color: var(--muted); max-width: 460px; }
.stat-line { max-width: 760px; margin: 22px auto 0; font-size: 15px; line-height: 1.7; color: var(--muted); }

/* === STEP 2 + CALENDLY (the /apply band) === */
.next { text-align: center; padding: 80px 24px 0; }
.lead { font-weight: 500; font-size: 12px; letter-spacing: 0.22em; text-transform: uppercase; color: var(--accent); }
.next h2 {
    font-family: var(--serif); font-weight: 300; font-size: 50px; line-height: 1.1; color: #fff;
    max-width: 860px; margin: 18px auto 0; text-wrap: balance;
}
.next h2 i { font-weight: 300; }
.rule { width: 48px; height: 1px; background: var(--accent); margin: 26px auto 0; }
.full {
    display: inline-flex; flex-direction: column; align-items: center; gap: 12px;
    margin: 34px auto 0; padding: 22px 30px; max-width: 640px;
    background: rgba(255,107,53,0.08); border: 1px solid rgba(255,107,53,0.45); border-radius: 0.3rem;
}
.full p { font-size: 17px; line-height: 1.6; color: #fff; }
.full p b { color: var(--accent); font-weight: 600; }
.meter { width: 100%; max-width: 420px; height: 8px; border-radius: 99px; background: var(--raised); overflow: hidden; }
.meter i { display: block; width: 95%; height: 100%; background: var(--accent); border-radius: 99px; }
.meter-cap { font-size: 11px; font-weight: 500; letter-spacing: 0.18em; text-transform: uppercase; color: var(--muted); }

.calband { background: var(--bg-deep); border-top: 1px solid var(--line); border-bottom: 1px solid var(--line); margin-top: 56px; padding: 64px 24px 64px; }
.calcard {
    max-width: 1040px; margin: 0 auto; background: var(--card); border: 1px solid var(--line);
    border-radius: 0.3rem; padding: 20px;
    box-shadow: 0 40px 90px -30px rgba(0,0,0,0.8), 0 0 80px -20px rgba(255,107,53,0.14);
}
.cal { border-radius: 0.2rem; overflow: hidden; background: #fff; }
#calendly { min-width: 320px; min-height: 760px; height: 760px; transition: height .25s ease; }
#calendly iframe { display: block; border: 0; }
.booked-msg { display: none; max-width: 640px; margin: 20px auto 0; padding: 16px 20px; border-radius: 0.3rem; background: rgba(255,107,53,0.10); border: 1px solid rgba(255,107,53,0.5); color: #fff; font-size: 17px; line-height: 1.55; text-align: center; }
.booked-msg.open { display: block; position: fixed; left: 50%; bottom: 24px; transform: translateX(-50%); width: calc(100% - 32px); max-width: 640px; margin: 0; z-index: 9999; background: var(--card); box-shadow: 0 16px 48px rgba(0,0,0,0.6); }
.booked-msg a { color: var(--accent); }
.notes { max-width: 1040px; margin: 26px auto 0; font-size: 13px; line-height: 1.9; color: var(--muted); text-align: center; letter-spacing: 0.02em; }

/* === RESULTS (the students Victor names in the masterclass and on /bookings) === */
.results { max-width: 1100px; margin: 0 auto; padding: 96px 32px 0; text-align: center; }
.results h2, .stage-proof h2 {
    font-family: var(--serif); font-weight: 300; font-style: italic; font-size: 44px; line-height: 1.15;
    color: #fff; margin-top: 16px; text-wrap: balance;
}
.cards { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; margin-top: 48px; text-align: left; }
.card {
    background: var(--card); border: 1px solid var(--line); border-top: 2px solid var(--accent);
    border-radius: 0.3rem; padding: 26px 22px 24px;
}
.card .who { font-family: var(--serif); font-weight: 400; font-size: 30px; line-height: 1.1; color: #fff; }
.card .inst { margin-top: 6px; font-size: 11px; font-weight: 500; letter-spacing: 0.18em; text-transform: uppercase; color: var(--accent); }
.card p { margin-top: 16px; font-size: 15px; line-height: 1.65; color: #b9bdc6; }

/* === ON STAGE WITH (polaroid prints, captions as on the home page) === */
.stage-proof { max-width: 1100px; margin: 0 auto; padding: 104px 32px 0; text-align: center; }
.prints { display: grid; grid-template-columns: repeat(3, 1fr); gap: 44px 36px; margin-top: 56px; }
.print {
    background: #fdfcfa; padding: 12px 12px 0; border-radius: 3px;
    box-shadow: 0 1px 2px rgba(0,0,0,0.25), 0 30px 60px -24px rgba(0,0,0,0.8);
}
.print:nth-child(3n+1) { transform: rotate(-2.5deg); }
.print:nth-child(3n+2) { transform: rotate(1.5deg) translateY(10px); }
.print:nth-child(3n) { transform: rotate(-1deg); }
.print img { width: 100%; aspect-ratio: 1 / 1; object-fit: cover; object-position: 50% 30%; }
.print figcaption {
    font-family: "Caveat", "Bradley Hand", cursive; font-weight: 600; font-size: 22px; color: #2a2b30;
    text-align: center; padding: 10px 8px 4px; line-height: 1.15;
}
.print figcaption small { display: block; font-family: var(--sans); font-weight: 500; font-size: 10px; letter-spacing: 0.14em; text-transform: uppercase; color: #7b7e86; padding-bottom: 12px; margin-top: 4px; }

/* === CLOSE === */
.close-cta { text-align: center; padding: 104px 24px 104px; }
.ready { font-family: var(--serif); font-weight: 300; font-style: italic; font-size: 44px; line-height: 1.2; color: #fff; max-width: 820px; margin: 0 auto; text-wrap: balance; }
.cap { font-size: 17px; line-height: 1.7; color: #b9bdc6; margin-top: 18px; }
.cta {
    position: relative; display: inline-flex; align-items: center; justify-content: center;
    margin-top: 30px; padding: 21px 42px; min-height: 60px;
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
.cta-social { display: flex; flex-direction: column; align-items: center; gap: 10px; margin-top: 28px; }
.avatar-stack { display: flex; align-items: center; justify-content: center; }
.avatar-stack .av {
    width: 52px; height: 52px; border-radius: 50%; margin-left: -14px; flex: 0 0 auto;
    border: 3px solid var(--bg); box-shadow: 0 0 0 2px rgba(255,255,255,0.45);
    background: var(--card) center / cover no-repeat;
}
.avatar-stack .av:first-child { margin-left: 0; }
.stars { color: var(--accent); font-size: 18px; letter-spacing: 3px; line-height: 1; }
.proof-line { font-size: 14px; font-weight: 500; color: var(--ink); letter-spacing: 0.02em; }
.close-timer { margin-top: 22px; font-size: 13px; font-weight: 500; letter-spacing: 0.14em; text-transform: uppercase; color: var(--accent); font-variant-numeric: tabular-nums; }

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
@media (prefers-reduced-motion: reduce) { .hero-bg, .cta { animation: none; } }

/* === MOBILE === */
@media (max-width: 960px) {
    .cards { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 860px) {
    .bar { padding: 18px 20px; }
    .hero { padding: 96px 20px 32px; }
    h1 { font-size: 38px; }
    h1 .h1b { font-size: 28px; }
    .eyebrow { font-size: 11px; letter-spacing: 0.18em; }
    .timer-label { font-size: 12px; letter-spacing: 0.12em; }
    .clock { gap: 8px; }
    .unit { min-width: 0; flex: 1 1 0; max-width: 84px; padding: 12px 4px 10px; }
    .unit b { font-size: 36px; }
    .unit span { font-size: 9px; letter-spacing: 0.12em; }
    .stage { padding: 0 16px; }
    .video { border-radius: 12px; }
    .ph-title { font-size: 26px; }
    .next { padding: 64px 20px 0; }
    .next h2 { font-size: 34px; }
    .full { padding: 18px 18px; }
    .full p { font-size: 16px; }
    .calband { padding: 40px 12px 48px; margin-top: 44px; }
    .calcard { padding: 8px; }
    #calendly { height: 1000px; }
    .results, .stage-proof { padding-left: 20px; padding-right: 20px; }
    .results { padding-top: 72px; }
    .stage-proof { padding-top: 80px; }
    .results h2, .stage-proof h2 { font-size: 32px; }
    .cards { grid-template-columns: 1fr; gap: 14px; margin-top: 32px; }
    .prints { grid-template-columns: repeat(2, 1fr); gap: 26px 18px; margin-top: 36px; }
    .print { padding: 7px 7px 0; }
    .print figcaption { font-size: 17px; padding: 7px 4px 2px; }
    .print figcaption small { font-size: 8px; letter-spacing: 0.1em; padding-bottom: 8px; }
    .close-cta { padding: 72px 20px 80px; }
    .ready { font-size: 32px; }
    .cta { font-size: 14px; padding: 19px 26px; letter-spacing: 0.1em; }
    .avatar-stack .av { width: 44px; height: 44px; margin-left: -12px; }
    .stats .in { grid-template-columns: 1fr; gap: 28px; padding: 40px 20px; }
    .stats b { font-size: 42px; }
}`;

const avatars = `<div class="avatar-stack" aria-hidden="true">
            <span class="av" style="background-image:url('/images/students/medellin-1.jpg')"></span>
            <span class="av" style="background-image:url('/images/students/medellin-2.jpg')"></span>
            <span class="av" style="background-image:url('/images/students/medellin-3.jpg')"></span>
            <span class="av" style="background-image:url('/images/students/medellin-4.jpg')"></span>
            <span class="av" style="background-image:url('/images/students/medellin-5.jpg')"></span>
            <span class="av" style="background-image:url('/images/students/medellin-6.jpg')"></span>
        </div>`;

const bodyHtml = `<header class="bar">
    <img src="/waitlist/assets/logo-alegria-white-59.47b95d50.webp" srcset="/waitlist/assets/logo-alegria-white-59.47b95d50.webp 1x, /waitlist/assets/logo-alegria-white-118.2fd43538.webp 2x" width="59" height="60" alt="Alegría">
    <span>Víctor Álvarez Alegría</span>
</header>

<section class="hero">
    <div class="hero-bg" aria-hidden="true"></div>
    <div class="eyebrow rise d1">The 1% Method Masterclass Replay</div>
    <h1 class="rise d2">
        Press play to start the replay.
        <span class="h1b">4 secrets to win auditions faster.</span>
    </h1>
    <div class="timer rise d3" id="timer">
        <div class="timer-label" id="timerLabel">This replay will only be available for the next 72 hours</div>
        <div class="clock" role="timer" aria-live="off">
            <div class="unit"><b id="tD">03</b><span>Days</span></div>
            <div class="unit"><b id="tH">00</b><span>Hours</span></div>
            <div class="unit"><b id="tM">00</b><span>Minutes</span></div>
            <div class="unit"><b id="tS">00</b><span>Seconds</span></div>
        </div>
    </div>
</section>

<div class="stage">
    <div class="video rise d4" id="videoBox">
        <div class="ph"><div class="ph-label">Loading the replay&hellip;</div></div>
    </div>
    <p class="stat-line">Watch all four secrets to the end, then book your free call with Victor just below.</p>
</div>

<section class="next">
    <div class="lead">Step 2</div>
    <h2>Book your free <i>1% Method Strategy Session</i> with Victor</h2>
    <div class="rule"></div>
    <div class="full">
        <p><b>Most likely, Victor's studio is already 95% full.</b> Act while you can.</p>
        <div class="meter" aria-hidden="true"><i></i></div>
        <div class="meter-cap">Studio 95% full</div>
    </div>
</section>

<section class="calband">
    <div class="calcard">
    <div class="cal" id="book">
        <!-- Same embed as /apply: no calendly-inline-widget class and no data-url
             here, on purpose (widget.js would mark the box processed before the
             visitor id is known). The script below builds the URL and calls
             initInlineWidget itself. -->
        <div id="calendly"
             data-url-base="https://calendly.com/victoralvarezalegria/60min?hide_gdpr_banner=1&utm_campaign=replay"
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

<section class="results">
    <div class="lead">Students Who Achieved Their Goals</div>
    <h2>The same method you just watched</h2>
    <div class="cards">
        <div class="card">
            <div class="who">Ian</div>
            <div class="inst">Trombone &middot; USA</div>
            <p>Won two principal trombone jobs: Topeka Symphony and Springfield Symphony.</p>
        </div>
        <div class="card">
            <div class="who">Byron</div>
            <div class="inst">Trombone &middot; Colombia</div>
            <p>Accepted to conservatories in the United States, with a full scholarship at Ball State University.</p>
        </div>
        <div class="card">
            <div class="who">Grégoire</div>
            <div class="inst">Tuba &middot; France</div>
            <p>Won his place as an academist of the Orchestre de Paris.</p>
        </div>
        <div class="card">
            <div class="who">Joel Crespo</div>
            <div class="inst">Trombone &middot; Spain</div>
            <p>Accepted to the Sibelius Academy in Helsinki.</p>
        </div>
    </div>
</section>

<section class="stage-proof">
    <div class="lead">On stage with the best</div>
    <h2>Just in case you haven't seen where Victor plays</h2>
    <div class="prints">
        <figure class="print"><img src="/images/victor-with-rattle.jpg" alt="Victor Alegria with Sir Simon Rattle" loading="lazy"><figcaption>Sir Simon Rattle<small>Berliner Philharmoniker</small></figcaption></figure>
        <figure class="print"><img src="/images/victor-with-dudamel.jpg" alt="Victor Alegria with Gustavo Dudamel" loading="lazy"><figcaption>Gustavo Dudamel<small>Berliner Philharmoniker</small></figcaption></figure>
        <figure class="print"><img src="/images/victor-alessi.jpg" alt="Victor Alegria with Joseph Alessi" loading="lazy"><figcaption>Joseph Alessi<small>Taipei Music Festival and Academy</small></figcaption></figure>
        <figure class="print"><img src="/images/victor-with-yannick.jpg" alt="Victor Alegria with Yannick Nézet-Séguin" loading="lazy"><figcaption>Yannick Nézet-Séguin<small>Berliner Philharmoniker</small></figcaption></figure>
        <figure class="print"><img src="/images/victor-with-makela.jpg" alt="Victor Alegria with Klaus Mäkelä" loading="lazy"><figcaption>Klaus Mäkelä<small>Royal Concertgebouw Orchestra</small></figcaption></figure>
        <figure class="print"><img src="/images/victor-with-jpsaraste.jpg" alt="Victor Alegria with Jukka-Pekka Saraste" loading="lazy"><figcaption>Jukka-Pekka Saraste<small>Helsinki Philharmonic Orchestra</small></figcaption></figure>
    </div>
</section>

<section class="close-cta">
    <div class="ready">Are you ready to become my next biggest success story?</div>
    <p class="cap">Most likely my studio is already 95% full. Book your call before the replay comes down.</p>
    <a class="cta" href="#book" data-t="replay-book">Book My Free Strategy Session</a>
    <div class="close-timer" id="closeTimer"></div>
    <div class="cta-social">
        ${avatars}
        <div class="stars" role="img" aria-label="5 out of 5 stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
        <p class="proof-line">100+ online students worldwide</p>
    </div>
</section>

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
        <a href="/privacy">Privacy Policy</a>
    </div>
    <div class="disclaimer">
        <p>This site is not a part of the Facebook website or Facebook Inc. Additionally, this site is NOT endorsed by Facebook in any way. FACEBOOK is a trademark of FACEBOOK, Inc.</p>
        <p>NOT GOOGLE: This site is not a part of the Google website or Google Inc. Additionally, this site is NOT endorsed by Google in any way.</p>
    </div>
</div>`;

const replayScript = `
/* The replay. Loom recording of the live class on 2026-10-27 ("4 Secrets to Win
   Auditions Faster", 50 min). */
var VIDEO_EMBED = "https://www.loom.com/embed/e188a3cb1e7241b192275975b62aad83?hide_owner=true&hide_share=true&hide_title=true&hideEmbedTopBar=true";

/* 72-hour window. Default: per visitor, counted from their first visit and kept
   in localStorage + a cookie, so the same page also works as an evergreen replay
   later. To give everyone one shared deadline instead, set FIXED_DEADLINE to an
   ISO time, e.g. "2026-11-01T23:59:00+01:00" (Madrid). When the window ends the
   video is taken off the page; the calendar stays. */
var WINDOW_MS = 72 * 60 * 60 * 1000;
var FIXED_DEADLINE = "";
var START_KEY = "va_replay_start";

function readStart() {
    var v = null;
    try { v = localStorage.getItem(START_KEY); } catch (e) {}
    if (!v) { var m = (' ' + document.cookie).match(/[; ]va_replay_start=([0-9]+)/); if (m) v = m[1]; }
    var n = parseInt(v, 10);
    if (!(n > 0) || n > Date.now()) {
        n = Date.now();
        try { localStorage.setItem(START_KEY, String(n)); } catch (e) {}
        document.cookie = 'va_replay_start=' + n + '; path=/; max-age=31536000; SameSite=Lax';
    }
    return n;
}
var deadline = FIXED_DEADLINE ? new Date(FIXED_DEADLINE).getTime() : readStart() + WINDOW_MS;

var box = document.getElementById('videoBox');
function showVideo() {
    var f = document.createElement('iframe');
    f.src = VIDEO_EMBED;
    f.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen";
    f.allowFullscreen = true;
    f.title = "The 1% Method Masterclass replay";
    box.innerHTML = "";
    box.appendChild(f);
}
function closeReplay() {
    box.innerHTML = '<div class="ph"><div class="ph-title">The replay has been taken down</div>' +
        '<div class="ph-label">You can still talk to Victor. Book your free strategy session below.</div></div>';
    document.getElementById('timer').classList.add('closed');
    document.getElementById('timerLabel').textContent = 'This replay is no longer available';
    document.getElementById('closeTimer').textContent = '';
}

function pad(n) { return (n < 10 ? '0' : '') + n; }
var tD = document.getElementById('tD'), tH = document.getElementById('tH'),
    tM = document.getElementById('tM'), tS = document.getElementById('tS'),
    closeTimer = document.getElementById('closeTimer');
var tick;
function render() {
    var left = deadline - Date.now();
    if (left <= 0) { clearInterval(tick); closeReplay(); return false; }
    var s = Math.floor(left / 1000);
    var d = Math.floor(s / 86400), h = Math.floor(s % 86400 / 3600), m = Math.floor(s % 3600 / 60), sec = s % 60;
    tD.textContent = pad(d); tH.textContent = pad(h); tM.textContent = pad(m); tS.textContent = pad(sec);
    closeTimer.textContent = 'Replay comes down in ' + pad(d * 24 + h) + 'h ' + pad(m) + 'm ' + pad(sec) + 's';
    return true;
}
if (render()) { showVideo(); tick = setInterval(render, 1000); }
`;

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
      <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Caveat:wght@600&display=swap" rel="stylesheet" />
      <link href="https://assets.calendly.com/assets/external/widget.css" rel="stylesheet" />
      <style dangerouslySetInnerHTML={{ __html: css }} />

      <div dangerouslySetInnerHTML={{ __html: bodyHtml }} />
      <script
        id="body-replay"
        dangerouslySetInnerHTML={{ __html: replayScript }}
      />
      <script src="https://assets.calendly.com/assets/external/widget.js" async></script>
      <script
        id="body-1"
        dangerouslySetInnerHTML={{ __html: bodyScript1 }}
      />
    </>
  );
}
