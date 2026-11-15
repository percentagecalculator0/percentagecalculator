"use client";

import { useId, useMemo, useState } from "react";
import { calculate, type Mode, type CalcResult } from "@/lib/calc";
import { parseNumber, formatNumber, fill } from "@/lib/format";

export type CalcMessages = {
  modeLabel: string;
  modes: Record<Mode, string>;
  fields: Record<Mode, [string, string]>;
  buttons: { reset: string; copy: string; copied: string; copyFailed: string };
  hint: string; resultLabel: string; formulaLabel: string; stepsLabel: string; noteNegative: string;
  headline: Record<Mode, string>;
  sentence: Record<string, string>;
  formula: Record<Mode, string>;
  steps: Record<Mode, string[]>;
  errors: Record<string, string>;
};

const ORDER: Mode[] = ["increase", "decrease", "increaseBy", "decreaseBy", "reverseIncrease", "reverseDecrease", "difference"];

export default function Calculator({ messages: t, locale, initialMode = "increase" }: { messages: CalcMessages; locale: string; initialMode?: Mode }) {
  const uid = useId();
  const [mode, setMode] = useState<Mode>(initialMode);
  const [x, setX] = useState("");
  const [y, setY] = useState("");
  const [copyState, setCopyState] = useState<"idle" | "copied" | "failed">("idle");

  const view = useMemo(() => {
    const px = parseNumber(x, locale);
    const py = parseNumber(y, locale);
    const errX = !px.ok && px.error !== "empty" ? t.errors[px.error] : "";
    const errY = !py.ok && py.error !== "empty" ? t.errors[py.error] : "";
    if (!px.ok || !py.ok) return { errX, errY, result: null as CalcResult | null, px, py };
    return { errX, errY, result: calculate(mode, px.value, py.value), px, py };
  }, [x, y, mode, locale, t.errors]);

  const f = (n: number, d = 4) => formatNumber(n, locale, d);
  let headline = "", sentence = "", steps: string[] = [], formulaText = "", negNote = false, calcError = "";

  if (view.result) {
    const r = view.result;
    if (!r.ok) calcError = t.errors[r.error];
    else {
      const p = r.parts;
      const vars: Record<string, string> = { value: f(r.value), pct: f(r.value) };
      for (const [k, v] of Object.entries(p)) vars[k] = k === "ratio" || k === "rate" || k === "factor" ? f(v, 6) : f(v);
      if (mode === "decrease") vars.drop = f(-p.diff);
      headline = fill(t.headline[mode], vars);
      let key: string = mode;
      if (mode === "increase" || mode === "decrease") key = p.diff > 0 ? "up" : p.diff < 0 ? "down" : "same";
      vars.abs = f(Math.abs(mode === "decrease" ? -p.diff / p.absOld * 100 : r.value));
      sentence = fill(t.sentence[key], vars);
      steps = t.steps[mode].map((s) => fill(s, vars));
      formulaText = t.formula[mode];
      negNote = (mode === "increase" || mode === "decrease") && p.old < 0;
    }
  }

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(`${sentence}`);
      setCopyState("copied");
    } catch { setCopyState("failed"); }
    setTimeout(() => setCopyState("idle"), 2500);
  };
  const reset = () => { setX(""); setY(""); setCopyState("idle"); };
  const ready = view.result?.ok === true;

  return (
    <div className="calc">
      <div className="field">
        <label htmlFor={`${uid}-mode`}>{t.modeLabel}</label>
        <select id={`${uid}-mode`} value={mode} onChange={(e) => { setMode(e.target.value as Mode); setCopyState("idle"); }}>
          {ORDER.map((m) => <option key={m} value={m}>{t.modes[m]}</option>)}
        </select>
      </div>
      <div className="row">
        {([[x, setX, view.errX, 0], [y, setY, view.errY, 1]] as const).map(([val, set, err, i]) => (
          <div className="field" key={i}>
            <label htmlFor={`${uid}-f${i}`}>{t.fields[mode][i]}</label>
            <input id={`${uid}-f${i}`} type="text" inputMode="decimal" autoComplete="off" spellCheck={false}
              value={val} onChange={(e) => { set(e.target.value.slice(0, 40)); setCopyState("idle"); }}
              aria-invalid={err ? true : undefined} aria-describedby={err ? `${uid}-e${i}` : undefined} />
            {err && <p className="error" id={`${uid}-e${i}`} role="alert">{err}</p>}
          </div>
        ))}
      </div>
      <div className="actions">
        <button type="button" className="btn secondary" onClick={reset}>{t.buttons.reset}</button>
        <button type="button" className="btn" onClick={copy} disabled={!ready}>{copyState === "copied" ? t.buttons.copied : t.buttons.copy}</button>
      </div>
      {copyState === "failed" && <p className="error" role="alert">{t.buttons.copyFailed}</p>}

      <div className="result" aria-live="polite" aria-atomic="true">
        {calcError ? <p className="error" role="alert">{calcError}</p>
          : ready ? (
            <>
              <p className="result-label">{t.resultLabel}</p>
              <p className="headline">{headline}</p>
              <p>{sentence}</p>
              {negNote && <p className="note">{t.noteNegative}</p>}
              <h3>{t.formulaLabel}</h3>
              <p className="formula">{formulaText}</p>
              <h3>{t.stepsLabel}</h3>
              <ol>{steps.map((s, i) => <li key={i}>{s}</li>)}</ol>
            </>
          ) : <p className="hint">{t.hint}</p>}
      </div>
    </div>
  );
}
