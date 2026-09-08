import type { Metadata } from "next";

// Ported verbatim from victor-site-handoff/funnel/registered.html.
// Copy, layout, styles and scripts are unchanged. Only the internal links were
// made absolute ("masterclass.html" -> "/masterclass") so they resolve as app
// routes instead of files.

export const metadata: Metadata = {
  title: "You're Registered. The 1% Method Masterclass",
  robots: { index: false, follow: false },
};

const css = `/* Palette measured from alegriamusic.net (2026-08-25). Same tokens as index.html. */
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
    min-height: 100vh; display: flex; flex-direction: column;
}
.topbar { height: 4px; background: var(--accent); }

.reg {
    flex: 1; max-width: 720px; width: 100%; margin: 0 auto;
    padding: 72px 24px 60px; text-align: center;
}

.reg-confirmed {
    color: var(--accent); font-weight: 500; font-size: 13px;
    letter-spacing: 0.18em; text-transform: uppercase; margin-bottom: 22px;
}

/* ===== THE DATE =====
   PLACEHOLDER. To set the real date, change these four places together:
     1. .reg-date text below
     2. the two .reg-time spans
     3. the Google Calendar link's \`dates=\` param (UTC, YYYYMMDDTHHMMSSZ)
     4. assets/masterclass.ics (DTSTART / DTEND, also UTC)
   Currently: Thursday 17 September 2026, 7:00pm EDT = 23:00 UTC. */
.reg-date {
    font-family: "Cormorant Garamond", Georgia, serif;
    font-weight: 600; font-size: 60px; line-height: 1.08; color: #fff;
    letter-spacing: -0.5px;
}
.reg-day {
    font-family: "Cormorant Garamond", Georgia, serif;
    font-style: italic; font-weight: 400; font-size: 30px;
    color: var(--ink); margin-top: 4px;
}
.reg-times {
    display: flex; align-items: center; justify-content: center;
    gap: 14px; margin-top: 20px;
}
.reg-time { font-size: 17px; font-weight: 500; color: var(--ink); letter-spacing: 0.04em; }
.reg-time-sep {
    width: 6px; height: 6px; border-radius: 100%;
    background: var(--muted); flex: 0 0 auto;
}
@media (max-width: 480px) {
    .reg-time-sep { display: none; }
    .reg-times { gap: 4px; flex-direction: column; }
}

.placeholder-note {
    display: inline-block; margin-top: 20px; padding: 9px 16px;
    border: 1px dashed var(--hairline); border-radius: 5px;
    font-size: 13px; color: var(--muted); line-height: 1.5;
}

.reg-cal {
    font-size: 16px; line-height: 1.55; color: var(--muted);
    margin: 40px auto 0; max-width: 36ch;
}

/* Add-to-calendar row. Two equal buttons, stack on narrow screens. */
.cal-row {
    display: flex; flex-wrap: wrap; justify-content: center;
    gap: 12px; margin: 18px auto 0; max-width: 460px;
}
.cal-btn {
    flex: 1 1 200px; display: inline-flex; align-items: center; justify-content: center;
    gap: 10px; padding: 14px 18px; border-radius: 5px;
    background: rgba(255,255,255,0.05);
    border: 1px solid var(--hairline);
    color: var(--ink); text-decoration: none;
    font-size: 15px; font-weight: 500; letter-spacing: 0.01em;
    transition: background .18s ease, border-color .18s ease, transform .18s ease;
}
.cal-btn:hover {
    background: rgba(255,255,255,0.09);
    border-color: rgba(255,107,53,0.5);
    transform: translateY(-1px);
}
.cal-btn svg { flex: 0 0 auto; display: block; }

.reg-next {
    margin: 46px auto 0; padding: 26px 28px; max-width: 480px;
    background: var(--bg-raised); border: 1px solid var(--hairline);
    border-radius: 8px; text-align: left;
}
.reg-next h2 {
    font-family: "Cormorant Garamond", Georgia, serif;
    font-weight: 600; font-size: 26px; color: #fff; margin-bottom: 12px;
}
.reg-next p { font-size: 15px; line-height: 1.62; color: var(--ink); }
.reg-next p + p { margin-top: 10px; }
.reg-next b { color: #fff; font-weight: 700; }

.back { display: inline-block; margin-top: 40px; font-size: 14px; color: var(--muted); text-decoration: none; }
.back:hover { color: var(--accent); }

.footer {
    padding: 30px 24px 40px; background: var(--bg-raised);
    border-top: 1px solid var(--hairline); text-align: center;
}
.footer .copy { font-weight: 500; font-size: 14px; margin-bottom: 12px; color: var(--ink); }
.footer a { color: var(--accent); text-decoration: none; font-size: 13px; }
.footer a:hover { text-decoration: underline; }
.footer .links { margin-bottom: 18px; }
.footer .links span { color: var(--muted); margin: 0 8px; }
.disclaimer { max-width: 860px; margin: 0 auto; font-size: 12px; color: var(--muted); line-height: 1.6; }
.disclaimer p { margin-bottom: 8px; }

@media (max-width: 860px) {
    .reg { padding: 52px 22px 44px; }
    .reg-date { font-size: 40px; }
    .reg-day { font-size: 24px; }
}`;

const bodyHtml = `<div class="topbar"></div>

<main class="reg">
    <div class="reg-confirmed">You're registered</div>

    <h1 class="reg-date">September 17th</h1>
    <div class="reg-day">Thursday</div>

    <div class="reg-times">
        <span class="reg-time">7:00pm EST</span>
        <span class="reg-time-sep" aria-hidden="true"></span>
        <span class="reg-time">4:00pm PST</span>
    </div>

    <div class="placeholder-note">
        Placeholder date. Victor confirms the final time by email before the session.
    </div>

    <p class="reg-cal">Add it to your calendar now so it doesn't slip past you.</p>

    <div class="cal-row">
        <a class="cal-btn" target="_blank" rel="noopener"
           href="https://calendar.google.com/calendar/render?action=TEMPLATE&amp;text=The%201%25%20Method%20Masterclass%20with%20Victor%20Alegria&amp;dates=20260917T230000Z%2F20260918T003000Z&amp;details=Unlock%20range%2C%20confidence%20and%20audition-winning%20consistency%20with%20the%201%25%20Method.%0A%0AA%20live%20masterclass%20with%20Victor%20Alegria%2C%20Principal%20Trombone%20of%20the%20Helsinki%20Philharmonic.%0A%0AThe%20join%20link%20arrives%20by%20email%20before%20the%20session.">
            <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
                <rect x="3" y="4" width="18" height="17" rx="3" fill="#fff"/>
                <rect x="3" y="4" width="18" height="4.5" rx="3" fill="#4285F4"/>
                <rect x="3" y="6" width="18" height="2.5" fill="#4285F4"/>
                <rect x="5.5" y="11" width="5" height="3" rx="1" fill="#EA4335"/>
                <rect x="13" y="11" width="5" height="3" rx="1" fill="#FBBC05"/>
                <rect x="5.5" y="16" width="5" height="3" rx="1" fill="#34A853"/>
                <rect x="13" y="16" width="5" height="3" rx="1" fill="#4285F4"/>
            </svg>
            Google Calendar
        </a>

        <a class="cal-btn" href="/assets/masterclass.ics" download>
            <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true" fill="#E8E8E8">
                <path d="M16.4 12.6c0-2 1.6-3 1.7-3.05-.9-1.35-2.35-1.55-2.85-1.55-1.2-.12-2.35.72-2.97.72-.61 0-1.56-.7-2.57-.68-1.32.02-2.54.77-3.22 1.95-1.37 2.39-.35 5.93 1 7.87.65.95 1.43 2.02 2.45 1.98.98-.04 1.35-.64 2.54-.64s1.52.64 2.56.62c1.06-.02 1.73-.97 2.38-1.92.75-1.1 1.06-2.17 1.07-2.22-.02-.01-2.06-.79-2.09-3.08z"/>
                <path d="M14.6 6.5c.54-.66.9-1.57.8-2.5-.78.03-1.72.52-2.28 1.17-.5.58-.94 1.51-.82 2.4.87.07 1.76-.44 2.3-1.07z"/>
            </svg>
            Apple Calendar
        </a>
    </div>

    <div class="reg-next">
        <h2>What happens next</h2>
        <p>Check your inbox. A confirmation is on its way with everything you need.</p>
        <p>You'll get the <b>join link and a reminder</b> before the session starts. If nothing arrives in a few minutes, check your promotions or spam folder and drag it to your main inbox.</p>
    </div>

    <a class="back" href="/masterclass-live">&larr; Back to the masterclass page</a>
</main>

<div class="footer">
    <div class="copy">&copy;2026 Victor Alegria Music</div>
    <div class="links">
        <a href="#">Privacy Policy</a><span>|</span><a href="#">Terms and Conditions</a>
    </div>
    <div class="disclaimer">
        <p>This site is not a part of the Facebook website or Facebook Inc. Additionally, this site is NOT endorsed by Facebook in any way. FACEBOOK is a trademark of FACEBOOK, Inc.</p>
        <p>NOT GOOGLE: This site is not a part of the Google website or Google Inc. Additionally, this site is NOT endorsed by Google in any way.</p>
    </div>
</div>`;



export default function Page() {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&display=swap" rel="stylesheet" />
      <style dangerouslySetInnerHTML={{ __html: css }} />

      <div dangerouslySetInnerHTML={{ __html: bodyHtml }} />

    </>
  );
}
