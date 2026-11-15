import { describe, it, expect } from "vitest";
import { containsLink } from "../src/lib/linkguard";
import { validateReview } from "../src/lib/validate";

// Every one of these MUST be rejected.
export const MUST_REJECT: string[] = [
  "Visit http://example.com for more",
  "check https://spam.shop/offer now",
  "ftp://files.example.org/a",
  "go to www.example.com",
  "example.com",
  "my site is example dot com",
  "site[dot]com",
  "site (dot) com",
  "buy at shop.xyz now",
  "see mysite.ru",
  "visit store.shop today",
  "promo.in",
  "w w w . e x a m p l e . c o m",
  "h t t p : / / evil . com",
  "mail me at john@example.com",
  "follow @spammer_handle",
  "bit.ly/3abcde",
  "t.co/xyz123",
  "tinyurl com abc",
  "ｗｗｗ．ｅｘａｍｐｌｅ．ｃｏｍ",
  "exаmple.com",                       // Cyrillic "а"
  "exam\u200bple.com",                 // zero-width space
  "<a href='x'>click</a>",
  "[click here](http://x.y)",
  "[click here](spam)",
  "example . com",
  "visit h t t p s : // x",
  "my dotcom",
  "bit . ly / abc",
  "wa.me/123456",
  "t . me / channel",
  "Visit EXAMPLE.COM now",
  "ex-ample.net",
  "192.168.1.1",
  "пример.рф",
  "site d0t c0m",
  "go to example,com",
  "example\u200b.\u200bcom",
  "𝐞𝐱𝐚𝐦𝐩𝐥𝐞.com",
  "mailto:me@x.com",
  "javascript:alert(1)",
  "&lt;a href&gt;",
  "मेरी साइट example डॉट com",
  "example نقطة com",
  "john at gmail dot com",
  "name [at] domain [dot] org",
  "ᴡᴡᴡ.sіte.com",
  "ｈｔｔｐｓ：／／example",
  "shop.site/deals",
  "check my page.io",
  "see goo.gl/abc",
  "site-dot-com",
];

// These are normal review sentences and MUST pass.
export const MUST_ACCEPT: string[] = [
  "Very useful calculator, it saved me a lot of time!",
  "I saved 12.5 percent on my rent. Very clear steps!",
  "Works well.Thanks",
  "It cost $1,250.50 last year",
  "Price went from 80 to 100, that's 25%",
  "e.g. this is great, i.e. very clear",
  "Super hilfreich, danke! Genau das, was ich gesucht habe.",
  "बहुत उपयोगी कैलकुलेटर, धन्यवाद।",
  "حاسبة ممتازة وسهلة الاستخدام",
  "Mr. Smith recommended it to our team",
  "I like the polka dot dress example",
  "Great tool.It helped me with my salary",
  "Muy útil. ¡Gracias por la explicación paso a paso!",
  "Le résultat est clair et les étapes sont faciles à suivre.",
  "Terima kasih, penjelasannya mudah dimengerti.",
  "Rating went from 4.5 to 4.8 after the update",
  "10.50 became 12.75, a 21.4% rise",
  "I use it every day :) 5/5",
  "Is the answer 33.33% or 50%? Both are right depending on direction.",
  "Version 2.0 is much faster than before",
];

describe("link guard rejects", () => {
  it("has at least 15 reject cases", () => expect(MUST_REJECT.length).toBeGreaterThanOrEqual(15));
  it.each(MUST_REJECT)("rejects %j", (s) => expect(containsLink(s).blocked).toBe(true));
});

describe("link guard accepts normal text", () => {
  it.each(MUST_ACCEPT)("accepts %j", (s) => expect(containsLink(s)).toEqual({ blocked: false }));
});

describe("validateReview", () => {
  const ok = { name: "Anna", rating: 5, body: "This calculator is clear and the steps are easy to follow." };
  it("accepts a good review", () => expect(validateReview(ok).ok).toBe(true));
  it("rejects bad rating", () => { for (const r of [0, 6, 2.5, "5", null, NaN]) expect(validateReview({ ...ok, rating: r }).ok).toBe(false); });
  it("rejects short and long text", () => {
    expect(validateReview({ ...ok, body: "too short" })).toMatchObject({ ok: false, code: "body" });
    expect(validateReview({ ...ok, body: "a".repeat(501) }).ok).toBe(false);
    expect(validateReview({ ...ok, name: "A" })).toMatchObject({ ok: false, code: "name" });
  });
  it("accepts exactly 20 and 500 characters", () => {
    expect(validateReview({ ...ok, body: "x".repeat(10) + " " + "y".repeat(9) }).ok).toBe(true);
    expect(validateReview({ ...ok, body: ("word ".repeat(100)).trim().slice(0, 500) }).ok).toBe(true);
  });
  it("rejects links in the name and in the body", () => {
    expect(validateReview({ ...ok, name: "shop.xyz" })).toMatchObject({ ok: false, code: "links" });
    expect(validateReview({ ...ok, body: "Great tool, see my page at example dot com for more" })).toMatchObject({ ok: false, code: "links" });
  });
  it("rejects non-string input", () => expect(validateReview({ name: 1, rating: 5, body: {} }).ok).toBe(false));
  it("rejects profanity and spam", () => {
    expect(validateReview({ ...ok, body: "This is shit and I hate this calculator a lot" })).toMatchObject({ ok: false, code: "profanity" });
    expect(validateReview({ ...ok, body: "Best casino bonus and free money for everyone here" })).toMatchObject({ ok: false, code: "spam" });
    expect(validateReview({ ...ok, body: "Call me on 0044 7911 123456 for a good deal today" })).toMatchObject({ ok: false, code: "spam" });
  });
  it("does not flag the Scunthorpe problem", () => {
    expect(validateReview({ ...ok, body: "I am from Scunthorpe and the class assessment was easy to do" }).ok).toBe(true);
  });
  it("strips control and zero-width characters from stored text", () => {
    const r = validateReview({ ...ok, body: "Clear\u0000 and\u200b simple\u202e calculator with good steps" });
    expect(r.ok && r.clean.body).toBe("Clear and simple calculator with good steps");
  });
});
