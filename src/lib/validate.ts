import { containsLink } from "./linkguard";
import { checkSpam } from "./spam";

export const NAME_MIN = 2, NAME_MAX = 40, BODY_MIN = 20, BODY_MAX = 500;

export type ReviewInput = { name: unknown; rating: unknown; body: unknown };
export type ReviewErrorCode = "invalid" | "name" | "body" | "rating" | "links" | "spam" | "profanity";
export type ReviewResult =
  | { ok: true; clean: { name: string; rating: number; body: string } }
  | { ok: false; code: ReviewErrorCode; field?: "name" | "body" | "rating" };

const len = (s: string) => [...s].length; // count characters, not UTF-16 units

/** Remove control characters and bidi/zero-width tricks from text that will be STORED. (ZWJ/ZWNJ are kept: some scripts need them.) */
export function cleanText(s: string): string {
  return s
    .normalize("NFC")
    .replace(/[\p{Cc}\u200b\u200e\u200f\u202a-\u202e\u2060\u2066-\u2069\ufeff\u00ad]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function validateReview(input: ReviewInput): ReviewResult {
  if (typeof input.name !== "string" || typeof input.body !== "string") return { ok: false, code: "invalid" };
  const rating = typeof input.rating === "number" ? input.rating : Number.NaN;
  if (!Number.isInteger(rating) || rating < 1 || rating > 5) return { ok: false, code: "rating", field: "rating" };

  // Reject absurdly long raw input before doing any heavy work.
  if (input.name.length > 200 || input.body.length > 1500) return { ok: false, code: "invalid" };
  const name = cleanText(input.name);
  const body = cleanText(input.body);
  if (len(name) < NAME_MIN || len(name) > NAME_MAX) return { ok: false, code: "name", field: "name" };
  if (len(body) < BODY_MIN || len(body) > BODY_MAX) return { ok: false, code: "body", field: "body" };

  // Link check runs on the RAW text too, so zero-width tricks cannot hide a link from the cleaned copy.
  for (const [text, field] of [[input.name, "name"], [input.body, "body"], [name, "name"], [body, "body"]] as const) {
    if (containsLink(text).blocked) return { ok: false, code: "links", field };
  }
  for (const [text, field] of [[name, "name"], [body, "body"]] as const) {
    const s = checkSpam(text);
    if (s.flagged) return { ok: false, code: s.reason, field };
  }
  return { ok: true, clean: { name, rating, body } };
}
