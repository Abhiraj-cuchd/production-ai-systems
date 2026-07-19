"use client";

import Image from "next/image";
import { m, useReducedMotion } from "framer-motion";
import Magnetic from "./magnetic";
import { EASE_INOUT } from "@/lib/motion";

/**
 * Circular company-logo badge for Experience entries. Idles with a gentle
 * float loop and picks up a magnetic pointer-pull + hover lift, matching the
 * treatment already established by the hero's floating tech-icon cluster.
 * No entrance animation of its own — it's meant to sit inside the column's
 * existing <Reveal>, which already handles the scroll-triggered entrance.
 */
export default function CompanyLogo({ src, alt }: { src: string; alt: string }) {
  const reduced = useReducedMotion();

  return (
    <Magnetic strength={0.3} className="inline-block shrink-0">
      <m.div
        animate={reduced ? undefined : { y: [0, -7, 0] }}
        transition={reduced ? undefined : { duration: 5, repeat: Infinity, ease: EASE_INOUT }}
        whileHover={reduced ? undefined : { scale: 1.1 }}
        className="flex h-36 w-36 cursor-default items-center justify-center overflow-hidden rounded-full border border-line bg-bg-2/60 p-3 backdrop-blur-sm transition-colors duration-300 hover:border-accent/50 md:h-40 md:w-40"
      >
        <Image src={src} alt={alt} width={160} height={160} className="h-full w-full object-contain" />
      </m.div>
    </Magnetic>
  );
}
