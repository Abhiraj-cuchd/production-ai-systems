import { useEffect } from "react";

const areas = [
  {
    icon: "🧠",
    title: "Retrieval-Augmented Generation",
    description:
      "Semantic document Q&A using Amazon Titan embeddings, OpenSearch kNN vector search with HNSW indexing, and Claude via Bedrock with structured outputs.",
    tags: ["Titan Embeddings", "OpenSearch kNN", "Bedrock Claude", "512-token chunks"],
  },
  {
    icon: "⚡",
    title: "Event-Driven AI Pipelines",
    description:
      "Fully async ingestion from S3 triggers through SQS with DLQ-backed retry logic, reserved concurrency as a Bedrock rate guard, and idempotent processing.",
    tags: ["S3 → SQS", "DLQ retry", "Async decoupling", "Reserved concurrency"],
  },
  {
    icon: "☁️",
    title: "Cloud-Native Infrastructure",
    description:
      "Zero-downtime Blue/Green deployments on ECS Fargate, RDS PostgreSQL Multi-AZ failover, private VPC subnets with security group layering, and ALB routing.",
    tags: ["ECS Fargate", "RDS Multi-AZ", "VPC subnets", "CodeDeploy"],
  },
  {
    icon: "📊",
    title: "Reliability & Observability",
    description:
      "IAM least-privilege per-function roles, CloudWatch metrics with custom dashboards, X-Ray distributed tracing, and proactive cost modeling.",
    tags: ["IAM least-privilege", "CloudWatch", "X-Ray tracing", "Cost modeling"],
  },
];

export default function FocusAreas() {
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

    const els = document.querySelectorAll(".focus-reveal");
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        {/* Section header */}
        <div className="mb-16 reveal focus-reveal">
          <span
            className="text-xs font-semibold uppercase tracking-widest mb-3 block"
            style={{ color: "hsl(var(--primary))" }}
          >
            Expertise
          </span>
          <h2
            className="text-3xl md:text-4xl font-bold tracking-tight"
            style={{ color: "hsl(var(--foreground))", letterSpacing: "-0.02em" }}
          >
            Core Focus Areas
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {areas.map((area, i) => (
            <div
              key={area.title}
              className="focus-card reveal focus-reveal p-7"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="flex items-start gap-4 mb-4">
                <span className="text-2xl leading-none mt-0.5">{area.icon}</span>
                <h3
                  className="text-base font-semibold leading-snug"
                  style={{ color: "hsl(var(--foreground))" }}
                >
                  {area.title}
                </h3>
              </div>
              <p
                className="text-sm leading-relaxed mb-5"
                style={{ color: "hsl(var(--muted-foreground))" }}
              >
                {area.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {area.tags.map((tag) => (
                  <span key={tag} className="stack-pill">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
