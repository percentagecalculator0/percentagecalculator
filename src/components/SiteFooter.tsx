import Link from "next/link";
import { CALCULATOR_NAV, GUIDE_NAV, LEGAL_NAV, SITE } from "@/lib/site";

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="wrap footer-grid">
        <div>
          <p className="footer-title">Calculators</p>
          <ul>
            {CALCULATOR_NAV.map((i) => (
              <li key={i.href}>
                <Link href={i.href}>{i.label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="footer-title">Guides</p>
          <ul>
            {GUIDE_NAV.map((i) => (
              <li key={i.href}>
                <Link href={i.href}>{i.label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="footer-title">Site</p>
          <ul>
            {LEGAL_NAV.map((i) => (
              <li key={i.href}>
                <Link href={i.href}>{i.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="wrap footer-base">
        <p>
          © {new Date().getFullYear()} {SITE.domain}. {SITE.tagline}
        </p>
      </div>
    </footer>
  );
}
