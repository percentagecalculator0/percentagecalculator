import { NextResponse } from "next/server";
import { SITE } from "@/lib/seo";
import { sameOrigin } from "@/lib/security";

export async function POST(req: Request) {
  if (!sameOrigin(req, SITE)) return NextResponse.json({ ok: false }, { status: 403 });
  const res = NextResponse.json({ ok: true }, { headers: { "Cache-Control": "no-store" } });
  res.cookies.set({ name: "pic_admin", value: "", path: "/", maxAge: 0 });
  return res;
}
