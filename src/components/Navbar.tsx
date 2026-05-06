"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LetsTalkButton from "./ui/LetsTalkButton";

const NAV_LINKS = ["About", "Services", "Projects", "News", "Contact"];

export default function Navbar() {
  const [isDark, setIsDark] = useState(false);
  const menuRef      = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const itemEls      = useRef<HTMLElement[]>([]);

  // Detect dark sections under the nav and toggle colour mode
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const darkSections = document.querySelectorAll('[data-nav-theme="dark"]');
    const triggers: ReturnType<typeof ScrollTrigger.create>[] = [];

    darkSections.forEach((section) => {
      triggers.push(
        ScrollTrigger.create({
          trigger: section as Element,
          start: "top 80px",
          end: "bottom 0px",
          onEnter:     () => setIsDark(true),
          onLeave:     () => setIsDark(false),
          onEnterBack: () => setIsDark(true),
          onLeaveBack: () => setIsDark(false),
        })
      );
    });

    return () => triggers.forEach((t) => t.kill());
  }, []);

  // Hide mobile menu on mount
  useEffect(() => {
    gsap.set(menuRef.current, { display: "none" });
  }, []);

  const openMenu = () => {
    const menu  = menuRef.current!;
    const items = itemEls.current.filter(Boolean);

    gsap.set(menu,  { display: "flex", opacity: 0, clearProps: "clipPath" });
    gsap.set(items, { y: 20, opacity: 0 });

    gsap.timeline()
      .to(menu,  { opacity: 1, duration: 0.15, ease: "none" })
      .to(items, { y: 0, opacity: 1, duration: 0.35, stagger: 0.07, ease: "power3.out" }, "-=0.05");
  };

  const closeMenu = () => {
    const menu  = menuRef.current!;
    const items = itemEls.current.filter(Boolean);

    gsap.timeline({
      onComplete: () => gsap.set(menu, { display: "none", opacity: 1 }),
    })
      .to(items, { y: -10, opacity: 0, duration: 0.2, stagger: { each: 0.04, from: "end" }, ease: "power2.in" })
      .to(menu,  { opacity: 0, duration: 0.15, ease: "none" }, "-=0.05");
  };

  const tc = `transition-colors duration-500 ${isDark ? "text-white" : "text-black"}`;
  const bc = `block h-[2px] w-5 transition-colors duration-500 ${isDark ? "bg-white" : "bg-black"}`;

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6 max-md:px-4">
        <a href="#" className={`font-inter font-semibold text-[16px] capitalize tracking-[-0.04em] ${tc}`}>
          H.Studio
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex list-none items-center gap-14">
          {NAV_LINKS.map((link) => (
            <li key={link}>
              <a
                href={`#${link.toLowerCase()}`}
                className={`font-inter font-semibold text-[16px] capitalize tracking-[-0.04em] hover:opacity-70 ${tc}`}
              >
                {link}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <LetsTalkButton href="#contact" variant={isDark ? "outline" : "solid"} />
        </div>

        {/* Mobile hamburger */}
        <button
          ref={hamburgerRef}
          onClick={openMenu}
          aria-label="Open navigation menu"
          className="md:hidden flex h-6 w-6 flex-col items-center justify-center gap-[5px]"
        >
          <span className={bc} />
          <span className={bc} />
          <span className={bc} />
        </button>
      </nav>

      {/* Mobile full-screen menu */}
      <div
        ref={menuRef}
        className="fixed inset-0 z-[60] flex flex-col bg-white px-4 py-6"
      >
        <div className="mb-8 flex items-center justify-between">
          <span className="font-inter font-semibold text-[16px] capitalize tracking-[-0.04em] text-black">
            H.Studio
          </span>
          <button
            onClick={closeMenu}
            aria-label="Close navigation menu"
            className="text-xl leading-none text-black"
          >
            ✕
          </button>
        </div>
        <nav className="flex flex-col">
          {NAV_LINKS.map((link, i) => (
            <a
              key={link}
              ref={(el) => { if (el) itemEls.current[i] = el; }}
              href={`#${link.toLowerCase()}`}
              className="font-inter font-semibold border-b border-zinc-100 py-4 text-[16px] capitalize tracking-[-0.04em] text-black transition-opacity hover:opacity-70"
              onClick={closeMenu}
            >
              {link}
            </a>
          ))}
        </nav>
        <div
          ref={(el) => { if (el) itemEls.current[NAV_LINKS.length] = el; }}
          className="mt-6"
        >
          <LetsTalkButton href="#contact" onClick={closeMenu} />
        </div>
      </div>
    </>
  );
}
