export type GuideEntry = { title: string; href: string; keywords: string };

export const GUIDE_INDEX: GuideEntry[] = [
  { title: "Calcolatore stipendio netto", href: "/", keywords: "calcolatore calcolo stipendio netto lordo netto" },
  { title: "Come si calcola lo stipendio netto", href: "/come-si-calcola-stipendio-netto", keywords: "guida formula calcolo stipendio netto esempio" },
  { title: "Calcolo RAL: cos'è e come si converte in netto", href: "/calcolo-ral", keywords: "ral lordo netto conversione retribuzione annua lorda" },
  { title: "RAL 30.000 €: quanto è lo stipendio netto al mese?", href: "/stipendio-netto-ral-30000", keywords: "ral 30000 30.000 trentamila" },
  { title: "RAL 28.000 €: quanto è lo stipendio netto al mese?", href: "/stipendio-netto-ral-28000", keywords: "ral 28000 28.000 ventottomila" },
  { title: "Scaglioni IRPEF 2026", href: "/scaglioni-irpef", keywords: "irpef aliquote scaglioni tabella 23 33 43" },
  { title: "Calcolo IRPEF 2026: formula, aliquote ed esempi", href: "/calcolo-irpef", keywords: "irpef calcolo detrazioni bonus" },
  { title: "Busta paga: cos'è e come è fatta", href: "/busta-paga", keywords: "busta paga cedolino voci trattenute tfr" },
  { title: "Come leggere la busta paga", href: "/come-leggere-la-busta-paga", keywords: "leggere busta paga esempio voci codici" },
  { title: "Metodologia del calcolo", href: "/metodologia", keywords: "metodologia metodo fonti regioni addizionali" },
  { title: "CCNL Metalmeccanico 2026: livelli e stipendio netto", href: "/ccnl-metalmeccanico", keywords: "metalmeccanico ccnl livelli minimi d1 c3 b1" },
  { title: "CCNL Commercio 2026: livelli, stipendio e 14 mensilità", href: "/ccnl-commercio", keywords: "commercio ccnl livelli 14 mensilità" },
  { title: "Preavviso dimissioni 2026: giorni, calcolo e regole", href: "/preavviso-dimissioni", keywords: "preavviso dimissioni giorni uscita naspi" },
];

export function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[€.,]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function searchGuide(query: string): GuideEntry[] {
  const words = normalize(query).split(" ").filter(Boolean);
  if (words.length === 0) return [];
  const scored = GUIDE_INDEX.map((entry) => {
    const haystack = normalize(`${entry.title} ${entry.keywords} ${entry.href}`);
    const title = normalize(entry.title);
    const matched = words.every((word) => haystack.includes(word));
    if (!matched) return null;
    const score = words.every((word) => title.includes(word)) ? 2 : 1;
    return { entry, score };
  }).filter((item): item is { entry: GuideEntry; score: number } => item !== null);
  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, 5).map((item) => item.entry);
}
