import { readFileSync } from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import { EditorialJsonLd, EditorialPage } from "@/components/EditorialPage";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { parseEditorial } from "@/lib/editorial/parse";
import { SITE_URL } from "@/lib/seo";

const title = "RAL 30000 Stipendio Netto: Quanto è il Netto al Mese (2026)";
const description =
  "RAL 30.000 €: lo stipendio netto è 1.903,85 € al mese (24.750,10 € l'anno) in Lombardia, 13 mensilità. Tabella per regione e mensilità, esempio completo.";
const canonical = `${SITE_URL}/stipendio-netto-ral-30000`;
const doc = parseEditorial(readFileSync(path.join(process.cwd(), "content", "stipendio-netto-ral-30000-content.md"), "utf8"));

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, locale: "it_IT", type: "article", siteName: "StipendioNetto" },
};

export default function StipendioNettoRal30000Page() {
  return (
    <>
      <EditorialJsonLd doc={doc} />
      <Header />
      <main id="inizio">
        <EditorialPage
          doc={doc}
          subline="Con una RAL di 30.000 € lo stipendio netto è 1.903,85 € al mese (24.750,10 € l'anno) in Lombardia, con 13 mensilità. Per regione e mensilità diverse, trovi i valori nella tabella."
          stats={[
            { value: "1.903,85 €", label: "Netto mensile, RAL 30.000 € · Lombardia, 13 mensilità", tone: "lime" },
            { value: "24.750,10 €", label: "Netto annuo, stesso caso", tone: "dark" },
            { value: "1.887,09–1.929,63 €", label: "Netto mensile per regione, RAL 30.000 €", tone: "dark" },
          ]}
          chips={["ral 30000 stipendio netto", "30000 euro lordi quanto sono netti", "mensilità", "addizionale regionale", "busta paga"]}
          callout="Ipotesi: dipendente privato, tempo indeterminato, anno intero, nessun familiare a carico, regole 2026. Il bonus di 1.200 € è incluso dove spetta; l'addizionale comunale è una stima dello 0,5%; l'addizionale regionale è l'aliquota base della regione."
        />
      </main>
      <Footer />
    </>
  );
}
