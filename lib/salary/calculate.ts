import { applyBasisPoints, round2 } from "./money";
import { calculateRegionalTax, regionName } from "./regions";
import {
  INPS_EXTRA_MONTHLY_THRESHOLD,
  INPS_MASSIMALE,
  type FamilyInput,
  type PaymentMonths,
  type SalaryInput,
  type SalaryResult,
} from "./types";

const EXTRA_THRESHOLD_CENTS = INPS_EXTRA_MONTHLY_THRESHOLD * 100;
const MASSIMALE_CENTS = INPS_MASSIMALE * 100;

export function calculateInps(
  ral: number,
  months: PaymentMonths,
  applyMassimale: boolean,
): { amount: number; ordinaryBase: number; extraBase: number } {
  const ralCents = Math.round(ral * 100);
  const cap = applyMassimale ? MASSIMALE_CENTS : Number.POSITIVE_INFINITY;
  const baseMonth = Math.floor(ralCents / months);
  const remainder = ralCents - baseMonth * months;
  let ordinaryCents = 0;
  let extraCents = 0;

  for (let index = 0; index < months; index += 1) {
    const gross = baseMonth + (index < remainder ? 1 : 0);
    const room = Math.max(0, cap - ordinaryCents);
    const base = Math.min(gross, room);
    ordinaryCents += base;
    if (base > EXTRA_THRESHOLD_CENTS) {
      extraCents += base - EXTRA_THRESHOLD_CENTS;
    }
  }

  const ordinaryBase = ordinaryCents / 100;
  const extraBase = extraCents / 100;
  const amount = round2(
    applyBasisPoints(ordinaryBase, 919) + applyBasisPoints(extraBase, 100),
  );

  return { amount, ordinaryBase, extraBase };
}

/** IRPEF lorda 2026: 23% fino a 28.000, 33% fino a 50.000, 43% oltre. */
export function irpefGross(income: number): number {
  if (income <= 0) return 0;
  const cents = Math.round(income * 100);
  const upTo28000 = 2_800_000;
  const upTo50000 = 5_000_000;

  if (cents <= upTo28000) return applyBasisPoints(income, 2300);
  if (cents <= upTo50000) {
    const extra = Math.round(((cents - upTo28000) * 3300) / 10000);
    return (644_000 + extra) / 100;
  }

  const extra = Math.round(((cents - upTo50000) * 4300) / 10000);
  return (1_370_000 + extra) / 100;
}

/** Detrazione per lavoro dipendente, art. 13, without the separate €65 cuneo line. */
export function employmentDeduction(income: number): number {
  if (income < 0) return 0;

  let amount = 0;
  if (income <= 15000) {
    amount = 1955;
  } else if (income <= 28000) {
    amount = 1910 + (1190 * (28000 - income)) / 13000;
  } else if (income <= 50000) {
    amount = Math.max(690, (1910 * (50000 - income)) / 22000);
  }

  return round2(Math.max(0, amount));
}

/** Separate cuneo line. Above €25,000 and up to €35,000, matching "superiore a 25.000". */
export function cuneo65(income: number): number {
  if (income > 25000 && income <= 35000) return 65;
  return 0;
}

function spouseDeduction(income: number): number {
  if (income <= 0 || income >= 80000) return 0;
  if (income < 15000) return round2(800 - (110 * income) / 15000);
  if (income <= 40000) return 690;
  return round2((690 * (80000 - income)) / 40000);
}

function childrenDeduction(income: number, count: number, share: number): number {
  if (count <= 0 || income <= 0) return 0;
  const threshold = 95000 + 15000 * (count - 1);
  if (income >= threshold) return 0;
  // Quotient only. Art. 12 comma 1-bis (€1,200 for four or more children) was
  // repealed by D.Lgs. 230/2021, art. 10 comma 4 lett. d. The vigente letter c)
  // has no +€200 × n and no +€200 × (n − 3).
  return round2((950 * count * (threshold - income) * share) / threshold);
}

function ascendantDeduction(income: number, count: number): number {
  if (count <= 0 || income <= 0 || income >= 80000) return 0;
  return round2((750 * count * (80000 - income)) / 80000);
}

export function familyDeductions(income: number, family: FamilyInput): {
  spouse: number;
  children: number;
  ascendants: number;
  total: number;
  appliedChildShare: number;
} {
  const appliedChildShare = family.spouseDependent ? 1 : family.childShare;
  const spouse = family.spouseDependent ? spouseDeduction(income) : 0;
  const children = childrenDeduction(income, family.eligibleChildren, appliedChildShare);
  const ascendants = ascendantDeduction(income, family.ascendants);
  return {
    spouse,
    children,
    ascendants,
    total: round2(spouse + children + ascendants),
    appliedChildShare,
  };
}

/** Somma non imponibile per reddito complessivo fino a 20.000 € (L. 207/2024). */
export function sommaIntegrativa(income: number): number {
  if (income <= 0 || income > 20000) return 0;
  if (income <= 8500) return applyBasisPoints(income, 710);
  if (income <= 15000) return applyBasisPoints(income, 530);
  return applyBasisPoints(income, 480);
}

/** Ulteriore detrazione per reddito complessivo oltre 20.000 e fino a 40.000 €. */
export function ulterioreDetrazione(income: number): number {
  if (income <= 20000 || income > 40000) return 0;
  if (income <= 32000) return 1000;
  return round2(1000 * ((40000 - income) / 8000));
}

function formatRate(rate: number): string {
  return new Intl.NumberFormat("it-IT", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 3,
  }).format(rate * 100);
}

function cents(value: number): number {
  return Math.round(value * 100);
}

export function calculateSalary(input: SalaryInput): SalaryResult {
  const inps = calculateInps(input.ral, input.months, input.applyMassimale);
  const taxableIncome = round2(input.ral - inps.amount);
  const grossTax = irpefGross(taxableIncome);
  const employment = employmentDeduction(taxableIncome);
  const family = familyDeductions(taxableIncome, input.family);
  const ulteriore = ulterioreDetrazione(taxableIncome);
  const plus65 = cuneo65(taxableIncome);
  const irpefNet = Math.max(
    0,
    cents(grossTax) - cents(employment) - cents(family.total) - cents(ulteriore) - cents(plus65),
  ) / 100;

  let trattamentoIntegrativo = 0;
  if (taxableIncome <= 28000 && grossTax > employment) {
    trattamentoIntegrativo = Math.min(1200, irpefNet);
  }

  const regionalQuote = calculateRegionalTax(input.regionId, taxableIncome);
  const regionalTax = irpefNet > 0 ? regionalQuote.amount : 0;
  const municipalEstimated = input.municipalRate === null;
  const municipalRate = input.municipalRate ?? 0.005;
  const municipalTax = irpefNet > 0 ? round2(taxableIncome * municipalRate) : 0;

  const withholdingsCents =
    cents(inps.amount) + cents(irpefNet) + cents(regionalTax) + cents(municipalTax);
  const netAnnual = (cents(input.ral) - withholdingsCents + cents(trattamentoIntegrativo)) / 100;
  const withholdings = withholdingsCents / 100;

  const assumptions = [
    "Profilo calcolato: lavoratore dipendente del settore privato (industria, commercio o artigianato), con aliquota a carico del 9,19%.",
    "Si ipotizza un rapporto per l'intero anno e un unico reddito da lavoro dipendente, senza altri oneri deducibili.",
    input.applyMassimale
      ? "È applicato il massimale contributivo 2026 di 122.295 €."
      : "Il massimale contributivo non è applicato: i contributi sono calcolati sull'intera RAL.",
    `La RAL è divisa in ${input.months} mensilità uguali. Il netto mensile è la stima annua ripartita nello stesso modo.`,
    municipalEstimated
      ? "L'addizionale comunale è una stima allo 0,5% sull'intero imponibile, perché il campo aliquota è vuoto. Un valore inserito sostituisce la stima."
      : `L'addizionale comunale usa l'aliquota inserita del ${formatRate(municipalRate)}% sull'intero imponibile, senza esenzioni o detrazioni comunali.`,
    "L'addizionale regionale usa l'aliquota base della regione sull'intero imponibile. Per Lombardia è l'1,23%.",
    "Non sono applicate detrazioni regionali per figli, disabilità o altre condizioni personali, salvo le regole generali indicate per la regione scelta.",
    "Il taglio di 440 € sulle detrazioni per alcuni oneri, previsto oltre 200.000 € di reddito, non è applicato: il modulo non raccoglie quelle spese.",
  ];

  return {
    ral: input.ral,
    months: input.months,
    regionId: input.regionId,
    regionName: regionName(input.regionId),
    applyMassimale: input.applyMassimale,
    inps: inps.amount,
    inpsOrdinaryBase: inps.ordinaryBase,
    inpsExtraBase: inps.extraBase,
    taxableIncome,
    irpefGross: grossTax,
    employmentDeduction: employment,
    cuneo65: plus65,
    spouseDeduction: family.spouse,
    childrenDeduction: family.children,
    ascendantDeduction: family.ascendants,
    familyDeduction: family.total,
    appliedChildShare: family.appliedChildShare,
    ulterioreDetrazione: ulteriore,
    irpefNet,
    regionalTax,
    regionalNote: regionalQuote.note,
    municipalTax,
    municipalRate,
    municipalEstimated,
    trattamentoIntegrativo,
    sommaIntegrativa: 0,
    withholdings,
    netAnnual,
    netMonthly: round2(netAnnual / input.months),
    grossMonthly: round2(input.ral / input.months),
    deductionsMonthly: round2(withholdings / input.months),
    assumptions,
  };
}
