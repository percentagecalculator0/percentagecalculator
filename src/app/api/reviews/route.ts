import { NextResponse } from "next/server";
import { getEnv, isProd } from "@/lib/env";
import { getStore } from "@/lib/store";
import { validateReview } from "@/lib/validate";
import { LOCALE_CODES } from "@/lib/i18n/config";
import { SITE } from "@/lib/seo";
import { getClientIp, sameOrigin, sha256Hex, verifyTurnstile } from "@/lib/security";

const MAX_PER_HOUR = 3;
const reply = (body: Record<string, unknown>, status = 200) => NextResponse.json(body, { status, headers: { "Cache-Control": "no-store" } });
const fail = (code: string, status: number, field?: string) => reply({ ok: false, code, ...(field ? { field } : {}) }, status);

export async function POST(req: Request) {
  if (!sameOrigin(req, SITE)) return fail("forbidden", 403);
  if (!(req.headers.get("content-type") ?? "").toLowerCase().startsWith("application/json")) return fail("invalid", 415);

  const raw = await req.text();
  if (raw.length > 8000) return fail("invalid", 413);
  let data: Record<string, unknown>;
  try { data = JSON.parse(raw); if (!data || typeof data !== "object" || Array.isArray(data)) throw 0; } catch { return fail("invalid", 400); }

  // Honeypot: real people never see or fill this field. Bots get a fake "success" and nothing is stored.
  if (typeof data.website === "string" && data.website.trim() !== "") return reply({ ok: true });

  const lang = typeof data.lang === "string" && LOCALE_CODES.includes(data.lang) ? data.lang : null;
  if (!lang) return fail("invalid", 400);
  if (typeof data.elapsedMs === "number" && data.elapsedMs < 3000) return fail("tooFast", 400);

  // 1) Server-side validation, including the mandatory link check.
  const v = validateReview({ name: data.name, rating: data.rating, body: data.body });
  if (!v.ok) return fail(v.code, 400, v.field);

  const env = await getEnv();
  const store = await getStore();
  if (!store) return fail("server", 503);

  // 2) Cloudflare Turnstile (fails closed in production if the secret is missing).
  const ip = getClientIp(req);
  if (env.TURNSTILE_SECRET_KEY) {
    const token = typeof data.turnstileToken === "string" ? data.turnstileToken : "";
    if (!token || !(await verifyTurnstile(env.TURNSTILE_SECRET_KEY, token, ip))) return fail("turnstile", 400);
  } else if (isProd()) return fail("server", 503);

  // 3) Rate limit per IP (stored only as a salted hash) and duplicate detection.
  const salt = env.IP_HASH_SALT ?? env.ADMIN_SECRET;
  if (!salt) return fail("server", 503);
  const ipHash = await sha256Hex(`${salt}|${ip}`);
  const now = Date.now();
  if ((await store.countRecentByIp(ipHash, now - 3_600_000)) >= MAX_PER_HOUR) return fail("rate", 429);
  const bodyHash = await sha256Hex(v.clean.body.toLowerCase().replace(/[^\p{L}\p{N}]/gu, ""));
  if (await store.bodyHashExists(bodyHash)) return fail("duplicate", 409);

  // 4) Saved as "pending". It is shown publicly only after the owner approves it.
  try {
    await store.insert({ ...v.clean, lang, ipHash, bodyHash, createdAt: now });
  } catch { return fail("server", 500); }
  return reply({ ok: true });
}
