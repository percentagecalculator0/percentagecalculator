import { getEnv, isProd, type D1Like } from "./env";

export type ReviewRow = { id: number; name: string; rating: number; body: string; lang: string; status: "pending" | "approved"; created_at: number };
export type NewReview = { name: string; rating: number; body: string; lang: string; ipHash: string; bodyHash: string; createdAt: number };

export interface Store {
  countRecentByIp(ipHash: string, since: number): Promise<number>;
  bodyHashExists(bodyHash: string): Promise<boolean>;
  insert(r: NewReview): Promise<void>;
  listApproved(lang: string, limit: number): Promise<ReviewRow[]>;
  listForAdmin(limit: number): Promise<ReviewRow[]>;
  setApproved(id: number): Promise<boolean>;
  remove(id: number): Promise<boolean>;
  countAdminFails(ipHash: string, since: number): Promise<number>;
  recordAdminFail(ipHash: string, at: number): Promise<void>;
}

// All queries below are parameterised (?) : user text is never concatenated into SQL.
class D1Store implements Store {
  constructor(private db: D1Like) {}
  async countRecentByIp(ipHash: string, since: number) {
    const r = await this.db.prepare("SELECT COUNT(*) AS n FROM reviews WHERE ip_hash = ? AND created_at > ?").bind(ipHash, since).first<{ n: number }>();
    return r?.n ?? 0;
  }
  async bodyHashExists(h: string) {
    return (await this.db.prepare("SELECT 1 AS x FROM reviews WHERE body_hash = ? LIMIT 1").bind(h).first()) !== null;
  }
  async insert(r: NewReview) {
    await this.db.prepare("INSERT INTO reviews (name, rating, body, lang, status, ip_hash, body_hash, created_at) VALUES (?, ?, ?, ?, 'pending', ?, ?, ?)")
      .bind(r.name, r.rating, r.body, r.lang, r.ipHash, r.bodyHash, r.createdAt).run();
  }
  async listApproved(lang: string, limit: number) {
    return (await this.db.prepare("SELECT id, name, rating, body, lang, status, created_at FROM reviews WHERE status = 'approved' AND lang = ? ORDER BY created_at DESC LIMIT ?").bind(lang, limit).all<ReviewRow>()).results;
  }
  async listForAdmin(limit: number) {
    return (await this.db.prepare("SELECT id, name, rating, body, lang, status, created_at FROM reviews ORDER BY CASE status WHEN 'pending' THEN 0 ELSE 1 END, created_at DESC LIMIT ?").bind(limit).all<ReviewRow>()).results;
  }
  async setApproved(id: number) {
    return ((await this.db.prepare("UPDATE reviews SET status = 'approved' WHERE id = ?").bind(id).run()).meta?.changes ?? 0) > 0;
  }
  async remove(id: number) {
    return ((await this.db.prepare("DELETE FROM reviews WHERE id = ?").bind(id).run()).meta?.changes ?? 0) > 0;
  }
  async countAdminFails(ipHash: string, since: number) {
    const r = await this.db.prepare("SELECT COUNT(*) AS n FROM admin_attempts WHERE ip_hash = ? AND at > ?").bind(ipHash, since).first<{ n: number }>();
    return r?.n ?? 0;
  }
  async recordAdminFail(ipHash: string, at: number) {
    await this.db.prepare("INSERT INTO admin_attempts (ip_hash, at) VALUES (?, ?)").bind(ipHash, at).run();
    await this.db.prepare("DELETE FROM admin_attempts WHERE at < ?").bind(at - 86_400_000).run(); // keep one day
  }
}

// In-memory store, used ONLY for local development when no D1 binding exists. Never used in production.
class MemoryStore implements Store {
  rows: (ReviewRow & { ipHash: string; bodyHash: string })[] = []; fails: { ip: string; at: number }[] = []; next = 1;
  async countRecentByIp(ip: string, since: number) { return this.rows.filter((r) => r.ipHash === ip && r.created_at > since).length; }
  async bodyHashExists(h: string) { return this.rows.some((r) => r.bodyHash === h); }
  async insert(r: NewReview) { this.rows.push({ id: this.next++, name: r.name, rating: r.rating, body: r.body, lang: r.lang, status: "pending", created_at: r.createdAt, ipHash: r.ipHash, bodyHash: r.bodyHash }); }
  async listApproved(lang: string, limit: number) { return this.rows.filter((r) => r.status === "approved" && r.lang === lang).sort((a, b) => b.created_at - a.created_at).slice(0, limit); }
  async listForAdmin(limit: number) { return [...this.rows].sort((a, b) => Number(a.status === "approved") - Number(b.status === "approved") || b.created_at - a.created_at).slice(0, limit); }
  async setApproved(id: number) { const r = this.rows.find((x) => x.id === id); if (r) r.status = "approved"; return !!r; }
  async remove(id: number) { const n = this.rows.length; this.rows = this.rows.filter((x) => x.id !== id); return this.rows.length < n; }
  async countAdminFails(ip: string, since: number) { return this.fails.filter((f) => f.ip === ip && f.at > since).length; }
  async recordAdminFail(ip: string, at: number) { this.fails.push({ ip, at }); }
}

export async function getStore(): Promise<Store | null> {
  const { DB } = await getEnv();
  if (DB) return new D1Store(DB);
  if (isProd()) return null; // production without a database binding: fail closed
  const g = globalThis as unknown as { __picDevStore?: MemoryStore };
  return (g.__picDevStore ??= new MemoryStore());
}
