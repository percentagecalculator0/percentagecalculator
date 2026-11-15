import type { Metadata } from "next";
import Link from "next/link";
import "../globals.css";
import en from "@/messages/en.json";

// Stage 2: English only. Stage 3 generalises this to all languages.
export const dynamicParams = false;
export function generateStaticParams() { return [{ lang: "en" }]; }

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://percentageincreasecalculator.net";
export const metadata: Metadata = { metadataBase: new URL(SITE) };

export default async function RootLayout({ children, params }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return (
    <html lang={lang} dir={en.meta.dir}>
      <head><meta name="viewport" content="width=device-width, initial-scale=1" /></head>
      <body>
        <a className="skip" href="#calculator">{en.site.skip}</a>
        <header className="site">
          <div className="wrap"><Link className="brand" href={`/${lang}`}>{en.site.name}</Link></div>
        </header>
        {children}
        <footer className="site"><div className="wrap">© {new Date().getFullYear()} {en.site.name}</div></footer>
      </body>
    </html>
  );
}
