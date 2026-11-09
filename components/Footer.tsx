import Link from "next/link";

const futurePages = [
  "Contributi INPS",
  "Addizionali locali",
  "Detrazioni in busta paga",
  "Mensilità e contratto",
];

export function Footer() {
  return (
    <footer className="bg-forest text-mint-soft">
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-3">
        <div>
          <p className="flex items-center gap-3 text-lg font-semibold text-white">
            <img src="/logo-footer.svg" alt="StipendioNetto" width={48} height={48} className="h-12 w-12 rounded-full" />
            StipendioNetto
          </p>
          <p className="mt-2 text-sm leading-6">
            Una stima dello stipendio netto a partire dalla RAL. Il risultato è indicativo e non sostituisce una busta paga o una consulenza fiscale.
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold text-white">In questa pagina</p>
          <ul className="mt-2 space-y-2 text-sm">
            <li>
              <a href="#inizio" className="transition duration-200 hover:text-white hover:underline hover:decoration-white hover:decoration-2 hover:underline-offset-2">
                Homepage
              </a>
            </li>
            <li>
              <a href="#calcolatore" className="transition duration-200 hover:text-white hover:underline hover:decoration-white hover:decoration-2 hover:underline-offset-2">
                Calcolatore
              </a>
            </li>
            <li>
              <a href="#confronto" className="transition duration-200 hover:text-white hover:underline hover:decoration-white hover:decoration-2 hover:underline-offset-2">
                Confronto RAL
              </a>
            </li>
            <li>
              <a href="#domande" className="transition duration-200 hover:text-white hover:underline hover:decoration-white hover:decoration-2 hover:underline-offset-2">
                Domande frequenti
              </a>
            </li>
            <li>
              <Link href="/come-si-calcola-stipendio-netto" className="transition duration-200 hover:text-white hover:underline hover:decoration-white hover:decoration-2 hover:underline-offset-2">
                Come si calcola lo stipendio netto
              </Link>
            </li>
            <li>
              <Link href="/busta-paga" className="transition duration-200 hover:text-white hover:underline hover:decoration-white hover:decoration-2 hover:underline-offset-2">
                Busta paga
              </Link>
            </li>
            <li>
              <Link href="/calcolo-ral" className="transition duration-200 hover:text-white hover:underline hover:decoration-white hover:decoration-2 hover:underline-offset-2">
                Calcolo RAL
              </Link>
            </li>
            <li>
              <Link href="/scaglioni-irpef-2026" className="transition duration-200 hover:text-white hover:underline hover:decoration-white hover:decoration-2 hover:underline-offset-2">
                Scaglioni IRPEF 2026
              </Link>
            </li>
            <li>
              <Link href="/metodologia" className="transition duration-200 hover:text-white hover:underline hover:decoration-white hover:decoration-2 hover:underline-offset-2">
                Metodologia
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold text-white">Pagine in preparazione</p>
          <ul className="mt-2 space-y-2 text-sm">
            {futurePages.map((page) => (
              <li key={page} className="flex items-center justify-between gap-3">
                <span>{page}</span>
                <span className="rounded-full bg-white/10 px-2 py-0.5 text-[11px] font-semibold tracking-wide text-lime uppercase">
                  Presto
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-white/15">
        <p className="mx-auto w-full max-w-6xl px-4 py-4 text-xs leading-5 sm:px-6">
          I dati del calcolatore restano nel browser e non vengono inviati a un server. Non sono indicate sedi, recapiti o informazioni societarie perché non fanno parte di questo progetto.
        </p>
      </div>
    </footer>
  );
}
