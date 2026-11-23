import Link from "next/link";
import type { Crumb } from "@/lib/seo";

export default function Breadcrumbs({ trail }: { trail: Crumb[] }) {
  if (trail.length === 0) return null;
  return (
    <nav className="crumbs" aria-label="Breadcrumb">
      <ol>
        {trail.map((c, i) =>
          c.href ? (
            <li key={c.label}>
              <Link href={c.href}>{c.label}</Link>
            </li>
          ) : (
            <li key={c.label} aria-current={i === trail.length - 1 ? "page" : undefined}>
              {c.label}
            </li>
          ),
        )}
      </ol>
    </nav>
  );
}
