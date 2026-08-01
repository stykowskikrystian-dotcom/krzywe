import type { MetadataRoute } from "next";
import { SITE_URL } from "./lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/", "/*?*utm_"],
      },
      {
        userAgent: "Googlebot-Image",
        allow: ["/", "/krzywe-hero.png", "/krzywe-hero.webp", "/brand-logo.png"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
