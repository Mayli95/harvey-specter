"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const LABEL_SM = "font-mono text-[14px] leading-[1.1] uppercase text-[#1f1f1f]";

export type ProcessStep = { title: string; description: string };

export type ProcessData = {
  processSteps: ProcessStep[] | null;
};

const DEFAULT_STEPS: ProcessStep[] = [
  {
    title: "Discovery",
    description:
      "We start by understanding your world — your goals, your audience, and the competitive landscape. Through workshops and research we uncover the insight that makes your brand distinct.",
  },
  {
    title: "Strategy",
    description:
      "Insights become direction. We define the positioning, messaging, and visual language that will guide every creative decision throughout the project.",
  },
  {
    title: "Creation",
    description:
      "Design, build, photograph, write. The strategy comes to life across every touchpoint — crafted with precision and pushed until it feels right.",
  },
  {
    title: "Delivery",
    description:
      "We hand over production-ready assets with full documentation, brand guidelines, and any ongoing support your team needs to launch with confidence.",
  },
];

export default function ProcessSection({ data }: { data?: ProcessData }) {
  const steps = (data?.processSteps?.length ? data.processSteps : null) ?? DEFAULT_STEPS;

  const sectionRef = useRef<HTMLElement>(null);
  const rowRefs    = useRef<(HTMLDivElement | null)[]>([]);
  const numRefs    = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const sts: ScrollTrigger[] = [];

    rowRefs.current.filter(Boolean).forEach((el, i) => {
      const num = numRefs.current[i];

      gsap.set(el,  { opacity: 0 });
      gsap.set(num, { y: 30 });

      const t = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top 82%",
          end: "top 55%",
          scrub: 1.2,
        },
      });

      t.to(el,  { opacity: 1, ease: "none" }, 0)
       .to(num, { y: 0, ease: "power2.out" }, 0);

      if (t.scrollTrigger) sts.push(t.scrollTrigger);
    });

    return () => sts.forEach((st) => st.kill());
  }, []);

  return (
    <section ref={sectionRef} className="bg-white w-full px-8 py-[120px] max-md:px-4 max-md:py-12">

      {/* ── Section label ── */}
      <div className="flex flex-col gap-3 mb-16 max-md:mb-10">
        <div className="flex items-center justify-between">
          <p className={LABEL_SM}>[ process ]</p>
          <p className={LABEL_SM}>008</p>
        </div>
        <div className="w-full border-t border-[#1f1f1f]" />
      </div>

      {/* ── Heading ── */}
      <div className="flex items-center justify-between mb-16 max-md:mb-10">
        <p className="font-inter font-light text-[clamp(32px,6.67vw,96px)] leading-none tracking-[-0.08em] uppercase text-black">
          [{steps.length}]
        </p>
        <p className="font-inter font-light text-[clamp(32px,6.67vw,96px)] leading-none tracking-[-0.08em] uppercase text-black">
          Steps
        </p>
      </div>

      {/* ── Step list ── */}
      <div className="flex flex-col">
        {steps.map((step, i) => (
          <div
            key={i}
            ref={(el) => { rowRefs.current[i] = el; }}
            className="flex items-start gap-8 py-10 border-b border-[#1f1f1f]/20 max-md:flex-col max-md:gap-3 max-md:py-8"
          >
            {/* Step number */}
            <span
              ref={(el) => { numRefs.current[i] = el; }}
              className="font-inter font-light text-[clamp(48px,5vw,80px)] leading-[0.9] tracking-[-0.06em] text-black shrink-0 w-[120px] max-md:w-auto"
            >
              {String(i + 1).padStart(2, "0")}
            </span>

            {/* Title + description */}
            <div className="flex flex-1 items-start justify-between gap-12 pt-2 max-md:flex-col max-md:gap-3">
              <p className="font-inter font-semibold text-[24px] leading-[1.1] tracking-[-0.04em] text-black shrink-0 max-md:text-[20px]">
                {step.title}
              </p>
              <p className="font-inter font-normal text-[14px] leading-[1.3] tracking-[-0.04em] text-[#1f1f1f] max-w-[520px] max-md:max-w-full">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}
