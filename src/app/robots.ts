import type { MetadataRoute } from "next";
import { NOINDEX } from "@/lib/indexing";
import { SITE } from "@/lib/site";

// Note: robots.txt controls crawling, not indexing. "noindex" is not a valid robots.txt rule.
// To keep pages out of search results, use SITE_NOINDEX=true (see src/lib/indexing.ts).
export default function robots(): MetadataRoute.Robots {
  if (NOINDEX) {
    return { rules: [{ userAgent: "*", allow: "/" }] };
  }
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  };
}
