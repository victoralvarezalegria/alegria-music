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
