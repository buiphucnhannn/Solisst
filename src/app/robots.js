import { siteConfig } from "@/lib/site";

/** Robots chuẩn SEO cho App Router: /robots.txt */
export default function robots() {
  const base = siteConfig.url.replace(/\/$/, "");

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${base}/sitemap.xml`,
  };
}
