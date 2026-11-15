import type { Metadata } from "next";
import Calculator, { type CalcMessages } from "@/components/Calculator";
import AdSlot from "@/components/AdSlot";
import { getLocale } from "@/lib/i18n/config";
import { getMessages } from "@/lib/i18n/messages";
import { SITE, alternatesFor, urlFor } from "@/lib/seo";
import { LOCALES } from "@/lib/i18n/config";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const loc = getLocale(lang)!;
  const m = getMessages(lang);
  const url = urlFor(lang);
  return {
    title: m.meta.home.title,
    description: m.meta.home.description,
    alternates: alternatesFor(lang),
    robots: { index: true, follow: true },
    openGraph: {
      title: m.meta.home.title, description: m.meta.home.description, url, siteName: m.site.name, type: "website",
      locale: loc.ogLocale, alternateLocale: LOCALES.filter((l) => l.code !== lang).map((l) => l.ogLocale),
    },
    twitter: { card: "summary", title: m.meta.home.title, description: m.meta.home.description },
  };
}

// JSON-LD is data, not script, so CSP script-src does not apply. "<" is escaped for safety.
const ld = (o: object) => JSON.stringify(o).replace(/</g, "\\u003c");

export default async function Home({ params }: Props) {
  const { lang } = await params;
  const loc = getLocale(lang)!;
  const m = getMessages(lang);
  const h = m.home;
  const jsonLd = [
    { "@context": "https://schema.org", "@type": "WebSite", name: m.site.name, url: SITE, inLanguage: loc.htmlLang },
    { "@context": "https://schema.org", "@type": "WebApplication", name: m.site.name, url: urlFor(lang), applicationCategory: "UtilitiesApplication", operatingSystem: "Any (web browser)", inLanguage: loc.htmlLang, description: m.meta.home.description, offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } },
    { "@context": "https://schema.org", "@type": "FAQPage", inLanguage: loc.htmlLang, mainEntity: h.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
  ];
  return (
    <main className="wrap">
      <h1>{h.h1}</h1>
      <p className="lead">{h.lead}</p>
      <section id="calculator" aria-label={m.calc.heading}>
        <Calculator messages={m.calc as unknown as CalcMessages} locale={loc.numberLocale} />
      </section>
      <AdSlot label={h.adLabel} slot="home-below-calculator" />

      <h2>{h.whatTitle}</h2>
      {h.what.map((p) => <p key={p}>{p}</p>)}

      <h2>{h.formulaTitle}</h2>
      <p className="formula-box">{h.formulaMain}</p>
      <ol>{h.formulaNotes.map((n) => <li key={n}>{n}</li>)}</ol>

      <h2>{h.examplesTitle}</h2>
      <div className="cards one">
        {h.examples.map((e) => <article className="card" key={e.title}><h3>{e.title}</h3><p>{e.body}</p></article>)}
      </div>

      <h2>{h.useTitle}</h2>
      <div className="cards">
        {h.uses.map((u) => <article className="card" key={u.title}><h3>{u.title}</h3><p>{u.body}</p></article>)}
      </div>

      <AdSlot label={h.adLabel} slot="home-mid" />

      <h2>{h.faqTitle}</h2>
      {h.faq.map((f) => <details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>)}

      {jsonLd.map((o, i) => <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: ld(o) }} />)}
    </main>
  );
}
