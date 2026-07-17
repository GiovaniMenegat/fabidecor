import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site-config";

// Single-page site (see AGENTS.md "Component conventions") — one entry.
// If this ever becomes multiple routes, add one entry per real page here;
// don't list in-page anchors (#services etc.), they aren't separate resources.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
