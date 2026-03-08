import { useState } from "react";
import { motion } from "framer-motion";

const posts = [
  {
    date: "Feb 2025",
    tag: "Architecture",
    title: "Why I Use SQS Over EventBridge for Worker Patterns",
    summary:
      "EventBridge excels at routing — but for high-throughput worker queues with DLQ support and fine-grained concurrency control, SQS is the right tool.",
    readTime: "6 min read",
  },
  {
    date: "Jan 2025",
    tag: "RAG",
    title: "RAG Architecture Tradeoffs: OpenSearch vs Bedrock Knowledge Bases",
    summary:
      "Managed Knowledge Bases reduce operational overhead, but custom OpenSearch gives you HNSW tuning, hybrid search, and full observability. A practical breakdown.",
    readTime: "9 min read",
  },
  {
    date: "Dec 2024",
    tag: "Infrastructure",
    title: "Blue/Green Deployments on ECS Fargate: A Practical Guide",
    summary:
      "How to wire CodeDeploy, ALB weighted routing, and task definition revisions for zero-downtime container deployments — without a manual rollback plan.",
    readTime: "8 min read",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] } },
};

function BlogCard({ post }: { post: typeof posts[0] }) {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href="#"
      className="block rounded-xl border transition-all duration-200 p-6 relative overflow-hidden"
      style={{
        background: hovered ? "hsl(var(--card))" : "hsl(var(--card))",
        borderColor: hovered ? "hsl(var(--primary) / 0.3)" : "hsl(var(--border-subtle))",
        textDecoration: "none",
        backgroundColor: hovered ? "hsl(var(--foreground) / 0.015)" : undefined,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Purple left border on hover */}
      <div
        className="absolute left-0 top-0 bottom-0 transition-all duration-200"
        style={{
          width: 3,
          background: "hsl(var(--primary))",
          opacity: hovered ? 1 : 0,
          transform: hovered ? "scaleX(1)" : "scaleX(0)",
          transformOrigin: "left",
          borderRadius: "4px 0 0 4px",
        }}
      />

      <div className="flex items-center justify-between mb-4 gap-2 flex-wrap">
        <span
          className="text-xs font-semibold rounded-md px-2 py-1 whitespace-nowrap"
          style={{
            background: "hsl(var(--primary) / 0.08)",
            color: "hsl(var(--primary))",
          }}
        >
          {post.tag}
        </span>
        <span className="text-xs whitespace-nowrap" style={{ color: "hsl(var(--muted-foreground))" }}>
          {post.readTime}
        </span>
      </div>

      <h3
        className="text-sm font-semibold mb-3 leading-snug"
        style={{ color: "hsl(var(--foreground))" }}
      >
        {post.title}
      </h3>

      <p className="text-xs leading-relaxed mb-5" style={{ color: "hsl(var(--muted-foreground))" }}>
        {post.summary}
      </p>

      <div className="flex items-center justify-between">
        <span className="text-xs" style={{ color: "hsl(var(--muted-foreground))" }}>
          {post.date}
        </span>
        <span
          className="text-xs font-medium flex items-center gap-1 transition-colors duration-200"
          style={{ color: "hsl(var(--primary))" }}
        >
          Read more
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m9 18 6-6-6-6"/>
          </svg>
        </span>
      </div>
    </a>
  );
}

export default function BlogPreview() {
  return (
    <section
      id="writing"
      className="py-16 md:py-32"
      style={{ borderTop: "1px solid hsl(var(--border-subtle))" }}
    >
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        {/* Header — desktop: all posts top-right; mobile: title only */}
        <motion.div
          className="mb-4"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex items-end justify-between">
            <div>
              <span
                className="text-xs font-semibold uppercase tracking-widest mb-3 block"
                style={{ color: "hsl(var(--primary))" }}
              >
                Writing
              </span>
              <h2
                className="text-3xl md:text-4xl font-bold tracking-tight"
                style={{ color: "hsl(var(--foreground))", letterSpacing: "-0.02em" }}
              >
                Engineering Notes
              </h2>
            </div>
            {/* Desktop-only "All posts" link */}
            <a
              href="#"
              className="hidden md:inline-flex items-center gap-1.5 text-sm font-medium transition-colors duration-200"
              style={{ color: "hsl(var(--muted-foreground))" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "hsl(var(--foreground))")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "hsl(var(--muted-foreground))")}
            >
              All posts
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m9 18 6-6-6-6"/>
              </svg>
            </a>
          </div>
        </motion.div>

        {/* Tagline */}
        <motion.p
          className="text-sm mb-12"
          style={{ color: "hsl(var(--muted-foreground))" }}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.4, delay: 0.08 }}
        >
          Deep dives into AI architecture, distributed systems tradeoffs, and production reliability.
        </motion.p>

        {/* Cards — 1 col mobile, 2 col tablet, 3 col desktop */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {posts.map((post) => (
            <motion.div key={post.title} variants={cardVariants}>
              <BlogCard post={post} />
            </motion.div>
          ))}
        </motion.div>

        {/* Mobile-only "All posts" link — centered below cards */}
        <div className="mt-8 flex justify-center md:hidden">
          <a
            href="#"
            className="inline-flex items-center gap-1.5 text-sm font-medium transition-colors duration-200"
            style={{ color: "hsl(var(--muted-foreground))", minHeight: 44 }}
          >
            All posts
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m9 18 6-6-6-6"/>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
