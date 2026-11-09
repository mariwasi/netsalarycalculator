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
