import { formatEuro } from "@/lib/salary/format";
import type { SalaryResult } from "@/lib/salary/types";

type SalaryBreakdownProps = {
  result: SalaryResult | null;
};

export function SalaryBreakdown({ result }: SalaryBreakdownProps) {
  return (
    <section id="dettaglio" className="scroll-mt-24 bg-mint-soft">
      <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 md:py-14">
        <h2 className="text-2xl font-semibold tracking-tight text-ink">Come la RAL diventa stipendio netto</h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-ink">
          Gli importi arrivano dal calcolo attivo. Una voce con il segno meno riduce il netto; una voce con il segno più lo aumenta.
        </p>
        {result ? <BreakdownTable result={result} /> : (
          <p className="mt-6 text-sm text-ink">La tabella si aggiorna quando i dati del calcolatore sono validi.</p>
        )}
      </div>
    </section>
  );
}

function BreakdownTable({ result }: { result: SalaryResult }) {
  const rows = [
    { label: "Retribuzione annua lorda (RAL)", amount: formatEuro(result.ral), hint: "Punto di partenza" },
    {
      label: "Contributi previdenziali a carico del lavoratore",
      amount: `− ${formatEuro(result.inps)}`,
      hint: result.inpsExtraBase > 0
        ? `9,19% su ${formatEuro(result.inpsOrdinaryBase)}, più 1% su ${formatEuro(result.inpsExtraBase)}`
        : `9,19% su ${formatEuro(result.inpsOrdinaryBase)}`,
    },
    { label: "Imponibile usato per l’IRPEF", amount: formatEuro(result.taxableIncome), hint: "RAL meno i contributi" },
    { label: "IRPEF lorda", amount: formatEuro(result.irpefGross), hint: "Aliquote 23%, 33% e 43%" },
    { label: "Detrazione per lavoro dipendente", amount: `− ${formatEuro(result.employmentDeduction)}`, hint: "Articolo 13 del TUIR, senza la maggiorazione di 65 €" },
    { label: "Maggiorazione di 65 €", amount: `− ${formatEuro(result.cuneo65)}`, hint: "Voce propria del cuneo, se l’imponibile è superiore a 25.000 € e non superiore a 35.000 €" },
    { label: "Detrazioni per familiari indicati", amount: `− ${formatEuro(result.familyDeduction)}`, hint: "Coniuge, figli ammessi e ascendenti, nei limiti del modello" },
    { label: "Ulteriore detrazione per il taglio del cuneo", amount: `− ${formatEuro(result.ulterioreDetrazione)}`, hint: "1.000 € tra 20.000 e 32.000 € di imponibile, poi in riduzione fino a 40.000 €" },
    { label: "IRPEF netta", amount: formatEuro(result.irpefNet), hint: "Imposta dopo le detrazioni, mai sotto zero" },
    { label: "Addizionale regionale", amount: formatEuro(result.regionalTax), hint: result.regionName },
    {
      label: result.municipalEstimated ? "Addizionale comunale (stima 0,5%)" : "Addizionale comunale",
      amount: result.municipalTax === null ? "Non inclusa" : formatEuro(result.municipalTax),
      hint: result.municipalEstimated
        ? "Stima allo 0,5% perché il campo aliquota è vuoto. Un valore inserito sostituisce la stima."
        : "Aliquota inserita sull’intero imponibile",
    },
    { label: "Bonus trattamento integrativo", amount: `+ ${formatEuro(result.trattamentoIntegrativo)}`, hint: "1.200 € solo se l’imponibile non supera 28.000 € e l’IRPEF lorda supera la detrazione per lavoro. Non può superare l’IRPEF netta." },
    { label: "Stipendio netto annuo stimato", amount: formatEuro(result.netAnnual), hint: "Risultato del modello" },
    { label: "Stipendio netto mensile stimato", amount: formatEuro(result.netMonthly), hint: `Netto annuo diviso per ${result.months}` },
  ];

  return (
    <>
      <table className="mt-6 w-full border-collapse text-sm">
        <caption className="sr-only">Scomposizione della stima dallo stipendio lordo al netto</caption>
        <thead>
          <tr className="border-b border-line text-left">
            <th scope="col" className="py-2 pr-3 font-medium text-muted">Voce</th>
            <th scope="col" className="py-2 text-right font-medium text-muted">Importo</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.label} className="border-b border-line align-top">
              <th scope="row" className="py-3 pr-3 text-left font-medium text-ink">
                {row.label}
                <span className="mt-0.5 block text-xs font-normal leading-5 text-muted">{row.hint}</span>
              </th>
              <td className="py-3 text-right font-semibold whitespace-nowrap text-ink">{row.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="mt-4 text-sm leading-6 text-ink">
        {formatEuro(result.ral)} − {formatEuro(result.inps)} − {formatEuro(result.irpefNet)} − {formatEuro(result.regionalTax)}
        {result.municipalTax === null ? "" : ` − ${formatEuro(result.municipalTax)}`} + {formatEuro(result.trattamentoIntegrativo)} = {formatEuro(result.netAnnual)}.
      </p>
      <ul className="mt-4 space-y-2 text-xs leading-5 text-muted">
        {result.assumptions.map((assumption) => (
          <li key={assumption}>{assumption}</li>
        ))}
      </ul>
    </>
  );
}
