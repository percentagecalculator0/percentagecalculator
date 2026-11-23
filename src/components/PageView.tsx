import Link from "next/link";
import AdSlot from "./AdSlot";
import Breadcrumbs from "./Breadcrumbs";
import Calculator from "./Calculator";
import { Faq, Sections } from "./Blocks";
import JsonLd from "./JsonLd";
import Related from "./Related";
import { BLURBS } from "@/lib/blurbs";
import { HUB_GROUPS } from "@/lib/guides";
import { GUIDE_PAGES, pathOf, type PageDef } from "@/lib/pages";
import { buildJsonLd, getAnyPage, trailFor } from "@/lib/seo";
import { CALCULATOR_NAV, GUIDE_NAV, SITE } from "@/lib/site";

function Card({ slug }: { slug: string }) {
  const p = getAnyPage(slug);
  if (!p) return null;
  return (
    <li>
      <Link href={pathOf(p.slug)}>
        <span className="related-title">{p.navLabel}</span>
        <span className="related-text">{BLURBS[p.slug] ?? p.lead}</span>
      </Link>
    </li>
  );
}

function HubList({ page }: { page: PageDef }) {
  if (page.slug === "calculators") {
    return (
      <div className="hub">
        {HUB_GROUPS.map((g) => (
          <section key={g.heading} className="hub-group" aria-labelledby={`g-${g.slugs[0] || "home"}`}>
            <h2 id={`g-${g.slugs[0] || "home"}`}>{g.heading}</h2>
            <p>{g.blurb}</p>
            <ul className="cards">
              {g.slugs.map((s) => (
                <Card key={s} slug={s} />
              ))}
            </ul>
          </section>
        ))}
      </div>
    );
  }
  return (
    <div className="hub">
      <section className="hub-group" aria-labelledby="g-guides">
        <h2 id="g-guides">All guides</h2>
        <ul className="cards">
          {GUIDE_PAGES.map((g) => (
            <Card key={g.slug} slug={g.slug} />
          ))}
        </ul>
      </section>
    </div>
  );
}

export default function PageView({ page }: { page: PageDef }) {
  const showAds = page.kind === "calculator" || page.kind === "guide";
  const chips = page.kind === "calculator" ? CALCULATOR_NAV : page.kind === "guide" ? GUIDE_NAV : [];
  const current = pathOf(page.slug);
  const showTrust = page.kind !== "legal";

  return (
    <main id="main" className="wrap page">
      <JsonLd data={buildJsonLd(page)} />
      <Breadcrumbs trail={trailFor(page)} />

      <header className="hero">
        <h1>{page.h1}</h1>
        <p className="lead">{page.lead}</p>
        {showTrust && (
          <p className="trust">
            <span>Updated {SITE.lastUpdated}</span>
            <span aria-hidden="true">·</span>
            <span>Every formula is tested</span>
            <span aria-hidden="true">·</span>
            <Link href="/methodology">How we calculate</Link>
          </p>
        )}
      </header>

      {chips.length > 0 && (
        <nav className="tool-chips" aria-label={page.kind === "guide" ? "Guides" : "Calculators"}>
          <ul>
            {chips.map((i) => (
              <li key={i.href}>
                <Link href={i.href} aria-current={i.href === current ? "page" : undefined}>
                  {i.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}

      {page.mode && <Calculator mode={page.mode} labels={page.labels} />}

      {page.kind === "hub" && <HubList page={page} />}

      {showAds && <AdSlot position="middle" />}

      <article className="prose">
        <Sections sections={page.sections} />
        {page.faq && page.faq.length > 0 && <Faq items={page.faq} />}
      </article>

      {showAds && <AdSlot position="bottom" />}

      <Related
        slugs={page.related}
        heading={page.kind === "legal" ? "You may also want" : "Related calculators and guides"}
      />
    </main>
  );
}
