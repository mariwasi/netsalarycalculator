import { formatEuro } from "@/lib/salary/format";
import type { SalaryResult } from "@/lib/salary/types";

export type ComparisonCard = {
  ral: number;
  result: SalaryResult | null;
};

type SalaryComparisonProps = {
  cards: ComparisonCard[];
  activeRal: number | null;
  onSelect: (ral: number) => void;
};

export function SalaryComparison({ cards, activeRal, onSelect }: SalaryComparisonProps) {
  return (
    <section id="confronto" className="scroll-mt-24 px-4 py-4 sm:px-6">
      <div className="mx-auto w-full max-w-6xl rounded-[28px] bg-mint px-4 py-9 sm:px-8">
        <h2 className="text-center text-[1.7rem] font-semibold tracking-tight text-ink">Quanto resta davvero in busta paga?</h2>
        <p className="mx-auto mt-2.5 max-w-xl text-center text-[15.5px] leading-6 text-muted">
          Tre esempi prodotti dallo stesso calcolo, con regione, mensilità, famiglia e massimale impostati nel modulo. Seleziona una scheda per riportare quella RAL nel calcolatore.
        </p>
        <div className="mt-8 grid gap-4 pt-2 md:grid-cols-3">
          {cards.map((card) => {
            const featured = card.ral === 30000;
            const selected = activeRal === card.ral;
            return (
              <button
                key={card.ral}
                type="button"
                aria-pressed={selected}
                onClick={() => onSelect(card.ral)}
                className={`relative rounded-[18px] bg-white p-5 text-left shadow-[0_8px_24px_rgba(0,76,63,0.06)] ${
                  featured ? "group border-2 border-forest shadow-[0_12px_28px_rgba(0,76,63,0.14)]" : "border border-line"
                }`}
              >
                {featured ? (
                  <span className="absolute -top-3 left-4 rounded-full bg-lime px-3 py-1 text-xs font-black text-forest transition duration-200 ease-out group-hover:-translate-y-0.5 group-hover:shadow-[0_14px_28px_rgba(198,242,78,0.45)] group-focus-visible:ring-2 group-focus-visible:ring-[#C6F24E] group-focus-visible:ring-offset-2 group-active:translate-y-0 group-active:scale-[0.98] group-active:shadow-[0_6px_14px_rgba(0,76,63,0.25)]">
                    Confronta ora
                  </span>
                ) : null}
                <span className="text-[15px] font-bold text-ink">RAL {formatEuro(card.ral)}</span>
                {card.result ? (
                  <>
                    <span className="mt-2.5 block text-[1.95rem] leading-none font-black tracking-tight text-forest">
                      {formatEuro(card.result.netMonthly)}
                    </span>
                    <span className="mt-1.5 block text-sm text-muted">
                      netto al mese · {card.result.months} mensilità
                    </span>
                    <span className="mt-3 block text-sm font-extrabold text-forest-deep">
                      {formatEuro(card.result.netAnnual)} netti l’anno · {card.result.regionName}
                    </span>
                  </>
                ) : (
                  <>
                    <span className="mt-3 block text-sm font-medium text-ink">Netto non disponibile</span>
                    <span className="mt-1 block text-xs leading-5 text-muted">
                      Correggi i dati del calcolatore per ottenere una stima con questa RAL.
                    </span>
                  </>
                )}
              </button>
            );
          })}
        </div>
        <p className="mt-5 text-center text-[13px] text-muted">
          <a href="#calcolatore" className="font-bold text-forest-deep">
            Apri il calcolatore
          </a>{" "}
          per cambiare regione, mensilità o aliquota comunale. Le cifre delle schede usano quelle stesse impostazioni.
        </p>
      </div>
    </section>
  );
}
