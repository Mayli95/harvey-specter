export default function FooterSection() {
  return (
    <footer className="bg-black w-full px-8 pt-12 max-md:px-4">

      {/* ── Desktop ── */}
      <div className="hidden md:flex flex-col gap-[120px]">

        {/* Top: CTA + socials + divider */}
        <div className="flex flex-col gap-12">
          <div className="flex items-start justify-between">

            {/* CTA */}
            <div className="flex flex-col gap-3 w-[298px]">
              <p className="font-inter font-light italic text-[24px] leading-[1.1] tracking-[-0.04em] uppercase text-white">
                Have a <span className="font-black not-italic">project</span> in mind?
              </p>
              <a
                href="#contact"
                className="font-inter font-medium text-[14px] tracking-[-0.04em] text-white border border-white rounded-[24px] px-4 py-3 w-fit whitespace-nowrap"
              >
                Let&apos;s talk
              </a>
            </div>

            {/* Centre socials */}
            <div className="font-inter font-normal text-[18px] leading-[1.1] tracking-[-0.04em] uppercase text-white text-center w-[298px]">
              <p>Facebook</p>
              <p>Instagram</p>
            </div>

            {/* Right socials */}
            <div className="font-inter font-normal text-[18px] leading-[1.1] tracking-[-0.04em] uppercase text-white text-right w-[298px]">
              <p>X.COM</p>
              <p>Linkedin</p>
            </div>
          </div>

          <div className="w-full border-t-2 border-white/70" />
        </div>

        {/* Bottom: H.Studio + legal */}
        <div className="flex items-end justify-between">

          {/* H.Studio with rotated label */}
          <div className="flex-1 h-[219px] overflow-hidden relative">
            {/* [ Coded By Claude ] */}
            <div className="absolute left-0 top-[34px] w-[15px] h-[160px] flex items-center justify-center">
              <div className="-rotate-90 flex-none">
                <p className="font-mono text-[14px] leading-[1.1] uppercase text-white whitespace-nowrap">
                  [ Coded By Claude ]
                </p>
              </div>
            </div>
            {/* Big brand text */}
            <p className="font-inter font-semibold capitalize text-[290px] leading-[0.8] tracking-[-0.06em] text-white whitespace-nowrap absolute top-1/2 -translate-y-1/2 left-[5px]">
              H.Studio
            </p>
          </div>

          {/* Legal */}
          <div className="flex gap-[34px] items-center pb-8 shrink-0">
            <a href="#" className="font-inter font-normal text-[12px] leading-[1.1] tracking-[-0.04em] uppercase text-white underline whitespace-nowrap">
              Licences
            </a>
            <a href="#" className="font-inter font-normal text-[12px] leading-[1.1] tracking-[-0.04em] uppercase text-white underline whitespace-nowrap">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>

      {/* ── Mobile ── */}
      <div className="flex md:hidden flex-col gap-12">

        {/* Top: CTA + socials + divider */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-3">
              <p className="font-inter font-light italic text-[24px] leading-[1.1] tracking-[-0.04em] uppercase text-white">
                Have a <span className="font-black not-italic">project</span> in mind?
              </p>
              <a
                href="#contact"
                className="font-inter font-medium text-[14px] tracking-[-0.04em] text-white border border-white rounded-[24px] px-4 py-3 w-fit whitespace-nowrap"
              >
                Let&apos;s talk
              </a>
            </div>
            <p className="font-inter font-normal text-[18px] leading-[1.1] tracking-[-0.04em] uppercase text-white">Facebook</p>
            <p className="font-inter font-normal text-[18px] leading-[1.1] tracking-[-0.04em] uppercase text-white">Instagram</p>
            <p className="font-inter font-normal text-[18px] leading-[1.1] tracking-[-0.04em] uppercase text-white">X.COM</p>
            <p className="font-inter font-normal text-[18px] leading-[1.1] tracking-[-0.04em] uppercase text-white">Linkedin</p>
          </div>
          <div className="w-full border-t-2 border-white/70" />
        </div>

        {/* Bottom: legal + label + H.Studio */}
        <div className="flex flex-col gap-4 overflow-hidden">
          <div className="flex gap-[34px] items-center justify-center">
            <a href="#" className="font-inter font-normal text-[12px] leading-[1.1] tracking-[-0.04em] uppercase text-white underline whitespace-nowrap">
              Licences
            </a>
            <a href="#" className="font-inter font-normal text-[12px] leading-[1.1] tracking-[-0.04em] uppercase text-white underline whitespace-nowrap">
              Privacy Policy
            </a>
          </div>
          <div className="flex flex-col gap-3 overflow-hidden">
            <p className="font-mono text-[10px] leading-[1.1] uppercase text-white">
              [ Coded By Claude ]
            </p>
            <p className="font-inter font-semibold capitalize text-[23.4vw] leading-[0.8] tracking-[-0.06em] text-white whitespace-nowrap">
              H.Studio
            </p>
          </div>
        </div>
      </div>

    </footer>
  );
}
