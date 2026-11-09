import { readFileSync } from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import { EditorialJsonLd, EditorialPage } from "@/components/EditorialPage";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { parseEditorial } from "@/lib/editorial/parse";
import { SITE_URL } from "@/lib/seo";

const title = "CCNL Metalmeccanico 2026: Livelli e Stipendio Netto";
const description =
  "Scopri i livelli del CCNL Metalmeccanico industria, i minimi retributivi, gli scatti di anzianità e come stimare lo stipendio netto.";
const canonical = `${SITE_URL}/ccnl-metalmeccanico`;
const doc = parseEditorial(readFileSync(path.join(process.cwd(), "content", "ccnl-metalmeccanico-content.md"), "utf8"));

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, locale: "it_IT", type: "article", siteName: "StipendioNetto" },
};

export default function CcnlMetalmeccanicoPage() {
  return (
    <>
      <EditorialJsonLd doc={doc} />
      <Header />
      <main id="inizio">
        <EditorialPage
          doc={doc}
          subline="Se lavori in un'azienda metalmeccanica, quasi tutto quello che conta nella tua busta paga passa da una sigla: il tuo livello."
          stats={[
            { value: "22 novembre 2025", label: "Rinnovo Federmeccanica-Assistal, FIM-FIOM-UILM", tone: "dark" },
            { value: "30 giugno 2028", label: "Il contratto copre il periodo fino a questa data", tone: "lime" },
            { value: "1.903,85 €", label: "Netto mensile nell'esempio da 30.000 euro", tone: "dark" },
          ]}
          callout="Non è una tabella stipendi, perché una tabella da sola inganna: il minimo contrattuale è un lordo mensile, e tra quel lordo e il netto c'è un percorso intero di contributi, imposte e detrazioni."
        />
      </main>
      <Footer />
    </>
  );
}
