import type { Metadata } from "next";
import Link from "next/link";
import { CALCULATOR_NAV } from "@/lib/site";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main id="main" className="wrap page">
      <header className="hero">
        <h1>Page not found</h1>
        <p className="lead">
          That address doesn’t exist on this site. It may have been typed wrongly or moved. Pick a calculator below to carry on.
        </p>
      </header>
      <section className="related" aria-labelledby="nf-title">
        <h2 id="nf-title">Calculators</h2>
        <ul>
          {CALCULATOR_NAV.map((i) => (
            <li key={i.href}>
              <Link href={i.href}>
                <span className="related-title">{i.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
