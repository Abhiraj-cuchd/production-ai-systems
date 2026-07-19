"use client";

import { useEffect, useRef, useState } from "react";
import { animate, m, useInView, useReducedMotion } from "framer-motion";
import { stats } from "@/lib/content";
import { EASE_OUT, EASE_SNAP } from "@/lib/motion";

function Counter({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const reduced = useReducedMotion();
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (reduced) {
      setVal(to);
      return;
    }
    if (!inView) return;
    const controls = animate(0, to, {
      duration: 1.2,
      ease: EASE_OUT,
      onUpdate: (v) => setVal(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, reduced, to]);

  return (
    <span ref={ref}>
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

  const cells = stats.map((s, i) => (
    <div
      key={s.label}
      className={`border-line p-6 md:p-8 ${i % 2 === 1 ? "border-l" : ""} ${
        i > 1 ? "border-t md:border-t-0" : ""
      } ${i > 0 ? "md:border-l" : ""}`}
    >
      <dd className="font-display text-5xl font-semibold tracking-[-0.02em] md:text-6xl">
        <Counter to={s.value} suffix={s.suffix} />
      </dd>
      <dt className="mt-3 font-mono text-[11px] uppercase leading-relaxed tracking-[0.18em] text-muted">
        {s.label}
      </dt>
    </div>
  ));

  if (reduced) {
    return (
      <div className="mt-16 md:mt-24">
        <dl className="grid grid-cols-2 border-y border-line md:grid-cols-4">{cells}</dl>
      </div>
    );
  }

  return (
    <div className="mt-16 md:mt-24">
      <m.dl
        className="grid grid-cols-2 border-y border-line md:grid-cols-4"
        variants={list}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-10% 0px" }}
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
              <Counter to={s.value} suffix={s.suffix} />
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
