// Input parsing and number formatting. Locale-aware, but never changes the maths.
export type ParseResult = { ok: true; value: number } | { ok: false; error: "empty" | "invalid" | "tooLarge" };

export const MAX_ABS = 1e15;

const LATIN = "0123456789";
function toLatinDigits(s: string): string {
  return s
    .replace(/[\u0660-\u0669]/g, (c) => LATIN[c.charCodeAt(0) - 0x0660])
    .replace(/[\u06F0-\u06F9]/g, (c) => LATIN[c.charCodeAt(0) - 0x06f0])
    .replace(/[\u0966-\u096F]/g, (c) => LATIN[c.charCodeAt(0) - 0x0966])
    .replace(/\u066B/g, ".") // Arabic decimal separator
    .replace(/\u066C/g, ","); // Arabic thousands separator
}

function separators(locale: string): { decimal: string; group: string } {
  const parts = new Intl.NumberFormat(`${locale}-u-nu-latn`).formatToParts(11111.1);
  return {
    decimal: parts.find((p) => p.type === "decimal")?.value ?? ".",
    group: (parts.find((p) => p.type === "group")?.value ?? ",").replace(/[\u00a0\u202f]/g, " "),
  };
}

export function parseNumber(raw: string, locale = "en"): ParseResult {
  let s = toLatinDigits(raw).replace(/[\u200b-\u200f\u202a-\u202e\u2060\ufeff]/g, "").trim();
  if (s === "") return { ok: false, error: "empty" };
  s = s.replace(/[\u00a0\u202f]/g, " ").replace(/\u2212/g, "-"); // nbsp -> space, unicode minus -> "-"
  const { decimal, group } = separators(locale);
  // Remove group separators only when they sit in valid thousands positions.
  const g = group === " " ? " " : group.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const dec = decimal.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const grouped = new RegExp(`^[+-]?\\d{1,3}(${g}\\d{3})+(${dec}\\d+)?$`);
  // Indian digit grouping (12,34,567) is also accepted, since it is the norm for Hindi readers.
  const indian = new RegExp(`^[+-]?\\d{1,2}(${g}\\d{2})*${g}\\d{3}(${dec}\\d+)?$`);
  if (grouped.test(s) || indian.test(s)) s = s.split(group).join("");
  else if (s.includes(" ")) return { ok: false, error: "invalid" };
  if (decimal !== ".") {
    if (s.includes(".")) return { ok: false, error: "invalid" };
    s = s.replace(decimal, ".");
  }
  if (!/^[+-]?(\d+\.?\d*|\.\d+)$/.test(s)) return { ok: false, error: "invalid" };
  const value = Number(s);
  if (!Number.isFinite(value)) return { ok: false, error: "invalid" };
  if (Math.abs(value) > MAX_ABS) return { ok: false, error: "tooLarge" };
  return { ok: true, value: value === 0 ? 0 : value };
}

export function formatNumber(n: number, locale = "en", maxFraction = 4): string {
  const out = new Intl.NumberFormat(`${locale}-u-nu-latn`, { maximumFractionDigits: maxFraction }).format(n);
  // Intl can print "-0" for tiny negatives that round to zero.
  return /^[-\u2212]0([.,]0+)?$/.test(out) ? out.replace(/^[-\u2212]/, "") : out;
}

export function fill(template: string, vars: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/g, (_, k: string) => vars[k] ?? "");
}
