import SiteShell from "@/components/site-shell";
import SiteHeader from "@/components/site-header";
import Hero from "@/components/hero";
import About from "@/components/about";
import Experience from "@/components/experience";
import Projects from "@/components/projects";
import Skills from "@/components/skills";
import Contact from "@/components/contact";

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Abhiraj Ghosh",
  url: "https://www.abhirajghosh.tech",
  email: "mailto:abhirajcuchd@gmail.com",
  jobTitle: "Software Engineer",
  worksFor: { "@type": "Organization", name: "Talentelgia Technologies" },
  address: { "@type": "PostalAddress", addressLocality: "Chandigarh", addressCountry: "IN" },
  sameAs: ["https://github.com/Abhiraj-cuchd", "https://linktr.ee/dev_abhiraj"],
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
        {/* Each section pins at the top of the viewport in turn, then the
            next one slides up over it — the same reveal Hero does, repeated
            down the page. z-index climbs with scroll order so later
            sections always paint over earlier (still-pinned) ones.

            Only short sections (About, Experience — reliably under one
            viewport at desktop sizes) get `sticky`, and only from `lg` up:
            a sticky element taller than the viewport can't be scrolled
            while pinned, so its own overflow becomes unreachable — that's
            what broke Projects' third entry originally, and on narrow/short
            mobile viewports even About/Experience's own content can run
            past one viewport, so they stay in normal (`static`) flow below
            `lg` and only pin on larger screens where the content reliably
            fits. Taller sections (Projects, Skills) skip the self-pin
            entirely at every size — they still get fully covered by the
            next section once it catches up, via z-index + an opaque
            background. */}
        <Hero />
        <div className="relative z-10 bg-bg lg:sticky lg:top-0 lg:min-h-svh">
          <About />
        </div>
        <div className="relative z-20 bg-bg lg:sticky lg:top-0 lg:min-h-svh">
          <Experience />
        </div>
        <div className="relative z-30 bg-bg">
          <Projects />
        </div>
        <div className="relative z-40 bg-bg-2">
          <Skills />
        </div>
        <div className="relative z-50 min-h-svh bg-bg-deep">
          <Contact />
        </div>
      </main>
    </SiteShell>
  );
}
