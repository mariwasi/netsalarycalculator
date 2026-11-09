import type { Metadata } from "next";
import { CtaBand } from "@/components/CtaBand";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { HelpBubble } from "@/components/HelpBubble";
import { HomeCalculator } from "@/components/HomeCalculator";
import { HomepageArticle } from "@/components/HomepageArticle";
import { PayslipHighlight } from "@/components/PayslipHighlight";
import { VerifiedPanel } from "@/components/VerifiedPanel";
import { faqItems } from "@/lib/content/faq";

export const metadata: Metadata = {
  title: { absolute: "Calcolo Stipendio Netto 2026: Calcolatore da Lordo a Netto" },
  description:
    "Calcola stipendio netto 2026 da lordo a netto: inserisci la RAL e stima il netto mensile e annuale con IRPEF, INPS, detrazioni e addizionali.",
  openGraph: { title: "Calcolo Stipendio Netto 2026: Calcolatore da Lordo a Netto" },
};

const faqStructuredData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
      />
      <Header />
      <main id="inizio" className="home">
        <HomeCalculator />
        <HomepageArticle />
        <CtaBand />
        <VerifiedPanel />
        <PayslipHighlight />
        <FAQ />
        <HelpBubble />
      </main>
      <Footer />
    </>
  );
}
