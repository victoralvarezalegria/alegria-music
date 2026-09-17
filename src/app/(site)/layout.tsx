import CookieConsentWithLang from "@/components/CookieConsentWithLang";
import type { Metadata } from "next";
import { Cormorant_Garamond, Space_Grotesk } from "next/font/google";
import { LanguageProvider } from "@/contexts/LanguageContext";
import AcSiteTracking from "@/components/AcSiteTracking";
import FirstPartyTracking from "@/components/FirstPartyTracking";
import "../globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Víctor Álvarez Alegría | International Trombone Soloist",
  description:
    "International trombone soloist and Principal Trombone of the Helsinki Philharmonic Orchestra. Former Karajan Academy member. Online educator with 100+ students worldwide.",
  keywords: [
    "trombone",
    "soloist",
    "classical music",
    "Helsinki Philharmonic",
    "Berlin Philharmonic",
    "Karajan Academy",
    "online trombone lessons",
    "Víctor Álvarez Alegría",
  ],
  metadataBase: new URL("https://www.alegriamusic.net"),
  alternates: { canonical: "/" },
  openGraph: {
    title: "Víctor Álvarez Alegría | International Trombone Soloist",
    description:
      "Principal Trombone of the Helsinki Philharmonic Orchestra. International soloist & online educator.",
    type: "website",
    url: "https://www.alegriamusic.net/",
    siteName: "Víctor Álvarez Alegría",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Víctor Álvarez Alegría, trombone soloist" }],
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <LanguageProvider>
          {children}
          <CookieConsentWithLang />
        </LanguageProvider>
        <AcSiteTracking />
        <FirstPartyTracking />
      </body>
    </html>
  );
}
