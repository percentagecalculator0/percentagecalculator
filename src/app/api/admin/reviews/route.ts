import { NextResponse } from "next/server";
import { getEnv } from "@/lib/env";
import { getStore } from "@/lib/store";
import { SITE } from "@/lib/seo";
import { readCookie, sameOrigin, verifySession } from "@/lib/security";

const out = (b: Record<string, unknown>, s = 200) => NextResponse.json(b, { status: s, headers: { "Cache-Control": "no-store" } });

export async function POST(req: Request) {
  if (!sameOrigin(req, SITE)) return out({ ok: false }, 403);
  const env = await getEnv();
  if (!(await verifySession(env.ADMIN_SECRET, readCookie(req, "pic_admin")))) return out({ ok: false }, 401);
  const store = await getStore();
  if (!store) return out({ ok: false }, 503);

  let body: { id?: unknown; action?: unknown };
  try { body = await req.json(); } catch { return out({ ok: false }, 400); }
  const id = body.id;
  if (typeof id !== "number" || !Number.isInteger(id) || id < 1) return out({ ok: false }, 400);
  if (body.action === "approve") return out({ ok: await store.setApproved(id) });
  if (body.action === "delete") return out({ ok: await store.remove(id) });
  return out({ ok: false }, 400);
}
