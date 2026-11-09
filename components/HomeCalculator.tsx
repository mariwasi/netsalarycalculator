"use client";

import { useMemo, useState } from "react";
import { HomeHero } from "@/components/HomeHero";
import { HowItWorks } from "@/components/HowItWorks";
import { TickerBands } from "@/components/TickerBands";
import { SalaryBreakdown } from "@/components/SalaryBreakdown";
import { SalaryComparison } from "@/components/SalaryComparison";
import { SalaryForm } from "@/components/SalaryForm";
import { SalaryResult } from "@/components/SalaryResult";
import { calculateSalary } from "@/lib/salary/calculate";
import { parseSalaryForm, type SalaryField, type SalaryFormValues } from "@/lib/salary/parse";
import { COMPARISON_RALS } from "@/lib/salary/types";

const initialValues: SalaryFormValues = {
  ral: "30000",
  regionId: "lombardia",
  municipalRate: "",
  months: "13",
  spouseDependent: false,
  children: "",
  childShare: "100",
  ascendants: "",
  applyMassimale: false,
};

const fieldOrder: SalaryField[] = [
  "ral",
  "regionId",
  "municipalRate",
  "months",
  "children",
  "ascendants",
  "childShare",
];

const fieldIds: Partial<Record<SalaryField, string>> = {
  ral: "ral",
  regionId: "regione",
  municipalRate: "comune",
  children: "figli",
  ascendants: "ascendenti",
};

export function HomeCalculator() {
  const [values, setValues] = useState<SalaryFormValues>(initialValues);
  const [familyOpen, setFamilyOpen] = useState(false);

  const parsed = useMemo(() => parseSalaryForm(values), [values]);
  const result = parsed.ok ? calculateSalary(parsed.input) : null;
  const settings = useMemo(() => {
    const probe = parseSalaryForm({ ...values, ral: "30000" });
    return probe.ok ? probe.input : null;
  }, [values]);
  const cards = COMPARISON_RALS.map((ral) => ({
    ral,
    result: settings ? calculateSalary({ ...settings, ral }) : null,
  }));

  function update(patch: Partial<SalaryFormValues>) {
    setValues((current) => ({ ...current, ...patch }));
  }

  function submitCalculation() {
    if (!parsed.ok) {
      const field = fieldOrder.find((key) => parsed.errors[key]);
      if (field === "children" || field === "ascendants") setFamilyOpen(true);
      window.setTimeout(() => {
        document.getElementById(field ? (fieldIds[field] ?? "ral") : "ral")?.focus();
      }, 0);
      return;
    }
    document.getElementById("risultato")?.focus();
  }

  return (
    <>
      <HomeHero
        calculator={
          <section id="calcolatore" className="scroll-mt-24 rounded-[20px] bg-white p-3 shadow-[0_16px_34px_rgba(0,0,0,0.28)] sm:p-4" aria-label="Calcolatore">
            <div className="grid items-start gap-5 lg:grid-cols-2">
              <SalaryForm
                values={values}
                errors={parsed.ok ? {} : parsed.errors}
                familyOpen={familyOpen}
                onFamilyOpen={setFamilyOpen}
                onChange={update}
                onReset={() => {
                  setValues(initialValues);
                  setFamilyOpen(false);
                }}
                onSubmit={submitCalculation}
              />
              <SalaryResult
                result={result}
                message={parsed.ok ? null : "Correggi i campi segnalati per aggiornare la stima."}
              />
            </div>
          </section>
        }
      />
      <TickerBands />
      <SalaryComparison
        cards={cards}
        activeRal={parsed.ok ? parsed.input.ral : null}
        onSelect={(ral) => {
          update({ ral: String(ral) });
          document.getElementById("calcolatore")?.scrollIntoView({ behavior: "smooth", block: "start" });
        }}
      />
      <HowItWorks />
      <SalaryBreakdown result={result} />
    </>
  );
}
