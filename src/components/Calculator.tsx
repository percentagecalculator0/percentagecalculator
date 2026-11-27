"use client";

import { useId, useMemo, useRef, useState } from "react";
import {
  defaultInputs,
  fieldsFor,
  fmt,
  solve,
  usesDirection,
  type Direction,
  type Inputs,
  type Mode,
} from "@/lib/solve";

type Labels = Record<string, { label?: string; placeholder?: string }>;

export default function Calculator({ mode, labels }: { mode: Mode; labels?: Labels }) {
  const uid = useId();
  const [inputs, setInputs] = useState<Inputs>(() => defaultInputs(mode));
  const [copyState, setCopyState] = useState<"idle" | "done" | "failed">("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const fields = fieldsFor(mode).map((f) => ({ ...f, ...(labels?.[f.key] ?? {}) }));
  const hasDir = usesDirection(mode);
  const dir: Direction = inputs.dir === "decrease" ? "decrease" : "increase";
  const sol = useMemo(() => solve(mode, inputs), [mode, inputs]);

  const setField = (key: string, value: string) =>
    setInputs((prev) => ({ ...prev, [key]: value }));

  const reset = () => {
    const blank: Inputs = {};
    for (const f of fields) blank[f.key] = "";
    if (hasDir) blank.dir = dir;
    setInputs(blank);
    setCopyState("idle");
    const first = document.getElementById(`${uid}-${fields[0].key}`);
    if (first instanceof HTMLInputElement) first.focus();
  };

  const copy = async () => {
    if (sol.status !== "ok") return;
    try {
      await navigator.clipboard.writeText(sol.copyText);
      setCopyState("done");
    } catch {
      setCopyState("failed");
    }
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopyState("idle"), 2500);
  };

  const errorId = `${uid}-error`;
  const hasError = sol.status === "error";

  return (
    <section className="calc" aria-label="Calculator">
      <div className="calc-inputs">
        {hasDir && (
          <fieldset className="seg">
            <legend>Direction</legend>
            {(["increase", "decrease"] as const).map((d) => (
              <label key={d}>
                <input
                  type="radio"
                  name={`${uid}-dir`}
                  value={d}
                  checked={dir === d}
                  onChange={() => setField("dir", d)}
                />
                <span>{d === "increase" ? "Increase" : "Decrease"}</span>
              </label>
            ))}
          </fieldset>
        )}

        {fields.map((f) => (
          <div className="field" key={f.key}>
            <label htmlFor={`${uid}-${f.key}`}>{f.label}</label>
            <div className="input-wrap">
              <input
                id={`${uid}-${f.key}`}
                type="text"
                inputMode="decimal"
                autoComplete="off"
                autoCorrect="off"
                spellCheck={false}
                placeholder={f.placeholder}
                value={inputs[f.key] ?? ""}
                maxLength={24}
                aria-invalid={hasError ? true : undefined}
                aria-describedby={hasError ? errorId : undefined}
                onChange={(e) => setField(f.key, e.target.value)}
                onFocus={(e) => e.currentTarget.select()}
              />
              {f.suffix && <span className="suffix" aria-hidden="true">{f.suffix}</span>}
            </div>
          </div>
        ))}

        <div className="actions">
          <button type="button" className="btn btn-ghost" onClick={reset}>
            Reset
          </button>
          <button
            type="button"
            className="btn"
            onClick={copy}
            disabled={sol.status !== "ok"}
          >
            Copy result
          </button>
          <span className="copy-note" role="status" aria-live="polite">
            {copyState === "done" && "Copied to clipboard."}
            {copyState === "failed" && "Copy isn’t available in this browser."}
          </span>
        </div>
      </div>

      <div
        className={`result tone-${sol.status === "ok" ? sol.tone : "neutral"}`}
        aria-live="polite"
        aria-atomic="true"
      >
        {sol.status === "empty" && (
          <p className="result-hint">{sol.message}</p>
        )}

        {sol.status === "error" && (
          <p className="result-error" id={errorId} role="alert">
            {sol.message}
          </p>
        )}

        {sol.status === "ok" && (
          <>
            <p className="result-label">{sol.label}</p>
            <p className="result-value">{sol.display}</p>
            {sol.detail && <p className="result-detail">{sol.detail}</p>}
            {sol.bars && <Bars bars={sol.bars} />}
            <p className="steps-title">How it’s worked out</p>
            <ol className="steps">
              {sol.steps.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ol>
          </>
        )}
      </div>
    </section>
  );
}

function Bars({ bars }: { bars: { label: string; value: number }[] }) {
  const max = Math.max(...bars.map((b) => b.value));
  const summary = bars.map((b) => `${b.label} ${fmt(b.value)}`).join(", ");
  return (
    <div className="bars" role="img" aria-label={`Bar chart: ${summary}`}>
      {bars.map((b, i) => (
        <div className="bar-row" key={b.label}>
          <span className="bar-label">{b.label}</span>
          <span className="bar-track">
            <span
              className={`bar-fill bar-${i === bars.length - 1 ? "last" : "first"}`}
              style={{ width: `${Math.max((b.value / max) * 100, 1.5)}%` }}
            />
          </span>
          <span className="bar-val">{fmt(b.value)}</span>
        </div>
      ))}
    </div>
  );
}
