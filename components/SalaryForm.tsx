import { useState } from "react";
import { REGIONS } from "@/lib/salary/regions";
import type { SalaryFieldErrors, SalaryFormValues } from "@/lib/salary/parse";

type SalaryFormProps = {
  values: SalaryFormValues;
  errors: SalaryFieldErrors;
  familyOpen: boolean;
  onFamilyOpen: (open: boolean) => void;
  onChange: (patch: Partial<SalaryFormValues>) => void;
  onReset: () => void;
  onSubmit: () => void;
};

const fieldClass =
  "mt-1.5 w-full rounded-xl border border-line bg-white px-3 py-2.5 text-sm text-ink outline-none focus:border-forest";

export function SalaryForm({
  values,
  errors,
  familyOpen,
  onFamilyOpen,
  onChange,
  onReset,
  onSubmit,
}: SalaryFormProps) {
  const spouseLocksChildShare = values.spouseDependent && Number(values.children) > 0;
  const [contractOpen, setContractOpen] = useState(false);

  return (
    <form
      className="rounded-2xl border border-line bg-white p-4 shadow-sm sm:p-5"
      noValidate
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit();
      }}
    >
      <h2 className="text-lg font-semibold text-ink">I tuoi dati</h2>
      <p className="mt-1 text-sm leading-6 text-muted">
        La stima usa solo le informazioni inserite qui. Il contratto indicato non modifica il risultato.
      </p>

      <div className="mt-4 space-y-3">
        <div>
          <label htmlFor="ral" className="text-sm font-medium text-ink">
            RAL annua (€)
          </label>
          <div className="relative">
            <span className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-sm text-muted">€</span>
            <input
              id="ral"
              name="ral"
              inputMode="decimal"
              autoComplete="off"
              value={values.ral}
              aria-invalid={Boolean(errors.ral)}
              aria-describedby={errors.ral ? "ral-error" : "ral-hint"}
              onChange={(event) => onChange({ ral: event.target.value })}
              className={`${fieldClass} pl-8`}
            />
          </div>
          <p id="ral-hint" className="mt-1.5 text-xs leading-5 text-muted">
            Importo tra 1 € e 5.000.000 €. Esempio iniziale: 30.000 €.
          </p>
          {errors.ral ? (
            <p id="ral-error" role="alert" className="mt-1 text-sm font-semibold text-[#9B1C1C]">
              {errors.ral}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor="regione" className="text-sm font-medium text-ink">
            Regione di residenza
          </label>
          <select
            id="regione"
            name="regione"
            value={values.regionId}
            aria-invalid={Boolean(errors.regionId)}
            onChange={(event) => onChange({ regionId: event.target.value })}
            className={fieldClass}
          >
            {REGIONS.map((region) => (
              <option key={region.id} value={region.id}>
                {region.name}
              </option>
            ))}
          </select>
          {errors.regionId ? (
            <p role="alert" className="mt-1 text-sm font-semibold text-[#9B1C1C]">
              {errors.regionId}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor="comune" className="text-sm font-medium text-ink">
            Comune di residenza — addizionale comunale
          </label>
          <input
            id="comune"
            name="comune"
            inputMode="decimal"
            autoComplete="off"
            placeholder="es. 0,8"
            value={values.municipalRate}
            aria-invalid={Boolean(errors.municipalRate)}
            aria-describedby={errors.municipalRate ? "comune-hint comune-error" : "comune-hint"}
            onChange={(event) => onChange({ municipalRate: event.target.value })}
            className={fieldClass}
          />
          <p id="comune-hint" className="mt-1.5 text-xs leading-5 text-muted">
            Non c’è un elenco comunale verificato. Se il campo resta vuoto, il calcolo usa una stima allo 0,5%. Un’aliquota inserita sostituisce la stima.
          </p>
          {errors.municipalRate ? (
            <p id="comune-error" role="alert" className="mt-1 text-sm font-semibold text-[#9B1C1C]">
              {errors.municipalRate}
            </p>
          ) : null}
        </div>

        <fieldset>
          <legend className="text-sm font-medium text-ink">Numero di mensilità</legend>
          <div className="mt-1.5 grid grid-cols-3 gap-2">
            {(["12", "13", "14"] as const).map((months) => {
              const selected = values.months === months;
              return (
                <label
                  key={months}
                  className={`cursor-pointer rounded-xl border px-3 py-2.5 text-center text-sm font-semibold ${
                    selected ? "border-forest bg-lime text-forest" : "border-line bg-white text-ink"
                  }`}
                >
                  <input
                    type="radio"
                    name="mensilita"
                    value={months}
                    checked={selected}
                    onChange={() => onChange({ months })}
                    className="sr-only"
                  />
                  {months}
                </label>
              );
            })}
          </div>
          {errors.months ? (
            <p role="alert" className="mt-1 text-sm font-semibold text-[#9B1C1C]">
              {errors.months}
            </p>
          ) : null}
        </fieldset>

        <div className="rounded-xl border border-line">
          <button
            type="button"
            className="flex w-full items-center justify-between gap-3 px-3 py-3 text-left text-sm font-medium text-ink"
            aria-expanded={contractOpen}
            aria-controls="contratto-settore"
            onClick={() => setContractOpen(!contractOpen)}
          >
            Contratto / settore
            <span aria-hidden="true" className="text-muted">
              {contractOpen ? "−" : "+"}
            </span>
          </button>
          {contractOpen ? (
            <div id="contratto-settore" className="space-y-2 border-t border-line px-3 py-3">
              <p className="rounded-xl border border-line bg-mint-soft px-3 py-2.5 text-sm text-ink">
                Dipendente privato — industria, commercio, artigianato
              </p>
              <p className="text-xs leading-5 text-muted">
                Voce informativa: questo è l’unico profilo calcolato, con aliquota a carico del 9,19%. Pubblico impiego, agricoltura, dirigenti e apprendisti non sono stimati e non cambiano il risultato.
              </p>
            </div>
          ) : null}
        </div>

        <div className="rounded-xl border border-line">
          <button
            type="button"
            className="flex w-full items-center justify-between gap-3 px-3 py-3 text-left text-sm font-medium text-ink"
            aria-expanded={familyOpen}
            aria-controls="situazione-familiare"
            onClick={() => onFamilyOpen(!familyOpen)}
          >
            Situazione familiare
            <span aria-hidden="true" className="text-muted">
              {familyOpen ? "−" : "+"}
            </span>
          </button>
          {familyOpen ? (
            <div id="situazione-familiare" className="space-y-4 border-t border-line px-3 py-3">
              <p className="text-xs leading-5 text-muted">
                Indica un familiare solo se è fiscalmente a carico: reddito complessivo fino a 2.840,51 €, oppure fino a 4.000 € per i figli di età non superiore a 24 anni. I figli sotto i 21 anni non rientrano nella detrazione IRPEF: per loro è previsto l’Assegno Unico, non calcolato qui.
              </p>
              <label className="flex items-start gap-2 text-sm text-ink">
                <input
                  type="checkbox"
                  className="mt-0.5"
                  checked={values.spouseDependent}
                  onChange={(event) => onChange({ spouseDependent: event.target.checked })}
                />
                Coniuge non separato, fiscalmente a carico
              </label>
              <div>
                <label htmlFor="figli" className="text-sm font-medium text-ink">
                  Figli a carico di almeno 21 anni
                </label>
                <input
                  id="figli"
                  inputMode="numeric"
                  value={values.children}
                  aria-invalid={Boolean(errors.children)}
                  aria-describedby="figli-hint"
                  onChange={(event) => onChange({ children: event.target.value })}
                  className={fieldClass}
                />
                <p id="figli-hint" className="mt-1.5 text-xs leading-5 text-muted">
                  Conta i figli di almeno 21 e meno di 30 anni, e i figli di almeno 30 anni con disabilità accertata ai sensi della legge 104/1992.
                </p>
                {errors.children ? (
                  <p role="alert" className="mt-1 text-sm font-semibold text-[#9B1C1C]">
                    {errors.children}
                  </p>
                ) : null}
              </div>
              {Number(values.children) > 0 ? (
                spouseLocksChildShare ? (
                  <p className="text-xs leading-5 text-muted">
                    Con il coniuge a carico, la detrazione per i figli è attribuita per intero a chi compila il calcolo.
                  </p>
                ) : (
                  <fieldset>
                    <legend className="text-sm font-medium text-ink">Quota della detrazione per i figli</legend>
                    <div className="mt-2 space-y-2 text-sm">
                      <label className="flex items-start gap-2">
                        <input
                          type="radio"
                          name="quota-figli"
                          value="50"
                          checked={values.childShare === "50"}
                          onChange={() => onChange({ childShare: "50" })}
                        />
                        50%, ripartizione ordinaria tra i genitori
                      </label>
                      <label className="flex items-start gap-2">
                        <input
                          type="radio"
                          name="quota-figli"
                          value="100"
                          checked={values.childShare === "100"}
                          onChange={() => onChange({ childShare: "100" })}
                        />
                        100%, unico genitore oppure accordo
                      </label>
                    </div>
                  </fieldset>
                )
              ) : null}
              <div>
                <label htmlFor="ascendenti" className="text-sm font-medium text-ink">
                  Ascendenti conviventi a carico
                </label>
                <input
                  id="ascendenti"
                  inputMode="numeric"
                  value={values.ascendants}
                  aria-invalid={Boolean(errors.ascendants)}
                  aria-describedby="ascendenti-hint"
                  onChange={(event) => onChange({ ascendants: event.target.value })}
                  className={fieldClass}
                />
                <p id="ascendenti-hint" className="mt-1.5 text-xs leading-5 text-muted">
                  La stima assegna l’intera detrazione a chi compila il calcolo, come se fosse l’unico soggetto che la richiede.
                </p>
                {errors.ascendants ? (
                  <p role="alert" className="mt-1 text-sm font-semibold text-[#9B1C1C]">
                    {errors.ascendants}
                  </p>
                ) : null}
              </div>
            </div>
          ) : null}
        </div>

        <label className="flex items-start gap-2 text-sm text-ink">
          <input
            type="checkbox"
            className="mt-0.5"
            checked={values.applyMassimale}
            onChange={(event) => onChange({ applyMassimale: event.target.checked })}
          />
          <span>
            Applica il massimale contributivo di 122.295 €
            <span className="mt-1 block text-xs leading-5 text-muted">
              Riguarda chi è iscritto alla previdenza obbligatoria dal 1° gennaio 1996, o chi ha optato per il sistema contributivo. Se non lo selezioni, i contributi sono calcolati sull’intera RAL.
            </span>
          </span>
        </label>
      </div>

      <button
        type="submit"
        className="mt-4 w-full rounded-full bg-forest px-4 py-3 text-base font-extrabold text-white shadow-[0_10px_22px_rgba(0,76,63,0.3)] transition duration-200 ease-out hover:-translate-y-0.5 hover:bg-forest-deep hover:shadow-[0_14px_28px_rgba(198,242,78,0.45)] hover:brightness-110 focus-visible:ring-2 focus-visible:ring-[#C6F24E] focus-visible:ring-offset-2 active:translate-y-0 active:scale-[0.98] active:shadow-[0_6px_14px_rgba(0,76,63,0.25)]"
      >
        Calcola il netto
      </button>
      <button
        type="button"
        onClick={onReset}
        className="mt-3 w-full text-sm font-medium text-forest underline-offset-2 hover:underline"
      >
        Reimposta i dati
      </button>
    </form>
  );
}
