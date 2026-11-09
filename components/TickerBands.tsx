const DARK = "CALCOLA IL TUO NETTO ✦ SCAGLIONI 2026 ✦ NIENTE SEGRETI ✦ ";
const LIME = "IL TUO STIPENDIO, CHIARO ✦ IN UN MINUTO ✦ GRATIS, SENZA REGISTRAZIONE ✦ ";

function Track({
  text,
  className,
}: {
  text: string;
  className: string;
}) {
  const line = text.repeat(2);
  return (
    <div className={`inline-flex w-max whitespace-nowrap will-change-transform ${className}`}>
      <span className="pr-8">{line}</span>
      <span className="pr-8" aria-hidden="true">
        {line}
      </span>
    </div>
  );
}

export function TickerBands() {
  return (
    <div className="overflow-hidden pt-6 pb-12" aria-hidden="true">
      <div className="origin-center -rotate-[1.6deg] scale-[1.03] overflow-hidden bg-[#004C3F] py-3 text-[21px] font-black tracking-wide text-white uppercase">
        <Track text={DARK} className="ticker-track-dark" />
      </div>
      <div className="mt-[-8px] origin-center rotate-[1.2deg] scale-[1.03] overflow-hidden bg-[#C6F24E] py-3 text-[21px] font-black tracking-wide text-[#004C3F] uppercase">
        <Track text={LIME} className="ticker-track-lime" />
      </div>
    </div>
  );
}
