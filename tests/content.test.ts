import { describe, expect, it } from "vitest";
import { ALL_PAGES, plain } from "../src/lib/seo";
import { CALCULATOR_PAGES, type Block } from "../src/lib/pages";
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
