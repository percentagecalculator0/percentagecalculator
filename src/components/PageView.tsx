import AdSlot from "./AdSlot";
import Breadcrumbs from "./Breadcrumbs";
import Calculator from "./Calculator";
import { Faq, Sections } from "./Blocks";
import JsonLd from "./JsonLd";
import Related from "./Related";
import type { PageDef } from "@/lib/pages";
import { buildJsonLd } from "@/lib/seo";

export default function PageView({ page }: { page: PageDef }) {
  const showAds = page.kind !== "legal";

  return (
    <main id="main" className="wrap page">
      <JsonLd data={buildJsonLd(page)} />
      {page.slug !== "" && <Breadcrumbs label={page.navLabel} />}

      <header className="hero">
        <h1>{page.h1}</h1>
        <p className="lead">{page.lead}</p>
      </header>

      {page.mode && <Calculator mode={page.mode} />}

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
