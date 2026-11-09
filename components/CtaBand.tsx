export function CtaBand() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-4 sm:px-6">
      <div className="rounded-[20px] bg-gradient-to-br from-[#004C3F] to-[#0A5A46] px-6 py-7 text-center text-white sm:px-8">
        <p className="text-[1.3rem] font-semibold">Hai la tua RAL? Scopri il tuo netto in un minuto.</p>
        <p className="mt-2 text-[#D7EDE3]">Inserisci RAL, Regione e mensilità: il calcolatore fa il resto, voce per voce.</p>
        <a
          href="#calcolatore"
          className="mt-4 inline-block rounded-full bg-[#C6F24E] px-6 py-3.5 font-extrabold text-[#004C3F] transition duration-200 ease-out hover:-translate-y-0.5 hover:bg-[#D9F99D] hover:shadow-[0_14px_28px_rgba(198,242,78,0.45)] focus-visible:ring-2 focus-visible:ring-[#C6F24E] focus-visible:ring-offset-2 active:translate-y-0 active:scale-[0.98] active:shadow-[0_6px_14px_rgba(0,76,63,0.25)]"
        >
          Calcola il tuo stipendio netto →
        </a>
      </div>
    </section>
  );
}
