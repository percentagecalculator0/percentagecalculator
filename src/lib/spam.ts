// Spam and profanity filter. A starter list: extend the arrays as you see real spam. Matching is on whole words.
export type SpamResult = { flagged: false } | { flagged: true; reason: "spam" | "profanity" };

const SPAM_PHRASES = [
  "casino", "viagra", "cialis", "forex", "bitcoin", "crypto", "porn", "xxx", "escort", "betting", "jackpot", "payday loan",
  "loan approval", "work from home", "earn money", "make money", "click here", "buy now", "free followers", "buy followers",
  "seo service", "seo services", "backlink", "backlinks", "telegram", "whatsapp", "weight loss", "adult dating", "cheap pills",
];
const PROFANITY = [
  // English
  "fuck", "fucking", "shit", "bitch", "asshole", "bastard", "cunt", "dick", "pussy", "nigger", "faggot", "slut", "whore",
  // Spanish / Portuguese / French / German / Indonesian / romanised Hindi
  "puta", "mierda", "cabron", "pendejo", "carajo", "caralho", "merda", "porra", "putain", "merde", "connard", "salope",
  "scheisse", "scheiße", "arschloch", "hurensohn", "fotze", "anjing", "bangsat", "kontol", "memek", "goblok", "bajingan",
  "chutiya", "madarchod", "bhosdi", "gandu", "harami",
  // Hindi / Arabic script
  "चूतिया", "मादरचोद", "भोसड़ी", "हरामी", "شرموطة", "منيوك", "ابن الكلب",
];

const esc = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const wordRe = (list: string[]) =>
  new RegExp(String.raw`(?:^|[^\p{L}\p{N}])(?:${list.map(esc).join("|")})(?![\p{L}\p{N}])`, "iu");
const SPAM_RE = wordRe(SPAM_PHRASES);
const PROFANITY_RE = wordRe(PROFANITY);

export function checkSpam(text: string): SpamResult {
  const plain = text.normalize("NFC").toLowerCase();
  const latin = text.normalize("NFKD").replace(/\p{M}/gu, "").toLowerCase()
    .replace(/(\p{L})\1{2,}/gu, "$1$1")                    // "fuuuuck" -> "fuuck"
    .replace(/(?<=\p{L})[*@$!](?=\p{L})/gu, "");           // "f*ck" style masking
  const squeezed = latin.replace(/(\p{L})\1+/gu, "$1");     // "fuuck" -> "fuck"
  for (const v of [plain, latin, squeezed]) if (PROFANITY_RE.test(v)) return { flagged: true, reason: "profanity" };

  if (SPAM_RE.test(plain) || SPAM_RE.test(latin)) return { flagged: true, reason: "spam" };
  if (/(?:\d[\s().\-]*){10,}/.test(text)) return { flagged: true, reason: "spam" };   // phone numbers
  if (/(.)\1{9,}/u.test(text)) return { flagged: true, reason: "spam" };              // aaaaaaaaaa
  return { flagged: false };
}
