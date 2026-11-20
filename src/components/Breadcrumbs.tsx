import Link from "next/link";

export default function Breadcrumbs({ label }: { label: string }) {
  return (
    <nav className="crumbs" aria-label="Breadcrumb">
      <ol>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li aria-current="page">{label}</li>
      </ol>
    </nav>
  );
}
