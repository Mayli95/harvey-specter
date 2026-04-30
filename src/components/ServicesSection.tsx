const LABEL_SM = "font-mono text-[14px] leading-[1.1] uppercase text-white";
const DESC = "Placeholder description of this service. Explain the value you provide and the outcomes clients can expect. Keep it to two or three sentences.";

const SERVICES = [
  {
    num: "[ 1 ]",
    name: "Brand Discovery",
    desc: DESC,
    img: "https://www.figma.com/api/mcp/asset/04676100-ddb2-45ab-996a-706f2a78c821",
  },
  {
    num: "[ 2 ]",
    name: "Web Design & Dev",
    desc: DESC,
    img: "https://www.figma.com/api/mcp/asset/6eddb007-ced2-48a3-9adb-49450af3b5c1",
  },
  {
    num: "[ 3 ]",
    name: "Marketing",
    desc: DESC,
    img: "https://www.figma.com/api/mcp/asset/50e0497d-c8bb-4414-91ff-3b57d6de0632",
  },
  {
    num: "[ 4 ]",
    name: "Photography",
    desc: DESC,
    img: "https://www.figma.com/api/mcp/asset/c9346587-58de-4548-bdb6-dc42b269b03c",
  },
];

export default function ServicesSection() {
  return (
    <section className="bg-black w-full px-8 py-20 max-md:px-4 max-md:py-12">

      {/* [ services ] */}
      <p className={`${LABEL_SM} mb-12 max-md:mb-8`}>[ services ]</p>

      {/* [4]  Deliverables */}
      <div className="flex items-center justify-between w-full mb-12 max-md:mb-8">
        <p className="font-inter font-light text-[clamp(32px,6.67vw,96px)] leading-none tracking-[-0.08em] uppercase text-white">
          [4]
        </p>
        <p className="font-inter font-light text-[clamp(32px,6.67vw,96px)] leading-none tracking-[-0.08em] uppercase text-white">
          Deliverables
        </p>
      </div>

      {/* Service list */}
      <div className="flex flex-col gap-12">
        {SERVICES.map((s) => (
          <div key={s.num} className="flex flex-col gap-[9px]">
            {/* Number + rule */}
            <p className={LABEL_SM}>{s.num}</p>
            <div className="w-full border-t border-white/40" />

            {/* Desktop: name left, desc+image right | Mobile: stacked */}
            <div className="flex items-start justify-between gap-6 pt-[9px] max-md:flex-col max-md:gap-4">
              {/* Service name */}
              <p className="font-inter font-bold italic text-[36px] leading-[1.1] tracking-[-0.04em] uppercase text-white whitespace-nowrap shrink-0">
                {s.name}
              </p>

              {/* Description + thumbnail */}
              <div className="flex items-start gap-6 max-md:flex-col">
                <p className="font-inter font-normal text-[14px] leading-[1.3] tracking-[-0.04em] text-white w-[393px] max-md:w-full">
                  {s.desc}
                </p>
                <div className="shrink-0 size-[151px] overflow-hidden">
                  <img
                    src={s.img}
                    alt={s.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}
