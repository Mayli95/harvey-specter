// Image assets — expire in 7 days
const IMG_1 = "https://www.figma.com/api/mcp/asset/eed0d90b-959f-46be-8862-025f6caafc5c";
const IMG_2 = "https://www.figma.com/api/mcp/asset/25a5498c-1bb1-43d9-8df7-447626b6e8bb";
const IMG_3 = "https://www.figma.com/api/mcp/asset/4d2199ad-7a9c-4be8-84b6-191d362856f4";

const ARTICLES = [
  {
    img: IMG_1,
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    offset: false,
  },
  {
    img: IMG_2,
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    offset: true,
  },
  {
    img: IMG_3,
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    offset: false,
  },
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
  return (
    <div className="flex flex-col gap-4">
      <div className={`relative w-full overflow-hidden ${tall ? "h-[469px]" : "h-[398px]"}`}>
        <img src={img} alt="" className="absolute inset-0 w-full h-full object-cover" />
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

export default function NewsSection() {
  return (
    <section className="bg-[#f3f3f3] w-full">

      {/* ── Desktop ── */}
      <div className="hidden md:flex items-start gap-6 px-8 py-[120px]">

        {/* Rotated heading column */}
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

        {/* Three staggered cards */}
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

        {/* Horizontally scrollable cards */}
        <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4">
          {ARTICLES.map((a, i) => (
            <div key={i} className="w-[300px] shrink-0">
              <ArticleCard img={a.img} text={a.text} tall={false} />
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
