import { Lock } from "lucide-react";

/**
 * Inventory AI Agent data flow. Built from HTML boxes rather than a fixed SVG
 * so it reflows at phone widths instead of shrinking the labels to nothing.
 */

function Node({
  kicker,
  name,
  detail,
  accent = false,
}: {
  kicker: string;
  name: string;
  detail?: React.ReactNode;
  accent?: boolean;
}) {
  return (
    <div className={`border bg-bg px-4 py-3 md:px-5 md:py-4 ${accent ? "border-accent/70" : "border-line"}`}>
      <p className={`font-mono text-[10px] uppercase tracking-[0.2em] ${accent ? "text-accent" : "text-muted"}`}>
        {kicker}
      </p>
      <p className="mt-1 font-display text-base font-semibold tracking-[-0.01em] md:text-lg">{name}</p>
      {detail ? <p className="mt-1 text-[13px] leading-snug text-body">{detail}</p> : null}
    </div>
  );
}

/** Vertical connector with a small arrowhead. */
function Down({ label }: { label?: string }) {
  return (
    <div aria-hidden className="relative mx-auto flex h-10 w-px flex-col items-center bg-line">
      <span className="absolute bottom-1 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rotate-45 border-b border-r border-line bg-bg-2" />
      {label ? (
        <span className="absolute left-3 top-1/2 -translate-y-1/2 whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
          {label}
        </span>
      ) : null}
    </div>
  );
}

export default function ArchitectureDiagram() {
  return (
    <figure className="my-10 md:my-14" aria-labelledby="arch-caption">
      <div className="border border-dashed border-line bg-bg-2 p-4 md:p-8">
        <div className="mb-6 flex flex-wrap items-baseline justify-between gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
          <span>On-prem · air-gapped</span>
          <span>No external network</span>
        </div>

        <div className="mx-auto max-w-xl">
          <Node kicker="Input" name="Paper challans" />
          <Down />
          <Node kicker="Ingestion" name="OCR pipeline" detail="PaddleOCR, then a REST API that writes the results" />
          <Down />
          <Node kicker="Storage" name="PostgreSQL + pgvector" detail="Inventory rows, with embeddings alongside" />
          <Down label="Staff question" />
          <Node kicker="Orchestration" name="LangGraph router" detail="Reads the question and picks a path" accent />

          {/* Branch: one line splits into two drops, one per agent. */}
          <div aria-hidden className="relative h-10">
            <span className="absolute left-1/2 top-0 h-5 w-px bg-line" />
            <span className="absolute left-1/4 right-1/4 top-5 h-px bg-line" />
            <span className="absolute left-1/4 top-5 h-5 w-px bg-line" />
            <span className="absolute right-1/4 top-5 h-5 w-px bg-line" />
          </div>
          <div className="grid grid-cols-2 gap-3 md:gap-4">
            <Node kicker="Path A" name="Retrieval agent" detail="pgvector + keyword search" />
            <Node
              kicker="Path B"
              name="Text2SQL agent"
              detail={
                <span className="inline-flex items-start gap-1.5">
                  <Lock aria-hidden size={12} strokeWidth={1.75} className="mt-[3px] shrink-0 text-accent" />
                  Read-only role, one schema, allow-listed queries
                </span>
              }
            />
          </div>
          {/* Merge: two rises join back into one line. */}
          <div aria-hidden className="relative h-10">
            <span className="absolute left-1/4 top-0 h-5 w-px bg-line" />
            <span className="absolute right-1/4 top-0 h-5 w-px bg-line" />
            <span className="absolute left-1/4 right-1/4 top-5 h-px bg-line" />
            <span className="absolute left-1/2 top-5 h-5 w-px bg-line" />
            <span className="absolute bottom-1 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rotate-45 border-b border-r border-line bg-bg-2" />
          </div>
          <Node kicker="Output" name="Answer in plain language" />

          <div className="mt-8 border-t border-line pt-4 font-mono text-[10px] uppercase leading-relaxed tracking-[0.18em] text-muted">
            <span className="text-accent">Mistral 8B, self-hosted</span> — serves the router and both agents on
            the local GPU
          </div>
        </div>
      </div>
      <figcaption id="arch-caption" className="mt-3 font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
        Fig. 1 — Data flow, from paper to answer
      </figcaption>
    </figure>
  );
}
