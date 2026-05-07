"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { useContactModal } from "@/context/ContactModalContext";

export default function LetsTalkButton({
  href,
  onClick,
  variant = "solid",
  noHoverInvert = false,
}: {
  href: string;
  onClick?: () => void;
  variant?: "solid" | "outline";
  noHoverInvert?: boolean;
}) {
  const { openModal } = useContactModal();
  const btnRef     = useRef<HTMLAnchorElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const isMounted  = useRef(false);

  // Skip mount — Tailwind classes set the initial appearance.
  // Animate only when variant changes after mount (nav scrolling over dark sections).
  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }
    if (!btnRef.current) return;
    gsap.to(btnRef.current, {
      backgroundColor: variant === "solid" ? "#000000" : "rgba(0,0,0,0)",
      color: "#ffffff",
      duration: 0.5,
      ease: "power2.inOut",
      overwrite: "auto",
    });
  }, [variant]);

  const onMouseMove = (e: React.MouseEvent) => {
    const { left, top, width, height } = wrapperRef.current!.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) * 0.35;
    const y = (e.clientY - top - height / 2) * 0.35;
    gsap.to(btnRef.current, { x, y, duration: 0.4, ease: "power2.out", overwrite: "auto" });
  };

  const onMouseEnter = () => {
    // noHoverInvert = true only on the nav button over light backgrounds
    if (variant === "solid" && noHoverInvert) return;
    gsap.to(btnRef.current, {
      backgroundColor: "#ffffff",
      color: "#000000",
      duration: 0.3,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  const onMouseLeave = () => {
    gsap.to(btnRef.current, {
      x: 0,
      y: 0,
      backgroundColor: variant === "solid" ? "#000000" : "rgba(0,0,0,0)",
      color: "#ffffff",
      duration: 0.8,
      ease: "elastic.out(1, 0.4)",
      overwrite: "auto",
    });
  };

  const variantClass =
    variant === "solid"
      ? "bg-black text-white"
      : "bg-transparent text-white border border-white";

  return (
    <div
      ref={wrapperRef}
      onMouseMove={onMouseMove}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="inline-flex w-fit"
    >
      <a
        ref={btnRef}
        href={href}
        onClick={(e) => { e.preventDefault(); openModal(); onClick?.(); }}
        className={`font-inter font-medium text-[14px] tracking-[-0.04em] rounded-[24px] px-4 py-3 inline-flex items-center justify-center whitespace-nowrap ${variantClass}`}
        style={{ willChange: "transform" }}
      >
        Let&apos;s talk
      </a>
    </div>
  );
}
