import { readFileSync } from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import { EditorialJsonLd, EditorialPage } from "@/components/EditorialPage";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { parseEditorial } from "@/lib/editorial/parse";
import { OG_IMAGES, SITE_URL } from "@/lib/seo";

const title = "Calcolo RAL 2026: Cos'è la RAL e Come si Converte in Netto";
const description =
  "Calcolo RAL 2026: cos'è la retribuzione annua lorda, cosa include e come si converte in netto. Esempio: RAL 30.000 € → 1.903,85 € al mese.";
const canonical = `${SITE_URL}/calcolo-ral`;
const doc = parseEditorial(readFileSync(path.join(process.cwd(), "content", "calcolo-ral-content.md"), "utf8"));

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, locale: "it_IT", type: "article", siteName: "StipendioNetto", images: OG_IMAGES },
};

export default function CalcoloRalPage() {
  return (
    <>
      <EditorialJsonLd doc={doc} />
      <Header />
      <main id="inizio">
        <EditorialPage
          doc={doc}
          subline="La RAL è la retribuzione annua lorda: retribuzione lorda mensile × numero di mensilità. Con RAL 30.000 €, in Lombardia e 13 mensilità, il netto è 1.903,85 € al mese."
          stats={[
            { value: "1.903,85 €", label: "Netto mensile, RAL 30.000 € · Lombardia, 13 mensilità", tone: "lime" },
            { value: "24.750,10 €", label: "Netto annuo, stesso caso", tone: "dark" },
            { value: "82,5%", label: "Del lordo resta netto, RAL 30.000 €", tone: "dark" },
          ]}
          chips={["calcolo ral", "retribuzione annua lorda", "da ral a netto", "tredicesima", "busta paga"]}
          callout="Ipotesi degli esempi: dipendente privato, tempo indeterminato, Lombardia, 13 mensilità, nessun familiare a carico, regole 2026. Il bonus di 1.200 € è incluso dove spetta; l'addizionale comunale è una stima dello 0,5%."
        />
      </main>
      <Footer />
    </>
  );
}
