import { describe, expect, it } from "vitest";
import { GUIDE_INDEX, searchGuide } from "./search";

describe("searchGuide", () => {
  it("returns empty for a blank query", () => {
    expect(searchGuide("")).toEqual([]);
    expect(searchGuide("   ")).toEqual([]);
  });

  it("finds RAL pages for 'ral'", () => {
    const hrefs = searchGuide("ral").map((entry) => entry.href);
    expect(hrefs).toContain("/calcolo-ral");
    expect(hrefs).toContain("/stipendio-netto-ral-30000");
    expect(hrefs).toContain("/stipendio-netto-ral-28000");
  });

  it("finds the 30k page for 'ral 30000'", () => {
    const results = searchGuide("ral 30000");
    expect(results[0]?.href).toBe("/stipendio-netto-ral-30000");
  });

  it("finds IRPEF pages for 'irpef'", () => {
    const hrefs = searchGuide("irpef").map((entry) => entry.href);
    expect(hrefs).toContain("/scaglioni-irpef");
    expect(hrefs).toContain("/calcolo-irpef");
  });

  it("matches accents and case", () => {
    const hrefs = searchGuide("METODOLOGÍA").map((entry) => entry.href);
    expect(hrefs).toContain("/metodologia");
  });

  it("returns nothing for an unknown query", () => {
    expect(searchGuide("xyzqq")).toEqual([]);
  });

  it("caps results at 5 and only links to live pages", () => {
    const live = new Set([
      "/", "/come-si-calcola-stipendio-netto", "/scaglioni-irpef", "/calcolo-irpef",
      "/calcolo-ral", "/busta-paga", "/come-leggere-la-busta-paga", "/metodologia",
      "/ccnl-metalmeccanico", "/ccnl-commercio", "/preavviso-dimissioni",
      "/stipendio-netto-ral-30000", "/stipendio-netto-ral-28000",
    ]);
    expect(GUIDE_INDEX.length).toBe(13);
    for (const entry of GUIDE_INDEX) expect(live.has(entry.href)).toBe(true);
    expect(searchGuide("stipendio").length).toBeLessThanOrEqual(5);
  });
});
