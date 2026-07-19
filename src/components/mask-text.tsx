"use client";

import { useRef, type ReactNode } from "react";
import { m, useInView, useReducedMotion } from "framer-motion";
import { EASE_SNAP } from "@/lib/motion";

type MaskTextProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
};

/**
 * Single-line mask reveal — text slides up out of an overflow clip.
 * Driven by useInView() + explicit animate rather than whileInView on the
 * nested motion span, which unreliably left text stuck in its hidden state.
 */
export default function MaskText({ children, className, delay = 0, duration = 0.8 }: MaskTextProps) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  if (reduced) return <span className={className}>{children}</span>;

  return (
    <span ref={ref} className={`block overflow-hidden ${className ?? ""}`}>
      <m.span
        className="block"
        initial={{ y: "112%" }}
        animate={{ y: inView ? "0%" : "112%" }}
        transition={{ duration, delay, ease: EASE_SNAP }}
      >
        {children}
      </m.span>
    </span>
  );
}
