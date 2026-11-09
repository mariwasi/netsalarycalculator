import { readFileSync } from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import { EditorialJsonLd, EditorialPage } from "@/components/EditorialPage";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { parseEditorial } from "@/lib/editorial/parse";
import { SITE_URL } from "@/lib/seo";

const title = "CCNL Commercio 2026: Livelli, Stipendio e 14 Mensilità";
const description =
  "Scopri i livelli del CCNL Commercio, il codice CNEL H011, le 14 mensilità, i minimi retributivi e come stimare lo stipendio netto.";
const canonical = `${SITE_URL}/ccnl-commercio`;
const doc = parseEditorial(readFileSync(path.join(process.cwd(), "content", "ccnl-commercio-content.md"), "utf8"));

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, locale: "it_IT", type: "article", siteName: "StipendioNetto" },
};

export default function CcnlCommercioPage() {
  return (
    <>
      <EditorialJsonLd doc={doc} />
      <Header />
      <main id="inizio">
        <EditorialPage
          doc={doc}
          subline={'Se lavori in un negozio, in un supermercato, in un\'azienda di distribuzione o di servizi, è molto probabile che il tuo contratto sia il CCNL del Terziario, della Distribuzione e dei Servizi — quello che tutti chiamano "CCNL Commercio".'}
          stats={[
            { value: "H011", label: "Codice CNEL del contratto Confcommercio", tone: "dark" },
            { value: "14", label: "Mensilità: tredicesima e quattordicesima", tone: "lime" },
            { value: "31 marzo 2027", label: "Validità del rinnovo del 22 marzo 2024", tone: "dark" },
          ]}
          callout="Per questo questa pagina hub non pubblica una tabella di minimi: i minimi verificati, con data e contratto di riferimento, apparterranno alle pagine di livello, dove ogni cifra potrà essere controllata una per una."
        />
      </main>
      <Footer />
    </>
  );
}
