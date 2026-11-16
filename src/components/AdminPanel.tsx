"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

type Row = { id: number; name: string; rating: number; body: string; lang: string; status: "pending" | "approved"; created_at: number };

export default function AdminPanel({ rows }: { rows: Row[] }) {
  const router = useRouter();
  const [busy, setBusy] = useState<number | null>(null);
  const [err, setErr] = useState("");
  const act = async (id: number, action: "approve" | "delete") => {
    if (action === "delete" && !window.confirm("Delete this review permanently?")) return;
    setBusy(id); setErr("");
    try {
      const res = await fetch("/api/admin/reviews", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id, action }) });
      const j = (await res.json().catch(() => ({}))) as { ok?: boolean };
      if (!j.ok) setErr(res.status === 401 ? "Session expired. Reload and sign in again." : "Action failed.");
      else router.refresh();
    } catch { setErr("Network error."); } finally { setBusy(null); }
  };
  const logout = async () => { await fetch("/api/admin/logout", { method: "POST" }); router.refresh(); };
  const pending = rows.filter((r) => r.status === "pending").length;
  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
        <h1>Review moderation</h1>
        <button className="btn secondary" onClick={logout}>Sign out</button>
      </div>
      <p>{pending} pending · {rows.length - pending} approved shown. Text below is plain text; nothing is clickable.</p>
      {err && <p className="error" role="alert">{err}</p>}
      {rows.length === 0 && <p>No reviews yet.</p>}
      {rows.map((r) => (
        <article className="card" key={r.id} style={{ marginBottom: ".75rem" }}>
          <p><strong>{r.status === "pending" ? "PENDING" : "Approved"}</strong> · {r.lang} · {"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)} · {new Date(r.created_at).toISOString().slice(0, 16).replace("T", " ")} UTC</p>
          <p><strong>{r.name}</strong></p>
          <p style={{ whiteSpace: "pre-wrap" }}>{r.body}</p>
          <div className="actions">
            {r.status === "pending" && <button className="btn" disabled={busy === r.id} onClick={() => act(r.id, "approve")}>Approve</button>}
            <button className="btn secondary" disabled={busy === r.id} onClick={() => act(r.id, "delete")}>Delete</button>
          </div>
        </article>
      ))}
    </>
  );
}
