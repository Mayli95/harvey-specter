"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const LABEL_SM = "font-mono text-[14px] leading-[1.1] uppercase text-[#1f1f1f]";
const HEADING = "font-inter font-light uppercase leading-[0.84] tracking-[-0.08em] text-black whitespace-nowrap";

export default function BioSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const dRefs = useRef<(HTMLElement | null)[]>([]);
  const mRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const sts: ScrollTrigger[] = [];

    [dRefs, mRefs].forEach((refs) => {
      const lines = refs.current.filter(Boolean) as HTMLElement[];
      if (lines.length === 0) return;

      gsap.set(lines, { opacity: 0.12 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 40%",
          scrub: 1.5,
        },
      });

      lines.forEach((line, i) => {
        tl.to(line, { opacity: 1, ease: "none", duration: 1 }, i === 0 ? 0 : "<0.35");
      });

      if (tl.scrollTrigger) sts.push(tl.scrollTrigger);
    });

    return () => sts.forEach((st) => st.kill());
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-white px-8 py-[120px] max-md:px-4 max-md:py-12">
      <div className="flex flex-col gap-3 mb-6">
        <p className={`${LABEL_SM} text-right w-full`}>[ 8+ years in industry ]</p>
        <div className="w-full border-t border-[#1f1f1f]" />
      </div>

      {/* ── Desktop (md+) ── */}
      <div className="hidden md:flex flex-col gap-2">
        <div className="flex items-start gap-3">
          <p ref={(el) => { dRefs.current[0] = el; }} className={`${HEADING} text-[clamp(48px,6.67vw,96px)]`}>
            A creative director&nbsp;&nbsp;&nbsp;/
          </p>
          <span className={`${LABEL_SM} shrink-0 mt-1`}>001</span>
        </div>

        <p ref={(el) => { dRefs.current[1] = el; }} className={`${HEADING} text-[clamp(48px,6.67vw,96px)] pl-[15.6%]`}>
          Photographer
        </p>

        <p ref={(el) => { dRefs.current[2] = el; }} className={`${HEADING} text-[clamp(48px,6.67vw,96px)] pl-[44.3%]`}>
          Born{" "}
          <span className="font-playfair italic normal-case">&amp;</span>
          {" "}raised
        </p>

        <p ref={(el) => { dRefs.current[3] = el; }} className={`${HEADING} text-[clamp(48px,6.67vw,96px)]`}>
          on the south side
        </p>

        <div className="flex items-end gap-4 pl-[44%]">
          <p ref={(el) => { dRefs.current[4] = el; }} className={`${HEADING} text-[clamp(48px,6.67vw,96px)]`}>
            of chicago.
          </p>
          <span className={`${LABEL_SM} shrink-0 mb-2`}>[ creative freelancer ]</span>
        </div>
      </div>

      {/* ── Mobile ── */}
      <div className="flex md:hidden flex-col items-center gap-2">
        <div className="flex flex-col items-center gap-3">
          <span className={LABEL_SM}>001</span>
          <p ref={(el) => { mRefs.current[0] = el; }} className={`${HEADING} text-[32px] text-center`}>
            A creative director&nbsp;&nbsp;&nbsp;/
          </p>
        </div>

        <p ref={(el) => { mRefs.current[1] = el; }} className={`${HEADING} text-[32px] text-center`}>Photographer</p>

        <p ref={(el) => { mRefs.current[2] = el; }} className={`${HEADING} text-[32px] text-center`}>
          Born{" "}
          <span className="font-playfair italic normal-case">&amp;</span>
          {" "}raised
        </p>

        <p ref={(el) => { mRefs.current[3] = el; }} className={`${HEADING} text-[32px] text-center`}>on the south side</p>

        <div className="flex flex-col items-center gap-3">
          <p ref={(el) => { mRefs.current[4] = el; }} className={`${HEADING} text-[32px] text-center`}>of chicago.</p>
          <span className={LABEL_SM}>[ creative freelancer ]</span>
        </div>
      </div>
    </section>
  );
}
