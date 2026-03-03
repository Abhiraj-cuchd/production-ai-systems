import { useEffect } from "react";

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

export default function BlogPreview() {
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

    const els = document.querySelectorAll(".blog-reveal");
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="writing"
      className="py-24 md:py-32"
      style={{ borderTop: "1px solid hsl(var(--border-subtle))" }}
    >
      <div className="mx-auto max-w-6xl px-6">
        {/* Header */}
        <div className="flex items-end justify-between mb-4 reveal blog-reveal">
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

        {/* Tagline */}
        <p
          className="text-sm mb-12 reveal blog-reveal"
          style={{ color: "hsl(var(--muted-foreground))", transitionDelay: "40ms" }}
        >
          Deep dives into AI architecture, distributed systems tradeoffs, and production reliability.
        </p>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {posts.map((post, i) => (
            <a
              key={post.title}
              href="#"
              className="blog-card reveal blog-reveal p-6 block"
              style={{ transitionDelay: `${80 + i * 80}ms`, textDecoration: "none" }}
            >
              <div className="flex items-center justify-between mb-4">
                <span
                  className="text-xs font-semibold rounded-md px-2 py-1"
                  style={{
                    background: "hsl(var(--primary) / 0.08)",
                    color: "hsl(var(--primary))",
                  }}
                >
                  {post.tag}
                </span>
                <span className="text-xs" style={{ color: "hsl(var(--muted-foreground))" }}>
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
          ))}
        </div>
      </div>
    </section>
  );
}
