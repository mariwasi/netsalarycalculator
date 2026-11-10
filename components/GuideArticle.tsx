import type { ReactNode } from "react";
import Link from "next/link";

export const guideFaq = [
  {
    question: "Gli straordinari sono tassati più dello stipendio ordinario?",
    answer:
      "No, gli straordinari seguono le stesse regole: si sommano al reddito e sono tassati all'aliquota marginale del tuo scaglione. Sembrano \"tassati di più\" solo perché su di essi non si applicano ulteriori detrazioni: ma ogni euro resta comunque positivo, non esiste una soglia oltre la quale conviene rifiutarli.",
  },
  {
    question: "Il TFR è compreso nello stipendio netto?",
    answer:
      "No. Il TFR matura a parte (circa una mensilità l'anno, pari alla retribuzione annua diviso 13,5) e viene liquidato alla fine del rapporto di lavoro o anticipato solo in casi specifici. Non fa parte del netto mensile e non va sommato alla RAL quando si confrontano le offerte.",
  },
  {
    question: "Ho cambiato lavoro a metà anno: cosa succede alle tasse?",
    answer:
      "Ogni datore trattiene in modo autonomo, applicando scaglioni e detrazioni dall'inizio. A fine anno il conguaglio complessivo si fa con la dichiarazione dei redditi (o con il conguaglio dell'ultimo datore, se gli consegni la CU precedente): è normale ritrovarsi un debito se entrambi i datori hanno applicato per intero detrazioni e primo scaglione sul reddito parziale.",
  },
  {
    question: "Perché il netto di gennaio è più alto di quello di marzo?",
    answer:
      "Perché le addizionali regionali si pagano in 11 rate da gennaio e l'acconto dell'addizionale comunale parte da marzo, entrambe riferite all'anno precedente. A gennaio e febbraio manca ancora l'acconto comunale, quindi il netto risulta leggermente superiore.",
  },
  {
    question: "Posso calcolare il netto per la mia situazione specifica?",
    answer:
      "Sì: il calcolatore in homepage applica tutti i passaggi di questa guida alla tua RAL, regione, mensilità e familiari a carico. Per gli orari ridotti il netto non scala in proporzione alle ore: le detrazioni per lavoro dipendente e il cuneo fiscale restano intere, quindi dimezzare le ore fa scendere il netto meno della metà. Per i contratti collettivi, le pagine dedicate sono il CCNL Metalmeccanico e il CCNL Commercio.",
  },
] as const;

const toc = [
  ["come-si-calcola-lo-stipendio-netto-la-guida-completa-2026", "Come si calcola lo stipendio netto: la guida completa 2026"],
  ["punto-di-partenza-la-ral", "Punto di partenza: la RAL"],
  ["passaggio-1-i-contributi-inps", "Passaggio 1: i contributi INPS"],
  ["passaggio-2-il-reddito-imponibile-e-il-cuneo-fiscale", "Passaggio 2: il reddito imponibile e il cuneo fiscale"],
  ["passaggio-3-l-irpef-e-gli-scaglioni-2026", "Passaggio 3: l'IRPEF e gli scaglioni 2026"],
  ["passaggio-4-le-detrazioni-per-lavoro-dipendente", "Passaggio 4: le detrazioni per lavoro dipendente"],
  ["passaggio-5-le-detrazioni-per-familiari-a-carico", "Passaggio 5: le detrazioni per familiari a carico"],
  ["passaggio-6-il-bonus-trattamento-integrativo-ex-bonus-renzi", "Passaggio 6: il bonus trattamento integrativo (ex bonus Renzi)"],
  ["passaggio-7-le-addizionali-regionali-e-comunali", "Passaggio 7: le addizionali regionali e comunali"],
  ["esempio-1-ral-30-000-euro-lombardia-13-mensilita", "Esempio 1: RAL 30.000 euro, Lombardia, 13 mensilità"],
  ["esempio-2-ral-45-000-euro-piemonte-un-figlio-di-25-anni-a-carico", "Esempio 2: RAL 45.000 euro, Piemonte, un figlio di 25 anni a carico"],
  ["come-verificare-la-tua-busta-paga-voce-per-voce", "Come verificare la tua busta paga voce per voce"],
  ["il-conguaglio-di-fine-anno-perche-a-dicembre-il-netto-cambia", "Il conguaglio di fine anno: perché a dicembre il netto cambia"],
  ["detrazioni-e-deduzioni-non-sono-la-stessa-cosa", "Detrazioni e deduzioni: non sono la stessa cosa"],
  ["errori-comuni-e-falsi-miti", "Errori comuni e falsi miti"],
  ["fonti-e-riferimenti-normativi", "Fonti e riferimenti normativi"],
  ["domande-frequenti-sulla-guida", "Domande frequenti sulla guida"],
] as const;

const formula = "Stipendio netto = RAL − contributi INPS − IRPEF netta − addizionali regionali e comunali + bonus";

function H2({ id, children, first = false }: { id: string; children: string; first?: boolean }) {
  return (
    <h2
      id={id}
      className={`scroll-mt-24 border-l-4 border-[#004C3F] pl-3.5 text-[1.35rem] font-semibold tracking-tight text-[#16302A] ${first ? "mt-0" : "mt-9"}`}
    >
      {children}
    </h2>
  );
}

function H3({ children }: { children: string }) {
  return (
    <h3 className="mt-5 rounded-r-[10px] border-l-[3px] border-[#00695C] bg-[#F2FAF5] px-3 py-2 text-[1.05rem] font-semibold text-[#004C3F]">
      {children}
    </h3>
  );
}

function P({ children }: { children: ReactNode }) {
  return <p className="mb-3 text-base leading-relaxed text-[#334155]">{children}</p>;
}

function DataTable({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div className="my-4 overflow-x-auto">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={header} className="border-b border-[#D8E6DE] bg-[#F1F5F9] px-3 py-2 text-left font-bold text-[#16302A]">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.join("|")}>
              {row.map((cell) => (
                <td key={cell} className="border-b border-[#D8E6DE] px-3 py-2 text-left text-[#334155]">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function GuideArticle() {
  return (
    <div className="bg-white text-[#16302A]">
      <style>{`
        .guide-faq summary { list-style: none; }
        .guide-faq summary::-webkit-details-marker { display: none; }
        .guide-faq summary::after { content: " +"; color: #00695C; font-weight: 900; }
        .guide-faq details[open] summary::after { content: " −"; }
      `}</style>
      <div className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6">
        <section className="rounded-[28px] bg-gradient-to-br from-[#004C3F] to-[#0A6B52] px-6 py-8 text-white sm:px-9">
          <p className="mb-3 text-sm text-[#9FD8C2]">
            <Link href="/" className="text-[#CDE8DC] hover:underline">
              Homepage
            </Link>
            {" / Come si calcola lo stipendio netto"}
          </p>
          <h1 className="max-w-3xl text-3xl font-semibold tracking-tight sm:text-[2.1rem] sm:leading-tight">
            Come si calcola lo stipendio netto
          </h1>
          <p className="mt-3 max-w-3xl text-base text-[#CDE8DC]">{formula}</p>
        </section>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <article className="rounded-2xl bg-[#004C3F] p-5 text-white">
            <p className="text-2xl font-semibold">1.903,85 €</p>
            <p className="mt-2 text-sm text-[#CDE8DC]">Esempio 1: RAL 30.000 euro, Lombardia, 13 mensilità</p>
          </article>
          <article className="rounded-2xl bg-[#C6F24E] p-5 text-[#16302A]">
            <p className="text-2xl font-semibold">23% · 33% · 43%</p>
            <p className="mt-2 text-sm">Gli scaglioni 2026 sono tre</p>
          </article>
          <article className="rounded-2xl bg-[#004C3F] p-5 text-white">
            <p className="text-2xl font-semibold">24.750,10 €</p>
            <p className="mt-2 text-sm text-[#CDE8DC]">Netto annuo / mensile</p>
          </article>
        </div>

        <p className="mt-6 flex flex-wrap gap-2 text-sm font-semibold text-[#004C3F]">
          <span className="rounded-full bg-[#E3F4EA] px-3 py-1">RAL</span>
          <span className="rounded-full bg-[#E3F4EA] px-3 py-1">− contributi INPS</span>
          <span className="rounded-full bg-[#E3F4EA] px-3 py-1">− IRPEF netta</span>
          <span className="rounded-full bg-[#E3F4EA] px-3 py-1">− addizionali regionali e comunali</span>
          <span className="rounded-full bg-[#E3F4EA] px-3 py-1">+ bonus</span>
        </p>

        <nav aria-label="In questa pagina" className="mt-6 rounded-2xl border border-[#D8E6DE] bg-[#F2FAF5] px-6 py-5">
          <p className="text-xs font-bold tracking-[0.06em] text-[#004C3F] uppercase">In questa pagina</p>
          <ul className="mt-3 columns-1 gap-8 sm:columns-2">
            {toc.map(([id, label]) => (
              <li key={id} className="mb-2 break-inside-avoid">
                <a href={`#${id}`} className="text-sm text-[#16302A] hover:underline">
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <aside className="mt-5 rounded-2xl border border-[#BFE3CF] bg-[#E3F4EA] px-6 py-5">
          <p className="text-sm font-semibold text-[#004C3F]">La formula, in sintesi, è questa:</p>
          <p className="mt-2 font-semibold text-[#16302A]">{formula}</p>
        </aside>

        <article className="mx-auto mt-6 max-w-3xl rounded-[20px] border border-[#D8E6DE] bg-white px-5 py-8 shadow-[0_8px_28px_rgba(0,76,63,0.05)] sm:px-10">
          <H2 id="come-si-calcola-lo-stipendio-netto-la-guida-completa-2026" first>
            Come si calcola lo stipendio netto: la guida completa 2026
          </H2>
          <P>
            Sapere come si arriva dal lordo al netto non serve solo a controllare la busta paga: serve a valutare un&apos;offerta di lavoro, a capire quanto vale davvero un aumento e a non farsi sorprendere dal conguaglio di fine anno. In questa guida percorriamo il calcolo stipendio netto completo, passaggio per passaggio, con le regole in vigore nel 2026 e due esempi numerici svolti fino all&apos;ultimo centesimo.
          </P>
          <P>La formula, in sintesi, è questa:</P>
          <P>
            <strong className="text-[#16302A]">{formula}</strong>
          </P>
          <P>Dietro ogni voce, però, ci sono regole precise. Vediamole in ordine.</P>

          <H2 id="punto-di-partenza-la-ral">Punto di partenza: la RAL</H2>
          <P>
            La <strong className="text-[#16302A]">RAL (retribuzione annua lorda)</strong> è la somma di tutte le retribuzioni lorde di un anno, incluse tredicesima ed eventuale quattordicesima. È il dato da cui parte ogni calcolo corretto, ed è anche l&apos;importo che le aziende indicano nelle offerte di lavoro.
          </P>
          <P>Dove si trova:</P>
          <ul className="mb-3.5 list-disc pl-5 text-[#334155]">
            <li className="mb-1.5">
              nella <strong className="text-[#16302A]">Certificazione Unica (CU)</strong>, nella sezione dei redditi di lavoro dipendente, che il datore di lavoro consegna entro il 16 marzo di ogni anno;
            </li>
            <li className="mb-1.5">
              nel <strong className="text-[#16302A]">contratto di assunzione</strong> o nella lettera di impegno, quando si tratta di un nuovo lavoro;
            </li>
            <li className="mb-1.5">
              sommando la voce &quot;totale retribuzione lorda&quot; di tutte le <strong className="text-[#16302A]">buste paga</strong> dell&apos;anno.
            </li>
          </ul>
          <P>
            Un errore frequente è ricostruire la RAL moltiplicando lo stipendio mensile lordo per 12: se il contratto prevede la tredicesima, le mensilità sono 13 (o 14), e la differenza può superare i 2.000 euro annui.
          </P>

          <H2 id="passaggio-1-i-contributi-inps">Passaggio 1: i contributi INPS</H2>
          <P>
            La prima trattenuta è previdenziale. Il lavoratore versa all&apos;INPS una percentuale della retribuzione lorda che finanzia pensione, malattia, maternità e disoccupazione:
          </P>
          <ul className="mb-3.5 list-disc pl-5 text-[#334155]">
            <li className="mb-1.5">
              <strong className="text-[#16302A]">9,19%</strong> per i dipendenti del settore privato;
            </li>
            <li className="mb-1.5">
              <strong className="text-[#16302A]">8,80%</strong> per i dipendenti pubblici;
            </li>
            <li className="mb-1.5">
              <strong className="text-[#16302A]">5,84%</strong> per gli apprendisti.
            </li>
          </ul>
          <P>
            Il datore di lavoro versa una quota aggiuntiva ben più alta (in media intorno al 23-24% della retribuzione, con variazioni per settore e dimensione aziendale), che però non riduce lo stipendio del dipendente: incide solo sul <strong className="text-[#16302A]">costo aziendale</strong>. Chi confronta un&apos;offerta da dipendente con una collaborazione a partita IVA deve tenere conto anche di questo: a parità di costo per il committente, il lordo da dipendente &quot;contiene&quot; già una parte rilevante di protezione previdenziale e assistenziale.
          </P>
          <P>
            Per le retribuzioni molto elevate esiste un <strong className="text-[#16302A]">massimale annuo</strong> oltre il quale i contributi non sono più dovuti (per chi ha iniziato a lavorare dopo il 1995): l&apos;INPS lo aggiorna ogni anno e riguarda una platea ristretta di dirigenti e alti redditi.
          </P>

          <H2 id="passaggio-2-il-reddito-imponibile-e-il-cuneo-fiscale">Passaggio 2: il reddito imponibile e il cuneo fiscale</H2>
          <P>
            Sottraendo i contributi INPS dalla RAL si ottiene il <strong className="text-[#16302A]">reddito imponibile</strong>, la base per le imposte. Dal 2025, in forma strutturale, per i redditi di lavoro dipendente opera il <strong className="text-[#16302A]">taglio del cuneo fiscale</strong> in due forme:
          </P>
          <P>
            <strong className="text-[#16302A]">Redditi fino a 20.000 euro — somma che non concorre al reddito.</strong> Una percentuale della retribuzione viene esclusa dall&apos;imponibile:
          </P>
          <DataTable
            headers={["Reddito di lavoro dipendente", "Percentuale esclusa", "Tetto massimo"]}
            rows={[
              ["fino a 8.500 €", "7,1%", "603,50 €"],
              ["da 8.501 a 15.000 €", "5,3%", "795,00 €"],
              ["da 15.001 a 20.000 €", "4,8%", "960,00 €"],
            ]}
          />
          <P>
            <strong className="text-[#16302A]">Redditi tra 20.000 e 40.000 euro — detrazione aggiuntiva.</strong> Invece della somma esclusa spetta una detrazione dall&apos;IRPEF di <strong className="text-[#16302A]">1.000 euro</strong> per redditi fino a 32.000 euro, che poi si riduce in proporzione fino ad azzerarsi a 40.000 euro (a 36.000 euro, ad esempio, vale 500 euro).
          </P>
          <P>
            Il risultato pratico è che sulle retribuzioni più basse la trattenuta fiscale effettiva risulta molto contenuta: con una RAL di 20.000 euro, ad esempio, il netto annuo è di circa 17.681 euro, pari a circa l'88% del lordo.
          </P>

          <H2 id="passaggio-3-l-irpef-e-gli-scaglioni-2026">Passaggio 3: l&apos;IRPEF e gli scaglioni 2026</H2>
          <P>
            L&apos;IRPEF è un&apos;imposta <strong className="text-[#16302A]">progressiva per scaglioni</strong>: il reddito viene diviso in fasce e ogni fascia è tassata con la sua aliquota. Gli scaglioni 2026 sono tre, perché la Legge di Bilancio 2026 ha ridotto la seconda aliquota dal 35% al <strong className="text-[#16302A]">33%</strong>:
          </P>
          <DataTable
            headers={["Scaglione di reddito", "Aliquota", "Imposta cumulata al limite superiore"]}
            rows={[
              ["fino a 28.000 €", "23%", "6.440 €"],
              ["da 28.001 a 50.000 €", "33%", "13.700 €"],
              ["oltre 50.000 €", "43%", "—"],
            ]}
          />
          <P>Da questa tabella discendono due concetti fondamentali:</P>
          <ul className="mb-3.5 list-disc pl-5 text-[#334155]">
            <li className="mb-1.5">
              <strong className="text-[#16302A]">Aliquota marginale:</strong> è l&apos;aliquota dello scaglione in cui cade il tuo ultimo euro di reddito. Decide quanta parte di un aumento resta in tasca.
            </li>
            <li className="mb-1.5">
              <strong className="text-[#16302A]">Aliquota media (effettiva):</strong> è il rapporto tra l&apos;imposta totale e il reddito. È sempre più bassa della marginale, perché le prime fasce sono tassate meno.
            </li>
          </ul>
          <P>
            Chi ha un imponibile di 40.000 euro, ad esempio, paga 10.400 euro di IRPEF lorda (6.440 + 33% di 12.000): la sua aliquota media è il 26%, anche se la marginale è il 33%. E un aumento che fa &quot;scattare lo scaglione&quot; non riduce mai il netto: il 33% o il 43% si applica <strong className="text-[#16302A]">solo alla parte di reddito che supera la soglia</strong>, mai all&apos;intero importo. È il mito più diffuso in materia di stipendi, e la sezione finale di questa guida lo smonta con i numeri.
          </P>

          <H2 id="passaggio-4-le-detrazioni-per-lavoro-dipendente">Passaggio 4: le detrazioni per lavoro dipendente</H2>
          <P>
            Dall&apos;IRPEF lorda si sottrae la detrazione prevista dall&apos;<strong className="text-[#16302A]">articolo 13 del TUIR</strong>, che dipende dal reddito complessivo (RC) e spetta in rapporto ai giorni di lavoro nell&apos;anno:
          </P>
          <DataTable
            headers={["Reddito complessivo", "Detrazione"]}
            rows={[
              ["fino a 15.000 €", "1.955 €"],
              ["da 15.001 a 28.000 €", "1.910 € + 1.190 € × (28.000 − RC) / 13.000"],
              ["da 28.001 a 50.000 €", "1.910 € × (50.000 − RC) / 22.000"],
              ["oltre 50.000 €", "0 €"],
            ]}
          />
          <P>Tre regole completano il quadro:</P>
          <ul className="mb-3.5 list-disc pl-5 text-[#334155]">
            <li className="mb-1.5">
              per i redditi tra <strong className="text-[#16302A]">25.000 e 35.000 euro</strong> la detrazione è maggiorata di <strong className="text-[#16302A]">65 euro</strong>;
            </li>
            <li className="mb-1.5">
              la detrazione non può essere inferiore a <strong className="text-[#16302A]">690 euro</strong> per i contratti a tempo indeterminato e a <strong className="text-[#16302A]">1.380 euro</strong> per quelli a tempo determinato (per rapporti inferiori all&apos;anno questi minimi non si riproporzionano ai giorni);
            </li>
            <li className="mb-1.5">
              la detrazione non può mai superare l&apos;IRPEF lorda: l&apos;eventuale eccesso non viene rimborsato. Se la detrazione supera l&apos;IRPEF lorda, il bonus non spetta perché manca la capienza.
            </li>
          </ul>
          <P>
            È questa detrazione, insieme al cuneo fiscale, a spiegare perché la trattenuta effettiva sugli stipendi medio-bassi è molto inferiore alle aliquote nominali: su un reddito complessivo di 21.000 euro, tra detrazione per lavoro dipendente (2.551 euro) e detrazione del cuneo (1.000 euro), l&apos;IRPEF lorda di 4.830 euro si riduce a circa 1.279 euro, prima ancora delle addizionali.
          </P>

          <H2 id="passaggio-5-le-detrazioni-per-familiari-a-carico">Passaggio 5: le detrazioni per familiari a carico</H2>
          <P>
            Un familiare è &quot;a carico&quot; se il suo reddito annuo non supera <strong className="text-[#16302A]">2.840,51 euro</strong> (soglia elevata a <strong className="text-[#16302A]">4.000 euro</strong> per i figli fino a 24 anni). Le detrazioni familiari seguono l&apos;<strong className="text-[#16302A]">articolo 12 del TUIR</strong> e hanno una caratteristica spesso ignorata: <strong className="text-[#16302A]">l&apos;importo pieno è solo teorico</strong>, perché la detrazione effettiva si riduce man mano che il reddito cresce, con una formula proporzionale.
          </P>
          <H3>Figli a carico (21–29 anni)</H3>
          <P>
            Per i figli sotto i 21 anni dal 2022 non spettano più detrazioni: sono sostituite dall&apos;<strong className="text-[#16302A]">assegno unico universale</strong> INPS. Per i figli di età pari o superiore a 21 anni ma inferiore a 30 anni, nonché per i figli di età pari o superiore a 30 anni con disabilità accertata, la detrazione teorica è di <strong className="text-[#16302A]">950 euro</strong> ciascuno, senza maggiorazioni. La detrazione effettiva si calcola così:
          </P>
          <P>
            <strong className="text-[#16302A]">detrazione effettiva = 950 € × (soglia − reddito complessivo) / soglia</strong>, dove la soglia è <strong className="text-[#16302A]">95.000 euro</strong>, aumentata di 15.000 euro per ogni figlio successivo al primo.
          </P>
          <P>
            Esempio: con un reddito di 40.000 euro e un figlio a carico, la detrazione effettiva è 950 × (95.000 − 40.000) / 95.000 = <strong className="text-[#16302A]">550 euro</strong>, non 950. La detrazione si ripartisce tra i genitori secondo la percentuale di carico scelta (in genere 50% ciascuno, oppure 100% al genitore con reddito più alto).
          </P>
          <H3>Coniuge a carico</H3>
          <DataTable
            headers={["Reddito complessivo", "Detrazione coniuge"]}
            rows={[
              ["fino a 15.000 €", "800 € − 110 € × RC / 15.000"],
              ["da 15.001 a 40.000 €", "690 €"],
              ["da 40.001 a 80.000 €", "690 € × (80.000 − RC) / 40.000"],
              ["oltre 80.000 €", "0 €"],
            ]}
          />
          <P>
            Per redditi tra 29.001 e 35.200 euro sono previste piccole maggiorazioni (da 10 a 30 euro); il calcolatore non le applica perché incidono per pochi euro.
          </P>
          <H3>Altri familiari conviventi</H3>
          <P>
            Per i genitori e i nonni conviventi e fiscalmente a carico spetta una detrazione teorica di <strong className="text-[#16302A]">750 euro</strong> ciascuno, ridotta con la stessa logica proporzionale: <strong className="text-[#16302A]">750 € × (80.000 − RC) / 80.000</strong>. Dal 2025 (L. 207/2024) fratelli, sorelle, suoceri, generi e nuore non rientrano più in questa detrazione.
          </P>

          <H2 id="passaggio-6-il-bonus-trattamento-integrativo-ex-bonus-renzi">Passaggio 6: il bonus trattamento integrativo (ex bonus Renzi)</H2>
          <P>
            Se il reddito complessivo non supera <strong className="text-[#16302A]">28.000 euro</strong> e l&apos;IRPEF lorda è più alta della sola detrazione per lavoro dipendente (condizione di &quot;capienza&quot;), spetta il <strong className="text-[#16302A]">trattamento integrativo</strong>: <strong className="text-[#16302A]">1.200 euro l&apos;anno</strong>, erogati come 100 euro al mese in busta paga. Due avvertenze pratiche:
          </P>
          <ul className="mb-3.5 list-disc pl-5 text-[#334155]">
            <li className="mb-1.5">
              il datore di lavoro lo anticipa in base al reddito presunto: se a fine anno il reddito effettivo supera i 28.000 euro (per un secondo lavoro, un premio o il conguaglio tra più CU), il bonus va <strong className="text-[#16302A]">restituito</strong> in dichiarazione o nel conguaglio stesso;
            </li>
          </ul>

          <H2 id="passaggio-7-le-addizionali-regionali-e-comunali">Passaggio 7: le addizionali regionali e comunali</H2>
          <P>Ultimo strato: le imposte locali, calcolate sullo stesso imponibile IRPEF.</P>
          <P>L&apos;<strong className="text-[#16302A]">addizionale regionale</strong> usa aliquote base fissate dalla legge statale, che le regioni possono rimodulare:</P>
          <DataTable
            headers={["Aliquota base", "Regioni"]}
            rows={[
              ["0,70% fino a 15.000 €, poi 1,23%", "Friuli-Venezia Giulia"],
              ["1,23%", "Basilicata, Liguria, Lombardia, Marche, Sardegna, Sicilia, Trentino-Alto Adige, Umbria, Valle d'Aosta, Veneto"],
              ["1,33%", "Emilia-Romagna, Puglia"],
              ["1,42%", "Toscana"],
              ["1,62%", "Piemonte"],
              ["1,67%", "Abruzzo"],
              ["1,73%", "Calabria, Campania, Lazio"],
              ["2,03%", "Molise"],
            ]}
          />
          <P>
            In Valle d&apos;Aosta fino a 15.000 € di reddito complessivo l&apos;addizionale non è dovuta; Trento e Bolzano applicano detrazioni provinciali che possono azzerarla a questi livelli di reddito (vedi la tabella per regione nelle pagine RAL).
          </P>
          <P>
            L&apos;<strong className="text-[#16302A]">addizionale comunale</strong> è deliberata da ogni Comune entro un massimo dello 0,8% (0,9% per Roma Capitale), spesso con una soglia di esenzione per i redditi bassi: l&apos;aliquota esatta del tuo Comune si consulta sul portale del Ministero dell&apos;Economia e delle Finanze. In busta paga le addizionali non si pagano mese per mese nell&apos;anno in cui il reddito si forma: la regionale si rateizza in <strong className="text-[#16302A]">11 rate</strong> da gennaio a novembre dell&apos;anno successivo, la comunale con un acconto del 30% in 9 rate e il saldo l&apos;anno dopo ancora. È il motivo per cui il netto di gennaio e febbraio è di solito leggermente più alto di quello dei mesi successivi.
          </P>

          <div className="my-6 rounded-[18px] border-[1.5px] border-[#BFE3CF] bg-gradient-to-b from-[#E3F4EA] to-white px-6 py-7">
            <H2 id="esempio-1-ral-30-000-euro-lombardia-13-mensilita" first>
              Esempio 1: RAL 30.000 euro, Lombardia, 13 mensilità
            </H2>
            <P>Il percorso completo per il caso più comune (tempo indeterminato, nessun familiare a carico):</P>
            <div className="my-4 overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr>
                    <th className="border-b border-[#D8E6DE] bg-[#F1F5F9] px-3 py-2 text-left font-bold">Passaggio</th>
                    <th className="border-b border-[#D8E6DE] bg-[#F1F5F9] px-3 py-2 text-left font-bold">Importo</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border-b border-[#D8E6DE] px-3 py-2">RAL</td>
                    <td className="border-b border-[#D8E6DE] px-3 py-2">30.000,00 €</td>
                  </tr>
                  <tr>
                    <td className="border-b border-[#D8E6DE] px-3 py-2">Contributi INPS 9,19%</td>
                    <td className="border-b border-[#D8E6DE] px-3 py-2">− 2.757,00 €</td>
                  </tr>
                  <tr>
                    <td className="border-b border-[#D8E6DE] px-3 py-2">Reddito imponibile (27.243 €, interamente nel 1° scaglione)</td>
                    <td className="border-b border-[#D8E6DE] px-3 py-2">IRPEF lorda 23% = 6.265,89 €</td>
                  </tr>
                  <tr>
                    <td className="border-b border-[#D8E6DE] px-3 py-2">Detrazione lavoro dipendente (1.979,29 € + 65 € di maggiorazione)</td>
                    <td className="border-b border-[#D8E6DE] px-3 py-2">− 2.044,29 €</td>
                  </tr>
                  <tr>
                    <td className="border-b border-[#D8E6DE] px-3 py-2">Detrazione cuneo fiscale (reddito tra 20.000 e 32.000 €)</td>
                    <td className="border-b border-[#D8E6DE] px-3 py-2">− 1.000,00 €</td>
                  </tr>
                  <tr>
                    <td className="border-b border-[#D8E6DE] px-3 py-2">IRPEF netta</td>
                    <td className="border-b border-[#D8E6DE] px-3 py-2">3.221,60 €</td>
                  </tr>
                  <tr>
                    <td className="border-b border-[#D8E6DE] px-3 py-2">Addizionale regionale 1,23% + comunale 0,5% (stima)</td>
                    <td className="border-b border-[#D8E6DE] px-3 py-2">− 471,30 €</td>
                  </tr>
                  <tr>
                    <td className="border-b border-[#D8E6DE] px-3 py-2">Bonus trattamento integrativo</td>
                    <td className="border-b border-[#D8E6DE] px-3 py-2">+ 1.200,00 €</td>
                  </tr>
                  <tr>
                    <td className="border-b border-[#D8E6DE] px-3 py-2">
                      <strong>Netto annuo / mensile</strong>
                    </td>
                    <td className="border-b border-[#D8E6DE] px-3 py-2">
                      <strong>24.750,10 € / 1.903,85 €</strong>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="my-6 rounded-[18px] border-[1.5px] border-[#BFE3CF] bg-gradient-to-b from-[#E3F4EA] to-white px-6 py-7">
            <H2 id="esempio-2-ral-45-000-euro-piemonte-un-figlio-di-25-anni-a-carico" first>
              Esempio 2: RAL 45.000 euro, Piemonte, un figlio di 25 anni a carico
            </H2>
            <P>Un caso con secondo scaglione e detrazione per figlio, dove si vede all&apos;opera la riduzione proporzionale dell&apos;articolo 12:</P>
            <div className="my-4 overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr>
                    <th className="border-b border-[#D8E6DE] bg-[#F1F5F9] px-3 py-2 text-left font-bold">Passaggio</th>
                    <th className="border-b border-[#D8E6DE] bg-[#F1F5F9] px-3 py-2 text-left font-bold">Importo</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border-b border-[#D8E6DE] px-3 py-2">RAL</td>
                    <td className="border-b border-[#D8E6DE] px-3 py-2">45.000,00 €</td>
                  </tr>
                  <tr>
                    <td className="border-b border-[#D8E6DE] px-3 py-2">Contributi INPS 9,19%</td>
                    <td className="border-b border-[#D8E6DE] px-3 py-2">− 4.135,50 €</td>
                  </tr>
                  <tr>
                    <td className="border-b border-[#D8E6DE] px-3 py-2">Reddito imponibile</td>
                    <td className="border-b border-[#D8E6DE] px-3 py-2">40.864,50 €</td>
                  </tr>
                  <tr>
                    <td className="border-b border-[#D8E6DE] px-3 py-2">IRPEF lorda (6.440 € + 33% di 12.864,50 €)</td>
                    <td className="border-b border-[#D8E6DE] px-3 py-2">10.685,29 €</td>
                  </tr>
                  <tr>
                    <td className="border-b border-[#D8E6DE] px-3 py-2">Detrazione lavoro dipendente: 1.910 × (50.000 − 40.864,50) / 22.000</td>
                    <td className="border-b border-[#D8E6DE] px-3 py-2">− 793,13 €</td>
                  </tr>
                  <tr>
                    <td className="border-b border-[#D8E6DE] px-3 py-2">Detrazione figlio: 950 × (95.000 − 40.864,50) / 95.000</td>
                    <td className="border-b border-[#D8E6DE] px-3 py-2">− 541,35 €</td>
                  </tr>
                  <tr>
                    <td className="border-b border-[#D8E6DE] px-3 py-2">IRPEF netta</td>
                    <td className="border-b border-[#D8E6DE] px-3 py-2">9.350,81 €</td>
                  </tr>
                  <tr>
                    <td className="border-b border-[#D8E6DE] px-3 py-2">Addizionale regionale Piemonte 1,62%</td>
                    <td className="border-b border-[#D8E6DE] px-3 py-2">− 662,00 €</td>
                  </tr>
                  <tr>
                    <td className="border-b border-[#D8E6DE] px-3 py-2">Addizionale comunale 0,5% (stima)</td>
                    <td className="border-b border-[#D8E6DE] px-3 py-2">− 204,32 €</td>
                  </tr>
                  <tr>
                    <td className="border-b border-[#D8E6DE] px-3 py-2">
                      <strong>Netto annuo / mensile (13 mensilità)</strong>
                    </td>
                    <td className="border-b border-[#D8E6DE] px-3 py-2">
                      <strong>30.647,37 € / 2.357,49 €</strong>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <P>
              Nota la detrazione per il figlio: non sono i 950 euro &quot;teorici&quot;, ma 541,35 euro, perché a un reddito di 40.864 euro la formula proporzionale ha già ridotto l&apos;importo del 43%. Chi stima il netto applicando i 950 euro pieni sovrastima il risultato di oltre 400 euro l&apos;anno.
            </P>
          </div>

          <H2 id="come-verificare-la-tua-busta-paga-voce-per-voce">Come verificare la tua busta paga voce per voce</H2>
          <P>Con le regole appena viste puoi controllare qualsiasi cedolino. Le voci da confrontare, dall&apos;alto in basso:</P>
          <ol className="mb-3.5 list-decimal pl-5 text-[#334155]">
            <li className="mb-1.5">
              <strong className="text-[#16302A]">Imponibile previdenziale</strong> e <strong className="text-[#16302A]">contributi IVS/INPS a carico dipendente:</strong> verifica che la trattenuta corrisponda al 9,19% dell&apos;imponibile (5,84% per apprendisti, 8,80% nel pubblico impiego).
            </li>
            <li className="mb-1.5">
              <strong className="text-[#16302A]">Imponibile fiscale:</strong> deve essere uguale all&apos;imponibile previdenziale meno i contributi appena versati (e meno l&apos;eventuale somma del cuneo fiscale, se hai un reddito fino a 20.000 euro).
            </li>
            <li className="mb-1.5">
              <strong className="text-[#16302A]">IRPEF lorda e detrazioni:</strong> l&apos;imposta del mese è la quota mensile dell&apos;IRPEF annua presunta; le detrazioni riconosciute compaiono in voci separate (lavoro dipendente, familiari).
            </li>
            <li className="mb-1.5">
              <strong className="text-[#16302A]">Trattamento integrativo:</strong> se il tuo reddito presunto è sotto i 28.000 euro, dovresti trovare circa 100 euro mensili in accredito.
            </li>
            <li className="mb-1.5">
              <strong className="text-[#16302A]">Addizionali:</strong> compaiono come rate da gennaio/marzo in poi e si riferiscono al reddito dell&apos;anno precedente: non sono un errore, anche se a inizio anno cambiano il netto.
            </li>
            <li className="mb-1.5">
              <strong className="text-[#16302A]">TFR:</strong> la quota maturata ogni mese (retribuzione annua divisa per 13,5) è indicata a solo scopo informativo: non è una trattenuta sullo stipendio, è un accantonamento che ti verrà liquidato alla fine del rapporto.
            </li>
          </ol>

          <H2 id="il-conguaglio-di-fine-anno-perche-a-dicembre-il-netto-cambia">Il conguaglio di fine anno: perché a dicembre il netto cambia</H2>
          <P>
            Durante l&apos;anno il datore di lavoro trattiene le imposte in modo <strong className="text-[#16302A]">presuntivo</strong>, mese per mese. A dicembre (o alla cessazione del rapporto) ricalcola tutto sull&apos;intero anno: se le trattenute sono state superiori all&apos;IRPEF realmente dovuta, la differenza arriva in busta paga; se sono state inferiori, viene trattenuta. Le cause più frequenti di conguaglio a debito sono: due rapporti di lavoro nello stesso anno, premi e straordinari concentrati in alcuni mesi, bonus trattamento integrativo percepito ma non spettante per il superamento dei 28.000 euro complessivi. Chi ha avuto <strong className="text-[#16302A]">due datori di lavoro</strong> nello stesso anno dovrebbe consegnare al secondo la CU del primo: senza, entrambi applicano detrazioni e primo scaglione da zero, e il conguaglio (o la dichiarazione dei redditi) diventa inevitabilmente a debito.
          </P>

          <H2 id="detrazioni-e-deduzioni-non-sono-la-stessa-cosa">Detrazioni e deduzioni: non sono la stessa cosa</H2>
          <P>
            Un equivoco che genera molti errori di stima. Le <strong className="text-[#16302A]">deduzioni</strong> riducono il reddito imponibile <em>prima</em> del calcolo dell&apos;imposta (esempi: i contributi previdenziali obbligatori, i versamenti alla previdenza complementare fino a 5.164,57 euro). Le <strong className="text-[#16302A]">detrazioni</strong> riducono invece l&apos;imposta già calcolata, euro per euro (lavoro dipendente, familiari, spese mediche al 19% e così via). A parità di importo nominale, una detrazione vale quasi sempre più di una deduzione, perché la deduzione fa risparmiare solo l&apos;aliquota marginale applicata a quell&apos;importo.
          </P>

          <H2 id="errori-comuni-e-falsi-miti">Errori comuni e falsi miti</H2>
          <ul className="mb-3.5 list-disc pl-5 text-[#334155]">
            <li className="mb-1.5">
              <strong className="text-[#16302A]">&quot;Se supero lo scaglione, guadagno di meno.&quot;</strong> Falso. L&apos;aliquota più alta colpisce solo la parte eccedente: un aumento di 100 euro lordi oltre i 50.000 euro di imponibile ne lascia comunque circa 50 in tasca, mai un saldo negativo.
            </li>
            <li className="mb-1.5">
              <strong className="text-[#16302A]">&quot;La tredicesima è tassata di più.&quot;</strong> È tassata con le stesse regole; sembra più bassa perché non beneficia delle quote mensili di detrazioni e del bonus, ma il conguaglio annuale riequilibra tutto.
            </li>
            <li className="mb-1.5">
              <strong className="text-[#16302A]">&quot;Part-time = 65% del lordo.&quot;</strong> Non esiste una percentuale universale: la quota di netto varia da oltre il 90% per i redditi bassi (IRPEF azzerata da detrazioni e cuneo) a circa il 55-60% per i redditi alti. Ogni stima a percentuale fissa è sbagliata per costruzione.
            </li>
            <li className="mb-1.5">
              <strong className="text-[#16302A]">&quot;La RAL è il mensile per 12.&quot;</strong> Solo se non esistono tredicesima e quattordicesima: verificarlo sul contratto evita errori di migliaia di euro nelle trattative.
            </li>
            <li className="mb-1.5">
              <strong className="text-[#16302A]">&quot;Il netto del calcolatore deve coincidere al centesimo con la busta paga.&quot;</strong> Non necessariamente: addizionale comunale effettiva, contributi di categoria del CCNL e redditi aggiuntivi possono spostare il risultato. Un calcolatore serio dichiara le proprie ipotesi, come facciamo noi.
            </li>
          </ul>

          <H2 id="fonti-e-riferimenti-normativi">Fonti e riferimenti normativi</H2>
          <ul className="mb-3.5 list-disc pl-5 text-[#334155]">
            <li className="mb-1.5">TUIR (D.P.R. 917/1986), articoli 12 (detrazioni per carichi di famiglia) e 13 (detrazioni per redditi di lavoro dipendente), testo vigente su Normattiva.</li>
            <li className="mb-1.5">Agenzia delle Entrate, sezione &quot;IRPEF: aliquote e scaglioni&quot; e circolari sulle novità della Legge di Bilancio 2026.</li>
            <li className="mb-1.5">INPS, aliquote contributive per lavoratori dipendenti e apprendisti.</li>
            <li className="mb-1.5">Ministero dell&apos;Economia e delle Finanze, portale delle addizionali comunali IRPEF.</li>
            <li className="mb-1.5">Legge di Bilancio 2025 (L. 207/2024) per la disciplina strutturale del cuneo fiscale.</li>
          </ul>
          <P>
            <em>Ultimo aggiornamento: ottobre 2026. Le informazioni hanno carattere divulgativo e non sostituiscono la consulenza di un professionista.</em>
          </P>

          <H2 id="domande-frequenti-sulla-guida">Domande frequenti sulla guida</H2>
          <div className="guide-faq mt-4">
            {guideFaq.map((item) => (
              <details key={item.question} className="mb-2.5 rounded-[14px] border border-[#D8E6DE] bg-white px-4 py-3.5">
                <summary className="cursor-pointer font-extrabold text-[#16302A]">{item.question}</summary>
                {item.question === "Posso calcolare il netto per la mia situazione specifica?" ? (
                  <p className="mt-2.5 text-base leading-relaxed text-[#334155]">
                    Sì: il <Link href="/" className="text-[#00695C] underline decoration-[#00695C] underline-offset-2 transition duration-200 hover:text-lime hover:decoration-lime hover:decoration-2">calcolatore in homepage</Link> applica tutti i passaggi di questa guida alla tua RAL, regione, mensilità e familiari a carico. Per gli orari ridotti il netto non scala in proporzione alle ore: le detrazioni per lavoro dipendente e il cuneo fiscale restano intere, quindi dimezzare le ore fa scendere il netto meno della metà. Per i contratti collettivi, le pagine dedicate sono il <Link href="/ccnl-metalmeccanico" className="text-[#00695C] underline decoration-[#00695C] underline-offset-2 transition duration-200 hover:text-lime hover:decoration-lime hover:decoration-2">CCNL Metalmeccanico</Link> e il <Link href="/ccnl-commercio" className="text-[#00695C] underline decoration-[#00695C] underline-offset-2 transition duration-200 hover:text-lime hover:decoration-lime hover:decoration-2">CCNL Commercio</Link>.
                  </p>
                ) : (
                  <p className="mt-2.5 text-base leading-relaxed text-[#334155]">{item.answer}</p>
                )}
              </details>
            ))}
          </div>
        </article>
      </div>
      <a
        href="#domande-frequenti-sulla-guida"
        className="fixed right-5 bottom-5 z-50 max-w-[16rem] rounded-2xl border border-[#D8E6DE] bg-white px-4 py-3 text-sm text-[#16302A] shadow-[0_12px_30px_rgba(0,0,0,0.15)]"
      >
        <span className="font-semibold text-[#004C3F]">Ciao!</span> Hai domande sullo stipendio netto? La guida ti spiega tutto →
      </a>
    </div>
  );
}
