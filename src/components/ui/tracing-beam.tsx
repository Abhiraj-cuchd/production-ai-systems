import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useSpring, useTransform } from "framer-motion";

interface TracingBeamProps {
  children: ReactNode;
  className?: string;
}

export function TracingBeam({ children, className = "" }: TracingBeamProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [svgHeight, setSvgHeight] = useState(0);

  // Spring for smooth tracking
  const yProgress = useSpring(0, { stiffness: 200, damping: 50, restDelta: 0.001 });

  // Beam draws from 0 to current scroll progress position
  const y2 = useTransform(yProgress, [0, 1], [0, svgHeight]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const updateHeight = () => {
      setSvgHeight(el.offsetHeight);
    };

    updateHeight();
    const ro = new ResizeObserver(updateHeight);
    ro.observe(el);

    const handleScroll = () => {
      if (!el) return;
      const rect = el.getBoundingClientRect();
      // Start animating as soon as the top of the section enters the viewport
      const viewportH = window.innerHeight;
      // progress: 0 when top of element is at bottom of viewport, 1 when bottom of element is at top
      const total = el.offsetHeight + viewportH;
      const traveled = viewportH - rect.top;
      const progress = Math.min(1, Math.max(0, traveled / total));
      yProgress.set(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Run once on mount
    handleScroll();

    return () => {
      ro.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, [yProgress]);

  return (
    <div ref={ref} className={`relative ${className}`}>
      {/* Beam column — hidden on mobile */}
      <div className="absolute left-0 top-0 bottom-0 w-8 hidden md:block" aria-hidden="true">
        <svg
          viewBox={`0 0 20 ${svgHeight}`}
          width="20"
          height={svgHeight}
          className="absolute top-0 left-0"
          aria-hidden="true"
        >
          {/* Track line — full height */}
          <line
            x1="10"
            y1="0"
            x2="10"
            y2={svgHeight}
            stroke="hsl(263 70% 58% / 0.08)"
            strokeWidth="1.5"
          />
          {/* Animated fill line — starts at 0, grows to y2 */}
          <motion.line
            x1="10"
            y1="0"
            x2="10"
            y2={y2}
            stroke="hsl(263 70% 58% / 0.55)"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          {/* Glowing dot at leading edge */}
          <motion.circle
            cx="10"
            cy={y2}
            r="3"
            fill="hsl(263 70% 58%)"
            style={{ filter: "drop-shadow(0 0 4px hsl(263 70% 58% / 0.8))" }}
          />
        </svg>
      </div>

      {/* Content offset on desktop */}
      <div className="md:pl-10">{children}</div>
    </div>
  );
}
