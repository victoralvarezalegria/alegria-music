import type { Metadata } from "next";

// Lead magnet sign-up (2026-10-18). One email field, then /guide/download.
// Contact goes to AC list "Lead Magnet" + tag "Lead Magnet" via /api/lead-magnet,
// which feeds Victor's nurture sequences. Same palette and type as /watch.
// Headline, subhead and section names are copied verbatim from the PDF itself.

export const metadata: Metadata = {
  title: "The 1% Audition Guide. Victor Alegria",
  description: "Free guide for serious brass players: the system that took Victor Alegria from 19 lost auditions to winning orchestra positions.",
};

const css = `:root {
    --bg: #1A1D24;
    --bg-raised: #212530;
    --ink: #E8E8E8;
    --muted: #8A8F9A;
    --accent: #FF6B35;
    --accent-dark: #E85A26;
    --hairline: rgba(232, 232, 232, 0.12);
}
* { margin: 0; padding: 0; box-sizing: border-box; }
body {
    font-family: "Space Grotesk", Helvetica, Arial, sans-serif;
    background: var(--bg); color: var(--ink);
}
.topbar { height: 4px; background: var(--accent); }

.hero { max-width: 760px; margin: 0 auto; padding: 52px 24px 0; text-align: center; }
.eyebrow {
    color: var(--accent); font-weight: 500; font-size: 13px; letter-spacing: 0.18em;
    text-transform: uppercase; margin-bottom: 18px;
}
h1 {
    font-family: "Cormorant Garamond", Georgia, serif;
    font-weight: 600; font-size: 64px; line-height: 1.05; color: #fff; letter-spacing: -0.5px;
}
.sub {
    font-family: "Cormorant Garamond", Georgia, serif;
    font-style: italic; font-size: 28px; line-height: 1.3; color: var(--ink);
    margin: 14px auto 0; max-width: 36ch;
}

.card {
    max-width: 520px; margin: 36px auto 0; padding: 30px 30px 24px;
    background: var(--bg-raised); border: 1px solid var(--hairline); border-radius: 8px;
    box-shadow: 0 30px 80px rgba(0,0,0,0.45); text-align: left;
}
.card label {
    display: block; font-size: 13px; font-weight: 500; letter-spacing: 0.12em;
    text-transform: uppercase; color: var(--muted); margin-bottom: 10px;
}
.card input[type=email] {
    width: 100%; padding: 16px; font-size: 17px; font-family: inherit;
    border: 1px solid var(--hairline); border-radius: 5px;
    background: #12151b; color: var(--ink);
}
.card input::placeholder { color: var(--muted); }
.card input:focus { outline: none; border-color: var(--accent); }
.card button {
    width: 100%; margin-top: 14px; padding: 18px; border: none; border-radius: 5px; cursor: pointer;
    background: var(--accent); color: #fff; font-weight: 700; font-size: 17px; font-family: inherit;
    letter-spacing: 0.06em; text-transform: uppercase;
    box-shadow: 0 10px 24px rgba(255, 107, 53, 0.28);
    transition: background 0.15s ease;
}
.card button:hover { background: var(--accent-dark); }
.card button:disabled { opacity: 0.7; cursor: default; }
.fine { font-size: 12px; color: var(--muted); margin-top: 12px; text-align: center; }
.formmsg { display: none; font-weight: 500; color: var(--accent); margin-top: 12px; font-size: 14px; text-align: center; }

.inside {
    max-width: 1000px; margin: 72px auto 0; padding: 0 24px;
    display: flex; gap: 48px; align-items: center;
}
.inside .preview { flex: 0 0 46%; }
.inside .preview img {
    width: 100%; display: block; border-radius: 4px;
    box-shadow: 0 24px 60px rgba(0,0,0,0.55);
    -webkit-mask-image: linear-gradient(to bottom, #000 78%, transparent);
    mask-image: linear-gradient(to bottom, #000 78%, transparent);
}
.inside .list { flex: 1; }
.inside h2 {
    color: var(--accent); font-weight: 500; font-size: 13px; letter-spacing: 0.18em;
    text-transform: uppercase; margin-bottom: 22px;
}
.inside ol { list-style: none; }
.inside li {
    font-size: 17px; line-height: 1.45; padding: 11px 0; border-bottom: 1px solid var(--hairline);
    display: flex; gap: 14px; color: var(--ink);
}
.inside li span { color: var(--accent); font-weight: 700; font-size: 13px; padding-top: 3px; min-width: 20px; }

.footer {
    margin-top: 80px; padding: 30px 24px 40px; background: var(--bg-raised);
    border-top: 1px solid var(--hairline); text-align: center;
}
.footer .copy { font-weight: 500; font-size: 14px; margin-bottom: 10px; }
.footer a { color: var(--accent); text-decoration: none; font-size: 13px; }

@media (max-width: 860px) {
    .hero { padding-top: 36px; }
    h1 { font-size: 42px; }
    .sub { font-size: 22px; }
    .eyebrow { font-size: 11px; letter-spacing: 0.16em; }
    .card { padding: 24px 20px 20px; margin-top: 28px; }
    .inside { flex-direction: column; gap: 32px; margin-top: 56px; }
    .inside .preview { flex: none; width: 100%; }
}`;

const bodyHtml = `<div class="topbar"></div>

<div class="hero">
    <div class="eyebrow">Free guide for serious brass players</div>
    <h1>The 1% Audition Guide</h1>
    <p class="sub">The system that took me from 19 lost auditions to winning orchestra positions.</p>

    <div class="card">
        <form id="lmForm" novalidate>
            <label for="lm-email">Email to send the stuff to</label>
            <input id="lm-email" type="email" name="email" placeholder="you@example.com" autocomplete="email" required>
            <input id="lf-vid" name="vid" type="hidden" value="">
            <button type="submit">Get the guide</button>
        </form>
        <div class="formmsg" id="formMsg" role="alert"></div>
        <p class="fine">Free. No spam, ever. Unsubscribe any time.</p>
    </div>
</div>

<div class="inside">
    <div class="preview">
        <img src="/downloads/audition-guide-preview.jpg" alt="First page of The 1% Audition Guide by Victor Alegria" width="900" height="789">
    </div>
    <div class="list">
        <h2>What is inside</h2>
        <ol>
            <li><span>01</span>Start months before, not weeks</li>
            <li><span>02</span>One audition round a day: your non-negotiable</li>
            <li><span>03</span>Practise more without the instrument</li>
            <li><span>04</span>Record yourself, a lot</li>
            <li><span>05</span>Perform, don't just practise</li>
            <li><span>06</span>Visualise the whole audition, every day</li>
            <li><span>07</span>Win it before the first note</li>
            <li><span>08</span>On the day: arrive fresh</li>
            <li><span>09</span>Your countdown</li>
        </ol>
    </div>
</div>

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
        body: JSON.stringify({ email: email, vid: vid, eventId: eventId })
    })
    .then(function (r) { return r.json().catch(function () { return {}; }); })
    .then(function (data) {
        if (data && data.ok) { window.location.href = '/guide/download'; return; }
        fail(data && data.error === 'invalid_email'
            ? 'That email does not look right. Try again?'
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
      <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&display=swap" rel="stylesheet" />
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <div dangerouslySetInnerHTML={{ __html: bodyHtml }} />
      <script id="guide-form" dangerouslySetInnerHTML={{ __html: bodyScript }} />
    </>
  );
}
