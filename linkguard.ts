// Link guard for reviews. Runs identically in the browser (friendly early feedback) and on the server (the real check).
// It normalises text first (Unicode, zero-width chars, look-alike letters/dots, "dot"/"at" words), then looks for any link-like text.
// NOTE: no regex look-behind is used, so this also parses on older Safari versions.

export type GuardResult = { blocked: false } | { blocked: true; reason: string };

// 3+ letter TLDs (plus leet forms). Two-letter TLDs are handled separately.
const GENERIC = [
  "com","net","org","info","biz","xyz","shop","online","site","store","tech","app","dev","club","top","vip","live","life","world",
  "today","news","blog","link","click","work","fun","icu","cyou","buzz","rest","bar","pro","name","mobi","asia","cloud","space",
  "website","host","press","page","art","email","agency","digital","media","network","systems","solutions","services","company",
  "group","global","ltd","inc","casino","bet","poker","loan","loans","finance","bank","money","cash","trade","market","review",
  "reviews","download","stream","video","porn","sex","xxx","adult","dating","date","party","win","gold","rocks","ninja","guru",
  "tips","zone","center","city","land","house","one","plus","best","cool","edu","gov","int","mil","c0m","0rg","n3t",
];
// Two-letter TLDs commonly used when people write "site dot in" or "site . ru".
const CC = [
  "in","ru","co","io","ai","me","us","uk","de","fr","es","br","id","ly","tv","cc","to","gl","gg","ae","sa","ng","pk","bd","ph","vn",
  "th","kr","jp","cn","au","ca","nz","za","tr","it","nl","pl","ua","mx","ar","cl","pe","ve","eu","ws","su","tk","ml","ga","cf","gq",
  "be","ch","at","se","no","dk","fi","pt","gr","cz","ro","hu","il","eg","ir","my","sg","hk","tw","ke","gh","lk","np","ee","lt","lv",
];
const TLD_GENERIC = GENERIC.join("|");
const TLD_ALL = [...GENERIC, ...CC].join("|");
const DOTWORD = String.raw`(?:dot|d0t|punkt|punto|ponto|titik|point|डॉट|डोट|نقطة|نقطه|точка|ドット)`;
const IDN_TLD = ["рф","рус","укр","онлайн","сайт","мкд","срб","бел","कॉम","भारत","नेट","संगठन","コム","中国","中國","香港","台湾","한국","ไทย","إسلام","مصر","السعودية","امارات","كوم","شبكة","موقع","عرب"].join("|");

// Letters that look like Latin letters (Cyrillic, Greek, small caps, etc.)
const CONFUSABLES: Record<string, string> = {
  "а":"a","е":"e","о":"o","р":"p","с":"c","у":"y","х":"x","і":"i","ј":"j","ѕ":"s","һ":"h","ԁ":"d","ԛ":"q","ԝ":"w","ӏ":"l",
  "м":"m","т":"t","н":"h","к":"k","ѵ":"v","ү":"y",
  "ο":"o","α":"a","ν":"v","ρ":"p","τ":"t","ι":"i","κ":"k","υ":"u","χ":"x","ε":"e","ω":"w","γ":"y",
  "ᴀ":"a","ʙ":"b","ᴄ":"c","ᴅ":"d","ᴇ":"e","ꜰ":"f","ɢ":"g","ʜ":"h","ɪ":"i","ᴊ":"j","ᴋ":"k","ʟ":"l","ᴍ":"m","ɴ":"n","ᴏ":"o",
  "ᴘ":"p","ʀ":"r","ꜱ":"s","ᴛ":"t","ᴜ":"u","ᴠ":"v","ᴡ":"w","ʏ":"y","ᴢ":"z","ɡ":"g","ǀ":"l","ł":"l","ø":"o","đ":"d","ı":"i",
};

function mapConfusables(s: string): string {
  let out = "";
  for (const ch of s) out += CONFUSABLES[ch] ?? CONFUSABLES[ch.toLowerCase()] ?? ch;
  return out;
}

/** Normalised copy used only for detection (never stored or shown). */
function normalise(input: string, keepCase: boolean): string {
  let s = input.normalize("NFKD");
  s = s.replace(/\p{M}/gu, "");                                              // accents and combining marks
  s = s.replace(/[\p{Cf}\u00ad\u180e\u200b-\u200f\u2060-\u2064\ufeff]/gu, ""); // zero-width, bidi and other invisible chars
  if (!keepCase) s = s.toLowerCase();
  s = s.replace(/[\u3002\uff61\u2024\u2027\ufe52\u00b7\u2219\u22c5\u06d4]/g, "."); // look-alike dots
  s = mapConfusables(s);
  s = s.replace(/\s+/g, " ");
  const flags = "giu";
  // "[dot]", "(dot)", "[.]" -> "."
  s = s.replace(new RegExp(String.raw`\s*[\[\(\{<]\s*(?:${DOTWORD}|\.)\s*[\]\)\}>]\s*`, flags), ".");
  // "[at]", "(at)" -> "@"
  s = s.replace(new RegExp(String.raw`\s*[\[\(\{<]\s*(?:at|arroba)\s*[\]\)\}>]\s*`, flags), "@");
  // "site dot com" -> "site.com"  (only when a real TLD follows, so "polka dot dress" is fine)
  s = s.replace(new RegExp(String.raw`([\p{L}\p{N}])\s+${DOTWORD}\s+(?=(?:${TLD_ALL})(?![\p{L}\p{N}]))`, flags), "$1.");
  return s;
}

const NA = String.raw`[^a-z0-9]`; // separator between spaced-out letters
const RULES: Array<[string, RegExp]> = [
  ["scheme-slashes", /:\s*\/\s*\//],
  ["scheme-word", /(?:https?|ftps?|sftp|mailto|javascript|vbscript)\s*:/],
  ["scheme-spaced", new RegExp(String.raw`h${NA}*t${NA}*t${NA}*p`)],
  ["www", new RegExp(String.raw`(?:^|${NA})w${NA}*w${NA}*w`)],
  ["email", /[a-z0-9._%+\-]+\s*@\s*[a-z0-9\-]+/],
  ["handle", /(?:^|[^a-z0-9])@[\p{L}\p{N}_]{2,}/u],
  ["ip", /(?:^|[^0-9])\d{1,3}(?:\s*\.\s*\d{1,3}){3}(?:[^0-9]|$)/],
  ["localhost", /\blocalhost\b/],
  ["domain-generic", new RegExp(String.raw`[\p{L}\p{N}][\p{L}\p{N}-]*\s{0,2}[.,]\s{0,2}(?:${TLD_GENERIC})(?![\p{L}\p{N}])`, "u")],
  ["domain-spaced", new RegExp(String.raw`[a-z0-9]\s+\.\s*(?:${TLD_ALL})(?![\p{L}\p{N}])`, "u")],
  ["leet-tld", /[a-z0-9]\s*\.\s*(?:c0m|0rg|n3t|c0)(?![a-z0-9])/],
  ["idn-tld", new RegExp(String.raw`[\p{L}\p{N}][\p{L}\p{N}-]*\.(?:${IDN_TLD})(?![\p{L}\p{N}])`, "u")],
  ["shortener", /(?:^|[^a-z0-9])(?:t\s*\.\s*co|t\s*\.\s*me|wa\s*\.\s*me|wa\s*\.\s*link|fb\s*\.\s*me|goo\s*\.\s*gl|ow\s*\.\s*ly|is\s*\.\s*gd|buff\s*\.\s*ly|bit\s*\.\s*ly|lnkd\s*\.\s*in|youtu\s*\.\s*be|rb\s*\.\s*gy|tiny\s*\.\s*cc|cutt\s*\.\s*ly|shorturl\s*\.\s*at|rebrand\s*\.\s*ly)(?:$|[^a-z0-9])/],
  ["markdown-link", /\]\s*\(/],
];
// Run on the case-preserving copy: "tool.It" is a sentence with a missing space, "tool.it" is a domain.
const CC_DOMAIN = /[\p{L}\p{N}][\p{L}\p{N}-]+\.(?:[a-z]{2}|[A-Z]{2})(?![\p{L}\p{N}])/u;
// Letters-only view, for "t i n y u r l" or "dotcom" written without spaces.
const COMPACT = /(?:tinyurl|bitly|shorturl|cuttly|rebrandly|dot(?:com|net|org|xyz|info|biz|shop|app|dev|site|online|top|club|store|tech))/;

export function containsLink(raw: string): GuardResult {
  if (typeof raw !== "string") return { blocked: true, reason: "not-a-string" };
  // HTML, entities and angle brackets have no place in a review (also fullwidth "＜" via NFKC).
  const k = raw.normalize("NFKC");
  if (/[<>]/.test(k) || /&(?:lt|gt|amp|quot|#x?[0-9a-f]+);/i.test(k)) return { blocked: true, reason: "html" };

  const d = normalise(raw, false);
  for (const [reason, re] of RULES) if (re.test(d)) return { blocked: true, reason };
  if (CC_DOMAIN.test(normalise(raw, true))) return { blocked: true, reason: "domain-cc" };
  if (COMPACT.test(d.replace(/[^\p{L}\p{N}]/gu, ""))) return { blocked: true, reason: "compact" };
  return { blocked: false };
}
