"use client";

import { useRef } from "react";
import { m, useInView, useReducedMotion } from "framer-motion";
import { EASE_OUT, EASE_SNAP } from "@/lib/motion";

type SectionHeadingProps = {
  id: string;
  /** Section number; omit for a sub-section that belongs to the one above it. */
  index?: string;
  title: string;
  note?: string;
};

/**
 * Numbered kicker + masked title + hairline rule that draws itself.
 * Each section's entrance runs on its own timing via props from the call site.
 *
 * Visibility is driven by a single useInView() on the wrapper rather than
 * per-element whileInView — nested motion.whileInView on masked spans was
 * unreliable (observer fired but the animation never committed), so we
 * compute inView once and drive every child with an explicit `animate`.
 */
export default function SectionHeading({ id, index, title, note }: SectionHeadingProps) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  const fade = (delay: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0 },
          animate: { opacity: inView ? 1 : 0 },
          transition: { duration: 0.6, delay, ease: EASE_OUT },
        };

  return (
    <div ref={ref} className="mb-12 md:mb-16">
      <div className="flex items-baseline gap-4 pb-4">
        {index ? (
          <m.span {...fade(0.15)} className="font-mono text-[11px] tracking-[0.25em] text-accent">
            {index}
          </m.span>
        ) : null}
        <h2 id={id} className="font-display text-3xl font-semibold tracking-[-0.02em] md:text-5xl">
          {reduced ? (
            title
          ) : (
            <span className="block overflow-hidden">
              <m.span
                className="block"
                initial={{ y: "112%" }}
                animate={{ y: inView ? "0%" : "112%" }}
                transition={{ duration: 0.8, ease: EASE_SNAP }}
              >
                {title}
              </m.span>
            </span>
          )}
        </h2>
        {note ? (
          <m.span
            {...fade(0.3)}
            className="ml-auto hidden font-mono text-[11px] uppercase tracking-[0.2em] text-muted sm:block"
          >
            {note}
          </m.span>
        ) : null}
      </div>
      <m.div
        aria-hidden
        className="h-px origin-left bg-line"
        initial={reduced ? false : { scaleX: 0 }}
        animate={{ scaleX: inView ? 1 : 0 }}
        transition={{ duration: 0.9, delay: 0.1, ease: EASE_OUT }}
      />
    </div>
  );
}
