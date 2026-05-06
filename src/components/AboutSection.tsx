"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const PHOTO = "https://www.figma.com/api/mcp/asset/ff67d0be-2093-4b44-8593-cf3bee260534";

const LABEL_SM = "font-mono text-[14px] leading-[1.1] uppercase text-[#1f1f1f]";
const BODY = "font-inter font-normal text-[14px] leading-[1.3] tracking-[-0.04em] text-[#1f1f1f]";
const BIO =
  "Placeholder paragraph one. This is where you introduce yourself — your background, your passion for your craft, and what drives you creatively. Two to three sentences work best here. Placeholder paragraph two. Here you can describe your technical approach, how you collaborate with clients, or what sets your work apart from others in your field.";

function BracketFrame({ children }: { children: React.ReactNode }) {
  const c = "absolute w-4 h-4 border-[#1f1f1f]";
  return (
    <div className="relative px-5 py-3">
      <span className={`${c} top-0 left-0 border-t border-l`} />
      <span className={`${c} top-0 right-0 border-t border-r`} />
      <span className={`${c} bottom-0 left-0 border-b border-l`} />
      <span className={`${c} bottom-0 right-0 border-b border-r`} />
      {children}
    </div>
  );
}

function Portrait({
  overlayRef,
  className,
}: {
  overlayRef: React.RefObject<HTMLDivElement | null>;
  className?: string;
}) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Image is 2px larger on every side — overflow-hidden clips it flush to the container */}
      <div className="absolute inset-[-2px]">
        <img
          src={PHOTO}
          alt="Portrait"
          className="w-full h-full object-cover"
        />
      </div>
      {/* Overlay is exactly inset-0 = same pixels as the visible container */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-black pointer-events-none"
      />
    </div>
  );
}

export default function AboutSection() {
  const sectionRef        = useRef<HTMLElement>(null);
  const driftRef          = useRef<HTMLDivElement>(null);
  const desktopOverlayRef = useRef<HTMLDivElement>(null);
  const mobileOverlayRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const sts: ScrollTrigger[] = [];

    // Desktop bio drifts left — mobile stays still
    if (driftRef.current) {
      const t = gsap.to(driftRef.current, {
        x: "-12vw",
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top center",
          end: "bottom top",
          scrub: 1.5,
        },
      });
      if (t.scrollTrigger) sts.push(t.scrollTrigger);
    }

    // Portrait reveal: overlay scaleX 1→0, right-anchored
    [desktopOverlayRef, mobileOverlayRef].forEach((ref) => {
      const el = ref.current;
      if (!el) return;
      const t = gsap.fromTo(
        el,
        { scaleX: 1, transformOrigin: "right center" },
        {
          scaleX: 0,
          transformOrigin: "right center",
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "top center",
            scrub: 1.5,
          },
        }
      );
      if (t.scrollTrigger) sts.push(t.scrollTrigger);
    });

    return () => sts.forEach((st) => st.kill());
  }, []);

  return (
    <section ref={sectionRef} className="bg-white w-full px-8 py-20 max-md:px-4 max-md:py-12">

      {/* ── Desktop (md+) ── */}
      <div className="hidden md:flex items-start justify-between">
        <p className={`${LABEL_SM} shrink-0`}>[ About ]</p>

        <div className="flex flex-1 items-end gap-8 ml-8">
          {/* Bio text — drifts left on scroll */}
          <div ref={driftRef} className="flex-1">
            <BracketFrame>
              <p className={BODY}>{BIO}</p>
            </BracketFrame>
          </div>

          <div className="flex flex-col gap-6 shrink-0">
            <p className={LABEL_SM}>002</p>
            <Portrait
              overlayRef={desktopOverlayRef}
              className="w-[436px] aspect-[436/614] max-xl:w-[320px]"
            />
          </div>
        </div>
      </div>

      {/* ── Mobile ── */}
      <div className="flex md:hidden flex-col gap-5">
        <p className={LABEL_SM}>002</p>
        <p className={LABEL_SM}>[ About ]</p>

        {/* Bio — no drift on mobile */}
        <BracketFrame>
          <p className={BODY}>{BIO}</p>
        </BracketFrame>

        <Portrait
          overlayRef={mobileOverlayRef}
          className="w-full aspect-[422/594]"
        />
      </div>

    </section>
  );
}
