import { LOCALES, DEFAULT_LOCALE } from "@/lib/i18n/config";

export const SITE = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://percentageincreasecalculator.net").replace(/\/$/, "");

/** Pages that exist in every language. "" is the homepage. Stage 5 adds the rest. */
export const PAGES: string[] = [""];
export const LAST_MOD = "2026-11-15"; // update when content changes

export const urlFor = (code: string, path = "") => `${SITE}/${code}${path}`;

export function hreflangMap(path = ""): Record<string, string> {
  const map: Record<string, string> = {};
  for (const l of LOCALES) map[l.hreflang] = urlFor(l.code, path);
  map["x-default"] = urlFor(DEFAULT_LOCALE, path);
  return map;
}

/** Self-referencing canonical + full hreflang set (including x-default) for one language version. */
export function alternatesFor(code: string, path = "") {
  return { canonical: urlFor(code, path), languages: hreflangMap(path) };
}
