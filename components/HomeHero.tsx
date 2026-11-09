"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { GuideAskBox } from "@/components/GuideAskBox";

export function HomeHero({ calculator }: { calculator: ReactNode }) {
  return (
    <section className="bg-gradient-to-br from-[#004C3F] to-[#0A6B52] px-4 py-6 text-white sm:px-6 sm:py-8">
      <div className="mx-auto w-full max-w-6xl">
        <div className="grid items-start gap-7 lg:grid-cols-[3fr_5fr]">
          <div className="min-w-0 space-y-5 lg:self-center">
            <div>
              <h1 id="titolo-calcolo" className="max-w-[660px] text-[1.75rem] leading-[1.15] font-black tracking-tight text-balance sm:text-4xl">
                Calcolo stipendio netto <span className="text-[#C6F24E]">2026</span>: dal lordo al netto in un minuto
              </h1>
              <p className="mt-3 max-w-xl text-[17px] leading-relaxed text-[#CDE8DC]">
                Stima quanto potresti ricevere in busta paga partendo dalla tua RAL, con un riepilogo chiaro delle principali voci fiscali.
              </p>
            </div>
            <GuideAskBox compact />
            <div className="rounded-[18px] border border-white/25 bg-white/10 p-4">
              <p className="text-xs font-bold tracking-wide text-[#C6F24E] uppercase">
                Esempi di netto mensile · Lombardia, 13 mensilità
              </p>
              <ul className="mt-3 space-y-2 text-sm">
                <li className="flex items-center justify-between gap-3">
                  <span className="text-white/85">RAL 20.000 €</span>
                  <span className="font-bold text-white">1.360,08 €/mese</span>
                </li>
                <li className="flex items-center justify-between gap-3">
                  <span className="text-white/85">RAL 25.000 €</span>
                  <span className="font-bold text-white">1.667,93 €/mese</span>
                </li>
                <li className="flex items-center justify-between gap-3 rounded-xl bg-white/10 px-3 py-2">
                  <span className="text-white/85">RAL 30.000 €</span>
                  <span className="font-bold text-white">1.903,85 €/mese</span>
                </li>
                <li className="flex items-center justify-between gap-3">
                  <span className="text-white/85">RAL 40.000 €</span>
                  <span className="font-bold text-white">2.165,81 €/mese</span>
                </li>
                <li className="flex items-center justify-between gap-3">
                  <span className="text-white/85">RAL 50.000 €</span>
                  <span className="font-bold text-white">2.548,14 €/mese</span>
                </li>
              </ul>
              <p className="mt-3 text-xs text-white/70">Valori 2026 · Prova il calcolatore per il tuo caso.</p>
            </div>
            <div className="rounded-[18px] border border-white/25 bg-white/10 p-4">
              <p className="text-xs font-bold tracking-wide text-[#C6F24E] uppercase">Scaglioni IRPEF 2026</p>
              <ul className="mt-3 space-y-2 text-sm">
                <li className="flex items-center justify-between gap-3">
                  <span className="text-white/85">23% fino a 28.000 €</span>
                  <span className="font-bold text-white">1° scaglione</span>
                </li>
                <li className="flex items-center justify-between gap-3">
                  <span className="text-white/85">33% da 28.001 a 50.000 €</span>
                  <span className="font-bold text-white">2° scaglione</span>
                </li>
                <li className="flex items-center justify-between gap-3">
                  <span className="text-white/85">43% oltre 50.000 €</span>
                  <span className="font-bold text-white">3° scaglione</span>
                </li>
              </ul>
              <Link href="/scaglioni-irpef-2026/" className="mt-3 inline-block text-xs font-bold text-[#C6F24E] underline-offset-2 hover:underline">
                Vedi tutti i dettagli →
              </Link>
            </div>
          </div>
          <div className="min-w-0">{calculator}</div>
        </div>
        <ul className="mt-4 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm font-bold text-white">
          <li>🤝 Trusted Partners</li>
          <li>🛡️ Decide with Confidence</li>
          <li>✓ Fonti ufficiali 2026</li>
        </ul>
      </div>
    </section>
  );
}
