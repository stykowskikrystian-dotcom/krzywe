import type { MetadataRoute } from "next";
import { SITE_DESCRIPTION, SITE_NAME } from "./lib/seo";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    short_name: "Krzywe",
    description: SITE_DESCRIPTION,
    start_url: "/",
    display: "standalone",
    background_color: "#f4f3ed",
    theme_color: "#1d3024",
    lang: "pl-PL",
    icons: [
      { src: "/favicon-48.png", sizes: "48x48", type: "image/png" },
      { src: "/favicon.png", sizes: "512x512", type: "image/png" },
      { src: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
