import type { Metadata } from "next";
import { goldPdfCss, goldPdfHtml } from "@/components/guideGoldPdf";

// Where /guide sends people after the email goes through (2026-10-18).
// The PDF lives at /downloads/the-1-percent-audition-guide.pdf.

export const metadata: Metadata = {
  title: "Your 1% Audition Guide. Victor Alegria",
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
}
* { margin: 0; padding: 0; box-sizing: border-box; }
body {
    font-family: "Space Grotesk", Helvetica, Arial, sans-serif;
    background: var(--bg); color: var(--ink);
    min-height: 100vh; display: flex; flex-direction: column;
}
.topbar { height: 4px; background: var(--accent); }
.wrap { flex: 1; max-width: 720px; width: 100%; margin: 0 auto; padding: 60px 24px 60px; text-align: center; }
.eyebrow {
    color: var(--accent); font-weight: 500; font-size: 13px; letter-spacing: 0.18em;
    text-transform: uppercase; margin-bottom: 18px;
}
h1 {
    font-family: "Cormorant Garamond", Georgia, serif;
    font-weight: 600; font-size: 58px; line-height: 1.08; color: #fff; letter-spacing: -0.5px;
}
.lead { font-size: 17px; line-height: 1.6; color: var(--ink); margin: 16px auto 0; max-width: 40ch; }
.dl {
    display: inline-block; margin: 32px auto 0; padding: 19px 44px;
    background: var(--accent); color: #fff; font-weight: 700; font-size: 19px; text-decoration: none;
    border-radius: 5px; letter-spacing: 0.06em; text-transform: uppercase;
    box-shadow: 0 12px 30px rgba(255, 107, 53, 0.28);
    transition: background 0.15s ease, transform 0.15s ease;
}
.dl:hover { background: var(--accent-dark); transform: translateY(-2px); }
.open { display: block; margin-top: 14px; font-size: 14px; color: var(--muted); }
.open a { color: var(--muted); }
.preview { margin: 20px auto 0; max-width: 360px; }
.next {
    margin: 40px auto 0; padding: 26px 24px; max-width: 520px;
    background: var(--bg-raised); border: 1px solid var(--hairline); border-radius: 8px;
}
.next p { font-size: 15px; line-height: 1.55; color: var(--ink); }
.next a { display: inline-block; margin-top: 12px; color: var(--accent); font-weight: 700; text-decoration: none; letter-spacing: 0.04em; }
.next a:hover { text-decoration: underline; }
.footer { padding: 26px 24px 34px; background: var(--bg-raised); border-top: 1px solid var(--hairline); text-align: center; font-size: 13px; }
.footer a { color: var(--accent); text-decoration: none; }
@media (max-width: 860px) {
    .wrap { padding-top: 40px; }
    h1 { font-size: 40px; }
    .dl { font-size: 16px; padding: 17px 28px; }
    .preview { max-width: 280px; }
}` + goldPdfCss;

const bodyHtml = `<div class="topbar"></div>
<div class="wrap">
    <div class="eyebrow">You're in</div>
    <h1>Here is your 1% Audition Guide</h1>
    <p class="lead">Tap the button to download it. Save it, print it, and start your countdown.</p>
    <a class="dl" href="/downloads/the-1-percent-audition-guide.pdf" download="The 1% Audition Guide.pdf">Download the guide</a>
    <span class="open">Button not working? <a href="/downloads/the-1-percent-audition-guide.pdf" target="_blank" rel="noopener">Open the PDF here</a>.</span>

    <div class="preview">
        ${goldPdfHtml}
    </div>

    <div class="next">
        <p>Want the whole system behind the guide? Victor walks through it in a free masterclass.</p>
        <a href="/watch">Watch The 1% Method Masterclass &rarr;</a>
    </div>
</div>
<div class="footer">&copy;2026 Victor Alegria Music &middot; <a href="/privacy">Privacy Policy</a></div>`;

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
