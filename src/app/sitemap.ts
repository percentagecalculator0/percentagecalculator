import type { MetadataRoute } from "next";
import { NOINDEX } from "@/lib/indexing";
import { ALL_PAGES } from "@/lib/seo";
import { pathOf } from "@/lib/pages";
import { SITE, absoluteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  if (NOINDEX) return [];
  return ALL_PAGES.map((p) => ({
    url: absoluteUrl(pathOf(p.slug)),
    lastModified: SITE.lastUpdatedIso,
    changeFrequency: p.kind === "legal" ? "yearly" : "monthly",
    priority: p.slug === "" ? 1 : p.kind === "hub" ? 0.9 : p.kind === "legal" ? 0.3 : p.kind === "post" ? 0.7 : 0.8,
  }));
}
