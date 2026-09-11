import Script from "next/script";

// ActiveCampaign site tracking. This is the snippet ActiveCampaign shows under
// Settings > Tracking, so the account's "Site Tracking" screen reports the
// site as connected and each known contact's page visits show on their record
// in ActiveCampaign. It does not replace the form and booking wiring, which
// write to ActiveCampaign through /api/subscribe, /api/book, /api/waitlist and
// /api/contact. Visitors become "known" when they arrive from a tracked link
// in one of Víctor's emails.
//
// The account id is the tracking id of Víctor's ActiveCampaign account
// (victoralvarezalegria44473). Domains whitelisted there: alegriamusic.net and
// www.alegriamusic.net. Loaded after the page is interactive so it never
// delays the first paint.
const AC_TRACKING_ACCOUNT = "479067337";

export default function AcSiteTracking() {
  return (
    <Script id="ac-site-tracking" strategy="afterInteractive">
      {`(function(e,t,o,n,p,r,i){e.visitorGlobalObjectAlias=n;e[e.visitorGlobalObjectAlias]=e[e.visitorGlobalObjectAlias]||function(){(e[e.visitorGlobalObjectAlias].q=e[e.visitorGlobalObjectAlias].q||[]).push(arguments)};e[e.visitorGlobalObjectAlias].l=(new Date).getTime();r=t.createElement("script");r.src=o;r.async=true;i=t.getElementsByTagName("script")[0];i.parentNode.insertBefore(r,i)})(window,document,"https://diffuser-cdn.app-us1.com/diffuser/diffuser.js","vgo");
vgo('setAccount', '${AC_TRACKING_ACCOUNT}');
vgo('setTrackByDefault', true);
vgo('process');`}
    </Script>
  );
}
