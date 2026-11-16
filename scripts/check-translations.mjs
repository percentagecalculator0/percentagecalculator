// Fails if any translation file is missing keys, has extra keys, a different array length,
// or different {placeholders} than en.json. Run: npm run check:i18n
import { readFileSync, readdirSync } from "node:fs";
const dir = new URL("../src/messages/", import.meta.url);
const read = (f) => JSON.parse(readFileSync(new URL(f, dir), "utf8"));
const en = read("en.json");

function walk(a, b, path, errs) {
  if (typeof a === "string") {
    if (typeof b !== "string") return errs.push(`${path}: expected string`);
    const ph = (s) => [...s.matchAll(/\{(\w+)\}/g)].map((m) => m[1]).sort().join(",");
    if (ph(a) !== ph(b)) errs.push(`${path}: placeholders differ (en: ${ph(a) || "none"}, here: ${ph(b) || "none"})`);
  } else if (Array.isArray(a)) {
    if (!Array.isArray(b) || a.length !== b.length) return errs.push(`${path}: array length differs`);
    a.forEach((x, i) => walk(x, b[i], `${path}[${i}]`, errs));
  } else if (a && typeof a === "object") {
    if (!b || typeof b !== "object") return errs.push(`${path}: expected object`);
    for (const k of Object.keys(a)) k in b ? walk(a[k], b[k], `${path}.${k}`, errs) : errs.push(`${path}.${k}: missing`);
    for (const k of Object.keys(b)) if (!(k in a)) errs.push(`${path}.${k}: extra key`);
  }
}
let failed = false;
for (const f of readdirSync(dir).filter((f) => f.endsWith(".json") && f !== "en.json")) {
  const data = read(f);
  if (Object.keys(data).length === 0) { console.log(`- ${f}: empty (not translated yet, skipped)`); continue; }
  const errs = []; walk(en, data, f, errs);
  if (errs.length) { failed = true; console.log(`FAIL ${f}\n  ` + errs.join("\n  ")); } else console.log(`OK   ${f}`);
}
process.exit(failed ? 1 : 0);
