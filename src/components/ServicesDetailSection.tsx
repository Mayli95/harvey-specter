"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export type ServiceItem = {
  name:        string;
  description: string;
  imageUrl:    string | null;
  tags:        string[] | null;
};

export type ServicesDetailData = {
  services: ServiceItem[] | null;
};

const DEFAULT_DESC =
  "Placeholder description of this service. Explain the value you provide and the outcomes clients can expect. Keep it to two or three sentences that are genuine and specific to what you deliver.";

const DEFAULT_SERVICES: ServiceItem[] = [
  {
    name: "Brand Discovery",
    description: DEFAULT_DESC,
    imageUrl: "https://www.figma.com/api/mcp/asset/04676100-ddb2-45ab-996a-706f2a78c821",
    tags: ["Brand strategy", "Visual identity", "Logo & mark", "Brand guidelines"],
  },
  {
    name: "Web Design & Dev",
    description: DEFAULT_DESC,
    imageUrl: "https://www.figma.com/api/mcp/asset/6eddb007-ced2-48a3-9adb-49450af3b5c1",
    tags: ["UI/UX design", "Responsive build", "CMS integration", "Performance"],
  },
  {
    name: "Marketing",
    description: DEFAULT_DESC,
    imageUrl: "https://www.figma.com/api/mcp/asset/50e0497d-c8bb-4414-91ff-3b57d6de0632",
    tags: ["Social strategy", "Content creation", "Paid media", "Analytics"],
  },
  {
    name: "Photography",
    description: DEFAULT_DESC,
    imageUrl: "https://www.figma.com/api/mcp/asset/c9346587-58de-4548-bdb6-dc42b269b03c",
    tags: ["Art direction", "On-location", "Studio sessions", "Post-production"],
  },
];

function ServiceTag({ label }: { label: string }) {
  return (
    <span className="bg-[#1f1f1f] px-3 py-1 rounded-full font-inter font-medium text-[13px] tracking-[-0.04em] text-white whitespace-nowrap">
      {label}
    </span>
  );
}

export default function ServicesDetailSection({ data }: { data?: ServicesDetailData }) {
  const services = (data?.services?.length ? data.services : null) ?? DEFAULT_SERVICES;
  const imgRefs  = useRef<(HTMLImageElement | null)[]>([]);
  const rowRefs  = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const sts: ScrollTrigger[] = [];

    rowRefs.current.filter(Boolean).forEach((el) => {
      const t = gsap.fromTo(
        el,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 85%", end: "top 55%", scrub: 1 },
        }
      );
      if (t.scrollTrigger) sts.push(t.scrollTrigger);
    });

    return () => sts.forEach((st) => st.kill());
  }, []);

  const onEnter = (i: number) => {
    if (imgRefs.current[i])
      gsap.to(imgRefs.current[i], { scale: 1.05, duration: 0.6, ease: "power2.out", overwrite: "auto" });
  };

  const onLeave = (i: number) => {
    if (imgRefs.current[i])
      gsap.to(imgRefs.current[i], { scale: 1, duration: 0.6, ease: "power2.inOut", overwrite: "auto" });
  };

  return (
    <section className="bg-white w-full px-8 pb-20 max-md:px-4 max-md:pb-12">
      <div className="flex flex-col">
        {services.map((s, i) => {
          const imageLeft = i % 2 === 0;
          return (
            <div
              key={i}
              ref={(el) => { rowRefs.current[i] = el; }}
              className="border-t border-[#1f1f1f]/20 py-16 max-md:py-10"
            >
              <p className="font-mono text-[14px] leading-[1.1] uppercase text-[#1f1f1f] mb-6">[ {i + 1} ]</p>

              {/* ── Desktop: alternating image position ── */}
              <div
                className={`hidden md:flex items-start gap-12 ${imageLeft ? "" : "flex-row-reverse"}`}
                onMouseEnter={() => onEnter(i)}
                onMouseLeave={() => onLeave(i)}
              >
                {/* Image */}
                <div className="w-[58%] shrink-0 overflow-hidden aspect-[4/3]">
                  {s.imageUrl ? (
                    <img
                      ref={(el) => { imgRefs.current[i] = el; }}
                      src={s.imageUrl}
                      alt={s.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-neutral-200" />
                  )}
                </div>

                {/* Content */}
                <div className="flex flex-col justify-between flex-1 self-stretch py-2">
                  <div className="flex flex-col gap-6">
                    <p className="font-inter font-bold italic text-[clamp(32px,3.5vw,52px)] leading-[1.05] tracking-[-0.04em] uppercase text-black">
                      {s.name}
                    </p>
                    <p className="font-inter font-normal text-[14px] leading-[1.4] tracking-[-0.04em] text-[#1f1f1f]">
                      {s.description}
                    </p>
                  </div>

                  {s.tags && s.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-8">
                      {s.tags.map((tag) => (
                        <ServiceTag key={tag} label={tag} />
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* ── Mobile: stacked ── */}
              <div className="flex md:hidden flex-col gap-6">
                {s.imageUrl && (
                  <div className="w-full overflow-hidden aspect-[4/3]">
                    <img
                      src={s.imageUrl}
                      alt={s.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <p className="font-inter font-bold italic text-[28px] leading-[1.05] tracking-[-0.04em] uppercase text-black">
                  {s.name}
                </p>
                <p className="font-inter font-normal text-[14px] leading-[1.4] tracking-[-0.04em] text-[#1f1f1f]">
                  {s.description}
                </p>
                {s.tags && s.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {s.tags.map((tag) => (
                      <ServiceTag key={tag} label={tag} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
