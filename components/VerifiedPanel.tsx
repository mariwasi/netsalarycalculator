import Link from "next/link";
import { lombardiaAt } from "@/components/homeExample";
import { formatEuro } from "@/lib/salary/format";

export function VerifiedPanel() {
  const result = lombardiaAt(30000);
  const addizionali = result.regionalTax + (result.municipalTax ?? 0);

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-4 sm:px-6">
      <div className="grid items-center gap-8 rounded-[28px] bg-gradient-to-br from-[#004C3F] to-[#0A5A46] px-6 py-9 text-white sm:px-9 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <p className="mb-3.5 inline-block rounded-full bg-[#C6F24E] px-3 py-1.5 text-xs font-black tracking-wide text-[#004C3F]">
            ✓ VERIFICATO
          </p>
          <h2 className="text-[1.75rem] leading-tight font-semibold tracking-tight">Calcolo verificato, non inventato</h2>
          <p className="mt-3 text-base leading-relaxed text-[#D7EDE3]">
            Ogni formula di questa pagina risale a una fonte ufficiale e ogni esempio è ricalcolato a mano, fino al centesimo. Se un numero non torna con il TUIR, non lo pubblichiamo.
          </p>
          <ul className="mt-4 space-y-3 text-[15.5px] leading-snug">
            <li className="flex gap-2.5">
              <span className="font-black text-[#C6F24E]">✓</span>
              <span>
                <strong>Formule TUIR</strong> — art. 11 (scaglioni), art. 12 (familiari), art. 13 (lavoro dipendente)
              </span>
            </li>
            <li className="flex gap-2.5">
              <span className="font-black text-[#C6F24E]">✓</span>
              <span>
                <strong>Legge di Bilancio 2026</strong> — secondo scaglione 35% → 33% (Legge n. 199/2025)
              </span>
            </li>
            <li className="flex gap-2.5">
              <span className="font-black text-[#C6F24E]">✓</span>
              <span>
                <strong>Esempi ricalcolati a mano</strong> — {formatEuro(result.ral)} → {formatEuro(result.netAnnual)}, fino al centesimo
              </span>
            </li>
            <li className="flex gap-2.5">
              <span className="font-black text-[#C6F24E]">✓</span>
              <span>
                <strong>Fonti ufficiali</strong> — Normattiva, MEF, Agenzia delle Entrate, INPS
              </span>
            </li>
          </ul>
          <Link href="/metodologia" className="mt-4 inline-block font-extrabold text-[#C6F24E]">
            Leggi la metodologia →
          </Link>
        </div>
        <div className="rounded-[20px] bg-white px-6 py-5 text-ink shadow-[0_16px_34px_rgba(0,0,0,0.28)]">
          <p className="text-xs font-bold tracking-wide text-muted uppercase">
            Esempio verificato · RAL {formatEuro(result.ral)} · {result.regionName}
          </p>
          <div className="mt-3 divide-y divide-line text-[15px]">
            <Row label="Retribuzione lorda" value={formatEuro(result.ral)} />
            <Row label="INPS (9,19%)" value={`− ${formatEuro(result.inps)}`} tone="neg" />
            <Row label="IRPEF netta" value={`− ${formatEuro(result.irpefNet)}`} tone="neg" />
            <Row label="Addizionali" value={`− ${formatEuro(addizionali)}`} tone="neg" />
            <Row label="Bonus trattamento integrativo" value={`+ ${formatEuro(result.trattamentoIntegrativo)}`} tone="pos" />
          </div>
          <p className="flex justify-between pt-3.5 text-lg font-black text-forest">
            <span>Netto annuo</span>
            <span>{formatEuro(result.netAnnual)}</span>
          </p>
          <p className="mt-3 text-xs leading-5 text-muted">Dettaglio completo nella guida al calcolo e nella metodologia.</p>
        </div>
      </div>
    </section>
  );
}

function Row({ label, value, tone }: { label: string; value: string; tone?: "neg" | "pos" }) {
  const valueClass = tone === "neg" ? "text-[#B91C1C]" : tone === "pos" ? "font-bold text-forest-deep" : "";
  return (
    <p className="flex justify-between gap-4 py-2">
      <span>{label}</span>
      <span className={valueClass}>{value}</span>
    </p>
  );
}
