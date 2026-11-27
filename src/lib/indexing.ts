import type { Metadata } from "next";

/**
 * Set the build variable SITE_NOINDEX=true in Cloudflare to keep the whole site out of search
 * results (for example while you are still testing). Remove it, or set it to anything else,
 * and redeploy when you are ready for Google to index the site.
 *
 * This adds <meta name="robots" content="noindex, nofollow"> to every page. robots.txt keeps
 * allowing crawlers on purpose: Google must be able to fetch a page to see its noindex tag.
 */
export const NOINDEX = process.env.SITE_NOINDEX === "true";

export function robotsMeta(): NonNullable<Metadata["robots"]> {
  if (NOINDEX) {
    return { index: false, follow: false, googleBot: { index: false, follow: false } };
  }
  return {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  };
}
