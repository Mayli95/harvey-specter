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
    <span className="backdrop-blur-[10px] bg-white/30 px-2 py-1 rounded-full font-inter font-medium text-[14px] tracking-[-0.04em] text-[#111] whitespace-nowrap">
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
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-neutral-200" />
        )}
        <div className="relative flex gap-3 items-center">
          {tags.map((t) => (
            <Tag key={t} label={t} />
          ))}
        </div>
      </div>

      {/* Title + arrow */}
      <div className="flex items-center justify-between">
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
        <a
          href="#contact"
          className="font-inter font-medium text-[14px] tracking-[-0.04em] bg-black text-white rounded-full px-4 py-3 w-fit"
        >
          Let&apos;s talk
        </a>
      </div>
    </div>
  );
}

export default function WorkSection({ projects }: { projects: Project[] }) {
  return (
    <section className="bg-white w-full px-8 py-20 max-md:px-4 max-md:py-12">

      {/* ── Header ── */}
      {/* Desktop */}
      <div className="hidden md:flex items-start justify-between mb-[61px]">
        <div className="flex items-start gap-[10px]">
          <div className="font-inter font-light text-[96px] leading-[0.86] tracking-[-0.08em] uppercase text-black">
            <p>Selected</p>
            <p>Work</p>
          </div>
          <span className="font-mono text-[14px] leading-[1.1] text-[#1f1f1f] mt-1">004</span>
        </div>
        {/* [ portfolio ] rotated vertically */}
        <div className="flex items-center justify-center w-[15px] h-[110px]">
          <p className="font-mono text-[14px] leading-[1.1] uppercase text-[#1f1f1f] whitespace-nowrap -rotate-90">
            [ portfolio ]
          </p>
        </div>
      </div>

      {/* Mobile header */}
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
            <ProjectCard img={projects[0].imageUrl} title={projects[0].title} tags={projects[0].tags} tall={projects[0].isTall} />
          )}
          {projects[1] && (
            <ProjectCard img={projects[1].imageUrl} title={projects[1].title} tags={projects[1].tags} tall={projects[1].isTall} />
          )}
          <BracketCTA />
        </div>

        {/* Right column — 240px top offset */}
        <div className="flex flex-1 flex-col gap-[117px] pt-[240px]">
          {projects[2] && (
            <ProjectCard img={projects[2].imageUrl} title={projects[2].title} tags={projects[2].tags} tall={projects[2].isTall} />
          )}
          {projects[3] && (
            <ProjectCard img={projects[3].imageUrl} title={projects[3].title} tags={projects[3].tags} tall={projects[3].isTall} />
          )}
        </div>
      </div>

      {/* ── Mobile: single column ── */}
      <div className="flex md:hidden flex-col gap-12">
        {projects.map((p) => (
          <ProjectCard key={p._id} img={p.imageUrl} title={p.title} tags={p.tags} tall={false} />
        ))}
        <BracketCTA />
      </div>

    </section>
  );
}
