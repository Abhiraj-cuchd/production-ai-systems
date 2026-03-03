import { useEffect } from "react";

const principles = [
  {
    number: "01",
    title: "Design for failure, not just success paths",
    detail:
      "DLQs, retries, circuit breakers — every distributed component assumes the worst and handles it gracefully.",
  },
  {
    number: "02",
    title: "Prefer async workflows over blocking systems",
    detail:
      "Event-driven pipelines decouple producers from consumers, improve throughput, and prevent cascading failures under load.",
  },
  {
    number: "03",
    title: "Enforce IAM least privilege — no wildcards",
    detail:
      "Every Lambda, task, and service gets its own scoped role. No shared credentials. No wildcard actions. Rotated automatically.",
  },
  {
    number: "04",
    title: "Monitor everything critical",
    detail:
      "Error rates, queue depth, latency p99, Bedrock throttles — if it can degrade, it has an alarm. X-Ray traces the rest.",
  },
  {
    number: "05",
    title: "Optimize only after measuring",
    detail:
      "Instrument first, then tune. Premature optimization creates complexity without impact. Data drives decisions.",
  },
];

export default function Approach() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    const els = document.querySelectorAll(".approach-reveal");
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="approach"
      className="py-24 md:py-32"
      style={{ borderTop: "1px solid hsl(var(--border-subtle))" }}
    >
      <div className="mx-auto max-w-6xl px-6">
        {/* Header */}
        <div className="mb-16 reveal approach-reveal">
          <span
            className="text-xs font-semibold uppercase tracking-widest mb-3 block"
            style={{ color: "hsl(var(--primary))" }}
          >
            Philosophy
          </span>
          <h2
            className="text-3xl md:text-4xl font-bold tracking-tight"
            style={{ color: "hsl(var(--foreground))", letterSpacing: "-0.02em" }}
          >
            Engineering Approach
          </h2>
        </div>

        {/* Principles */}
        <div className="space-y-0">
          {principles.map((p, i) => (
            <div
              key={p.number}
              className="reveal approach-reveal grid grid-cols-[48px_1fr_1fr] md:grid-cols-[64px_1fr_1fr] items-start gap-6 py-7"
              style={{
                borderTop: "1px solid hsl(var(--border-subtle))",
                transitionDelay: `${i * 60}ms`,
              }}
            >
              <span
                className="text-xs font-mono font-medium pt-1"
                style={{ color: "hsl(var(--primary))" }}
              >
                {p.number}
              </span>
              <h3
                className="text-base font-semibold leading-snug"
                style={{ color: "hsl(var(--foreground))" }}
              >
                {p.title}
              </h3>
              <p
                className="text-sm leading-relaxed hidden md:block"
                style={{ color: "hsl(var(--muted-foreground))" }}
              >
                {p.detail}
              </p>
              <p
                className="text-sm leading-relaxed md:hidden col-span-2"
                style={{ color: "hsl(var(--muted-foreground))" }}
              >
                {p.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
