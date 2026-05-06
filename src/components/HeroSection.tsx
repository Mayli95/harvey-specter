"use client";

import { useRef, useState } from "react";
import gsap from "gsap";

const HERO_IMAGE_DESKTOP = "/hero-desktop.png";
const HERO_IMAGE_MOBILE  = "/hero-mobile.png";

const NAV_LINKS = ["About", "Services", "Projects", "News", "Contact"];

function LetsTalkButton({
  href,
  onClick,
  className,
}: {
  href: string;
  onClick?: () => void;
  className?: string;
}) {
  const btnRef  = useRef<HTMLAnchorElement>(null);
  const top     = useRef<HTMLSpanElement>(null);
  const bottom  = useRef<HTMLSpanElement>(null);

  const onEnter = () => {
    gsap.killTweensOf([btnRef.current, top.current, bottom.current]);
    gsap.to([top.current, bottom.current], {
      y: "-100%",
      duration: 0.45,
      ease: "power3.out",
    });
    gsap.to(btnRef.current, {
      scale: 1.04,
      duration: 0.45,
      ease: "power3.out",
    });
  };

  const onLeave = () => {
    gsap.killTweensOf([btnRef.current, top.current, bottom.current]);
    gsap.to([top.current, bottom.current], {
      y: "0%",
      duration: 0.45,
      ease: "power3.out",
    });
    gsap.to(btnRef.current, {
      scale: 1,
      duration: 0.45,
      ease: "power3.out",
    });
  };

  return (
    <a
      ref={btnRef}
      href={href}
      onClick={onClick}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className={`font-inter font-medium text-[14px] tracking-[-0.04em] rounded-[24px] bg-black text-white inline-flex items-center justify-center px-4 py-3 ${className ?? ""}`}
      style={{ willChange: "transform" }}
    >
      {/* Two stacked copies — top slides out, bottom slides in */}
      <span className="block overflow-hidden" style={{ height: "1em" }}>
        <span ref={top}    className="block leading-none">Let&apos;s talk</span>
        <span ref={bottom} className="block leading-none">Let&apos;s talk</span>
      </span>
    </a>
  );
}

export default function HeroSection() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <section className="relative h-[847px] w-full overflow-hidden">
      {/* Background images */}
      <img
        src={HERO_IMAGE_DESKTOP}
        alt=""
        aria-hidden
        className="absolute inset-0 hidden w-full h-full object-cover object-top pointer-events-none select-none md:block"
      />
      <img
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
        <nav className="flex items-center justify-between py-6">
          <a
            href="#"
            className="font-inter font-semibold text-[16px] capitalize tracking-[-0.04em] text-black"
          >
            H.Studio
          </a>

          <ul className="flex list-none items-center gap-14">
            {NAV_LINKS.map((link) => (
              <li key={link}>
                <a
                  href={`#${link.toLowerCase()}`}
                  className="font-inter font-semibold text-[16px] capitalize tracking-[-0.04em] text-black transition-opacity hover:opacity-70"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>

          <LetsTalkButton href="#contact" />
        </nav>

        {/* Hero content */}
        <div className="flex w-full flex-col">
          <div>
            <div className="px-[18px]">
              <p className="font-mono text-[14px] leading-[1.1] uppercase text-white mix-blend-overlay">
                [ Hello i&apos;m ]
              </p>
            </div>
            <h1 className="font-inter font-medium w-full flex justify-between items-baseline text-[clamp(80px,13.75vw,198px)] capitalize leading-[1.1] tracking-[-0.07em] text-white mix-blend-overlay">
              <span>Harvey</span>
              <span>Specter</span>
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
      <div className="relative flex h-full flex-col justify-between px-4 pb-6 md:hidden">
        <nav className="flex items-center justify-between py-6">
          <a
            href="#"
            className="font-inter font-semibold text-[16px] capitalize tracking-[-0.04em] text-black"
          >
            H.Studio
          </a>
          <button
            onClick={() => setMenuOpen(true)}
            aria-label="Open navigation menu"
            className="flex h-6 w-6 flex-col items-center justify-center gap-[5px]"
          >
            <span className="block h-[2px] w-5 bg-black" />
            <span className="block h-[2px] w-5 bg-black" />
            <span className="block h-[2px] w-5 bg-black" />
          </button>
        </nav>

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

      {/* Mobile full-screen menu */}
      {menuOpen && (
        <div className="absolute inset-0 z-30 flex flex-col bg-white px-4 py-6 md:hidden">
          <div className="mb-8 flex items-center justify-between">
            <span className="font-inter font-semibold text-[16px] capitalize tracking-[-0.04em] text-black">
              H.Studio
            </span>
            <button
              onClick={() => setMenuOpen(false)}
              aria-label="Close navigation menu"
              className="text-xl leading-none text-black"
            >
              ✕
            </button>
          </div>
          <nav className="flex flex-col">
            {NAV_LINKS.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="font-inter font-semibold border-b border-zinc-100 py-4 text-[16px] capitalize tracking-[-0.04em] text-black"
                onClick={() => setMenuOpen(false)}
              >
                {link}
              </a>
            ))}
          </nav>
          <div className="mt-6">
            <LetsTalkButton href="#contact" onClick={() => setMenuOpen(false)} />
          </div>
        </div>
      )}
    </section>
  );
}
