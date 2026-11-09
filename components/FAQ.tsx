import { faqItems } from "@/lib/content/faq";

export function FAQ() {
  return (
    <section id="domande" className="scroll-mt-24 border-t border-line bg-white">
      <div className="mx-auto w-full max-w-3xl px-4 py-12 sm:px-6 md:py-14">
        <h2 className="text-2xl font-semibold tracking-tight text-ink">Domande frequenti</h2>
        <div className="mt-4 space-y-2.5">
          {faqItems.map((item) => (
            <details key={item.question} className="group rounded-[14px] border border-line bg-white px-4 py-3.5">
              <summary className="cursor-pointer list-none font-extrabold text-ink [&::-webkit-details-marker]:hidden">
                <span className="flex items-center justify-between gap-4">
                  {item.question}
                  <span aria-hidden="true" className="font-black text-forest-deep group-open:hidden">
                    +
                  </span>
                  <span aria-hidden="true" className="hidden font-black text-forest-deep group-open:inline">
                    −
                  </span>
                </span>
              </summary>
              <p className="pt-2.5 text-sm leading-6 text-ink">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
