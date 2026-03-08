import { useRef, useState, useEffect } from "react";
import { Github, FileText, Globe } from "lucide-react";

const projects = [
  {
    number: "01",
    title: "Serverless RAG Knowledge Assistant",
    impact: "Reduced semantic retrieval latency to under 2 seconds at scale using HNSW kNN indexing on OpenSearch.",
    description:
      "End-to-end serverless pipeline for document ingestion, embedding, and semantic retrieval. Documents are chunked at 512 tokens with overlap, embedded via Amazon Titan, indexed in OpenSearch with HNSW kNN, and queried through Bedrock Claude with structured prompting.",
    highlights: [
      "HNSW kNN indexing with cosine similarity in OpenSearch",
      "DLQ-backed ingestion with maxReceiveCount retry logic",
      "Per-Lambda IAM roles — zero shared credentials",
      "512-token overlapping chunks for semantic coherence",
    ],
    stack: ["Lambda", "Bedrock (Claude + Titan)", "OpenSearch", "DynamoDB", "S3", "API Gateway"],
    metric: { label: "Query latency", value: "< 2s" },
    links: { repo: "#", doc: "#", demo: "#" },
    arch: (
      <svg viewBox="0 0 320 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full" aria-hidden="true">
        <rect x="8" y="28" width="48" height="24" rx="4" fill="hsl(var(--primary) / 0.12)" stroke="hsl(var(--primary) / 0.3)" strokeWidth="1"/>
        <text x="32" y="44" textAnchor="middle" fontSize="7" fill="hsl(var(--primary))" fontFamily="monospace">S3</text>
        <line x1="56" y1="40" x2="76" y2="40" stroke="hsl(var(--border-subtle))" strokeWidth="1"/>
        <polyline points="73,37 76,40 73,43" stroke="hsl(var(--border-subtle))" strokeWidth="1" fill="none"/>
        <rect x="76" y="28" width="52" height="24" rx="4" fill="hsl(var(--surface-elevated))" stroke="hsl(var(--border-subtle))" strokeWidth="1"/>
        <text x="102" y="44" textAnchor="middle" fontSize="7" fill="hsl(var(--foreground))" fontFamily="monospace">Lambda</text>
        <line x1="128" y1="40" x2="148" y2="40" stroke="hsl(var(--border-subtle))" strokeWidth="1"/>
        <polyline points="145,37 148,40 145,43" stroke="hsl(var(--border-subtle))" strokeWidth="1" fill="none"/>
        <rect x="148" y="28" width="52" height="24" rx="4" fill="hsl(var(--surface-elevated))" stroke="hsl(var(--border-subtle))" strokeWidth="1"/>
        <text x="174" y="44" textAnchor="middle" fontSize="7" fill="hsl(var(--foreground))" fontFamily="monospace">Titan</text>
        <line x1="200" y1="40" x2="220" y2="40" stroke="hsl(var(--border-subtle))" strokeWidth="1"/>
        <polyline points="217,37 220,40 217,43" stroke="hsl(var(--border-subtle))" strokeWidth="1" fill="none"/>
        <rect x="220" y="20" width="60" height="24" rx="4" fill="hsl(var(--primary) / 0.12)" stroke="hsl(var(--primary) / 0.3)" strokeWidth="1"/>
        <text x="250" y="36" textAnchor="middle" fontSize="7" fill="hsl(var(--primary))" fontFamily="monospace">OpenSearch</text>
        <rect x="220" y="52" width="60" height="20" rx="4" fill="hsl(var(--surface-elevated))" stroke="hsl(var(--border-subtle))" strokeWidth="1"/>
        <text x="250" y="65" textAnchor="middle" fontSize="7" fill="hsl(var(--foreground))" fontFamily="monospace">Bedrock</text>
        <line x1="250" y1="44" x2="250" y2="52" stroke="hsl(var(--border-subtle))" strokeWidth="1" strokeDasharray="2 2"/>
        <rect x="76" y="60" width="52" height="16" rx="3" fill="hsl(var(--surface-elevated))" stroke="hsl(var(--border-subtle))" strokeWidth="1"/>
        <text x="102" y="71" textAnchor="middle" fontSize="6" fill="hsl(var(--muted-foreground))" fontFamily="monospace">DLQ</text>
        <line x1="102" y1="52" x2="102" y2="60" stroke="hsl(var(--border-subtle))" strokeWidth="1" strokeDasharray="2 2"/>
      </svg>
    ),
  },
  {
    number: "02",
    title: "AI Document Risk & Compliance Analyzer",
    impact: "Achieved 99.9% message processing reliability through fully async fan-out with DLQ-backed fault tolerance.",
    description:
      "Fully asynchronous compliance analysis pipeline. Documents arrive via S3 events, fan into SQS, trigger Lambda workers that invoke Bedrock Claude for structured risk classification, and route high-severity findings through SNS to stakeholder channels.",
    highlights: [
      "DLQ with maxReceiveCount=3 for fault tolerance",
      "Idempotent DynamoDB writes via conditional expressions",
      "Reserved concurrency as a hard Bedrock rate guard",
      "Structured JSON risk output from Claude via Bedrock",
    ],
    stack: ["Lambda", "Bedrock (Claude)", "SQS", "SNS", "DynamoDB", "S3"],
    metric: { label: "Message reliability", value: "99.9%" },
    links: { repo: "#", doc: "#", demo: "#" },
    arch: (
      <svg viewBox="0 0 320 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full" aria-hidden="true">
        <rect x="8" y="28" width="40" height="24" rx="4" fill="hsl(var(--primary) / 0.12)" stroke="hsl(var(--primary) / 0.3)" strokeWidth="1"/>
        <text x="28" y="44" textAnchor="middle" fontSize="7" fill="hsl(var(--primary))" fontFamily="monospace">S3</text>
        <line x1="48" y1="40" x2="62" y2="40" stroke="hsl(var(--border-subtle))" strokeWidth="1"/>
        <polyline points="59,37 62,40 59,43" stroke="hsl(var(--border-subtle))" strokeWidth="1" fill="none"/>
        <rect x="62" y="28" width="44" height="24" rx="4" fill="hsl(var(--surface-elevated))" stroke="hsl(var(--border-subtle))" strokeWidth="1"/>
        <text x="84" y="44" textAnchor="middle" fontSize="7" fill="hsl(var(--foreground))" fontFamily="monospace">SQS</text>
        <rect x="62" y="60" width="44" height="16" rx="3" fill="hsl(var(--surface-elevated))" stroke="hsl(var(--border-subtle))" strokeWidth="1"/>
        <text x="84" y="71" textAnchor="middle" fontSize="6" fill="hsl(var(--muted-foreground))" fontFamily="monospace">DLQ ×3</text>
        <line x1="84" y1="52" x2="84" y2="60" stroke="hsl(var(--border-subtle))" strokeWidth="1" strokeDasharray="2 2"/>
        <line x1="106" y1="40" x2="120" y2="40" stroke="hsl(var(--border-subtle))" strokeWidth="1"/>
        <polyline points="117,37 120,40 117,43" stroke="hsl(var(--border-subtle))" strokeWidth="1" fill="none"/>
        <rect x="120" y="28" width="52" height="24" rx="4" fill="hsl(var(--surface-elevated))" stroke="hsl(var(--border-subtle))" strokeWidth="1"/>
        <text x="146" y="44" textAnchor="middle" fontSize="7" fill="hsl(var(--foreground))" fontFamily="monospace">Lambda</text>
        <line x1="172" y1="40" x2="186" y2="40" stroke="hsl(var(--border-subtle))" strokeWidth="1"/>
        <polyline points="183,37 186,40 183,43" stroke="hsl(var(--border-subtle))" strokeWidth="1" fill="none"/>
        <rect x="186" y="28" width="52" height="24" rx="4" fill="hsl(var(--primary) / 0.12)" stroke="hsl(var(--primary) / 0.3)" strokeWidth="1"/>
        <text x="212" y="44" textAnchor="middle" fontSize="7" fill="hsl(var(--primary))" fontFamily="monospace">Bedrock</text>
        <line x1="238" y1="40" x2="256" y2="40" stroke="hsl(var(--border-subtle))" strokeWidth="1"/>
        <polyline points="253,37 256,40 253,43" stroke="hsl(var(--border-subtle))" strokeWidth="1" fill="none"/>
        <rect x="256" y="20" width="44" height="20" rx="4" fill="hsl(var(--surface-elevated))" stroke="hsl(var(--border-subtle))" strokeWidth="1"/>
        <text x="278" y="33" textAnchor="middle" fontSize="7" fill="hsl(var(--foreground))" fontFamily="monospace">SNS</text>
        <rect x="256" y="48" width="44" height="20" rx="4" fill="hsl(var(--surface-elevated))" stroke="hsl(var(--border-subtle))" strokeWidth="1"/>
        <text x="278" y="61" textAnchor="middle" fontSize="7" fill="hsl(var(--foreground))" fontFamily="monospace">DynamoDB</text>
        <line x1="238" y1="48" x2="256" y2="58" stroke="hsl(var(--border-subtle))" strokeWidth="1" strokeDasharray="2 2"/>
      </svg>
    ),
  },
  {
    number: "03",
    title: "Cloud-Native Ticketing Microservices Platform",
    impact: "Eliminated deployment downtime entirely by migrating a NestJS monolith to Blue/Green ECS Fargate with automated rollback.",
    description:
      "Full migration of a NestJS monolith to containerized microservices on ECS Fargate with Blue/Green CodeDeploy and RDS PostgreSQL Multi-AZ. Private VPC networking with layered security groups — all secrets managed via Secrets Manager.",
    highlights: [
      "RDS Multi-AZ with automatic failover < 60s",
      "SNS + SQS fanout for decoupled inter-service events",
      "Private VPC subnets — no direct public exposure",
      "Per-task IAM execution roles — no shared credentials",
    ],
    stack: ["ECS Fargate", "RDS PostgreSQL Multi-AZ", "SNS/SQS", "ALB", "CodeDeploy", "Secrets Manager"],
    metric: { label: "Deployment downtime", value: "0s" },
    links: { repo: "#", doc: "#", demo: "#" },
    arch: (
      <svg viewBox="0 0 320 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full" aria-hidden="true">
        <rect x="8" y="28" width="40" height="24" rx="4" fill="hsl(var(--primary) / 0.12)" stroke="hsl(var(--primary) / 0.3)" strokeWidth="1"/>
        <text x="28" y="44" textAnchor="middle" fontSize="7" fill="hsl(var(--primary))" fontFamily="monospace">ALB</text>
        <line x1="48" y1="40" x2="62" y2="40" stroke="hsl(var(--border-subtle))" strokeWidth="1"/>
        <polyline points="59,37 62,40 59,43" stroke="hsl(var(--border-subtle))" strokeWidth="1" fill="none"/>
        <rect x="62" y="20" width="64" height="40" rx="4" fill="hsl(var(--surface-elevated))" stroke="hsl(var(--border-subtle))" strokeWidth="1"/>
        <text x="94" y="37" textAnchor="middle" fontSize="7" fill="hsl(var(--foreground))" fontFamily="monospace">ECS</text>
        <text x="94" y="50" textAnchor="middle" fontSize="6" fill="hsl(var(--muted-foreground))" fontFamily="monospace">Fargate</text>
        <rect x="62" y="64" width="64" height="14" rx="3" fill="none" stroke="hsl(var(--border-subtle))" strokeWidth="1" strokeDasharray="3 2"/>
        <text x="94" y="74" textAnchor="middle" fontSize="6" fill="hsl(var(--muted-foreground))" fontFamily="monospace">CodeDeploy B/G</text>
        <line x1="126" y1="40" x2="144" y2="40" stroke="hsl(var(--border-subtle))" strokeWidth="1"/>
        <polyline points="141,37 144,40 141,43" stroke="hsl(var(--border-subtle))" strokeWidth="1" fill="none"/>
        <rect x="144" y="20" width="44" height="20" rx="4" fill="hsl(var(--surface-elevated))" stroke="hsl(var(--border-subtle))" strokeWidth="1"/>
        <text x="166" y="33" textAnchor="middle" fontSize="7" fill="hsl(var(--foreground))" fontFamily="monospace">SNS</text>
        <rect x="144" y="48" width="44" height="20" rx="4" fill="hsl(var(--surface-elevated))" stroke="hsl(var(--border-subtle))" strokeWidth="1"/>
        <text x="166" y="61" textAnchor="middle" fontSize="7" fill="hsl(var(--foreground))" fontFamily="monospace">SQS</text>
        <line x1="166" y1="40" x2="166" y2="48" stroke="hsl(var(--border-subtle))" strokeWidth="1"/>
        <line x1="188" y1="40" x2="204" y2="40" stroke="hsl(var(--border-subtle))" strokeWidth="1"/>
        <polyline points="201,37 204,40 201,43" stroke="hsl(var(--border-subtle))" strokeWidth="1" fill="none"/>
        <rect x="204" y="12" width="108" height="56" rx="4" fill="none" stroke="hsl(var(--border-subtle))" strokeWidth="1" strokeDasharray="3 2"/>
        <text x="258" y="22" textAnchor="middle" fontSize="6" fill="hsl(var(--muted-foreground))" fontFamily="monospace">Private VPC</text>
        <rect x="214" y="28" width="40" height="24" rx="4" fill="hsl(var(--primary) / 0.12)" stroke="hsl(var(--primary) / 0.3)" strokeWidth="1"/>
        <text x="234" y="40" textAnchor="middle" fontSize="6.5" fill="hsl(var(--primary))" fontFamily="monospace">RDS</text>
        <text x="234" y="50" textAnchor="middle" fontSize="6" fill="hsl(var(--primary))" fontFamily="monospace">Multi-AZ</text>
        <rect x="262" y="28" width="44" height="24" rx="4" fill="hsl(var(--surface-elevated))" stroke="hsl(var(--border-subtle))" strokeWidth="1"/>
        <text x="284" y="40" textAnchor="middle" fontSize="6" fill="hsl(var(--foreground))" fontFamily="monospace">Secrets</text>
        <text x="284" y="50" textAnchor="middle" fontSize="6" fill="hsl(var(--muted-foreground))" fontFamily="monospace">Manager</text>
      </svg>
    ),
  },
];

export default function Projects() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollTo = (index: number) => {
    const container = carouselRef.current;
    if (!container) return;
    const cards = container.querySelectorAll<HTMLElement>(".project-card");
    if (!cards[index]) return;
    const card = cards[index];
    container.scrollTo({ left: card.offsetLeft - container.offsetLeft, behavior: "smooth" });
    setActiveIndex(index);
  };

  const scrollPrev = () => scrollTo(Math.max(0, activeIndex - 1));
  const scrollNext = () => scrollTo(Math.min(projects.length - 1, activeIndex + 1));

  useEffect(() => {
    const container = carouselRef.current;
    if (!container) return;

    container.scrollLeft = 0;

    const handleScroll = () => {
      const cards = Array.from(container.querySelectorAll<HTMLElement>(".project-card"));
      const scrollLeft = container.scrollLeft;
      let closest = 0;
      let minDist = Infinity;
      cards.forEach((card, i) => {
        const dist = Math.abs(card.offsetLeft - container.offsetLeft - scrollLeft);
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
    <section id="projects" className="py-16 md:py-32 overflow-hidden" style={{ borderTop: "1px solid hsl(var(--border-subtle))" }}>
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        {/* Header */}
        <div className="flex items-end justify-between mb-10 md:mb-12">
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
              className="flex items-center justify-center rounded-lg border transition-all duration-200"
              style={{
                width: 44,
                height: 44,
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
              className="flex items-center justify-center rounded-lg border transition-all duration-200"
              style={{
                width: 44,
                height: 44,
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

      {/* Carousel — full bleed */}
      <div className="w-full overflow-hidden">
        <div
          ref={carouselRef}
          className="carousel-container"
          style={{ paddingLeft: "max(1rem, calc((100vw - 1152px) / 2 + 1.5rem))", paddingRight: "1.5rem" }}
        >
          {projects.map((project) => (
            <article
              key={project.number}
              className="project-card flex flex-col"
              style={{ padding: 28 }}
            >
              {/* Card top */}
              <div className="flex items-start justify-between mb-5">
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
              <div className="mb-4">
                <h3
                  className="font-semibold mb-2 leading-snug"
                  style={{ color: "hsl(var(--foreground))", letterSpacing: "-0.01em", fontSize: "clamp(1rem, 2.5vw, 1.125rem)" }}
                >
                  {project.title}
                </h3>
                <p className="text-sm font-medium" style={{ color: "hsl(var(--primary))" }}>
                  {project.impact}
                </p>
              </div>

              {/* Architecture diagram */}
              <div
                className="rounded-lg p-4 mb-4"
                style={{ background: "hsl(var(--surface-elevated))", border: "1px solid hsl(var(--border-subtle))" }}
              >
                {project.arch}
              </div>

              {/* Description — 2 sentences max */}
              <p
                className="text-sm leading-relaxed mb-4"
                style={{ color: "hsl(var(--muted-foreground))", fontSize: "clamp(0.8rem, 1.5vw, 0.875rem)" }}
              >
                {project.description}
              </p>

              {/* Highlights — max 4 bullets, 6px gap */}
              <ul className="mb-4" style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {project.highlights.slice(0, 4).map((h) => (
                  <li key={h} className="flex items-start gap-2.5 text-sm" style={{ color: "hsl(var(--muted-foreground))", fontSize: "clamp(0.8rem, 1.5vw, 0.875rem)" }}>
                    <span
                      className="flex-shrink-0 h-1 w-1 rounded-full"
                      style={{ background: "hsl(var(--primary))", marginTop: 8 }}
                    />
                    {h}
                  </li>
                ))}
              </ul>

              {/* Stack pills */}
              <div className="flex flex-wrap gap-2 pb-4" style={{ borderBottom: "1px solid hsl(var(--border-subtle))" }}>
                {project.stack.map((s) => (
                  <span key={s} className="stack-pill">{s}</span>
                ))}
              </div>

              {/* Action buttons — always visible, pushed to bottom */}
              <div className="pt-4 mt-auto flex flex-wrap gap-2">
                <a
                  href={project.links.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg px-4 text-xs font-semibold transition-all duration-200 flex-1 min-w-[110px] justify-center"
                  style={{
                    border: "1px solid hsl(var(--border-subtle))",
                    color: "hsl(var(--muted-foreground))",
                    height: 44,
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "hsl(var(--foreground) / 0.2)";
                    (e.currentTarget as HTMLElement).style.color = "hsl(var(--foreground))";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "hsl(var(--border-subtle))";
                    (e.currentTarget as HTMLElement).style.color = "hsl(var(--muted-foreground))";
                  }}
                >
                  <Github size={13} strokeWidth={1.75} />
                  Code Repo
                </a>
                <a
                  href={project.links.doc}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg px-4 text-xs font-semibold transition-all duration-200 flex-1 min-w-[110px] justify-center"
                  style={{
                    border: "1px solid hsl(var(--border-subtle))",
                    color: "hsl(var(--muted-foreground))",
                    height: 44,
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "hsl(var(--foreground) / 0.2)";
                    (e.currentTarget as HTMLElement).style.color = "hsl(var(--foreground))";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "hsl(var(--border-subtle))";
                    (e.currentTarget as HTMLElement).style.color = "hsl(var(--muted-foreground))";
                  }}
                >
                  <FileText size={13} strokeWidth={1.75} />
                  Design Doc
                </a>
                <a
                  href={project.links.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg px-4 text-xs font-semibold transition-all duration-200 flex-1 min-w-[110px] justify-center"
                  style={{
                    background: "hsl(var(--primary))",
                    color: "hsl(var(--primary-foreground))",
                    height: 44,
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow = "0 0 16px hsl(var(--primary) / 0.4)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow = "none";
                  }}
                >
                  <Globe size={13} strokeWidth={1.75} />
                  Live Demo
                </a>
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
            className="rounded-full transition-all duration-300"
            style={{
              height: 6,
              width: i === activeIndex ? 20 : 6,
              background: i === activeIndex ? "hsl(var(--primary))" : "hsl(var(--border-subtle))",
              minWidth: 6,
              minHeight: 6,
            }}
            aria-label={`Go to project ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
