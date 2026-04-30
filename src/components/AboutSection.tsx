const PHOTO = "https://www.figma.com/api/mcp/asset/ff67d0be-2093-4b44-8593-cf3bee260534";

const LABEL_SM = "font-mono text-[14px] leading-[1.1] uppercase text-[#1f1f1f]";
const BODY = "font-inter font-normal text-[14px] leading-[1.3] tracking-[-0.04em] text-[#1f1f1f]";
const BIO =
  "Placeholder paragraph one. This is where you introduce yourself — your background, your passion for your craft, and what drives you creatively. Two to three sentences work best here. Placeholder paragraph two. Here you can describe your technical approach, how you collaborate with clients, or what sets your work apart from others in your field.";

function BracketFrame({ children }: { children: React.ReactNode }) {
  const c = "absolute w-4 h-4 border-[#1f1f1f]";
  return (
    <div className="relative flex-1 px-5 py-3">
      <span className={`${c} top-0 left-0 border-t border-l`} />
      <span className={`${c} top-0 right-0 border-t border-r`} />
      <span className={`${c} bottom-0 left-0 border-b border-l`} />
      <span className={`${c} bottom-0 right-0 border-b border-r`} />
      {children}
    </div>
  );
}

export default function AboutSection() {
  return (
    <section className="bg-white w-full px-8 py-20 max-md:px-4 max-md:py-12">

      {/* ── Desktop (md+) ── */}
      <div className="hidden md:flex items-start justify-between">
        {/* Far-left label */}
        <p className={`${LABEL_SM} shrink-0`}>[ About ]</p>

        {/* Right: bio text + portrait column, bottom-aligned */}
        <div className="flex flex-1 items-end gap-8 ml-8">
          {/* Bracketed bio — flex-1 fills space left of the portrait */}
          <BracketFrame>
            <p className={BODY}>{BIO}</p>
          </BracketFrame>

          {/* 002 label + portrait */}
          <div className="flex flex-col gap-6 shrink-0">
            <p className={LABEL_SM}>002</p>
            <div className="w-[436px] aspect-[436/614] overflow-hidden max-xl:w-[320px]">
              <img
                src={PHOTO}
                alt="Portrait"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── Mobile ── */}
      <div className="flex md:hidden flex-col gap-5">
        <p className={LABEL_SM}>002</p>
        <p className={LABEL_SM}>[ About ]</p>

        <BracketFrame>
          <p className={BODY}>{BIO}</p>
        </BracketFrame>

        <div className="w-full aspect-[422/594] overflow-hidden">
          <img
            src={PHOTO}
            alt="Portrait"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

    </section>
  );
}
