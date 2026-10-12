import { siteConfig } from "@/lib/site";

/** Sitemap chuẩn SEO cho App Router: /sitemap.xml */
export default function sitemap() {
  const base = siteConfig.url.replace(/\/$/, "");
  const now = new Date();

  return [
    {
      url: `${base}/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
