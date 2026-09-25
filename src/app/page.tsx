import SiteShell from "@/components/site-shell";
import SiteHeader from "@/components/site-header";
import Hero from "@/components/hero";
import About from "@/components/about";
import Experience from "@/components/experience";
import Projects from "@/components/projects";
import Skills from "@/components/skills";
import Contact from "@/components/contact";
import StackSection from "@/components/stack-section";

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Abhiraj Ghosh",
  url: "https://www.abhirajghosh.tech",
  email: "mailto:abhirajcuchd@gmail.com",
  jobTitle: "Backend Software Engineer",
  worksFor: { "@type": "Organization", name: "Talentelgia Technologies" },
  address: { "@type": "PostalAddress", addressLocality: "Chandigarh", addressCountry: "IN" },
  sameAs: [
    "https://github.com/Abhiraj-cuchd",
    "https://www.linkedin.com/in/abhiraj-ghosh",
    "https://linktr.ee/dev_abhiraj",
  ],
};

export default function Page() {
  return (
    <SiteShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <SiteHeader />
      <main id="main">
        {/* Every section pins once fully scrolled, then the next one slides
            up over it — the same reveal Hero does, repeated down the page.
            StackSection handles sections taller than the viewport (it pins
            them by their bottom edge, so nothing becomes unreachable).
            z-index climbs with scroll order so later sections always paint
            over earlier, still-pinned ones; each needs an opaque background,
            plus a soft top shadow so the layering reads as a card sliding
            over, not ordinary scrolling (the sections share one colour).
            Contact is last, so it has nothing to pin under. */}
        <Hero />
        <StackSection className="relative z-10 min-h-svh bg-bg shadow-[0_-24px_48px_-16px_rgb(0_0_0/0.7)]">
          <About />
          {/* Stack is part of About, so it carries no section number of its own. */}
          <Skills />
        </StackSection>
        <StackSection className="relative z-20 min-h-svh bg-bg shadow-[0_-24px_48px_-16px_rgb(0_0_0/0.7)]">
          <Experience />
        </StackSection>
        <StackSection className="relative z-30 min-h-svh bg-bg shadow-[0_-24px_48px_-16px_rgb(0_0_0/0.7)]">
          <Projects />
        </StackSection>
        <div className="relative z-50 min-h-svh bg-bg-deep">
          <Contact />
        </div>
      </main>
    </SiteShell>
  );
}
