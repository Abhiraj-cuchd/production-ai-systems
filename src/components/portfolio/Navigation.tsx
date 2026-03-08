import { useEffect, useState } from "react";
import { Github, Linkedin } from "lucide-react";

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "border-b backdrop-blur-md" : ""
      }`}
      style={{
        background: scrolled ? "hsl(var(--background) / 0.85)" : "transparent",
        borderColor: scrolled ? "hsl(var(--border-subtle))" : "transparent",
      }}
    >
      <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex flex-col leading-none group">
          <span className="text-sm font-semibold tracking-tight" style={{ color: "hsl(var(--foreground))" }}>
            Abhiraj Ghosh
          </span>
          <span className="text-xs font-medium" style={{ color: "hsl(var(--muted-foreground))" }}>
            AI Systems Engineer
          </span>
        </a>

        {/* Nav links */}
        <nav className="hidden md:flex items-center gap-8">
          <a href="#projects" className="nav-link pb-0.5">Projects</a>
          <a href="#approach" className="nav-link pb-0.5">Approach</a>
          <a href="#writing" className="nav-link pb-0.5">Writing</a>
        </nav>

        {/* Right side: social icons + CTA */}
        <div className="hidden md:flex items-center gap-3">
          {/* GitHub icon button */}
          <a
            href="https://github.com/abhirajghosh"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile"
            className="flex items-center justify-center transition-all duration-200"
            style={{
              color: "hsl(var(--muted-foreground))",
              minWidth: 44,
              minHeight: 44,
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.color = "hsl(var(--primary))";
              (e.currentTarget as HTMLElement).style.transform = "scale(1.1)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.color = "hsl(var(--muted-foreground))";
              (e.currentTarget as HTMLElement).style.transform = "scale(1)";
            }}
          >
            <Github size={17} strokeWidth={1.75} />
          </a>

          {/* LinkedIn icon button */}
          <a
            href="https://linkedin.com/in/abhirajghosh"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn profile"
            className="flex items-center justify-center transition-all duration-200"
            style={{
              color: "hsl(var(--muted-foreground))",
              minWidth: 44,
              minHeight: 44,
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.color = "hsl(var(--primary))";
              (e.currentTarget as HTMLElement).style.transform = "scale(1.1)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.color = "hsl(var(--muted-foreground))";
              (e.currentTarget as HTMLElement).style.transform = "scale(1)";
            }}
          >
            <Linkedin size={17} strokeWidth={1.75} />
          </a>

          {/* CTA */}
          <a
            href="mailto:abhiraj@example.com"
            className="inline-flex items-center rounded-lg px-4 py-2 text-xs font-semibold transition-all duration-200"
            style={{
              border: "1px solid hsl(var(--border-subtle))",
              color: "hsl(var(--muted-foreground))",
              minHeight: 44,
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
            Get in touch
          </a>
        </div>
      </div>
    </header>
  );
}
