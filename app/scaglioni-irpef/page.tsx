import { readFileSync } from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import { EditorialJsonLd, EditorialPage } from "@/components/EditorialPage";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { parseEditorial } from "@/lib/editorial/parse";
import { OG_IMAGES, SITE_URL } from "@/lib/seo";

const title = "Scaglioni IRPEF 2026: Tabella, Aliquote e Calcolo";
const description =
  "Scaglioni IRPEF 2026: 23% fino a 28.000 €, 33% fino a 50.000 €, 43% oltre. Tabella completa, confronto con il 2025 ed esempi di calcolo verificati.";
const canonical = `${SITE_URL}/scaglioni-irpef`;
const doc = parseEditorial(readFileSync(path.join(process.cwd(), "content", "scaglioni-content.md"), "utf8"));

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, locale: "it_IT", type: "article", siteName: "StipendioNetto", images: OG_IMAGES },
};

export default function ScaglioniIrpef2026Page() {
  return (
    <>
      <EditorialJsonLd doc={doc} />
      <Header />
      <main id="inizio">
        <EditorialPage
          doc={doc}
          subline="Gli scaglioni IRPEF 2026 sono tre: 23% fino a 28.000 euro, 33% tra 28.000 e 50.000 euro, 43% oltre i 50.000 euro."
          stats={[
            { value: "23% · 33% · 43%", label: "Gli scaglioni IRPEF 2026 sono tre", tone: "dark" },
            { value: "440 euro", label: "per i redditi dai 50.000 euro in su", tone: "lime" },
            { value: "10.400 €", label: "IRPEF lorda totale su 40.000 euro", tone: "dark" },
          ]}
          chips={["23%", "33%", "43%"]}
          callout="Questo è il meccanismo della progressività, ed è il motivo per cui superare uno scaglione non fa mai perdere soldi: l'aliquota più alta si applica solo agli euro in più, mai a quelli già guadagnati."
        />
      </main>
      <Footer />
    </>
  );
}
