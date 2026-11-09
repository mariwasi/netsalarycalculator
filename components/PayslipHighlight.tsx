import Link from "next/link";

/** Approved monthly payslip example from the design spec. Not the annual calculator. */
const ROWS = [
  { label: "Lordo mensile", value: "2.307,69 €" },
  { label: "INPS (9,19%)", value: "− 212,08 €", tone: "neg" as const },
  { label: "IRPEF", value: "− 247,82 €", tone: "neg" as const },
  { label: "Addizionali", value: "− 36,25 €", tone: "neg" as const },
  { label: "Bonus", value: "+ 92,31 €", tone: "pos" as const },
];

export function PayslipHighlight() {
  return (
    <section className="mx-auto grid w-full max-w-6xl items-center gap-8 px-4 py-8 sm:px-6 lg:grid-cols-2">
      <div className="rounded-[20px] border border-line bg-white px-6 py-6 shadow-[0_14px_34px_rgba(0,76,63,0.12)]">
        <div className="mb-3.5 flex justify-between text-[15px]">
          <b>Busta paga</b>
          <span className="text-muted">Marzo 2026</span>
        </div>
        {ROWS.map((row) => (
          <p key={row.label} className="flex justify-between border-b border-line py-2 text-[15px]">
            <span>{row.label}</span>
            <span className={row.tone === "neg" ? "text-[#B91C1C]" : row.tone === "pos" ? "font-bold text-forest-deep" : ""}>
              {row.value}
            </span>
          </p>
        ))}
        <p className="flex justify-between pt-3.5 text-lg font-black text-forest">
          <span>Netto in busta</span>
          <span>1.903,85 €</span>
        </p>
        <svg viewBox="0 0 260 60" className="mt-3.5 h-[60px] w-full" aria-hidden="true">
          <polyline
            points="0,50 40,44 80,46 120,34 160,28 200,16 260,6"
            fill="none"
            stroke="#004C3F"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
      </div>
      <div>
        <h2 className="text-[1.85rem] leading-tight font-semibold tracking-tight text-ink">
          Capisci la tua busta paga in 5 minuti
        </h2>
        <p className="mt-3 text-base leading-relaxed text-muted">
          Ogni voce del cedolino spiegata in parole semplici: cosa sono INPS, IRPEF e addizionali, perché il netto cambia da un mese all’altro e come controllare che non ci siano errori — con la checklist da cinque minuti.
        </p>
        <Link
          href="/come-leggere-la-busta-paga"
          className="mt-5 inline-block rounded-full bg-forest px-6 py-3.5 font-extrabold text-white shadow-[0_10px_22px_rgba(0,76,63,0.3)] transition duration-200 ease-out hover:-translate-y-0.5 hover:bg-forest-deep hover:shadow-[0_14px_28px_rgba(198,242,78,0.45)] focus-visible:ring-2 focus-visible:ring-[#C6F24E] focus-visible:ring-offset-2 active:translate-y-0 active:scale-[0.98] active:shadow-[0_6px_14px_rgba(0,76,63,0.25)]"
        >
          Leggi la guida →
        </Link>
      </div>
    </section>
  );
}
