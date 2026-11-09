import { readFileSync } from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import { EditorialJsonLd, EditorialPage } from "@/components/EditorialPage";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { parseEditorial } from "@/lib/editorial/parse";
import { SITE_URL } from "@/lib/seo";

const title = "Come Leggere la Busta Paga: Guida Passo Passo con Esempio | StipendioNetto";
const description =
  "Come leggere la busta paga in 6 passi: testata, presenze, competenze, trattenute INPS e IRPEF, progressivi e TFR. Con un esempio numerico completo e la checklist di verifica in 5 minuti.";
const canonical = `${SITE_URL}/come-leggere-la-busta-paga`;
const doc = parseEditorial(readFileSync(path.join(process.cwd(), "content", "come-leggere-busta-paga-content.md"), "utf8"));

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, locale: "it_IT", type: "article", siteName: "StipendioNetto" },
};

export default function ComeLeggereLaBustaPagaPage() {
  return (
    <>
      <EditorialJsonLd doc={doc} />
      <Header />
      <main id="inizio">
        <EditorialPage
          doc={doc}
          subline="Non serve capirle tutte: serve sapere dove guardare e quali numeri devono tornare."
          stats={[
            { value: "≈ 1.905 €", label: "Netto del mese", tone: "dark" },
            { value: "24.750,10 €", label: "netto annuo", tone: "lime" },
            { value: "1.903,85 €", label: "media di una mensilità", tone: "dark" },
          ]}
          callout="Sull'anno intero i conti tornano al centesimo: netto annuo 24.750,10 €, cioè una media di 1.903,85 € per mensilità."
        />
      </main>
      <Footer />
    </>
  );
}
