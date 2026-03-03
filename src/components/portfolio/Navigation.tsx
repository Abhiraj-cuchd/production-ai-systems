import { useEffect, useState } from "react";

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

        {/* CTA */}
        <a
          href="mailto:abhiraj@example.com"
          className="hidden md:inline-flex items-center rounded-lg px-4 py-2 text-xs font-semibold transition-all duration-200"
          style={{
            border: "1px solid hsl(var(--border-subtle))",
            color: "hsl(var(--muted-foreground))",
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
    </header>
  );
}
