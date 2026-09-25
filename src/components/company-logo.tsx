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
        className="relative flex h-36 w-36 cursor-default items-center justify-center overflow-hidden rounded-full border border-line bg-[radial-gradient(circle_at_30%_25%,var(--color-bg-2),var(--color-bg-deep)_75%)] shadow-[inset_0_1px_0_rgb(255_255_255/0.06),0_12px_32px_-12px_rgb(0_0_0/0.6)] transition-[border-color,box-shadow] duration-500 group-hover:border-accent/40 group-hover:shadow-[inset_0_1px_0_rgb(255_255_255/0.08),0_0_40px_-8px_color-mix(in_srgb,var(--color-accent)_35%,transparent)] md:h-40 md:w-40"
      >
        {/* Soft accent glow that blooms behind the mark on hover. */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(circle_at_50%_50%,color-mix(in_srgb,var(--color-accent)_14%,transparent),transparent_65%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        />
        {/* Logos are transparent PNGs; this box sets how much of the circle they may fill. */}
        <span className="relative h-[52%] w-[72%]">
          <Image
            src={src}
            alt={alt}
            fill
            sizes="120px"
            className="object-contain opacity-80 saturate-[0.7] transition-[opacity,filter] duration-500 group-hover:opacity-100 group-hover:saturate-100"
          />
        </span>
      </m.div>
    </Magnetic>
  );
}
