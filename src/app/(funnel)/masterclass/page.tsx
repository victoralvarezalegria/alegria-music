import type { Metadata } from "next";

// Viewing room, rebuilt 2026-10-24 on the approved /watch design system.
// Copy, the Loom embed script and the registration-conversion script are unchanged.

export const metadata: Metadata = {
  title: "Masterclass Viewing Room",
  robots: { index: false, follow: false },
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

.hero { position: relative; isolation: isolate; overflow: hidden; padding: 132px 24px 56px; text-align: center; }
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

.stage { padding: 0 24px; text-align: center; }
.video {
    position: relative; width: 100%; max-width: 1000px; margin: 0 auto; aspect-ratio: 16/9;
    background: var(--card); border: 1px solid var(--line); border-radius: 18px; overflow: hidden;
    box-shadow: 0 30px 70px -30px rgba(0,0,0,0.8), 0 0 90px -10px rgba(255,107,53,0.28), 0 0 0 1px rgba(255,107,53,0.08);
}
.video iframe { position: absolute; inset: 0; width: 100%; height: 100%; border: 0; }
.video .ph { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 14px; background: radial-gradient(120% 140% at 50% 0%, #262b38 0%, #1c2029 60%, #171a21 100%); }
.play { width: 74px; height: 74px; border-radius: 100%; border: 2px solid rgba(255,255,255,0.28); background: rgba(255,255,255,0.05); display: flex; align-items: center; justify-content: center; }
.play::after { content: ""; width: 0; height: 0; margin-left: 6px; border-top: 13px solid transparent; border-bottom: 13px solid transparent; border-left: 21px solid #fff; }
.ph-label { font-size: 12px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--muted); }

.close-cta { text-align: center; padding: 56px 24px 96px; }
.cta {
    position: relative; display: inline-flex; align-items: center; justify-content: center;
    padding: 21px 42px; min-height: 60px;
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

.stats { background: var(--accent); }
.stats .in {
    max-width: 1120px; margin: 0 auto; padding: 44px 32px;
    display: grid; grid-template-columns: repeat(3, 1fr); text-align: center;
}
.stats b { display: block; font-family: var(--serif); font-weight: 300; font-size: 48px; line-height: 1; color: #fff; }
.stats span { display: block; margin-top: 10px; font-size: 11px; font-weight: 500; letter-spacing: 0.18em; text-transform: uppercase; color: rgba(255,255,255,0.82); }

.footer { padding: 44px 24px 52px; background: var(--bg-deep); border-top: 1px solid var(--line); text-align: center; }
.footer .copy { font-size: 13px; color: var(--ink); margin-bottom: 12px; letter-spacing: 0.04em; }
.disclaimer { max-width: 860px; margin: 0 auto; font-size: 11px; color: var(--muted); line-height: 1.7; }
.disclaimer p { margin-bottom: 8px; }

@media (prefers-reduced-motion: no-preference) {
    .rise { animation: rise 0.8s cubic-bezier(.2,.7,.2,1) both; }
    .d1 { animation-delay: 0.08s; } .d2 { animation-delay: 0.18s; } .d3 { animation-delay: 0.3s; }
}
@keyframes rise { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: none; } }
@media (prefers-reduced-motion: reduce) { .hero-bg, .cta { animation: none; } }

@media (max-width: 860px) {
    .bar { padding: 18px 20px; }
    .hero { padding: 104px 20px 40px; }
    h1 { font-size: 40px; }
    .stage { padding: 0 16px; }
    .video { border-radius: 12px; }
    .close-cta { padding: 44px 20px 72px; }
    .cta { font-size: 14px; padding: 19px 26px; letter-spacing: 0.1em; }
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
    <h1 class="rise d1">Masterclass Viewing Room</h1>
    <div class="rule rise d2"></div>
</section>

<div class="stage">
    <div class="video rise d3" id="videoBox">
        <div class="ph"><div class="play"></div><div class="ph-label">Replay is being uploaded</div></div>
    </div>
</div>

<section class="close-cta">
    <a class="cta" href="/apply" data-t="masterclass-apply">Book Your 1% Method Strategy Session</a>
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
        <div><b>19+</b><span>Years of experience</span></div>
        <div><b>30+</b><span>Countries performed</span></div>
        <div><b>100+</b><span>Online students worldwide</span></div>
    </div>
</section>

<div class="footer">
    <div class="copy">&copy;2026 Victor Alegria Music</div>
    <div class="disclaimer">
        <p>This site is not a part of the Facebook website or Facebook Inc. Additionally, this site is NOT endorsed by Facebook in any way. FACEBOOK is a trademark of FACEBOOK, Inc.</p>
        <p>NOT GOOGLE: This site is not a part of the Google website or Google Inc. Additionally, this site is NOT endorsed by Google in any way.</p>
    </div>
</div>`;

const bodyScript0 = `
/* Set VIDEO_EMBED to the replay embed URL to activate the player, e.g.
   "https://www.youtube.com/embed/XXXXXXXXXXX?rel=0&modestbranding=1"
   or "https://player.vimeo.com/video/000000000". Empty string keeps the
   uploading placeholder (same convention as booked.html). */
var VIDEO_EMBED = "https://www.loom.com/embed/e188a3cb1e7241b192275975b62aad83?hide_owner=true&hide_share=true&hide_title=true&hideEmbedTopBar=true";
if (VIDEO_EMBED) {
    var box = document.getElementById('videoBox');
    var f = document.createElement('iframe');
    f.src = VIDEO_EMBED;
    f.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
    f.allowFullscreen = true;
    f.title = "Masterclass replay";
    box.innerHTML = "";
    box.appendChild(f);
}
`;

const registeredScript = `
/* Registration conversion. Written SERVER-side by /api/t/registered, not by a
   browser event, because "reached the viewing room after the form" is the
   number an ad set gets optimised against and it must not depend on a fetch
   finishing on a flaky phone. Fires once per opt-in: only when the sign-up
   form on this visit parked va_lead in sessionStorage (so a returning lead
   opening a replay link from an email is not counted as a new registration),
   and never twice for the same lead. The email rides along from the form; if
   it is missing, the server finds the person from the visitor id instead. */
(function () {
    var lead = null;
    try { lead = JSON.parse(sessionStorage.getItem('va_lead') || 'null'); } catch (e) {}
    if (!lead || !lead.email) return;
    var done = '';
    try { done = sessionStorage.getItem('va_reg_done') || ''; } catch (e) {}
    if (done === lead.email) return;
    try { sessionStorage.setItem('va_reg_done', lead.email); } catch (e) {}
    var eventId = '';
    try { eventId = (crypto && crypto.randomUUID) ? crypto.randomUUID() : ''; } catch (e) {}
    var vid = lead.vid || '';
    if (!vid) { try { vid = localStorage.getItem('tv') || ''; } catch (e) {} }

    function post(v) {
        try {
            fetch('/api/t/registered', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    vid: v || vid || null,
                    email: lead.email || null,
                    firstName: lead.firstName || null,
                    eventId: eventId || null
                }),
                keepalive: true
            }).catch(function () {});
        } catch (e) {}
    }

    if (window.__t && window.__t.vid) window.__t.vid().then(post, function () { post(''); });
    else setTimeout(function () { post(''); }, 600);
})();
`;

export default function Page() {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&display=swap" rel="stylesheet" />
      <style dangerouslySetInnerHTML={{ __html: css }} />

      <div dangerouslySetInnerHTML={{ __html: bodyHtml }} />
      <script
        id="body-0"
        dangerouslySetInnerHTML={{ __html: bodyScript0 }}
      />
      <script
        id="body-registered"
        dangerouslySetInnerHTML={{ __html: registeredScript }}
      />
    </>
  );
}
