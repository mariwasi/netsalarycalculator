import type { ReactNode } from "react";
import Link from "next/link";
import type { Block, EditorialDoc, Inline } from "@/lib/editorial/parse";

function InlineText({ nodes }: { nodes: Inline[] }) {
  return (
    <>
      {nodes.map((node, index) => {
        if (node.type === "text") return <span key={index}>{node.text}</span>;
        if (node.type === "strong") {
          return (
            <strong key={index} className="text-[#16302A]">
              <InlineText nodes={node.children} />
            </strong>
          );
        }
        if (node.type === "em") {
          return (
            <em key={index}>
              <InlineText nodes={node.children} />
            </em>
          );
        }
        if (node.kind === "internal") {
          return (
            <Link key={index} href={node.href} className="text-[#00695C] underline decoration-[#00695C] underline-offset-2 transition duration-200 hover:text-lime hover:decoration-lime hover:decoration-2">
              <InlineText nodes={node.children} />
            </Link>
          );
        }
        if (node.kind === "external") {
          return (
            <a key={index} href={node.href} className="text-[#00695C] underline decoration-[#00695C] underline-offset-2 transition duration-200 hover:text-lime hover:decoration-lime hover:decoration-2">
              <InlineText nodes={node.children} />
            </a>
          );
        }
        return <InlineText key={index} nodes={node.children} />;
      })}
    </>
  );
}

function Table({ headers, rows }: { headers: Inline[][]; rows: Inline[][][] }) {
  return (
    <div className="my-4 overflow-x-auto">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr>
            {headers.map((cell, index) => (
              <th key={index} className="border-b border-[#D8E6DE] bg-[#F1F5F9] px-3 py-2 text-left font-bold text-[#16302A]">
                <InlineText nodes={cell} />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className="border-b border-[#D8E6DE] px-3 py-2 text-left text-[#334155]">
                  <InlineText nodes={cell} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.map((block, index) => {
        if (block.type === "p") {
          return (
            <p key={index} className="mb-3 text-base leading-relaxed text-[#334155]">
              <InlineText nodes={block.children} />
            </p>
          );
        }
        if (block.type === "h2") {
          return (
            <h2
              key={index}
              id={block.id}
              className="mt-9 scroll-mt-24 border-l-4 border-[#004C3F] pl-3.5 text-[1.35rem] font-semibold tracking-tight text-[#16302A]"
            >
              {block.text}
            </h2>
          );
        }
        if (block.type === "h3") {
          return (
            <h3
              key={index}
              className="mt-5 rounded-r-[10px] border-l-[3px] border-[#00695C] bg-[#F2FAF5] px-3 py-2 text-[1.05rem] font-semibold text-[#004C3F]"
            >
              {block.text}
            </h3>
          );
        }
        if (block.type === "ul") {
          return (
            <ul key={index} className="mb-3.5 list-disc pl-5 text-[#334155]">
              {block.items.map((item, itemIndex) => (
                <li key={itemIndex} className="mb-1.5">
                  <InlineText nodes={item} />
                </li>
              ))}
            </ul>
          );
        }
        if (block.type === "ol") {
          return (
            <ol key={index} className="mb-3.5 list-decimal pl-5 text-[#334155]">
              {block.items.map((item, itemIndex) => (
                <li key={itemIndex} className="mb-1.5">
                  <InlineText nodes={item} />
                </li>
              ))}
            </ol>
          );
        }
        if (block.type === "table") return <Table key={index} headers={block.headers} rows={block.rows} />;
        if (block.type === "quote") {
          return (
            <aside key={index} className="my-4 rounded-2xl border border-[#BFE3CF] bg-[#E3F4EA] px-5 py-4">
              <p className="text-base leading-relaxed text-[#16302A]">
                <InlineText nodes={block.children} />
              </p>
            </aside>
          );
        }
        if (block.type === "example") {
          return (
            <div key={index} className="my-6 rounded-[18px] border-[1.5px] border-[#BFE3CF] bg-gradient-to-b from-[#E3F4EA] to-white px-6 py-7">
              <h2 id={block.id} className="scroll-mt-24 border-l-4 border-[#004C3F] pl-3.5 text-[1.35rem] font-semibold tracking-tight text-[#16302A]">
                {block.title}
              </h2>
              <div className="mt-4">
                <Blocks blocks={block.blocks} />
              </div>
            </div>
          );
        }
        return (
          <section key={index}>
            <h2
              id={block.id}
              className="mt-9 scroll-mt-24 border-l-4 border-[#004C3F] pl-3.5 text-[1.35rem] font-semibold tracking-tight text-[#16302A]"
            >
              {block.title}
            </h2>
            <div className="guide-faq mt-4">
              {block.items.map((item) => (
                <details key={item.question} className="mb-2.5 rounded-[14px] border border-[#D8E6DE] bg-white px-4 py-3.5">
                  <summary className="cursor-pointer font-extrabold text-[#16302A]">{item.question}</summary>
                  <div className="mt-2.5">
                    <Blocks blocks={item.blocks} />
                  </div>
                </details>
              ))}
            </div>
            <Blocks blocks={block.after} />
          </section>
        );
      })}
    </>
  );
}

export function EditorialPage({
  doc,
  subline,
  stats,
  chips,
  callout,
}: {
  doc: EditorialDoc;
  subline: string;
  stats: { value: string; label: string; tone: "dark" | "lime" }[];
  chips?: string[];
  callout: string;
}) {
  const faq = doc.blocks.find((block) => block.type === "faq");
  const faqId = faq && faq.type === "faq" ? faq.id : doc.toc[0]?.id;

  return (
    <div className="bg-white text-[#16302A]">
      <style>{`
        .guide-faq summary { list-style: none; }
        .guide-faq summary::-webkit-details-marker { display: none; }
        .guide-faq summary::after { content: " +"; color: #00695C; font-weight: 900; }
        .guide-faq details[open] summary::after { content: " −"; }
      `}</style>
      <div className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6">
        <section className="rounded-[28px] bg-gradient-to-br from-[#004C3F] to-[#0A6B52] px-6 py-8 text-white sm:px-9">
          <p className="mb-3 text-sm text-[#9FD8C2]">
            <Link href="/" className="text-[#CDE8DC] hover:underline">
              Home
            </Link>
            {` / ${doc.title}`}
          </p>
          <h1 className="max-w-3xl text-3xl font-semibold tracking-tight sm:text-[2.1rem] sm:leading-tight">{doc.title}</h1>
          <p className="mt-3 max-w-3xl text-base text-[#CDE8DC]">{subline}</p>
        </section>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {stats.map((stat) => (
            <article
              key={stat.value}
              className={stat.tone === "lime" ? "rounded-2xl bg-[#C6F24E] p-5 text-[#16302A]" : "rounded-2xl bg-[#004C3F] p-5 text-white"}
            >
              <p className="text-2xl font-semibold">{stat.value}</p>
              <p className={stat.tone === "lime" ? "mt-2 text-sm" : "mt-2 text-sm text-[#CDE8DC]"}>{stat.label}</p>
            </article>
          ))}
        </div>

        {chips ? (
          <p className="mt-6 flex flex-wrap gap-2 text-sm font-semibold text-[#004C3F]">
            {chips.map((chip) => (
              <span key={chip} className="rounded-full bg-[#E3F4EA] px-3 py-1">
                {chip}
              </span>
            ))}
          </p>
        ) : null}

        <nav aria-label="In questa pagina" className="mt-6 rounded-2xl border border-[#D8E6DE] bg-[#F2FAF5] px-6 py-5">
          <p className="text-xs font-bold tracking-[0.06em] text-[#004C3F] uppercase">In questa pagina</p>
          <ul className="mt-3 columns-1 gap-8 sm:columns-2">
            {doc.toc.map((item) => (
              <li key={item.id} className="mb-2 break-inside-avoid">
                <a href={`#${item.id}`} className="text-sm text-[#16302A] hover:underline">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <aside className="mt-5 rounded-2xl border border-[#BFE3CF] bg-[#E3F4EA] px-6 py-5">
          <p className="font-semibold text-[#16302A]">{callout}</p>
        </aside>

        <article className="mx-auto mt-6 max-w-3xl rounded-[20px] border border-[#D8E6DE] bg-white px-5 py-8 shadow-[0_8px_28px_rgba(0,76,63,0.05)] sm:px-10">
          <Blocks blocks={doc.blocks} />
        </article>
      </div>
      {faqId ? (
        <a
          href={`#${faqId}`}
          className="fixed right-5 bottom-5 z-50 max-w-[16rem] rounded-2xl border border-[#D8E6DE] bg-white px-4 py-3 text-sm text-[#16302A] shadow-[0_12px_30px_rgba(0,0,0,0.15)]"
        >
          <span className="font-semibold text-[#004C3F]">Ciao!</span> Hai domande sullo stipendio netto? La guida ti spiega tutto →
        </a>
      ) : null}
    </div>
  );
}

export function EditorialJsonLd({ doc }: { doc: EditorialDoc }): ReactNode {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: doc.title,
        inLanguage: "it",
      },
      {
        "@type": "FAQPage",
        mainEntity: doc.faqs.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      },
    ],
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
