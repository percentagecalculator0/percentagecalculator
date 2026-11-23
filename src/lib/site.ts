export const SITE = {
  name: "Percentage Increase Calculator",
  shortName: "PercentageIncrease",
  domain: "percentageincreasecalculator.net",
  url: "https://percentageincreasecalculator.net",
  tagline: "Free percentage calculators with the formula and every step shown.",
  // CHANGE THIS to a real inbox you control (see the README notes: Cloudflare Email Routing is free).
  contactEmail: "contact@percentageincreasecalculator.net",
  lastUpdated: "November 22, 2026",
  lastUpdatedIso: "2026-11-22",
  themeColor: "#ffffff",
  // Fill these in with the real person or company behind the site. Search engines and AdSense
  // reviewers trust a site more when it says who runs it. Leave "" to hide the section.
  ownerName: "",
  ownerLocation: "",
} as const;

/**
 * Google AdSense. Nothing loads until you set NEXT_PUBLIC_ADSENSE_CLIENT
 * (for example ca-pub-1234567890123456) as a build variable in Cloudflare.
 * Slot ids come from your AdSense account once you create ad units.
 */
export const ADS = {
  client: process.env.NEXT_PUBLIC_ADSENSE_CLIENT ?? "",
  slots: {
    middle: process.env.NEXT_PUBLIC_ADSENSE_SLOT_MIDDLE ?? "",
    bottom: process.env.NEXT_PUBLIC_ADSENSE_SLOT_BOTTOM ?? "",
  },
} as const;

export const adsEnabled = ADS.client.startsWith("ca-pub-");

export type NavItem = { href: string; label: string };

export const CALCULATOR_NAV: NavItem[] = [
  { href: "/", label: "Percentage Increase" },
  { href: "/percentage-decrease-calculator", label: "Percentage Decrease" },
  { href: "/percentage-change-calculator", label: "Percentage Change" },
  { href: "/percentage-difference-calculator", label: "Percentage Difference" },
  { href: "/increase-by-percentage-calculator", label: "Increase a Number by %" },
  { href: "/reverse-percentage-calculator", label: "Reverse Percentage" },
  { href: "/percentage-of-a-number-calculator", label: "Percentage of a Number" },
  { href: "/what-percent-calculator", label: "What Percent Is X of Y" },
  { href: "/growth-rate-calculator", label: "Growth Rate (CAGR)" },
  { href: "/salary-increase-calculator", label: "Salary Increase" },
];

export const GUIDE_NAV: NavItem[] = [
  { href: "/how-to-calculate-percentage-increase-in-excel", label: "Percentage Increase in Excel" },
  { href: "/percentage-vs-percentage-points", label: "Percentage vs Percentage Points" },
  { href: "/how-to-calculate-discount-percentage", label: "Discount Percentage" },
  { href: "/percentage-increase-practice-problems", label: "Practice Problems" },
];

export const LEGAL_NAV: NavItem[] = [
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms-of-use", label: "Terms of Use" },
  { href: "/disclaimer", label: "Disclaimer" },
];

/** Footer-only extra link (the header keeps the short AdSense-style list above). */
export const METHODOLOGY_NAV: NavItem = { href: "/methodology", label: "How We Calculate" };

export function absoluteUrl(path: string): string {
  return path === "/" ? SITE.url + "/" : SITE.url + path;
}
