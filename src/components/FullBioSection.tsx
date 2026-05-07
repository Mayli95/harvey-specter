"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const LABEL_SM = "font-mono text-[14px] leading-[1.1] uppercase text-[#1f1f1f]";
const BODY     = "font-inter font-normal text-[14px] leading-[1.3] tracking-[-0.04em] text-[#1f1f1f]";

function BracketFrame({ children }: { children: React.ReactNode }) {
  const c = "absolute w-4 h-4 border-[#1f1f1f]";
  return (
    <div className="relative px-5 py-4">
      <span className={`${c} top-0 left-0 border-t border-l`} />
      <span className={`${c} top-0 right-0 border-t border-r`} />
      <span className={`${c} bottom-0 left-0 border-b border-l`} />
      <span className={`${c} bottom-0 right-0 border-b border-r`} />
      {children}
    </div>
  );
}

export type BioStat       = { value: string; label: string };
export type BioExperience = { year: string; role: string; place: string };

export type FullBioData = {
  pullQuote:     string | null;
  bioParagraphs: string[] | null;
  stats:         BioStat[] | null;
  experience:    BioExperience[] | null;
};

const DEFAULT_PULL_QUOTE = "“Design is not just what it looks like and feels like. Design is how it works.”";

const DEFAULT_PARAGRAPHS = [
  "Placeholder paragraph one. This is where you introduce yourself — your background, your passion for your craft, and what drives you creatively. Two to three sentences work best here to set the tone.",
  "Placeholder paragraph two. Here you can describe your technical approach, how you collaborate with clients, or what sets your work apart from others in your field. Keep it genuine and specific.",
  "Placeholder paragraph three. Talk about your vision for the future, the kinds of projects you love most, or a defining moment in your career that shaped who you are as a creative.",
];

const DEFAULT_STATS: BioStat[] = [
  { value: "8+",  label: "Years in industry" },
  { value: "60+", label: "Projects delivered" },
  { value: "12",  label: "Industry awards"   },
  { value: "3",   label: "Continents worked" },
];

const DEFAULT_EXPERIENCE: BioExperience[] = [
  { year: "2020 — Present", role: "Creative Director",  place: "H.Studio — Chicago"          },
  { year: "2017 — 2020",    role: "Senior Photographer", place: "Aperture Agency — New York"  },
  { year: "2014 — 2017",    role: "Art Director",        place: "Momentum Creative — London"  },
  { year: "2012 — 2014",    role: "Junior Designer",     place: "Pixel & Co. — Chicago"       },
];

export default function FullBioSection({ data }: { data?: FullBioData }) {
  const pullQuote  = data?.pullQuote                              ?? DEFAULT_PULL_QUOTE;
  const paragraphs = (data?.bioParagraphs?.length ? data.bioParagraphs : null) ?? DEFAULT_PARAGRAPHS;
  const stats      = (data?.stats?.length      ? data.stats      : null) ?? DEFAULT_STATS;
  const experience = (data?.experience?.length  ? data.experience  : null) ?? DEFAULT_EXPERIENCE;

  const sectionRef = useRef<HTMLElement>(null);
  const pullRef    = useRef<HTMLParagraphElement>(null);
  const statRefs   = useRef<(HTMLDivElement | null)[]>([]);
  const rowRefs    = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const sts: ScrollTrigger[] = [];

    if (pullRef.current) {
      const t = gsap.fromTo(
        pullRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, ease: "power3.out",
          scrollTrigger: { trigger: pullRef.current, start: "top 80%", end: "top 50%", scrub: 1 },
        }
      );
      if (t.scrollTrigger) sts.push(t.scrollTrigger);
    }

    statRefs.current.filter(Boolean).forEach((el) => {
      const t = gsap.fromTo(
        el,
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0, ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 85%", end: "top 60%", scrub: 1 },
        }
      );
      if (t.scrollTrigger) sts.push(t.scrollTrigger);
    });

    rowRefs.current.filter(Boolean).forEach((el) => {
      const t = gsap.fromTo(
        el,
        { opacity: 0, x: -20 },
        {
          opacity: 1, x: 0, ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 88%", end: "top 65%", scrub: 1 },
        }
      );
      if (t.scrollTrigger) sts.push(t.scrollTrigger);
    });

    return () => sts.forEach((st) => st.kill());
  }, []);

  return (
    <section ref={sectionRef} className="bg-white w-full px-8 py-[120px] max-md:px-4 max-md:py-12">

      {/* ── Section label ── */}
      <div className="flex flex-col gap-3 mb-16 max-md:mb-10">
        <div className="flex items-center justify-between">
          <p className={LABEL_SM}>[ Biography ]</p>
          <p className={LABEL_SM}>006</p>
        </div>
        <div className="w-full border-t border-[#1f1f1f]" />
      </div>

      {/* ── Bio — Desktop ── */}
      <div className="hidden md:flex gap-16 items-start mb-[120px]">
        <div className="flex-1">
          <p ref={pullRef} className="font-inter font-light text-[clamp(28px,3vw,48px)] leading-[1.1] tracking-[-0.06em] text-black">
            {pullQuote}
          </p>
        </div>
        <div className="flex-1">
          <BracketFrame>
            <div className="flex flex-col gap-4">
              {paragraphs.map((p, i) => <p key={i} className={BODY}>{p}</p>)}
            </div>
          </BracketFrame>
        </div>
      </div>

      {/* ── Bio — Mobile ── */}
      <div className="flex md:hidden flex-col gap-6 mb-12">
        <p className="font-inter font-light text-[28px] leading-[1.1] tracking-[-0.06em] text-black">{pullQuote}</p>
        <BracketFrame>
          <div className="flex flex-col gap-4">
            {paragraphs.map((p, i) => <p key={i} className={BODY}>{p}</p>)}
          </div>
        </BracketFrame>
      </div>

      {/* ── Stats ── */}
      <div className="grid grid-cols-4 max-md:grid-cols-2 gap-8 mb-[120px] max-md:mb-12">
        {stats.map((s, i) => (
          <div key={i} ref={(el) => { statRefs.current[i] = el; }} className="flex flex-col gap-2">
            <p className="font-inter font-light text-[clamp(48px,5vw,80px)] leading-[0.9] tracking-[-0.06em] text-black">
              {s.value}
            </p>
            <p className={LABEL_SM}>{s.label}</p>
          </div>
        ))}
      </div>

      {/* ── Timeline label ── */}
      <div className="flex flex-col gap-3 mb-10 max-md:mb-8">
        <p className={LABEL_SM}>[ Experience ]</p>
        <div className="w-full border-t border-[#1f1f1f]" />
      </div>

      {/* ── Timeline ── */}
      <div className="flex flex-col">
        {experience.map((item, i) => (
          <div
            key={i}
            ref={(el) => { rowRefs.current[i] = el; }}
            className="flex items-start gap-8 py-6 border-b border-[#1f1f1f]/20 max-md:flex-col max-md:gap-1 max-md:py-4"
          >
            <p className={`${LABEL_SM} shrink-0 w-[200px] max-md:w-auto`}>{item.year}</p>
            <div className="flex flex-1 items-baseline justify-between gap-4 max-md:flex-col max-md:gap-1">
              <p className="font-inter font-semibold text-[20px] leading-[1.1] tracking-[-0.04em] text-black">{item.role}</p>
              <p className={`${LABEL_SM} text-right max-md:text-left`}>{item.place}</p>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}
