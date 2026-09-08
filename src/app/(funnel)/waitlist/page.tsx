import type { Metadata } from "next";

// Ported verbatim from victor-site-handoff/funnel/waitlist.html.
// Copy, layout, styles and scripts are unchanged. Only the internal links were
// made absolute ("masterclass.html" -> "/masterclass") so they resolve as app
// routes instead of files.

export const metadata: Metadata = {
  title: "Join the Waitlist",
  robots: { index: false, follow: false },
};

const css = `/* Same tokens as index.html / registered.html (measured from alegriamusic.net). */
:root {
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
body { font-family: "Space Grotesk", Helvetica, Arial, sans-serif; background: var(--bg); color: var(--ink); min-height: 100vh; display: flex; flex-direction: column; }
.topbar { height: 4px; background: var(--accent); }

.wl { flex: 1; width: 100%; max-width: 640px; margin: 0 auto; padding: 72px 24px 60px; text-align: center; }
.photo { width: 168px; height: 168px; border-radius: 50%; object-fit: cover; object-position: center 20%; display: block; margin: 0 auto 26px; border: 3px solid var(--accent); box-shadow: 0 18px 40px -12px rgba(0,0,0,0.7); }
h1 { font-family: var(--serif); font-weight: 600; font-size: 58px; line-height: 1.08; color: #fff; letter-spacing: -0.5px; }
.sub { font-size: 19px; line-height: 1.6; color: var(--ink); margin: 22px auto 0; max-width: 46ch; }
.sub a { color: var(--accent); text-decoration: none; font-weight: 700; }
.sub a:hover { text-decoration: underline; }

form { margin: 36px auto 0; max-width: 460px; text-align: left; }
label { display: block; font-size: 13px; letter-spacing: 0.08em; text-transform: uppercase; color: var(--muted); margin: 0 0 8px 2px; font-weight: 500; }
input { width: 100%; padding: 15px 16px; margin-bottom: 18px; font-size: 16px; border: 1px solid var(--hairline); border-radius: 5px; font-family: inherit; background: #12151b; color: var(--ink); }
input::placeholder { color: var(--muted); }
input:focus { outline: none; border-color: var(--accent); }
button[type=submit] { width: 100%; padding: 18px; margin-top: 4px; border: none; border-radius: 5px; cursor: pointer; background: var(--accent); color: #fff; font-weight: 700; font-size: 17px; font-family: inherit; letter-spacing: 0.06em; text-transform: uppercase; box-shadow: 0 10px 24px rgba(255,107,53,0.28); transition: background .15s ease; }
button[type=submit]:hover { background: var(--accent-dark); }
button[disabled] { opacity: .6; cursor: default; }
.err { display: none; color: var(--accent); font-size: 14px; margin-top: 12px; text-align: center; }
.fine { font-size: 12px; color: var(--muted); margin-top: 14px; text-align: center; line-height: 1.5; }

.done { display: none; margin: 40px auto 0; padding: 28px 28px; max-width: 480px; background: var(--bg-raised); border: 1px solid var(--hairline); border-radius: 8px; text-align: left; }
.done h2 { font-family: var(--serif); font-weight: 600; font-size: 28px; color: #fff; margin-bottom: 10px; }
.done p { font-size: 15px; line-height: 1.62; color: var(--ink); }
.done .replay { display: inline-block; margin-top: 18px; padding: 15px 26px; background: var(--accent); color: #fff; font-weight: 700; text-decoration: none; border-radius: 5px; letter-spacing: 0.06em; text-transform: uppercase; font-size: 14px; }
.done .replay:hover { background: var(--accent-dark); }

.footer { padding: 30px 24px 40px; background: var(--bg-raised); border-top: 1px solid var(--hairline); text-align: center; }
.footer .copy { font-weight: 500; font-size: 14px; color: var(--ink); }
.disclaimer { max-width: 860px; margin: 14px auto 0; font-size: 12px; color: var(--muted); line-height: 1.6; }
.disclaimer p { margin-bottom: 8px; }

@media (max-width: 860px) {
    .wl { padding: 44px 22px 44px; }
    .photo { width: 132px; height: 132px; margin-bottom: 20px; }
    h1 { font-size: 40px; }
    .sub { font-size: 17px; }
}`;

const bodyHtml = `<div class="topbar"></div>

<main class="wl">
    <img class="photo" src="/victor.jpg" alt="Victor Alegria, Principal Trombone of the Helsinki Philharmonic" width="1080" height="1080">
    <h1>Join the waitlist</h1>
    <p class="sub">I'll let you know as soon as there are more slots available. In the meantime, <a href="/masterclass">watch the replay of the masterclass</a>.</p>

    <form id="wlForm" novalidate>
        <label for="firstName">Name</label>
        <input type="text" id="firstName" name="firstName" placeholder="Your name" autocomplete="name" required>
        <label for="email">Email</label>
        <input type="email" id="email" name="email" placeholder="Your best email" autocomplete="email" required>
        <label for="phone">Phone number</label>
        <input type="tel" id="phone" name="phone" placeholder="+358 40 123 4567" autocomplete="tel" required>
        <button type="submit" id="submitBtn">Join the waitlist</button>
        <div class="err" id="err"></div>
        <p class="fine">You'll hear from me when a slot opens. No spam, ever.</p>
    </form>

    <div class="done" id="done">
        <h2>You're on the list.</h2>
        <p>I'll email you as soon as I open up more slots in my schedule. Right now I'm very busy performing with the orchestra, so my capacity is limited.</p>
        <p style="margin-top:10px;">In the meantime, watch the replay.</p>
        <a class="replay" href="/masterclass">Watch the masterclass replay</a>
    </div>
</main>

<div class="footer">
    <div class="copy">&copy;2026 Victor Alegria Music</div>
    <div class="disclaimer">
        <p>This site is not a part of the Facebook website or Facebook Inc. Additionally, this site is NOT endorsed by Facebook in any way. FACEBOOK is a trademark of FACEBOOK, Inc.</p>
        <p>NOT GOOGLE: This site is not a part of the Google website or Google Inc. Additionally, this site is NOT endorsed by Google in any way.</p>
    </div>
</div>`;

const bodyScript0 = `
/* Posts to our own serverless function, which holds the ActiveCampaign key.
   The key is NEVER in this file: page source is public to every visitor. */
var ENDPOINT = "/api/waitlist";
var form = document.getElementById('wlForm');
var err = document.getElementById('err');
var btn = document.getElementById('submitBtn');
var done = document.getElementById('done');

function isValidEmail(v) { return /^[^\\s@]+@[^\\s@.]+(\\.[^\\s@.]+)*\\.[A-Za-z]{2,}$/.test(v) && v.length <= 254; }
function isValidPhone(v) { var d = v.replace(/\\D/g, ''); return /^[+\\d\\s().-]+$/.test(v) && d.length >= 7 && d.length <= 20; }

form.addEventListener('submit', function (ev) {
    ev.preventDefault();
    var name = form.firstName.value.trim();
    var email = form.email.value.trim();
    var phone = form.phone.value.trim();
    err.style.display = 'none';
    if (!name) return fail('Add your name so I know who I am writing to.');
    if (!isValidEmail(email)) return fail('That email does not look right. Try again?');
    if (!isValidPhone(phone)) return fail('That phone number does not look right. Include your country code.');

    var parts = name.split(/\\s+/);
    btn.disabled = true; btn.textContent = 'Adding you...';
    fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName: parts[0], lastName: parts.slice(1).join(' '), email: email, phone: phone })
    })
    .then(function (r) { return r.json().catch(function () { return {}; }); })
    .then(function (data) {
        if (data && data.ok) {
            form.style.display = 'none';
            done.style.display = 'block';
            done.scrollIntoView({ behavior: 'smooth', block: 'center' });
            return;
        }
        fail(data && data.error === 'invalid_email' ? 'That email does not look right. Try again?'
           : data && data.error === 'invalid_phone' ? 'That phone number does not look right. Include your country code.'
           : 'Something went wrong. Please try again.');
    })
    .catch(function () { fail('Could not reach the server. Check your connection and try again.'); });

    function fail(t) { err.textContent = t; err.style.display = 'block'; btn.disabled = false; btn.textContent = 'Join the waitlist'; }
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
