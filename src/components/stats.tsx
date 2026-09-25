"use client";

import { useEffect, useRef, useState } from "react";
import { animate, m, useInView, useReducedMotion } from "framer-motion";
import { stats } from "@/lib/content";
import { EASE_OUT, EASE_SNAP } from "@/lib/motion";

function Counter({ to, suffix, start }: { to: number; suffix: string; start: boolean }) {
  const reduced = useReducedMotion();
  // Default to the final value, so the number is never stuck at 0 if the
  // count-up doesn't run (reduced motion, no JS, crawlers).
  const [val, setVal] = useState(to);

  useEffect(() => {
    if (reduced || !start) return;
    const controls = animate(0, to, {
      duration: 1.2,
      ease: EASE_OUT,
      onUpdate: (v) => setVal(Math.round(v)),
    });
    // If the count is interrupted, land on the final value instead of freezing mid-way.
    return () => {
      controls.stop();
      setVal(to);
    };
  }, [start, reduced, to]);

  return (
    <span>
      {val}
      {suffix}
    </span>
  );
}

const list = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
};

const cell = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_SNAP } },
};

export default function Stats() {
  const reduced = useReducedMotion();
  // One observer drives both the tile entrance and the count-up. `once` latches
  // it to true, so the tiles hold their final state whichever way you scroll.
  const ref = useRef<HTMLDListElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const shown = reduced || inView;

  return (
    <div className="mt-16 md:mt-24">
      <m.dl
        ref={ref}
        className="grid grid-cols-2 border-y border-line md:grid-cols-4"
        variants={list}
        initial={reduced ? false : "hidden"}
        animate={shown ? "show" : "hidden"}
      >
        {stats.map((s, i) => (
          <m.div
            key={s.label}
            variants={cell}
            className={`border-line p-6 md:p-8 ${i % 2 === 1 ? "border-l" : ""} ${
              i > 1 ? "border-t md:border-t-0" : ""
            } ${i > 0 ? "md:border-l" : ""}`}
          >
            <dd className="font-display text-5xl font-semibold tracking-[-0.02em] md:text-6xl">
              <Counter to={s.value} suffix={s.suffix} start={inView} />
            </dd>
            <dt className="mt-3 font-mono text-[11px] uppercase leading-relaxed tracking-[0.18em] text-muted">
              {s.label}
            </dt>
          </m.div>
        ))}
      </m.dl>
    </div>
  );
}
