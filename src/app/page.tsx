import type { Metadata } from "next";
import PageView from "@/components/PageView";
import { getPage } from "@/lib/pages";
import { buildMetadata } from "@/lib/seo";

const page = getPage("")!;

export const metadata: Metadata = buildMetadata(page);

export default function HomePage() {
  return <PageView page={page} />;
}
