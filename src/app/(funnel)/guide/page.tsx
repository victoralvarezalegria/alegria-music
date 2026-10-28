import type { Metadata } from "next";
import { goldPdfCss, goldPdfHtml } from "@/components/guideGoldPdf";

// Lead magnet sign-up (2026-10-18). One email field, then /guide/download.
// Contact goes to AC list "Lead Magnet" + tag "Lead Magnet" via /api/lead-magnet,
// which feeds Victor's nurture sequences. Redesigned 2026-10-24 on the same design system as /watch.
// Headline, subhead and section names are copied verbatim from the PDF itself.

export const metadata: Metadata = {
  title: "The 1% Audition Guide. Victor Alegria",
  description: "Free guide for serious brass players: the system that took Victor Alegria from 19 lost auditions to winning orchestra positions.",
};

const css = `:root {
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

.bar {
    position: absolute; top: 0; left: 0; right: 0; z-index: 3;
    display: flex; align-items: center; gap: 12px;
    max-width: 1200px; margin: 0 auto; padding: 22px 32px;
}
.bar img { width: 26px; height: auto; }
.bar span { font-size: 12px; font-weight: 500; letter-spacing: 0.16em; text-transform: uppercase; color: var(--ink); }

.hero { position: relative; isolation: isolate; overflow: hidden; padding: 132px 24px 80px; text-align: center; }
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
.eyebrow { color: var(--accent); font-weight: 500; font-size: 12px; letter-spacing: 0.22em; text-transform: uppercase; margin-bottom: 26px; }
h1 {
    font-family: var(--serif); font-weight: 300; font-size: 64px; line-height: 1.06;
    letter-spacing: -0.01em; color: #fff; max-width: 980px; margin: 0 auto; text-wrap: balance;
}
.sub {
    font-family: var(--serif); font-style: italic; font-weight: 300; font-size: 30px; line-height: 1.3;
    color: var(--ink); margin: 16px auto 0; max-width: 36ch; text-wrap: balance;
}
.rule { width: 48px; height: 1px; background: var(--accent); margin: 30px auto 0; }

.hero-grid {
    max-width: 1020px; margin: 48px auto 0; display: grid; grid-template-columns: 1fr 1fr;
    gap: 56px; align-items: center; text-align: left;
}
.hero-grid > * { min-width: 0; }

.card {
    background: var(--raised); border: 1px solid var(--line); border-top: 2px solid var(--accent);
    border-radius: 0.3rem; padding: 36px 34px 28px;
    box-shadow: 0 40px 90px -20px rgba(0,0,0,0.75);
}
.card label {
    display: block; font-size: 12px; font-weight: 500; letter-spacing: 0.18em;
    text-transform: uppercase; color: var(--muted); margin-bottom: 10px;
}
.card .lbl2 { margin-top: 18px; }
.card input[type=email], .card input[type=text] {
    width: 100%; padding: 15px 16px; font-size: 16px; font-family: inherit;
    border: 1px solid var(--line); border-radius: 0.3rem;
    background: var(--card); color: var(--ink);
}
.card input::placeholder { color: var(--muted); }
.card input:focus { outline: none; border-color: var(--accent); }

.cta {
    position: relative; display: inline-flex; align-items: center; justify-content: center;
    margin-top: 26px; padding: 21px 42px; min-height: 60px; width: 100%;
    background: var(--accent); color: #fff; text-decoration: none; border: none; cursor: pointer;
    font-family: var(--sans); font-weight: 600; font-size: 15px; letter-spacing: 0.12em; text-transform: uppercase;
    border-radius: 0.3rem;
    box-shadow: 0 0 0 0 rgba(255,107,53,0.45), 0 18px 40px -14px rgba(255,107,53,0.7);
    transition: background 0.2s ease, transform 0.2s ease;
    animation: glow 2.8s ease-in-out infinite;
}
.cta:hover { background: var(--accent-dark); transform: translateY(-2px); }
.cta:active { transform: translateY(1px); }
.cta:focus-visible { outline: 2px solid #fff; outline-offset: 4px; }
.cta:disabled { opacity: 0.7; cursor: default; animation: none; transform: none; }
@keyframes glow {
    0%, 100% { box-shadow: 0 0 0 0 rgba(255,107,53,0.40), 0 18px 40px -14px rgba(255,107,53,0.7); }
    50% { box-shadow: 0 0 0 10px rgba(255,107,53,0), 0 18px 48px -12px rgba(255,107,53,0.9); }
}

.cta-social { display: flex; flex-direction: column; align-items: center; gap: 10px; margin-top: 24px; }
.avatar-stack { display: flex; align-items: center; justify-content: center; }
.avatar-stack .av {
    width: 52px; height: 52px; border-radius: 50%; margin-left: -14px; flex: 0 0 auto;
    border: 3px solid var(--raised); box-shadow: 0 0 0 2px rgba(255,255,255,0.45);
    background: var(--card) center / cover no-repeat;
}
.avatar-stack .av:first-child { margin-left: 0; }
.stars { color: var(--accent); font-size: 18px; letter-spacing: 3px; line-height: 1; }
.proof-line { font-size: 14px; font-weight: 500; color: var(--ink); letter-spacing: 0.02em; }
.fine { font-size: 12px; color: var(--muted); margin-top: 18px; text-align: center; }
.formmsg { display: none; font-weight: 500; color: var(--accent); margin-top: 12px; font-size: 14px; text-align: center; }

.from { max-width: 1000px; margin: 0 auto; padding: 96px 32px 0; display: grid; grid-template-columns: 340px 1fr; gap: 72px; align-items: center; }
.from > * { min-width: 0; }
.print {
    background: #fdfcfa; padding: 12px 12px 0; border-radius: 3px; width: 100%;
    box-shadow: 0 1px 2px rgba(0,0,0,0.25), 0 30px 60px -24px rgba(0,0,0,0.8);
    transform: rotate(-3deg);
}
.print img { width: 100%; height: auto; aspect-ratio: 3 / 4; object-fit: cover; object-position: 50% 30%; }
.print figcaption {
    font-family: "Caveat", "Bradley Hand", cursive; font-weight: 600; font-size: 21px; color: #2a2b30;
    text-align: center; padding: 10px 8px 14px; line-height: 1.2;
}
.lead { font-weight: 500; font-size: 12px; letter-spacing: 0.22em; text-transform: uppercase; color: var(--accent); }
.from .lead { margin-bottom: 22px; }
.from blockquote {
    font-family: var(--serif); font-style: italic; font-weight: 300; font-size: 40px; line-height: 1.2; color: #fff;
    margin-bottom: 26px; text-wrap: balance;
}
.from p.story { font-size: 17px; line-height: 1.75; color: #b9bdc6; }
.from p.story b { color: #fff; font-weight: 600; }
.from .creds { margin-top: 20px; font-size: 13px; color: var(--muted); line-height: 1.6; letter-spacing: 0.02em; }

.inside { max-width: 1000px; margin: 0 auto; padding: 104px 32px 0; }
.inside .list > .lead { text-align: center; }
.inside .list > .rule { margin: 18px auto 52px; }
.inside ol { list-style: none; display: grid; grid-template-columns: 1fr 1fr; gap: 0 64px; }
.learn-row { display: grid; grid-template-columns: 72px 1fr; gap: 18px; align-items: baseline; padding: 24px 0; border-bottom: 1px solid var(--line); }
.learn-num { font-family: var(--serif); font-weight: 300; font-size: 48px; line-height: 1; color: var(--accent); }
.benefit { font-family: var(--serif); font-weight: 400; font-style: italic; font-size: 28px; line-height: 1.2; color: #fff; }

.stats { background: var(--accent); margin-top: 104px; }
.stats .in { max-width: 1120px; margin: 0 auto; padding: 44px 32px; display: grid; grid-template-columns: repeat(3, 1fr); text-align: center; }
.stats b { display: block; font-family: var(--serif); font-weight: 300; font-size: 48px; line-height: 1; color: #fff; }
.stats span { display: block; margin-top: 10px; font-size: 11px; font-weight: 500; letter-spacing: 0.18em; text-transform: uppercase; color: rgba(255,255,255,0.82); }

.footer { padding: 44px 24px 52px; background: var(--bg-deep); border-top: 1px solid var(--line); text-align: center; }
.footer .copy { font-size: 13px; color: var(--ink); margin-bottom: 12px; letter-spacing: 0.04em; }
.footer a { color: var(--accent); text-decoration: none; font-size: 12px; letter-spacing: 0.08em; text-transform: uppercase; }
.footer a:hover { text-decoration: underline; }

@media (prefers-reduced-motion: no-preference) {
    .rise { animation: rise 0.8s cubic-bezier(.2,.7,.2,1) both; }
    .d1 { animation-delay: 0.08s; } .d2 { animation-delay: 0.18s; } .d3 { animation-delay: 0.3s; } .d4 { animation-delay: 0.42s; }
}
@keyframes rise { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: none; } }
@media (prefers-reduced-motion: reduce) { .hero-bg, .cta { animation: none; } }

@media (max-width: 860px) {
    .bar { padding: 18px 20px; }
    .hero { padding: 104px 20px 56px; }
    h1 { font-size: 40px; }
    .sub { font-size: 24px; }
    .eyebrow { font-size: 11px; letter-spacing: 0.18em; }
    .hero-grid { grid-template-columns: 1fr; gap: 28px; margin-top: 32px; }
    .hero-grid .gold-stage { max-width: 280px; }
    .card { padding: 28px 22px 24px; }
    .cta { font-size: 14px; padding: 19px 26px; letter-spacing: 0.1em; }
    .avatar-stack .av { width: 44px; height: 44px; margin-left: -12px; }
    .from { grid-template-columns: 1fr; gap: 40px; padding: 64px 20px 0; }
    .print { max-width: 260px; margin: 0 auto; }
    .from blockquote { font-size: 30px; }
    .inside { padding: 72px 20px 0; }
    .inside ol { grid-template-columns: 1fr; }
    .learn-num { font-size: 40px; }
    .benefit { font-size: 24px; }
    .stats { margin-top: 72px; }
    .stats .in { grid-template-columns: 1fr; gap: 28px; padding: 40px 20px; }
    .stats b { font-size: 42px; }
}` + goldPdfCss;

const bodyHtml = `<header class="bar">
    <img src="/waitlist/assets/logo-alegria-white-59.47b95d50.webp" srcset="/waitlist/assets/logo-alegria-white-59.47b95d50.webp 1x, /waitlist/assets/logo-alegria-white-118.2fd43538.webp 2x" width="59" height="60" alt="Alegría">
    <span>Víctor Álvarez Alegría</span>
</header>

<section class="hero">
    <div class="hero-bg" aria-hidden="true"></div>
    <div class="eyebrow rise d1">Free guide for serious brass players</div>
    <h1 class="rise d2">The 1% Audition Guide</h1>
    <p class="sub rise d3">The system that took me from 19 lost auditions to winning orchestra positions.</p>
    <div class="rule rise d3"></div>

    <div class="hero-grid rise d4">
        <div class="hero-art">${goldPdfHtml}</div>
        <div class="card">
            <form id="lmForm" novalidate>
                <label for="lm-name">Your first name</label>
                <input id="lm-name" type="text" name="firstname" placeholder="First name" autocomplete="given-name" maxlength="80" required>
                <label for="lm-email" class="lbl2">Email to send the stuff to</label>
                <input id="lm-email" type="email" name="email" placeholder="you@example.com" autocomplete="email" required>
                <input id="lf-vid" name="vid" type="hidden" value="">
                <button type="submit" class="cta">Get the guide</button>
            </form>
            <div class="formmsg" id="formMsg" role="alert"></div>
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
            <p class="fine">Free. No spam, ever. Unsubscribe any time.</p>
        </div>
    </div>
</section>

<div class="from">
    <figure class="print">
        <img src="/images/guide-victor-helsinki.jpg" alt="Victor Alegria with his trombone on the stage of the Helsinki Music Centre" width="675" height="900" loading="lazy">
        <figcaption>Helsinki Philharmonic</figcaption>
    </figure>
    <div class="words">
        <div class="lead">From Victor</div>
        <blockquote>&ldquo;In every audition I won, I was never the best player in the room. I was the best prepared.&rdquo;</blockquote>
        <p class="story">I lost 19 auditions, many in the final round, while practising more hours than anyone around me. What changed was not my talent or my hours. It was <b>how</b> I prepared. This is the preparation I now use with my students, from conservatory entrance exams to principal positions.</p>
        <div class="creds">V&iacute;ctor &Aacute;lvarez Alegr&iacute;a &middot; Principal Trombone, Helsinki Philharmonic &middot; Karajan Academy, Berlin Philharmonic</div>
    </div>
</div>

<div class="inside">
    <div class="list">
        <div class="lead">What is inside</div>
        <div class="rule"></div>
        <ol>
            <li class="learn-row"><div class="learn-num">01</div><div class="benefit">Start months before, not weeks</div></li>
            <li class="learn-row"><div class="learn-num">02</div><div class="benefit">One audition round a day: your non-negotiable</div></li>
            <li class="learn-row"><div class="learn-num">03</div><div class="benefit">Practise more without the instrument</div></li>
            <li class="learn-row"><div class="learn-num">04</div><div class="benefit">Record yourself, a lot</div></li>
            <li class="learn-row"><div class="learn-num">05</div><div class="benefit">Perform, don't just practise</div></li>
            <li class="learn-row"><div class="learn-num">06</div><div class="benefit">Visualise the whole audition, every day</div></li>
            <li class="learn-row"><div class="learn-num">07</div><div class="benefit">Win it before the first note</div></li>
            <li class="learn-row"><div class="learn-num">08</div><div class="benefit">On the day: arrive fresh</div></li>
            <li class="learn-row"><div class="learn-num">09</div><div class="benefit">Your countdown</div></li>
        </ol>
    </div>
</div>

<section class="stats" aria-label="Victor Alegria in numbers">
    <div class="in">
        <div><b>19+</b><span>Years of experience</span></div>
        <div><b>30+</b><span>Countries performed</span></div>
        <div><b>100+</b><span>Online students worldwide</span></div>
    </div>
</section>

<div class="footer">
    <div class="copy">&copy;2026 Victor Alegria Music</div>
    <a href="/privacy">Privacy Policy</a>
</div>`;

const bodyScript = `
/* Posts to our own serverless function, which holds the ActiveCampaign key.
   The key is NEVER in this file: page source is public to every visitor. */
var form = document.getElementById('lmForm');
var msg = document.getElementById('formMsg');
var btn = form.querySelector('button[type=submit]');

form.addEventListener('submit', function (ev) {
    ev.preventDefault();
    var email = form.email.value.trim();
    var firstName = form.firstname.value.trim();
    if (!firstName) { return fail('Please add your first name.'); }
    if (!/^[^\\s@]+@[^\\s@.]+(\\.[^\\s@.]+)*\\.[A-Za-z]{2,}$/.test(email)) {
        return fail('That email does not look right. Try again?');
    }
    var eventId = '';
    try { eventId = (crypto && crypto.randomUUID) ? crypto.randomUUID() : ''; } catch (_) {}
    var vid = document.getElementById('lf-vid').value || '';
    if (!vid) { try { vid = localStorage.getItem('tv') || ''; } catch (_) {} }

    btn.disabled = true;
    btn.textContent = 'Sending...';
    msg.style.display = 'none';

    fetch('/api/lead-magnet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email, firstName: firstName, vid: vid, eventId: eventId })
    })
    .then(function (r) { return r.json().catch(function () { return {}; }); })
    .then(function (data) {
        if (data && data.ok) { window.location.href = '/guide/download'; return; }
        fail(data && data.error === 'invalid_email'
            ? 'That email does not look right. Try again?'
            : data && data.error === 'missing_name'
            ? 'Please add your first name.'
            : 'Something went wrong. Please try again.');
    })
    .catch(function () { fail('Could not reach the server. Check your connection and try again.'); });

    function fail(text) {
        msg.textContent = text;
        msg.style.display = 'block';
        btn.disabled = false;
        btn.textContent = 'Get the guide';
    }
});

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
      <script id="guide-form" dangerouslySetInnerHTML={{ __html: bodyScript }} />
    </>
  );
}
