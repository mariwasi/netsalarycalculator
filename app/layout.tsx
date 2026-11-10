import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { OG_IMAGES, SITE_URL } from "@/lib/seo";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const title = "Calcolo Stipendio Netto 2026: Simulatore RAL | StipendioNetto";
const description =
  "Calcola una stima dello stipendio netto 2026 partendo dalla RAL. Scopri le principali voci di contributi, IRPEF e busta paga.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: SITE_URL,
  },
  title,
  description,
  applicationName: "StipendioNetto",
  openGraph: {
    title,
    description,
    url: SITE_URL,
    locale: "it_IT",
    type: "website",
    siteName: "StipendioNetto",
    images: OG_IMAGES,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/logo.webp"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="it" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full bg-white text-ink">{children}</body>
    </html>
  );
}
