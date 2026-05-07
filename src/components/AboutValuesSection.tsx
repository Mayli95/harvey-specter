"use client";

import { useRef } from "react";
import gsap from "gsap";

const LABEL_SM = "font-mono text-[14px] leading-[1.1] uppercase text-white";

export type AboutValue = { name: string; description: string };

export type AboutValuesData = {
  values: AboutValue[] | null;
};

const DEFAULT_VALUES: AboutValue[] = [
  {
    name: "Authenticity",
    description:
      "Every project begins with truth. Understanding a client's genuine identity — not just their aspirations — is what creates work that resonates and endures beyond the trend cycle.",
  },
  {
    name: "Excellence",
    description:
      "Good enough is never good enough. Every pixel, every word, every interaction is an opportunity to push the craft further and deliver something that exceeds expectations.",
  },
  {
    name: "Collaboration",
    description:
      "The best work happens in dialogue. I partner closely with clients, treating their insights as essential ingredients rather than obstacles to be managed.",
  },
  {
    name: "Intention",
    description:
      "Nothing is added without purpose. Every creative decision is deliberate — serving the goal, the audience, and the story being told.",
  },
];

export default function AboutValuesSection({ data }: { data?: AboutValuesData }) {
  const values = (data?.values?.length ? data.values : null) ?? DEFAULT_VALUES;

  const itemRefs  = useRef<(HTMLDivElement | null)[]>([]);
  const nameRefs  = useRef<(HTMLParagraphElement | null)[]>([]);
  const activeIdx = useRef<number | null>(null);

  const onEnter = (i: number) => {
    if (activeIdx.current === i) return;
    activeIdx.current = i;
    itemRefs.current.forEach((el, j) => {
      if (j !== i) gsap.to(el, { opacity: 0.3, duration: 0.35, ease: "power2.out", overwrite: "auto" });
    });
    gsap.to(nameRefs.current[i], { x: 14, duration: 0.35, ease: "power2.out", overwrite: "auto" });
  };

  const onLeave = (i: number) => {
    if (activeIdx.current !== i) return;
    activeIdx.current = null;
    itemRefs.current.forEach((el) => {
      gsap.to(el, { opacity: 1, duration: 0.4, ease: "power2.out", overwrite: "auto" });
    });
    gsap.to(nameRefs.current[i], { x: 0, duration: 0.7, ease: "elastic.out(1, 0.45)", overwrite: "auto" });
  };

  return (
    <section data-nav-theme="dark" className="bg-black w-full px-8 py-20 max-md:px-4 max-md:py-12">

      <p className={`${LABEL_SM} mb-12 max-md:mb-8`}>[ philosophy ]</p>

      <div className="flex items-center justify-between w-full mb-12 max-md:mb-8">
        <p className="font-inter font-light text-[clamp(32px,6.67vw,96px)] leading-none tracking-[-0.08em] uppercase text-white">
          [{values.length}]
        </p>
        <p className="font-inter font-light text-[clamp(32px,6.67vw,96px)] leading-none tracking-[-0.08em] uppercase text-white">
          Core Values
        </p>
      </div>

      <div className="flex flex-col gap-12">
        {values.map((v, i) => (
          <div
            key={i}
            ref={(el) => { itemRefs.current[i] = el; }}
            onMouseEnter={() => onEnter(i)}
            onMouseLeave={() => onLeave(i)}
            className="flex flex-col gap-[9px] cursor-default"
          >
            <p className={LABEL_SM}>[ {i + 1} ]</p>
            <div className="w-full border-t border-white/40" />
            <div className="flex items-start justify-between gap-6 pt-[9px] max-md:flex-col max-md:gap-3">
              <p
                ref={(el) => { nameRefs.current[i] = el; }}
                className="font-inter font-bold italic text-[36px] leading-[1.1] tracking-[-0.04em] uppercase text-white whitespace-nowrap shrink-0 pointer-events-none"
              >
                {v.name}
              </p>
              <p className="font-inter font-normal text-[14px] leading-[1.3] tracking-[-0.04em] text-white w-[393px] max-md:w-full">
                {v.description}
              </p>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}
