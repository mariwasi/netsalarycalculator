const sections = [
  { href: "#che-cos-e", label: "Che cos’è lo stipendio netto?" },
  { href: "#come-si-calcola", label: "Come si calcola lo stipendio netto dalla RAL?" },
  { href: "#differenza-ral-netto", label: "Qual è la differenza tra RAL e stipendio netto?" },
  { href: "#tasse-contributi", label: "Quali tasse e contributi incidono sulla busta paga?" },
  { href: "#esempio-30000", label: "Esempio completo: quanto è il netto di 30.000 euro lordi?" },
  { href: "#come-utilizzare", label: "Come utilizzare il calcolatore dello stipendio netto?" },
  { href: "#affidabilita", label: "Quanto sono affidabili i risultati del calcolatore?" },
];

const heading = "mt-9 border-l-4 border-forest-deep pl-3.5 text-[1.4rem] font-semibold tracking-tight first:mt-0";

export function HomepageArticle() {
  return (
    <section className="bg-white" aria-labelledby="che-cos-e">
      <div className="mx-auto w-full max-w-[840px] px-4 py-8 sm:px-6">
        <p className="text-sm font-semibold tracking-wide text-forest uppercase">Guida rapida</p>
        <nav aria-label="In questa pagina" className="mt-4 rounded-2xl border border-line bg-mint-soft px-6 py-5">
          <p className="text-xs font-bold tracking-wider text-forest uppercase">In questa pagina</p>
          <ul className="mt-2.5 columns-1 gap-6 sm:columns-2">
            {sections.map((section) => (
              <li key={section.href} className="mb-1.5 break-inside-avoid">
                <a href={section.href} className="text-sm text-ink hover:text-forest-deep hover:underline">
                  {section.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-5 rounded-[20px] border border-line bg-white px-5 py-8 text-[15px] leading-7 text-ink shadow-[0_8px_28px_rgba(0,76,63,0.05)] sm:px-10">
          <h2 className="text-[1.75rem] leading-snug font-bold tracking-tight">
            Calcolo stipendio netto 2026: da lordo a netto in un minuto
          </h2>
          <article>
            <h2 id="che-cos-e" className={heading}>Che cos’è lo stipendio netto?</h2>
            <p className="mt-2">
              Lo stipendio netto è la somma che resta dopo i contributi previdenziali a carico del lavoratore e le imposte trattenute dal datore di lavoro. Non coincide con la RAL e, in una busta paga vera, può cambiare da un mese all’altro per premi, assenze, benefit o conguagli.
            </p>
            <p className="mt-2">
              Questa guida spiega lo stipendio lordo netto: quanto del lordo diventa netto e perché.
            </p>
            <p className="mt-2">
              Questo sito stima un anno intero di lavoro dipendente privato e poi lo divide per il numero di mensilità scelto. È un ordine di grandezza, utile per confrontare una RAL, non un cedolino.
            </p>
          </article>

          <article>
            <h2 id="come-si-calcola" className={heading}>Come si calcola lo stipendio netto dalla RAL?</h2>
            <p className="mt-2">Il percorso seguito dal calcolatore è questo:</p>
            <ol className="mt-2 list-decimal space-y-1 pl-5">
              <li>si parte dalla RAL;</li>
              <li>si tolgono i contributi INPS a carico del lavoratore;</li>
              <li>sull’imponibile si calcola l’IRPEF lorda 2026;</li>
              <li>si sottraggono le detrazioni previste dal modello, senza scendere sotto zero;</li>
              <li>se l’IRPEF resta dovuta, si stimano le addizionali;</li>
              <li>si aggiunge il trattamento integrativo, solo se spetta.</li>
            </ol>
          </article>

          <article>
            <h2 id="differenza-ral-netto" className={heading}>Qual è la differenza tra RAL e stipendio netto?</h2>
            <p className="mt-2">
              La RAL è il lordo annuo concordato, di solito già comprensivo di tredicesima e, quando prevista, di quattordicesima. Il netto è ciò che resta dopo prelievi e, in alcuni casi, dopo somme che non concorrono al reddito.
            </p>
            <p className="mt-2">
              Due persone con la stessa RAL possono avere netti diversi: cambiano la regione, l’aliquota comunale, il numero di mensilità (meno mensilità, più alta la retribuzione mensile: sopra 4.685 € al mese scatta il contributo aggiuntivo dell&apos;1%), i familiari a carico e il massimale contributivo.
            </p>
          </article>

          <article>
            <h2 id="tasse-contributi" className={heading}>Quali tasse e contributi incidono sulla busta paga?</h2>
            <p className="mt-2">Nel modello entrano solo queste voci, con le regole verificate per il 2026:</p>
            <div className="mt-3 overflow-hidden rounded-xl border border-line">
              <table className="w-full text-sm">
                <caption className="sr-only">Regole fiscali e contributive usate dal calcolatore</caption>
                <thead className="bg-mint-soft text-left">
                  <tr>
                    <th scope="col" className="px-3 py-2 font-medium">Voce</th>
                    <th scope="col" className="px-3 py-2 font-medium">Regola usata</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-line">
                    <th scope="row" className="px-3 py-2 text-left font-medium">INPS dipendente</th>
                    <td className="px-3 py-2">9,19%, più 1% oltre 4.685 € a mensilità. Massimale di 122.295 € solo se selezionato.</td>
                  </tr>
                  <tr className="border-t border-line">
                    <th scope="row" className="px-3 py-2 text-left font-medium">IRPEF</th>
                    <td className="px-3 py-2">23% fino a 28.000 €, 33% fino a 50.000 €, 43% oltre.</td>
                  </tr>
                  <tr className="border-t border-line">
                    <th scope="row" className="px-3 py-2 text-left font-medium">Detrazione da lavoro</th>
                    <td className="px-3 py-2">Articolo 13 del TUIR, con l’aumento di 65 € tra 25.000 e 35.000 €.</td>
                  </tr>
                  <tr className="border-t border-line">
                    <th scope="row" className="px-3 py-2 text-left font-medium">Taglio del cuneo</th>
                    <td className="px-3 py-2">Somma non imponibile fino a 20.000 €; ulteriore detrazione fino a 40.000 €.</td>
                  </tr>
                  <tr className="border-t border-line">
                    <th scope="row" className="px-3 py-2 text-left font-medium">Addizionali</th>
                    <td className="px-3 py-2">Regionale secondo le aliquote 2026 pubblicate. Comunale: campo vuoto = stima allo 0,5%; un’aliquota inserita sostituisce la stima.</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-3">
              Non sono nel conto il TFR, i premi di risultato, i buoni pasto, l’Assegno Unico e le detrazioni per spese sanitarie, mutui o ristrutturazioni.
            </p>
          </article>

          <article>
            <h2 id="esempio-30000" className={heading}>Esempio completo: quanto è il netto di 30.000 euro lordi?</h2>
            <p className="mt-2">
              Prendiamo il caso più comune: RAL di 30.000 euro, residenza in Lombardia, 13 mensilità, contratto a tempo indeterminato, nessun familiare a carico.
            </p>
            <div className="mt-3 overflow-hidden rounded-xl border border-line">
              <table className="w-full text-sm">
                <caption className="sr-only">Esempio di calcolo dello stipendio netto con RAL di 30.000 euro</caption>
                <thead className="bg-mint-soft text-left">
                  <tr>
                    <th scope="col" className="px-3 py-2 font-medium">Voce</th>
                    <th scope="col" className="px-3 py-2 font-medium">Importo annuo</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-line">
                    <th scope="row" className="px-3 py-2 text-left font-medium">Retribuzione annua lorda (RAL)</th>
                    <td className="px-3 py-2">30.000,00 €</td>
                  </tr>
                  <tr className="border-t border-line">
                    <th scope="row" className="px-3 py-2 text-left font-medium">Contributi INPS (9,19%)</th>
                    <td className="px-3 py-2">− 2.757,00 €</td>
                  </tr>
                  <tr className="border-t border-line">
                    <th scope="row" className="px-3 py-2 text-left font-medium">Reddito imponibile</th>
                    <td className="px-3 py-2">27.243,00 €</td>
                  </tr>
                  <tr className="border-t border-line">
                    <th scope="row" className="px-3 py-2 text-left font-medium">IRPEF lorda (23%)</th>
                    <td className="px-3 py-2">6.265,89 €</td>
                  </tr>
                  <tr className="border-t border-line">
                    <th scope="row" className="px-3 py-2 text-left font-medium">Detrazione lavoro dipendente</th>
                    <td className="px-3 py-2">− 2.044,29 €</td>
                  </tr>
                  <tr className="border-t border-line">
                    <th scope="row" className="px-3 py-2 text-left font-medium">Detrazione cuneo fiscale</th>
                    <td className="px-3 py-2">− 1.000,00 €</td>
                  </tr>
                  <tr className="border-t border-line">
                    <th scope="row" className="px-3 py-2 text-left font-medium">IRPEF netta</th>
                    <td className="px-3 py-2">3.221,60 €</td>
                  </tr>
                  <tr className="border-t border-line">
                    <th scope="row" className="px-3 py-2 text-left font-medium">Addizionale regionale Lombardia (1,23%)</th>
                    <td className="px-3 py-2">− 335,09 €</td>
                  </tr>
                  <tr className="border-t border-line">
                    <th scope="row" className="px-3 py-2 text-left font-medium">Addizionale comunale (stima 0,5%)</th>
                    <td className="px-3 py-2">− 136,21 €</td>
                  </tr>
                  <tr className="border-t border-line">
                    <th scope="row" className="px-3 py-2 text-left font-medium">Bonus trattamento integrativo</th>
                    <td className="px-3 py-2">+ 1.200,00 €</td>
                  </tr>
                  <tr className="border-t border-line">
                    <th scope="row" className="px-3 py-2 text-left font-bold">Stipendio netto annuo</th>
                    <td className="px-3 py-2 font-bold">24.750,10 €</td>
                  </tr>
                  <tr className="border-t border-line">
                    <th scope="row" className="px-3 py-2 text-left font-bold">Stipendio netto mensile (13 mensilità)</th>
                    <td className="px-3 py-2 font-bold">1.903,85 €</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-3">
              Il calcolo dello stipendio netto mensile è immediato: dividi il netto annuo per il numero di mensilità del tuo contratto (24.750,10 € ÷ 13 = 1.903,85 €).
            </p>
            <p className="mt-2">
              Nota come il netto finale, pari all’82,5% del lordo, sia molto più alto di quanto suggerirebbe la sola aliquota del 23%: detrazioni e bonus valgono insieme oltre 4.200 euro l’anno.
            </p>
            <h3 className="mt-6 text-lg font-semibold tracking-tight">Tabella lordo netto: netto mensile per diverse RAL (Lombardia, 13 mensilità)</h3>
            <div className="mt-3 overflow-hidden rounded-xl border border-line">
              <table className="w-full text-sm">
                <caption className="sr-only">Netto mensile per diverse RAL in Lombardia con 13 mensilità</caption>
                <thead className="bg-mint-soft text-left">
                  <tr>
                    <th scope="col" className="px-3 py-2 font-medium">RAL</th>
                    <th scope="col" className="px-3 py-2 font-medium">Stipendio netto mensile</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-line">
                    <th scope="row" className="px-3 py-2 text-left font-medium">20.000 €</th>
                    <td className="px-3 py-2">1.360,08 €</td>
                  </tr>
                  <tr className="border-t border-line">
                    <th scope="row" className="px-3 py-2 text-left font-medium">25.000 €</th>
                    <td className="px-3 py-2">1.667,93 €</td>
                  </tr>
                  <tr className="border-t border-line">
                    <th scope="row" className="px-3 py-2 text-left font-medium">30.000 €</th>
                    <td className="px-3 py-2">1.903,85 €</td>
                  </tr>
                  <tr className="border-t border-line">
                    <th scope="row" className="px-3 py-2 text-left font-medium">40.000 €</th>
                    <td className="px-3 py-2">2.165,81 €</td>
                  </tr>
                  <tr className="border-t border-line">
                    <th scope="row" className="px-3 py-2 text-left font-medium">50.000 €</th>
                    <td className="px-3 py-2">2.548,14 €</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-3">
              Per il calcolo stipendio netto mensile di altre RAL, le pagine dedicate (RAL 25.000, RAL 35.000, RAL 40.000, RAL 50.000) sono in preparazione. Nella{" "}
              <a href="/come-si-calcola-stipendio-netto/" className="text-forest-deep underline underline-offset-2 hover:text-forest">
                guida completa al calcolo
              </a>{" "}
              trovi invece tutti i passaggi spiegati con ulteriori esempi.
            </p>
          </article>

          <article>
            <h2 id="come-utilizzare" className={heading}>Come utilizzare il calcolatore dello stipendio netto?</h2>
            <p className="mt-2">
              Per calcolare lo stipendio netto mensile, inserisci la RAL, scegli la regione e il numero di mensilità, poi avvia il calcolo. Se il campo dell’aliquota comunale resta vuoto, il calcolo usa una stima allo 0,5%, indicata come stima; un’aliquota inserita sostituisce la stima. La situazione familiare, se non ti riguarda, può restare vuota. Il massimale contributivo va selezionato solo se la tua posizione previdenziale lo prevede.
            </p>
            <p className="mt-2">
              Calcola stipendio netto in un minuto: inserisci la RAL, scegli regione e mensilità, e il risultato è pronto.
            </p>
            <p className="mt-2">
              Puoi calcolare stipendio netto mensile anche per un secondo lavoro o un’offerta: cambia la RAL e confronta i due netti.
            </p>
            <p className="mt-2">
              Le tre schede di confronto usano le stesse impostazioni e cambiano soltanto la RAL. I dati restano nel browser e non vengono inviati a un server.
            </p>
          </article>

          <article>
            <h2 id="affidabilita" className={heading}>Quanto sono affidabili i risultati del calcolatore?</h2>
            <p className="mt-2">
              Le aliquote IRPEF, la detrazione da lavoro dipendente, il taglio del cuneo, il contributo del 9,19% e le soglie INPS 2026 sono ancorate a fonti pubbliche. Le addizionali regionali usano le aliquote pubblicate dal Dipartimento delle Finanze a gennaio 2026.
            </p>
            <p className="mt-2">
              Restano fuori, e vanno considerati limiti veri, i comuni, le detrazioni regionali soggettive, gli altri redditi, il conguaglio delle addizionali sull’anno precedente e la riduzione di 440 € di alcune detrazioni per oneri sopra 200.000 €. Per una decisione su un contratto o su una dichiarazione dei redditi serve il cedolino o un professionista.
            </p>
            <p className="mt-3 text-sm leading-6 text-muted">
              Riferimenti usati: Agenzia delle Entrate, aliquote IRPEF aggiornate al 13 gennaio 2026; legge 30 dicembre 2025, n. 199; legge 30 dicembre 2024, n. 207; circolare INPS 30 gennaio 2026, n. 6; articoli 12 e 13 del TUIR; portale del Dipartimento delle Finanze per le addizionali regionali 2026.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
