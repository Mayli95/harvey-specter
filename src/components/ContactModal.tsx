"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { useContactModal } from "@/context/ContactModalContext";

// ─── Replace with your Formspark form ID ──────────────────────────────────────
const FORMSPARK_ID = "pygwMSNKp";
// ─────────────────────────────────────────────────────────────────────────────

const PROJECT_TYPES = [
  "Brand Discovery",
  "Web Design & Dev",
  "Marketing",
  "Photography",
  "Other",
];

export default function ContactModal() {
  const { isOpen, closeModal } = useContactModal();

  const overlayRef = useRef<HTMLDivElement>(null);
  const cardRef    = useRef<HTMLDivElement>(null);

  const [name,        setName]        = useState("");
  const [email,       setEmail]       = useState("");
  const [projectType, setProjectType] = useState("");
  const [message,     setMessage]     = useState("");
  const [submitting,  setSubmitting]  = useState(false);
  const [submitted,   setSubmitted]   = useState(false);
  const [error,       setError]       = useState("");

  // Animate in / out
  useEffect(() => {
    const overlay = overlayRef.current;
    const card    = cardRef.current;
    if (!overlay || !card) return;

    if (isOpen) {
      document.body.style.overflow = "hidden";
      gsap.set(overlay, { display: "flex" });
      gsap.fromTo(overlay, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: "power2.out" });
      gsap.fromTo(card, { y: "100%" }, { y: 0, duration: 0.55, ease: "power4.out" });
    } else {
      gsap.to(card, { y: "100%", duration: 0.4, ease: "power3.in" });
      gsap.to(overlay, {
        opacity: 0, duration: 0.3, delay: 0.15, ease: "power2.in",
        onComplete: () => {
          gsap.set(overlay, { display: "none" });
          document.body.style.overflow = "";
        },
      });
    }
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") closeModal(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [closeModal]);

  const resetForm = () => {
    setName(""); setEmail(""); setProjectType(""); setMessage("");
    setSubmitted(false); setError("");
  };

  const handleClose = () => { closeModal(); setTimeout(resetForm, 400); };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const res = await fetch(`https://submit-form.com/${FORMSPARK_ID}`, {
        method:  "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body:    JSON.stringify({ name, email, projectType, message }),
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    /* Overlay — initially hidden via inline style, GSAP controls display */
    <div
      ref={overlayRef}
      style={{ display: "none" }}
      className="fixed inset-0 z-[200] items-end bg-black/60 backdrop-blur-sm"
      onClick={(e) => { if (e.target === overlayRef.current) handleClose(); }}
    >
      <div
        ref={cardRef}
        className="relative bg-white w-full rounded-t-[10%] p-10 max-md:p-6 max-h-[90vh] overflow-y-auto"
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          aria-label="Close"
          className="absolute top-6 right-6 font-inter text-[20px] leading-none text-[#1f1f1f] hover:opacity-50 transition-opacity"
        >
          ✕
        </button>

        {submitted ? (
          /* ── Success state ── */
          <div className="flex flex-col items-center justify-center py-16 gap-6 text-center">
            <p className="font-mono text-[13px] uppercase tracking-[0.08em] text-[#1f1f1f]">
              [ message sent ]
            </p>
            <h2 className="font-inter font-light text-[clamp(32px,4vw,52px)] leading-[1.05] tracking-[-0.04em] text-black">
              Thanks for your submission,<br />
              <span className="font-extrabold italic">we&apos;ll be in touch soon.</span>
            </h2>
            <button
              onClick={handleClose}
              className="mt-4 font-inter font-medium text-[14px] tracking-[-0.04em] bg-black text-white rounded-[24px] px-6 py-3"
            >
              Close
            </button>
          </div>
        ) : (
          /* ── Form ── */
          <>
            {/* Header */}
            <p className="font-mono text-[13px] uppercase tracking-[0.08em] text-[#1f1f1f] mb-4">
              [ get in touch ]
            </p>
            <h2 className="font-inter font-light text-[clamp(36px,5vw,64px)] leading-[1.0] tracking-[-0.05em] uppercase text-black mb-10">
              Let&apos;s{" "}
              <span className="font-extrabold italic">talk</span>
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-8">
              {/* Name + Email */}
              <div className="grid grid-cols-2 gap-6 max-md:grid-cols-1">
                <div className="flex flex-col gap-2">
                  <label className="font-mono text-[11px] uppercase tracking-[0.1em] text-[#999]">
                    Name
                  </label>
                  <input
                    required
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    className="font-inter text-[15px] tracking-[-0.03em] text-black placeholder:text-[#bbb] bg-transparent border-b border-[#1f1f1f]/25 pb-2 outline-none focus:border-[#1f1f1f] transition-colors"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-mono text-[11px] uppercase tracking-[0.1em] text-[#999]">
                    Email
                  </label>
                  <input
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="font-inter text-[15px] tracking-[-0.03em] text-black placeholder:text-[#bbb] bg-transparent border-b border-[#1f1f1f]/25 pb-2 outline-none focus:border-[#1f1f1f] transition-colors"
                  />
                </div>
              </div>

              {/* Project type */}
              <div className="flex flex-col gap-2">
                <label className="font-mono text-[11px] uppercase tracking-[0.1em] text-[#999]">
                  Project Type
                </label>
                <select
                  required
                  value={projectType}
                  onChange={(e) => setProjectType(e.target.value)}
                  className="font-inter text-[15px] tracking-[-0.03em] text-black bg-transparent border-b border-[#1f1f1f]/25 pb-2 outline-none focus:border-[#1f1f1f] transition-colors appearance-none cursor-pointer"
                >
                  <option value="" disabled>Select a service</option>
                  {PROJECT_TYPES.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>

              {/* Message */}
              <div className="flex flex-col gap-2">
                <label className="font-mono text-[11px] uppercase tracking-[0.1em] text-[#999]">
                  Message
                </label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell me about your project..."
                  className="font-inter text-[15px] tracking-[-0.03em] text-black placeholder:text-[#bbb] bg-transparent border-b border-[#1f1f1f]/25 pb-2 outline-none focus:border-[#1f1f1f] transition-colors resize-none"
                />
              </div>

              {error && (
                <p className="font-inter text-[13px] text-red-600">{error}</p>
              )}

              {/* Submit */}
              <div className="flex justify-center pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="font-inter font-medium text-[14px] tracking-[-0.04em] bg-black text-white rounded-[24px] px-8 py-3 disabled:opacity-50 hover:bg-[#333] transition-colors"
                >
                  {submitting ? "Sending…" : "Send message"}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
