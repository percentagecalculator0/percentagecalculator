// ONE place to register languages. To add a language: create src/messages/<code>.json
// (copy en.json and translate), then add one line below. Nothing else needs to change.
export type Locale = {
  code: string;          // URL folder: /es
  hreflang: string;      // value used in hreflang tags
  htmlLang: string;      // <html lang="...">
  nativeName: string;    // shown in the language switcher
  dir: "ltr" | "rtl";
  numberLocale: string;  // Intl locale for number formatting and parsing
  ogLocale: string;      // Open Graph locale
};

export const LOCALES: Locale[] = [
  { code: "en", hreflang: "en", htmlLang: "en", nativeName: "English", dir: "ltr", numberLocale: "en", ogLocale: "en_US" },
  { code: "es", hreflang: "es", htmlLang: "es", nativeName: "Español", dir: "ltr", numberLocale: "es", ogLocale: "es_ES" },
  { code: "fr", hreflang: "fr", htmlLang: "fr", nativeName: "Français", dir: "ltr", numberLocale: "fr", ogLocale: "fr_FR" },
  { code: "de", hreflang: "de", htmlLang: "de", nativeName: "Deutsch", dir: "ltr", numberLocale: "de", ogLocale: "de_DE" },
  // Next batch (files exist but are still empty): pt, id, hi, ar (ar is rtl)
];

export const DEFAULT_LOCALE = "en";
export const LOCALE_CODES = LOCALES.map((l) => l.code);
export const getLocale = (code: string): Locale | undefined => LOCALES.find((l) => l.code === code);
