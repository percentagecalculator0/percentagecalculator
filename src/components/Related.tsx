import Link from "next/link";
import { BLURBS } from "@/lib/blurbs";
import { getAnyPage } from "@/lib/seo";
import { pathOf } from "@/lib/pages";

export default function Related({ slugs, heading }: { slugs: string[]; heading: string }) {
  const pages = slugs
    .map((s) => getAnyPage(s))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));
  if (pages.length === 0) return null;
  return (
    <section className="related" aria-labelledby="related-title">
      <h2 id="related-title">{heading}</h2>
      <ul>
        {pages.map((p) => (
          <li key={p.slug}>
            <Link href={pathOf(p.slug)}>
              <span className="related-title">{p.navLabel}</span>
              <span className="related-text">{BLURBS[p.slug] ?? p.lead}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
