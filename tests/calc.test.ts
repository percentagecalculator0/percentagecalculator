import { describe, it, expect } from "vitest";
import { calculate, percentChange, percentDecrease, increaseBy, decreaseBy, reverseIncrease, reverseDecrease, percentDifference } from "../src/lib/calc";
import { parseNumber, formatNumber } from "../src/lib/format";

const val = (r: ReturnType<typeof calculate>) => { if (!r.ok) throw new Error(r.error); return r.value; };

describe("percentage change / increase", () => {
  it("50 -> 75 is +50%", () => expect(val(percentChange(50, 75))).toBeCloseTo(50, 10));
  it("80 -> 100 is +25%", () => expect(val(percentChange(80, 100))).toBeCloseTo(25, 10));
  it("75 -> 50 is -33.333...%", () => expect(val(percentChange(75, 50))).toBeCloseTo(-33.3333333, 6));
  it("same value is 0, not -0", () => expect(Object.is(val(percentChange(5, 5)), 0)).toBe(true));
  it("old = 0 is a division-by-zero error", () => expect(percentChange(0, 10)).toEqual({ ok: false, error: "divByZero" }));
  it("negative base uses |old|: -10 -> -5 is +50%", () => expect(val(percentChange(-10, -5))).toBeCloseTo(50, 10));
  it("decimals: 0.2 -> 0.3 is +50%", () => expect(val(percentChange(0.2, 0.3))).toBeCloseTo(50, 10));
  it("huge numbers stay finite", () => expect(percentChange(1e-10, 1e15).ok).toBe(true));
});

describe("percentage decrease", () => {
  it("250 -> 200 is 20% decrease", () => expect(val(percentDecrease(250, 200))).toBeCloseTo(20, 10));
  it("200 -> 250 is -25% decrease (i.e. an increase)", () => expect(val(percentDecrease(200, 250))).toBeCloseTo(-25, 10));
  it("old = 0 errors", () => expect(percentDecrease(0, 5).ok).toBe(false));
});

describe("increase / decrease by percent", () => {
  it("60 + 15% = 69", () => expect(val(increaseBy(60, 15))).toBeCloseTo(69, 10));
  it("100 + 10% = 110", () => expect(val(increaseBy(100, 10))).toBeCloseTo(110, 10));
  it("200 - 25% = 150", () => expect(val(decreaseBy(200, 25))).toBeCloseTo(150, 10));
  it("0 stays 0", () => expect(val(increaseBy(0, 50))).toBe(0));
  it("negative percent flips direction", () => expect(val(increaseBy(100, -10))).toBeCloseTo(90, 10));
});

describe("reverse percentage", () => {
  it("120 after +20% -> 100", () => expect(val(reverseIncrease(120, 20))).toBeCloseTo(100, 10));
  it("80 after -20% -> 100", () => expect(val(reverseDecrease(80, 20))).toBeCloseTo(100, 10));
  it("-100% increase is division by zero", () => expect(reverseIncrease(10, -100)).toEqual({ ok: false, error: "divByZero" }));
  it("100% decrease is division by zero", () => expect(reverseDecrease(10, 100)).toEqual({ ok: false, error: "divByZero" }));
  it("150% decrease is a bad factor", () => expect(reverseDecrease(10, 150)).toEqual({ ok: false, error: "badFactor" }));
});

describe("percentage difference", () => {
  it("10 vs 20 is 66.666...%", () => expect(val(percentDifference(10, 20))).toBeCloseTo(66.6666667, 6));
  it("is symmetric", () => expect(val(percentDifference(3, 9))).toBeCloseTo(val(percentDifference(9, 3)), 12));
  it("0 vs 0 errors", () => expect(percentDifference(0, 0)).toEqual({ ok: false, error: "zeroAverage" }));
  it("5 vs -5 errors (average is 0)", () => expect(percentDifference(5, -5).ok).toBe(false));
});

describe("calculate() dispatcher", () => {
  it("routes modes", () => expect(val(calculate("increaseBy", 60, 15))).toBeCloseTo(69, 10));
});

describe("parseNumber", () => {
  it("plain and decimal", () => { expect(parseNumber("12.5")).toEqual({ ok: true, value: 12.5 }); expect(parseNumber(".5")).toEqual({ ok: true, value: 0.5 }); });
  it("thousands separators (en)", () => expect(parseNumber("1,234,567.5")).toEqual({ ok: true, value: 1234567.5 }));
  it("bad grouping rejected", () => expect(parseNumber("12,34").ok).toBe(false));
  it("empty", () => expect(parseNumber("  ")).toEqual({ ok: false, error: "empty" }));
  it.each(["abc", "12abc", "1e5", "Infinity", "NaN", "--5", "5%", "$5", "1 2"])("rejects %s", (s) => expect(parseNumber(s).ok).toBe(false));
  it("too large", () => expect(parseNumber("1e16")).toMatchObject({ ok: false }));
  it("999999999999999999 is too large", () => expect(parseNumber("999999999999999999")).toEqual({ ok: false, error: "tooLarge" }));
  it("negative zero becomes 0", () => expect(Object.is((parseNumber("-0") as { value: number }).value, 0)).toBe(true));
  it("German decimal comma", () => expect(parseNumber("1.234,5", "de")).toEqual({ ok: true, value: 1234.5 }));
  it("Arabic-Indic digits", () => expect(parseNumber("١٢٫٥", "ar")).toMatchObject({ ok: true }));
});

describe("formatNumber", () => {
  it("rounds to 4 decimals", () => expect(formatNumber(100 * 1.1)).toBe("110"));
  it("no negative zero", () => expect(formatNumber(-0.00001)).toBe("0"));
  it("groups thousands", () => expect(formatNumber(1234567.891)).toBe("1,234,567.891"));
});
