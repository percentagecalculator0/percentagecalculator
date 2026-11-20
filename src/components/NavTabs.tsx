"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CALCULATOR_NAV, GUIDE_NAV } from "@/lib/site";

export default function NavTabs() {
  const pathname = usePathname() ?? "/";
  const items = [...CALCULATOR_NAV, ...GUIDE_NAV];
  return (
    <nav className="tabs" aria-label="Calculators">
      <ul>
        {items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              aria-current={pathname === item.href ? "page" : undefined}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
