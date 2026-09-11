import Script from "next/script";

// First-party attribution tracker, /public/t.js. Sets the tv visitor cookie
// through /api/t/init and posts page views, video milestones and CTA clicks to
// /api/t/event, on Victor's own domain, so a lead or a booked call can be
// traced back to the ad, the tracking link or the email that brought them,
// without HYROS and without depending on a third-party pixel cookie. Read
// tracking rows through /api/t/report. No secrets in the script: the visitor
// id is a random uuid that means nothing outside the cc_ tables.
//
// Loaded after the page is interactive, after ActiveCampaign's site tracking,
// so neither ever delays first paint. Every entry point inside t.js is
// wrapped: a tracking failure can never break a page.
export default function FirstPartyTracking() {
  return <Script id="first-party-tracking" src="/t.js" strategy="afterInteractive" />;
}
