import type { Metadata } from "next";
import Calculator from "@/components/Calculator";
import AdSlot from "@/components/AdSlot";
import en from "@/messages/en.json";

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://percentageincreasecalculator.net";

export async function generateMetadata(): Promise<Metadata> {
  const m = en.meta.home;
  return {
    title: m.title,
    description: m.description,
    alternates: { canonical: `${SITE}/en` },
    robots: { index: true, follow: true },
    openGraph: { title: m.title, description: m.description, url: `${SITE}/en`, siteName: en.site.name, type: "website", locale: "en" },
    twitter: { card: "summary", title: m.title, description: m.description },
  };
}

// JSON-LD is data, not script: it is not blocked by CSP script-src. "<" is escaped for safety.
const ld = (o: object) => JSON.stringify(o).replace(/</g, "\\u003c");

export default function Home() {
  const h = en.home;
  const jsonLd = [
    { "@context": "https://schema.org", "@type": "WebSite", name: en.site.name, url: SITE, inLanguage: "en" },
    { "@context": "https://schema.org", "@type": "WebApplication", name: en.site.name, url: `${SITE}/en`, applicationCategory: "UtilitiesApplication", operatingSystem: "Any (web browser)", inLanguage: "en", description: en.meta.home.description, offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } },
    { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: h.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
  ];
  return (
    <main className="wrap">
      <h1>{h.h1}</h1>
      <p className="lead">{h.lead}</p>
      <section id="calculator" aria-label={en.calc.heading}>
        <Calculator messages={en.calc as never} locale="en" />
      </section>
      <AdSlot label={h.adLabel} slot="home-below-calculator" />

      <h2>{h.whatTitle}</h2>
      {h.what.map((p) => <p key={p}>{p}</p>)}

      <h2>{h.formulaTitle}</h2>
      <p className="formula-box">{h.formulaMain}</p>
      <ol>{h.formulaNotes.map((n) => <li key={n}>{n}</li>)}</ol>

      <h2>{h.examplesTitle}</h2>
      <div className="cards" style={{ gridTemplateColumns: "1fr" }}>
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
