import Link from "next/link";
import NavTabs from "./NavTabs";
import { SITE } from "@/lib/site";

export default function SiteHeader() {
  return (
    <header className="site-header">
      <div className="wrap header-top">
        <Link href="/" className="brand">
          <span className="brand-mark" aria-hidden="true">%</span>
          <span>{SITE.name}</span>
        </Link>
      </div>
      <div className="wrap">
        <NavTabs />
      </div>
    </header>
  );
}
