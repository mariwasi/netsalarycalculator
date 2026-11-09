import { readFileSync } from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import { EditorialJsonLd, EditorialPage } from "@/components/EditorialPage";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { parseEditorial } from "@/lib/editorial/parse";
import { SITE_URL } from "@/lib/seo";

const title = "Calcolo IRPEF 2026: Formula, Aliquote ed Esempi";
const description =
  "Scopri come calcolare l'IRPEF nel 2026: reddito imponibile, scaglioni, detrazioni e addizionali, con formula ed esempi pratici.";
const canonical = `${SITE_URL}/calcolo-irpef`;
const doc = parseEditorial(readFileSync(path.join(process.cwd(), "content", "calcolo-irpef-content.md"), "utf8"));

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, locale: "it_IT", type: "article", siteName: "StipendioNetto" },
};

export default function CalcoloIrpefPage() {
  return (
    <>
      <EditorialJsonLd doc={doc} />
      <Header />
      <main id="inizio">
        <EditorialPage
          doc={doc}
          subline="IRPEF 2026: 23% fino a 28.000 €, 33% fino a 50.000 €, 43% oltre — poi detrazioni e bonus. Ecco la formula e un esempio completo con RAL 45.000 €."
          stats={[
            { value: "9.892,16 €", label: "IRPEF netta su RAL 45.000 €", tone: "dark" },
            { value: "30.265,39 €", label: "Stipendio netto annuo, stesso caso", tone: "lime" },
            { value: "550,00 €", label: "Detrazione figlio con RC 40.000 €", tone: "dark" },
          ]}
          chips={["reddito imponibile", "scaglioni IRPEF", "detrazioni", "addizionali", "trattamento integrativo"]}
          callout="Un esempio secco: con RC 40.000 € e un figlio a carico, la detrazione non è 950 € ma 950 × (95.000 − 40.000) / 95.000 = 550,00 €."
        />
      </main>
      <Footer />
    </>
  );
}
