// Small, dependency-free helpers built on Web Crypto (works in Workers, Node 20+ and browsers).
const enc = new TextEncoder();

export async function sha256Hex(input: string): Promise<string> {
  const buf = await crypto.subtle.digest("SHA-256", enc.encode(input));
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

const b64url = (bytes: Uint8Array) => btoa(String.fromCharCode(...bytes)).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
const b64urlDecode = (s: string) => Uint8Array.from(atob(s.replace(/-/g, "+").replace(/_/g, "/")), (c) => c.charCodeAt(0));
const hmacKey = (secret: string) => crypto.subtle.importKey("raw", enc.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign", "verify"]);

/** Constant-time string comparison (compares SHA-256 digests byte by byte, no early exit). */
export async function safeEqual(a: string, b: string): Promise<boolean> {
  const [x, y] = await Promise.all([crypto.subtle.digest("SHA-256", enc.encode(a)), crypto.subtle.digest("SHA-256", enc.encode(b))]);
  const ax = new Uint8Array(x), by = new Uint8Array(y);
  let diff = 0;
  for (let i = 0; i < ax.length; i++) diff |= ax[i] ^ by[i];
  return diff === 0;
}

/** Admin session token: "<expiryMs>.<signature>", signed with the admin secret. */
export async function createSession(secret: string, ttlMs: number, now = Date.now()): Promise<string> {
  const payload = String(now + ttlMs);
  const sig = new Uint8Array(await crypto.subtle.sign("HMAC", await hmacKey(secret), enc.encode(payload)));
  return `${payload}.${b64url(sig)}`;
}

export async function verifySession(secret: string | undefined, token: string | undefined | null, now = Date.now()): Promise<boolean> {
  if (!secret || !token) return false;
  const [payload, sig] = token.split(".");
  if (!payload || !sig || !/^\d{10,16}$/.test(payload)) return false;
  try {
    const ok = await crypto.subtle.verify("HMAC", await hmacKey(secret), b64urlDecode(sig), enc.encode(payload));
    return ok && Number(payload) > now;
  } catch { return false; }
}

export const getClientIp = (req: Request) => req.headers.get("cf-connecting-ip") ?? req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

/** CSRF defence for cookie-authenticated or form-style POSTs: the Origin header must be our own site. Fails closed. */
export function sameOrigin(req: Request, siteUrl: string): boolean {
  const origin = req.headers.get("origin");
  if (!origin) return false;
  try {
    const o = new URL(origin).origin;
    return o === new URL(req.url).origin || o === new URL(siteUrl).origin;
  } catch { return false; }
}

export function readCookie(req: Request, name: string): string | null {
  const m = (req.headers.get("cookie") ?? "").split(/;\s*/).find((c) => c.startsWith(`${name}=`));
  return m ? decodeURIComponent(m.slice(name.length + 1)) : null;
}

export async function verifyTurnstile(secret: string, token: string, ip: string): Promise<boolean> {
  try {
    const body = new URLSearchParams({ secret, response: token });
    if (ip !== "unknown") body.set("remoteip", ip);
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", { method: "POST", body });
    const data = (await res.json()) as { success?: boolean };
    return data.success === true;
  } catch { return false; }
}
