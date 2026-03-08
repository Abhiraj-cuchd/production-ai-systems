import { motion } from "framer-motion";

export default function About() {
  return (
    <div className="mx-auto max-w-6xl px-4 md:px-6">
      <motion.p
        style={{
          color: "hsl(var(--foreground) / 0.6)",
          fontSize: "1rem",
          lineHeight: 1.75,
          maxWidth: 640,
          marginTop: 80,
          marginBottom: 60,
        }}
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        Based in Kolkata. I build AI infrastructure that handles real load — not demos. Three
        production systems shipped across RAG pipelines, event-driven compliance analyzers, and
        zero-downtime microservices on AWS. I care about fault tolerance, observability, and systems
        that don't wake you up at 3am.
      </motion.p>
    </div>
  );
}
