"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const QUESTIONS = [
  "Chiedimi: quanto è il netto di 30.000 € di RAL?",
  "Chiedimi: come si calcola l’IRPEF nel 2026?",
  "Chiedimi: perché il netto cambia da un mese all’altro?",
  "Chiedimi: come si legge la busta paga?",
];

export function GuideAskBox({ compact = false }: { compact?: boolean }) {
  const router = useRouter();
  const [placeholder, setPlaceholder] = useState(QUESTIONS[0]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let questionIndex = 0;
    let cursor = 0;
    let deleting = false;
    let timer = 0;

    const tick = () => {
      const question = QUESTIONS[questionIndex];
      if (!deleting) {
        cursor += 1;
        setPlaceholder(question.slice(0, cursor));
        if (cursor >= question.length) {
          deleting = true;
          timer = window.setTimeout(tick, 1800);
          return;
        }
        timer = window.setTimeout(tick, 55);
        return;
      }

      cursor -= 1;
      setPlaceholder(question.slice(0, cursor));
      if (cursor <= 0) {
        deleting = false;
        questionIndex = (questionIndex + 1) % QUESTIONS.length;
        timer = window.setTimeout(tick, 400);
        return;
      }
      timer = window.setTimeout(tick, 22);
    };

    timer = window.setTimeout(tick, 400);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <form
      action="/come-si-calcola-stipendio-netto"
      className={`${compact ? "mt-0" : "mt-6"} overflow-hidden rounded-[18px] border border-line bg-white shadow-[0_10px_26px_rgba(0,76,63,0.10)]`}
      onSubmit={(event) => {
        event.preventDefault();
        router.push("/come-si-calcola-stipendio-netto");
      }}
    >
      <div className={`flex items-center gap-2.5 ${compact ? "px-3 py-2.5" : "px-4 py-3.5"}`}>
        <label htmlFor="guida-cerca" className="sr-only">
          Cerca nella guida
        </label>
        <input
          id="guida-cerca"
          type="text"
          placeholder={placeholder}
          autoComplete="off"
          className={`min-w-0 flex-1 border-0 bg-transparent p-0 outline-none placeholder:text-[#64748B] ${compact ? "text-sm text-ink" : "text-base text-ink"}`}
        />
        <button
          type="submit"
          aria-label="Apri la guida"
          className={`grid shrink-0 place-items-center rounded-xl bg-mint text-forest transition duration-200 ease-out hover:-translate-y-0.5 hover:bg-lime hover:shadow-[0_14px_28px_rgba(198,242,78,0.45)] focus-visible:ring-2 focus-visible:ring-[#C6F24E] focus-visible:ring-offset-2 active:translate-y-0 active:scale-[0.98] active:shadow-[0_6px_14px_rgba(0,76,63,0.25)] ${compact ? "h-9 w-9 text-base" : "h-10 w-10 text-lg"}`}
        >
          <span aria-hidden="true">→</span>
        </button>
      </div>
      <div className={`flex items-center gap-2 bg-gradient-to-r from-[#004C3F] via-[#2FA36B] to-[#C6F24E] font-black tracking-wide text-white ${compact ? "px-3 py-1.5 text-xs" : "px-4 py-2 text-sm"}`}>
        <span className="rounded-md bg-lime px-1.5 py-0.5 text-xs font-black text-forest">GUIDA</span>
        CERCA NELLA GUIDA
      </div>
    </form>
  );
}
