import type { Metadata } from "next";

// Ported verbatim from victor-site-handoff/funnel/index.html.
// Copy, layout, styles and scripts are unchanged. Only the internal links were
// made absolute ("masterclass.html" -> "/masterclass") so they resolve as app
// routes instead of files.

export const metadata: Metadata = {
  title: "The 1% Method Masterclass. Victor Alegria",
  description: "A free live masterclass for serious brass players. Unlock the high register, win auditions, end stage fright, without adding a single hour of practice. With Victor Alegria.",
};

const css = `/* Palette measured from alegriamusic.net (2026-08-25), not eyeballed:
   bg #1A1D24 / body #E8E8E8 / muted #8A8F9A / accent #FF6B35.
   Type: Space Grotesk for UI, Cormorant Garamond for display. */
:root {
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

/* === TOP BAR === */
.topbar { height: 4px; background: var(--accent); }

/* === HERO === */
.hero { max-width: 1160px; margin: 0 auto; padding: 44px 24px 10px; text-align: center; }
.eyebrow {
    color: var(--accent); font-weight: 500; font-size: 13px; letter-spacing: 0.18em;
    text-transform: uppercase; margin-bottom: 20px;
}
h1 {
    font-family: "Cormorant Garamond", Georgia, serif;
    font-weight: 600; font-size: 58px; line-height: 1.12; color: #fff;
    letter-spacing: -0.5px;
}
h1 .h1b {
    display: block; font-weight: 400; font-style: italic; font-size: 44px;
    margin-top: 10px; color: var(--ink);
}

/* === CTA BUTTON === */
.cta {
    display: inline-block; margin: 34px auto 8px; padding: 19px 44px;
    background: var(--accent);
    color: #fff; font-weight: 700; font-size: 19px; text-decoration: none;
    border-radius: 5px; letter-spacing: 0.06em; text-transform: uppercase;
    box-shadow: 0 12px 30px rgba(255, 107, 53, 0.28);
    transition: background 0.15s ease, transform 0.15s ease;
}
.cta:hover { background: var(--accent-dark); transform: translateY(-2px); }

/* === TWO COLUMNS === */
.cols {
    max-width: 1160px; margin: 34px auto 0; padding: 0 24px;
    display: flex; gap: 48px; align-items: flex-start; text-align: left;
}
.col-photo { flex: 0 0 44%; }
.col-photo img { width: 100%; border-radius: 4px; display: block; }
.col-copy { flex: 1; }
.col-copy .lead {
    font-weight: 500; font-size: 13px; text-align: center; margin-bottom: 30px;
    color: var(--accent); text-transform: uppercase; letter-spacing: 0.18em;
}
.benefit {
    font-size: 17px; line-height: 1.62; margin-bottom: 24px; color: var(--ink);
    padding-left: 30px; position: relative;
}
.benefit b { font-weight: 700; color: #fff; }
/* Replaces the green emoji tick, which fought the orange accent. */
.chk {
    position: absolute; left: 0; top: 1px;
    color: var(--accent); font-size: 18px; font-weight: 700; line-height: 1.5;
}

.fire {
    font-family: "Cormorant Garamond", Georgia, serif;
    text-align: center; font-weight: 600; font-size: 32px; margin: 38px 0 6px;
    color: #fff;
}
.ctawrap { text-align: center; }
.nocost {
    text-align: center; font-weight: 400; font-size: 14px; margin: 18px 0 0;
    color: var(--muted); letter-spacing: 0.04em;
}

/* === FOOTER === */
.footer {
    margin-top: 72px; padding: 34px 24px 44px; background: var(--bg-raised);
    border-top: 1px solid var(--hairline); text-align: center;
}
.footer .copy { font-weight: 500; font-size: 14px; margin-bottom: 12px; color: var(--ink); }
.footer a { color: var(--accent); text-decoration: none; font-size: 13px; }
.footer a:hover { text-decoration: underline; }
.footer .links { margin-bottom: 18px; }
.footer .links span { color: var(--muted); margin: 0 8px; }
.disclaimer { max-width: 860px; margin: 0 auto; font-size: 12px; color: var(--muted); line-height: 1.6; }
.disclaimer p { margin-bottom: 8px; }

/* === POPUP === */
.overlay {
    position: fixed; inset: 0; background: rgba(0,0,0,0.72);
    display: none; align-items: center; justify-content: center; z-index: 100; padding: 20px;
}
.overlay.open { display: flex; }
.modal {
    background: var(--bg-raised); border: 1px solid var(--hairline);
    border-radius: 8px; max-width: 520px; width: 100%;
    padding: 42px 44px 36px; text-align: center; position: relative;
    box-shadow: 0 30px 80px rgba(0,0,0,0.6);
}
.modal .close {
    position: absolute; top: 10px; right: 16px; font-size: 26px; color: var(--muted);
    background: none; border: none; cursor: pointer; line-height: 1;
}
.modal .close:hover { color: var(--ink); }
.modal h2 {
    font-family: "Cormorant Garamond", Georgia, serif;
    font-weight: 600; font-size: 34px; margin-bottom: 10px; color: #fff;
}
.modal .sub { font-size: 14px; color: var(--muted); line-height: 1.55; margin-bottom: 26px; }
.modal input {
    width: 100%; padding: 15px 16px; margin-bottom: 14px; font-size: 16px;
    border: 1px solid var(--hairline); border-radius: 5px; font-family: inherit;
    background: #12151b; color: var(--ink);
}
.modal input::placeholder { color: var(--muted); }
.modal input:focus { outline: none; border-color: var(--accent); }
.modal button[type=submit] {
    width: 100%; padding: 18px; border: none; border-radius: 5px; cursor: pointer;
    background: var(--accent);
    color: #fff; font-weight: 700; font-size: 17px; font-family: inherit;
    letter-spacing: 0.06em; text-transform: uppercase;
    box-shadow: 0 10px 24px rgba(255, 107, 53, 0.28);
    transition: background 0.15s ease;
}
.modal button[type=submit]:hover { background: var(--accent-dark); }
.modal .fine { font-size: 12px; color: var(--muted); margin-top: 14px; }
.formmsg { display: none; font-weight: 500; color: var(--accent); margin-top: 12px; font-size: 14px; }

/* === MOBILE === */
@media (max-width: 860px) {
    h1 { font-size: 38px; }
    h1 .h1b { font-size: 29px; }
    .eyebrow { font-size: 11px; letter-spacing: 0.16em; }
    .cta { font-size: 16px; padding: 17px 28px; }
    .cols { flex-direction: column; gap: 30px; }
    .col-photo { flex: none; width: 100%; }
    .fire { font-size: 25px; }
    .modal { padding: 34px 26px 28px; }
    .modal h2 { font-size: 28px; }
}`;

const bodyHtml = `<div class="topbar"></div>

<div class="hero">
    <!-- Promise copied VERBATIM from slide 1 of the masterclass deck, so the ad,
         this page, and the webinar's opening slide all make the same promise. -->
    <div class="eyebrow">A Free Live Masterclass For Serious Brass Players</div>
    <h1>
        Unlock the high register. Win auditions. End stage fright.
        <span class="h1b">Without adding a single hour of practice.</span>
    </h1>
    <a class="cta" href="#open-popup">YES! Save My Free Seat Now!</a>
</div>

<div class="cols">
    <div class="col-photo">
        <img src="/victor.jpg" alt="Victor Alegria, Principal Trombone of the Helsinki Philharmonic, with his trombone">
    </div>
    <div class="col-copy">
        <div class="lead">EXCLUSIVE LIVE TRAINING WITH VICTOR ALEGRIA:</div>

        <div class="benefit"><span class="chk" aria-hidden="true">&#10003;</span><b>Unlock Your High Register:</b> The air and lip-corner system that expands your range without pressure, forcing, or wrecked chops.</div>

        <div class="benefit"><span class="chk" aria-hidden="true">&#10003;</span><b>Play With Real Confidence:</b> Why stage fright is not a stage problem, and the off-stage habits that end it for good.</div>

        <div class="benefit"><span class="chk" aria-hidden="true">&#10003;</span><b>Win When It Counts:</b> The exact preparation system Victor used to win Principal Trombone of the Helsinki Philharmonic and the Macao Orchestra.</div>

        <div class="benefit"><span class="chk" aria-hidden="true">&#10003;</span><b>Practice Less, Progress More:</b> The 40/60 rule that gets you further in 60 to 90 focused minutes than 4 hours of grinding ever will.</div>

        <div class="fire">&#128293; One live session. When it's full, it's full! &#128293;</div>

        <div class="ctawrap">
            <a class="cta" href="#open-popup">YES! Save My Free Seat Now!</a>
            <div class="nocost">100% Free. Seating is limited to 100 attendees!</div>
        </div>
    </div>
</div>

<div class="footer">
    <div class="copy">&copy;2026 Victor Alegria Music</div>
    <div class="links">
        <a href="#">Privacy Policy</a><span>|</span><a href="#">Terms and Conditions</a>
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
            <button type="submit">SAVE MY SEAT!</button>
        </form>
        <div class="formmsg" id="formMsg">Registration opens very soon. Come back in a few days to grab your seat.</div>
        <p class="fine">We'll email you the link and a reminder. No spam, ever.</p>
    </div>
</div>`;

const bodyScript0 = `
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

    submitBtn.disabled = true;
    submitBtn.textContent = 'SAVING YOUR SEAT...';
    msg.style.display = 'none';

    fetch(REGISTRATION_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email, firstName: firstName })
    })
    .then(function (r) { return r.json().catch(function () { return {}; }); })
    .then(function (data) {
        if (data && data.ok) {
            window.location.href = THANK_YOU_PAGE;
            return;
        }
        fail(data && data.error === 'invalid_email'
            ? 'That email does not look right. Try again?'
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
    </>
  );
}
