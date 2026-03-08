import { motion } from "framer-motion";
import { CardSpotlight } from "@/components/ui/card-spotlight";

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

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.25, 0.1, 0.25, 1] },
  },
};

export default function FocusAreas() {
  return (
    <section className="py-16 md:py-32">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        {/* Section header */}
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
            Expertise
          </span>
          <h2
            className="text-3xl md:text-4xl font-bold tracking-tight"
            style={{ color: "hsl(var(--foreground))", letterSpacing: "-0.02em" }}
          >
            Core Focus Areas
          </h2>
        </motion.div>

        {/* Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {areas.map((area) => (
            <motion.div key={area.title} variants={cardVariants}>
              <CardSpotlight
                className="focus-card p-7 h-full"
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
              </CardSpotlight>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
