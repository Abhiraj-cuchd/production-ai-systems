import { BackgroundBeams } from "@/components/ui/background-beams";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";

const stats = [
  { value: "3", label: "Production systems shipped" },
  { value: "Multi-AZ", label: "Database deployments" },
  { value: "99.9%", label: "Message reliability" },
  { value: "sub-2s", label: "RAG query latency" },
  { value: "Zero", label: "Downtime deployments" },
  { value: "DLQ-backed", label: "All ingestion pipelines" },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center dot-grid overflow-hidden">
      {/* Background beams */}
      <BackgroundBeams />

      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 60%, hsl(var(--primary) / 0.07) 0%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-4 md:px-6 py-32 md:py-40">
        {/* Headline */}
        <h1
          className="text-5xl md:text-7xl font-bold leading-[1.05] mb-6 max-w-3xl"
          style={{
            color: "hsl(var(--foreground))",
            letterSpacing: "-0.02em",
          }}
        >
          <TextGenerateEffect words="Designing Production-Grade AI Systems" />
        </h1>

        {/* Subhead */}
        <p
          className="text-lg md:text-xl max-w-xl mb-10 leading-relaxed"
          style={{ color: "hsl(var(--muted-foreground))" }}
        >
          Specializing in RAG systems, event-driven AI pipelines, and
          production-grade AWS infrastructure.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap items-center gap-4">
          <a href="#projects" className="btn-primary animate-pulse-glow" style={{ minHeight: 44 }}>
            View Projects
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </a>
          <a href="#" className="btn-ghost" style={{ minHeight: 44 }}>
            Download Resume
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" x2="12" y1="15" y2="3" />
            </svg>
          </a>
        </div>

        {/* Stat strip */}
        <div
          className="mt-20 pt-8"
          style={{ borderTop: "1px solid hsl(var(--border-subtle))" }}
        >
          <div className="grid grid-cols-2 md:grid-cols-6 gap-x-8 gap-y-6">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col gap-1">
                <span
                  className="text-2xl font-bold"
                  style={{ color: "hsl(var(--foreground))" }}
                >
                  {stat.value}
                </span>
                <span className="text-xs" style={{ color: "hsl(var(--muted-foreground))" }}>
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
