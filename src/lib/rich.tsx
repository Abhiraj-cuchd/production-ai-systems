import type { ReactNode } from "react";

/**
 * Renders strings containing **bold** markers as <strong> spans.
 * Content strings are authored locally, so a tiny split-based
 * renderer beats pulling in a markdown dependency.
 */
export function rich(text: string): ReactNode[] {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith("**") && part.endsWith("**") ? (
      <strong key={i} className="font-semibold text-fg">
        {part.slice(2, -2)}
      </strong>
    ) : (
      <span key={i}>{part}</span>
    ),
  );
}
