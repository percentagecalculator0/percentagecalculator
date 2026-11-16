"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const router = useRouter();
  const [pw, setPw] = useState("");
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);
  const submit = async (e: React.FormEvent) => {
    e.preventDefault(); setBusy(true); setMsg("");
    try {
      const res = await fetch("/api/admin/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ password: pw }) });
      const j = (await res.json().catch(() => ({}))) as { ok?: boolean; code?: string };
      if (j.ok) { router.refresh(); return; }
      setMsg(j.code === "locked" ? "Too many attempts. Try again in 15 minutes." : j.code === "not-configured" ? "Admin is not configured yet (ADMIN_SECRET or database missing)." : "Wrong password.");
    } catch { setMsg("Network error."); } finally { setBusy(false); setPw(""); }
  };
  return (
    <form onSubmit={submit} className="calc" style={{ maxWidth: 420, margin: "2rem auto" }}>
      <h1>Admin</h1>
      <div className="field">
        <label htmlFor="pw">Password</label>
        <input id="pw" type="password" autoComplete="current-password" value={pw} onChange={(e) => setPw(e.target.value)} />
      </div>
      <button className="btn" type="submit" disabled={busy || pw.length === 0}>Sign in</button>
      {msg && <p className="error" role="alert">{msg}</p>}
    </form>
  );
}
