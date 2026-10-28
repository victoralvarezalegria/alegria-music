import type { Metadata } from "next";
import { goldPdfCss, goldPdfHtml } from "@/components/guideGoldPdf";

// Where /guide sends people after the email goes through (2026-10-18).
// The PDF lives at /downloads/the-1-percent-audition-guide.pdf.

export const metadata: Metadata = {
  title: "Your 1% Audition Guide. Victor Alegria",
  robots: { index: false, follow: false },
};

const css = `/* Same design system as /watch (alegriamusic.net): bg #1a1d24, one accent #FF6B35,
   Cormorant Garamond display, Space Grotesk text, square 0.3rem buttons. */
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
body {
    font-family: var(--sans); background: var(--bg); color: var(--ink);
    -webkit-font-smoothing: antialiased; overflow-x: hidden;
}
img { display: block; max-width: 100%; }

.bar {
    position: absolute; top: 0; left: 0; right: 0; z-index: 3;
    display: flex; align-items: center; gap: 12px;
    max-width: 1200px; margin: 0 auto; padding: 22px 32px;
}
.bar img { width: 26px; height: auto; }
.bar span { font-size: 12px; font-weight: 500; letter-spacing: 0.16em; text-transform: uppercase; color: var(--ink); }

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
h1 {
    font-family: var(--serif); font-weight: 300; font-size: 64px; line-height: 1.06;
    letter-spacing: -0.01em; color: #fff; max-width: 980px; margin: 0 auto; text-wrap: balance;
}
.rule { width: 48px; height: 1px; background: var(--accent); margin: 30px auto 0; }
.sub { font-size: 18px; line-height: 1.6; color: #b9bdc6; margin: 26px auto 0; max-width: 40ch; }

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
.open { display: block; margin-top: 22px; font-size: 14px; color: var(--muted); }
.open a { color: var(--muted); }
.open a:hover { color: var(--ink); }

.preview-wrap-o { overflow-x: clip; }
.preview-wrap { position: relative; isolation: isolate; max-width: 560px; margin: 0 auto; padding: 90px 24px 70px; }
.preview-wrap::before {
    content: ""; position: absolute; z-index: -1; left: 50%; top: 52%; width: 120%; aspect-ratio: 1;
    transform: translate(-50%, -50%); pointer-events: none;
    background: radial-gradient(closest-side, rgba(255,107,53,0.22), rgba(255,107,53,0.08) 55%, transparent 100%);
}
.preview { margin: 0 auto; max-width: 360px; }

.next-wrap { padding: 0 24px 96px; }
.next {
    max-width: 520px; margin: 0 auto; padding: 34px 32px; text-align: center;
    background: var(--raised); border: 1px solid var(--line); border-top: 2px solid var(--accent);
    border-radius: 0.3rem;
    box-shadow: 0 30px 60px -30px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,107,53,0.06);
}
.next p { font-size: 17px; line-height: 1.7; color: #b9bdc6; }
.next a {
    display: inline-flex; align-items: center; justify-content: center; max-width: 100%;
    margin-top: 24px; padding: 16px 24px; text-align: center;
    border: 1px solid var(--accent); border-radius: 0.3rem; color: var(--accent); background: transparent;
    font-weight: 600; font-size: 13px; letter-spacing: 0.1em; text-transform: uppercase; text-decoration: none;
    transition: background 0.2s ease, color 0.2s ease;
}
.next a:hover { background: var(--accent); color: #fff; }
.next a:focus-visible { outline: 2px solid #fff; outline-offset: 4px; }

.stats { background: var(--accent); }
.stats .in {
    max-width: 1120px; margin: 0 auto; padding: 44px 32px;
    display: grid; grid-template-columns: repeat(3, 1fr); text-align: center;
}
.stats b { display: block; font-family: var(--serif); font-weight: 300; font-size: 48px; line-height: 1; color: #fff; }
.stats span { display: block; margin-top: 10px; font-size: 11px; font-weight: 500; letter-spacing: 0.18em; text-transform: uppercase; color: rgba(255,255,255,0.82); }

.footer { padding: 44px 24px 52px; background: var(--bg-deep); border-top: 1px solid var(--line); text-align: center; font-size: 13px; color: var(--ink); letter-spacing: 0.04em; }
.footer a { color: var(--accent); text-decoration: none; }
.footer a:hover { text-decoration: underline; }

@media (prefers-reduced-motion: no-preference) {
    .rise { animation: rise 0.8s cubic-bezier(.2,.7,.2,1) both; }
    .d1 { animation-delay: 0.08s; } .d2 { animation-delay: 0.18s; } .d3 { animation-delay: 0.3s; } .d4 { animation-delay: 0.42s; }
    .cta.rise { animation: rise 0.8s cubic-bezier(.2,.7,.2,1) both, glow 2.8s ease-in-out 1.2s infinite; }
}
@keyframes rise { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: none; } }
@media (prefers-reduced-motion: reduce) {
    .hero-bg, .cta { animation: none; }
}

@media (max-width: 860px) {
    .bar { padding: 18px 20px; }
    .hero { padding: 104px 20px 48px; }
    h1 { font-size: 40px; }
    .sub { font-size: 16px; }
    .eyebrow { font-size: 11px; letter-spacing: 0.18em; }
    .cta { font-size: 14px; padding: 19px 26px; letter-spacing: 0.1em; }
    .avatar-stack .av { width: 44px; height: 44px; margin-left: -12px; }
    .preview { max-width: 280px; }
    .next-wrap { padding: 0 20px 72px; }
    .next { padding: 28px 20px; }
    .next p { font-size: 16px; }
    .next a { font-size: 12px; letter-spacing: 0.06em; padding: 15px 14px; }
    .stats .in { grid-template-columns: 1fr; gap: 28px; padding: 40px 20px; }
    .stats b { font-size: 42px; }
}` + goldPdfCss;

const avatars = [1, 2, 3, 4, 5, 6]
  .map((n) => `<span class="av" style="background-image:url('/images/students/medellin-${n}.jpg')"></span>`)
  .join("\n            ");

const bodyHtml = `<header class="bar">
    <img src="/waitlist/assets/logo-alegria-white-59.47b95d50.webp" srcset="/waitlist/assets/logo-alegria-white-59.47b95d50.webp 1x, /waitlist/assets/logo-alegria-white-118.2fd43538.webp 2x" width="59" height="60" alt="Alegría">
    <span>Víctor Álvarez Alegría</span>
</header>

<section class="hero">
    <div class="hero-bg" aria-hidden="true"></div>
    <div class="eyebrow rise d1">You're in</div>
    <h1 class="rise d2">Here is your 1% Audition Guide</h1>
    <div class="rule rise d3"></div>
    <p class="sub rise d3">Tap the button to download it. Save it, print it, and start your countdown.</p>
    <a class="cta rise d4" href="/downloads/the-1-percent-audition-guide.pdf" download="The 1% Audition Guide.pdf">Download the guide</a>
    <div class="cta-social rise d4">
        <div class="avatar-stack" aria-hidden="true">
            ${avatars}
        </div>
        <div class="stars" role="img" aria-label="5 out of 5 stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
        <p class="proof-line">100+ online students worldwide</p>
    </div>
    <span class="open rise d4">Button not working? <a href="/downloads/the-1-percent-audition-guide.pdf" target="_blank" rel="noopener">Open the PDF here</a>.</span>
</section>

<div class="preview-wrap-o"><div class="preview-wrap">
    <div class="preview">
        ${goldPdfHtml}
    </div>
</div></div>

<div class="next-wrap">
    <div class="next">
        <p>Want the whole system behind the guide? Victor walks through it in a free masterclass.</p>
        <a href="/watch">Watch The 1% Method Masterclass &rarr;</a>
    </div>
</div>

<section class="stats" aria-label="Victor Alegria in numbers">
    <div class="in">
        <div><b>19+</b><span>Years of experience</span></div>
        <div><b>30+</b><span>Countries performed</span></div>
        <div><b>100+</b><span>Online students worldwide</span></div>
    </div>
</section>

<div class="footer">&copy;2026 Victor Alegria Music &middot; <a href="/privacy">Privacy Policy</a></div>`;

export default function Page() {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Caveat:wght@600&display=swap" rel="stylesheet" />
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <div dangerouslySetInnerHTML={{ __html: bodyHtml }} />
    </>
  );
}
