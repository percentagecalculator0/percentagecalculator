import type { Metadata } from "next";
import Script from "next/script";
import ReviewForm, { type ReviewMessages } from "@/components/ReviewForm";
import { getLocale } from "@/lib/i18n/config";
import { getMessages } from "@/lib/i18n/messages";
import { alternatesFor, urlFor } from "@/lib/seo";
import { formatNumber, fill } from "@/lib/format";
import { getStore, type ReviewRow } from "@/lib/store";

type Props = { params: Promise<{ lang: string }> };
export const dynamic = "force-dynamic"; // newly approved reviews must show up without a redeploy

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const m = getMessages(lang).reviews;
  return {
    title: m.meta.title, description: m.meta.description,
    alternates: alternatesFor(lang, "/reviews"), robots: { index: true, follow: true },
    openGraph: { title: m.meta.title, description: m.meta.description, url: urlFor(lang, "/reviews"), type: "website", locale: getLocale(lang)?.ogLocale },
    twitter: { card: "summary", title: m.meta.title, description: m.meta.description },
  };
}

async function loadReviews(lang: string): Promise<ReviewRow[]> {
  try { const s = await getStore(); return s ? await s.listApproved(lang, 100) : []; } catch { return []; }
}

export default async function ReviewsPage({ params }: Props) {
  const { lang } = await params;
  const loc = getLocale(lang)!;
  const m = getMessages(lang).reviews;
  // Reviews are shown only on the language page where they were written (see README: avoids mixed-language pages).
  const reviews = await loadReviews(lang);
  const date = new Intl.DateTimeFormat(`${loc.numberLocale}-u-nu-latn`, { dateStyle: "medium", timeZone: "UTC" });
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || undefined;

  return (
    <main className="wrap">
      <h1>{m.h1}</h1>
      <p className="lead">{m.intro}</p>

      <section aria-labelledby="rv-list">
        <h2 id="rv-list">{m.listTitle}</h2>
        {reviews.length === 0 ? <p>{m.empty}</p> : (
          <ul className="reviews">
            {reviews.map((r) => (
              <li className="review" key={r.id}>
                <div className="stars" role="img" aria-label={fill(m.starsLabel, { n: String(r.rating) })}>{"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}</div>
                {/* React escapes all text. User text is never rendered as HTML and never becomes a link. */}
                <p className="rv-name">{r.name}</p>
                <p className="rv-body">{r.body}</p>
                <time className="rv-date" dateTime={new Date(r.created_at).toISOString()}>{date.format(r.created_at)}</time>
              </li>
            ))}
          </ul>
        )}
      </section>

      <ReviewForm m={m as unknown as ReviewMessages} lang={lang} siteKey={siteKey} />
      {siteKey && <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" strategy="afterInteractive" />}
    </main>
  );
}
