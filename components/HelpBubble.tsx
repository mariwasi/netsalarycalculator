"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

const TEXT_TAGS = new Set(["A", "BUTTON", "H1", "H2", "H3", "LABEL", "LI", "P", "SPAN", "SUMMARY", "TD", "TH"]);

function coversText(anchor: HTMLAnchorElement) {
  const rect = anchor.getBoundingClientRect();
  const points: Array<[number, number]> = [
    [rect.left + 4, rect.top + 4],
    [rect.right - 4, rect.top + 4],
    [rect.left + 4, rect.bottom - 4],
    [rect.right - 4, rect.bottom - 4],
  ];

  return points.some(([x, y]) => {
    if (x < 0 || y < 0 || x > window.innerWidth || y > window.innerHeight) return false;
    for (const node of document.elementsFromPoint(x, y)) {
      if (!(node instanceof HTMLElement) || node === anchor || anchor.contains(node)) continue;
      if (!TEXT_TAGS.has(node.tagName)) continue;
      if ((node.innerText || "").trim().length > 0) return true;
    }
    return false;
  });
}

export function HelpBubble() {
  const ref = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const anchor = ref.current;
    if (!anchor) return;
    let frame = 0;

    const place = () => {
      anchor.style.transform = "translateY(0px)";
      let shift = 0;
      for (let step = 0; step < 14; step += 1) {
        if (!coversText(anchor)) break;
        shift += 24;
        anchor.style.transform = `translateY(-${shift}px)`;
      }
    };

    const schedule = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(place);
    };

    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  return (
    <Link
      ref={ref}
      href="/come-si-calcola-stipendio-netto"
      aria-label="Ciao! Hai domande sullo stipendio netto? La guida ti spiega tutto"
      className="fixed right-4 bottom-4 z-50 grid h-[62px] w-[62px] place-items-center rounded-full border-[3px] border-white bg-[#C6F24E] text-[26px] text-forest shadow-[0_10px_24px_rgba(0,0,0,0.2)]"
    >
      <span aria-hidden="true">✦</span>
    </Link>
  );
}
