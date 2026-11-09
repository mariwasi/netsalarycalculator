const steps = [
  {
    title: "Inserisci la tua RAL.",
    text: "Parti dalla retribuzione annua lorda, comprensiva delle mensilità aggiuntive previste dal contratto.",
  },
  {
    title: "Seleziona le informazioni necessarie.",
    text: "Regione, numero di mensilità e, se ti riguardano, aliquota comunale, famiglia e massimale contributivo.",
  },
  {
    title: "Consulta la stima dello stipendio netto.",
    text: "Leggi il netto mensile e annuo insieme con INPS, IRPEF e addizionali calcolate sugli stessi dati.",
  },
];

export function HowItWorks() {
  return (
    <section id="come-funziona" className="scroll-mt-24 bg-white">
      <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 md:py-14">
        <h2 className="text-2xl font-semibold tracking-tight text-ink">Come funziona il calcolo</h2>
        <ol className="mt-6 grid list-none gap-4 md:grid-cols-3">
          {steps.map((step, index) => (
            <li key={step.title} className="rounded-2xl border border-line bg-mint-soft p-4">
              <span className="flex h-8 min-w-8 items-center justify-center rounded-full bg-gradient-to-r from-[#004C3F] from-70% via-[#2FA36B] via-85% to-[#C6F24E] px-2 text-sm font-semibold text-white">
                {index + 1}.
              </span>
              <h3 className="mt-3 text-base font-semibold text-ink">{step.title}</h3>
              <p className="mt-1 text-sm leading-6 text-muted">{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
