import Link from "next/link";
import { CALCULATOR_NAV, BLOG_NAV, LEGAL_NAV, METHODOLOGY_NAV, SITE } from "@/lib/site";

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="wrap footer-grid">
        <div>
          <p className="footer-title">Calculators</p>
          <ul>
            <li>
              <Link href="/calculators">All calculators</Link>
            </li>
            {CALCULATOR_NAV.map((i) => (
              <li key={i.href}>
                <Link href={i.href}>{i.label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="footer-title">Blog</p>
          <ul>
            <li>
              <Link href="/blog">All posts</Link>
            </li>
            {BLOG_NAV.map((i) => (
              <li key={i.href}>
                <Link href={i.href}>{i.label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="footer-title">Site</p>
          <ul>
            <li>
              <Link href="/">Home</Link>
            </li>
            {LEGAL_NAV.map((i) => (
              <li key={i.href}>
                <Link href={i.href}>{i.label}</Link>
              </li>
            ))}
            <li>
              <Link href={METHODOLOGY_NAV.href}>{METHODOLOGY_NAV.label}</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="wrap footer-base">
        <p>
          © {new Date().getFullYear()} {SITE.domain}
        </p>
      </div>
    </footer>
  );
}
