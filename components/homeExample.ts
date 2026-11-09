import { calculateSalary } from "@/lib/salary/calculate";
import type { SalaryInput } from "@/lib/salary/types";

/** Lombardia, 13 mensilità, campo comunale vuoto. Same defaults as the form. */
export const lombardiaExample: SalaryInput = {
  ral: 30000,
  regionId: "lombardia",
  municipalRate: null,
  months: 13,
  family: {
    spouseDependent: false,
    eligibleChildren: 0,
    childShare: 1,
    ascendants: 0,
  },
  applyMassimale: false,
};

export function lombardiaAt(ral: number) {
  return calculateSalary({ ...lombardiaExample, ral });
}
