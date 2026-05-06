"use client";

import { useRef } from "react";
import gsap from "gsap";

const LABEL_SM = "font-mono text-[14px] leading-[1.1] uppercase text-white";
const DESC = "Placeholder description of this service. Explain the value you provide and the outcomes clients can expect. Keep it to two or three sentences.";

const SERVICES = [
  {
    num: "[ 1 ]",
    name: "Brand Discovery",
    desc: DESC,
    img: "https://www.figma.com/api/mcp/asset/04676100-ddb2-45ab-996a-706f2a78c821",
  },
  {
    num: "[ 2 ]",
    name: "Web Design & Dev",
    desc: DESC,
    img: "https://www.figma.com/api/mcp/asset/6eddb007-ced2-48a3-9adb-49450af3b5c1",
  },
  {
    num: "[ 3 ]",
    name: "Marketing",
    desc: DESC,
    img: "https://www.figma.com/api/mcp/asset/50e0497d-c8bb-4414-91ff-3b57d6de0632",
  },
  {
    num: "[ 4 ]",
    name: "Photography",
    desc: DESC,
    img: "https://www.figma.com/api/mcp/asset/c9346587-58de-4548-bdb6-dc42b269b03c",
  },
];

export default function ServicesSection() {
  const itemRefs   = useRef<(HTMLDivElement | null)[]>([]);
  const nameRefs   = useRef<(HTMLParagraphElement | null)[]>([]);
  const imgRefs    = useRef<(HTMLImageElement | null)[]>([]);
  const activeIdx  = useRef<number | null>(null);

  const onEnter = (i: number) => {
    if (activeIdx.current === i) return;
    activeIdx.current = i;
    // Dim all other rows
    itemRefs.current.forEach((el, j) => {
      if (j !== i) gsap.to(el, { opacity: 0.3, duration: 0.35, ease: "power2.out", overwrite: "auto" });
    });
    // Shift name right
    gsap.to(nameRefs.current[i], { x: 14, duration: 0.35, ease: "power2.out", overwrite: "auto" });
    // Zoom thumbnail
    gsap.to(imgRefs.current[i], { scale: 1.1, duration: 0.5, ease: "power2.out", overwrite: "auto" });
  };

  const onLeave = (i: number) => {
    if (activeIdx.current !== i) return;
    activeIdx.current = null;
    // Restore all rows
    itemRefs.current.forEach((el) => {
      gsap.to(el, { opacity: 1, duration: 0.4, ease: "power2.out", overwrite: "auto" });
    });
    // Spring name back
    gsap.to(nameRefs.current[i], { x: 0, duration: 0.7, ease: "elastic.out(1, 0.45)", overwrite: "auto" });
    // Shrink thumbnail
    gsap.to(imgRefs.current[i], { scale: 1, duration: 0.5, ease: "power2.out", overwrite: "auto" });
  };

  return (
    <section data-nav-theme="dark" className="bg-black w-full px-8 py-20 max-md:px-4 max-md:py-12">

      {/* [ services ] */}
      <p className={`${LABEL_SM} mb-12 max-md:mb-8`}>[ services ]</p>

      {/* [4]  Deliverables */}
      <div className="flex items-center justify-between w-full mb-12 max-md:mb-8">
        <p className="font-inter font-light text-[clamp(32px,6.67vw,96px)] leading-none tracking-[-0.08em] uppercase text-white">
          [4]
        </p>
        <p className="font-inter font-light text-[clamp(32px,6.67vw,96px)] leading-none tracking-[-0.08em] uppercase text-white">
          Deliverables
        </p>
      </div>

      {/* Service list */}
      <div className="flex flex-col gap-12">
        {SERVICES.map((s, i) => (
          <div
            key={s.num}
            ref={(el) => { itemRefs.current[i] = el; }}
            onMouseEnter={() => onEnter(i)}
            onMouseLeave={() => onLeave(i)}
            className="flex flex-col gap-[9px] cursor-default"
          >
            {/* Number + rule */}
            <p className={LABEL_SM}>{s.num}</p>
            <div className="w-full border-t border-white/40" />

            {/* Desktop: name left, desc+image right | Mobile: stacked */}
            <div className="flex items-start justify-between gap-6 pt-[9px] max-md:flex-col max-md:gap-4">
              {/* Service name */}
              <p
                ref={(el) => { nameRefs.current[i] = el; }}
                className="font-inter font-bold italic text-[36px] leading-[1.1] tracking-[-0.04em] uppercase text-white whitespace-nowrap shrink-0 pointer-events-none"
              >
                {s.name}
              </p>

              {/* Description + thumbnail */}
              <div className="flex items-start gap-6 max-md:flex-col">
                <p className="font-inter font-normal text-[14px] leading-[1.3] tracking-[-0.04em] text-white w-[393px] max-md:w-full">
                  {s.desc}
                </p>
                <div className="shrink-0 size-[151px] overflow-hidden">
                  <img
                    ref={(el) => { imgRefs.current[i] = el; }}
                    src={s.img}
                    alt={s.name}
                    className="w-full h-full object-cover pointer-events-none"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}
