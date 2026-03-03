export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center dot-grid overflow-hidden">
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 60%, hsl(var(--primary) / 0.07) 0%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-6 py-32 md:py-40">
        {/* Badge */}
        <div
          className="inline-flex items-center gap-2 rounded-full px-3 py-1 mb-8 text-xs font-medium"
          style={{
            background: "hsl(var(--primary) / 0.08)",
            border: "1px solid hsl(var(--primary) / 0.2)",
            color: "hsl(var(--primary))",
          }}
        >
          <span
            className="inline-block h-1.5 w-1.5 rounded-full"
            style={{ background: "hsl(var(--primary))" }}
          />
          Available for senior roles
        </div>

        {/* Headline */}
        <h1
          className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.05] mb-6 max-w-3xl"
          style={{
            color: "hsl(var(--foreground))",
            letterSpacing: "-0.02em",
          }}
        >
          Designing
          <br />
          <span style={{ color: "hsl(var(--primary))" }}>Production-Grade</span>
          <br />
          AI Systems
        </h1>

        {/* Subhead */}
        <p
          className="text-lg md:text-xl max-w-xl mb-10 leading-relaxed"
          style={{ color: "hsl(var(--muted-foreground))" }}
        >
          AI Systems Engineer specializing in Retrieval-Augmented Generation, event-driven
          pipelines, and cloud-native architectures on AWS.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap items-center gap-4">
          <a href="#projects" className="btn-primary animate-pulse-glow">
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
          <a href="#" className="btn-ghost">
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
          className="mt-20 flex flex-wrap gap-8 pt-8"
          style={{ borderTop: "1px solid hsl(var(--border-subtle))" }}
        >
          {[
            { value: "3", label: "Production systems shipped" },
            { value: "AWS", label: "Cloud platform" },
            { value: "99.9%", label: "Message reliability" },
            { value: "sub-2s", label: "RAG query latency" },
          ].map((stat) => (
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
    </section>
  );
}
