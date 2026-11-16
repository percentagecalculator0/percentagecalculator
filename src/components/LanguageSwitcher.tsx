"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export type LocaleItem = { code: string; hreflang: string; nativeName: string };

export function rememberLanguage(code: string) {
  try {
    const secure = location.protocol === "https:" ? "; Secure" : "";
    document.cookie = `pic_lang=${encodeURIComponent(code)}; Path=/; Max-Age=31536000; SameSite=Lax${secure}`;
  } catch { /* cookies blocked: switching still works, it just won't be remembered */ }
}

export default function LanguageSwitcher({ locales, current, label }: { locales: LocaleItem[]; current: string; label: string }) {
  const pathname = usePathname() || `/${current}`;
  const rest = pathname.replace(/^\/[^/]+/, "");
  const active = locales.find((l) => l.code === current);
  return (
    <details className="lang">
      <summary aria-label={`${label}: ${active?.nativeName ?? current}`}>{label}: {active?.nativeName}</summary>
      <ul>
        {locales.map((l) => (
          <li key={l.code}>
            <Link href={`/${l.code}${rest}`} hrefLang={l.hreflang} lang={l.hreflang} prefetch={false}
              aria-current={l.code === current ? "true" : undefined} onClick={() => rememberLanguage(l.code)}>
              {l.nativeName}
            </Link>
          </li>
        ))}
      </ul>
    </details>
  );
}
