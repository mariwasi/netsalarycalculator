import { describe, expect, it } from "vitest";
import { calculateSalary, cuneo65, employmentDeduction, familyDeductions, irpefGross, sommaIntegrativa } from "./calculate";
import { parseItalianAmount, parseSalaryForm } from "./parse";
import { calculateRegionalTax } from "./regions";
import type { FamilyInput, SalaryInput } from "./types";

const noFamily: FamilyInput = {
  spouseDependent: false,
  eligibleChildren: 0,
  childShare: 0.5,
  ascendants: 0,
};

function input(overrides: Partial<SalaryInput> = {}): SalaryInput {
  return {
    ral: 30000,
    regionId: "lombardia",
    municipalRate: null,
    months: 13,
    family: noFamily,
    applyMassimale: false,
    ...overrides,
  };
}

describe("IRPEF 2026", () => {
  it("applies 23%, 33% and 43% brackets", () => {
    expect(irpefGross(10000)).toBe(2300);
    expect(irpefGross(28000)).toBe(6440);
    expect(irpefGross(50000)).toBe(13700);
    expect(irpefGross(60000)).toBe(18000);
  });
});

describe("employment deduction", () => {
  it("follows article 13 and keeps the 65 euro cuneo on its own line", () => {
    expect(employmentDeduction(15000)).toBe(1955);
    expect(employmentDeduction(16000)).toBe(3008.46);
    expect(employmentDeduction(25000)).toBe(2184.62);
    expect(cuneo65(25000)).toBe(0);
    expect(employmentDeduction(28000)).toBe(1910);
    expect(cuneo65(28000)).toBe(65);
    expect(employmentDeduction(35000)).toBe(1302.27);
    expect(cuneo65(35000)).toBe(65);
    expect(employmentDeduction(50000)).toBe(690);
    expect(employmentDeduction(60000)).toBe(0);
    expect(cuneo65(40864.5)).toBe(0);
  });
});

describe("family deductions", () => {
  it("QA3: spouse at RC 60.000 is the quotient, not a flat amount", () => {
    expect(familyDeductions(60000, { ...noFamily, spouseDependent: true }).spouse).toBe(345);
  });

  it("QA4: one other dependent at RC 40.000 is half of 750", () => {
    expect(familyDeductions(40000, { ...noFamily, ascendants: 1 }).ascendants).toBe(375);
  });

  it("uses the child quotient and can split the share", () => {
    const full = familyDeductions(40864.5, {
      ...noFamily,
      eligibleChildren: 1,
      childShare: 1,
    });
    expect(full.children).toBe(541.35);

    const half = familyDeductions(40864.5, {
      ...noFamily,
      eligibleChildren: 1,
      childShare: 0.5,
    });
    expect(half.children).toBe(270.68);
  });

  it("assigns the full child deduction when the spouse is dependent", () => {
    const result = familyDeductions(40864.5, {
      spouseDependent: true,
      eligibleChildren: 1,
      childShare: 0.5,
      ascendants: 0,
    });
    expect(result.appliedChildShare).toBe(1);
    expect(result.children).toBe(541.35);
  });

  it("does not add a repealed large-family bonus for four or more children", () => {
    const four = familyDeductions(40000, {
      ...noFamily,
      eligibleChildren: 4,
      childShare: 1,
    });
    expect(four.children).toBe(2714.29);
    expect(four.children).not.toBe(2914.29);
    expect(four.children).not.toBe(3514.29);
  });
});

describe("regional surtax", () => {
  it("applies the Lombardia base rate of 1.23% to the whole income", () => {
    expect(calculateRegionalTax("lombardia", 27243).amount).toBe(335.09);
  });

  it("applies the Piemonte base rate of 1.62% to the whole income", () => {
    expect(calculateRegionalTax("piemonte", 40864.5).amount).toBe(662);
  });

  it("applies the explicit whole-income and exemption rules", () => {
    expect(calculateRegionalTax("friuli-venezia-giulia", 10000).amount).toBe(70);
    expect(calculateRegionalTax("friuli-venezia-giulia", 20000).amount).toBe(246);
    expect(calculateRegionalTax("valle-d-aosta", 10000).amount).toBe(0);
    expect(calculateRegionalTax("valle-d-aosta", 20000).amount).toBe(246);
    expect(calculateRegionalTax("trento", 25000).amount).toBe(0);
    expect(calculateRegionalTax("trento", 40000).amount).toBe(492);
    expect(calculateRegionalTax("sicilia", 20000).amount).toBe(246);
    expect(calculateRegionalTax("calabria", 20000).amount).toBe(346);
  });

  it("applies Lazio and Umbria low-income overrides", () => {
    expect(calculateRegionalTax("lazio", 20000).amount).toBe(346);
    expect(calculateRegionalTax("umbria", 20000).amount).toBe(246);
  });
});

function identity(result: ReturnType<typeof calculateSalary>): number {
  return (
    cents(result.ral) -
    cents(result.inps) -
    cents(result.irpefNet) -
    cents(result.regionalTax) -
    cents(result.municipalTax ?? 0) +
    cents(result.trattamentoIntegrativo)
  ) / 100;
}

function cents(value: number): number {
  return Math.round(value * 100);
}

describe("calculateSalary", () => {
  it("QA1: 30.000 euro in Lombardia over 13 months matches the oracle", () => {
    const result = calculateSalary(input());
    expect(result.inps).toBe(2757);
    expect(result.inpsExtraBase).toBe(0);
    expect(result.taxableIncome).toBe(27243);
    expect(result.irpefGross).toBe(6265.89);
    expect(result.employmentDeduction).toBe(1979.29);
    expect(result.ulterioreDetrazione).toBe(1000);
    expect(result.cuneo65).toBe(65);
    expect(result.irpefNet).toBe(3221.6);
    expect(result.regionalTax).toBe(335.09);
    expect(result.municipalEstimated).toBe(true);
    expect(result.municipalTax).toBe(136.21);
    expect(result.trattamentoIntegrativo).toBe(1200);
    expect(result.sommaIntegrativa).toBe(0);
    expect(result.netAnnual).toBe(24750.1);
    expect(result.netMonthly).toBe(1903.85);
    expect(identity(result)).toBe(result.netAnnual);
  });

  it("QA2: 45.000 euro in Piemonte with one child aged 25", () => {
    const result = calculateSalary(input({
      ral: 45000,
      regionId: "piemonte",
      family: { spouseDependent: false, eligibleChildren: 1, childShare: 1, ascendants: 0 },
    }));
    expect(result.inps).toBe(4135.5);
    expect(result.taxableIncome).toBe(40864.5);
    expect(result.irpefGross).toBe(10685.29);
    expect(result.employmentDeduction).toBe(793.13);
    expect(result.childrenDeduction).toBe(541.35);
    expect(result.cuneo65).toBe(0);
    expect(result.ulterioreDetrazione).toBe(0);
    expect(result.irpefNet).toBe(9350.81);
    expect(result.regionalTax).toBe(662);
    expect(result.municipalTax).toBe(204.32);
    expect(result.municipalEstimated).toBe(true);
    expect(result.trattamentoIntegrativo).toBe(0);
    expect(result.netAnnual).toBe(30647.37);
    expect(result.netMonthly).toBe(2357.49);
    expect(identity(result)).toBe(result.netAnnual);
  });

  it("QA5: bonus uses RC, so a 31.000 euro RAL gets no bonus", () => {
    const result = calculateSalary(input({ ral: 31000 }));
    expect(result.taxableIncome).toBe(28151.1);
    expect(result.trattamentoIntegrativo).toBe(0);
  });

  it("changes the monthly net when the number of payments changes", () => {
    const twelve = calculateSalary(input({ months: 12 }));
    const fourteen = calculateSalary(input({ months: 14 }));
    expect(twelve.netAnnual).toBe(24750.1);
    expect(fourteen.netAnnual).toBe(24750.1);
    expect(twelve.netMonthly).toBe(2062.51);
    expect(fourteen.netMonthly).toBe(1767.86);
  });

  it("applies the extra 1% INPS only on monthly pay above 4.685 euro", () => {
    const twelve = calculateSalary(input({ ral: 60000, months: 12 }));
    const thirteen = calculateSalary(input({ ral: 60000, months: 13 }));
    expect(twelve.inps).toBe(5551.8);
    expect(twelve.inpsExtraBase).toBe(3780);
    expect(thirteen.inps).toBe(5514);
    expect(thirteen.inpsExtraBase).toBe(0);
  });

  it("caps contributions at the 2026 massimale when requested", () => {
    const capped = calculateSalary(input({ ral: 200000, months: 12, applyMassimale: true }));
    const uncapped = calculateSalary(input({ ral: 200000, months: 12, applyMassimale: false }));
    expect(capped.inpsOrdinaryBase).toBe(122295);
    expect(capped.inps).toBeLessThan(uncapped.inps);
  });

  it("uses the 0.5% municipal estimate until the user overrides it", () => {
    const estimate = calculateSalary(input());
    const withRate = calculateSalary(input({ municipalRate: 0.008 }));
    expect(estimate.municipalEstimated).toBe(true);
    expect(estimate.municipalTax).toBe(136.21);
    expect(withRate.municipalEstimated).toBe(false);
    expect(withRate.municipalTax).toBe(217.94);
    expect(withRate.netAnnual).toBe(24668.37);
  });

  it("does not pay the bonus when article 13 already exceeds gross IRPEF", () => {
    const result = calculateSalary(input({ ral: 9029.84, months: 12 }));
    expect(result.taxableIncome).toBe(8200);
    expect(result.sommaIntegrativa).toBe(582.2);
    expect(result.imponibileIrpef).toBe(7617.8);
    expect(result.irpefGross).toBe(1752.09);
    expect(result.irpefNet).toBe(0);
    expect(result.trattamentoIntegrativo).toBe(0);
    expect(result.regionalTax).toBe(0);
    expect(result.municipalTax).toBe(0);
  });

  it("applies the somma esclusa for RC up to 20.000 euro", () => {
    const result = calculateSalary(input({ ral: 20000 }));
    expect(result.taxableIncome).toBe(18162);
    expect(result.sommaIntegrativa).toBe(871.78);
    expect(result.imponibileIrpef).toBe(17290.22);
    expect(result.irpefGross).toBe(3976.75);
    expect(result.irpefNet).toBe(1166.19);
    expect(result.trattamentoIntegrativo).toBe(1166.19);
    expect(result.regionalTax).toBe(212.67);
    expect(result.municipalTax).toBe(86.45);
    expect(result.netAnnual).toBe(17862.88);
    expect(result.netMonthly).toBe(1374.07);
    expect(identity(result)).toBe(result.netAnnual);
  });

  it("applies no somma above 20.000 euro of RC", () => {
    const result = calculateSalary(input({ ral: 25000 }));
    expect(result.taxableIncome).toBe(22702.5);
    expect(result.sommaIntegrativa).toBe(0);
    expect(result.imponibileIrpef).toBe(22702.5);
    expect(result.netAnnual).toBe(21683.09);
    expect(result.netMonthly).toBe(1667.93);
  });

  it("sommaIntegrativa follows the 7,1 / 5,3 / 4,8 bands and stops above 20.000", () => {
    expect(sommaIntegrativa(8500)).toBe(603.5);
    expect(sommaIntegrativa(8501)).toBe(450.55);
    expect(sommaIntegrativa(15000)).toBe(795);
    expect(sommaIntegrativa(20000)).toBe(960);
    expect(sommaIntegrativa(20001)).toBe(0);
    expect(sommaIntegrativa(0)).toBe(0);
  });

  it("returns the same result for the same input", () => {
    const first = calculateSalary(input({ municipalRate: 0.005, months: 14 }));
    const second = calculateSalary(input({ municipalRate: 0.005, months: 14 }));
    expect(second).toEqual(first);
  });

  it("rejects an unknown region instead of inventing a rate", () => {
    expect(() => calculateSalary(input({ regionId: "atlantide" }))).toThrow();
  });
});

describe("parseSalaryForm", () => {
  const valid = {
    ral: "30.000",
    regionId: "lombardia",
    municipalRate: "",
    months: "13",
    spouseDependent: false,
    children: "",
    childShare: "50",
    ascendants: "0",
    applyMassimale: false,
  };

  it("parses Italian amounts", () => {
    expect(parseItalianAmount("30.000")).toBe(30000);
    expect(parseItalianAmount("30.000,50")).toBe(30000.5);
    expect(parseItalianAmount("30000")).toBe(30000);
    expect(parseItalianAmount("0,8")).toBe(0.8);
    expect(parseItalianAmount("abc")).toBeNull();
    expect(parseItalianAmount("-100")).toBeNull();
  });

  it("accepts a complete form and blocks invalid salaries", () => {
    const parsed = parseSalaryForm(valid);
    expect(parsed.ok).toBe(true);
    if (parsed.ok) expect(parsed.input.ral).toBe(30000);

    expect(parseSalaryForm({ ...valid, ral: "" }).ok).toBe(false);
    expect(parseSalaryForm({ ...valid, ral: "-20" }).ok).toBe(false);
    expect(parseSalaryForm({ ...valid, ral: "6000000" }).ok).toBe(false);
    expect(parseSalaryForm({ ...valid, municipalRate: "2" }).ok).toBe(false);
    const commaRate = parseSalaryForm({ ...valid, municipalRate: "0,8" });
    expect(commaRate.ok).toBe(true);
    if (commaRate.ok) expect(commaRate.input.municipalRate).toBe(0.008);
    const invalidRate = parseSalaryForm({ ...valid, municipalRate: "abc" });
    expect(invalidRate.ok).toBe(false);
    if (!invalidRate.ok) {
      expect(invalidRate.errors.municipalRate).toBe("Inserisci l'aliquota comunale come numero, per esempio 0,8.");
    }
    expect(parseSalaryForm({ ...valid, children: "1,5" }).ok).toBe(false);
  });
});
