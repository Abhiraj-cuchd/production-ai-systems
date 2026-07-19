"use client";

import type { ComponentType } from "react";
import { m, useReducedMotion } from "framer-motion";
import {
  SiDocker,
  SiExpress,
  SiGithub,
  SiJavascript,
  SiLangchain,
  SiMongodb,
  SiNextdotjs,
  SiNginx,
  SiNodedotjs,
  SiPostgresql,
  SiPython,
  SiReact,
  SiRedis,
  SiTypescript,
} from "@icons-pack/react-simple-icons";
import { Bot, Cloud } from "lucide-react";
import DeepSeekIcon from "./icons/deepseek-icon";
import Magnetic from "./magnetic";
import { EASE_INOUT } from "@/lib/motion";

const tiers = {
  sm: { badge: "h-12 w-12", icon: 20 },
  md: { badge: "h-16 w-16", icon: 26 },
  lg: { badge: "h-20 w-20", icon: 32 },
} as const;

type IconComponent = ComponentType<{ size?: number; color?: string }>;

// Si* brand icons take color="default" (their own official hex). AWS and
// OpenAI have no mark in the installed Simple Icons set, so they fall back
// to a generic lucide glyph tinted with the brand's well-known color.
const nodes: {
  Icon: IconComponent;
  label: string;
  color: string;
  top: string;
  left: string;
  tier: keyof typeof tiers;
  accent?: boolean;
  float: number;
}[] = [
  { Icon: SiReact, label: "React", color: "default", top: "0%", left: "30%", tier: "lg", accent: true, float: 6 },
  { Icon: SiTypescript, label: "TypeScript", color: "default", top: "2%", left: "66%", tier: "md", float: 8 },
  { Icon: SiNodedotjs, label: "Node.js", color: "default", top: "10%", left: "92%", tier: "md", float: 7 },
  { Icon: SiNextdotjs, label: "Next.js", color: "default", top: "8%", left: "22%", tier: "md", accent: true, float: 9 },
  { Icon: SiPython, label: "Python", color: "default", top: "16%", left: "64%", tier: "md", float: 7.4 },
  { Icon: SiDocker, label: "Docker", color: "default", top: "24%", left: "48%", tier: "sm", float: 6.5 },
  { Icon: SiMongodb, label: "MongoDB", color: "default", top: "28%", left: "80%", tier: "lg", float: 7.5 },
  { Icon: Cloud, label: "AWS", color: "#FF9900", top: "36%", left: "20%", tier: "sm", float: 7.6 },
  { Icon: SiLangchain, label: "LangChain", color: "default", top: "46%", left: "28%", tier: "md", accent: true, float: 8.5 },
  { Icon: SiJavascript, label: "JavaScript", color: "default", top: "48%", left: "62%", tier: "sm", float: 6.8 },
  { Icon: SiRedis, label: "Redis", color: "default", top: "50%", left: "92%", tier: "sm", float: 7.2 },
  { Icon: Bot, label: "OpenAI", color: "#10A37F", top: "58%", left: "14%", tier: "sm", float: 7.9 },
  { Icon: SiPostgresql, label: "PostgreSQL", color: "default", top: "68%", left: "12%", tier: "md", float: 8.2 },
  { Icon: SiExpress, label: "Express", color: "default", top: "70%", left: "46%", tier: "sm", float: 6.4 },
  { Icon: SiGithub, label: "GitHub", color: "default", top: "72%", left: "74%", tier: "md", float: 7.8 },
  { Icon: DeepSeekIcon, label: "DeepSeek", color: "default", top: "84%", left: "64%", tier: "md", accent: true, float: 8.6 },
  { Icon: SiNginx, label: "Nginx", color: "default", top: "90%", left: "32%", tier: "sm", float: 8.8 },
];

/**
 * Decorative floating tech-icon cluster filling the hero's otherwise-empty
 * right side. Ambient (aria-hidden, info is duplicated in the Stack section)
 * but individually interactive — magnetic pull + hover tooltip per badge.
 * Static (no bob loop) for reduced-motion users.
 */
export default function HeroOrbit() {
  const reduced = useReducedMotion();

  return (
    <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 hidden w-[62%] lg:block">
      {nodes.map(({ Icon, label, color, top, left, tier, accent, float }, i) => {
        const { badge, icon } = tiers[tier];
        return (
          <m.div
            key={label}
            className="absolute"
            style={{ top, left }}
            initial={reduced ? false : { opacity: 0, y: 14 }}
            animate={reduced ? { opacity: 0.9 } : { opacity: 0.9, y: [14, -12, 14] }}
            transition={
              reduced
                ? { duration: 0.01 }
                : {
                    opacity: { duration: 0.8, delay: 0.5 + i * 0.06, ease: EASE_INOUT },
                    y: { duration: float, repeat: Infinity, ease: EASE_INOUT, delay: i * 0.25 },
                  }
            }
          >
            <Magnetic strength={0.35} className="group pointer-events-auto relative block">
              <m.div
                whileHover={reduced ? undefined : { scale: 1.18 }}
                transition={{ duration: 0.3, ease: EASE_INOUT }}
                className={`flex ${badge} cursor-default items-center justify-center rounded-full border backdrop-blur-sm transition-colors duration-300 ${
                  accent
                    ? "border-accent/40 bg-accent/5 group-hover:border-accent group-hover:bg-accent/10"
                    : "border-line bg-bg-2/60 group-hover:border-accent/50"
                }`}
              >
                <Icon size={icon} color={color} />
              </m.div>
              <span className="pointer-events-none absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap rounded border border-line bg-bg-deep px-2 py-1 font-mono text-[10px] uppercase tracking-[0.15em] text-fg opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                {label}
              </span>
            </Magnetic>
          </m.div>
        );
      })}
    </div>
  );
}

const mobileNodes: { Icon: IconComponent; label: string; color: string; top: string; left: string; accent?: boolean; float: number }[] = [
  { Icon: SiReact, label: "React", color: "default", top: "0%", left: "0%", accent: true, float: 6 },
  { Icon: SiTypescript, label: "TypeScript", color: "default", top: "0%", left: "34%", float: 7.5 },
  { Icon: SiNodedotjs, label: "Node.js", color: "default", top: "2%", left: "68%", accent: true, float: 8 },
  { Icon: SiPython, label: "Python", color: "default", top: "14%", left: "90%", float: 7.1 },
  { Icon: Cloud, label: "AWS", color: "#FF9900", top: "16%", left: "14%", float: 6.9 },
  { Icon: SiNextdotjs, label: "Next.js", color: "default", top: "78%", left: "2%", accent: true, float: 6.8 },
  { Icon: SiDocker, label: "Docker", color: "default", top: "82%", left: "32%", float: 7.2 },
  { Icon: SiMongodb, label: "MongoDB", color: "default", top: "80%", left: "62%", float: 8.4 },
  { Icon: DeepSeekIcon, label: "DeepSeek", color: "default", top: "92%", left: "86%", accent: true, float: 7.7 },
  { Icon: Bot, label: "OpenAI", color: "#10A37F", top: "94%", left: "18%", float: 8.1 },
];

/**
 * Mobile/tablet counterpart to HeroOrbit: same absolute-positioned floating
 * badge treatment, scaled down and rearranged to sit in the empty margins
 * around the name text (top corners, bottom corners) rather than the wide
 * scattered field the desktop layout uses — narrow viewports have no room
 * for that. Lives inside the same `relative` name-row wrapper as `HeroOrbit`.
 * Decorative (aria-hidden), no magnetic/hover (touch has no hover), static
 * for reduced-motion users.
 */
export function HeroOrbitMobile() {
  const reduced = useReducedMotion();

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 lg:hidden">
      {mobileNodes.map(({ Icon, label, color, top, left, accent, float }, i) => (
        <m.div
          key={label}
          className="absolute"
          style={{ top, left }}
          initial={reduced ? false : { opacity: 0, y: 10 }}
          animate={reduced ? { opacity: 0.85 } : { opacity: 0.85, y: [10, -8, 10] }}
          transition={
            reduced
              ? { duration: 0.01 }
              : {
                  opacity: { duration: 0.7, delay: 0.4 + i * 0.06, ease: EASE_INOUT },
                  y: { duration: float, repeat: Infinity, ease: EASE_INOUT, delay: i * 0.2 },
                }
          }
        >
          <div
            className={`flex h-9 w-9 items-center justify-center rounded-full border backdrop-blur-sm ${
              accent ? "border-accent/40 bg-accent/5" : "border-line bg-bg-2/60"
            }`}
          >
            <Icon size={17} color={color} />
          </div>
        </m.div>
      ))}
    </div>
  );
}
