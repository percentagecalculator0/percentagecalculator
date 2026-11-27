import { BLURBS } from "./blurbs";
import { NOINDEX } from "./indexing";
import { LEGAL_PAGES } from "./legal";
import { POST_PAGES, HUB_PAGES, TOOL_PAGES, pathOf, type Block, type PageDef } from "./pages";
import { SITE, absoluteUrl } from "./site";

/** Turn [text](/path) into [text](https://domain/path) and plain text otherwise. */
function abs(text: string): string {
  return text.replace(/\]\((\/[^)\s]*)\)/g, (_m, p: string) => `](${absoluteUrl(p)})`);
}

function line(p: PageDef): string {
  const blurb = BLURBS[p.slug] ?? p.description;
  return `- [${p.navLabel}](${absoluteUrl(pathOf(p.slug))}): ${blurb}`;
}

const INTRO =
  "Free percentage calculators and a blog of explainers. Every calculator shows the formula and each step of the working, runs in the browser, and is covered by automated tests.";

/** The short /llms.txt index, following the llmstxt.org format. */
export function buildLlmsTxt(): string {
  if (NOINDEX) return `# ${SITE.name}\n\n> This site is not open to indexing yet.\n`;
  const home = TOOL_PAGES.find((p) => p.slug === "");
  const tools = TOOL_PAGES.filter((p) => p.slug !== "");
  const out: string[] = [];
  out.push(`# ${SITE.name}`, "", `> ${INTRO}`, "");
  out.push(
    `${SITE.domain} explains and calculates percentage increase, decrease, change, difference, reverse percentages, percentages of a number, growth rates (CAGR) and real salary raises. Content is in English. Formulas are listed on the methodology page.`,
    "",
  );
  out.push("## Main calculator", "", ...(home ? [line(home)] : []), "");
  out.push("## Other calculators", "", ...tools.map(line), "");
  out.push("## Blog", "", ...POST_PAGES.map(line), "");
  out.push("## Site information", "");
  for (const p of [...HUB_PAGES, ...LEGAL_PAGES]) out.push(line(p));
  out.push("", "## Optional", "", `- [Full text of every page](${SITE.url}/llms-full.txt): all pages in one Markdown file`, "");
  return out.join("\n");
}

function blockToMd(b: Block): string {
  switch (b.t) {
    case "p":
      return abs(b.text);
    case "ul":
      return b.items.map((i) => `- ${abs(i)}`).join("\n");
    case "ol":
      return b.items.map((i, n) => `${n + 1}. ${abs(i)}`).join("\n");
    case "formula":
      return [b.title ? `**${b.title}**` : "", ...b.lines.map((l) => `    ${l}`), b.note ? abs(b.note) : ""]
        .filter(Boolean)
        .join("\n");
    case "table": {
      const head = `| ${b.head.join(" | ")} |`;
      const sep = `| ${b.head.map(() => "---").join(" | ")} |`;
      const rows = b.rows.map((r) => `| ${r.join(" | ")} |`);
      return [`${b.caption}`, "", head, sep, ...rows].join("\n");
    }
  }
}

/** The long /llms-full.txt file: every page as Markdown. */
export function buildLlmsFullTxt(): string {
  if (NOINDEX) return buildLlmsTxt();
  const pages = [...TOOL_PAGES, ...POST_PAGES, ...HUB_PAGES, ...LEGAL_PAGES];
  const out: string[] = [`# ${SITE.name}`, "", `> ${INTRO}`, ""];
  for (const p of pages) {
    out.push(`## ${p.h1}`, "", `URL: ${absoluteUrl(pathOf(p.slug))}`, `Last updated: ${SITE.lastUpdated}`, "", abs(p.lead), "");
    for (const s of p.sections) {
      out.push(`### ${s.h2}`, "");
      for (const b of s.blocks) out.push(blockToMd(b), "");
    }
    if (p.faq?.length) {
      out.push("### Frequently asked questions", "");
      for (const f of p.faq) out.push(`**${f.q}**`, "", f.a, "");
    }
  }
  return out.join("\n");
}
