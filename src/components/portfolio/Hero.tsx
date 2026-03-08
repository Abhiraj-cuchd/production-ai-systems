import { useRef } from "react";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { motion, useInView, animate } from "framer-motion";
import { useEffect } from "react";

const stats = [
  { value: "3", label: "Production systems shipped", isNumeric: true, targetNum: 3, decimals: 0 },
  { value: "Multi-AZ", label: "Database deployments", isNumeric: false },
  { value: "99.9%", label: "Message reliability", isNumeric: true, targetNum: 99.9, decimals: 1, suffix: "%" },
  { value: "sub-2s", label: "RAG query latency", isNumeric: false },
  { value: "Zero", label: "Downtime deployments", isNumeric: false },
  { value: "DLQ-backed", label: "All ingestion pipelines", isNumeric: false },
];

function CountUp({ target, decimals = 0, suffix = "", duration = 1.2 }: { target: number; decimals?: number; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  useEffect(() => {
    if (!inView || !ref.current) return;
    const node = ref.current;
    const controls = animate(0, target, {
      duration,
      ease: "easeOut",
      onUpdate(value) {
        node.textContent = value.toFixed(decimals) + suffix;
      },
    });
    return () => controls.stop();
  }, [inView, target, decimals, suffix, duration]);

  return <span ref={ref}>0{suffix}</span>;
}

export default function Hero() {
  const statsRef = useRef<HTMLDivElement>(null);
  const statsInView = useInView(statsRef, { once: true, margin: "-60px" });

  return (
    <section className="relative min-h-screen flex items-center dot-grid overflow-hidden">
      <BackgroundBeams />

      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 60%, hsl(var(--primary) / 0.07) 0%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-4 md:px-6 py-32 md:py-40">
        {/* Headline — word-by-word reveal */}
        <h1
          className="text-5xl md:text-7xl font-bold leading-[1.05] mb-6 max-w-3xl"
          style={{ letterSpacing: "-0.02em", color: "hsl(var(--foreground))" }}
        >
          {/* "Designing" — white, reveal */}
          {["Designing"].map((word, i) => (
            <motion.span
              key={`w-${i}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: i * 0.07, ease: [0.25, 0.1, 0.25, 1] }}
              className="inline-block mr-[0.25em]"
            >
              {word}
            </motion.span>
          ))}
          {/* "Production-Grade" — purple */}
          {["Production-Grade"].map((word, i) => (
            <motion.span
              key={`p-${i}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: (i + 1) * 0.07, ease: [0.25, 0.1, 0.25, 1] }}
              className="inline-block mr-[0.25em]"
              style={{ color: "hsl(var(--primary))" }}
            >
              {word}
            </motion.span>
          ))}
          {/* "AI Systems" — white */}
          {["AI", "Systems"].map((word, i) => (
            <motion.span
              key={`a-${i}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: (i + 2) * 0.07, ease: [0.25, 0.1, 0.25, 1] }}
              className="inline-block mr-[0.25em]"
            >
              {word}
            </motion.span>
          ))}
        </h1>

        {/* Subhead */}
        <motion.p
          className="text-lg md:text-xl max-w-xl mb-10 leading-relaxed"
          style={{ color: "hsl(var(--muted-foreground))" }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.45 }}
        >
          Specializing in RAG systems, event-driven AI pipelines, and
          production-grade AWS infrastructure.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-wrap items-center gap-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.55 }}
        >
          <a href="#projects" className="btn-primary animate-pulse-glow" style={{ minHeight: 44 }}>
            View Projects
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m9 18 6-6-6-6" />
            </svg>
          </a>
          <a href="#" className="btn-ghost" style={{ minHeight: 44 }}>
            Download Resume
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" x2="12" y1="15" y2="3" />
            </svg>
          </a>
        </motion.div>

        {/* Stat strip */}
        <div
          ref={statsRef}
          className="mt-20 pt-8"
          style={{ borderTop: "1px solid hsl(var(--border-subtle))" }}
        >
          <div className="grid grid-cols-2 md:grid-cols-6 gap-x-8 gap-y-6">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                className="flex flex-col gap-1"
                initial={{ opacity: 0, y: 8 }}
                animate={statsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: i * 0.07, ease: "easeOut" }}
              >
                <span
                  className="text-2xl font-bold"
                  style={{ color: "hsl(var(--foreground))" }}
                >
                  {stat.isNumeric && stat.targetNum !== undefined ? (
                    <CountUp
                      target={stat.targetNum}
                      decimals={stat.decimals ?? 0}
                      suffix={stat.suffix ?? ""}
                      duration={1.2}
                    />
                  ) : (
                    stat.value
                  )}
                </span>
                <span
                  className="leading-tight"
                  style={{ color: "hsl(var(--muted-foreground))", fontSize: "0.72rem", minWidth: 120 }}
                >
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
