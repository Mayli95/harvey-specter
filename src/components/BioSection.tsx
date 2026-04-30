const LABEL_SM = "font-mono text-[14px] leading-[1.1] uppercase text-[#1f1f1f]";
const HEADING = "font-inter font-light uppercase leading-[0.84] tracking-[-0.08em] text-black whitespace-nowrap";

export default function BioSection() {
  return (
    <section className="w-full bg-white px-8 py-[120px] max-md:px-4 max-md:py-12">
      {/* [ 8+ years in industry ] + rule */}
      <div className="flex flex-col gap-3 mb-6">
        <p className={`${LABEL_SM} text-right w-full`}>[ 8+ years in industry ]</p>
        <div className="w-full border-t border-[#1f1f1f]" />
      </div>

      {/* ── Desktop (md+) ── */}
      <div className="hidden md:flex flex-col gap-2">
        {/* Line 1: "A creative director   /" + "001" */}
        <div className="flex items-start gap-3">
          <p className={`${HEADING} text-[clamp(48px,6.67vw,96px)]`}>
            A creative director&nbsp;&nbsp;&nbsp;/
          </p>
          <span className={`${LABEL_SM} shrink-0 mt-1`}>001</span>
        </div>

        {/* Line 2: Photographer — indented ~15.6% */}
        <p className={`${HEADING} text-[clamp(48px,6.67vw,96px)] pl-[15.6%]`}>
          Photographer
        </p>

        {/* Line 3: Born & raised — indented ~44.3% */}
        <p className={`${HEADING} text-[clamp(48px,6.67vw,96px)] pl-[44.3%]`}>
          Born{" "}
          <span className="font-playfair italic normal-case">&amp;</span>
          {" "}raised
        </p>

        {/* Line 4: on the south side — full bleed */}
        <p className={`${HEADING} text-[clamp(48px,6.67vw,96px)]`}>
          on the south side
        </p>

        {/* Line 5: of chicago. + "[ creative freelancer ]" — indented ~44% */}
        <div className="flex items-end gap-4 pl-[44%]">
          <p className={`${HEADING} text-[clamp(48px,6.67vw,96px)]`}>
            of chicago.
          </p>
          <span className={`${LABEL_SM} shrink-0 mb-2`}>[ creative freelancer ]</span>
        </div>
      </div>

      {/* ── Mobile ── */}
      <div className="flex md:hidden flex-col items-center gap-2">
        {/* "001" + first line grouped with tighter gap */}
        <div className="flex flex-col items-center gap-3">
          <span className={LABEL_SM}>001</span>
          <p className={`${HEADING} text-[32px] text-center`}>
            A creative director&nbsp;&nbsp;&nbsp;/
          </p>
        </div>

        <p className={`${HEADING} text-[32px] text-center`}>Photographer</p>

        <p className={`${HEADING} text-[32px] text-center`}>
          Born{" "}
          <span className="font-playfair italic normal-case">&amp;</span>
          {" "}raised
        </p>

        <p className={`${HEADING} text-[32px] text-center`}>on the south side</p>

        {/* "of chicago." + label grouped with tighter gap */}
        <div className="flex flex-col items-center gap-3">
          <p className={`${HEADING} text-[32px] text-center`}>of chicago.</p>
          <span className={LABEL_SM}>[ creative freelancer ]</span>
        </div>
      </div>
    </section>
  );
}
