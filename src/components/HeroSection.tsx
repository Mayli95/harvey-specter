"use client";

import { useState } from "react";

const HERO_IMAGE_DESKTOP =
  "https://www.figma.com/api/mcp/asset/8b93e5b6-099b-4597-a734-0a51d57be8ff";
const HERO_IMAGE_MOBILE =
  "https://www.figma.com/api/mcp/asset/0184d919-bb5f-4e8e-8cf3-3d331b887da1";

const NAV_LINKS = ["About", "Services", "Projects", "News", "Contact"];

export default function HeroSection() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <section className="relative h-[847px] w-full overflow-hidden">
      {/* Background images */}
      <img
        src={HERO_IMAGE_DESKTOP}
        alt=""
        aria-hidden
        className="absolute inset-0 hidden w-full h-full object-cover object-[50%_20%] pointer-events-none select-none md:block"
      />
      <img
        src={HERO_IMAGE_MOBILE}
        alt=""
        aria-hidden
        className="absolute inset-0 w-full h-full object-cover object-[35%_top] pointer-events-none select-none md:hidden"
      />

      {/* Frosted glass overlay at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-[349px] backdrop-blur-[10px] pointer-events-none" />

      {/* ── Desktop layout (md+): flex-col with 240px gap ── */}
      <div className="relative z-10 hidden h-full flex-col gap-[240px] px-8 md:flex">
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

          <a
            href="#contact"
            className="font-inter font-medium text-[14px] tracking-[-0.04em] rounded-[24px] bg-black px-4 py-3 text-white"
          >
            Let&apos;s talk
          </a>
        </nav>

        {/* Hero content */}
        <div className="flex w-full flex-col">
          {/* Name + label */}
          <div>
            <div className="px-[18px]">
              <p className="font-mono text-[14px] leading-[1.1] uppercase text-white mix-blend-overlay">
                [ Hello i&apos;m ]
              </p>
            </div>
            <h1 className="font-inter font-medium w-full text-center text-[198px] capitalize leading-[1.1] tracking-[-0.07em] text-white mix-blend-overlay whitespace-pre-wrap">
              {`Harvey   Specter`}
            </h1>
          </div>

          {/* Description — right-aligned */}
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
              <a
                href="#contact"
                className="font-inter font-medium inline-flex w-fit items-center justify-center text-[14px] tracking-[-0.04em] rounded-[24px] bg-black px-4 py-3 text-white"
              >
                Let&apos;s talk
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ── Mobile layout: nav top, content bottom ── */}
      <div className="relative z-10 flex h-full flex-col justify-between px-4 pb-6 md:hidden">
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

        {/* Name + description group — pinned to bottom */}
        <div className="flex h-[341px] flex-col items-center justify-between">
          <div className="flex w-full flex-col items-center">
            <p className="font-mono text-[14px] leading-[1.1] uppercase text-white mix-blend-overlay">
              [ Hello i&apos;m ]
            </p>
            <h1 className="font-inter font-medium w-full text-center text-[96px] capitalize leading-[0.8] tracking-[-0.07em] text-white mix-blend-overlay whitespace-pre-wrap">
              {`Harvey   Specter`}
            </h1>
          </div>

          <div className="flex w-[293px] flex-col gap-[17px]">
            <p className="font-inter font-bold italic text-[14px] uppercase leading-[1.1] tracking-[-0.04em] text-[#1f1f1f]">
              H.Studio is a{" "}
              <span className="font-normal">full-service</span>
              {" "}creative studio creating beautiful digital experiences and
              products. We are an{" "}
              <span className="font-normal">award winning</span>
              {" "}desing and art group specializing in branding, web design and
              engineering.
            </p>
            <a
              href="#contact"
              className="font-inter font-medium inline-flex w-fit items-center justify-center text-[14px] tracking-[-0.04em] rounded-[24px] bg-black px-4 py-3 text-white"
            >
              Let&apos;s talk
            </a>
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
            <a
              href="#contact"
              className="font-inter font-medium inline-flex items-center justify-center text-[14px] tracking-[-0.04em] rounded-[24px] bg-black px-4 py-3 text-white"
              onClick={() => setMenuOpen(false)}
            >
              Let&apos;s talk
            </a>
          </div>
        </div>
      )}
    </section>
  );
}
