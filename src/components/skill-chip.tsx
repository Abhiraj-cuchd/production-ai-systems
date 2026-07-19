"use client";

import { m } from "framer-motion";
import SkillIcon from "./skill-icon";
import { EASE_OUT } from "@/lib/motion";

/** Skill tag with a hover micro-interaction: pill background fades in, icon pops, label brightens. */
export default function SkillChip({ name }: { name: string }) {
  return (
    <m.span
      whileHover={{ y: -2 }}
      transition={{ duration: 0.25, ease: EASE_OUT }}
      className="group -mx-3 -my-1.5 inline-flex cursor-default items-center gap-2.5 rounded-full border border-transparent px-5 py-1.5 transition-colors duration-300 hover:border-line hover:bg-bg-2/80"
    >
      <SkillIcon
        name={name}
        size={24}
        className="shrink-0 text-muted transition-transform duration-300 ease-out group-hover:scale-110"
      />
      <span className="transition-colors duration-300 group-hover:text-fg">{name}</span>
    </m.span>
  );
}
