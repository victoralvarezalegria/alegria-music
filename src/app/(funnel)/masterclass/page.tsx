import type { Metadata } from "next";

// Ported verbatim from victor-site-handoff/funnel/masterclass.html.
// Copy, layout, styles and scripts are unchanged. Only the internal links were
// made absolute ("masterclass.html" -> "/masterclass") so they resolve as app
// routes instead of files.

export const metadata: Metadata = {
  title: "Masterclass Viewing Room",
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
.wrap { max-width: 1060px; margin: 0 auto; padding: 0 24px; text-align: center; }

.hero { padding: 56px 0 0; }
h1 { font-family: var(--serif); font-weight: 600; font-size: 56px; line-height: 1.08; color: #fff; letter-spacing: -0.5px; max-width: 18ch; margin: 0 auto; }

.video { position: relative; width: 100%; max-width: 920px; margin: 36px auto 0; aspect-ratio: 16/9; background: var(--bg-raised); border: 1px solid var(--hairline); border-radius: 8px; overflow: hidden; }
.video iframe { position: absolute; inset: 0; width: 100%; height: 100%; border: 0; }
.video .ph { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 14px; background: radial-gradient(120% 140% at 50% 0%, #262b38 0%, #1c2029 60%, #171a21 100%); }
.play { width: 74px; height: 74px; border-radius: 100%; border: 2px solid rgba(255,255,255,0.28); background: rgba(255,255,255,0.05); display: flex; align-items: center; justify-content: center; }
.play::after { content: ""; width: 0; height: 0; margin-left: 6px; border-top: 13px solid transparent; border-bottom: 13px solid transparent; border-left: 21px solid #fff; }
.ph-label { font-size: 12px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--muted); }

.cta { display: inline-block; margin: 40px auto 0; padding: 20px 44px; background: var(--accent); color: #fff; font-weight: 700; font-size: 18px; text-decoration: none; border-radius: 5px; letter-spacing: 0.06em; text-transform: uppercase; box-shadow: 0 12px 30px rgba(255,107,53,0.28); transition: background .15s ease, transform .15s ease; }
.cta:hover { background: var(--accent-dark); transform: translateY(-2px); }

.footer { margin-top: 96px; padding: 34px 24px 44px; background: var(--bg-raised); border-top: 1px solid var(--hairline); text-align: center; }
.footer .copy { font-weight: 500; font-size: 14px; margin-bottom: 12px; color: var(--ink); }
.disclaimer { max-width: 860px; margin: 0 auto; font-size: 12px; color: var(--muted); line-height: 1.6; }
.disclaimer p { margin-bottom: 8px; }

@media (max-width: 860px) {
    .hero { padding-top: 40px; }
    h1 { font-size: 38px; }
    .cta { font-size: 16px; padding: 18px 32px; }
}`;

const bodyHtml = `<div class="topbar"></div>

<div class="wrap">

    <header class="hero">
        <h1>Masterclass Viewing Room</h1>
    </header>

    <div class="video" id="videoBox">
        <div class="ph"><div class="play"></div><div class="ph-label">Replay is being uploaded</div></div>
    </div>

    <a class="cta" href="/apply" data-t="masterclass-apply">Book Your 1% Method Strategy Session</a>

</div>

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
var VIDEO_EMBED = "https://www.loom.com/embed/bb11bed9669d4556bceed6e7cb2c59e0";
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
      <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&display=swap" rel="stylesheet" />
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
