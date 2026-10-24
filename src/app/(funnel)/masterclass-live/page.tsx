import type { Metadata } from "next";

// Victor's copy and the registration script from the original live page
// (victor-site-handoff/funnel/index.html), unchanged, plus the date, time and "limited seats".
// Rebuilt 2026-10-24 on the /watch design system (proof stack, polaroids, animated
// talking points, stats band).

export const metadata: Metadata = {
  title: "The 1% Method Masterclass. Victor Alegria",
  description: "A free live masterclass for serious brass players. Unlock the high register, win auditions, end stage fright, without adding a single hour of practice. With Victor Alegria.",
};

const css = `/* Victor's design system, measured from alegriamusic.net (2026-10-24):
   bg #1a1d24 / card #22262f / raised #2a2e38 / line #2e3340 / text #e8e8e8 / muted #8a8f9a,
   one accent #FF6B35. Cormorant Garamond (light, italic second line) for display,
   Space Grotesk for everything else. Buttons: square 0.3rem corners, uppercase, tracked.
   Finish borrowed from the /waitlist page: polaroid photo print, glowing CTA. */
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

/* === COUNTDOWN BAND (top of page, the site's orange band) === */
.countdown { position: relative; z-index: 4; background: var(--accent); color: #fff; }
.countdown .in {
    max-width: 1200px; margin: 0 auto; padding: 12px 32px;
    display: flex; align-items: center; justify-content: center; gap: 28px;
}
.cd-label { font-size: 13px; font-weight: 600; letter-spacing: 0.16em; text-transform: uppercase; }
.cd-units { display: flex; align-items: flex-start; gap: 6px; }
.cd-unit { min-width: 52px; text-align: center; }
.cd-unit b { display: block; font-family: var(--serif); font-weight: 600; font-size: 34px; line-height: 1; font-variant-numeric: tabular-nums; }
.cd-unit span { display: block; margin-top: 4px; font-size: 10px; font-weight: 600; letter-spacing: 0.16em; text-transform: uppercase; color: rgba(255,255,255,0.8); }
.cd-colon { font-family: var(--serif); font-size: 30px; line-height: 1; opacity: 0.6; }
.countdown.done .cd-units { display: none; }

/* === HEADER (the site's wordmark, no nav: this is a funnel page) === */
.bar {
    position: absolute; top: var(--cd-h, 70px); left: 0; right: 0; z-index: 3;
    display: flex; align-items: center; gap: 12px;
    max-width: 1200px; margin: 0 auto; padding: 22px 32px;
}
.bar img { width: 26px; height: auto; }
.bar span {
    font-size: 12px; font-weight: 500; letter-spacing: 0.16em; text-transform: uppercase; color: var(--ink);
}

/* === HERO (dark orchestra photo under a heavy veil, like the home page) === */
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
.eyebrow {
    color: var(--accent); font-weight: 500; font-size: 12px; letter-spacing: 0.22em;
    text-transform: uppercase; margin-bottom: 26px;
}
.eyebrow.big { margin-bottom: 28px; }
.eyebrow.big strong { display: block; font-size: 20px; font-weight: 700; letter-spacing: 0.24em; color: var(--accent); }
.eyebrow.big span { display: block; margin-top: 8px; font-size: 12px; font-weight: 500; letter-spacing: 0.22em; color: var(--ink); }
h1 {
    font-family: var(--serif); font-weight: 300; font-size: 64px; line-height: 1.06;
    letter-spacing: -0.01em; color: #fff; max-width: 980px; margin: 0 auto; text-wrap: balance;
}
h1 .h1b {
    display: block; font-style: italic; font-weight: 300; font-size: 44px;
    margin-top: 14px; color: var(--ink);
}
.rule { width: 48px; height: 1px; background: var(--accent); margin: 30px auto 0; }

/* === WHEN: calendar card + date/time. Builds once when it scrolls into view
   (.in, set by the script below); without motion or JS it shows finished. === */
.when {
    display: flex; align-items: center; justify-content: center; gap: 40px;
    max-width: 760px; margin: 36px auto 0; text-align: left;
}
.cal {
    position: relative; flex: 0 0 auto; width: 280px; padding: 0 18px 18px;
    background: var(--card); border: 1px solid var(--line); border-radius: 14px;
    box-shadow: 0 30px 60px -30px rgba(0,0,0,0.8), 0 0 70px -20px rgba(255,107,53,0.25);
}
.cal-rings { position: absolute; top: -9px; left: 0; right: 0; display: flex; justify-content: space-between; padding: 0 64px; }
.cal-rings i { width: 8px; height: 20px; border-radius: 4px; background: var(--raised); border: 1px solid var(--line); }
.cal-head {
    display: flex; justify-content: space-between; align-items: baseline;
    margin: 0 -18px 12px; padding: 20px 20px 12px; border-bottom: 1px solid var(--line);
    font-size: 12px; font-weight: 600; letter-spacing: 0.22em; text-transform: uppercase; color: var(--accent);
}
.cal-head span:last-child { color: var(--muted); }
.cal-dow, .cal-grid { display: grid; grid-template-columns: repeat(7, 1fr); text-align: center; }
.cal-dow span { font-size: 10px; font-weight: 600; letter-spacing: 0.12em; color: var(--muted); padding-bottom: 6px; }
.cal-grid .d { position: relative; height: 32px; line-height: 32px; font-size: 13px; color: var(--ink); font-variant-numeric: tabular-nums; }
.cal-grid .d.past { color: #5d626d; }
.cal-grid .d.on b { position: relative; z-index: 1; font-weight: 700; color: #fff; }
.cal-grid .d.on::before {
    content: ""; position: absolute; left: 50%; top: 50%; width: 30px; height: 30px; margin: -15px 0 0 -15px;
    border-radius: 50%; background: var(--accent);
}
.cal-grid .d.on svg { position: absolute; left: 50%; top: 50%; width: 44px; height: 44px; margin: -22px 0 0 -22px; overflow: visible; }
.cal-grid .d.on circle {
    fill: none; stroke: var(--accent); stroke-width: 1.5; stroke-linecap: round;
    stroke-dasharray: 120; stroke-dashoffset: 0; transform: rotate(-90deg); transform-origin: 50% 50%; opacity: 0.6;
}
.when-text { min-width: 0; }
.when-date { font-family: var(--serif); font-weight: 400; font-size: 36px; line-height: 1.15; color: #fff; }
.when-time { display: flex; align-items: center; gap: 10px; margin-top: 10px; font-size: 17px; font-weight: 600; color: #fff; letter-spacing: 0.02em; }
.clock { position: relative; flex: 0 0 auto; width: 22px; height: 22px; border-radius: 50%; border: 1.5px solid var(--accent); }
.clock i { position: absolute; left: 50%; bottom: 50%; width: 1.5px; margin-left: -0.75px; background: #fff; border-radius: 1px; transform-origin: 50% 100%; }
.clock .hh { height: 5.5px; transform: rotate(210deg); }
.clock .mh { height: 8px; transform: rotate(360deg); }
.when-zones { margin-top: 8px; font-size: 14px; color: var(--muted); }
.when-live { margin-top: 18px; font-size: 15px; font-weight: 500; color: var(--accent); }
.when-live b { display: block; font-size: 13px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; margin-bottom: 4px; }
.close-cta .when { margin-top: 40px; }

@media (prefers-reduced-motion: no-preference) {
    .js .when:not(.in) .cal, .js .when:not(.in) .cal-grid .d,
    .js .when:not(.in) .when-text > *, .js .when:not(.in) .cal-grid .d.on::before { opacity: 0; }
    .js .when:not(.in) .cal-grid .d.on circle { stroke-dashoffset: 120; }
    .when.in .cal { animation: calIn 0.7s cubic-bezier(.16,1,.3,1) both; }
    .when.in .cal-grid .d { animation: dayIn 0.4s cubic-bezier(.16,1,.3,1) both; animation-delay: calc(0.25s + var(--i, 0) * 18ms); }
    .when.in .cal-grid .d.on::before { animation: dayOn 0.5s cubic-bezier(.16,1,.3,1) 1.15s both; }
    .when.in .cal-grid .d.on circle { animation: ring 0.9s cubic-bezier(.65,0,.35,1) 1.05s both; }
    .when.in .when-text > * { animation: rise 0.7s cubic-bezier(.2,.7,.2,1) both; }
    .when.in .when-text > :nth-child(1) { animation-delay: 1.35s; }
    .when.in .when-text > :nth-child(2) { animation-delay: 1.5s; }
    .when.in .when-text > :nth-child(3) { animation-delay: 1.62s; }
    .when.in .when-text > :nth-child(4) { animation-delay: 1.74s; }
    .when.in .clock .hh { animation: hourHand 1.3s cubic-bezier(.65,0,.35,1) 1.5s both; }
    .when.in .clock .mh { animation: minHand 1.3s cubic-bezier(.65,0,.35,1) 1.5s both; }
}
@keyframes calIn { from { opacity: 0; transform: translateY(18px) rotate(-2deg); } to { opacity: 1; transform: none; } }
@keyframes dayIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; } }
@keyframes dayOn { from { opacity: 0; transform: scale(0.4); } to { opacity: 1; transform: none; } }
@keyframes ring { from { stroke-dashoffset: 120; } to { stroke-dashoffset: 0; } }
@keyframes hourHand { from { transform: rotate(0deg); } to { transform: rotate(210deg); } }
@keyframes minHand { from { transform: rotate(0deg); } to { transform: rotate(2520deg); } }

/* === CTA (site button + waitlist glow) === */
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

/* === PROOF UNDER THE BUTTON (Timo's FB funnel stack: avatars, stars, one line, all centered) ===
   Faces are trombonists from Victor's Medellín masterclass (public/images/students). */
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

/* === THREE PRINTS: masterclass, Victor, Helsinki === */
.prints {
    position: relative; max-width: 1040px; margin: 0 auto; padding: 56px 32px 0;
    display: flex; justify-content: center; align-items: flex-end;
}
.print {
    background: #fdfcfa; padding: 12px 12px 0; border-radius: 3px; flex: 0 0 auto;
    box-shadow: 0 1px 2px rgba(0,0,0,0.25), 0 30px 60px -24px rgba(0,0,0,0.8);
}
.print img { width: 100%; object-fit: cover; }
.print figcaption {
    font-family: "Caveat", "Bradley Hand", cursive; font-weight: 600; font-size: 21px; color: #2a2b30;
    text-align: center; padding: 10px 8px 14px; line-height: 1.2;
}
.print.side { width: 300px; }
.print.side img { aspect-ratio: 4 / 3; }
.print.left { transform: rotate(-6deg) translate(10px, -6px); z-index: 1; }
.print.right { transform: rotate(5deg) translate(-10px, -14px); z-index: 1; }
.print.right img { aspect-ratio: 3 / 4; object-position: 50% 30%; }
.print.right { width: 230px; }
.print.main { width: 330px; transform: rotate(-1deg); z-index: 2; }
.print.main img { aspect-ratio: 4 / 5; object-position: 50% 20%; }

/* === TALKING POINTS: Timo's FB funnel learn rows (animation beside each point, alternating) ===
   Animations: HyperFrames loops from output/watch-point-loops, rendered to /videos/watch. */
.points { max-width: 1100px; margin: 0 auto; padding: 96px 32px 0; }
.points > .lead { text-align: center; }
.points > .rule { margin: 18px auto 64px; }
.lead {
    font-weight: 500; font-size: 12px; letter-spacing: 0.22em; text-transform: uppercase; color: var(--accent);
}
.learn-rows { display: flex; flex-direction: column; gap: 88px; }
.learn-row { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: center; }
.learn-row > * { min-width: 0; }
.learn-row:nth-child(even) .viz { order: 2; }
.viz {
    position: relative; aspect-ratio: 16 / 10; border-radius: 18px; overflow: hidden;
    background: var(--card); border: 1px solid var(--line);
    box-shadow: 0 30px 60px -30px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,107,53,0.06);
}
.viz video { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; display: block; }
.learn-num { font-family: var(--serif); font-weight: 300; font-size: 56px; line-height: 1; color: var(--accent); margin-bottom: 18px; }
.benefit { font-size: 17px; line-height: 1.75; color: #b9bdc6; }
.benefit b { display: block; font-family: var(--serif); font-weight: 400; font-style: italic; font-size: 36px; line-height: 1.15; color: #fff; margin-bottom: 14px; }

/* === CLOSE === */
.close-cta { text-align: center; padding: 80px 24px 104px; }
.fire {
    font-family: var(--serif); font-weight: 300; font-style: italic; font-size: 36px; line-height: 1.25;
    color: #fff; text-wrap: balance;
}
.ctawrap .cta { margin-top: 28px; }
.nocost { font-size: 13px; color: var(--muted); margin-top: 18px; letter-spacing: 0.02em; }

/* === STATS BAND (the site's orange band, same three numbers) === */
.stats { background: var(--accent); }
.stats .in {
    max-width: 1120px; margin: 0 auto; padding: 44px 32px;
    display: grid; grid-template-columns: repeat(3, 1fr); text-align: center;
}
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

/* === POPUP === */
.overlay {
    position: fixed; inset: 0; background: rgba(10,11,14,0.78); backdrop-filter: blur(4px);
    display: none; align-items: center; justify-content: center; z-index: 100; padding: 20px;
}
.overlay.open { display: flex; }
.modal {
    background: var(--card); border: 1px solid var(--line); border-top: 2px solid var(--accent);
    border-radius: 0.3rem; max-width: 500px; width: 100%;
    padding: 44px 40px 34px; text-align: center; position: relative;
    box-shadow: 0 40px 90px -20px rgba(0,0,0,0.75);
}
.modal .close {
    position: absolute; top: 12px; right: 16px; font-size: 26px; color: var(--muted);
    background: none; border: none; cursor: pointer; line-height: 1;
}
.modal .close:hover { color: #fff; }
.modal h2 { font-family: var(--serif); font-weight: 300; font-size: 38px; margin-bottom: 12px; color: #fff; }
.modal .sub { font-size: 14px; color: var(--muted); line-height: 1.6; margin-bottom: 26px; }
.modal input {
    width: 100%; padding: 15px 16px; margin-bottom: 12px; font-size: 16px;
    border: 1px solid var(--line); border-radius: 0.3rem; font-family: inherit;
    background: var(--raised); color: var(--ink);
}
.modal input::placeholder { color: var(--muted); }
.modal input:focus { outline: none; border-color: var(--accent); }
.modal button[type=submit] {
    width: 100%; padding: 19px; margin-top: 4px; border: none; border-radius: 0.3rem; cursor: pointer;
    background: var(--accent); color: #fff; font-weight: 600; font-size: 15px; font-family: inherit;
    letter-spacing: 0.12em; text-transform: uppercase;
    box-shadow: 0 16px 34px -14px rgba(255,107,53,0.7);
    transition: background 0.2s ease;
}
.modal button[type=submit]:hover { background: var(--accent-dark); }
.modal .fine { font-size: 12px; color: var(--muted); margin-top: 14px; }
.formmsg { display: none; font-weight: 500; color: var(--accent); margin-top: 12px; font-size: 14px; }

/* === ENTRANCE (starts visible-safe: only runs when motion is allowed) === */
@media (prefers-reduced-motion: no-preference) {
    .rise { animation: rise 0.8s cubic-bezier(.2,.7,.2,1) both; }
    .d1 { animation-delay: 0.08s; } .d2 { animation-delay: 0.18s; } .d3 { animation-delay: 0.3s; } .d4 { animation-delay: 0.42s; }
}
@keyframes rise { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: none; } }
@media (prefers-reduced-motion: reduce) {
    .hero-bg, .cta { animation: none; }
}

/* === MOBILE === */
@media (max-width: 860px) {
    .bar { padding: 18px 20px; }
    .countdown .in { flex-direction: column; gap: 8px; padding: 12px 16px 14px; }
    .cd-label { font-size: 11px; }
    .cd-unit { min-width: 44px; }
    .cd-unit b { font-size: 28px; }
    .cd-colon { font-size: 24px; }
    .eyebrow.big strong { font-size: 16px; letter-spacing: 0.2em; }
    .eyebrow.big span { font-size: 11px; }
    .hero { padding: 104px 20px 48px; }
    h1 { font-size: 40px; }
    h1 .h1b { font-size: 29px; }
    .eyebrow { font-size: 11px; letter-spacing: 0.18em; }
    .when { flex-direction: column; gap: 26px; text-align: center; }
    .cal { width: 264px; }
    .when-time { justify-content: center; }
    .when-date { font-size: 30px; }
    .when-time { font-size: 16px; }
    .when-zones { font-size: 13px; }
    .cta { font-size: 14px; padding: 19px 26px; letter-spacing: 0.1em; }
    .avatar-stack .av { width: 44px; height: 44px; margin-left: -12px; }
    .prints { padding: 40px 0 0; }
    .print.main { width: 184px; }
    .print.side { width: 140px; }
    .print.right { width: 104px; }
    .print figcaption { font-size: 14px; padding: 6px 3px 9px; }
    .print { padding: 6px 6px 0; }
    .print.side { padding-bottom: 18px; }
    .print.side figcaption { display: none; }
    .print.left { transform: rotate(-7deg) translate(38px, -4px); }
    .print.right { transform: rotate(6deg) translate(-38px, -10px); }
    .points { padding: 64px 20px 0; }
    .learn-rows { gap: 56px; }
    .learn-row { grid-template-columns: 1fr; gap: 22px; }
    .learn-row:nth-child(even) .viz { order: 0; }
    .learn-num { font-size: 44px; margin-bottom: 10px; }
    .benefit b { font-size: 28px; }
    .close-cta { padding: 64px 20px 80px; }
    .fire { font-size: 28px; }
    .stats .in { grid-template-columns: 1fr; gap: 28px; padding: 40px 20px; }
    .stats b { font-size: 42px; }
    .modal { padding: 38px 24px 28px; }
    .modal h2 { font-size: 32px; }
}
@media (max-width: 380px) {
    .print.main { width: 168px; }
    .print.side { width: 128px; }
    .print.right { width: 96px; }
}`;

const bodyHtml = `<div class="countdown" id="countdown" role="timer" aria-live="off">
    <div class="in">
        <div class="cd-label" id="cdLabel">Free live masterclass starts in</div>
        <div class="cd-units">
            <div class="cd-unit"><b id="cdD">--</b><span>Days</span></div><div class="cd-colon">:</div>
            <div class="cd-unit"><b id="cdH">--</b><span>Hours</span></div><div class="cd-colon">:</div>
            <div class="cd-unit"><b id="cdM">--</b><span>Min</span></div><div class="cd-colon">:</div>
            <div class="cd-unit"><b id="cdS">--</b><span>Sec</span></div>
        </div>
    </div>
</div>

<header class="bar">
    <img src="/waitlist/assets/logo-alegria-white-59.47b95d50.webp" srcset="/waitlist/assets/logo-alegria-white-59.47b95d50.webp 1x, /waitlist/assets/logo-alegria-white-118.2fd43538.webp 2x" width="59" height="60" alt="Alegría">
    <span>Víctor Álvarez Alegría</span>
</header>

<section class="hero">
    <div class="hero-bg" aria-hidden="true"></div>
    <!-- Promise copied VERBATIM from slide 1 of the masterclass deck, so the ad,
         this page, and the webinar's opening slide all make the same promise. -->
    <div class="eyebrow big rise d1"><strong>Free Live Masterclass</strong><span>For serious brass players</span></div>
    <h1 class="rise d2">
        Unlock the high register. Win auditions. End stage fright.
        <span class="h1b">Without adding a single hour of practice.</span>
    </h1>
    <div class="rule rise d3"></div>
    <div class="when rise d3">
        <div class="cal" aria-hidden="true">
            <div class="cal-rings"><i></i><i></i></div>
            <div class="cal-head"><span>October</span><span>2026</span></div>
            <div class="cal-dow"><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span><span>S</span></div>
            <div class="cal-grid"><span class="d e"></span><span class="d e"></span><span class="d e"></span><span class="d past" style="--i:3">1</span><span class="d past" style="--i:4">2</span><span class="d past" style="--i:5">3</span><span class="d past" style="--i:6">4</span><span class="d past" style="--i:7">5</span><span class="d past" style="--i:8">6</span><span class="d past" style="--i:9">7</span><span class="d past" style="--i:10">8</span><span class="d past" style="--i:11">9</span><span class="d past" style="--i:12">10</span><span class="d past" style="--i:13">11</span><span class="d past" style="--i:14">12</span><span class="d past" style="--i:15">13</span><span class="d past" style="--i:16">14</span><span class="d past" style="--i:17">15</span><span class="d past" style="--i:18">16</span><span class="d past" style="--i:19">17</span><span class="d past" style="--i:20">18</span><span class="d past" style="--i:21">19</span><span class="d past" style="--i:22">20</span><span class="d past" style="--i:23">21</span><span class="d past" style="--i:24">22</span><span class="d past" style="--i:25">23</span><span class="d past" style="--i:26">24</span><span class="d past" style="--i:27">25</span><span class="d past" style="--i:28">26</span><span class="d on" style="--i:29"><svg viewBox="0 0 44 44" aria-hidden="true"><circle cx="22" cy="22" r="19"/></svg><b>27</b></span><span class="d" style="--i:30">28</span><span class="d" style="--i:31">29</span><span class="d" style="--i:32">30</span><span class="d" style="--i:33">31</span></div>
        </div>
        <div class="when-text">
            <div class="when-date">Tuesday, October 27th</div>
            <div class="when-time"><span class="clock" aria-hidden="true"><i class="hh"></i><i class="mh"></i></span>7:00 PM CET (Madrid/Berlin)</div>
            <div class="when-zones">6:00 PM London &middot; 2:00 PM New York &middot; 11:00 AM Los Angeles</div>
            <p class="when-live"><b>Limited time only.</b> This class is live, and it will not be available after Tuesday, October 27th.</p>
        </div>
    </div>
    <a class="cta rise d4" href="#open-popup" data-t="open-popup">YES! Save My Free Seat Now!</a>
    <div class="cta-social rise d4">
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

<div class="prints">
    <figure class="print side left">
        <img src="/images/students/medellin-group.jpg" alt="Victor Alegria with the trombonists of his masterclass in Medellín" loading="lazy">
        <figcaption>Masterclass, Medellín</figcaption>
    </figure>
    <figure class="print main">
        <img src="/victor.jpg" alt="Victor Alegria, Principal Trombone of the Helsinki Philharmonic, with his trombone">
        <figcaption>Victor Alegria</figcaption>
    </figure>
    <figure class="print side right">
        <img src="/images/guide-victor-helsinki.jpg" alt="Victor Alegria on stage at the Helsinki Philharmonic" loading="lazy">
        <figcaption>Helsinki Philharmonic</figcaption>
    </figure>
</div>

<section class="points">
        <div class="lead">EXCLUSIVE LIVE TRAINING WITH VICTOR ALEGRIA:</div>
        <div class="rule"></div>
        <div class="learn-rows">
        <div class="learn-row">
            <div class="viz"><video src="/videos/watch/point-1.mp4" poster="/videos/watch/point-1.jpg" muted autoplay loop playsinline preload="auto" aria-hidden="true"></video></div>
            <div class="learn-text">
                <div class="learn-num">01</div>
                <div class="benefit"><b>Unlock Your High Register:</b> The air and lip-corner system that expands your range without pressure, forcing, or wrecked chops.</div>
            </div>
        </div>
        <div class="learn-row">
            <div class="viz"><video src="/videos/watch/point-2.mp4" poster="/videos/watch/point-2.jpg" muted autoplay loop playsinline preload="auto" aria-hidden="true"></video></div>
            <div class="learn-text">
                <div class="learn-num">02</div>
                <div class="benefit"><b>Play With Real Confidence:</b> Why stage fright is not a stage problem, and the off-stage habits that end it for good.</div>
            </div>
        </div>
        <div class="learn-row">
            <div class="viz"><video src="/videos/watch/point-3.mp4" poster="/videos/watch/point-3.jpg" muted autoplay loop playsinline preload="auto" aria-hidden="true"></video></div>
            <div class="learn-text">
                <div class="learn-num">03</div>
                <div class="benefit"><b>Win When It Counts:</b> The exact preparation system Victor used to win Principal Trombone of the Helsinki Philharmonic and the Macao Orchestra.</div>
            </div>
        </div>
        <div class="learn-row">
            <div class="viz"><video src="/videos/watch/point-4.mp4" poster="/videos/watch/point-4.jpg" muted autoplay loop playsinline preload="auto" aria-hidden="true"></video></div>
            <div class="learn-text">
                <div class="learn-num">04</div>
                <div class="benefit"><b>Practice Less, Progress More:</b> The 40/60 rule that gets you further in 60 to 90 focused minutes than 4 hours of grinding ever will.</div>
            </div>
        </div>
        </div>
</section>

<section class="close-cta">
        <div class="fire">&#128293; One live session. When it's full, it's full! &#128293;</div>
        <div class="when">
        <div class="cal" aria-hidden="true">
            <div class="cal-rings"><i></i><i></i></div>
            <div class="cal-head"><span>October</span><span>2026</span></div>
            <div class="cal-dow"><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span><span>S</span></div>
            <div class="cal-grid"><span class="d e"></span><span class="d e"></span><span class="d e"></span><span class="d past" style="--i:3">1</span><span class="d past" style="--i:4">2</span><span class="d past" style="--i:5">3</span><span class="d past" style="--i:6">4</span><span class="d past" style="--i:7">5</span><span class="d past" style="--i:8">6</span><span class="d past" style="--i:9">7</span><span class="d past" style="--i:10">8</span><span class="d past" style="--i:11">9</span><span class="d past" style="--i:12">10</span><span class="d past" style="--i:13">11</span><span class="d past" style="--i:14">12</span><span class="d past" style="--i:15">13</span><span class="d past" style="--i:16">14</span><span class="d past" style="--i:17">15</span><span class="d past" style="--i:18">16</span><span class="d past" style="--i:19">17</span><span class="d past" style="--i:20">18</span><span class="d past" style="--i:21">19</span><span class="d past" style="--i:22">20</span><span class="d past" style="--i:23">21</span><span class="d past" style="--i:24">22</span><span class="d past" style="--i:25">23</span><span class="d past" style="--i:26">24</span><span class="d past" style="--i:27">25</span><span class="d past" style="--i:28">26</span><span class="d on" style="--i:29"><svg viewBox="0 0 44 44" aria-hidden="true"><circle cx="22" cy="22" r="19"/></svg><b>27</b></span><span class="d" style="--i:30">28</span><span class="d" style="--i:31">29</span><span class="d" style="--i:32">30</span><span class="d" style="--i:33">31</span></div>
        </div>
        <div class="when-text">
            <div class="when-date">Tuesday, October 27th</div>
            <div class="when-time"><span class="clock" aria-hidden="true"><i class="hh"></i><i class="mh"></i></span>7:00 PM CET (Madrid/Berlin)</div>
            <div class="when-zones">6:00 PM London &middot; 2:00 PM New York &middot; 11:00 AM Los Angeles</div>
            <p class="when-live"><b>Limited time only.</b> This class is live, and it will not be available after Tuesday, October 27th.</p>
        </div>
    </div>

        <div class="ctawrap">
            <a class="cta" href="#open-popup" data-t="open-popup">YES! Save My Free Seat Now!</a>
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
            <div class="nocost">100% Free. Seats are limited!</div>
        </div>
</section>

<!-- The site's orange stats band, numbers as on alegriamusic.net -->
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
        <a href="/privacy">Privacy Policy</a><span>|</span><a href="#">Terms and Conditions</a>
    </div>
    <div class="disclaimer">
        <p>This site is not a part of the Facebook website or Facebook Inc. Additionally, this site is NOT endorsed by Facebook in any way. FACEBOOK is a trademark of FACEBOOK, Inc.</p>
        <p>NOT GOOGLE: This site is not a part of the Google website or Google Inc. Additionally, this site is NOT endorsed by Google in any way.</p>
    </div>
</div>

<!-- === REGISTRATION POPUP === -->
<div class="overlay" id="popup">
    <div class="modal">
        <button class="close" id="closeBtn" aria-label="Close">&times;</button>
        <h2>Reserve Your Free Seat</h2>
        <p class="sub">The 1% Method: a live masterclass with Victor Alegria, Principal Trombone of the Helsinki Philharmonic.</p>
        <form id="regForm">
            <input type="text" name="firstname" placeholder="Your first name" required>
            <input type="email" name="email" placeholder="Your best email" required>
            <input type="tel" name="phone" placeholder="Your phone number" autocomplete="tel" inputmode="tel" required>
            <!-- Visitor id, filled by /t.js. Hidden rather than read live at
                 submit time so the redirect never waits on /api/t/init. -->
            <input id="lf-vid" name="vid" type="hidden" value="">
            <button type="submit">SAVE MY SEAT!</button>
        </form>
        <div class="formmsg" id="formMsg"></div>
        <p class="fine">We'll email you the link and a reminder. No spam, ever.</p>
    </div>
</div>`;

const bodyScript0 = `
/* Countdown to the live class: Tuesday 27 October 2026, 7:00pm CET = 18:00 UTC.
   Keep in sync with /registered and src/lib/masterclass-config.ts. */
(function () {
    var START = Date.UTC(2026, 9, 27, 18, 0, 0), END = Date.UTC(2026, 9, 27, 19, 30, 0);
    var band = document.getElementById('countdown');
    var label = document.getElementById('cdLabel');
    var el = { d: document.getElementById('cdD'), h: document.getElementById('cdH'), m: document.getElementById('cdM'), s: document.getElementById('cdS') };
    var bar = document.querySelector('.bar');
    function pad(n) { return (n < 10 ? '0' : '') + n; }
    function fit() { if (bar) bar.style.top = band.offsetHeight + 'px'; }
    function tick() {
        var now = Date.now();
        if (now >= END) { band.classList.add('done'); label.textContent = 'This live masterclass has ended'; fit(); return; }
        if (now >= START) { band.classList.add('done'); label.textContent = 'We are live right now'; fit(); setTimeout(tick, 30000); return; }
        var t = Math.floor((START - now) / 1000);
        el.d.textContent = pad(Math.floor(t / 86400));
        el.h.textContent = pad(Math.floor(t % 86400 / 3600));
        el.m.textContent = pad(Math.floor(t % 3600 / 60));
        el.s.textContent = pad(t % 60);
        setTimeout(tick, 1000 - (now % 1000));
    }
    tick(); fit();
    window.addEventListener('resize', fit);
})();
/* Calendar build: plays once per block as it scrolls into view. */
document.documentElement.classList.add('js');
(function () {
    var blocks = document.querySelectorAll('.when');
    function play(el) { el.classList.add('in'); }
    if (!('IntersectionObserver' in window)) { blocks.forEach(play); return; }
    var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) { if (e.isIntersecting) { play(e.target); io.unobserve(e.target); } });
    }, { threshold: 0.35 });
    blocks.forEach(function (b) { io.observe(b); });
})();
/* Posts to our own serverless function, which holds the ActiveCampaign key.
   The key is NEVER in this file: page source is public to every visitor. */
var REGISTRATION_ENDPOINT = "/api/subscribe";
/* No .html: vercel.json sets cleanUrls, so /registered.html 308s to /registered. */
var THANK_YOU_PAGE = "/registered";

var popup = document.getElementById('popup');
function setOpen(open) { popup.classList.toggle('open', open); }
document.querySelectorAll('a[href="#open-popup"]').forEach(function (a) {
    a.addEventListener('click', function (ev) { ev.preventDefault(); setOpen(true); });
});
document.getElementById('closeBtn').addEventListener('click', function () { setOpen(false); });
popup.addEventListener('click', function (ev) { if (ev.target === popup) setOpen(false); });
document.addEventListener('keydown', function (ev) { if (ev.key === 'Escape') setOpen(false); });

var form = document.getElementById('regForm');
var msg = document.getElementById('formMsg');
var submitBtn = form.querySelector('button[type=submit]');

form.addEventListener('submit', function (ev) {
    ev.preventDefault();
    var email = form.email.value.trim();
    var firstName = form.firstname.value.trim();
    var phone = form.phone.value.trim();

    /* Attribution. One id for this Lead, shared by the row /api/subscribe writes
       and any server-side ad event later, so the conversion is never counted
       twice. The visitor id comes from the hidden field t.js filled, with the
       localStorage mirror as the fallback when t.js has not answered yet. */
    var eventId = '';
    try { eventId = (crypto && crypto.randomUUID) ? crypto.randomUUID() : ''; } catch (_) {}
    var vidField = document.getElementById('lf-vid');
    var vid = (vidField && vidField.value) || '';
    if (!vid) { try { vid = localStorage.getItem('tv') || ''; } catch (_) {} }

    submitBtn.disabled = true;
    submitBtn.textContent = 'SAVING YOUR SEAT...';
    msg.style.display = 'none';

    fetch(REGISTRATION_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email, firstName: firstName, phone: phone, vid: vid, eventId: eventId })
    })
    .then(function (r) { return r.json().catch(function () { return {}; }); })
    .then(function (data) {
        if (data && data.ok) {
            /* Parked for the next page, which posts the registration conversion
               (/api/t/registered) once the lead reaches the viewing room. */
            try { sessionStorage.setItem('va_lead', JSON.stringify({ email: email, firstName: firstName, vid: vid })); } catch (_) {}
            window.location.href = THANK_YOU_PAGE;
            return;
        }
        fail(data && data.error === 'invalid_email'
            ? 'That email does not look right. Try again?'
            : data && (data.error === 'invalid_phone' || data.error === 'missing_phone')
            ? 'Please enter a valid phone number, with your country code.'
            : 'Something went wrong saving your seat. Please try again.');
    })
    .catch(function () {
        fail('Could not reach the server. Check your connection and try again.');
    });

    function fail(text) {
        msg.textContent = text;
        msg.style.display = 'block';
        submitBtn.disabled = false;
        submitBtn.textContent = 'SAVE MY SEAT!';
    }
});

/* Park the visitor id in the hidden field as soon as t.js has one. Resolving it
   here rather than at submit time keeps the redirect instant even on a cold
   /api/t/init, and the localStorage fallback in the handler covers the case
   where t.js has not answered yet. */
(function fillVid(tries) {
    if (window.__t && window.__t.vid) {
        window.__t.vid().then(function (v) {
            var f = document.getElementById('lf-vid');
            if (f && v) f.value = v;
        }).catch(function () {});
        return;
    }
    if ((tries || 0) < 40) setTimeout(function () { fillVid((tries || 0) + 1); }, 100);
})(0);
`;

export default function Page() {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Caveat:wght@600&display=swap" rel="stylesheet" />
      <style dangerouslySetInnerHTML={{ __html: css }} />

      <div dangerouslySetInnerHTML={{ __html: bodyHtml }} />
      <script
        id="body-0"
        dangerouslySetInnerHTML={{ __html: bodyScript0 }}
      />
    </>
  );
}
