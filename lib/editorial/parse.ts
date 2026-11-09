export type Inline =
  | { type: "text"; text: string }
  | { type: "strong"; children: Inline[] }
  | { type: "em"; children: Inline[] }
  | { type: "link"; href: string; kind: "internal" | "external" | "missing"; children: Inline[] };

export type Block =
  | { type: "p"; children: Inline[] }
  | { type: "h2"; id: string; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: Inline[][] }
  | { type: "ol"; items: Inline[][] }
  | { type: "table"; headers: Inline[][]; rows: Inline[][][] }
  | { type: "quote"; children: Inline[] }
  | { type: "example"; id: string; title: string; blocks: Block[] }
  | { type: "faq"; id: string; title: string; items: { question: string; blocks: Block[] }[]; after: Block[] };

export type EditorialDoc = {
  title: string;
  blocks: Block[];
  toc: { id: string; label: string }[];
  faqs: { question: string; answer: string }[];
  missingLinks: { href: string; text: string }[];
};

const LIVE_PATHS = new Set([
  "/",
  "/come-si-calcola-stipendio-netto",
  "/scaglioni-irpef-2026",
  "/busta-paga",
  "/come-leggere-la-busta-paga",
  "/metodologia",
  "/calcolo-irpef",
  "/calcolo-ral",
  "/stipendio-netto-ral-28000",
  "/stipendio-netto-ral-30000",
  "/ccnl-metalmeccanico",
  "/ccnl-commercio",
  "/preavviso-dimissioni",
]);

export function slugify(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function classifyHref(href: string): { kind: "internal" | "external" | "missing"; href: string } {
  if (/^https?:\/\//i.test(href)) return { kind: "external", href };
  const path = href.replace(/\/$/, "") || "/";
  if (LIVE_PATHS.has(path)) return { kind: "internal", href: path };
  return { kind: "missing", href: path };
}

export function parseInline(input: string): Inline[] {
  const nodes: Inline[] = [];
  let buffer = "";
  let index = 0;

  function flush() {
    if (!buffer) return;
    nodes.push({ type: "text", text: buffer });
    buffer = "";
  }

  while (index < input.length) {
    if (input.startsWith("**", index)) {
      const end = input.indexOf("**", index + 2);
      if (end !== -1) {
        flush();
        nodes.push({ type: "strong", children: parseInline(input.slice(index + 2, end)) });
        index = end + 2;
        continue;
      }
    }

    if (input[index] === "*" && input[index + 1] !== "*") {
      const end = input.indexOf("*", index + 1);
      if (end !== -1) {
        flush();
        nodes.push({ type: "em", children: parseInline(input.slice(index + 1, end)) });
        index = end + 1;
        continue;
      }
    }

    if (input[index] === "[") {
      const match = /^\[([^\]]+)\]\(([^)]+)\)/.exec(input.slice(index));
      if (match) {
        flush();
        const classified = classifyHref(match[2]);
        nodes.push({
          type: "link",
          href: classified.href,
          kind: classified.kind,
          children: parseInline(match[1]),
        });
        index += match[0].length;
        continue;
      }
    }

    buffer += input[index];
    index += 1;
  }

  flush();
  return nodes;
}

function inlineText(nodes: Inline[]): string {
  return nodes
    .map((node) => {
      if (node.type === "text") return node.text;
      return inlineText(node.children);
    })
    .join("");
}

function blockText(blocks: Block[]): string {
  return blocks
    .map((block) => {
      if (block.type === "p") return inlineText(block.children);
      if (block.type === "h2" || block.type === "h3") return block.text;
      if (block.type === "ul" || block.type === "ol") return block.items.map((item) => inlineText(item)).join(" ");
      if (block.type === "table") {
        return [...block.headers, ...block.rows.flat()].map((cell) => inlineText(cell)).join(" ");
      }
      if (block.type === "quote") return inlineText(block.children);
      if (block.type === "example") return `${block.title} ${blockText(block.blocks)}`;
      return `${block.title} ${block.items.map((item) => `${item.question} ${blockText(item.blocks)}`).join(" ")} ${blockText(block.after)}`;
    })
    .join(" ");
}

type RawBlock =
  | { type: "p"; children: Inline[] }
  | { type: "h2"; id: string; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: Inline[][] }
  | { type: "ol"; items: Inline[][] }
  | { type: "table"; headers: Inline[][]; rows: Inline[][][] }
  | { type: "quote"; children: Inline[] };

function isTableLine(line: string): boolean {
  return line.trim().startsWith("|");
}

function isSeparator(line: string): boolean {
  return /^\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)+\|?$/.test(line.trim());
}

function tableCells(line: string): Inline[][] {
  const trimmed = line.trim().replace(/^\|/, "").replace(/\|$/, "");
  return trimmed.split("|").map((cell) => parseInline(cell.trim()));
}

function prepareSource(source: string): string {
  const normalized = source.replace(/\r\n/g, "\n");
  const headingAt = normalized.search(/^# /m);
  const body = headingAt === -1 ? normalized : normalized.slice(headingAt);
  return body.replace(
    /\[guida alla\s+lettura della busta paga\]\[guida come leggere la busta paga\]\(([^)]+)\)/,
    "[guida alla lettura della busta paga]($1)",
  );
}

function parseRaw(body: string): { title: string; blocks: RawBlock[] } {
  const lines = body.split("\n");
  const titleLine = lines[0]?.replace(/^#\s+/, "").trim() ?? "";
  const blocks: RawBlock[] = [];
  let index = 1;

  function pushParagraph(linesToJoin: string[]) {
    const text = linesToJoin.join(" ").replace(/\s+/g, " ").trim();
    if (text) blocks.push({ type: "p", children: parseInline(text) });
  }

  while (index < lines.length) {
    const line = lines[index];
    const trimmed = line.trim();

    if (!trimmed) {
      index += 1;
      continue;
    }

    if (trimmed === "---") {
      index += 1;
      continue;
    }

    if (trimmed.startsWith(">")) {
      const quoteLines: string[] = [];
      while (index < lines.length && lines[index].trim().startsWith(">")) {
        quoteLines.push(lines[index].trim().replace(/^>\s?/, ""));
        index += 1;
      }
      const text = quoteLines.join(" ").replace(/\s+/g, " ").trim();
      if (text) blocks.push({ type: "quote", children: parseInline(text) });
      continue;
    }

    if (trimmed.startsWith("## ")) {
      const text = trimmed.replace(/^##\s+/, "");
      blocks.push({ type: "h2", id: slugify(text), text });
      index += 1;
      continue;
    }

    if (trimmed.startsWith("### ")) {
      blocks.push({ type: "h3", text: trimmed.replace(/^###\s+/, "") });
      index += 1;
      continue;
    }

    if (isTableLine(trimmed)) {
      const tableLines: string[] = [];
      while (index < lines.length && isTableLine(lines[index].trim())) {
        tableLines.push(lines[index].trim());
        index += 1;
      }
      const contentLines = tableLines.filter((row) => !isSeparator(row));
      const [header, ...rows] = contentLines;
      if (header) {
        blocks.push({
          type: "table",
          headers: tableCells(header),
          rows: rows.map(tableCells),
        });
      }
      continue;
    }

    if (/^\d+\.\s+/.test(trimmed)) {
      const items: Inline[][] = [];
      while (index < lines.length && /^\d+\.\s+/.test(lines[index].trim())) {
        items.push(parseInline(lines[index].trim().replace(/^\d+\.\s+/, "")));
        index += 1;
      }
      blocks.push({ type: "ol", items });
      continue;
    }

    if (trimmed.startsWith("- ")) {
      const items: Inline[][] = [];
      while (index < lines.length && lines[index].trim().startsWith("- ")) {
        items.push(parseInline(lines[index].trim().replace(/^- /, "")));
        index += 1;
      }
      blocks.push({ type: "ul", items });
      continue;
    }

    const paragraph: string[] = [];
    while (index < lines.length) {
      const current = lines[index].trim();
      if (
        !current ||
        current.startsWith("#") ||
        isTableLine(current) ||
        /^\d+\.\s+/.test(current) ||
        current.startsWith("- ") ||
        current.startsWith(">") ||
        current === "---"
      ) {
        break;
      }
      paragraph.push(current);
      index += 1;
    }
    pushParagraph(paragraph);
  }

  return { title: titleLine, blocks };
}

function isUpdate(block: RawBlock): boolean {
  return block.type === "p" && inlineText(block.children).startsWith("Ultimo aggiornamento:");
}

function structure(raw: RawBlock[]): Block[] {
  const blocks: Block[] = [];

  for (let index = 0; index < raw.length; index += 1) {
    const block = raw[index];

    if (block.type === "h2" && /esempio/i.test(block.text)) {
      const inner: RawBlock[] = [];
      index += 1;
      while (index < raw.length && raw[index].type !== "h2") {
        inner.push(raw[index]);
        index += 1;
      }
      index -= 1;
      blocks.push({
        type: "example",
        id: block.id,
        title: block.text,
        blocks: structure(inner),
      });
      continue;
    }

    if (block.type === "h2" && /^domande frequenti/i.test(block.text)) {
      const inner: RawBlock[] = [];
      index += 1;
      while (index < raw.length && raw[index].type !== "h2") {
        inner.push(raw[index]);
        index += 1;
      }
      index -= 1;

      const items: { question: string; blocks: Block[] }[] = [];
      const after: Block[] = [];
      let cursor = 0;
      while (cursor < inner.length) {
        const current = inner[cursor];
        if (current.type !== "h3") {
          after.push(...structure([current]));
          cursor += 1;
          continue;
        }
        const answer: RawBlock[] = [];
        cursor += 1;
        while (cursor < inner.length && inner[cursor].type !== "h3") {
          if (isUpdate(inner[cursor])) break;
          answer.push(inner[cursor]);
          cursor += 1;
        }
        items.push({ question: current.text, blocks: structure(answer) });
      }
      while (cursor < inner.length) {
        after.push(...structure([inner[cursor]]));
        cursor += 1;
      }

      blocks.push({ type: "faq", id: block.id, title: block.text, items, after });
      continue;
    }

    blocks.push(block);
  }

  return blocks;
}

function collectMissing(nodes: Inline[], found: { href: string; text: string }[]) {
  for (const node of nodes) {
    if (node.type === "link" && node.kind === "missing") {
      found.push({ href: node.href, text: inlineText(node.children) });
    }
    if (node.type !== "text") collectMissing(node.children, found);
  }
}

function walkMissing(blocks: Block[], found: { href: string; text: string }[]) {
  for (const block of blocks) {
    if (block.type === "p") collectMissing(block.children, found);
    if (block.type === "ul" || block.type === "ol") block.items.forEach((item) => collectMissing(item, found));
    if (block.type === "table") {
      [...block.headers, ...block.rows.flat()].forEach((cell) => collectMissing(cell, found));
    }
    if (block.type === "quote") collectMissing(block.children, found);
    if (block.type === "example") walkMissing(block.blocks, found);
    if (block.type === "faq") {
      block.items.forEach((item) => walkMissing(item.blocks, found));
      walkMissing(block.after, found);
    }
  }
}

export function parseEditorial(source: string): EditorialDoc {
  const prepared = prepareSource(source);
  const raw = parseRaw(prepared);
  const blocks = structure(raw.blocks);
  const toc = blocks
    .filter((block): block is Extract<Block, { type: "h2" | "example" | "faq" }> =>
      block.type === "h2" || block.type === "example" || block.type === "faq",
    )
    .map((block) => ({ id: block.id, label: block.type === "h2" ? block.text : block.title }));
  const faqs = blocks.flatMap((block) =>
    block.type === "faq"
      ? block.items.map((item) => ({ question: item.question, answer: blockText(item.blocks).replace(/\s+/g, " ").trim() }))
      : [],
  );
  const missingLinks: { href: string; text: string }[] = [];
  walkMissing(blocks, missingLinks);
  return { title: raw.title, blocks, toc, faqs, missingLinks };
}

export function visibleText(doc: EditorialDoc): string {
  return `${doc.title} ${blockText(doc.blocks)}`.replace(/\s+/g, " ").trim();
}

export function expectedVisibleText(source: string): string {
  const prepared = prepareSource(source);
  const lines = prepared.split("\n").flatMap((line) => {
    const trimmed = line.trim();
    if (!trimmed || trimmed === "---" || isSeparator(line)) return [];
    const content = trimmed.replace(/^>\s?/, "");
    if (/^#{1,3}\s+/.test(content)) return [content.replace(/^#{1,3}\s+/, "")];
    if (/^\d+\.\s+/.test(content)) return [content.replace(/^\d+\.\s+/, "")];
    if (content.startsWith("- ")) return [content.replace(/^- /, "")];
    return [content];
  });
  return lines
    .join("\n")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1")
    .replace(/\*/g, "")
    .replace(/\|/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}
