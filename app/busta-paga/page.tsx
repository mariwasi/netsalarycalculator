import { readFileSync } from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import { EditorialJsonLd, EditorialPage } from "@/components/EditorialPage";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { parseEditorial } from "@/lib/editorial/parse";
import { SITE_URL } from "@/lib/seo";

const title = "Busta Paga: Cos'è, Come è Fatta e le Voci Spiegate";
const description =
  "La busta paga spiegata semplice: le 4 sezioni del cedolino, tutte le voci una per una e gli errori da controllare ogni mese.";
const canonical = `${SITE_URL}/busta-paga`;
const doc = parseEditorial(readFileSync(path.join(process.cwd(), "content", "busta-paga-content.md"), "utf8"));

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, locale: "it_IT", type: "article", siteName: "StipendioNetto" },
};

export default function BustaPagaPage() {
  return (
    <>
      <EditorialJsonLd doc={doc} />
      <Header />
      <main id="inizio">
        <EditorialPage
          doc={doc}
          subline="La busta paga è il documento che certifica quanto guadagni e quanto ti viene trattenuto: 4 sezioni — testata, competenze, trattenute, riepiloghi — e tutte le voci spiegate, una per una."
          stats={[
            { value: "9,19%", label: "Contributi INPS nel privato", tone: "dark" },
            { value: "10,33 €", label: "EDR al mese", tone: "lime" },
            { value: "16 marzo", label: "Consegna della Certificazione Unica", tone: "dark" },
          ]}
          callout="L'INAIL (l'assicurazione infortuni) non è una trattenuta del dipendente: la paga interamente il datore di lavoro, quindi non la troverai mai tra le tue trattenute."
        />
      </main>
      <Footer />
    </>
  );
}
