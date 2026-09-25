"use client";

import { createContext, useCallback, useContext, useState, type MouseEvent, type ReactNode } from "react";
import type Lenis from "lenis";
import { LazyMotion, domAnimation, useReducedMotion } from "framer-motion";
import Preloader from "./preloader";
import SmoothScroll from "./smooth-scroll";

const IntroContext = createContext(false);
const LenisContext = createContext<Lenis | null>(null);

/** True once the intro has finished — sections use it to stage their entrance. */
export const useIntroDone = () => useContext(IntroContext);

/** The live Lenis instance (null until SmoothScroll's effect mounts it, or permanently
 *  null for reduced-motion users, who skip Lenis entirely). */
export const useLenis = () => useContext(LenisContext);

/**
 * Click handler factory for same-page hash links (`#top`, `#about`, ...).
 *
 * Lenis is initialized with `anchors: true` (see smooth-scroll.tsx), which makes it
 * intercept same-page hash clicks and run its own animated `scrollTo` — but it never
 * calls `event.preventDefault()`, so the browser's native hash-jump fires for the same
 * click too. We take over here instead: `preventDefault` + `stopPropagation` (so
 * Lenis's own window-level click listener doesn't also fire and re-trigger a second,
 * conflicting scrollTo) then drive the scroll ourselves through the shared Lenis
 * instance.
 *
 * `#top` is special-cased to a literal numeric target (0) rather than resolving the
 * target element's `getBoundingClientRect()`. hero.tsx's `<section id="top">` is
 * `position: sticky; top: 0`, so its rect.top reads as 0 at *any* scroll depth once
 * scrolled past it — both the native fragment-scroll algorithm and Lenis's own
 * element-based `scrollTo` resolve that as "already at the target" and no-op. That's
 * the actual cause of the "Back to top" dead-click bug (confirmed empirically: scrollY
 * doesn't move a single pixel across ~170 sampled animation frames after a real click).
 * Since "back to top" always means scrollY 0 regardless of layout, skipping element
 * resolution entirely sidesteps the sticky-rect problem completely.
 *
 * Every other home-page section is pinned the same way (see StackSection), so the
 * same trap applies to them: their rect reports where they're stuck, not where they
 * sit in the page. Other targets therefore resolve through `flowTop`, which
 * measures position from the layout instead of the rect.
 */
export function useHashScrollTo() {
  const lenis = useLenis();
  const reduced = useReducedMotion();

  return useCallback(
    (hash: string) => (event: MouseEvent<HTMLAnchorElement>) => {
      const isTop = hash === "top";
      const target = isTop ? null : document.getElementById(hash);
      if (!isTop && !target) return; // unknown target — let native handle it

      event.preventDefault();
      event.stopPropagation();

      const top = isTop ? 0 : flowTop(target as HTMLElement);
      if (lenis) {
        lenis.scrollTo(top);
        return;
      }

      // Lenis not mounted yet (reduced motion, or effect hasn't run) — replicate the
      // same fix manually so #top still works, using native smooth/auto scrolling.
      const behavior = reduced ? "auto" : "smooth";
      window.scrollTo({ top, behavior });
    },
    [lenis, reduced]
  );
}

/**
 * Scroll offset at which `el` reaches the top of the viewport in normal flow.
 * Pinned (sticky) sections can't be measured by their rect, so this adds up the
 * heights of the <main> blocks before the one containing `el` — heights aren't
 * affected by pinning. Falls back to the rect outside <main>.
 */
function flowTop(el: HTMLElement) {
  const main = el.closest("main");
  const blocks = main ? Array.from(main.children) : [];
  const block = blocks.find((b) => b.contains(el));
  if (!main || !block) return el.getBoundingClientRect().top + window.scrollY;

  let top = main.getBoundingClientRect().top + window.scrollY;
  for (const b of blocks) {
    if (b === block) break;
    top += (b as HTMLElement).offsetHeight;
  }
  return top + el.getBoundingClientRect().top - block.getBoundingClientRect().top;
}

export default function SiteShell({ children }: { children: ReactNode }) {
  const [introDone, setIntroDone] = useState(false);
  const [lenis, setLenis] = useState<Lenis | null>(null);

  return (
    <IntroContext.Provider value={introDone}>
      <LenisContext.Provider value={lenis}>
        <LazyMotion features={domAnimation}>
          <SmoothScroll onReady={setLenis} />
          <Preloader onComplete={() => setIntroDone(true)} />
          {children}
        </LazyMotion>
      </LenisContext.Provider>
    </IntroContext.Provider>
  );
}
