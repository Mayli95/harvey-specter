"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const PHOTO = "https://www.figma.com/api/mcp/asset/77c8b40c-4a59-4ab9-a981-20d01959bb54";

export default function PhotoSection() {
  const sectionRef    = useRef<HTMLElement>(null);
  const desktopImgRef = useRef<HTMLImageElement>(null);
  const mobileImgRef  = useRef<HTMLImageElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const sts: ScrollTrigger[] = [];

    [desktopImgRef, mobileImgRef].forEach((ref) => {
      const img = ref.current;
      if (!img) return;

      // Scale up slightly so parallax movement never reveals edges
      gsap.set(img, { scale: 1.15 });

      // Blur clears over the first 50% of the section entering the viewport
      const t1 = gsap.fromTo(
        img,
        { filter: "blur(20px)" },
        {
          filter: "blur(0px)",
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "center center",
            scrub: 1.5,
          },
        }
      );
      if (t1.scrollTrigger) sts.push(t1.scrollTrigger);

      // Parallax: image drifts upward as section scrolls through viewport
      const t2 = gsap.fromTo(
        img,
        { y: "6vh" },
        {
          y: "-6vh",
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
          },
        }
      );
      if (t2.scrollTrigger) sts.push(t2.scrollTrigger);
    });

    return () => sts.forEach((st) => st.kill());
  }, []);

  return (
    <section ref={sectionRef} data-nav-theme="dark" className="w-full overflow-hidden">
      {/* Desktop */}
      <div className="hidden md:block w-full aspect-[3/2]">
        <img
          ref={desktopImgRef}
          src={PHOTO}
          alt="Photographer with camera"
          className="w-full h-full object-cover object-center"
          style={{ willChange: "transform, filter" }}
        />
      </div>

      {/* Mobile */}
      <div className="block md:hidden w-full aspect-[390/550]">
        <img
          ref={mobileImgRef}
          src={PHOTO}
          alt="Photographer with camera"
          className="w-full h-full object-cover object-[65%_center]"
          style={{ willChange: "transform, filter" }}
        />
      </div>
    </section>
  );
}
