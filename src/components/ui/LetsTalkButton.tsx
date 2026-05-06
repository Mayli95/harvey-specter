"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";

export default function LetsTalkButton({
  href,
  onClick,
  variant = "solid",
}: {
  href: string;
  onClick?: () => void;
  variant?: "solid" | "outline";
}) {
  const btnRef = useRef<HTMLAnchorElement>(null);

  // Sync background colour when variant changes (e.g. nav scrolls over dark section)
  useEffect(() => {
    if (!btnRef.current) return;
    gsap.to(btnRef.current, {
      backgroundColor: variant === "solid" ? "#000000" : "rgba(0,0,0,0)",
      duration: 0.5,
      ease: "power2.inOut",
    });
  }, [variant]);

  const onMouseMove = (e: React.MouseEvent) => {
    const btn = btnRef.current!;
    const { left, top, width, height } = btn.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) * 0.3;
    const y = (e.clientY - top - height / 2) * 0.3;
    gsap.to(btn, { x, y, duration: 0.4, ease: "power2.out" });
  };

  const onMouseEnter = () => {
    gsap.to(btnRef.current, {
      backgroundColor: "#ffffff",
      color: "#000000",
      duration: 0.3,
      ease: "power2.out",
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
    });
  };

  const variantClass =
    variant === "solid" ? "bg-black text-white" : "text-white border border-white";

  return (
    <div
      onMouseMove={onMouseMove}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="inline-flex w-fit"
    >
      <a
        ref={btnRef}
        href={href}
        onClick={onClick}
        className={`font-inter font-medium text-[14px] tracking-[-0.04em] rounded-[24px] px-4 py-3 inline-flex items-center justify-center whitespace-nowrap ${variantClass}`}
        style={{ willChange: "transform" }}
      >
        Let&apos;s talk
      </a>
    </div>
  );
}
