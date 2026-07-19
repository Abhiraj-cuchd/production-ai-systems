"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { useReducedMotion } from "framer-motion";

/** Subtle Lenis smooth-scroll. Skipped entirely for reduced-motion users. */
export default function SmoothScroll({ onReady }: { onReady?: (lenis: Lenis | null) => void }) {
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const lenis = new Lenis({ lerp: 0.11, anchors: true });
    onReady?.(lenis);
    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      onReady?.(null);
    };
  }, [reduced, onReady]);

  return null;
}
