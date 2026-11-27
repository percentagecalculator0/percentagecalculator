"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { BLOG_NAV, CALCULATOR_NAV, LEGAL_NAV, SITE } from "@/lib/site";

const CALC_HREFS = CALCULATOR_NAV.map((t) => t.href).concat("/calculators");
const BLOG_HREFS = BLOG_NAV.map((t) => t.href).concat("/blog");

export default function SiteHeader() {
  const pathname = usePathname() ?? "/";
  const [menuOpen, setMenuOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const ddRef = useRef<HTMLLIElement>(null);

  // Close menus whenever the page changes.
  useEffect(() => {
    setMenuOpen(false);
    setToolsOpen(false);
  }, [pathname]);

  // Close the dropdown on outside click or Escape.
  useEffect(() => {
    if (!toolsOpen) return;
    const onDown = (e: MouseEvent) => {
      if (ddRef.current && !ddRef.current.contains(e.target as Node)) setToolsOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setToolsOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [toolsOpen]);

  const cur = (href: string) => (pathname === href ? ("page" as const) : undefined);
  const calcActive = CALC_HREFS.includes(pathname);
  const blogActive = BLOG_HREFS.includes(pathname);

  return (
    <header className="site-header">
      <div className="wrap wrap-wide header-bar">
        <Link href="/" className="brand">
          <span className="brand-mark" aria-hidden="true">%</span>
          <span>{SITE.name}</span>
        </Link>

        <nav className="nav-desktop" aria-label="Main">
          <ul>
            <li>
              <Link href="/" aria-current={cur("/")}>
                Home
              </Link>
            </li>
            <li className="dd" ref={ddRef}>
              <button
                type="button"
                className={calcActive ? "dd-btn is-active" : "dd-btn"}
                aria-expanded={toolsOpen}
                aria-haspopup="true"
                onClick={() => setToolsOpen((o) => !o)}
              >
                Calculators <span className="caret" aria-hidden="true" />
              </button>
              {toolsOpen && (
                <div className="dd-menu">
                  <ul>
                    <li>
                      <Link href="/calculators" aria-current={cur("/calculators")} className="dd-all">
                        All calculators
                      </Link>
                    </li>
                    {CALCULATOR_NAV.map((t) => (
                      <li key={t.href}>
                        <Link href={t.href} aria-current={cur(t.href)}>
                          {t.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
            <li>
              <Link href="/blog" aria-current={blogActive ? "page" : undefined}>
                Blog
              </Link>
            </li>
            {LEGAL_NAV.map((item) => (
              <li key={item.href}>
                <Link href={item.href} aria-current={cur(item.href)}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          className="menu-toggle"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((o) => !o)}
        >
          {menuOpen ? "Close" : "Menu"}
          <span className="burger" aria-hidden="true" />
        </button>
      </div>

      {menuOpen && (
        <nav className="mobile-menu" aria-label="Mobile menu">
          <div className="wrap wrap-wide">
            <ul>
              <li>
                <Link href="/" aria-current={cur("/")}>
                  Home
                </Link>
              </li>
            </ul>
            <p className="mobile-group">Calculators</p>
            <ul>
              <li>
                <Link href="/calculators" aria-current={cur("/calculators")}>
                  All calculators
                </Link>
              </li>
              {CALCULATOR_NAV.map((t) => (
                <li key={t.href}>
                  <Link href={t.href} aria-current={cur(t.href)}>
                    {t.label}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mobile-group">Blog</p>
            <ul>
              <li>
                <Link href="/blog" aria-current={cur("/blog")}>
                  All posts
                </Link>
              </li>
              {BLOG_NAV.map((t) => (
                <li key={t.href}>
                  <Link href={t.href} aria-current={cur(t.href)}>
                    {t.label}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mobile-group">Site</p>
            <ul>
              {LEGAL_NAV.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} aria-current={cur(item.href)}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      )}
    </header>
  );
}
