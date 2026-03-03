import { useRef, useState, useEffect } from "react";

const projects = [
  {
    number: "01",
    title: "Serverless RAG Knowledge Assistant",
    impact: "Semantic document Q&A at scale — sub-2s query latency via HNSW kNN vector search",
    description:
      "End-to-end serverless pipeline for document ingestion, embedding, and semantic retrieval. Documents are chunked at 512 tokens with overlap, embedded via Amazon Titan, indexed in OpenSearch with HNSW kNN, and queried through Bedrock Claude with structured prompting.",
    highlights: [
      "Presigned S3 uploads for secure document ingestion",
      "512-token overlapping chunks for semantic coherence",
      "HNSW kNN indexing with cosine similarity in OpenSearch",
      "DLQ-backed ingestion with maxReceiveCount retry logic",
      "X-Ray distributed tracing across all Lambda functions",
      "Per-Lambda IAM roles — zero shared credentials",
    ],
    stack: ["Lambda", "Bedrock (Claude + Titan)", "OpenSearch", "DynamoDB", "S3", "API Gateway"],
    metric: { label: "Query latency", value: "< 2s" },
  },
  {
    number: "02",
    title: "AI Document Risk & Compliance Analyzer",
    impact: "99.9% message processing reliability with automated high-risk stakeholder alerting",
    description:
      "Fully asynchronous compliance analysis pipeline. Documents arrive via S3 events, fan into SQS, trigger Lambda workers that invoke Bedrock Claude for structured risk classification, and route high-severity findings through SNS to stakeholder channels — all without a single blocking call.",
    highlights: [
      "Fully async S3 → SQS → Lambda ingestion pipeline",
      "Structured JSON risk output from Claude via Bedrock",
      "DLQ with maxReceiveCount=3 for fault tolerance",
      "Idempotent DynamoDB writes via conditional expressions",
      "Reserved concurrency as a hard Bedrock rate guard",
      "SNS fan-out for multi-channel stakeholder alerting",
    ],
    stack: ["Lambda", "Bedrock (Claude)", "SQS", "SNS", "DynamoDB", "S3"],
    metric: { label: "Message reliability", value: "99.9%" },
  },
  {
    number: "03",
    title: "Cloud-Native Ticketing Microservices Platform",
    impact: "Zero-downtime Blue/Green deployments — NestJS microservices migrated to production AWS",
    description:
      "Full migration of a NestJS monolith to containerized microservices on ECS Fargate with Blue/Green CodeDeploy, RDS PostgreSQL Multi-AZ for data durability, SNS+SQS event fanout between services, and private VPC networking with layered security groups — all secrets managed via Secrets Manager.",
    highlights: [
      "SNS + SQS fanout for decoupled inter-service events",
      "Private VPC subnets — no direct public exposure",
      "Security group layering — least-surface-area access",
      "RDS Multi-AZ with automatic failover < 60s",
      "ECR image scanning on every push",
      "Per-task IAM execution roles — no shared credentials",
    ],
    stack: ["ECS Fargate", "RDS PostgreSQL Multi-AZ", "SNS/SQS", "ALB", "CodeDeploy", "Secrets Manager"],
    metric: { label: "Deployment downtime", value: "0s" },
  },
];

export default function Projects() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollTo = (index: number) => {
    const container = carouselRef.current;
    if (!container) return;
    const cards = container.querySelectorAll(".project-card");
    if (cards[index]) {
      cards[index].scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
    }
    setActiveIndex(index);
  };

  const scrollPrev = () => scrollTo(Math.max(0, activeIndex - 1));
  const scrollNext = () => scrollTo(Math.min(projects.length - 1, activeIndex + 1));

  useEffect(() => {
    const container = carouselRef.current;
    if (!container) return;

    const handleScroll = () => {
      const cards = Array.from(container.querySelectorAll(".project-card")) as HTMLElement[];
      const scrollLeft = container.scrollLeft;
      let closest = 0;
      let minDist = Infinity;
      cards.forEach((card, i) => {
        const dist = Math.abs(card.offsetLeft - scrollLeft);
        if (dist < minDist) {
          minDist = dist;
          closest = i;
        }
      });
      setActiveIndex(closest);
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section id="projects" className="py-24 md:py-32 overflow-hidden">
      <div className="mx-auto max-w-6xl px-6">
        {/* Header */}
        <div className="flex items-end justify-between mb-12">
          <div>
            <span
              className="text-xs font-semibold uppercase tracking-widest mb-3 block"
              style={{ color: "hsl(var(--primary))" }}
            >
              Work
            </span>
            <h2
              className="text-3xl md:text-4xl font-bold tracking-tight"
              style={{ color: "hsl(var(--foreground))", letterSpacing: "-0.02em" }}
            >
              Featured Projects
            </h2>
          </div>

          {/* Arrows */}
          <div className="flex items-center gap-2">
            <button
              onClick={scrollPrev}
              disabled={activeIndex === 0}
              className="flex h-9 w-9 items-center justify-center rounded-lg border transition-all duration-200"
              style={{
                borderColor: "hsl(var(--border-subtle))",
                color: activeIndex === 0 ? "hsl(var(--muted-foreground) / 0.4)" : "hsl(var(--muted-foreground))",
                background: "hsl(var(--card))",
              }}
              aria-label="Previous project"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m15 18-6-6 6-6"/>
              </svg>
            </button>
            <button
              onClick={scrollNext}
              disabled={activeIndex === projects.length - 1}
              className="flex h-9 w-9 items-center justify-center rounded-lg border transition-all duration-200"
              style={{
                borderColor: "hsl(var(--border-subtle))",
                color: activeIndex === projects.length - 1 ? "hsl(var(--muted-foreground) / 0.4)" : "hsl(var(--muted-foreground))",
                background: "hsl(var(--card))",
              }}
              aria-label="Next project"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m9 18 6-6-6-6"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Carousel */}
      <div className="pl-6 md:pl-[calc((100vw-1152px)/2+24px)]">
        <div ref={carouselRef} className="carousel-container pr-6">
          {projects.map((project) => (
            <article key={project.number} className="project-card p-8 flex flex-col gap-6">
              {/* Card top */}
              <div className="flex items-start justify-between">
                <span
                  className="text-xs font-mono font-medium"
                  style={{ color: "hsl(var(--primary))" }}
                >
                  {project.number}
                </span>
                <div
                  className="rounded-lg px-3 py-1.5 text-center"
                  style={{ background: "hsl(var(--surface-elevated))" }}
                >
                  <div className="text-lg font-bold leading-none" style={{ color: "hsl(var(--primary))" }}>
                    {project.metric.value}
                  </div>
                  <div className="text-xs mt-0.5" style={{ color: "hsl(var(--muted-foreground))" }}>
                    {project.metric.label}
                  </div>
                </div>
              </div>

              {/* Title + impact */}
              <div>
                <h3
                  className="text-xl font-semibold mb-2 leading-snug"
                  style={{ color: "hsl(var(--foreground))", letterSpacing: "-0.01em" }}
                >
                  {project.title}
                </h3>
                <p className="text-sm font-medium" style={{ color: "hsl(var(--primary))" }}>
                  {project.impact}
                </p>
              </div>

              {/* Description */}
              <p className="text-sm leading-relaxed" style={{ color: "hsl(var(--muted-foreground))" }}>
                {project.description}
              </p>

              {/* Highlights */}
              <ul className="space-y-2">
                {project.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-2.5 text-sm" style={{ color: "hsl(var(--muted-foreground))" }}>
                    <span
                      className="mt-2 flex-shrink-0 h-1 w-1 rounded-full"
                      style={{ background: "hsl(var(--primary))" }}
                    />
                    {h}
                  </li>
                ))}
              </ul>

              {/* Stack */}
              <div className="flex flex-wrap gap-2 mt-auto pt-2" style={{ borderTop: "1px solid hsl(var(--border-subtle))" }}>
                {project.stack.map((s) => (
                  <span key={s} className="stack-pill">{s}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Dot indicators */}
      <div className="flex justify-center gap-2 mt-8">
        {projects.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollTo(i)}
            className="h-1.5 rounded-full transition-all duration-300"
            style={{
              width: i === activeIndex ? "20px" : "6px",
              background: i === activeIndex ? "hsl(var(--primary))" : "hsl(var(--border-subtle))",
            }}
            aria-label={`Go to project ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
