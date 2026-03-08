import { motion } from "framer-motion";
import { TracingBeam } from "@/components/ui/tracing-beam";

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
  return (
    <section
      id="approach"
      className="py-16 md:py-32"
      style={{ borderTop: "1px solid hsl(var(--border-subtle))" }}
    >
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        {/* Header */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.4 }}
        >
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
        </motion.div>

        {/* Tracing beam wraps the list — starts at top of content */}
        <TracingBeam>
          <div className="space-y-0">
            {principles.map((p, i) => (
              <motion.div
                key={p.number}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: i * 0.12, ease: [0.25, 0.1, 0.25, 1] }}
                className="group py-7"
                style={{ borderTop: "1px solid hsl(var(--border-subtle))" }}
              >
                {/* Desktop: 3-col grid */}
                <div
                  className="hidden md:grid md:grid-cols-[64px_1fr_1fr] items-start gap-6 rounded-lg transition-colors duration-200 px-2 -mx-2"
                  style={{}}
                >
                  <span
                    className="text-xs font-mono font-medium pt-1"
                    style={{ color: "hsl(var(--primary))" }}
                  >
                    {p.number}
                  </span>
                  <h3
                    className="text-base font-semibold leading-snug transition-colors duration-200"
                    style={{ color: "hsl(var(--foreground))" }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "hsl(var(--primary))")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "hsl(var(--foreground))")}
                  >
                    {p.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "hsl(var(--muted-foreground))" }}
                  >
                    {p.detail}
                  </p>
                </div>

                {/* Mobile: single column */}
                <div className="md:hidden flex flex-col gap-2" style={{ paddingLeft: 0, paddingRight: 0 }}>
                  <div className="flex items-center gap-3">
                    <span
                      className="text-xs font-mono font-medium"
                      style={{ color: "hsl(var(--primary))" }}
                    >
                      {p.number}
                    </span>
                    <h3
                      className="text-sm font-semibold leading-snug transition-colors duration-200"
                      style={{ color: "hsl(var(--foreground))" }}
                    >
                      {p.title}
                    </h3>
                  </div>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "hsl(var(--muted-foreground))" }}
                  >
                    {p.detail}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </TracingBeam>
      </div>
    </section>
  );
}
