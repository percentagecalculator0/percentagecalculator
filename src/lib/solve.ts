/**
 * All calculator maths lives here as pure functions so it can be unit-tested
 * and reused by every page. No DOM, no React.
 */

export type Mode =
  | "increase"
  | "decrease"
  | "change"
  | "difference"
  | "reverse"
  | "add-percent"
  | "percent-of"
  | "what-percent"
  | "growth"
  | "real-raise";

export type Direction = "increase" | "decrease";

export type Inputs = Record<string, string>;

export type FieldDef = {
  key: string;
  label: string;
  placeholder: string;
  suffix?: string;
};

export type Solution =
  | { status: "empty"; message: string }
  | { status: "error"; message: string }
  | {
      status: "ok";
      label: string;
      display: string;
      detail?: string;
      tone: "up" | "down" | "neutral";
      steps: string[];
      copyText: string;
      bars?: { label: string; value: number }[];
    };

export const MAX_ABS = 1e15;

/* ------------------------------------------------------------------ */
/* Parsing and formatting                                              */
/* ------------------------------------------------------------------ */

export type Parsed =
  | { kind: "empty" }
  | { kind: "bad"; reason: string }
  | { kind: "num"; value: number };

const PLAIN = /^-?(\d+(\.\d*)?|\.\d+)$/;
const WITH_COMMAS = /^-?\d{1,3}(,\d{3})+(\.\d*)?$/;

export function parseNumber(raw: string, allowPercentSign = false): Parsed {
  let s = (raw ?? "").trim();
  if (s === "") return { kind: "empty" };
  if (allowPercentSign && s.endsWith("%")) s = s.slice(0, -1).trim();
  if (s.startsWith("+")) s = s.slice(1);
  if (s === "") return { kind: "empty" };

  if (s.includes(",")) {
    if (!WITH_COMMAS.test(s)) {
      return {
        kind: "bad",
        reason: "Use a dot for decimals (like 1.5) and commas only for thousands (like 1,200).",
      };
    }
    s = s.replace(/,/g, "");
  }

  if (!PLAIN.test(s)) {
    return { kind: "bad", reason: "Enter a number like 120 or 3.5. Remove any letters or symbols." };
  }

  const value = Number(s);
  if (!Number.isFinite(value)) {
    return { kind: "bad", reason: "That number is too large to calculate." };
  }
  if (Math.abs(value) > MAX_ABS) {
    return { kind: "bad", reason: "That number is too large. Use a value below 1,000,000,000,000,000." };
  }
  return { kind: "num", value: value === 0 ? 0 : value };
}

const nf = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 6,
  useGrouping: true,
});

export function fmt(n: number): string {
  if (!Number.isFinite(n)) return "n/a";
  const rounded = Math.abs(n) < 5e-7 ? 0 : n;
  return nf.format(rounded === 0 ? 0 : rounded);
}

export function fmtPct(n: number): string {
  return `${fmt(n)}%`;
}

const nf2 = new Intl.NumberFormat("en-US", { maximumFractionDigits: 2, useGrouping: true });

/** Two-decimal, signed percentage used for headline results that would otherwise be very long. */
function signedPct2(n: number): string {
  const r = Math.round(n * 100) / 100;
  if (r === 0) return "0%";
  return `${r > 0 ? "+" : "\u2212"}${nf2.format(Math.abs(r))}%`;
}

function pct2(n: number): string {
  return `${nf2.format(Math.abs(Math.round(n * 100) / 100) === 0 ? 0 : n)}%`;
}

function signed(n: number): string {
  if (n > 0) return `+${fmt(n)}`;
  if (n < 0) return `\u2212${fmt(Math.abs(n))}`;
  return "0";
}

/* ------------------------------------------------------------------ */
/* Pure formulas                                                       */
/* ------------------------------------------------------------------ */

/** (new - old) / |old| * 100. Returns null when old is zero. */
export function percentChange(oldV: number, newV: number): number | null {
  if (oldV === 0) return null;
  return ((newV - oldV) / Math.abs(oldV)) * 100;
}

/** |a - b| / ((|a + b|) / 2) * 100. Returns null when a + b is zero but a != b. */
export function percentDifference(a: number, b: number): number | null {
  if (a === 0 && b === 0) return 0;
  const avg = Math.abs(a + b) / 2;
  if (avg === 0) return null;
  return (Math.abs(a - b) / avg) * 100;
}

/** number * (1 +/- p/100) */
export function applyPercent(x: number, p: number, dir: Direction): number {
  const m = dir === "increase" ? 1 + p / 100 : 1 - p / 100;
  return x * m;
}

/** final / (1 +/- p/100). Returns null when the multiplier is zero. */
export function reversePercent(finalV: number, p: number, dir: Direction): number | null {
  const m = dir === "increase" ? 1 + p / 100 : 1 - p / 100;
  if (m === 0) return null;
  return finalV / m;
}

/* ------------------------------------------------------------------ */
/* Field definitions per calculator                                    */
/* ------------------------------------------------------------------ */

export function fieldsFor(mode: Mode): FieldDef[] {
  switch (mode) {
    case "increase":
    case "decrease":
    case "change":
      return [
        { key: "a", label: "Starting value", placeholder: "e.g. 80" },
        { key: "b", label: "Final value", placeholder: "e.g. 100" },
      ];
    case "difference":
      return [
        { key: "a", label: "First value", placeholder: "e.g. 80" },
        { key: "b", label: "Second value", placeholder: "e.g. 100" },
      ];
    case "reverse":
      return [
        { key: "a", label: "Value after the change", placeholder: "e.g. 120" },
        { key: "p", label: "Percentage", placeholder: "e.g. 20", suffix: "%" },
      ];
    case "add-percent":
      return [
        { key: "a", label: "Number", placeholder: "e.g. 200" },
        { key: "p", label: "Percentage", placeholder: "e.g. 15", suffix: "%" },
      ];
    case "percent-of":
      return [
        { key: "p", label: "Percentage", placeholder: "e.g. 15", suffix: "%" },
        { key: "a", label: "Of this number", placeholder: "e.g. 200" },
      ];
    case "what-percent":
      return [
        { key: "a", label: "Number (the part)", placeholder: "e.g. 30" },
        { key: "b", label: "Total (the whole)", placeholder: "e.g. 200" },
      ];
    case "growth":
      return [
        { key: "a", label: "Starting value", placeholder: "e.g. 100" },
        { key: "b", label: "Final value", placeholder: "e.g. 121" },
        { key: "n", label: "Number of periods", placeholder: "e.g. 2" },
      ];
    case "real-raise":
      return [
        { key: "a", label: "Current salary", placeholder: "e.g. 50,000" },
        { key: "b", label: "New salary", placeholder: "e.g. 53,000" },
        { key: "p", label: "Inflation rate (per year)", placeholder: "e.g. 3", suffix: "%" },
      ];
  }
}

export function usesDirection(mode: Mode): boolean {
  return mode === "reverse" || mode === "add-percent";
}

export function defaultInputs(mode: Mode): Inputs {
  switch (mode) {
    case "increase":
    case "change":
      return { a: "80", b: "100" };
    case "decrease":
      return { a: "100", b: "80" };
    case "difference":
      return { a: "80", b: "100" };
    case "reverse":
      return { a: "120", p: "20", dir: "increase" };
    case "add-percent":
      return { a: "200", p: "15", dir: "increase" };
    case "percent-of":
      return { p: "15", a: "200" };
    case "what-percent":
      return { a: "30", b: "200" };
    case "growth":
      return { a: "100", b: "121", n: "2" };
    case "real-raise":
      return { a: "50000", b: "53000", p: "3" };
  }
}

/* ------------------------------------------------------------------ */
/* Solver used by the UI                                               */
/* ------------------------------------------------------------------ */

function readFields(
  mode: Mode,
  inputs: Inputs,
): { ok: true; values: Record<string, number> } | { ok: false; sol: Solution } {
  const defs = fieldsFor(mode);
  const values: Record<string, number> = {};
  let anyEmpty = false;
  for (const f of defs) {
    const parsed = parseNumber(inputs[f.key] ?? "", f.suffix === "%");
    if (parsed.kind === "bad") {
      return {
        ok: false,
        sol: { status: "error", message: `${f.label}: ${parsed.reason}` },
      };
    }
    if (parsed.kind === "empty") {
      anyEmpty = true;
    } else {
      values[f.key] = parsed.value;
    }
  }
  if (anyEmpty) {
    return {
      ok: false,
      sol: {
        status: "empty",
        message:
          defs.length === 2
            ? "Enter both values to see the result."
            : "Enter all the values to see the result.",
      },
    };
  }
  return { ok: true, values };
}

function solveCore(mode: Mode, inputs: Inputs): Solution {
  const read = readFields(mode, inputs);
  if (!read.ok) return read.sol;
  const v = read.values;

  switch (mode) {
    case "increase":
    case "decrease":
    case "change": {
      const oldV = v.a;
      const newV = v.b;
      if (oldV === 0) {
        return {
          status: "error",
          message:
            "The starting value can’t be zero. A percentage change is measured against the starting value, and dividing by zero has no answer.",
        };
      }
      const raw = percentChange(oldV, newV) as number;
      const diff = newV - oldV;
      const absOld = Math.abs(oldV);
      const divisorText = oldV < 0 ? `|${fmt(oldV)}| = ${fmt(absOld)}` : fmt(oldV);
      const ratio = diff / absOld;

      const steps: string[] = [
        `Subtract the starting value from the final value: ${fmt(newV)} \u2212 ${fmt(oldV)} = ${fmt(diff)}`,
        `Divide that by the starting value${oldV < 0 ? " (its absolute value)" : ""}: ${fmt(diff)} \u00f7 ${divisorText} = ${fmt(ratio)}`,
        `Multiply by 100: ${fmt(ratio)} \u00d7 100 = ${fmtPct(raw)}`,
      ];

      // Decide label by mode and sign.
      const isZero = raw === 0;
      const isUp = raw > 0;
      const mag = Math.abs(raw);

      if (isZero) {
        return {
          status: "ok",
          label: mode === "change" ? "Percentage change" : mode === "increase" ? "Percentage increase" : "Percentage decrease",
          display: "0%",
          detail: "The two values are the same, so nothing changed.",
          tone: "neutral",
          steps,
          copyText: `Percentage change from ${fmt(oldV)} to ${fmt(newV)} = 0%`,
        };
      }

      if (mode === "change") {
        return {
          status: "ok",
          label: "Percentage change",
          display: signed(raw) + "%",
          detail: isUp
            ? `${fmt(newV)} is ${fmtPct(mag)} higher than ${fmt(oldV)}.`
            : `${fmt(newV)} is ${fmtPct(mag)} lower than ${fmt(oldV)}.`,
          tone: isUp ? "up" : "down",
          steps,
          copyText: `Percentage change from ${fmt(oldV)} to ${fmt(newV)} = ${signed(raw)}%`,
        };
      }

      if (mode === "increase") {
        if (isUp) {
          return {
            status: "ok",
            label: "Percentage increase",
            display: fmtPct(mag),
            detail: `${fmt(oldV)} went up by ${fmt(diff)} to reach ${fmt(newV)}.`,
            tone: "up",
            steps,
            copyText: `Percentage increase from ${fmt(oldV)} to ${fmt(newV)} = ${fmtPct(mag)}`,
          };
        }
        return {
          status: "ok",
          label: "Percentage decrease",
          display: fmtPct(mag),
          detail: `The final value is lower than the starting value, so this is a decrease, not an increase.`,
          tone: "down",
          steps,
          copyText: `Percentage decrease from ${fmt(oldV)} to ${fmt(newV)} = ${fmtPct(mag)}`,
        };
      }

      // decrease
      const decSteps: string[] = [
        `Subtract the final value from the starting value: ${fmt(oldV)} \u2212 ${fmt(newV)} = ${fmt(oldV - newV)}`,
        `Divide that by the starting value${oldV < 0 ? " (its absolute value)" : ""}: ${fmt(oldV - newV)} \u00f7 ${divisorText} = ${fmt((oldV - newV) / absOld)}`,
        `Multiply by 100: ${fmt((oldV - newV) / absOld)} \u00d7 100 = ${fmtPct(-raw)}`,
      ];
      if (!isUp) {
        return {
          status: "ok",
          label: "Percentage decrease",
          display: fmtPct(mag),
          detail: `${fmt(oldV)} went down by ${fmt(oldV - newV)} to reach ${fmt(newV)}.`,
          tone: "down",
          steps: decSteps,
          copyText: `Percentage decrease from ${fmt(oldV)} to ${fmt(newV)} = ${fmtPct(mag)}`,
        };
      }
      return {
        status: "ok",
        label: "Percentage increase",
        display: fmtPct(mag),
        detail: `The final value is higher than the starting value, so this is an increase, not a decrease.`,
        tone: "up",
        steps,
        copyText: `Percentage increase from ${fmt(oldV)} to ${fmt(newV)} = ${fmtPct(mag)}`,
      };
    }

    case "difference": {
      const a = v.a;
      const b = v.b;
      const result = percentDifference(a, b);
      if (result === null) {
        return {
          status: "error",
          message:
            "These two values add up to zero, so their average is zero and the percentage difference can’t be calculated. Try different values.",
        };
      }
      const gap = Math.abs(a - b);
      const avg = Math.abs(a + b) / 2;
      return {
        status: "ok",
        label: "Percentage difference",
        display: fmtPct(result),
        detail:
          result === 0
            ? "The two values are the same."
            : `The gap between ${fmt(a)} and ${fmt(b)} is ${fmtPct(result)} of their average.`,
        tone: "neutral",
        steps: [
          `Find the gap between the values: |${fmt(a)} \u2212 ${fmt(b)}| = ${fmt(gap)}`,
          `Find their average: (${fmt(a)} + ${fmt(b)}) \u00f7 2 = ${fmt(avg)}`,
          `Divide the gap by the average: ${fmt(gap)} \u00f7 ${fmt(avg)} = ${fmt(avg === 0 ? 0 : gap / avg)}`,
          `Multiply by 100: ${fmt(avg === 0 ? 0 : gap / avg)} \u00d7 100 = ${fmtPct(result)}`,
        ],
        copyText: `Percentage difference between ${fmt(a)} and ${fmt(b)} = ${fmtPct(result)}`,
      };
    }

    case "add-percent": {
      const x = v.a;
      const p = v.p;
      const dir: Direction = inputs.dir === "decrease" ? "decrease" : "increase";
      if (p < 0) {
        return {
          status: "error",
          message: "Enter a percentage of 0 or more. Use the Increase / Decrease option to choose the direction.",
        };
      }
      const amount = (x * p) / 100;
      const result = applyPercent(x, p, dir);
      const sign = dir === "increase" ? "+" : "\u2212";
      return {
        status: "ok",
        label: dir === "increase" ? `${fmt(x)} increased by ${fmtPct(p)}` : `${fmt(x)} decreased by ${fmtPct(p)}`,
        display: fmt(result),
        detail: `That is a change of ${sign}${fmt(Math.abs(amount))}.`,
        tone: dir === "increase" ? "up" : "down",
        steps: [
          `Work out the percentage of the number: ${fmt(x)} \u00d7 ${fmt(p)} \u00f7 100 = ${fmt(amount)}`,
          dir === "increase"
            ? `Add it to the number: ${fmt(x)} + ${fmt(amount)} = ${fmt(result)}`
            : `Subtract it from the number: ${fmt(x)} \u2212 ${fmt(amount)} = ${fmt(result)}`,
        ],
        copyText: `${fmt(x)} ${dir === "increase" ? "increased" : "decreased"} by ${fmtPct(p)} = ${fmt(result)}`,
      };
    }

    case "percent-of": {
      const p = v.p;
      const x = v.a;
      const dec = p / 100;
      const result = x * dec;
      return {
        status: "ok",
        label: `${fmtPct(p)} of ${fmt(x)}`,
        display: fmt(result),
        detail: `${fmt(result)} is ${fmtPct(p)} of ${fmt(x)}.`,
        tone: "neutral",
        steps: [
          `Turn the percentage into a decimal: ${fmt(p)} \u00f7 100 = ${fmt(dec)}`,
          `Multiply by the number: ${fmt(x)} \u00d7 ${fmt(dec)} = ${fmt(result)}`,
        ],
        copyText: `${fmtPct(p)} of ${fmt(x)} = ${fmt(result)}`,
      };
    }

    case "what-percent": {
      const part = v.a;
      const whole = v.b;
      if (whole === 0) {
        return {
          status: "error",
          message: "The total can\u2019t be zero. A percentage shows a share of the total, and dividing by zero has no answer.",
        };
      }
      const ratio = part / whole;
      const pct = ratio * 100;
      return {
        status: "ok",
        label: "Percentage",
        display: fmtPct(pct),
        detail: `${fmt(part)} is ${fmtPct(pct)} of ${fmt(whole)}.`,
        tone: "neutral",
        steps: [
          `Divide the number by the total: ${fmt(part)} \u00f7 ${fmt(whole)} = ${fmt(ratio)}`,
          `Multiply by 100: ${fmt(ratio)} \u00d7 100 = ${fmtPct(pct)}`,
        ],
        copyText: `${fmt(part)} is ${fmtPct(pct)} of ${fmt(whole)}`,
      };
    }

    case "growth": {
      const start = v.a;
      const end = v.b;
      const n = v.n;
      if (start <= 0) {
        return { status: "error", message: "The starting value must be greater than zero to work out a growth rate." };
      }
      if (end < 0) {
        return { status: "error", message: "The final value can\u2019t be negative when working out a growth rate." };
      }
      if (n <= 0) {
        return { status: "error", message: "The number of periods must be greater than zero." };
      }
      if (n > 1000) {
        return { status: "error", message: "Use 1,000 periods or fewer." };
      }
      const ratio = end / start;
      const root = Math.pow(ratio, 1 / n);
      const rate = (root - 1) * 100;
      if (!Number.isFinite(rate)) {
        return { status: "error", message: "That result is too large to calculate. Try smaller values." };
      }
      const total = (ratio - 1) * 100;
      return {
        status: "ok",
        label: "Average growth per period (CAGR)",
        display: signedPct2(rate),
        detail: `Over ${fmt(n)} ${n === 1 ? "period" : "periods"} the total change is ${signedPct2(total)}.`,
        tone: rate > 0 ? "up" : rate < 0 ? "down" : "neutral",
        steps: [
          `Divide the final value by the starting value: ${fmt(end)} \u00f7 ${fmt(start)} = ${fmt(ratio)}`,
          `Take the ${fmt(n)}-period root (raise it to the power of 1 \u00f7 ${fmt(n)}): ${fmt(root)}`,
          `Subtract 1 and multiply by 100: (${fmt(root)} \u2212 1) \u00d7 100 = ${fmtPct(rate)}, or about ${signedPct2(rate)}`,
        ],
        copyText: `Average growth from ${fmt(start)} to ${fmt(end)} over ${fmt(n)} periods = ${fmtPct(rate)} per period`,
      };
    }

    case "real-raise": {
      const cur = v.a;
      const next = v.b;
      const infl = v.p;
      if (cur <= 0) {
        return { status: "error", message: "Current salary must be greater than zero." };
      }
      if (next < 0) {
        return { status: "error", message: "New salary can\u2019t be negative." };
      }
      const factor = 1 + infl / 100;
      if (factor <= 0) {
        return { status: "error", message: "Inflation must be above \u2212100%." };
      }
      const nominal = ((next - cur) / cur) * 100;
      const real = (next / cur / factor - 1) * 100;
      const needed = cur * factor;
      return {
        status: "ok",
        label: "Real raise after inflation",
        display: signedPct2(real),
        detail:
          real > 0
            ? `Your pay rose ${pct2(nominal)}, and your buying power rose ${pct2(real)} after inflation.`
            : real < 0
              ? `Your pay changed by ${signedPct2(nominal)}, but prices rose faster, so your buying power fell ${pct2(Math.abs(real))}.`
              : `Your raise matches inflation, so your buying power is unchanged.`,
        tone: real > 0 ? "up" : real < 0 ? "down" : "neutral",
        steps: [
          `Raise before inflation: (${fmt(next)} \u2212 ${fmt(cur)}) \u00f7 ${fmt(cur)} \u00d7 100 = ${fmtPct(nominal)}`,
          `Inflation factor: 1 + ${fmt(infl)} \u00f7 100 = ${fmt(factor)}`,
          `Real change: (${fmt(next)} \u00f7 ${fmt(cur)}) \u00f7 ${fmt(factor)} \u2212 1 = ${fmt(real / 100)}, which is ${signedPct2(real)}`,
          `Pay needed to keep the same buying power: ${fmt(cur)} \u00d7 ${fmt(factor)} = ${fmt(needed)}`,
        ],
        copyText: `Raise from ${fmt(cur)} to ${fmt(next)} with ${fmtPct(infl)} inflation = ${signedPct2(real)} real change`,
      };
    }

    case "reverse": {
      const finalV = v.a;
      const p = v.p;
      const dir: Direction = inputs.dir === "decrease" ? "decrease" : "increase";
      if (p < 0) {
        return {
          status: "error",
          message: "Enter a percentage of 0 or more. Use the Increase / Decrease option to choose the direction.",
        };
      }
      const m = dir === "increase" ? 1 + p / 100 : 1 - p / 100;
      const original = reversePercent(finalV, p, dir);
      if (original === null) {
        return {
          status: "error",
          message:
            "A 100% decrease leaves nothing, so the original value can’t be worked out. Check the percentage.",
        };
      }
      return {
        status: "ok",
        label: "Original value",
        display: fmt(original),
        detail:
          dir === "increase"
            ? `Increasing ${fmt(original)} by ${fmtPct(p)} gives ${fmt(finalV)}.`
            : `Decreasing ${fmt(original)} by ${fmtPct(p)} gives ${fmt(finalV)}.`,
        tone: "neutral",
        steps: [
          `Turn the percentage into a multiplier: ${dir === "increase" ? "1 +" : "1 \u2212"} ${fmt(p)} \u00f7 100 = ${fmt(m)}`,
          `Divide the value you have by the multiplier: ${fmt(finalV)} \u00f7 ${fmt(m)} = ${fmt(original)}`,
        ],
        copyText: `Original value before a ${fmtPct(p)} ${dir} that ended at ${fmt(finalV)} = ${fmt(original)}`,
      };
    }
  }
}

/* ------------------------------------------------------------------ */
/* Public entry point: adds the data for the little comparison chart   */
/* ------------------------------------------------------------------ */

function barsFor(mode: Mode, inputs: Inputs): { label: string; value: number }[] | undefined {
  const get = (k: string, pct = false) => {
    const r = parseNumber(inputs[k] ?? "", pct);
    return r.kind === "num" ? r.value : NaN;
  };
  const a = get("a");
  const b = get("b");
  const p = get("p", true);
  const dir: Direction = inputs.dir === "decrease" ? "decrease" : "increase";
  let bars: { label: string; value: number }[] | undefined;
  switch (mode) {
    case "increase":
    case "decrease":
    case "change":
    case "growth":
      bars = [
        { label: "Starting value", value: a },
        { label: "Final value", value: b },
      ];
      break;
    case "difference":
      bars = [
        { label: "First value", value: a },
        { label: "Second value", value: b },
      ];
      break;
    case "add-percent":
      bars = [
        { label: "Number", value: a },
        { label: "New value", value: applyPercent(a, p, dir) },
      ];
      break;
    case "reverse": {
      const o = reversePercent(a, p, dir);
      bars = [
        { label: "Original value", value: o === null ? NaN : o },
        { label: "After the change", value: a },
      ];
      break;
    }
    case "percent-of":
      bars = [
        { label: "Whole", value: a },
        { label: "Part", value: (a * p) / 100 },
      ];
      break;
    case "what-percent":
      bars = [
        { label: "Part", value: a },
        { label: "Whole", value: b },
      ];
      break;
    case "real-raise":
      bars = [
        { label: "Current salary", value: a },
        { label: "Needed to keep up", value: a * (1 + p / 100) },
        { label: "New salary", value: b },
      ];
      break;
  }
  if (!bars) return undefined;
  if (bars.some((x) => !Number.isFinite(x.value) || x.value < 0)) return undefined;
  if (Math.max(...bars.map((x) => x.value)) <= 0) return undefined;
  return bars;
}

export function solve(mode: Mode, inputs: Inputs): Solution {
  const sol = solveCore(mode, inputs);
  if (sol.status !== "ok") return sol;
  const bars = barsFor(mode, inputs);
  return bars ? { ...sol, bars } : sol;
}
