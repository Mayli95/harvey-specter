"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const DEFAULT_TAGLINE =
  "Four core disciplines. One cohesive studio. Every project built around your vision and delivered with precision.";

export type ServicesHeroData = {
  heroTagline: string | null;
};

export default function ServicesPageHero({ data }: { data?: ServicesHeroData }) {
  const tagline       = data?.heroTagline ?? DEFAULT_TAGLINE;
  const sectionRef    = useRef<HTMLElement>(null);
  const leftGroupRef  = useRef<HTMLDivElement>(null);
  const ampRef        = useRef<HTMLSpanElement>(null);
  const rightGroupRef = useRef<HTMLDivElement>(null);
  const delivRef      = useRef<HTMLSpanElement>(null);
  const copyRef       = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section    = sectionRef.current;
    const leftGroup  = leftGroupRef.current;
    const amp        = ampRef.current;
    const rightGroup = rightGroupRef.current;

    if (!section || !leftGroup || !amp || !rightGroup) return;

    const syncCopyWidth = () => {
      if (delivRef.current && copyRef.current) {
        copyRef.current.style.maxWidth = `${delivRef.current.offsetWidth}px`;
      }
    };
    syncCopyWidth();
    window.addEventListener("resize", syncCopyWidth);

    gsap.set([leftGroup, amp, rightGroup], { opacity: 0, y: 24 });
    gsap.to([leftGroup, amp, rightGroup], {
      opacity: 1, y: 0,
      duration: 0.9, stagger: 0.15,
      ease: "power3.out", delay: 0.2,
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "bottom top",
        scrub: 1,
      },
    });

    tl.to(leftGroup,  { x: "-35vw", ease: "none" }, 0)
      .to([amp, rightGroup], { x: "35vw", ease: "none" }, 0);

    return () => {
      window.removeEventListener("resize", syncCopyWidth);
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-white w-full flex flex-col overflow-hidden md:h-screen"
    >
      {/* Navbar spacer */}
      <div className="shrink-0" style={{ height: "68px" }} />

      {/* Content — vertically centred on desktop, padded on mobile */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 py-12 max-md:px-4 max-md:py-10">
        <div className="flex flex-col items-center gap-2">

          {/* Left group: label + SERVICES — drifts left */}
          <div ref={leftGroupRef} className="inline-block">
            <p className="font-mono text-[13px] leading-[1.1] uppercase text-[#1f1f1f] mb-2">
              [ what we do ]
            </p>
            <span className="block font-inter font-bold leading-[0.9] tracking-[-0.04em] uppercase text-black whitespace-nowrap text-[clamp(52px,8.5vw,122px)] max-md:text-[64px]">
              Services
            </span>
          </div>

          {/* Ampersand — centred, drifts right */}
          <span
            ref={ampRef}
            className="font-playfair italic leading-[0.9] text-[#2a2a2a] select-none text-[clamp(52px,8.5vw,122px)] max-md:text-[64px]"
          >
            &amp;
          </span>

          {/* Right group: DELIVERABLES + copy — drifts right */}
          <div ref={rightGroupRef} className="inline-block">
            <span
              ref={delivRef}
              className="inline-block font-inter font-bold leading-[0.9] tracking-[-0.04em] uppercase text-black whitespace-nowrap text-[clamp(52px,8.5vw,122px)] max-md:text-[64px]"
            >
              Deliverables
            </span>
            <p
              ref={copyRef}
              className="font-inter font-normal text-[14px] leading-[1.5] tracking-[-0.04em] text-[#1f1f1f] mt-4"
            >
              {tagline}
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
