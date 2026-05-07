"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LetsTalkButton from "./ui/LetsTalkButton";

const NAV_LINKS: { label: string; href: string }[] = [
  { label: "About",    href: "/about"    },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "#projects" },
  { label: "News",     href: "#news"     },
  { label: "Contact",  href: "#contact"  },
];

export default function Navbar() {
  const [isDark, setIsDark] = useState(false);
  const menuRef      = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const closeBtnRef  = useRef<HTMLButtonElement>(null);
  const itemEls      = useRef<HTMLElement[]>([]);
  const logoRef      = useRef<HTMLAnchorElement>(null);
  const navLinksRef  = useRef<(HTMLAnchorElement | null)[]>([]);
  const barsRef      = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const darkSections = document.querySelectorAll('[data-nav-theme="dark"]');
    const triggers: ReturnType<typeof ScrollTrigger.create>[] = [];

    let darkCount = 0;

    const applyNavColor = (dark: boolean) => {
      const color = dark ? "#ffffff" : "#000000";

      // Logo
      if (logoRef.current)
        gsap.to(logoRef.current, { color, duration: 0.5, ease: "power2.inOut" });

      // Desktop nav links
      navLinksRef.current.forEach((el) => {
        if (el) gsap.to(el, { color, duration: 0.5, ease: "power2.inOut" });
      });

      // Mobile hamburger bars
      barsRef.current.forEach((el) => {
        if (el) gsap.to(el, { backgroundColor: color, duration: 0.5, ease: "power2.inOut" });
      });
    };

    const updateTheme = (entering: boolean) => {
      darkCount = Math.max(0, darkCount + (entering ? 1 : -1));
      const dark = darkCount > 0;
      setIsDark(dark);
      applyNavColor(dark);
    };

    darkSections.forEach((section) => {
      triggers.push(
        ScrollTrigger.create({
          trigger: section as Element,
          start: "top 80px",
          end: "bottom 0px",
          onEnter:     () => updateTheme(true),
          onLeave:     () => updateTheme(false),
          onEnterBack: () => updateTheme(true),
          onLeaveBack: () => updateTheme(false),
        })
      );
    });

    return () => triggers.forEach((t) => t.kill());
  }, []);

  useEffect(() => {
    gsap.set(menuRef.current, { display: "none" });
  }, []);

  const openMenu = () => {
    const menu  = menuRef.current!;
    const btn   = hamburgerRef.current!;
    const items = itemEls.current.filter(Boolean);

    const { top, right } = btn.getBoundingClientRect();
    const cx = `${((right / window.innerWidth) * 100).toFixed(1)}%`;
    const cy = `${((top / window.innerHeight) * 100).toFixed(1)}%`;

    gsap.set(menu, { display: "flex", clipPath: `circle(0% at ${cx} ${cy})` });
    gsap.set(items, { y: 20, opacity: 0 });

    gsap.timeline()
      .to(menu, { clipPath: `circle(150% at ${cx} ${cy})`, duration: 0.55, ease: "power3.inOut" })
      .to(items, { y: 0, opacity: 1, duration: 0.35, stagger: 0.07, ease: "power3.out" }, "-=0.15");
  };

  const closeMenu = () => {
    const menu  = menuRef.current!;
    const btn   = closeBtnRef.current!;
    const items = itemEls.current.filter(Boolean);

    const { top, right } = btn.getBoundingClientRect();
    const cx = `${((right / window.innerWidth) * 100).toFixed(1)}%`;
    const cy = `${((top / window.innerHeight) * 100).toFixed(1)}%`;

    gsap.timeline({
      onComplete: () => gsap.set(menu, { display: "none" }),
    })
      .to(items, { y: -10, opacity: 0, duration: 0.2, stagger: { each: 0.04, from: "end" }, ease: "power2.in" })
      .to(menu, { clipPath: `circle(0% at ${cx} ${cy})`, duration: 0.45, ease: "power3.inOut" }, "-=0.05");
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6 max-md:px-4">
        <a
          ref={logoRef}
          href="/"
          className="font-inter font-semibold text-[16px] capitalize tracking-[-0.04em] text-black"
        >
          H.Studio
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex list-none items-center gap-14">
          {NAV_LINKS.map((link, i) => (
            <li key={link.label}>
              <a
                ref={(el) => { navLinksRef.current[i] = el; }}
                href={link.href}
                className="font-inter font-semibold text-[16px] capitalize tracking-[-0.04em] text-black"
                onMouseEnter={() => gsap.to(navLinksRef.current[i], { opacity: 0.7, duration: 0.15, ease: "power2.out", overwrite: "auto" })}
                onMouseLeave={() => gsap.to(navLinksRef.current[i], { opacity: 1, duration: 0.2, ease: "power2.out", overwrite: "auto" })}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop CTA — switches between solid (light bg) and outline (dark bg) */}
        <div className="hidden md:block">
          <LetsTalkButton
            href="#contact"
            variant={isDark ? "outline" : "solid"}
            noHoverInvert={!isDark}
          />
        </div>

        {/* Mobile hamburger */}
        <button
          ref={hamburgerRef}
          onClick={openMenu}
          aria-label="Open navigation menu"
          className="md:hidden flex h-6 w-6 flex-col items-center justify-center gap-[5px]"
        >
          <span ref={(el) => { if (el) barsRef.current[0] = el; }} className="block h-[2px] w-5 bg-black" />
          <span ref={(el) => { if (el) barsRef.current[1] = el; }} className="block h-[2px] w-5 bg-black" />
          <span ref={(el) => { if (el) barsRef.current[2] = el; }} className="block h-[2px] w-5 bg-black" />
        </button>
      </nav>

      {/* Mobile full-screen menu */}
      <div
        ref={menuRef}
        className="fixed inset-0 z-[60] flex flex-col bg-black px-4 py-6"
      >
        <div className="mb-8 flex items-center justify-between">
          <span className="font-inter font-semibold text-[16px] capitalize tracking-[-0.04em] text-white">
            H.Studio
          </span>
          <button
            ref={closeBtnRef}
            onClick={closeMenu}
            aria-label="Close navigation menu"
            className="text-xl leading-none text-white"
          >
            ✕
          </button>
        </div>
        <nav className="flex flex-col">
          {NAV_LINKS.map((link, i) => (
            <a
              key={link.label}
              ref={(el) => { if (el) itemEls.current[i] = el; }}
              href={link.href}
              className="font-inter font-semibold border-b border-white/10 py-4 text-[16px] capitalize tracking-[-0.04em] text-white"
              onClick={closeMenu}
              onMouseEnter={(e) => gsap.to(e.currentTarget, { opacity: 0.7, duration: 0.15, ease: "power2.out" })}
              onMouseLeave={(e) => gsap.to(e.currentTarget, { opacity: 1, duration: 0.2, ease: "power2.out" })}
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div
          ref={(el) => { if (el) itemEls.current[NAV_LINKS.length] = el; }}
          className="mt-6"
        >
          <LetsTalkButton href="#contact" variant="outline" onClick={closeMenu} />
        </div>
      </div>
    </>
  );
}
