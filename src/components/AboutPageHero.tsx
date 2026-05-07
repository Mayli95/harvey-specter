"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import LetsTalkButton from "./ui/LetsTalkButton";

const DEFAULT_PORTRAIT = "https://www.figma.com/api/mcp/asset/ff67d0be-2093-4b44-8593-cf3bee260534";
const DEFAULT_TAGLINE  = "Creative director, photographer & storyteller based in Chicago. Crafting digital experiences that are as intentional as they are beautiful.";

export type AboutHeroData = {
  portraitUrl: string | null;
  tagline: string | null;
};

export default function AboutPageHero({ data }: { data?: AboutHeroData }) {
  const portrait = data?.portraitUrl ?? DEFAULT_PORTRAIT;
  const tagline  = data?.tagline     ?? DEFAULT_TAGLINE;

  const lineRefs   = useRef<(HTMLElement | null)[]>([]);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const lines = lineRefs.current.filter(Boolean);
    gsap.set(lines, { opacity: 0, y: 40 });
    gsap.to(lines, {
      opacity: 1,
      y: 0,
      duration: 0.9,
      stagger: 0.1,
      ease: "power3.out",
      delay: 0.2,
    });

    if (overlayRef.current) {
      gsap.to(overlayRef.current, {
        scaleX: 0,
        transformOrigin: "right center",
        duration: 1.2,
        ease: "power3.inOut",
        delay: 0.5,
      });
    }
  }, []);

  return (
    <section data-nav-theme="dark" className="bg-black w-full px-8 pt-[140px] pb-20 max-md:px-4 max-md:pt-[120px] max-md:pb-12">

      {/* ── Desktop ── */}
      <div className="hidden md:flex items-start justify-between gap-12">
        {/* Left */}
        <div className="flex flex-col gap-12 flex-1">
          <div className="flex items-start justify-between">
            <p className="font-mono text-[14px] leading-[1.1] uppercase text-white/50">[ about ]</p>
            <p className="font-mono text-[14px] leading-[1.1] text-white/50">005</p>
          </div>

          <div>
            <p
              ref={(el) => { lineRefs.current[0] = el; }}
              className="font-inter font-light text-[clamp(64px,8.5vw,128px)] leading-[0.86] tracking-[-0.08em] uppercase text-white"
            >
              Harvey
            </p>
            <p
              ref={(el) => { lineRefs.current[1] = el; }}
              className="font-inter font-light text-[clamp(64px,8.5vw,128px)] leading-[0.86] tracking-[-0.08em] uppercase text-white"
            >
              Specter
            </p>
          </div>

          <div className="flex items-end justify-between gap-8">
            <p
              ref={(el) => { lineRefs.current[2] = el as HTMLElement; }}
              className="font-inter font-normal text-[14px] leading-[1.3] tracking-[-0.04em] text-white/70 max-w-[280px]"
            >
              {tagline}
            </p>
            <div ref={(el) => { lineRefs.current[3] = el; }}>
              <LetsTalkButton href="#contact" variant="outline" />
            </div>
          </div>
        </div>

        {/* Right: portrait */}
        <div className="relative shrink-0 w-[420px] max-xl:w-[320px] aspect-[3/4] overflow-hidden">
          <img src={portrait} alt="Harvey Specter" className="w-full h-full object-cover" />
          <div ref={overlayRef} className="absolute inset-0 bg-black pointer-events-none" />
        </div>
      </div>

      {/* ── Mobile ── */}
      <div className="flex md:hidden flex-col gap-8">
        <div className="flex items-start justify-between">
          <p className="font-mono text-[14px] leading-[1.1] uppercase text-white/50">[ about ]</p>
          <p className="font-mono text-[14px] leading-[1.1] text-white/50">005</p>
        </div>

        <div className="relative w-full aspect-[3/4] overflow-hidden">
          <img src={portrait} alt="Harvey Specter" className="w-full h-full object-cover object-top" />
        </div>

        <div>
          <p className="font-inter font-light text-[48px] leading-[0.86] tracking-[-0.08em] uppercase text-white">Harvey</p>
          <p className="font-inter font-light text-[48px] leading-[0.86] tracking-[-0.08em] uppercase text-white">Specter</p>
        </div>

        <p className="font-inter font-normal text-[14px] leading-[1.3] tracking-[-0.04em] text-white/70">{tagline}</p>

        <LetsTalkButton href="#contact" variant="outline" />
      </div>

    </section>
  );
}
