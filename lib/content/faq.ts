export type FaqItem = {
  question: string;
  answer: string;
};

export const faqItems: readonly FaqItem[] = [
  {
    question: "Come si passa dalla RAL allo stipendio netto?",
    answer:
      "Dalla RAL si sottraggono i contributi INPS a carico del lavoratore: 9,19%, più l’1% sulla parte di ogni mensilità che supera 4.685 €. Sull’imponibile che resta si calcola l’IRPEF 2026 con le aliquote 23%, 33% e 43%. Si applicano poi la detrazione da lavoro dipendente, le detrazioni familiari indicate e, tra 20.000 e 40.000 € di imponibile, l’ulteriore detrazione del taglio del cuneo. Se l’IRPEF resta dovuta, si stimano le addizionali. Trattamento integrativo e somma integrativa, quando spettano, aumentano il netto e non sono imponibili.",
  },
  {
    question: "Qual è la differenza tra RAL e netto mensile?",
    answer:
      "La RAL è la retribuzione annua lorda, prima dei contributi a carico del lavoratore e delle imposte. Il netto mensile mostrato qui è la stima annua divisa in 12, 13 o 14 parti uguali. In una busta paga reale le stesse voci possono essere distribuite in modo diverso tra le mensilità ordinarie e le mensilità aggiuntive.",
  },
  {
    question: "Come cambiano i risultati con 13 o 14 mensilità?",
    answer:
      "Cambiare il numero di mensilità modifica l’importo di ogni pagamento, perché la stima annua viene ripartita per 12, 13 o 14. L’IRPEF annua non cambia solo per questo. Può invece cambiare il contributo INPS: l’1% aggiuntivo si misura su ogni mensilità e si applica solo alla quota oltre 4.685 €. Con una RAL ripartita su più mensilità è più facile restare sotto quella soglia.",
  },
  {
    question: "Le addizionali regionali e comunali sono incluse?",
    answer:
      "L’addizionale regionale è stimata con le aliquote 2026 pubblicate dal Dipartimento delle Finanze per la regione o provincia autonoma scelta. Se il campo dell’aliquota comunale resta vuoto, il calcolo usa una stima allo 0,5% ed è indicata come stima. Un’aliquota inserita sostituisce la stima. Non c’è un archivio comunale verificato. Non sono applicate le detrazioni regionali per figli o disabilità. Per Bolzano, Trento, Friuli-Venezia Giulia, Lazio, Umbria e Valle d’Aosta il risultato segnala le regole generali che invece sono state applicate.",
  },
  {
    question: "Il risultato del calcolatore è esatto?",
    answer:
      "No. È una stima per un dipendente privato di industria, commercio o artigianato, con un solo reddito da lavoro e un rapporto per l’intero anno. Non considera premi, straordinari, benefit, TFR, trasferte, altri redditi né detrazioni per spese. Oltre 200.000 € di reddito non è applicato il taglio di 440 € su alcune detrazioni per oneri, perché quelle spese non sono richieste. Il risultato non sostituisce una busta paga né una consulenza fiscale.",
  },
  {
    question: "Il calcolatore considera le detrazioni familiari?",
    answer:
      "Sì, ma solo per i casi previsti dal modello: coniuge fiscalmente a carico, figli di almeno 21 anni e meno di 30 oppure figli di almeno 30 anni con disabilità, e ascendenti conviventi a carico. I limiti di reddito dei familiari restano a tuo carico: 2.840,51 €, elevati a 4.000 € per i figli fino a 24 anni. I figli sotto i 21 anni non danno la detrazione IRPEF, perché per loro opera l’Assegno Unico, che qui non è calcolato. Se indichi il coniuge a carico, la detrazione per i figli è attribuita per intero.",
  },
  {
    question: "Quanti sono 2.000 euro lordi al mese in netto?",
    answer:
      "Il passaggio da lordo a netto mensile dipende dalle mensilità. Con 13 mensilità (RAL 26.000 euro), in Lombardia il netto è di circa 1.714 euro al mese; con 12 mensilità (RAL 24.000 euro) sale a circa 1.757 euro al mese, perché lo stesso reddito annuo si concentra in meno buste paga e detrazioni e bonus incidono di più in proporzione.",
  },
  {
    question: "Come calcolare stipendio mensile netto?",
    answer:
      "Inserisci la RAL nel calcolatore e scegli 12, 13 o 14 mensilità: il risultato mostra subito il netto mensile stimato, con il dettaglio di INPS, IRPEF, detrazioni e addizionali.",
  },
];
