import { isRegionId } from "./regions";
import { RAL_MAX, RAL_MIN, type FamilyInput, type PaymentMonths, type SalaryInput } from "./types";

export type SalaryFormValues = {
  ral: string;
  regionId: string;
  municipalRate: string;
  months: string;
  spouseDependent: boolean;
  children: string;
  childShare: string;
  ascendants: string;
  applyMassimale: boolean;
};

export type SalaryField = "ral" | "municipalRate" | "months" | "regionId" | "children" | "ascendants" | "childShare";

export type SalaryFieldErrors = Partial<Record<SalaryField, string>>;

export type ParsedSalaryForm =
  | { ok: true; input: SalaryInput }
  | { ok: false; errors: SalaryFieldErrors };

const MUNICIPAL_RATE_MAX = 1.2;

export function parseItalianAmount(raw: string): number | null {
  const cleaned = raw.trim().replace(/\s/g, "").replace(/€/g, "");
  if (!cleaned || cleaned.startsWith("-")) return null;

  let normalized = cleaned;
  const hasComma = cleaned.includes(",");
  const hasDot = cleaned.includes(".");

  if (hasComma && hasDot) {
    if (cleaned.lastIndexOf(",") < cleaned.lastIndexOf(".")) return null;
    normalized = cleaned.replace(/\./g, "").replace(",", ".");
  } else if (hasComma) {
    normalized = cleaned.replace(",", ".");
  } else if (hasDot && /^\d{1,3}(\.\d{3})+$/.test(cleaned)) {
    normalized = cleaned.replace(/\./g, "");
  }

  if (!/^\d+(\.\d+)?$/.test(normalized)) return null;
  const value = Number(normalized);
  return Number.isFinite(value) ? value : null;
}

function parseCount(raw: string): number | null {
  const trimmed = raw.trim();
  if (trimmed === "") return 0;
  if (!/^\d+$/.test(trimmed)) return null;
  return Number(trimmed);
}

export function parseSalaryForm(values: SalaryFormValues): ParsedSalaryForm {
  const errors: SalaryFieldErrors = {};

  const ralText = values.ral.trim();
  if (!ralText) {
    errors.ral = "Inserisci la RAL annua.";
  } else if (ralText.startsWith("-")) {
    errors.ral = "La RAL non può essere negativa.";
  } else {
    const ral = parseItalianAmount(ralText);
    if (ral === null) {
      errors.ral = "Inserisci un importo numerico valido.";
    } else if (ral < RAL_MIN || ral > RAL_MAX) {
      errors.ral = "Inserisci una RAL tra 1 € e 5.000.000 €.";
    }
  }

  if (!isRegionId(values.regionId)) {
    errors.regionId = "Seleziona una regione.";
  }

  const months = Number(values.months);
  if (months !== 12 && months !== 13 && months !== 14) {
    errors.months = "Seleziona 12, 13 o 14 mensilità.";
  }

  const municipalText = values.municipalRate.trim();
  let municipalRate: number | null = null;
  if (municipalText) {
    const parsedRate = parseItalianAmount(municipalText);
    if (parsedRate === null || municipalText.startsWith("-")) {
      errors.municipalRate = "Inserisci l'aliquota comunale come numero, per esempio 0,8.";
    } else if (parsedRate > MUNICIPAL_RATE_MAX) {
      errors.municipalRate = "L'aliquota supera 1,2%. Controlla il valore pubblicato dal comune.";
    } else {
      municipalRate = parsedRate / 100;
    }
  }

  const children = parseCount(values.children);
  if (children === null || children > 12) {
    errors.children = "Inserisci un numero intero di figli tra 0 e 12.";
  }

  const ascendants = parseCount(values.ascendants);
  if (ascendants === null || ascendants > 8) {
    errors.ascendants = "Inserisci un numero intero di ascendenti tra 0 e 8.";
  }

  if (values.childShare !== "50" && values.childShare !== "100") {
    errors.childShare = "Seleziona la quota della detrazione per i figli.";
  }

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors };
  }

  const ral = parseItalianAmount(values.ral.trim());
  const family: FamilyInput = {
    spouseDependent: values.spouseDependent,
    eligibleChildren: children ?? 0,
    childShare: values.childShare === "100" ? 1 : 0.5,
    ascendants: ascendants ?? 0,
  };

  return {
    ok: true,
    input: {
      ral: ral ?? 0,
      regionId: values.regionId,
      municipalRate,
      months: months as PaymentMonths,
      family,
      applyMassimale: values.applyMassimale,
    },
  };
}
