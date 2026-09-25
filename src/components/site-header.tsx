"use client";

import { usePathname } from "next/navigation";
import { m, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { FileDown } from "lucide-react";
import { nav, profile } from "@/lib/content";
import { useIntroDone, useHashScrollTo } from "./site-shell";
import { EASE_OUT } from "@/lib/motion";

export default function SiteHeader() {
  const introDone = useIntroDone();
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.3 });
  const scrollToHash = useHashScrollTo();
  // Section anchors only exist on the home page; elsewhere, link back to them.
  const onHome = usePathname() === "/";

  return (
    <m.header
      className="fixed inset-x-0 top-0 z-50 border-b border-line bg-bg/85 backdrop-blur-sm"
      initial={reduced ? false : { y: -12, opacity: 0 }}
      animate={introDone || reduced ? { y: 0, opacity: 1 } : {}}
      transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.2 }}
    >
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-5 md:h-16 md:px-10">
        <a
          href={onHome ? "#top" : "/"}
          onClick={onHome ? scrollToHash("top") : undefined}
          className="font-display text-base font-semibold tracking-tight"
          aria-label="Back to top"
        >
          <span className="sm:hidden">AG</span>
          <span className="hidden sm:inline">Abhiraj Ghosh</span>
        </a>
        <nav aria-label="Primary" className="flex items-center gap-4 sm:gap-6 md:gap-8">
          {nav.map((item) => (
            <a
              key={item.href}
              href={onHome ? item.href : `/${item.href}`}
              onClick={onHome ? scrollToHash(item.href.slice(1)) : undefined}
              className="u-line font-mono text-[10px] uppercase tracking-[0.18em] text-body hover:text-fg sm:text-[11px]"
            >
              <span className="mr-1 hidden text-accent md:inline">{item.index}</span>
              {item.label}
            </a>
          ))}
          <a
            href={profile.resume}
            target="_blank"
            rel="noreferrer"
            className="hidden items-center gap-1.5 rounded-full border border-accent/60 px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-accent transition-colors duration-300 hover:border-accent hover:bg-accent hover:text-bg-deep sm:inline-flex"
          >
            <FileDown aria-hidden size={12} strokeWidth={1.75} /> Resume
          </a>
        </nav>
      </div>
      {!reduced && (
        <m.div
          aria-hidden
          className="absolute inset-x-0 -bottom-px h-[2px] origin-left bg-accent"
          style={{ scaleX: progress }}
        />
      )}
    </m.header>
  );
}
