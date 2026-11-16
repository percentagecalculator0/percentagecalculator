import { NextResponse } from "next/server";
import { getEnv, isProd } from "@/lib/env";
import { getStore } from "@/lib/store";
import { SITE } from "@/lib/seo";
import { createSession, getClientIp, safeEqual, sameOrigin, sha256Hex } from "@/lib/security";

const MAX_FAILS = 5, WINDOW_MS = 15 * 60_000, SESSION_MS = 8 * 3_600_000;
const out = (b: Record<string, unknown>, s = 200) => NextResponse.json(b, { status: s, headers: { "Cache-Control": "no-store" } });

export async function POST(req: Request) {
  if (!sameOrigin(req, SITE)) return out({ ok: false }, 403);
  const env = await getEnv();
  const store = await getStore();
  if (!env.ADMIN_SECRET || env.ADMIN_SECRET.length < 12 || !store) return out({ ok: false, code: "not-configured" }, 503);

  let password = "";
  try { const j = await req.json(); password = typeof j?.password === "string" ? j.password.slice(0, 200) : ""; } catch { return out({ ok: false }, 400); }

  const ipHash = await sha256Hex(`${env.IP_HASH_SALT ?? env.ADMIN_SECRET}|${getClientIp(req)}`);
  const now = Date.now();
  if ((await store.countAdminFails(ipHash, now - WINDOW_MS)) >= MAX_FAILS) return out({ ok: false, code: "locked" }, 429);

  if (!(await safeEqual(password, env.ADMIN_SECRET))) {
    await store.recordAdminFail(ipHash, now);
    await new Promise((r) => setTimeout(r, 500)); // slow down guessing
    return out({ ok: false, code: "bad-password" }, 401);
  }
  const res = out({ ok: true });
  res.cookies.set({ name: "pic_admin", value: await createSession(env.ADMIN_SECRET, SESSION_MS), httpOnly: true, secure: isProd(), sameSite: "strict", path: "/", maxAge: SESSION_MS / 1000 });
  return res;
}
