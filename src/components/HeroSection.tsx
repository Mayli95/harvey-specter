"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LetsTalkButton from "./ui/LetsTalkButton";

const HERO_IMAGE_DESKTOP = "/hero-desktop.png";
const HERO_IMAGE_MOBILE  = "/hero-mobile.png";

export default function HeroSection() {
  const sectionRef    = useRef<HTMLElement>(null);

  // Parallax refs
  const bgDesktopRef  = useRef<HTMLImageElement>(null);
  const bgMobileRef   = useRef<HTMLImageElement>(null);
  const helloRef      = useRef<HTMLParagraphElement>(null);
  const harveyRef     = useRef<HTMLSpanElement>(null);
  const specterRef    = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const hello   = helloRef.current;
    const harvey  = harveyRef.current;
    const specter = specterRef.current;
    const bgD     = bgDesktopRef.current;
    const bgM     = bgMobileRef.current;

    if (!section || !hello || !harvey || !specter) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "bottom top",
        scrub: 1,
      },
    });

    tl.to(hello,   { x: "-55vw", ease: "none" }, 0)
      .to(harvey,  { x: "-60vw", ease: "none" }, 0)
      .to(specter, { x:  "60vw", ease: "none" }, 0)
      .to([bgD, bgM].filter(Boolean), {
        scale: 1.25,
        transformOrigin: "top center",
        ease: "none",
      }, 0);

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative h-[847px] w-full overflow-hidden">
      {/* Background images */}
      <img
        ref={bgDesktopRef}
        src={HERO_IMAGE_DESKTOP}
        alt=""
        aria-hidden
        className="absolute inset-0 hidden w-full h-full object-cover object-top pointer-events-none select-none md:block"
      />
      <img
        ref={bgMobileRef}
        src={HERO_IMAGE_MOBILE}
        alt=""
        aria-hidden
        className="absolute inset-0 w-full h-full object-cover object-top pointer-events-none select-none md:hidden"
      />

      {/* Frosted glass overlay at bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[349px] backdrop-blur-[10px] pointer-events-none"
        style={{
          WebkitMaskImage: "linear-gradient(to top, black 55%, transparent 100%)",
          maskImage: "linear-gradient(to top, black 55%, transparent 100%)",
        }}
      />

      {/* ── Desktop layout ── */}
      <div className="relative hidden h-full flex-col gap-[240px] px-8 md:flex">
        {/* Spacer matching the fixed nav height so content sits in the same position */}
        <div className="h-[72px]" />

        {/* Hero content */}
        <div className="flex w-full flex-col">
          <div>
            <div className="px-[18px]">
              <p ref={helloRef} className="font-mono text-[14px] leading-[1.1] uppercase text-white mix-blend-overlay">
                [ Hello i&apos;m ]
              </p>
            </div>
            <h1 className="font-inter font-medium w-full flex justify-between items-baseline text-[clamp(80px,13.75vw,198px)] capitalize leading-[1.1] tracking-[-0.07em] text-white mix-blend-overlay">
              <span ref={harveyRef}>Harvey</span>
              <span ref={specterRef}>Specter</span>
            </h1>
          </div>

          <div className="flex justify-end">
            <div className="flex w-[294px] flex-col gap-[17px]">
              <p className="font-inter font-bold italic text-[14px] uppercase leading-[1.1] tracking-[-0.04em] text-[#1f1f1f]">
                H.Studio is a{" "}
                <span className="font-normal">full-service</span>
                {" "}creative studio creating beautiful digital experiences and
                products. We are an{" "}
                <span className="font-normal">award winning</span>
                {" "}desing and art group specializing in branding, web design and
                engineering.
              </p>
              <LetsTalkButton href="#contact" />
            </div>
          </div>
        </div>
      </div>

      {/* ── Mobile layout ── */}
      <div className="relative flex h-full flex-col justify-end px-4 pb-6 md:hidden">
        <div className="flex flex-col items-center gap-8">
          <div className="flex w-full flex-col items-center">
            <p className="font-mono text-[14px] leading-[1.1] uppercase text-white mix-blend-overlay">
              [ Hello i&apos;m ]
            </p>
            <h1 className="font-inter font-medium w-full text-center text-[96px] capitalize leading-[0.8] tracking-[-0.07em] text-white mix-blend-overlay whitespace-pre-wrap">
              {`Harvey   Specter`}
            </h1>
          </div>

          <div className="mx-auto flex w-[293px] flex-col items-center gap-[17px] text-center">
            <p className="font-inter font-bold italic text-[14px] uppercase leading-[1.1] tracking-[-0.04em] text-[#1f1f1f]">
              H.Studio is a{" "}
              <span className="font-normal">full-service</span>
              {" "}creative studio creating beautiful digital experiences and
              products. We are an{" "}
              <span className="font-normal">award winning</span>
              {" "}desing and art group specializing in branding, web design and
              engineering.
            </p>
            <LetsTalkButton href="#contact" />
          </div>
        </div>
      </div>

    </section>
  );
}
