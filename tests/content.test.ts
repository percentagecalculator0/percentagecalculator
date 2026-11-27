import { describe, expect, it } from "vitest";
import { ALL_PAGES, plain, trailFor } from "../src/lib/seo";
import { CALCULATOR_PAGES, POST_PAGES, TOOL_PAGES, pathOf, type Block } from "../src/lib/pages";
import { CALCULATOR_NAV, BLOG_NAV, LEGAL_NAV, METHODOLOGY_NAV, absoluteUrl } from "../src/lib/site";
import { buildLlmsFullTxt, buildLlmsTxt } from "../src/lib/llms";
import { fmt, solve, type Mode } from "../src/lib/solve";

const slugs = new Set(ALL_PAGES.map((p) => p.slug));

function allText(): string[] {
  const out: string[] = [];
  for (const p of ALL_PAGES) {
    out.push(p.title, p.description, p.h1, p.lead);
    for (const s of p.sections) {
      out.push(s.h2);
      for (const b of s.blocks) {
        if (b.t === "p") out.push(b.text);
        if (b.t === "ul" || b.t === "ol") out.push(...b.items);
        if (b.t === "formula") out.push(...b.lines, b.note ?? "", b.title ?? "");
        if (b.t === "table") out.push(b.caption, ...b.head, ...b.rows.flat());
      }
    }
    for (const f of p.faq ?? []) out.push(f.q, f.a);
  }
  return out;
}

describe("content rules", () => {
  it("has unique, well-sized titles and descriptions", () => {
    const titles = new Set<string>();
    const descs = new Set<string>();
    for (const p of ALL_PAGES) {
      expect(p.title.length, p.slug).toBeLessThanOrEqual(62);
      expect(p.title.length, p.slug).toBeGreaterThanOrEqual(20);
      expect(p.description.length, p.slug).toBeLessThanOrEqual(165);
      expect(p.description.length, p.slug).toBeGreaterThanOrEqual(70);
      expect(titles.has(p.title), `dup title ${p.title}`).toBe(false);
      expect(descs.has(p.description), `dup description ${p.slug}`).toBe(false);
      titles.add(p.title);
      descs.add(p.description);
    }
  });

  it("has unique slugs", () => {
    expect(slugs.size).toBe(ALL_PAGES.length);
  });

  it("contains no external links or raw URLs", () => {
    for (const t of allText()) {
      expect(t, t).not.toMatch(/https?:\/\//i);
      expect(t, t).not.toMatch(/\]\((?!\/)/);
      expect(t, t).not.toMatch(/\bwww\./i);
    }
  });

  it("only links to pages that exist", () => {
    for (const t of allText()) {
      for (const m of t.matchAll(/\]\((\/[^)\s]*)\)/g)) {
        const slug = m[1] === "/" ? "" : m[1].slice(1);
        expect(slugs.has(slug), `broken link ${m[1]}`).toBe(true);
      }
    }
  });

  it("has valid related-page references", () => {
    for (const p of ALL_PAGES) {
      for (const r of p.related) expect(slugs.has(r), `${p.slug} -> ${r}`).toBe(true);
      expect(p.related).not.toContain(p.slug);
    }
  });

  it("FAQ plain text has no link markup", () => {
    for (const p of ALL_PAGES) for (const f of p.faq ?? []) expect(plain(f.a)).not.toMatch(/\]\(/);
  });
});

describe("llms.txt", () => {
  it("lists every page once in the short index", () => {
    const txt = buildLlmsTxt();
    expect(txt.startsWith("# ")).toBe(true);
    expect(txt).toMatch(/^> /m);
    for (const p of ALL_PAGES) {
      const url = absoluteUrl(pathOf(p.slug));
      expect(txt.split(url + ")").length - 1, `llms.txt entry for ${url}`).toBe(1);
    }
  });
  it("contains the full text of every page", () => {
    const txt = buildLlmsFullTxt();
    for (const p of ALL_PAGES) expect(txt).toContain(`## ${p.h1}`);
    expect(txt).not.toMatch(/\]\(\/[^)]*\)/); // all links are absolute
  });
});

describe("site structure", () => {
  const hrefs = (xs: { href: string }[]) => xs.map((x) => x.href);

  it("menus list exactly the calculator and blog pages, in order", () => {
    // The homepage is the percentage increase calculator, so it is not repeated in the list.
    const tools = TOOL_PAGES.filter((p) => p.slug !== "");
    expect(hrefs(CALCULATOR_NAV)).toEqual(tools.map((p) => pathOf(p.slug)));
    expect(hrefs(CALCULATOR_NAV)).not.toContain("/");
    expect(hrefs(BLOG_NAV)).toEqual(POST_PAGES.map((p) => pathOf(p.slug)));
    expect(CALCULATOR_NAV.map((n) => n.label)).toEqual(tools.map((p) => p.navLabel));
    expect(BLOG_NAV.map((n) => n.label)).toEqual(POST_PAGES.map((p) => p.navLabel));
  });

  it("header links cover the pages AdSense reviewers look for", () => {
    const labels = LEGAL_NAV.map((l) => l.label);
    for (const want of ["About", "Contact", "Privacy Policy", "Terms of Use", "Disclaimer"]) {
      expect(labels).toContain(want);
    }
    expect(METHODOLOGY_NAV.href).toBe("/methodology");
  });

  it("every page can be reached from the menus or from another page", () => {
    const linked = new Set<string>(["", "calculators", "blog", "methodology"]);
    for (const n of [...CALCULATOR_NAV, ...BLOG_NAV, ...LEGAL_NAV]) linked.add(n.href === "/" ? "" : n.href.slice(1));
    for (const p of ALL_PAGES) for (const r of p.related) linked.add(r);
    for (const p of ALL_PAGES) expect(linked.has(p.slug), `orphan page: ${p.slug}`).toBe(true);
  });

  it("breadcrumb trails end on the current page and start at Home", () => {
    for (const p of ALL_PAGES) {
      const t = trailFor(p);
      if (p.slug === "") {
        expect(t).toEqual([]);
        continue;
      }
      expect(t[0].label).toBe("Home");
      expect(t[t.length - 1].href).toBeUndefined();
      expect(t[t.length - 1].label).toBe(p.navLabel);
    }
  });

  it("has enough real content on every content page", () => {
    const words = (p: (typeof ALL_PAGES)[number]) => {
      let n = p.lead.split(/\s+/).length;
      for (const s of p.sections)
        for (const b of s.blocks) {
          if (b.t === "p") n += plain(b.text).split(/\s+/).length;
          if (b.t === "ul" || b.t === "ol") n += b.items.join(" ").split(/\s+/).length;
          if (b.t === "formula") n += (b.lines.join(" ") + (b.note ?? "")).split(/\s+/).length;
          if (b.t === "table") n += b.rows.flat().join(" ").split(/\s+/).length;
        }
      for (const f of p.faq ?? []) n += (f.q + " " + f.a).split(/\s+/).length;
      return n;
    };
    for (const p of ALL_PAGES) {
      const min = p.slug === "" ? 1300 : p.kind === "calculator" ? 750 : p.kind === "post" ? 740 : p.kind === "hub" ? 130 : 0;
      expect(words(p), `${p.slug || "home"} word count`).toBeGreaterThanOrEqual(min);
    }
  });
});

/** Every worked-example table must agree with the calculator code. */
describe("worked examples match the calculators", () => {
  const num = (s: string) => Number(s.replace(/[,%+]/g, "").replace("\u2212", "-"));
  const approx = (a: number, b: number, d = 2) => Math.abs(a - b) < 0.5 * Math.pow(10, -d) + 1e-9;

  for (const page of CALCULATOR_PAGES) {
    const mode = page.mode as Mode | undefined;
    if (!mode) continue;
    const tables = page.sections.flatMap((s) => s.blocks).filter((b): b is Extract<Block, { t: "table" }> => b.t === "table");
    for (const t of tables) {
      if (!/examples/i.test(t.caption) && !/increase and decrease|multiplier/i.test(t.caption)) continue;
      if (/multiplier/i.test(t.caption)) continue;
      it(`${page.slug || "home"}: ${t.caption}`, () => {
        for (const row of t.rows) {
          if (mode === "increase" || mode === "decrease" || mode === "change") {
            const s = solve(mode, { a: row[0], b: row[1] });
            expect(s.status).toBe("ok");
            if (s.status === "ok") {
              const want = num(row[row.length - 1]);
              const got = num(s.display);
              const same = mode === "change" ? approx(got, want) : approx(Math.abs(got), Math.abs(want));
              expect(same, row.join(",")).toBe(true);
            }
          } else if (mode === "difference") {
            const s = solve(mode, { a: row[0], b: row[1] });
            expect(s.status).toBe("ok");
            if (s.status === "ok") expect(approx(num(s.display), num(row[row.length - 1]), 2), row.join(",")).toBe(true);
          } else if (mode === "add-percent") {
            const dir = row[1].startsWith("+") ? "increase" : "decrease";
            const s = solve(mode, { a: row[0], p: row[1].replace(/[+\u2212]/g, ""), dir });
            expect(s.status).toBe("ok");
            if (s.status === "ok") expect(s.display).toBe(fmt(num(row[2])));
          } else if (mode === "percent-of") {
            const s = solve(mode, { p: row[0], a: row[1] });
            expect(s.status).toBe("ok");
            if (s.status === "ok") expect(s.display).toBe(fmt(num(row[2])));
          } else if (mode === "what-percent") {
            const s = solve(mode, { a: row[0], b: row[1] });
            expect(s.status).toBe("ok");
            if (s.status === "ok") expect(approx(num(s.display), num(row[2]), 2), row.join(",")).toBe(true);
          } else if (mode === "growth") {
            const s = solve(mode, { a: row[0], b: row[1], n: row[2] });
            expect(s.status).toBe("ok");
            if (s.status === "ok") expect(approx(num(s.display), num(row[3]), 2), row.join(",")).toBe(true);
          } else if (mode === "real-raise") {
            const s = solve(mode, { a: row[0], b: row[1], p: row[2] });
            expect(s.status).toBe("ok");
            if (s.status === "ok") expect(approx(num(s.display), num(row[3]), 2), row.join(",")).toBe(true);
          } else if (mode === "reverse") {
            const dir = row[1].startsWith("+") ? "increase" : "decrease";
            const s = solve(mode, { a: row[0], p: row[1].replace(/[+\u2212]/g, ""), dir });
            expect(s.status).toBe("ok");
            if (s.status === "ok") expect(s.display).toBe(fmt(num(row[2])));
          }
        }
      });
    }
  }
});
