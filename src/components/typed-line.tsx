"use client";

import { useEffect, useState } from "react";

type TypedLineProps = {
  /** Typed out character by character. Keep it short; long lines drag. */
  lead: string;
  /** Fades in once the lead has finished typing. */
  rest: string;
  start: boolean;
  /** Seconds after `start` before the first character. */
  delay: number;
  charMs: number;
  reduced: boolean;
  className?: string;
};

/**
 * Terminal-style line: types `lead` with a blinking caret, then fades in `rest`
 * and retires the caret. The whole text is in the DOM from the first render
 * (untyped characters are just transparent), so there's no layout shift as it
 * types and screen readers and crawlers get the full sentence.
 */
export default function TypedLine({ lead, rest, start, delay, charMs, reduced, className }: TypedLineProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (reduced || !start) return;
    let typed = 0;
    let interval: number | undefined;
    const timeout = window.setTimeout(() => {
      interval = window.setInterval(() => {
        typed += 1;
        setCount(typed);
        if (typed >= lead.length) window.clearInterval(interval);
      }, charMs);
    }, delay * 1000);
    return () => {
      window.clearTimeout(timeout);
      window.clearInterval(interval);
    };
  }, [start, reduced, lead, delay, charMs]);

  const shown = reduced ? lead.length : count;
  const done = shown >= lead.length;

  return (
    <p className={className}>
      <span className="text-fg">{lead.slice(0, shown)}</span>
      {reduced ? null : (
        // Zero-width anchor so the caret never pushes text around.
        <span
          aria-hidden
          className={`relative inline-block h-[1.05em] w-0 align-[-0.15em] transition-opacity duration-500 ${
            done ? "opacity-0 delay-700" : start ? "opacity-100" : "opacity-0"
          }`}
        >
          <span className="absolute left-0.5 top-0 h-full w-[2px] animate-caret bg-accent" />
        </span>
      )}
      <span className="text-fg opacity-0">{lead.slice(shown)}</span>
      <span className={`transition-opacity duration-700 ${done ? "opacity-100" : "opacity-0"}`}>{rest}</span>
    </p>
  );
}
