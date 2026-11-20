import type { MetadataRoute } from "next";
import { ALL_PAGES } from "@/lib/seo";
import { pathOf } from "@/lib/pages";
import { SITE, absoluteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return ALL_PAGES.map((p) => ({
    url: absoluteUrl(pathOf(p.slug)),
    lastModified: SITE.lastUpdatedIso,
    changeFrequency: p.kind === "legal" ? "yearly" : "monthly",
    priority: p.slug === "" ? 1 : p.kind === "legal" ? 0.3 : 0.8,
  }));
}
