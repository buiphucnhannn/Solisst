import { siteConfig } from "@/lib/site";
import { PRODUCTS } from "@/lib/products";

/** Sitemap chuẩn SEO cho App Router: /sitemap.xml */
export default function sitemap() {
  const base = siteConfig.url.replace(/\/$/, "");
  const now = new Date();

  return [
    { url: `${base}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/bo-suu-tap`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    ...PRODUCTS.map((p) => ({
      url: `${base}/san-pham/${p.id}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    })),
  ];
}
