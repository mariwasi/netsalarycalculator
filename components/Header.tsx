"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useId, useRef, useState, type FocusEvent, type PointerEvent } from "react";

const links = [
  { href: "/#calcolatore", label: "Calcolatore" },
  { href: "/#confronto", label: "Confronto" },
  { href: "/#come-funziona", label: "Come funziona" },
  { href: "/#domande", label: "Domande" },
];

const guideLinks = [
  { href: "/come-si-calcola-stipendio-netto", label: "Come si calcola lo stipendio netto" },
  { href: "/scaglioni-irpef-2026", label: "Scaglioni IRPEF 2026" },
  { href: "/busta-paga", label: "Busta paga" },
  { href: "/come-leggere-la-busta-paga", label: "Come leggere la busta paga" },
  { href: "/calcolo-irpef", label: "Calcolo IRPEF" },
  { href: "/calcolo-ral", label: "Calcolo RAL" },
  { href: "/ccnl-metalmeccanico", label: "CCNL Metalmeccanico" },
  { href: "/ccnl-commercio", label: "CCNL Commercio" },
  { href: "/preavviso-dimissioni", label: "Preavviso dimissioni" },
  { href: "/metodologia", label: "Metodologia" },
];

const ctaClass =
  "rounded-full bg-forest px-4 py-2 text-sm font-bold text-white transition duration-200 ease-out hover:-translate-y-0.5 hover:bg-forest-deep hover:shadow-[0_14px_28px_rgba(198,242,78,0.45)] focus-visible:ring-2 focus-visible:ring-[#C6F24E] focus-visible:ring-offset-2 active:translate-y-0 active:scale-[0.98] active:shadow-[0_6px_14px_rgba(0,76,63,0.25)]";

export function Header() {
  const [open, setOpen] = useState(false);
  const [guideOpen, setGuideOpen] = useState(false);
  const menuId = useId();
  const desktopMenuId = useId();
  const mobileGuideId = useId();
  const desktopRef = useRef<HTMLDivElement>(null);
  const mobileGuideRef = useRef<HTMLDivElement>(null);
  const desktopButtonRef = useRef<HTMLButtonElement>(null);
  const mobileButtonRef = useRef<HTMLButtonElement>(null);
  const skipGuideFocus = useRef(false);

  useEffect(() => {
    if (!open && !guideOpen) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      if (guideOpen) {
        skipGuideFocus.current = true;
        setGuideOpen(false);
        (open ? mobileButtonRef : desktopButtonRef).current?.focus();
        return;
      }
      setOpen(false);
    }
    function onPointerDown(event: globalThis.PointerEvent) {
      const target = event.target;
      if (!(target instanceof Node)) return;
      if (desktopRef.current?.contains(target) || mobileGuideRef.current?.contains(target)) return;
      setGuideOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open, guideOpen]);

  function openGuideFromPointer(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType === "mouse") setGuideOpen(true);
  }

  function closeGuideFromPointer(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse") return;
    const root = event.currentTarget;
    if (root instanceof HTMLElement && root.contains(document.activeElement)) return;
    setGuideOpen(false);
  }

  function openGuideFromFocus(event: FocusEvent<HTMLDivElement>) {
    if (skipGuideFocus.current) {
      skipGuideFocus.current = false;
      return;
    }
    const target = event.target;
    if (target instanceof HTMLElement && !target.matches(":focus-visible")) return;
    setGuideOpen(true);
  }

  function closeGuideOnBlur(event: FocusEvent<HTMLDivElement>) {
    const next = event.relatedTarget;
    if (next instanceof Node && event.currentTarget.contains(next)) return;
    setGuideOpen(false);
  }

  function closeMenus() {
    setOpen(false);
    setGuideOpen(false);
  }

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-36 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
        <a
          href="#inizio"
          className="group flex flex-col items-start gap-0.5 rounded-2xl px-3 py-1 text-sm font-bold tracking-tight text-forest focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C6F24E] focus-visible:ring-offset-2 md:w-1/5 md:shrink-0"
        >
          <span className="h-[110px] w-[110px] overflow-hidden rounded-full transition duration-200 ease-out hover:-translate-y-0.5 hover:shadow-[0_14px_28px_rgba(198,242,78,0.45)] active:translate-y-0 active:scale-[0.98]">
            <Image src="/logo.webp" alt="StipendioNetto — logo" width={110} height={110} className="h-[110px] w-[110px] object-cover" priority />
          </span>
          <span className="transition-colors duration-200 group-hover:text-lime">StipendioNetto</span>
        </a>

        <nav className="hidden w-3/5 shrink-0 items-center justify-center gap-4 whitespace-nowrap lg:gap-6 md:flex" aria-label="Sezioni della pagina">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="whitespace-nowrap text-sm font-extrabold text-forest hover:text-lime">
              {link.label}
            </Link>
          ))}
          <div
            ref={desktopRef}
            className="relative"
            onPointerEnter={openGuideFromPointer}
            onPointerLeave={closeGuideFromPointer}
            onFocus={openGuideFromFocus}
            onBlur={closeGuideOnBlur}
          >
            <button
              ref={desktopButtonRef}
              type="button"
              className="inline-flex items-center gap-1 text-sm font-extrabold text-forest hover:text-lime"
              aria-expanded={guideOpen}
              aria-haspopup="true"
              aria-controls={desktopMenuId}
              onClick={() => setGuideOpen(true)}
            >
              Guide
              <span aria-hidden="true" className="text-[10px]">
                ▾
              </span>
            </button>
            {guideOpen ? (
              <div id={desktopMenuId} className="absolute top-full right-0 z-50 pt-2">
                <ul className="w-72 rounded-xl border border-line bg-white py-1 shadow-[0_12px_28px_rgba(0,76,63,0.12)]">
                  {guideLinks.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="block px-4 py-2 text-sm text-ink hover:bg-mint hover:text-forest"
                        onClick={() => setGuideOpen(false)}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </nav>

        <div className="flex items-center justify-end gap-2 md:w-1/5 md:shrink-0">
          <Link href="/#calcolatore" className={`hidden sm:inline-flex md:hidden lg:inline-flex ${ctaClass}`}>
            Vai al calcolatore
          </Link>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line text-forest md:hidden"
            aria-expanded={open}
            aria-controls={menuId}
            onClick={() => {
              setOpen((value) => !value);
              setGuideOpen(false);
            }}
          >
            <span className="sr-only">{open ? "Chiudi il menu" : "Apri il menu"}</span>
            <span aria-hidden="true" className="flex w-4 flex-col gap-1">
              <span className="h-0.5 w-full bg-forest" />
              <span className="h-0.5 w-full bg-forest" />
              <span className="h-0.5 w-full bg-forest" />
            </span>
          </button>
        </div>
      </div>

      {open ? (
        <nav id={menuId} className="border-t border-line bg-white px-4 py-3 md:hidden" aria-label="Menu mobile">
          <ul className="flex flex-col">
            {links.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="block py-2.5 text-sm font-extrabold text-forest" onClick={closeMenus}>
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <div
                ref={mobileGuideRef}
                onFocus={openGuideFromFocus}
                onBlur={closeGuideOnBlur}
              >
                <button
                  ref={mobileButtonRef}
                  type="button"
                  className="flex w-full items-center justify-between py-2.5 text-left text-sm font-extrabold text-forest"
                  aria-expanded={guideOpen}
                  aria-haspopup="true"
                  aria-controls={mobileGuideId}
                  onClick={() => setGuideOpen((value) => !value)}
                >
                  Guide
                  <span aria-hidden="true">{guideOpen ? "−" : "+"}</span>
                </button>
                {guideOpen ? (
                  <ul id={mobileGuideId} className="pb-1">
                    {guideLinks.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="block py-2 pl-3 text-sm text-forest"
                          onClick={closeMenus}
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </li>
            <li>
              <Link href="/#calcolatore" className={`mt-2 inline-flex ${ctaClass}`} onClick={closeMenus}>
                Vai al calcolatore
              </Link>
            </li>
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
