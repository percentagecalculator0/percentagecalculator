// Run after "next build". Fails if any page links to another website
// or to an internal page that does not exist.
import { readdirSync, readFileSync, existsSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const root = new URL("..", import.meta.url).pathname;
const appDir = join(root, ".next", "server", "app");

if (!existsSync(appDir)) {
  console.error("No build output found. Run `npm run build` first.");
  process.exit(1);
}

function walk(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) out.push(...walk(p));
    else if (name.endsWith(".html")) out.push(p);
  }
  return out;
}

const files = walk(appDir).filter((f) => !/_not-found|_global-error/.test(f));
const routes = new Set(["/sitemap.xml", "/robots.txt", "/manifest.webmanifest", "/icon.svg", "/ads.txt", "/og.png", "/llms.txt", "/llms-full.txt"]);
for (const f of files) {
  let r = "/" + relative(appDir, f).replace(/\\/g, "/").replace(/\.html$/, "");
  if (r === "/index") r = "/";
  routes.add(r);
}

const problems = [];
let linkCount = 0;
for (const f of files) {
  const html = readFileSync(f, "utf8");
  const page = "/" + relative(appDir, f).replace(/\\/g, "/").replace(/\.html$/, "");
  for (const m of html.matchAll(/<a\s[^>]*?href="([^"]*)"/g)) {
    const href = m[1].replace(/&amp;/g, "&");
    linkCount++;
    if (/^(https?:)?\/\//i.test(href)) {
      problems.push(`${page}: EXTERNAL LINK -> ${href}`);
      continue;
    }
    if (/^(mailto:|tel:|#)/i.test(href)) continue;
    if (href.startsWith("/")) {
      const clean = href.split("#")[0].split("?")[0] || "/";
      if (!routes.has(clean)) problems.push(`${page}: BROKEN INTERNAL LINK -> ${href}`);
    } else {
      problems.push(`${page}: RELATIVE LINK (use absolute paths) -> ${href}`);
    }
  }
}

console.log(`Checked ${files.length} pages and ${linkCount} links.`);
if (problems.length) {
  console.error("\nLink check FAILED:\n" + problems.map((p) => " - " + p).join("\n"));
  process.exit(1);
}
console.log("Link check passed: no external links, no broken internal links.");
