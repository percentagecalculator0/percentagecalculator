import Link from "next/link";
import type { ReactNode } from "react";
import type { Block, Section } from "@/lib/pages";

const LINK = /(\[[^\]]+\]\(\/[^)\s]*\))/g;
const LINK_ONE = /^\[([^\]]+)\]\((\/[^)\s]*)\)$/;

/** Renders text with [label](/internal-path) links. Only internal links are supported. */
export function Rich({ text }: { text: string }) {
  const parts = text.split(LINK);
  return (
    <>
      {parts.map((part, i) => {
        const m = LINK_ONE.exec(part);
        if (m) {
          return (
            <Link key={i} href={m[2]}>
              {m[1]}
            </Link>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}

function BlockView({ block }: { block: Block }): ReactNode {
  switch (block.t) {
    case "p":
      return (
        <p>
          <Rich text={block.text} />
        </p>
      );
    case "ul":
      return (
        <ul>
          {block.items.map((it) => (
            <li key={it}>
              <Rich text={it} />
            </li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol>
          {block.items.map((it) => (
            <li key={it}>
              <Rich text={it} />
            </li>
          ))}
        </ol>
      );
    case "formula":
      return (
        <div className="formula">
          {block.title && <p className="formula-title">{block.title}</p>}
          {block.lines.map((l) =>
            l.startsWith("=") ? (
              <p key={l} className="formula-line">
                <code>{l}</code>
              </p>
            ) : (
              <p key={l} className="formula-line">
                {l}
              </p>
            ),
          )}
          {block.note && <p className="formula-note">{block.note}</p>}
        </div>
      );
    case "table":
      return (
        <div className="table-wrap" tabIndex={0} role="region" aria-label={block.caption}>
          <table>
            <caption>{block.caption}</caption>
            <thead>
              <tr>
                {block.head.map((h) => (
                  <th key={h} scope="col">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((r) => (
                <tr key={r.join("|")}>
                  {r.map((c, i) => (
                    <td key={i}>{c}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
  }
}

export function Sections({ sections }: { sections: Section[] }) {
  return (
    <>
      {sections.map((s) => (
        <section key={s.h2} className="block">
          <h2>{s.h2}</h2>
          {s.blocks.map((b, i) => (
            <BlockView key={i} block={b} />
          ))}
        </section>
      ))}
    </>
  );
}

export function Faq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <section className="block faq" aria-labelledby="faq-title">
      <h2 id="faq-title">Frequently asked questions</h2>
      {items.map((f) => (
        <div key={f.q} className="faq-item">
          <h3>{f.q}</h3>
          <p>{f.a}</p>
        </div>
      ))}
    </section>
  );
}
