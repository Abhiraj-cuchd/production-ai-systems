"use client";

import type { ReactNode } from "react";
import { m, useReducedMotion } from "framer-motion";
import { EASE_OUT } from "@/lib/motion";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  x?: number;
  duration?: number;
  once?: boolean;
};

/**
 * Scroll-into-view reveal. Timing is intentionally set per call site —
 * not one global fade-up — so each section enters differently.
 * Renders statically for reduced-motion users.
 */
export default function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
  x = 0,
  duration = 0.7,
  once = true,
}: RevealProps) {
  const reduced = useReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;

  return (
    <m.div
      className={className}
      initial={{ opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once, margin: "-12% 0px" }}
      transition={{ duration, delay, ease: EASE_OUT }}
    >
      {children}
    </m.div>
  );
}
