import CookieConsent from "@/components/CookieConsent";
import type { Metadata } from "next";
import AcSiteTracking from "@/components/AcSiteTracking";
import FirstPartyTracking from "@/components/FirstPartyTracking";

// A second root layout, for the funnel pages only.
//
// These seven pages ship their own complete stylesheet (a reset, body rules and
// a full palette) copied from the standalone Vercel project. The site's root
// layout imports globals.css, whose Tailwind preflight and body utility classes
// (bg-background, flex flex-col) would win over the pages' own body rules and
// change how they look. So the funnel group gets a bare html/body of its own and
// no global stylesheet: what renders is exactly what the handoff pages render.
//
// Fonts are loaded by each page's own <link> tags, as in the source files.

export const metadata: Metadata = {
  title: "Victor Alegria",
  metadataBase: new URL("https://www.alegriamusic.net"),
  openGraph: {
    type: "website",
    siteName: "Víctor Álvarez Alegría",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Víctor Álvarez Alegría, trombone soloist" }],
  },
};

export default function FunnelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <CookieConsent />
        <AcSiteTracking />
        <FirstPartyTracking />
      </body>
    </html>
  );
}
