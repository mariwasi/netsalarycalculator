import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { GuideArticle, guideFaq } from "@/components/GuideArticle";
import { Header } from "@/components/Header";
import { OG_IMAGES, SITE_URL } from "@/lib/seo";

const title = "Come si calcola lo stipendio netto: guida 2026";
const description =
  "Scopri come calcolare lo stipendio netto dalla RAL: contributi INPS, IRPEF, detrazioni e addizionali, con esempi e formula passo per passo.";
const canonical = `${SITE_URL}/come-si-calcola-stipendio-netto`;

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical },
  openGraph: {
    title,
    description,
    url: canonical,
    locale: "it_IT",
    type: "article",
    siteName: "StipendioNetto",
    images: OG_IMAGES,
  },
};

const faqStructuredData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: guideFaq.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

export default function ComeSiCalcolaStipendioNettoPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
      />
      <Header />
      <main id="inizio">
        <GuideArticle />
      </main>
      <Footer />
    </>
  );
}
