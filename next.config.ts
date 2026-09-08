import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
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
