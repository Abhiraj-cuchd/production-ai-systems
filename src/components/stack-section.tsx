"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Page-section wrapper that pins once fully scrolled, so the next section
 * slides up over it (the stacked-cards effect Hero started).
 *
 * Plain `sticky; top: 0` only works for sections shorter than the viewport:
 * a taller one would pin at its top and its lower half could never be
 * scrolled into view. Pinning at `top: min(0, 100svh - height)` instead lets
 * a tall section scroll normally until its *bottom* meets the viewport
 * bottom, then hold there. Short sections resolve to `top: 0`.
 *
 * `svh` (small viewport height) keeps the pin point steady while mobile
 * browser toolbars show and hide. Skipped for reduced-motion users, matching
 * Hero. Until the first measurement it stays in normal flow.
 */
export default function StackSection({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [height, setHeight] = useState<number | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setHeight(el.offsetHeight));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const pinned = !reduced && height !== null;

  return (
    <div
      ref={ref}
      className={className}
      style={pinned ? { position: "sticky", top: `min(0px, calc(100svh - ${height}px))` } : undefined}
    >
      {children}
    </div>
  );
}
