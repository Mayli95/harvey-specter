"use client";

import LetsTalkButton from "./ui/LetsTalkButton";

export default function ServicesCTASection() {
  return (
    <section className="bg-white w-full px-8 py-28 max-md:px-4 max-md:py-20">
      <div className="flex flex-col items-center text-center gap-8">

        {/* Tag */}
        <p className="font-mono text-[13px] leading-[1.1] uppercase tracking-[0.06em] text-[#1f1f1f]">
          [ let&apos;s work together ]
        </p>

        {/* Heading */}
        <h2 className="font-inter font-light text-[clamp(36px,5.5vw,80px)] leading-[1.0] tracking-[-0.05em] uppercase text-black max-w-[900px]">
          Have a project in{" "}
          <span className="font-extrabold italic">mind?</span>
        </h2>

        {/* Subtext */}
        <p className="font-inter font-normal text-[14px] leading-[1.6] tracking-[-0.02em] text-[#1f1f1f] max-w-[400px]">
          Every great project starts with a conversation. Tell me about your
          vision and let&apos;s figure out how to make it real.
        </p>

        {/* CTA button */}
        <div className="mt-2">
          <LetsTalkButton href="#contact" noHoverInvert />
        </div>

      </div>
    </section>
  );
}
