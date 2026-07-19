"use client";

import { useRef } from "react";
import { m, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { profile } from "@/lib/content";
import { useIntroDone } from "./site-shell";
import { EASE_OUT } from "@/lib/motion";
import HeroOrbit, { HeroOrbitMobile } from "./hero-orbit";

const maskLine = {
  hidden: { y: "112%" },
  show: (i: number) => ({
    y: "0%",
    transition: { duration: 0.9, ease: EASE_OUT, delay: 0.08 * i },
  }),
};

export default function Hero() {
  const introDone = useIntroDone();
  const reduced = useReducedMotion();
  const state = introDone || reduced ? "show" : "hidden";

  // Signature scroll moment: the hero pins and its content lifts away while
  // the next section slides over it (hero is sticky, siblings are z-10).
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -72]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6, 1], [1, 0.5, 0]);

  const fade = (i: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 16 },
          animate: state === "show" ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 },
          transition: { duration: 0.7, ease: EASE_OUT, delay: 0.25 + 0.08 * i },
        };

  return (
    <section
      id="top"
      ref={ref}
      className={reduced ? "relative border-b border-line" : "sticky top-0 z-0 h-svh border-b border-line"}
    >
      <m.div
        style={reduced ? undefined : { y: contentY, opacity: contentOpacity }}
        className="relative flex h-full flex-col overflow-hidden"
      >
        <div aria-hidden className="bg-columns absolute inset-0" />
        <div className="relative mx-auto flex h-full w-full max-w-7xl flex-col px-5 md:px-10">
          <m.div
            {...fade(0)}
            className="flex flex-wrap items-center justify-between gap-3 pt-24 font-mono text-[11px] uppercase tracking-[0.25em] text-muted md:pt-28"
          >
            <span>
              {profile.location} / {profile.timezone}
            </span>
            <span className="flex items-center gap-2">
              <span aria-hidden className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-accent" />
              Open to opportunities
            </span>
          </m.div>

          <div className="relative flex flex-1 items-center py-10">
            <HeroOrbit />
            <HeroOrbitMobile />
            <h1 className="font-display text-[clamp(3.6rem,13vw,10.5rem)] font-bold leading-[0.88] tracking-[-0.045em]">
              <span className="block overflow-hidden pb-[0.06em]">
                <m.span
                  className="block"
                  variants={maskLine}
                  custom={0}
                  initial={reduced ? false : "hidden"}
                  animate={state}
                >
                  Abhiraj
                </m.span>
              </span>
              <span className="block overflow-hidden pb-[0.1em]">
                <m.span
                  className="block"
                  variants={maskLine}
                  custom={1}
                  initial={reduced ? false : "hidden"}
                  animate={state}
                >
                  Ghosh<span className="text-accent">.</span>
                </m.span>
              </span>
            </h1>
          </div>

          <div className="pb-8 md:pb-10">
            <div className="grid gap-8 md:grid-cols-12 md:items-end">
              <m.p
                {...fade(2)}
                className="max-w-xl text-base leading-relaxed text-body md:col-span-7 md:text-lg"
              >
                {profile.positioning}
              </m.p>
              <m.div
                {...fade(3)}
                className="flex flex-wrap gap-x-8 gap-y-3 font-mono text-[11px] uppercase tracking-[0.2em] md:col-span-5 md:justify-end"
              >
                <a href={`mailto:${profile.email}`} className="u-line">
                  Email
                </a>
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer"
                  className="u-line inline-flex items-center gap-1"
                >
                  GitHub <ArrowUpRight aria-hidden size={12} strokeWidth={1.75} />
                </a>
                <a
                  href={profile.linktree}
                  target="_blank"
                  rel="noreferrer"
                  className="u-line inline-flex items-center gap-1"
                >
                  Linktree <ArrowUpRight aria-hidden size={12} strokeWidth={1.75} />
                </a>
              </m.div>
            </div>
            <m.div
              {...fade(4)}
              className="mt-10 flex items-center justify-between border-t border-line pt-4 font-mono text-[11px] uppercase tracking-[0.25em] text-muted"
            >
              <span className="inline-flex items-center gap-2">
                <ArrowDown aria-hidden size={12} strokeWidth={1.75} /> Scroll
              </span>
              <span className="hidden sm:inline">Full-stack · Systems · AI</span>
            </m.div>
          </div>
        </div>
      </m.div>
    </section>
  );
}
