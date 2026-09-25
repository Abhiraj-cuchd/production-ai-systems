"use client";

import { useEffect, useRef, useState, type ComponentType } from "react";
import { m, useReducedMotion } from "framer-motion";
import {
  SiDocker,
  SiGithub,
  SiLangchain,
  SiMongodb,
  SiNestjs,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPython,
  SiReact,
  SiRedis,
  SiTypescript,
} from "@icons-pack/react-simple-icons";
import { Bot, Cloud } from "lucide-react";
import DeepSeekIcon from "./icons/deepseek-icon";
import { useFinePointer } from "@/lib/use-fine-pointer";
import { EASE_OUT } from "@/lib/motion";

type IconComponent = ComponentType<{ size?: number; color?: string; strokeWidth?: number }>;
type Node = { Icon: IconComponent; label: string; top: string; left: string; size: number };

// Monochrome on purpose: at low opacity, full brand colours turn into muddy
// orange/green smudges on the dark background, while one tone reads as a
// single system. Brightness comes from proximity instead (see below).
const TONE = "currentColor";

const nodes: Node[] = [
  { Icon: SiReact, label: "React", top: "0%", left: "30%", size: 26 },
  { Icon: SiTypescript, label: "TypeScript", top: "2%", left: "66%", size: 22 },
  { Icon: SiNodedotjs, label: "Node.js", top: "10%", left: "92%", size: 22 },
  { Icon: SiNextdotjs, label: "Next.js", top: "8%", left: "22%", size: 22 },
  { Icon: SiPython, label: "Python", top: "16%", left: "64%", size: 22 },
  { Icon: SiDocker, label: "Docker", top: "24%", left: "48%", size: 18 },
  { Icon: SiMongodb, label: "MongoDB", top: "28%", left: "80%", size: 26 },
  { Icon: Cloud, label: "AWS", top: "36%", left: "20%", size: 18 },
  { Icon: SiLangchain, label: "LangChain", top: "46%", left: "28%", size: 22 },
  { Icon: SiNestjs, label: "NestJS", top: "48%", left: "62%", size: 22 },
  { Icon: SiRedis, label: "Redis", top: "50%", left: "92%", size: 18 },
  { Icon: Bot, label: "OpenAI", top: "58%", left: "14%", size: 18 },
  { Icon: SiPostgresql, label: "PostgreSQL", top: "68%", left: "12%", size: 22 },
  { Icon: SiGithub, label: "GitHub", top: "72%", left: "74%", size: 22 },
  { Icon: DeepSeekIcon, label: "DeepSeek", top: "84%", left: "64%", size: 22 },
];

/** Entrance order sweeps left to right, outward from the name. */
const sweep = (left: string) => (parseFloat(left) / 100) * 0.55;

const REST_OPACITY = 0.32;
const RADIUS = 160; // px of cursor influence
const PUSH = 22; // max px an icon drifts away

/**
 * Ambient tech "constellation" filling the hero's right side (desktop). Icons
 * sweep in after the name and tagline have settled (`delay`), then, for mouse
 * users, drift away from and brighten near the cursor. One rAF-throttled
 * pointer listener writes transforms/opacity directly; CSS transitions do the
 * easing, so there's no per-frame React work and no layout thrash.
 * Decorative (aria-hidden); the same tools are listed in the Stack section.
 */
export default function HeroOrbit({ start, delay }: { start: boolean; delay: number }) {
  const reduced = useReducedMotion();
  const fine = useFinePointer();
  const anchors = useRef<(HTMLDivElement | null)[]>([]);
  const marks = useRef<(HTMLDivElement | null)[]>([]);
  const [settled, setSettled] = useState(false);

  // Interaction only switches on once every icon has landed.
  useEffect(() => {
    if (!start || reduced) return;
    const t = window.setTimeout(() => setSettled(true), (delay + 0.55 + 0.7) * 1000);
    return () => window.clearTimeout(t);
  }, [start, reduced, delay]);

  useEffect(() => {
    if (!fine || reduced || !settled) return;
    let raf = 0;
    let px = -9999;
    let py = -9999;

    const frame = () => {
      raf = 0;
      // Read every anchor first, then write every mark: no read/write interleaving.
      const rects = anchors.current.map((a) => a?.getBoundingClientRect());
      rects.forEach((r, i) => {
        const el = marks.current[i];
        if (!el || !r || r.width === 0) return;
        const dx = r.left + r.width / 2 - px;
        const dy = r.top + r.height / 2 - py;
        const d = Math.hypot(dx, dy) || 1;
        const s = d < RADIUS ? (1 - d / RADIUS) ** 2 : 0;
        el.style.transform = `translate3d(${(dx / d) * PUSH * s}px, ${(dy / d) * PUSH * s}px, 0)`;
        el.style.opacity = String(REST_OPACITY + (1 - REST_OPACITY) * s);
      });
    };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      px = e.clientX;
      py = e.clientY;
      if (!raf) raf = requestAnimationFrame(frame);
    };
    const onLeave = () => {
      px = py = -9999;
      if (!raf) raf = requestAnimationFrame(frame);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, [fine, reduced, settled]);

  return (
    <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 hidden w-[62%] lg:block">
      {nodes.map(({ Icon, label, top, left, size }, i) => (
        <m.div
          key={label}
          ref={(el) => {
            anchors.current[i] = el;
          }}
          className="absolute"
          style={{ top, left }}
          initial={reduced ? false : { opacity: 0, scale: 0.6 }}
          animate={reduced || start ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.6 }}
          transition={{ duration: 0.7, ease: EASE_OUT, delay: reduced ? 0 : delay + sweep(left) }}
        >
          <div
            ref={(el) => {
              marks.current[i] = el;
            }}
            className="text-fg transition-[transform,opacity] duration-700 ease-[var(--ease-out-expo)] will-change-transform"
            style={{ opacity: REST_OPACITY }}
          >
            <Icon size={size} color={TONE} strokeWidth={1.5} />
          </div>
        </m.div>
      ))}
    </div>
  );
}

const mobileNodes: Omit<Node, "size">[] = [
  { Icon: SiReact, label: "React", top: "0%", left: "0%" },
  { Icon: SiTypescript, label: "TypeScript", top: "0%", left: "34%" },
  { Icon: SiNodedotjs, label: "Node.js", top: "2%", left: "68%" },
  { Icon: SiPython, label: "Python", top: "14%", left: "90%" },
  { Icon: Cloud, label: "AWS", top: "16%", left: "14%" },
  { Icon: SiNextdotjs, label: "Next.js", top: "78%", left: "2%" },
  { Icon: SiDocker, label: "Docker", top: "82%", left: "32%" },
  { Icon: SiNestjs, label: "NestJS", top: "80%", left: "62%" },
  { Icon: DeepSeekIcon, label: "DeepSeek", top: "92%", left: "86%" },
  { Icon: SiPostgresql, label: "PostgreSQL", top: "94%", left: "18%" },
];

/**
 * Mobile/tablet counterpart: the same monochrome marks, sitting in the margins
 * around the name. Same entrance sweep, no interaction (touch has no cursor).
 */
export function HeroOrbitMobile({ start, delay }: { start: boolean; delay: number }) {
  const reduced = useReducedMotion();

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 lg:hidden">
      {mobileNodes.map(({ Icon, label, top, left }) => (
        <m.div
          key={label}
          className="absolute text-fg"
          style={{ top, left }}
          initial={reduced ? false : { opacity: 0, scale: 0.6 }}
          animate={reduced || start ? { opacity: REST_OPACITY, scale: 1 } : { opacity: 0, scale: 0.6 }}
          transition={{ duration: 0.7, ease: EASE_OUT, delay: reduced ? 0 : delay + sweep(left) }}
        >
          <Icon size={17} color={TONE} strokeWidth={1.5} />
        </m.div>
      ))}
    </div>
  );
}
