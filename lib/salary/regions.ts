import { round2 } from "./money";

export type RegionBracket = {
  /** Inclusive upper bound of the slice, in euro. */
  upTo: number;
  /** 123 means 1,23%. */
  basisPoints: number;
};

export type RegionalTax = {
  amount: number;
  note: string | null;
};

type RegionDefinition = {
  id: string;
  name: string;
  calculate: (taxableIncome: number) => RegionalTax;
};

const LAST = Number.POSITIVE_INFINITY;

function marginal(income: number, brackets: readonly RegionBracket[]): number {
  if (income <= 0) return 0;
  const incomeCents = Math.round(income * 100);
  let lower = 0;
  let taxCents = 0;

  for (const bracket of brackets) {
    const upperBound =
      bracket.upTo === LAST ? incomeCents : Math.round(bracket.upTo * 100);
    if (incomeCents <= lower) break;
    const upper = Math.min(incomeCents, upperBound);
    const sliceCents = upper - lower;
    taxCents += Math.round((sliceCents * bracket.basisPoints) / 10000);
    lower = upperBound;
    if (incomeCents <= upperBound) break;
  }

  return taxCents / 100;
}

function flat(income: number, basisPoints: number): number {
  if (income <= 0) return 0;
  return round2((income * basisPoints) / 10000);
}

function standard(
  id: string,
  name: string,
  brackets: readonly RegionBracket[],
  note: string | null = null,
): RegionDefinition {
  return {
    id,
    name,
    calculate: (income) => ({
      amount: flat(income, brackets[0]?.basisPoints ?? 0),
      note,
    }),
  };
}

/**
 * The arrays below keep the January 2026 brackets previously taken from the
 * Dipartimento delle Finanze tables. For a standard region the active tax is
 * only the first rate, applied to the whole imponibile: that is the oracle
 * base rate (Lombardia 1,23%, Piemonte 1,62%). Marginal application of the
 * same Lombardia table on €27.243 produced €377,94, not the oracle €335,09.
 * Regions with their own calculate() function are unchanged.
 * Subjective regional deductions are not applied.
 */
const REGION_LIST: readonly RegionDefinition[] = [
  standard("abruzzo", "Abruzzo", [
    { upTo: 28000, basisPoints: 167 },
    { upTo: 50000, basisPoints: 287 },
    { upTo: LAST, basisPoints: 333 },
  ]),
  standard("basilicata", "Basilicata", [{ upTo: LAST, basisPoints: 123 }]),
  {
    id: "bolzano",
    name: "Trentino-Alto Adige — Bolzano",
    calculate: (income) => {
      const note =
        "Sono applicate la detrazione di 430,50 € fino a 90.000 € di imponibile e la detrazione sulla parte oltre 50.000 € (massimo 125 €). La detrazione di 340 € per ogni figlio non è inclusa.";
      if (income <= 0) return { amount: 0, note };
      let tax = marginal(income, [
        { upTo: 50000, basisPoints: 123 },
        { upTo: LAST, basisPoints: 173 },
      ]);
      if (income <= 90000) tax -= 430.5;
      if (income > 50000) {
        tax -= Math.min(125, 125 * ((income - 50000) / 25000));
      }
      return { amount: round2(Math.max(0, tax)), note };
    },
  },
  standard("calabria", "Calabria", [{ upTo: LAST, basisPoints: 173 }]),
  standard("campania", "Campania", [
    { upTo: 15000, basisPoints: 173 },
    { upTo: 28000, basisPoints: 296 },
    { upTo: 50000, basisPoints: 320 },
    { upTo: LAST, basisPoints: 333 },
  ]),
  standard("emilia-romagna", "Emilia-Romagna", [
    { upTo: 15000, basisPoints: 133 },
    { upTo: 28000, basisPoints: 193 },
    { upTo: 50000, basisPoints: 278 },
    { upTo: LAST, basisPoints: 333 },
  ]),
  {
    id: "friuli-venezia-giulia",
    name: "Friuli-Venezia Giulia",
    calculate: (income) => {
      const note =
        "Fino a 15.000 € di imponibile l'aliquota è 0,70%. Oltre, l'1,23% si applica all'intero imponibile.";
      if (income <= 0) return { amount: 0, note };
      const amount = income <= 15000 ? flat(income, 70) : flat(income, 123);
      return { amount, note };
    },
  },
  {
    id: "lazio",
    name: "Lazio",
    calculate: (income) => {
      const note =
        "Fino a 28.000 € di imponibile l'aliquota è 1,73% sull'intero importo. Oltre, si applicano gli scaglioni pubblicati e, tra 28.001 e 30.000 €, una detrazione di 60 €.";
      if (income <= 0) return { amount: 0, note };
      if (income <= 28000) return { amount: flat(income, 173), note };
      const tax =
        marginal(income, [
          { upTo: 15000, basisPoints: 173 },
          { upTo: LAST, basisPoints: 333 },
        ]) - (income <= 30000 ? 60 : 0);
      return { amount: round2(Math.max(0, tax)), note };
    },
  },
  standard("liguria", "Liguria", [
    { upTo: 28000, basisPoints: 123 },
    { upTo: 50000, basisPoints: 318 },
    { upTo: LAST, basisPoints: 323 },
  ]),
  standard("lombardia", "Lombardia", [
    { upTo: 15000, basisPoints: 123 },
    { upTo: 28000, basisPoints: 158 },
    { upTo: 50000, basisPoints: 172 },
    { upTo: LAST, basisPoints: 173 },
  ]),
  standard("marche", "Marche", [
    { upTo: 15000, basisPoints: 123 },
    { upTo: 28000, basisPoints: 153 },
    { upTo: 50000, basisPoints: 170 },
    { upTo: LAST, basisPoints: 173 },
  ]),
  standard("molise", "Molise", [
    { upTo: 15000, basisPoints: 173 },
    { upTo: 28000, basisPoints: 193 },
    { upTo: 50000, basisPoints: 333 },
    { upTo: LAST, basisPoints: 333 },
  ]),
  standard("piemonte", "Piemonte", [
    { upTo: 15000, basisPoints: 162 },
    { upTo: 28000, basisPoints: 268 },
    { upTo: 50000, basisPoints: 331 },
    { upTo: LAST, basisPoints: 333 },
  ]),
  standard("puglia", "Puglia", [
    { upTo: 15000, basisPoints: 133 },
    { upTo: 28000, basisPoints: 143 },
    { upTo: 50000, basisPoints: 163 },
    { upTo: LAST, basisPoints: 185 },
  ]),
  standard("sardegna", "Sardegna", [{ upTo: LAST, basisPoints: 123 }]),
  standard("sicilia", "Sicilia", [{ upTo: LAST, basisPoints: 123 }]),
  standard("toscana", "Toscana", [
    { upTo: 15000, basisPoints: 142 },
    { upTo: 28000, basisPoints: 143 },
    { upTo: 50000, basisPoints: 332 },
    { upTo: LAST, basisPoints: 333 },
  ]),
  {
    id: "trento",
    name: "Trentino-Alto Adige — Trento",
    calculate: (income) => {
      const note =
        "Fino a 30.000 € di imponibile la deduzione provinciale azzera l'addizionale. La detrazione di 246 € per figlio non è inclusa.";
      if (income <= 30000) return { amount: 0, note };
      return {
        amount: marginal(income, [
          { upTo: 50000, basisPoints: 123 },
          { upTo: LAST, basisPoints: 173 },
        ]),
        note,
      };
    },
  },
  {
    id: "umbria",
    name: "Umbria",
    calculate: (income) => {
      const note =
        "Fino a 28.000 € di imponibile non si applicano le maggiorazioni: l'addizionale è l'1,23%. Oltre, si usano gli scaglioni pubblicati e, fino a 50.000 €, una detrazione di 150 €.";
      if (income <= 0) return { amount: 0, note };
      if (income <= 28000) return { amount: flat(income, 123), note };
      const tax =
        marginal(income, [
          { upTo: 15000, basisPoints: 173 },
          { upTo: 28000, basisPoints: 302 },
          { upTo: 50000, basisPoints: 312 },
          { upTo: LAST, basisPoints: 333 },
        ]) - (income <= 50000 ? 150 : 0);
      return { amount: round2(Math.max(0, tax)), note };
    },
  },
  {
    id: "valle-d-aosta",
    name: "Valle d'Aosta",
    calculate: (income) => {
      const note =
        "Fino a 15.000 € di reddito complessivo l'addizionale non è dovuta. Oltre, l'1,23% si applica all'intero imponibile.";
      if (income <= 15000) return { amount: 0, note };
      return { amount: flat(income, 123), note };
    },
  },
  standard("veneto", "Veneto", [{ upTo: LAST, basisPoints: 123 }]),
];

const REGION_MAP = new Map(REGION_LIST.map((region) => [region.id, region]));

export const REGIONS = REGION_LIST.map((region) => ({
  id: region.id,
  name: region.name,
}));

export function isRegionId(value: string): boolean {
  return REGION_MAP.has(value);
}

export function regionName(id: string): string {
  return REGION_MAP.get(id)?.name ?? id;
}

export function calculateRegionalTax(id: string, taxableIncome: number): RegionalTax {
  const region = REGION_MAP.get(id);
  if (!region) {
    throw new Error(`Regione non supportata: ${id}`);
  }
  return region.calculate(taxableIncome);
}
