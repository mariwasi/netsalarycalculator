import { readFileSync } from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import { EditorialJsonLd, EditorialPage } from "@/components/EditorialPage";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { parseEditorial } from "@/lib/editorial/parse";
import { OG_IMAGES, SITE_URL } from "@/lib/seo";

const title = "Metodologia del Calcolo Stipendio Netto 2026";
const description =
  "Scopri come funziona il nostro calcolatore dello stipendio netto: formule, ipotesi fiscali, fonti ufficiali, limiti del calcolo e aggiornamenti.";
const canonical = `${SITE_URL}/metodologia`;
const doc = parseEditorial(readFileSync(path.join(process.cwd(), "content", "metodologia-content.md"), "utf8"));

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, locale: "it_IT", type: "article", siteName: "StipendioNetto", images: OG_IMAGES },
};

export default function MetodologiaPage() {
  return (
    <>
      <EditorialJsonLd doc={doc} />
      <Header />
      <main id="inizio">
        <EditorialPage
          doc={doc}
          subline="Stipendio netto = RAL − contributi INPS − IRPEF netta − addizionali regionali e comunali + trattamento integrativo"
          stats={[
            { value: "24.750,10 €", label: "Stipendio netto annuo", tone: "dark" },
            { value: "1.903,85 €", label: "Stipendio netto mensile (13 mensilità)", tone: "lime" },
            { value: "541,35 €", label: "Detrazione figlio nell'esempio", tone: "dark" },
          ]}
          chips={["RAL", "− contributi INPS", "− IRPEF netta", "− addizionali regionali e comunali", "+ trattamento integrativo"]}
          callout="Stipendio netto = RAL − contributi INPS − IRPEF netta − addizionali regionali e comunali + trattamento integrativo"
        />
      </main>
      <Footer />
    </>
  );
}
