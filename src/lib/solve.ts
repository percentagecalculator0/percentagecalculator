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
  | "add-percent";

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

export function solve(mode: Mode, inputs: Inputs): Solution {
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
