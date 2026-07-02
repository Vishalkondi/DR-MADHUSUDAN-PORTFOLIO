import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://dryemul.com"; // TODO: replace with your domain
  return [{ url: base, lastModified: new Date(), changeFrequency: "monthly", priority: 1 }];
}
