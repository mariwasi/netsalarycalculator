export const TAX_YEAR = 2026;
export const RAL_MIN = 1;
export const RAL_MAX = 5_000_000;
export const INPS_EMPLOYEE_RATE = 0.0919;
export const INPS_EXTRA_MONTHLY_THRESHOLD = 4685;
export const INPS_MASSIMALE = 122_295;
export const COMPARISON_RALS = [25000, 30000, 40000] as const;

export type PaymentMonths = 12 | 13 | 14;

export type FamilyInput = {
  spouseDependent: boolean;
  eligibleChildren: number;
  /** Quota art. 12 per i figli. Ignorata e forzata a 1 se il coniuge è a carico. */
  childShare: 0.5 | 1;
  ascendants: number;
};

export type SalaryInput = {
  ral: number;
  regionId: string;
  /** Aliquota decimale. null = campo vuoto, quindi stima allo 0,5%. */
  municipalRate: number | null;
  months: PaymentMonths;
  family: FamilyInput;
  applyMassimale: boolean;
};

export type SalaryResult = {
  ral: number;
  months: PaymentMonths;
  regionId: string;
  regionName: string;
  applyMassimale: boolean;
  inps: number;
  inpsOrdinaryBase: number;
  inpsExtraBase: number;
  taxableIncome: number;
  irpefGross: number;
  employmentDeduction: number;
  /** €65 cuneo line. Not part of employmentDeduction. */
  cuneo65: number;
  spouseDeduction: number;
  childrenDeduction: number;
  ascendantDeduction: number;
  familyDeduction: number;
  appliedChildShare: number;
  ulterioreDetrazione: number;
  irpefNet: number;
  regionalTax: number;
  regionalNote: string | null;
  municipalTax: number | null;
  municipalRate: number | null;
  /** True when the empty field was filled with the 0,5% estimate. */
  municipalEstimated: boolean;
  trattamentoIntegrativo: number;
  sommaIntegrativa: number;
  withholdings: number;
  netAnnual: number;
  netMonthly: number;
  grossMonthly: number;
  deductionsMonthly: number;
  assumptions: string[];
};
