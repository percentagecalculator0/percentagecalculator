import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = { title: "Admin", robots: { index: false, follow: false, nocache: true } };

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head><meta name="viewport" content="width=device-width, initial-scale=1" /></head>
      <body><main className="wrap">{children}</main></body>
    </html>
  );
}
