"use client";

import { useRef } from "react";
import gsap from "gsap";
import LetsTalkButton from "./ui/LetsTalkButton";

export type Project = {
  _id: string;
  title: string;
  imageUrl: string | null;
  tags: string[];
  isTall: boolean;
};

function ArrowIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden>
      <path
        d="M9 23L23 9M23 9H11M23 9V21"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Tag({ label }: { label: string }) {
  return (
    <span className="bg-neutral-800/70 px-3 py-1 rounded-full font-inter font-medium text-[14px] tracking-[-0.04em] text-white whitespace-nowrap">
      {label}
    </span>
  );
}

function ProjectCard({
  img,
  title,
  tags,
  tall,
}: {
  img: string | null;
  title: string;
  tags: string[];
  tall: boolean;
}) {
  return (
    <div className="flex flex-col gap-[10px]">
      {/* Image with tags */}
      <div
        className={[
          "relative w-full overflow-hidden flex flex-col justify-end pb-4 pl-4",
          tall ? "h-[744px] max-xl:h-[600px]" : "h-[699px] max-xl:h-[560px]",
          "max-md:h-[520px]",
        ].join(" ")}
      >
        {img ? (
          <img
            src={img}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          />
        ) : (
          <div className="absolute inset-0 bg-neutral-200 pointer-events-none" />
        )}
        <div className="relative flex gap-3 items-center pointer-events-none">
          {[...new Set(tags)].map((t) => (
            <Tag key={t} label={t} />
          ))}
        </div>
      </div>

      {/* Title + arrow */}
      <div className="flex items-center justify-between pointer-events-none">
        <p className="font-inter font-black leading-[1.1] tracking-[-0.04em] uppercase text-black text-[36px] max-md:text-[24px] whitespace-nowrap">
          {title}
        </p>
        <span className="shrink-0 text-black">
          <ArrowIcon />
        </span>
      </div>
    </div>
  );
}

function BracketCTA() {
  const c = "absolute w-4 h-4 border-[#1f1f1f]";
  return (
    <div className="relative px-5 py-3">
      <span className={`${c} top-0 left-0 border-t border-l`} />
      <span className={`${c} top-0 right-0 border-t border-r`} />
      <span className={`${c} bottom-0 left-0 border-b border-l`} />
      <span className={`${c} bottom-0 right-0 border-b border-r`} />
      <div className="flex flex-col gap-[10px]">
        <p className="font-inter italic font-normal text-[14px] leading-[1.3] tracking-[-0.04em] text-[#1f1f1f]">
          Discover how my creativity transforms ideas into impactful digital
          experiences — schedule a call with me to get started.
        </p>
        <LetsTalkButton href="#contact" />
      </div>
    </div>
  );
}

function useCardHover(count: number) {
  const refs   = useRef<(HTMLDivElement | null)[]>([]);
  const active = useRef<number | null>(null);

  const enter = (i: number) => {
    if (active.current === i) return;
    active.current = i;
    refs.current.forEach((el, j) => {
      if (!el) return;
      if (j === i) {
        gsap.set(el, { zIndex: 10 });
        gsap.to(el, { scale: 1.04, duration: 0.5, ease: "power2.out", overwrite: "auto" });
      } else {
        gsap.to(el, { opacity: 0.55, scale: 1, duration: 0.4, ease: "power2.out", overwrite: "auto" });
      }
    });
  };

  const leave = (i: number) => {
    if (active.current !== i) return;
    active.current = null;
    refs.current.forEach((el) => {
      if (!el) return;
      gsap.set(el, { zIndex: 0 });
      gsap.to(el, { scale: 1, opacity: 1, duration: 0.5, ease: "power2.inOut", overwrite: "auto" });
    });
  };

  // suppress unused-variable warning for count
  void count;

  return { refs, enter, leave };
}

export default function WorkSection({ projects }: { projects: Project[] }) {
  const d = useCardHover(projects.length); // desktop
  const m = useCardHover(projects.length); // mobile

  return (
    <section className="bg-white w-full px-8 py-20 max-md:px-4 max-md:py-12">

      {/* ── Header ── */}
      <div className="hidden md:flex items-start justify-between mb-[61px]">
        <div className="flex items-start gap-[10px]">
          <div className="font-inter font-light text-[96px] leading-[0.86] tracking-[-0.08em] uppercase text-black">
            <p>Selected</p>
            <p>Work</p>
          </div>
          <span className="font-mono text-[14px] leading-[1.1] text-[#1f1f1f] mt-1">004</span>
        </div>
        <div className="flex items-center justify-center w-[15px] h-[110px]">
          <p className="font-mono text-[14px] leading-[1.1] uppercase text-[#1f1f1f] whitespace-nowrap -rotate-90">
            [ portfolio ]
          </p>
        </div>
      </div>

      <div className="flex md:hidden flex-col gap-4 mb-8">
        <p className="font-mono text-[14px] leading-[1.1] uppercase text-[#1f1f1f]">[ portfolio ]</p>
        <div className="flex items-start justify-between">
          <div className="font-inter font-light text-[32px] leading-[0.86] tracking-[-0.08em] uppercase text-black">
            <p>Selected</p>
            <p>Work</p>
          </div>
          <span className="font-mono text-[14px] leading-[1.1] text-[#1f1f1f]">004</span>
        </div>
      </div>

      {/* ── Desktop: two staggered columns ── */}
      <div className="hidden md:flex gap-6 items-end">
        {/* Left column */}
        <div className="flex flex-1 flex-col justify-between self-stretch">
          {projects[0] && (
            <div
              ref={(el) => { d.refs.current[0] = el; }}
              onMouseEnter={() => d.enter(0)}
              onMouseLeave={() => d.leave(0)}
              className="relative cursor-pointer"
            >
              <ProjectCard img={projects[0].imageUrl} title={projects[0].title} tags={projects[0].tags} tall={projects[0].isTall} />
            </div>
          )}
          {projects[1] && (
            <div
              ref={(el) => { d.refs.current[1] = el; }}
              onMouseEnter={() => d.enter(1)}
              onMouseLeave={() => d.leave(1)}
              className="relative cursor-pointer"
            >
              <ProjectCard img={projects[1].imageUrl} title={projects[1].title} tags={projects[1].tags} tall={projects[1].isTall} />
            </div>
          )}
          <BracketCTA />
        </div>

        {/* Right column */}
        <div className="flex flex-1 flex-col gap-[117px] pt-[240px]">
          {projects[2] && (
            <div
              ref={(el) => { d.refs.current[2] = el; }}
              onMouseEnter={() => d.enter(2)}
              onMouseLeave={() => d.leave(2)}
              className="relative cursor-pointer"
            >
              <ProjectCard img={projects[2].imageUrl} title={projects[2].title} tags={projects[2].tags} tall={projects[2].isTall} />
            </div>
          )}
          {projects[3] && (
            <div
              ref={(el) => { d.refs.current[3] = el; }}
              onMouseEnter={() => d.enter(3)}
              onMouseLeave={() => d.leave(3)}
              className="relative cursor-pointer"
            >
              <ProjectCard img={projects[3].imageUrl} title={projects[3].title} tags={projects[3].tags} tall={projects[3].isTall} />
            </div>
          )}
        </div>
      </div>

      {/* ── Mobile: single column ── */}
      <div className="flex md:hidden flex-col gap-12">
        {projects.map((p, i) => (
          <div
            key={p._id}
            ref={(el) => { m.refs.current[i] = el; }}
            onMouseEnter={() => m.enter(i)}
            onMouseLeave={() => m.leave(i)}
            className="relative cursor-pointer"
          >
            <ProjectCard img={p.imageUrl} title={p.title} tags={p.tags} tall={false} />
          </div>
        ))}
        <BracketCTA />
      </div>

    </section>
  );
}
