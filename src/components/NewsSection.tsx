"use client";

import { useRef, useState, useEffect } from "react";
import gsap from "gsap";

const IMG_1 = "https://www.figma.com/api/mcp/asset/eed0d90b-959f-46be-8862-025f6caafc5c";
const IMG_2 = "https://www.figma.com/api/mcp/asset/25a5498c-1bb1-43d9-8df7-447626b6e8bb";
const IMG_3 = "https://www.figma.com/api/mcp/asset/4d2199ad-7a9c-4be8-84b6-191d362856f4";

const ARTICLES = [
  { img: IMG_1, text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
  { img: IMG_2, text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
  { img: IMG_3, text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
];

function NorthEastArrow() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
      <path
        d="M4.5 13.5L13.5 4.5M13.5 4.5H6M13.5 4.5V12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArticleCard({ img, text, tall }: { img: string; text: string; tall: boolean }) {
  const imgRef = useRef<HTMLImageElement>(null);

  const onEnter = () => {
    gsap.to(imgRef.current, { scale: 1.08, duration: 0.5, ease: "power2.out", overwrite: "auto" });
  };
  const onLeave = () => {
    gsap.to(imgRef.current, { scale: 1, duration: 0.6, ease: "power2.inOut", overwrite: "auto" });
  };

  return (
    <div className="flex flex-col gap-4 cursor-pointer" onMouseEnter={onEnter} onMouseLeave={onLeave}>
      <div className={`relative w-full overflow-hidden ${tall ? "h-[469px]" : "h-[398px]"}`}>
        <img ref={imgRef} src={img} alt="" className="absolute inset-0 w-full h-full object-cover" />
      </div>
      <p className="font-inter font-normal text-[14px] leading-[1.3] tracking-[-0.04em] text-[#1f1f1f]">{text}</p>
      <a
        href="#"
        className="flex items-center gap-[10px] border-b border-black py-1 w-fit text-black"
      >
        <span className="font-inter font-medium text-[14px] tracking-[-0.04em] whitespace-nowrap">Read more</span>
        <NorthEastArrow />
      </a>
    </div>
  );
}

function MobileCarousel() {
  const [current, setCurrent] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const dotsRef  = useRef<(HTMLButtonElement | null)[]>([]);

  const prev = () => setCurrent((c) => Math.max(0, c - 1));
  const next = () => setCurrent((c) => Math.min(ARTICLES.length - 1, c + 1));

  const onTouchStart = (e: React.TouchEvent) => setTouchStartX(e.touches[0].clientX);
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (diff > 50) next();
    else if (diff < -50) prev();
    setTouchStartX(null);
  };

  useEffect(() => {
    dotsRef.current.forEach((dot, i) => {
      if (dot) gsap.set(dot, { backgroundColor: i === 0 ? "#000000" : "rgba(0,0,0,0.2)" });
    });
  }, []);

  useEffect(() => {
    if (trackRef.current)
      gsap.to(trackRef.current, { x: `-${current * 100}%`, duration: 0.3, ease: "power2.inOut" });
    dotsRef.current.forEach((dot, i) => {
      if (dot) gsap.to(dot, { backgroundColor: i === current ? "#000000" : "rgba(0,0,0,0.2)", duration: 0.2, ease: "none" });
    });
  }, [current]);

  return (
    <div>
      <div className="overflow-hidden" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
        <div ref={trackRef} className="flex">
          {ARTICLES.map((a, i) => (
            <div key={i} className="w-full shrink-0">
              <ArticleCard img={a.img} text={a.text} tall={false} />
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center gap-2 mt-6">
        {ARTICLES.map((_, i) => (
          <button
            key={i}
            ref={(el) => { dotsRef.current[i] = el; }}
            onClick={() => setCurrent(i)}
            aria-label={`Go to slide ${i + 1}`}
            className="w-2 h-2 rounded-full"
          />
        ))}
      </div>
    </div>
  );
}

export default function NewsSection() {
  return (
    <section className="bg-[#f3f3f3] w-full">

      {/* ── Desktop ── */}
      <div className="hidden md:flex items-start gap-6 px-8 py-[120px]">

        <div className="flex items-center justify-center w-[110px] h-[706px] shrink-0">
          <div className="-rotate-90 flex-none">
            <p className="font-inter font-light text-[64px] leading-[0.86] tracking-[-0.08em] uppercase text-black whitespace-nowrap">
              Keep up with my latest
            </p>
            <p className="font-inter font-light text-[64px] leading-[0.86] tracking-[-0.08em] uppercase text-black whitespace-nowrap">
              news &amp; achievements
            </p>
          </div>
        </div>

        <div className="flex flex-1 items-start gap-[31px]">
          <div className="flex-1">
            <ArticleCard img={ARTICLES[0].img} text={ARTICLES[0].text} tall />
          </div>
          <div className="w-px self-stretch bg-black/10" />
          <div className="flex-1 pt-[120px]">
            <ArticleCard img={ARTICLES[1].img} text={ARTICLES[1].text} tall />
          </div>
          <div className="w-px self-stretch bg-black/10" />
          <div className="flex-1">
            <ArticleCard img={ARTICLES[2].img} text={ARTICLES[2].text} tall />
          </div>
        </div>
      </div>

      {/* ── Mobile ── */}
      <div className="block md:hidden px-4 py-16">
        <p className="font-inter font-light text-[32px] leading-[0.86] tracking-[-0.08em] uppercase text-black mb-8">
          Keep up with my latest news &amp; achievements
        </p>
        <MobileCarousel />
      </div>

    </section>
  );
}
