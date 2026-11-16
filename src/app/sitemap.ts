import type { MetadataRoute } from "next";
import { LOCALES } from "@/lib/i18n/config";
import { PAGES, LAST_MOD, urlFor, hreflangMap } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  return LOCALES.flatMap((l) =>
    PAGES.map((p) => ({
      url: urlFor(l.code, p),
      lastModified: LAST_MOD,
      alternates: { languages: hreflangMap(p) },
    }))
  );
}
