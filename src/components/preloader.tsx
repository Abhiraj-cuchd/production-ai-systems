"use client";

import { useEffect, useRef, useState } from "react";
import { m, animate, useReducedMotion } from "framer-motion";
import { EASE_SHARP, EASE_INOUT } from "@/lib/motion";

/**
 * Preloader. Progress is tied to real work — document.fonts.ready and
 * window load — with a floor animation so the counter never stalls.
 * The exit wipe reveals the hero behind it. Shown once per session
 * (sessionStorage + the inline guard script in <head>).
 */
export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const reduced = useReducedMotion();
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);
  const [gone, setGone] = useState(false);
  const progressRef = useRef(0);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    if (document.documentElement.classList.contains("intro-seen")) {
      setGone(true);
      onCompleteRef.current();
      return;
    }

    document.body.style.overflow = "hidden";
    let cancelled = false;

    const setP = (v: number) => {
      progressRef.current = v;
      setProgress(Math.round(v));
    };

    const windowLoaded = new Promise<void>((resolve) => {
      if (document.readyState === "complete") resolve();
      else window.addEventListener("load", () => resolve(), { once: true });
    });

    // The floor animation doubles as the minimum display time: finish()
    // only runs once real loading (fonts + window) AND the floor have
    // both completed, so the loader never flashes by on fast connections.
    const floor = animate(0, reduced ? 100 : 88, {
      duration: reduced ? 0.25 : 1.4,
      ease: EASE_INOUT,
      onUpdate: setP,
    });

    let finished = false;
    const finish = async () => {
      if (finished || cancelled) return;
      finished = true;
      if (!reduced) {
        await animate(progressRef.current, 100, {
          duration: 0.25,
          ease: "easeOut",
          onUpdate: setP,
        });
        await new Promise((r) => setTimeout(r, 150));
      }
      if (cancelled) return;
      setExiting(true);
      document.body.style.overflow = "";
      onCompleteRef.current();
    };

    const loaded = Promise.all([document.fonts.ready, windowLoaded]);
    Promise.all([loaded, floor]).then(finish);
    const failsafe = setTimeout(finish, 4000);

    return () => {
      cancelled = true;
      clearTimeout(failsafe);
      floor.stop();
      document.body.style.overflow = "";
    };
  }, [reduced]);

  const markSeen = () => {
    try {
      sessionStorage.setItem("ag:intro", "1");
    } catch {
      // private mode — the intro simply replays next visit
    }
    document.documentElement.classList.add("intro-seen");
    setGone(true);
  };

  if (gone) return null;

  return (
    <m.div
      data-preloader
      role="status"
      aria-label="Loading portfolio"
      className="fixed inset-0 z-[90] flex flex-col justify-between bg-bg-deep px-5 py-6 text-fg md:px-10 md:py-8"
      initial={false}
      animate={exiting ? (reduced ? { opacity: 0 } : { y: "-100%" }) : { opacity: 1, y: 0 }}
      transition={{ duration: reduced ? 0.25 : 0.85, ease: EASE_SHARP }}
      onAnimationComplete={() => {
        if (exiting) markSeen();
      }}
    >
      <span className="sr-only">Loading, {progress} percent</span>

      <div className="flex items-baseline justify-between font-mono text-[11px] uppercase tracking-[0.25em] text-fg/60">
        <span>Abhiraj Ghosh</span>
        <span aria-hidden>Portfolio — 2026</span>
      </div>

      <div className="flex items-end justify-between gap-6">
        <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.25em] text-fg/60">
          Loading
          <span className="text-accent"> — </span>
          {String(progress).padStart(3, "0")}%
        </p>
        <p
          aria-hidden
          className="font-mono text-[clamp(5rem,18vw,13rem)] leading-[0.8] tracking-[-0.04em] text-fg"
        >
          {progress}
        </p>
      </div>

      <div
        aria-hidden
        className="h-px w-full origin-left bg-accent transition-transform duration-150 ease-linear"
        style={{ transform: `scaleX(${progress / 100})` }}
      />
    </m.div>
  );
}
