import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageView from "@/components/PageView";
import { ALL_PAGES, buildMetadata, getAnyPage } from "@/lib/seo";

// Only the pages we define exist. Anything else is a real 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return ALL_PAGES.filter((p) => p.slug !== "").map((p) => ({ slug: p.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = getAnyPage(slug);
  return page ? buildMetadata(page) : {};
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const page = slug === "" ? undefined : getAnyPage(slug);
  if (!page) notFound();
  return <PageView page={page} />;
}
