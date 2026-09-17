import type { MetadataRoute } from "next";

const BASE = "https://www.alegriamusic.net";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: `${BASE}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/biography`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/events`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE}/bookings`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.5 },
    { url: `${BASE}/contact`, lastModified: now, changeFrequency: "yearly", priority: 0.5 },
    { url: `${BASE}/watch`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/apply`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
  ];
}
