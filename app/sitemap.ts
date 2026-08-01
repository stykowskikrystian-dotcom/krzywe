import type { MetadataRoute } from "next";
import { blogArticles } from "./blog/articles";
import { SITE_URL, absoluteUrl } from "./lib/seo";

const LAST_CONTENT_UPDATE = new Date("2026-08-01T00:00:00+02:00");

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    { path: "", changeFrequency: "weekly", priority: 1, image: true },
    { path: "/domy-i-galeria", changeFrequency: "weekly", priority: 0.95, image: true },
    { path: "/oferta", changeFrequency: "weekly", priority: 0.95, image: true },
    { path: "/jezioro-krzywe", changeFrequency: "monthly", priority: 0.9 },
    { path: "/atrakcje", changeFrequency: "weekly", priority: 0.9 },
    { path: "/blog", changeFrequency: "weekly", priority: 0.9 },
    { path: "/kontakt", changeFrequency: "monthly", priority: 0.9, image: true },
    { path: "/polityka-prywatnosci", changeFrequency: "yearly", priority: 0.3 },
    { path: "/regulamin", changeFrequency: "yearly", priority: 0.3 },
  ] as const;

  const pages: MetadataRoute.Sitemap = routes.map((route) => ({
    url: absoluteUrl(route.path || "/"),
    lastModified: LAST_CONTENT_UPDATE,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
    images: "image" in route && route.image
      ? [`${SITE_URL}/krzywe-hero.webp`, `${SITE_URL}/brand-logo.png`]
      : undefined,
  }));

  const articles: MetadataRoute.Sitemap = blogArticles.map((article) => ({
    url: `${SITE_URL}/blog/${article.slug}`,
    lastModified: new Date(`${article.updatedAt}T12:00:00+02:00`),
    changeFrequency: "monthly",
    priority: 0.72,
    images: article.image.startsWith("http")
      ? [article.image]
      : [absoluteUrl(article.image)],
  }));

  return [...pages, ...articles];
}
