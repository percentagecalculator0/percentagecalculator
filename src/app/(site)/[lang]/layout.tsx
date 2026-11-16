import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import "../../globals.css";
import { LOCALES, LOCALE_CODES, getLocale } from "@/lib/i18n/config";
import { getMessages } from "@/lib/i18n/messages";
import { SITE } from "@/lib/seo";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import LanguageSuggestion, { type BannerStrings } from "@/components/LanguageSuggestion";

export const dynamicParams = false;
export function generateStaticParams() { return LOCALE_CODES.map((lang) => ({ lang })); }
export const metadata: Metadata = { metadataBase: new URL(SITE) };

const banners: BannerStrings = Object.fromEntries(
  LOCALES.map((l) => [l.code, { ...getMessages(l.code).site.banner, name: l.nativeName, hreflang: l.hreflang }])
);
const switcherItems = LOCALES.map(({ code, hreflang, nativeName }) => ({ code, hreflang, nativeName }));

export default async function RootLayout({ children, params }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const loc = getLocale(lang);
  if (!loc) notFound();
  const m = getMessages(lang);
  return (
    <html lang={loc.htmlLang} dir={loc.dir}>
      <head><meta name="viewport" content="width=device-width, initial-scale=1" /></head>
      <body>
        <a className="skip" href="#calculator">{m.site.skip}</a>
        <header className="site">
          <div className="wrap">
            <Link className="brand" href={`/${lang}`}>{m.site.name}</Link>
            <nav aria-label="Main"><Link href={`/${lang}/reviews`}>{m.site.reviews}</Link></nav>
            <LanguageSwitcher locales={switcherItems} current={lang} label={m.site.language} />
          </div>
        </header>
        {children}
        <footer className="site"><div className="wrap">© {new Date().getFullYear()} {m.site.name}</div></footer>
        <LanguageSuggestion current={lang} strings={banners} />
      </body>
    </html>
  );
}
