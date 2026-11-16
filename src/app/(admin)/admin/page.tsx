import { cookies } from "next/headers";
import AdminLogin from "@/components/AdminLogin";
import AdminPanel from "@/components/AdminPanel";
import { getEnv } from "@/lib/env";
import { getStore } from "@/lib/store";
import { verifySession } from "@/lib/security";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const env = await getEnv();
  const token = (await cookies()).get("pic_admin")?.value;
  if (!(await verifySession(env.ADMIN_SECRET, token))) return <AdminLogin />;
  const store = await getStore();
  const rows = store ? await store.listForAdmin(200) : [];
  return <AdminPanel rows={rows} />;
}
