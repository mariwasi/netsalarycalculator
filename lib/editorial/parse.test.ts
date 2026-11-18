import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { expectedVisibleText, parseEditorial, visibleText } from "./parse";

const files = [
  "scaglioni-content.md",
  "busta-paga-content.md",
  "come-leggere-busta-paga-content.md",
  "metodologia-content.md",
  "calcolo-irpef-content.md",
  "calcolo-ral-content.md",
  "stipendio-netto-ral-28000-content.md",
  "stipendio-netto-ral-30000-content.md",
  "ccnl-metalmeccanico-content.md",
  "ccnl-commercio-content.md",
  "preavviso-dimissioni-content.md",
];

describe("editorial pages stay verbatim", () => {
  it.each(files)("%s renders every approved sentence", (file) => {
    const source = readFileSync(path.join(process.cwd(), "content", file), "utf8");
    const doc = parseEditorial(source);
    expect(visibleText(doc)).toBe(expectedVisibleText(source));
    expect(doc.faqs.length).toBeGreaterThan(0);
  });
});

describe("wrapped list items", () => {
  it("stay in one list instead of splitting and restarting numbering", () => {
    const source = [
      "# Titolo",
      "",
      "1. Primo passo con una riga",
      "   continuata qui.",
      "2. Secondo passo.",
      "",
      "- Voce lunga che si spezza",
      "  su due righe.",
      "- Altra voce.",
      "",
    ].join("\n");
    const doc = parseEditorial(source);
    const ordered = doc.blocks.filter((b) => b.type === "ol");
    expect(ordered).toHaveLength(1);
    expect(ordered[0].items).toHaveLength(2);
    expect(visibleText(doc)).toContain("Primo passo con una riga continuata qui.");
    const unordered = doc.blocks.filter((b) => b.type === "ul");
    expect(unordered).toHaveLength(1);
    expect(unordered[0].items).toHaveLength(2);
    expect(visibleText(doc)).toContain("Voce lunga che si spezza su due righe.");
  });
});
