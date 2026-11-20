import type { Metadata } from "next";
import { LEGAL_PAGES } from "./legal";
import { CALCULATOR_PAGES, pathOf, type PageDef } from "./pages";
import { SITE, absoluteUrl } from "./site";

export const ALL_PAGES: PageDef[] = [...CALCULATOR_PAGES, ...LEGAL_PAGES];

export function getAnyPage(slug: string): PageDef | undefined {
  return ALL_PAGES.find((p) => p.slug === slug);
}

export function buildMetadata(page: PageDef): Metadata {
  const path = pathOf(page.slug);
  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: path },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
    },
    openGraph: {
      type: "website",
      siteName: SITE.name,
      title: page.title,
      description: page.description,
      url: path,
      locale: "en_US",
      images: [{ url: "/og.png", width: 1200, height: 630, alt: SITE.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
      images: ["/og.png"],
    },
  };
}

/** Remove [text](/link) markup so structured data holds plain text. */
export function plain(text: string): string {
  return text.replace(/\[([^\]]+)\]\((\/[^)\s]*)\)/g, "$1");
}

export function buildJsonLd(page: PageDef): Record<string, unknown> {
  const url = absoluteUrl(pathOf(page.slug));
  const graph: Record<string, unknown>[] = [
    {
      "@type": "WebSite",
      "@id": `${SITE.url}/#website`,
      url: `${SITE.url}/`,
      name: SITE.name,
      description: SITE.tagline,
      inLanguage: "en",
    },
    {
      "@type": "WebPage",
      "@id": `${url}#webpage`,
      url,
      name: page.title,
      description: page.description,
      isPartOf: { "@id": `${SITE.url}/#website` },
      inLanguage: "en",
      dateModified: SITE.lastUpdatedIso,
    },
  ];

  if (page.kind === "calculator") {
    graph.push({
      "@type": "WebApplication",
      "@id": `${url}#app`,
      name: page.h1,
      url,
      description: page.description,
      applicationCategory: "UtilitiesApplication",
      operatingSystem: "Any",
      browserRequirements: "Requires JavaScript",
      isAccessibleForFree: true,
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    });
  }

  if (page.slug !== "") {
    graph.push({
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE.url}/` },
        { "@type": "ListItem", position: 2, name: page.navLabel, item: url },
      ],
    });
  }

  if (page.faq && page.faq.length > 0) {
    graph.push({
      "@type": "FAQPage",
      mainEntity: page.faq.map((f) => ({
        "@type": "Question",
        name: plain(f.q),
        acceptedAnswer: { "@type": "Answer", text: plain(f.a) },
      })),
    });
  }

  return { "@context": "https://schema.org", "@graph": graph };
}
