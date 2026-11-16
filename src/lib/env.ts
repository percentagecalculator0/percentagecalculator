// The ONLY place that touches Cloudflare bindings. If you ever switch the deployment adapter, change just this file.
export type D1Stmt = {
  bind: (...v: unknown[]) => D1Stmt;
  first: <T = unknown>() => Promise<T | null>;
  all: <T = unknown>() => Promise<{ results: T[] }>;
  run: () => Promise<{ meta?: { changes?: number } }>;
};
export type D1Like = { prepare: (q: string) => D1Stmt };
export type AppEnv = { DB?: D1Like; ADMIN_SECRET?: string; TURNSTILE_SECRET_KEY?: string; IP_HASH_SALT?: string };

export const isProd = () => (typeof process !== "undefined" ? process.env?.NODE_ENV === "production" : true);

export async function getEnv(): Promise<AppEnv> {
  let cf: Record<string, unknown> = {};
  try {
    // Available on Cloudflare Workers (vinext and OpenNext both run on Workers). Not available in plain `next dev`.
    const mod = (await import(/* webpackIgnore: true */ /* @vite-ignore */ "cloudflare:workers")) as { env?: Record<string, unknown> };
    cf = mod.env ?? {};
  } catch { /* local dev without Workers runtime */ }
  const pe = typeof process !== "undefined" ? process.env : ({} as Record<string, string | undefined>);
  const str = (k: string) => (typeof cf[k] === "string" ? (cf[k] as string) : pe[k]);
  return { DB: cf.DB as D1Like | undefined, ADMIN_SECRET: str("ADMIN_SECRET"), TURNSTILE_SECRET_KEY: str("TURNSTILE_SECRET_KEY"), IP_HASH_SALT: str("IP_HASH_SALT") };
}
