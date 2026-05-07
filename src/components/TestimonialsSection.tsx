"use client";
import { useRef, useEffect, useState } from "react";
import gsap from "gsap";

const LOGOS = {
  l1: "https://www.figma.com/api/mcp/asset/5079b1bb-465d-4515-9a45-6c4ff4a5c258",
  l2: "https://www.figma.com/api/mcp/asset/41470b3d-9c2f-4b03-bbef-f7365161ff30",
  l3: "https://www.figma.com/api/mcp/asset/bfbfc810-10f3-4a9a-82de-8052826712dd",
  l4: "https://www.figma.com/api/mcp/asset/87a3a320-fe4a-42ab-9a2b-afedcafb8f2a",
};

const TESTIMONIALS = [
  {
    logo: LOGOS.l1, logoW: 143,
    quote: "A brilliant creative partner who transformed our vision into a unique, high-impact brand identity. Their ability to craft everything from custom mascots to polished logos is truly impressive.",
    name: "Marko Stojković",
    rotateDeg: -6.85, left: "9.3%", top: "148px",
  },
  {
    logo: LOGOS.l2, logoW: 138,
    quote: "Professional, precise, and incredibly fast at handling complex product visualizations and templates.",
    name: "Lukas Weber",
    rotateDeg: 2.9, left: "49.2%", top: "235px",
  },
  {
    logo: LOGOS.l3, logoW: 109,
    quote: "A strategic partner who balances stunning aesthetics with high-performance UX for complex platforms. They don't just make things look good; they solve business problems through visual clarity.",
    name: "Sarah Jenkins",
    rotateDeg: 2.23, left: "23.4%", top: "545px",
  },
  {
    logo: LOGOS.l4, logoW: 81,
    quote: "An incredibly versatile designer who delivers consistent quality across a wide range of styles and formats.",
    name: "Sofia Martínez",
    rotateDeg: -4.15, left: "70.8%", top: "540px",
  },
];

export default function TestimonialsSection() {
  const [idx, setIdx] = useState(0);
  const cardRefs  = useRef<(HTMLDivElement | null)[]>([]);
  const activeIdx = useRef<number | null>(null);
  const trackRef  = useRef<HTMLDivElement>(null);
  const dotsRef   = useRef<(HTMLButtonElement | null)[]>([]);

  const prev = () => setIdx((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  const next = () => setIdx((i) => (i + 1) % TESTIMONIALS.length);

  useEffect(() => {
    cardRefs.current.forEach((el, i) => {
      if (el) gsap.set(el, { rotation: TESTIMONIALS[i].rotateDeg });
    });
    dotsRef.current.forEach((dot, i) => {
      if (dot) gsap.set(dot, { backgroundColor: i === 0 ? "#000000" : "#d1d5db" });
    });
  }, []);

  useEffect(() => {
    if (trackRef.current)
      gsap.to(trackRef.current, { x: `-${idx * 100}%`, duration: 0.5, ease: "power2.inOut" });
    dotsRef.current.forEach((dot, i) => {
      if (dot) gsap.to(dot, { backgroundColor: i === idx ? "#000000" : "#d1d5db", duration: 0.2, ease: "none" });
    });
  }, [idx]);

  const onEnter = (i: number) => {
    if (activeIdx.current === i) return;
    activeIdx.current = i;
    if (cardRefs.current[i]) {
      gsap.to(cardRefs.current[i], {
        rotation: 0,
        scale: 1.06,
        duration: 0.4,
        ease: "power2.out",
        overwrite: "auto",
      });
    }
  };

  const onLeave = (i: number) => {
    if (activeIdx.current !== i) return;
    activeIdx.current = null;
    if (cardRefs.current[i]) {
      gsap.to(cardRefs.current[i], {
        rotation: TESTIMONIALS[i].rotateDeg,
        scale: 1,
        duration: 0.7,
        ease: "elastic.out(1, 0.4)",
        overwrite: "auto",
      });
    }
  };

  return (
    <section className="bg-white w-full">

      {/* ── Desktop ── */}
      <div className="hidden md:block relative overflow-hidden px-8 py-[120px] min-h-[960px]">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
          <p className="font-inter font-medium capitalize text-black text-center leading-[1.1] tracking-[-0.07em] text-[clamp(80px,13.75vw,198px)] whitespace-nowrap">
            Testimonials
          </p>
        </div>

        {TESTIMONIALS.map((t, i) => (
          <div
            key={t.name}
            ref={(el) => { cardRefs.current[i] = el; }}
            className="absolute cursor-pointer"
            style={{ left: t.left, top: t.top }}
            onMouseEnter={() => onEnter(i)}
            onMouseLeave={() => onLeave(i)}
          >
            <div className="bg-[#f1f1f1] border border-[#ddd] rounded-[4px] p-6 flex flex-col gap-4 w-[353px] pointer-events-none">
              <img src={t.logo} alt="" width={t.logoW} className="h-5 object-contain object-left" />
              <p className="font-inter font-normal text-[18px] leading-[1.3] tracking-[-0.04em] text-[#1f1f1f]">{t.quote}</p>
              <p className="font-inter font-black text-[16px] leading-[1.1] tracking-[-0.04em] uppercase text-black">{t.name}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ── Mobile ── */}
      <div className="block md:hidden px-4 py-16">
        <p className="font-inter font-medium capitalize text-black leading-[0.8] tracking-[-0.07em] text-[64px] mb-10">
          Testimonials
        </p>

        <div className="overflow-hidden">
          <div ref={trackRef} className="flex">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="w-full shrink-0 flex justify-center py-4">
                <div
                  className="bg-[#f1f1f1] border border-[#ddd] rounded-[4px] p-6 flex flex-col gap-4 w-[260px]"
                  style={{ transform: `rotate(${t.rotateDeg}deg)` }}
                >
                  <img src={t.logo} alt="" width={t.logoW} className="h-5 object-contain object-left" />
                  <p className="font-inter font-normal text-[18px] leading-[1.3] tracking-[-0.04em] text-[#1f1f1f]">{t.quote}</p>
                  <p className="font-inter font-black text-[16px] leading-[1.1] tracking-[-0.04em] uppercase text-black">{t.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-center gap-6 mt-6">
          <button onClick={prev} aria-label="Previous" className="w-8 h-8 flex items-center justify-center rounded-full border border-[#1f1f1f] text-[#1f1f1f]">
            ‹
          </button>
          <div className="flex gap-2">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                ref={(el) => { dotsRef.current[i] = el; }}
                onClick={() => setIdx(i)}
                aria-label={`Go to testimonial ${i + 1}`}
                className="w-2 h-2 rounded-full"
              />
            ))}
          </div>
          <button onClick={next} aria-label="Next" className="w-8 h-8 flex items-center justify-center rounded-full border border-[#1f1f1f] text-[#1f1f1f]">
            ›
          </button>
        </div>
      </div>

    </section>
  );
}
