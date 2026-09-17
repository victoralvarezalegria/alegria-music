import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  async redirects() {
    return [
      // The September 7 live masterclass is over. Until the next live date is
      // set, every "register" link lands on the evergreen page (/watch), whose
      // sign-ups go to the "Automated Masterclass Leads" list and get the
      // replay, instead of the live list whose automation still sends the
      // Zoom link for a class that already happened. To run the next live
      // class: delete these two entries, update masterclass-config.ts,
      // translations.ts ("masterclass" namespace) and public/assets/masterclass.ics.
      { source: "/masterclass-live", destination: "/watch", permanent: false },
      { source: "/registered", destination: "/masterclass", permanent: false },
    ];
  },
  async headers() {
    return [
      {
        // Security headers on every route (launch compliance pass, 2026-09-17).
        // CSP allowlist = every third-party origin the app actually loads:
        // ActiveCampaign site tracking (app-us1 / trackcmp), Calendly (embed + api),
        // YouTube / Vimeo / Loom embeds, Google Fonts, Facebook/Instagram embeds,
        // the Supabase project and the Zoom / Google Calendar links. Next.js needs
        // 'unsafe-inline' for its own hydration scripts and styled JSX.
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "geolocation=(), microphone=(), camera=(), payment=(), usb=()" },
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://diffuser-cdn.app-us1.com https://*.app-us1.com https://trackcmp.net https://assets.calendly.com https://www.youtube.com https://www.youtube-nocookie.com https://player.vimeo.com https://www.loom.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://assets.calendly.com",
              "font-src 'self' data: https://fonts.gstatic.com https://assets.calendly.com",
              "img-src 'self' data: blob: https:",
              "media-src 'self' blob: https:",
              "frame-src 'self' https://calendly.com https://*.calendly.com https://www.youtube.com https://www.youtube-nocookie.com https://player.vimeo.com https://www.loom.com https://www.instagram.com https://www.facebook.com https://calendar.google.com",
              "connect-src 'self' https://*.app-us1.com https://trackcmp.net https://calendly.com https://*.calendly.com https://agbldmgbxzrrxznwbxar.supabase.co https://www.youtube.com https://www.youtube-nocookie.com https://player.vimeo.com https://www.loom.com https://fonts.googleapis.com https://fonts.gstatic.com",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self' https://calendly.com https://*.calendly.com",
              "frame-ancestors 'self'",
              "upgrade-insecure-requests",
            ].join("; "),
          },
        ],
      },
      {
        // The calendar file on /registered. Without these it opens as text in
        // the browser instead of being handed to the calendar app.
        source: "/assets/masterclass.ics",
        headers: [
          { key: "Content-Type", value: "text/calendar; charset=utf-8" },
          {
            key: "Content-Disposition",
            value: 'attachment; filename="masterclass.ics"',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
