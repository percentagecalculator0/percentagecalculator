import { describe, expect, it } from "vitest";
import {
  applyPercent,
  fmt,
  parseNumber,
  percentChange,
  percentDifference,
  reversePercent,
  solve,
} from "../src/lib/solve";

describe("parseNumber", () => {
  it("handles empty input", () => {
    expect(parseNumber("")).toEqual({ kind: "empty" });
    expect(parseNumber("   ")).toEqual({ kind: "empty" });
  });
  it("parses plain, decimal and negative numbers", () => {
    expect(parseNumber("120")).toEqual({ kind: "num", value: 120 });
    expect(parseNumber("3.5")).toEqual({ kind: "num", value: 3.5 });
    expect(parseNumber(".5")).toEqual({ kind: "num", value: 0.5 });
    expect(parseNumber("-40")).toEqual({ kind: "num", value: -40 });
    expect(parseNumber("+7")).toEqual({ kind: "num", value: 7 });
  });
  it("accepts thousands separators only in the right places", () => {
    expect(parseNumber("1,200")).toEqual({ kind: "num", value: 1200 });
    expect(parseNumber("1,200,000.5")).toEqual({ kind: "num", value: 1200000.5 });
    expect(parseNumber("1,2").kind).toBe("bad");
    expect(parseNumber("12,34").kind).toBe("bad");
  });
  it("rejects letters, symbols and scientific notation", () => {
    for (const bad of ["abc", "12abc", "1e5", "--5", "5-", "$5", "1 000", "Infinity", "NaN", "1.2.3"]) {
      expect(parseNumber(bad).kind, bad).toBe("bad");
    }
  });
  it("rejects numbers that are too large", () => {
    expect(parseNumber("1000000000000001").kind).toBe("bad");
    expect(parseNumber("1".repeat(400)).kind).toBe("bad");
  });
  it("allows a trailing % only when asked", () => {
    expect(parseNumber("15%").kind).toBe("bad");
    expect(parseNumber("15%", true)).toEqual({ kind: "num", value: 15 });
  });
  it("never returns negative zero", () => {
    const r = parseNumber("-0");
    expect(r.kind === "num" && Object.is(r.value, 0)).toBe(true);
  });
});

describe("formulas", () => {
  it("percentChange", () => {
    expect(percentChange(80, 100)).toBeCloseTo(25, 10);
    expect(percentChange(100, 80)).toBeCloseTo(-20, 10);
    expect(percentChange(50, 60)).toBeCloseTo(20, 10);
    expect(percentChange(75, 99)).toBeCloseTo(32, 10);
    expect(percentChange(12, 30)).toBeCloseTo(150, 10);
    expect(percentChange(0, 10)).toBeNull();
    expect(percentChange(-50, -25)).toBeCloseTo(50, 10);
  });
  it("percentDifference", () => {
    expect(percentDifference(80, 100)).toBeCloseTo(22.2222222, 5);
    expect(percentDifference(50, 70)).toBeCloseTo(33.3333333, 5);
    expect(percentDifference(10, 30)).toBeCloseTo(100, 10);
    expect(percentDifference(200, 220)).toBeCloseTo(9.5238095, 5);
    expect(percentDifference(0, 0)).toBe(0);
    expect(percentDifference(5, -5)).toBeNull();
    expect(percentDifference(10, 0)).toBeCloseTo(200, 10);
    expect(percentDifference(80, 100)).toBeCloseTo(percentDifference(100, 80) as number, 10);
  });
  it("applyPercent", () => {
    expect(applyPercent(200, 15, "increase")).toBeCloseTo(230, 10);
    expect(applyPercent(500, 12, "decrease")).toBeCloseTo(440, 10);
    expect(applyPercent(250, 40, "decrease")).toBeCloseTo(150, 10);
    expect(applyPercent(100, 10, "increase")).toBeCloseTo(110, 10);
  });
  it("reversePercent", () => {
    expect(reversePercent(120, 20, "increase")).toBeCloseTo(100, 10);
    expect(reversePercent(75, 25, "decrease")).toBeCloseTo(100, 10);
    expect(reversePercent(1180, 18, "increase")).toBeCloseTo(1000, 10);
    expect(reversePercent(330, 10, "increase")).toBeCloseTo(300, 10);
    expect(reversePercent(50, 100, "decrease")).toBeNull();
  });
});

describe("fmt", () => {
  it("trims float noise and groups thousands", () => {
    expect(fmt(25.000000000000004)).toBe("25");
    expect(fmt(0.1 + 0.2)).toBe("0.3");
    expect(fmt(1234567.891)).toBe("1,234,567.891");
    expect(fmt(-0.0000001)).toBe("0");
    expect(fmt(1 / 3)).toBe("0.333333");
  });
  it("never prints NaN or Infinity as results", () => {
    expect(fmt(NaN)).toBe("n/a");
    expect(fmt(Infinity)).toBe("n/a");
  });
});

describe("solve: increase", () => {
  it("computes a normal increase", () => {
    const s = solve("increase", { a: "80", b: "100" });
    expect(s.status).toBe("ok");
    if (s.status === "ok") {
      expect(s.display).toBe("25%");
      expect(s.label).toBe("Percentage increase");
      expect(s.steps).toHaveLength(3);
    }
  });
  it("reports a decrease honestly when the value fell", () => {
    const s = solve("increase", { a: "100", b: "80" });
    expect(s.status === "ok" && s.label).toBe("Percentage decrease");
    expect(s.status === "ok" && s.display).toBe("20%");
  });
  it("handles zero change", () => {
    const s = solve("increase", { a: "50", b: "50" });
    expect(s.status === "ok" && s.display).toBe("0%");
  });
  it("blocks division by zero", () => {
    const s = solve("increase", { a: "0", b: "50" });
    expect(s.status).toBe("error");
  });
  it("handles decimals and thousands", () => {
    const s = solve("increase", { a: "1,200", b: "1,500.6" });
    expect(s.status === "ok" && s.display).toBe("25.05%");
  });
  it("prompts when a field is empty and errors on junk", () => {
    expect(solve("increase", { a: "", b: "" }).status).toBe("empty");
    expect(solve("increase", { a: "5", b: "" }).status).toBe("empty");
    expect(solve("increase", { a: "abc", b: "5" }).status).toBe("error");
  });
  it("handles a negative starting value without flipping the sign", () => {
    const s = solve("increase", { a: "-50", b: "-25" });
    expect(s.status === "ok" && s.display).toBe("50%");
  });
  it("handles very large numbers", () => {
    const s = solve("increase", { a: "1000000000000", b: "2000000000000" });
    expect(s.status === "ok" && s.display).toBe("100%");
  });
});

describe("solve: decrease", () => {
  it("computes a decrease", () => {
    const s = solve("decrease", { a: "840", b: "714" });
    expect(s.status === "ok" && s.display).toBe("15%");
    expect(s.status === "ok" && s.label).toBe("Percentage decrease");
  });
  it("flags an increase", () => {
    const s = solve("decrease", { a: "80", b: "100" });
    expect(s.status === "ok" && s.label).toBe("Percentage increase");
  });
  it("blocks division by zero", () => {
    expect(solve("decrease", { a: "0", b: "5" }).status).toBe("error");
  });
});

describe("solve: change", () => {
  it("shows a signed result", () => {
    const up = solve("change", { a: "80", b: "100" });
    const down = solve("change", { a: "100", b: "80" });
    expect(up.status === "ok" && up.display).toBe("+25%");
    expect(down.status === "ok" && down.display).toBe("\u221220%");
  });
});

describe("solve: difference", () => {
  it("is symmetric", () => {
    const a = solve("difference", { a: "80", b: "100" });
    const b = solve("difference", { a: "100", b: "80" });
    expect(a.status === "ok" && a.display).toBe("22.222222%");
    expect(b.status === "ok" && b.display).toBe("22.222222%");
  });
  it("handles both zero and cancelling values", () => {
    expect(solve("difference", { a: "0", b: "0" }).status).toBe("ok");
    expect(solve("difference", { a: "5", b: "-5" }).status).toBe("error");
  });
});

describe("solve: add-percent", () => {
  it("increases and decreases", () => {
    const up = solve("add-percent", { a: "200", p: "15", dir: "increase" });
    const down = solve("add-percent", { a: "500", p: "12", dir: "decrease" });
    expect(up.status === "ok" && up.display).toBe("230");
    expect(down.status === "ok" && down.display).toBe("440");
  });
  it("rejects negative percentages", () => {
    expect(solve("add-percent", { a: "200", p: "-5", dir: "increase" }).status).toBe("error");
  });
  it("accepts a trailing % sign in the percentage box", () => {
    const s = solve("add-percent", { a: "200", p: "15%", dir: "increase" });
    expect(s.status === "ok" && s.display).toBe("230");
  });
});

describe("solve: reverse", () => {
  it("finds the original value", () => {
    const up = solve("reverse", { a: "120", p: "20", dir: "increase" });
    const down = solve("reverse", { a: "75", p: "25", dir: "decrease" });
    expect(up.status === "ok" && up.display).toBe("100");
    expect(down.status === "ok" && down.display).toBe("100");
  });
  it("blocks a 100% decrease", () => {
    expect(solve("reverse", { a: "50", p: "100", dir: "decrease" }).status).toBe("error");
  });
  it("is the inverse of add-percent", () => {
    const fwd = solve("add-percent", { a: "250", p: "18", dir: "increase" });
    if (fwd.status !== "ok") throw new Error("expected ok");
    const back = solve("reverse", { a: fwd.display, p: "18", dir: "increase" });
    expect(back.status === "ok" && back.display).toBe("250");
  });
});
