import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useSpring, useTransform } from "framer-motion";

interface TracingBeamProps {
  children: ReactNode;
  className?: string;
}

export function TracingBeam({ children, className = "" }: TracingBeamProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [svgHeight, setSvgHeight] = useState(0);
  const [beamTop, setBeamTop] = useState(0);

  const yProgress = useSpring(0, { stiffness: 300, damping: 60, restDelta: 0.001 });

  const y1 = useTransform(yProgress, [0, 1], [0, svgHeight]);
  const y2 = useTransform(yProgress, [0, 1], [0, svgHeight > 100 ? svgHeight - 50 : svgHeight]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const updateHeight = () => {
      setSvgHeight(el.offsetHeight);
      setBeamTop(el.getBoundingClientRect().top + window.scrollY);
    };

    updateHeight();
    const ro = new ResizeObserver(updateHeight);
    ro.observe(el);

    const handleScroll = () => {
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      const progress = Math.min(1, Math.max(0, -rect.top / total));
      yProgress.set(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
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
          {/* Track line */}
          <line
            x1="10"
            y1="0"
            x2="10"
            y2={svgHeight}
            stroke="hsl(263 70% 58% / 0.08)"
            strokeWidth="1.5"
          />
          {/* Animated beam */}
          <motion.line
            x1="10"
            y1={y1}
            x2="10"
            y2={y2}
            stroke="hsl(263 70% 58% / 0.5)"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          {/* Glowing dot */}
          <motion.circle
            cx="10"
            cy={y1}
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
