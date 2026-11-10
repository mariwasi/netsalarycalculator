import { readFileSync } from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import { EditorialJsonLd, EditorialPage } from "@/components/EditorialPage";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { parseEditorial } from "@/lib/editorial/parse";
import { OG_IMAGES, SITE_URL } from "@/lib/seo";

const title = "Preavviso Dimissioni 2026: Giorni, Calcolo e Regole";
const description =
  "Scopri quanti giorni di preavviso devi dare per dimetterti, come calcolare la data di uscita, cosa succede se non lo rispetti e come fare le dimissioni online.";
const canonical = `${SITE_URL}/preavviso-dimissioni`;
const doc = parseEditorial(readFileSync(path.join(process.cwd(), "content", "preavviso-dimissioni-content.md"), "utf8"));

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, locale: "it_IT", type: "article", siteName: "StipendioNetto", images: OG_IMAGES },
};

export default function PreavvisoDimissioniPage() {
  return (
    <>
      <EditorialJsonLd doc={doc} />
      <Header />
      <main id="inizio">
        <EditorialPage
          doc={doc}
          subline="Il preavviso per le dimissioni volontarie dipende dal CCNL e dall'anzianità: ecco come si contano i giorni, come si calcola la data di uscita e quanto ti costa saltarlo."
          stats={[
            { value: "2.307,69 €", label: "Lordo circa per 30 giorni saltati", tone: "dark" },
            { value: "1.153,85 €", label: "Lordo circa per 15 giorni saltati", tone: "lime" },
            { value: "2.222 €", label: "TFR lordo circa per ogni anno", tone: "dark" },
          ]}
          callout="Salti tutti e 30 i giorni: la trattenuta è pari a circa una mensilità lorda, cioè circa 2.307,69 euro lordi."
        />
      </main>
      <Footer />
    </>
  );
}
