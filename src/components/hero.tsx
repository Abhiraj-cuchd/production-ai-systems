"use client";

import { useEffect, useRef } from "react";
import { m, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowDown, ArrowUpRight, FileDown } from "lucide-react";
import { profile } from "@/lib/content";
import { useIntroDone } from "./site-shell";
import { EASE_OUT } from "@/lib/motion";
import { useFinePointer } from "@/lib/use-fine-pointer";
import HeroOrbit, { HeroOrbitMobile } from "./hero-orbit";
import Magnetic from "./magnetic";
import TypedLine from "./typed-line";

// The bio's first sentence types itself; the rest fades in after it.
const split = profile.positioning.indexOf(". ") + 2;
const LEAD = profile.positioning.slice(0, split);
const REST = profile.positioning.slice(split);

/**
 * One sequence, in seconds after the preloader hands off. Each step starts
 * as the previous one lands, so only one thing is moving at a time:
 * kicker + name → tagline types → rest of bio + links → icons sweep in.
 * The cursor effects (name lean, icon drift) only switch on afterwards.
 */
const NAME_DURATION = 0.75;
const NAME_SETTLED = NAME_DURATION + 0.08;
const TYPE_AT = NAME_SETTLED;
const CHAR_MS = 28;
const TYPED_AT = TYPE_AT + (LEAD.length * CHAR_MS) / 1000;
const ICONS_AT = TYPED_AT + 0.25;

const maskLine = {
  hidden: { y: "112%" },
  show: (i: number) => ({
    y: "0%",
    transition: { duration: NAME_DURATION, ease: EASE_OUT, delay: 0.08 * i },
  }),
};

const NAME_PULL = 0.025; // fraction of cursor distance
const NAME_MAX = 10; // px
const clamp = (v: number) => Math.max(-NAME_MAX, Math.min(NAME_MAX, v));

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

  const fade = (delay: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 12 },
          animate: state === "show" ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 },
          transition: { duration: 0.6, ease: EASE_OUT, delay },
        };

  // Name leans slightly toward the cursor once it has landed. Mouse only;
  // measured on the untransformed wrapper so the lean doesn't feed back.
  const fine = useFinePointer();
  const nameArea = useRef<HTMLDivElement>(null);
  const nx = useMotionValue(0);
  const ny = useMotionValue(0);
  const nameX = useSpring(nx, { stiffness: 110, damping: 18, mass: 0.6 });
  const nameY = useSpring(ny, { stiffness: 110, damping: 18, mass: 0.6 });

  useEffect(() => {
    if (!fine || reduced || !introDone) return;
    let raf = 0;
    let armed = false;
    let px = 0;
    let py = 0;
    const arm = window.setTimeout(() => (armed = true), NAME_SETTLED * 1000);

    const frame = () => {
      raf = 0;
      const el = nameArea.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const inside = py >= 0 && py <= window.innerHeight && r.bottom > 0;
      nx.set(inside ? clamp((px - (r.left + r.width / 2)) * NAME_PULL) : 0);
      ny.set(inside ? clamp((py - (r.top + r.height / 2)) * NAME_PULL) : 0);
    };
    const onMove = (e: PointerEvent) => {
      if (!armed || e.pointerType !== "mouse") return;
      px = e.clientX;
      py = e.clientY;
      if (!raf) raf = requestAnimationFrame(frame);
    };
    const onLeave = () => {
      nx.set(0);
      ny.set(0);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      window.clearTimeout(arm);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, [fine, reduced, introDone, nx, ny]);

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
            {...fade(0.1)}
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
            <HeroOrbit start={state === "show"} delay={ICONS_AT} />
            <HeroOrbitMobile start={state === "show"} delay={ICONS_AT} />
            <div ref={nameArea} className="relative">
              <m.p
                {...fade(0)}
                className="mb-4 font-mono text-[11px] uppercase tracking-[0.3em] text-accent md:mb-6"
              >
                {profile.title}
              </m.p>
              <m.h1
                style={reduced ? undefined : { x: nameX, y: nameY }}
                className="font-display text-[clamp(3.6rem,13vw,10.5rem)] font-bold leading-[0.88] tracking-[-0.045em]"
              >
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
              </m.h1>
            </div>
          </div>

          <div className="pb-8 md:pb-10">
            <div className="grid gap-8 md:grid-cols-12 md:items-end">
              <TypedLine
                lead={LEAD}
                rest={REST}
                start={state === "show"}
                delay={TYPE_AT}
                charMs={CHAR_MS}
                reduced={!!reduced}
                className="max-w-xl text-base leading-relaxed text-body md:col-span-7 md:text-lg"
              />
              <m.div
                {...fade(TYPED_AT)}
                className="flex flex-wrap items-center gap-x-8 gap-y-4 font-mono text-[11px] uppercase tracking-[0.2em] md:col-span-5 md:justify-end"
              >
                <Magnetic strength={0.25} className="inline-block">
                  <a
                    href={profile.resume}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 font-medium text-bg-deep transition-colors duration-300 hover:bg-fg"
                  >
                    <FileDown aria-hidden size={14} strokeWidth={2} /> Resume
                  </a>
                </Magnetic>
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
                  href={profile.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="u-line inline-flex items-center gap-1"
                >
                  LinkedIn <ArrowUpRight aria-hidden size={12} strokeWidth={1.75} />
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
              {...fade(TYPED_AT + 0.1)}
              className="mt-10 flex items-center justify-between border-t border-line pt-4 font-mono text-[11px] uppercase tracking-[0.25em] text-muted"
            >
              <span className="inline-flex items-center gap-2">
                <ArrowDown aria-hidden size={12} strokeWidth={1.75} /> Scroll
              </span>
              <span className="hidden sm:inline">Backend · Systems · Applied AI</span>
            </m.div>
          </div>
        </div>
      </m.div>
    </section>
  );
}
