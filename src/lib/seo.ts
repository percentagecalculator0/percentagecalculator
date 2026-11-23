import type { Metadata } from "next";
import { LEGAL_PAGES } from "./legal";
import { GUIDE_PAGES, HUB_PAGES, TOOL_PAGES, pathOf, type PageDef } from "./pages";
import { SITE, absoluteUrl } from "./site";

export const ALL_PAGES: PageDef[] = [...TOOL_PAGES, ...GUIDE_PAGES, ...HUB_PAGES, ...LEGAL_PAGES];

export function getAnyPage(slug: string): PageDef | undefined {
  return ALL_PAGES.find((p) => p.slug === slug);
}

export type Crumb = { label: string; href?: string };

/** The breadcrumb trail for a page. The last item has no link. */
export function trailFor(page: PageDef): Crumb[] {
  if (page.slug === "") return [];
  const home: Crumb = { label: "Home", href: "/" };
  if (page.kind === "calculator") {
    return [home, { label: "Calculators", href: "/calculators" }, { label: page.navLabel }];
  }
  if (page.kind === "guide") {
    return [home, { label: "Guides", href: "/guides" }, { label: page.navLabel }];
  }
  return [home, { label: page.navLabel }];
}

export function buildMetadata(page: PageDef): Metadata {
  const path = pathOf(page.slug);
  const isArticle = page.kind === "guide";
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
      type: isArticle ? "article" : "website",
      siteName: SITE.name,
      title: page.title,
      description: page.description,
      url: path,
      locale: "en_US",
      images: [{ url: "/og.png", width: 1200, height: 630, alt: SITE.name }],
      ...(isArticle ? { modifiedTime: SITE.lastUpdatedIso } : {}),
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

const ORG_ID = `${SITE.url}/#organization`;
const SITE_ID = `${SITE.url}/#website`;

export function buildJsonLd(page: PageDef): Record<string, unknown> {
  const url = absoluteUrl(pathOf(page.slug));
  const graph: Record<string, unknown>[] = [
    {
      "@type": "Organization",
      "@id": ORG_ID,
      name: SITE.name,
      url: `${SITE.url}/`,
      logo: { "@type": "ImageObject", url: `${SITE.url}/icon.svg` },
      email: SITE.contactEmail,
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer support",
        email: SITE.contactEmail,
        availableLanguage: "English",
      },
    },
    {
      "@type": "WebSite",
      "@id": SITE_ID,
      url: `${SITE.url}/`,
      name: SITE.name,
      description: SITE.tagline,
      inLanguage: "en",
      publisher: { "@id": ORG_ID },
    },
    {
      "@type": page.kind === "hub" ? "CollectionPage" : "WebPage",
      "@id": `${url}#webpage`,
      url,
      name: page.title,
      description: page.description,
      isPartOf: { "@id": SITE_ID },
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
      publisher: { "@id": ORG_ID },
    });
  }

  if (page.kind === "guide") {
    graph.push({
      "@type": "Article",
      "@id": `${url}#article`,
      headline: page.h1,
      description: page.description,
      mainEntityOfPage: { "@id": `${url}#webpage` },
      image: `${SITE.url}/og.png`,
      datePublished: SITE.lastUpdatedIso,
      dateModified: SITE.lastUpdatedIso,
      author: { "@id": ORG_ID },
      publisher: { "@id": ORG_ID },
      inLanguage: "en",
    });
  }

  if (page.kind === "hub") {
    const items = page.slug === "calculators" ? TOOL_PAGES : GUIDE_PAGES;
    graph.push({
      "@type": "ItemList",
      itemListElement: items.map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: absoluteUrl(pathOf(p.slug)),
        name: p.navLabel,
      })),
    });
  }

  const trail = trailFor(page);
  if (trail.length > 0) {
    graph.push({
      "@type": "BreadcrumbList",
      itemListElement: trail.map((c, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: c.label,
        item: c.href ? absoluteUrl(c.href) : url,
      })),
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
