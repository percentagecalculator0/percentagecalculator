"use client";

import { useEffect, useRef, useState } from "react";
import { containsLink } from "@/lib/linkguard";
import { fill } from "@/lib/format";

export type ReviewMessages = {
  formTitle: string; nameLabel: string; nameHelp: string; ratingLabel: string; starsLabel: string; bodyLabel: string; bodyHelp: string;
  counter: string; submit: string; sending: string; success: string; notice: string; errors: Record<string, string>;
};

const len = (s: string) => [...s.trim()].length;
type Status = { kind: "idle" } | { kind: "sending" } | { kind: "ok" } | { kind: "error"; code: string };

export default function ReviewForm({ m, lang, siteKey }: { m: ReviewMessages; lang: string; siteKey?: string }) {
  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [body, setBody] = useState("");
  const [trap, setTrap] = useState("");
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [fieldErr, setFieldErr] = useState<{ name?: string; body?: string; rating?: string }>({});
  const shownAt = useRef(0);
  useEffect(() => { shownAt.current = Date.now(); }, []);

  // Early, friendly feedback. The server repeats every one of these checks, so this is never the only protection.
  const check = () => {
    const e: typeof fieldErr = {};
    if (len(name) < 2 || len(name) > 40) e.name = m.errors.name;
    if (len(body) < 20 || len(body) > 500) e.body = m.errors.body;
    if (rating < 1) e.rating = m.errors.rating;
    if (containsLink(name).blocked) e.name = m.errors.links;
    if (containsLink(body).blocked) e.body = m.errors.links;
    return e;
  };

  const submit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    if (status.kind === "sending") return;
    const e = check(); setFieldErr(e);
    if (Object.keys(e).length) return;
    const tokenEl = ev.currentTarget.elements.namedItem("cf-turnstile-response") as HTMLInputElement | null;
    const token = tokenEl?.value ?? "";
    if (siteKey && !token) { setStatus({ kind: "error", code: "turnstile" }); return; }
    setStatus({ kind: "sending" });
    try {
      const res = await fetch("/api/reviews", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, rating, body, lang, website: trap, elapsedMs: Date.now() - shownAt.current, turnstileToken: token }),
      });
      const j = (await res.json().catch(() => ({}))) as { ok?: boolean; code?: string; field?: "name" | "body" | "rating" };
      if (j.ok) { setStatus({ kind: "ok" }); setName(""); setBody(""); setRating(0); }
      else {
        const code = j.code && m.errors[j.code] ? j.code : "server";
        if (j.field) setFieldErr({ [j.field]: m.errors[code] });
        setStatus({ kind: "error", code });
      }
    } catch { setStatus({ kind: "error", code: "network" }); }
    (window as unknown as { turnstile?: { reset: () => void } }).turnstile?.reset();
  };

  return (
    <form className="calc" onSubmit={submit} noValidate>
      <h2 style={{ marginTop: 0 }}>{m.formTitle}</h2>

      <div className="field">
        <label htmlFor="rv-name">{m.nameLabel}</label>
        <input id="rv-name" name="name" type="text" maxLength={40} autoComplete="nickname" value={name} onChange={(e) => setName(e.target.value)}
          aria-invalid={fieldErr.name ? true : undefined} aria-describedby="rv-name-h" required />
        <p className="help" id="rv-name-h">{m.nameHelp}</p>
        {fieldErr.name && <p className="error" role="alert">{fieldErr.name}</p>}
      </div>

      <fieldset className="rating" aria-describedby={fieldErr.rating ? "rv-rating-e" : undefined}>
        <legend>{m.ratingLabel}</legend>
        <div className="stars-input">
          {[1, 2, 3, 4, 5].map((n) => (
            <label key={n} className={rating >= n ? "star on" : "star"}>
              <input className="sr" type="radio" name="rating" value={n} checked={rating === n} onChange={() => setRating(n)} />
              <span aria-hidden="true">★</span>
              <span className="sr">{fill(m.starsLabel, { n: String(n) })}</span>
            </label>
          ))}
        </div>
        {fieldErr.rating && <p className="error" id="rv-rating-e" role="alert">{fieldErr.rating}</p>}
      </fieldset>

      <div className="field">
        <label htmlFor="rv-body">{m.bodyLabel}</label>
        <textarea id="rv-body" name="body" rows={5} maxLength={500} value={body} onChange={(e) => setBody(e.target.value)}
          aria-invalid={fieldErr.body ? true : undefined} aria-describedby="rv-body-h" required />
        <p className="help" id="rv-body-h">{m.bodyHelp} <span aria-live="off">{fill(m.counter, { n: String(len(body)) })}</span></p>
        {fieldErr.body && <p className="error" role="alert">{fieldErr.body}</p>}
      </div>

      {/* Honeypot: invisible to people and screen readers, tempting to bots. */}
      <div className="hp" aria-hidden="true">
        <label>Website<input type="text" name="website" tabIndex={-1} autoComplete="off" value={trap} onChange={(e) => setTrap(e.target.value)} /></label>
      </div>

      {siteKey && <div className="turnstile-box"><div className="cf-turnstile" data-sitekey={siteKey} data-theme="light" data-language={lang} /></div>}

      <div className="actions">
        <button className="btn" type="submit" disabled={status.kind === "sending"}>{status.kind === "sending" ? m.sending : m.submit}</button>
      </div>

      <div aria-live="polite" className="form-status">
        {status.kind === "ok" && <p className="success">{m.success}</p>}
        {status.kind === "error" && <p className="error" role="alert">{m.errors[status.code] ?? m.errors.server}</p>}
      </div>
      <p className="help">{m.notice}</p>
    </form>
  );
}
