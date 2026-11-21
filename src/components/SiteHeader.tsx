import Link from "next/link";
import NavTabs from "./NavTabs";
import { LEGAL_NAV, SITE } from "@/lib/site";

export default function SiteHeader() {
  return (
    <header className="site-header">
      <div className="wrap header-top">
        <Link href="/" className="brand">
          <span className="brand-mark" aria-hidden="true">%</span>
          <span>{SITE.name}</span>
        </Link>
        <nav className="utility" aria-label="Site pages">
          <ul>
            <li>
              <Link href="/">Home</Link>
            </li>
            {LEGAL_NAV.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="wrap">
        <NavTabs />
      </div>
    </header>
  );
}
