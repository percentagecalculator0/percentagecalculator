// Shared calculation logic. Pure functions, no DOM, no locale: used by every language version.
export type Mode =
  | "increase" | "decrease" | "increaseBy" | "decreaseBy"
  | "reverseIncrease" | "reverseDecrease" | "difference";

export type ErrorCode = "divByZero" | "zeroAverage" | "badFactor" | "overflow";

export type CalcResult =
  | { ok: true; mode: Mode; value: number; parts: Record<string, number> }
  | { ok: false; error: ErrorCode };

const fail = (error: ErrorCode): CalcResult => ({ ok: false, error });

function done(mode: Mode, value: number, parts: Record<string, number>): CalcResult {
  if (!Number.isFinite(value) || Object.values(parts).some((p) => !Number.isFinite(p))) {
    return fail("overflow");
  }
  // Avoid "-0"
  return { ok: true, mode, value: value === 0 ? 0 : value, parts };
}

/** Percentage change from `oldV` to `newV` (positive = increase). Uses |old| so negative bases behave sensibly. */
export function percentChange(oldV: number, newV: number): CalcResult {
  if (oldV === 0) return fail("divByZero");
  const diff = newV - oldV;
  const absOld = Math.abs(oldV);
  const ratio = diff / absOld;
  return done("increase", ratio * 100, { old: oldV, new: newV, diff, absOld, ratio });
}

/** Percentage decrease from `oldV` to `newV` (positive = decrease). */
export function percentDecrease(oldV: number, newV: number): CalcResult {
  if (oldV === 0) return fail("divByZero");
  const diff = newV - oldV;
  const absOld = Math.abs(oldV);
  const ratio = -diff / absOld;
  return done("decrease", ratio * 100, { old: oldV, new: newV, diff, absOld, ratio });
}

/** Increase `n` by `p` percent. */
export function increaseBy(n: number, p: number): CalcResult {
  const rate = p / 100;
  const amount = n * rate;
  return done("increaseBy", n + amount, { number: n, percent: p, rate, amount });
}

/** Decrease `n` by `p` percent. */
export function decreaseBy(n: number, p: number): CalcResult {
  const rate = p / 100;
  const amount = n * rate;
  return done("decreaseBy", n - amount, { number: n, percent: p, rate, amount });
}

/** Original value, given a final value that is `p` percent higher than it. */
export function reverseIncrease(finalV: number, p: number): CalcResult {
  const factor = 1 + p / 100;
  if (factor === 0) return fail("divByZero");
  if (factor < 0) return fail("badFactor");
  return done("reverseIncrease", finalV / factor, { final: finalV, percent: p, factor });
}

/** Original value, given a final value that is `p` percent lower than it. */
export function reverseDecrease(finalV: number, p: number): CalcResult {
  const factor = 1 - p / 100;
  if (factor === 0) return fail("divByZero");
  if (factor < 0) return fail("badFactor");
  return done("reverseDecrease", finalV / factor, { final: finalV, percent: p, factor });
}

/** Percentage difference: |a-b| / |(a+b)/2| * 100. */
export function percentDifference(a: number, b: number): CalcResult {
  const avg = (a + b) / 2;
  if (avg === 0) return fail("zeroAverage");
  const diff = Math.abs(a - b);
  const absAvg = Math.abs(avg);
  const ratio = diff / absAvg;
  return done("difference", ratio * 100, { a, b, diff, avg, absAvg, ratio });
}

export function calculate(mode: Mode, x: number, y: number): CalcResult {
  switch (mode) {
    case "increase": return percentChange(x, y);
    case "decrease": return percentDecrease(x, y);
    case "increaseBy": return increaseBy(x, y);
    case "decreaseBy": return decreaseBy(x, y);
    case "reverseIncrease": return reverseIncrease(x, y);
    case "reverseDecrease": return reverseDecrease(x, y);
    case "difference": return percentDifference(x, y);
  }
}
