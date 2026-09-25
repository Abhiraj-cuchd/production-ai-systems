import Link from "next/link";
import { ArrowRight, ArrowUpRight, Globe, Lock } from "lucide-react";
import { SiGithub } from "@icons-pack/react-simple-icons";
import Reveal from "./reveal";
import MaskText from "./mask-text";
import SectionHeading from "./section-heading";
import { projects } from "@/lib/content";
import { rich } from "@/lib/rich";

export default function Projects() {
  return (
    <section
      id="work"
      aria-labelledby="work-title"
      className="mx-auto max-w-7xl px-5 py-20 md:px-10 md:py-32"
    >
      <SectionHeading id="work-title" index="03" title="Selected Work" note="Shipped & measured" />
      <div>
        {projects.map((p, i) => {
          const flip = i % 2 === 1;
          return (
            <article key={p.name} className="group border-t border-line py-12 last:border-b md:py-16">
              <div className="grid gap-8 md:grid-cols-12 md:gap-6">
                <Reveal
                  className={`md:col-span-2 ${flip ? "md:order-3 md:col-start-11 md:text-right" : ""}`}
                  y={20}
                  duration={0.6}
                >
                  <p aria-hidden className="font-display text-5xl font-semibold leading-none text-line md:text-6xl">
                    {p.index}
                  </p>
                  <p className="mt-3 font-mono text-[11px] uppercase leading-relaxed tracking-[0.2em] text-muted">
                    {p.type}
                  </p>
                </Reveal>

                <div className={`md:col-span-6 ${flip ? "md:order-1" : "md:col-start-3"}`}>
                  <MaskText duration={0.75}>
                    <h3 className="font-display text-3xl font-semibold tracking-[-0.02em] transition-transform duration-500 ease-out group-hover:translate-x-2 md:text-5xl">
                      {p.name}
                      {p.privateLabel ? null : (
                        <ArrowUpRight
                          aria-hidden
                          className="ml-3 inline-block align-top text-accent opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100"
                          size={22}
                          strokeWidth={1.75}
                        />
                      )}
                    </h3>
                  </MaskText>
                  <Reveal y={12} duration={0.5} delay={0.08}>
                    <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
                      {p.tagline}
                    </p>
                  </Reveal>
                  <Reveal y={20} duration={0.65} delay={0.14}>
                    <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-body">
                      {rich(p.detail)}
                    </p>
                  </Reveal>
                  <Reveal y={12} duration={0.5} delay={0.2}>
                    <p className="mt-5 font-mono text-[11px] uppercase leading-loose tracking-[0.14em] text-muted">
                      {p.tech.join(" / ")}
                    </p>
                  </Reveal>
                </div>

                <Reveal
                  className={`md:col-span-3 ${flip ? "md:order-2 md:col-start-8" : "md:col-start-10"}`}
                  y={28}
                  duration={0.7}
                  delay={0.1}
                >
                  <div className="border-l-2 border-accent pl-5">
                    <p className="font-display text-5xl font-semibold leading-none tracking-[-0.02em] md:text-6xl">
                      {p.metric.value}
                    </p>
                    <p className="mt-2 font-mono text-[11px] uppercase leading-relaxed tracking-[0.16em] text-muted">
                      {p.metric.label}
                    </p>
                  </div>
                  <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 font-mono text-[11px] uppercase tracking-[0.2em] md:flex-col md:gap-3">
                    {p.caseStudy ? (
                      <Link
                        href={p.caseStudy}
                        className="u-line inline-flex w-fit items-center gap-1.5 text-accent"
                      >
                        Read the case study <ArrowRight aria-hidden size={12} strokeWidth={1.75} />
                      </Link>
                    ) : null}
                    {p.github ? (
                      <a
                        href={p.github}
                        target="_blank"
                        rel="noreferrer"
                        className="u-line inline-flex w-fit items-center gap-1.5"
                      >
                        <SiGithub aria-hidden size={12} />
                        GitHub
                      </a>
                    ) : null}
                    {p.live ? (
                      <a
                        href={p.live}
                        target="_blank"
                        rel="noreferrer"
                        className="u-line inline-flex w-fit items-center gap-1.5"
                      >
                        <Globe aria-hidden size={12} strokeWidth={1.75} />
                        Live
                      </a>
                    ) : null}
                    {p.privateLabel ? (
                      <span className="inline-flex w-fit items-center gap-1.5 text-muted">
                        <Lock aria-hidden size={12} strokeWidth={1.75} />
                        {p.privateLabel}
                      </span>
                    ) : null}
                  </div>
                </Reveal>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
