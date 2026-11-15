"use client";

// Small, dismissible suggestion. Never redirects. Never blocks content.
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { rememberLanguage } from "@/components/LanguageSwitcher";
import { fill } from "@/lib/format";

export type BannerStrings = Record<string, { text: string; go: string; dismiss: string; name: string; hreflang: string }>;

const readCookie = (name: string): string | null => {
  const m = document.cookie.split("; ").find((c) => c.startsWith(`${name}=`));
  return m ? decodeURIComponent(m.split("=")[1]) : null;
};

export default function LanguageSuggestion({ current, strings }: { current: string; strings: BannerStrings }) {
  const pathname = usePathname() || "";
  const [target, setTarget] = useState<string | null>(null);

  useEffect(() => {
    try {
      if (readCookie("pic_lang_dismiss")) return;
      let pref = readCookie("pic_lang");
      if (!pref || !strings[pref]) {
        pref = null;
        for (const l of navigator.languages?.length ? navigator.languages : [navigator.language]) {
          const base = l.toLowerCase().split("-")[0];
          if (strings[base]) { pref = base; break; }
        }
      }
      if (pref && pref !== current) setTarget(pref);
    } catch { /* ignore */ }
  }, [current, strings]);

  if (!target) return null;
  const s = strings[target];
  const rest = pathname.replace(/^\/[^/]+/, "");
  const dismiss = () => {
    try { document.cookie = "pic_lang_dismiss=1; Path=/; Max-Age=2592000; SameSite=Lax"; } catch { /* ignore */ }
    setTarget(null);
  };
  return (
    <div className="langbar" role="region" aria-label={fill(s.text, { language: s.name })} lang={s.hreflang}>
      <span>{fill(s.text, { language: s.name })}</span>
      <Link className="btn small" href={`/${target}${rest}`} hrefLang={s.hreflang} prefetch={false} onClick={() => rememberLanguage(target)}>{s.go}</Link>
      <button type="button" className="btn small secondary" onClick={dismiss}>{s.dismiss}</button>
    </div>
  );
}
