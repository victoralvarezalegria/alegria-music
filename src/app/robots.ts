import type { MetadataRoute } from "next";

// Public marketing pages are crawlable; API routes, tracking links, the
// booked/registered thank-you pages and the funnel replay page stay out of search.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/", "/go/", "/booked", "/registered", "/masterclass-live", "/masterclass"] }],
    sitemap: "https://www.alegriamusic.net/sitemap.xml",
    host: "https://www.alegriamusic.net",
  };
}
