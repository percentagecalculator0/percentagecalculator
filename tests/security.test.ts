import { describe, it, expect } from "vitest";
import { createSession, verifySession, safeEqual, sameOrigin, sha256Hex } from "../src/lib/security";

describe("admin session", () => {
  const secret = "a-long-test-secret-value";
  it("accepts a fresh token", async () => expect(await verifySession(secret, await createSession(secret, 60_000))).toBe(true));
  it("rejects wrong secret", async () => expect(await verifySession("other-secret-value!", await createSession(secret, 60_000))).toBe(false));
  it("rejects expired token", async () => expect(await verifySession(secret, await createSession(secret, 1000, Date.now() - 5000))).toBe(false));
  it("rejects tampered expiry", async () => {
    const t = await createSession(secret, 60_000); const [p, s] = t.split(".");
    expect(await verifySession(secret, `${Number(p) + 99999999}.${s}`)).toBe(false);
  });
  it("rejects missing or garbage", async () => {
    for (const t of [undefined, null, "", "abc", "123.456", "9999999999999.@@@"]) expect(await verifySession(secret, t as string)).toBe(false);
    expect(await verifySession(undefined, "1.2")).toBe(false);
  });
});
describe("helpers", () => {
  it("safeEqual", async () => { expect(await safeEqual("abc", "abc")).toBe(true); expect(await safeEqual("abc", "abd")).toBe(false); expect(await safeEqual("", "x")).toBe(false); });
  it("sha256", async () => expect(await sha256Hex("abc")).toBe("ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad"));
  const mk = (origin?: string) => new Request("https://percentageincreasecalculator.net/api/reviews", { method: "POST", headers: origin ? { origin } : {} });
  it("sameOrigin allows only our origin", () => {
    const site = "https://percentageincreasecalculator.net";
    expect(sameOrigin(mk(site), site)).toBe(true);
    expect(sameOrigin(mk("https://evil.example"), site)).toBe(false);
    expect(sameOrigin(mk(undefined), site)).toBe(false);
    expect(sameOrigin(mk("null"), site)).toBe(false);
  });
});
