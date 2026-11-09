import { formatEuro, formatPercent } from "@/lib/salary/format";
import type { SalaryResult as SalaryEstimate } from "@/lib/salary/types";

type SalaryResultProps = {
  result: SalaryEstimate | null;
  message: string | null;
};

export function SalaryResult({ result, message }: SalaryResultProps) {
  return (
    <section
      id="risultato"
      tabIndex={-1}
      aria-live="polite"
      className="scroll-mt-24 rounded-2xl border border-line bg-white p-5 shadow-sm sm:p-6"
    >
      <h2 className="text-lg font-semibold text-ink">La tua stima</h2>
      {result ? <ResultBody result={result} /> : <EmptyResult message={message} />}
    </section>
  );
}

function EmptyResult({ message }: { message: string | null }) {
  return (
    <p className="mt-4 text-sm leading-6 text-muted">
      {message ?? "Inserisci una RAL valida per aggiornare la stima."}
    </p>
  );
}

function ResultBody({ result }: { result: SalaryEstimate }) {
  const total = result.netAnnual + result.withholdings;
  const netShare = total > 0 ? (result.netAnnual / total) * 100 : 0;
  const deductionShare = total > 0 ? (result.withholdings / total) * 100 : 0;
  const summary = `Su base annua la stima è di ${formatEuro(result.netAnnual)} netti e ${formatEuro(result.withholdings)} di trattenute. Il netto è circa il ${formatPercent(netShare, 1)} della somma tra netto e trattenute; le trattenute sono circa il ${formatPercent(deductionShare, 1)}.`;

  return (
    <>
      <p className="mt-4 text-sm text-muted">Stipendio netto mensile stimato</p>
      <p className="mt-2 text-4xl font-black tracking-tight text-forest sm:text-5xl">
        {formatEuro(result.netMonthly)}
      </p>
      <p className="mt-2 text-sm text-muted">
        su {result.months} mensilità, da una mensilità lorda di {formatEuro(result.grossMonthly)}
      </p>

      <dl className="mt-5 divide-y divide-line border-y border-line">
        <Row label="Stipendio netto annuo stimato" value={formatEuro(result.netAnnual)} />
        <Row label="RAL inserita" value={formatEuro(result.ral)} />
        <Row label="Trattenute mensili stimate" value={formatEuro(result.deductionsMonthly)} />
        <Row label="IRPEF netta annua" value={formatEuro(result.irpefNet)} />
        <Row
          label={result.inpsExtraBase > 0 ? "Contributi INPS, incluso l’1% aggiuntivo" : "Contributi INPS annui"}
          value={formatEuro(result.inps)}
        />
        <Row label="Addizionale regionale" value={formatEuro(result.regionalTax)} />
        <Row
          label={result.municipalEstimated ? "Addizionale comunale (stima 0,5%)" : "Addizionale comunale"}
          value={result.municipalTax === null ? "Non inclusa" : formatEuro(result.municipalTax)}
        />
        <Row label="Maggiorazione di 65 €" value={formatEuro(result.cuneo65)} />
        <Row label="Bonus trattamento integrativo" value={formatEuro(result.trattamentoIntegrativo)} />
      </dl>

      <div className="mt-5">
        <div
          className="flex h-3 overflow-hidden rounded-full bg-mint"
          role="img"
          aria-label={summary}
        >
          <span className="h-full bg-lime" style={{ width: `${netShare}%` }} />
          <span className="h-full bg-forest" style={{ width: `${deductionShare}%` }} />
        </div>
        <div className="mt-2 flex justify-between text-xs text-muted">
          <span>Netto {formatPercent(netShare, 0)}</span>
          <span>Trattenute {formatPercent(deductionShare, 0)}</span>
        </div>
        <p className="mt-2 text-xs leading-5 text-muted">{summary}</p>
      </div>

      {result.regionalNote ? <p className="mt-3 text-xs leading-5 text-muted">{result.regionalNote}</p> : null}

      <p className="mt-4 text-xs leading-5 text-muted">
        Il risultato è una stima indicativa e non sostituisce una busta paga reale o una consulenza fiscale.
      </p>
      <a href="#dettaglio" className="mt-3 inline-block text-sm font-medium text-forest underline-offset-2 hover:underline">
        Vedi il passaggio dal lordo al netto
      </a>
    </>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4 py-2.5">
      <dt className="text-sm text-muted">{label}</dt>
      <dd className="text-right text-sm font-semibold text-ink">{value}</dd>
    </div>
  );
}
