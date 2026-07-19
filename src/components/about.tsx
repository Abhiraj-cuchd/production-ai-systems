import Reveal from "./reveal";
import SectionHeading from "./section-heading";
import Stats from "./stats";
import { about } from "@/lib/content";

export default function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="mx-auto max-w-7xl px-5 py-20 md:px-10 md:py-32">
      <SectionHeading id="about-title" index="01" title="About" note="The short version" />
      <div className="grid gap-10 md:grid-cols-12">
        <Reveal className="md:col-span-7" delay={0.05} y={36}>
          <p className="font-display text-2xl font-medium leading-snug tracking-[-0.015em] md:text-[2rem]">
            {about.lead}
          </p>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-body">{about.body}</p>
        </Reveal>
        <Reveal className="md:col-span-4 md:col-start-9" delay={0.15} y={20}>
          <dl className="space-y-5 border-l border-line pl-6">
            {about.facts.map((f) => (
              <div key={f.label}>
                <dt className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
                  {f.label}
                </dt>
                <dd className="mt-1 text-sm leading-relaxed">{f.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
      <Stats />
    </section>
  );
}
