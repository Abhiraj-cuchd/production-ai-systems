import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Lock } from "lucide-react";
import SiteShell from "@/components/site-shell";
import SiteHeader from "@/components/site-header";
import SectionHeading from "@/components/section-heading";
import Reveal from "@/components/reveal";
import MaskText from "@/components/mask-text";
import ArchitectureDiagram from "@/components/architecture-diagram";
import Contact from "@/components/contact";
import { caseStudies, getCaseStudy } from "@/lib/case-studies";
import { rich } from "@/lib/rich";

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const cs = getCaseStudy((await params).slug);
  if (!cs) return {};
  const title = `${cs.name} — Case study`;
  return {
    title,
    description: cs.metaDescription,
    alternates: { canonical: `/work/${cs.slug}` },
    openGraph: { type: "article", url: `/work/${cs.slug}`, title, description: cs.metaDescription },
    twitter: { card: "summary_large_image", title, description: cs.metaDescription },
  };
}

export default async function CaseStudyPage({ params }: Params) {
  const cs = getCaseStudy((await params).slug);
  if (!cs) notFound();

  return (
    <SiteShell>
      <SiteHeader />
      <main id="main">
        <article>
          <header className="relative overflow-hidden border-b border-line">
            <div aria-hidden className="bg-columns absolute inset-0" />
            <div className="relative mx-auto max-w-7xl px-5 pb-16 pt-28 md:px-10 md:pb-24 md:pt-36">
              <Reveal y={10} duration={0.5}>
                <Link
                  href="/#work"
                  className="u-line inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.2em] text-muted hover:text-fg"
                >
                  <ArrowLeft aria-hidden size={12} strokeWidth={1.75} /> Selected Work
                </Link>
              </Reveal>
              <Reveal y={10} duration={0.5} delay={0.05}>
                <p className="mt-10 font-mono text-[11px] uppercase tracking-[0.25em] text-accent">{cs.kicker}</p>
              </Reveal>
              <h1 className="mt-4 font-display text-[clamp(2.6rem,8vw,6.5rem)] font-bold leading-[0.95] tracking-[-0.035em]">
                <MaskText duration={0.85}>{cs.name}</MaskText>
              </h1>
              <Reveal delay={0.15} y={20}>
                <p className="mt-8 max-w-2xl text-base leading-relaxed text-body md:text-lg">{cs.summary}</p>
              </Reveal>

              <div className="mt-14 grid gap-10 md:grid-cols-12">
                <Reveal className="md:col-span-7" delay={0.2} y={16}>
                  <dl className="grid gap-5 border-l border-line pl-6 sm:grid-cols-2">
                    {cs.facts.map((f) => (
                      <div key={f.label}>
                        <dt className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">{f.label}</dt>
                        <dd className="mt-1 text-sm leading-relaxed">{f.value}</dd>
                      </div>
                    ))}
                  </dl>
                </Reveal>
                <Reveal className="md:col-span-4 md:col-start-9" delay={0.25} y={16}>
                  <div className="border-l-2 border-accent pl-5">
                    <p className="font-display text-5xl font-semibold leading-none tracking-[-0.02em] md:text-6xl">
                      {cs.metric.value}
                    </p>
                    <p className="mt-2 font-mono text-[11px] uppercase leading-relaxed tracking-[0.16em] text-muted">
                      {cs.metric.label}
                    </p>
                  </div>
                  <p className="mt-6 inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
                    <Lock aria-hidden size={12} strokeWidth={1.75} /> No public link: private, air-gapped deployment
                  </p>
                </Reveal>
              </div>
            </div>
          </header>

          {cs.sections.map((section) => (
            <section
              key={section.index}
              aria-labelledby={`cs-${section.index}`}
              className="mx-auto max-w-7xl px-5 py-16 md:px-10 md:py-24"
            >
              <SectionHeading
                id={`cs-${section.index}`}
                index={section.index}
                title={section.title}
                note={section.note}
              />
              <div className="grid md:grid-cols-12">
                <div className="md:col-span-8 md:col-start-3">
                  {section.body.map((para, i) => (
                    <Reveal key={i} y={16} duration={0.55} delay={i * 0.05}>
                      <p className="mb-5 max-w-2xl text-base leading-relaxed text-body md:text-[17px]">
                        {rich(para)}
                      </p>
                    </Reveal>
                  ))}

                  {section.diagram ? (
                    <Reveal y={24} duration={0.7}>
                      <ArchitectureDiagram />
                    </Reveal>
                  ) : null}

                  {section.points ? (
                    <dl
                      className={`mt-4 grid gap-x-10 ${
                        section.points.length === 4 && !section.diagram ? "sm:grid-cols-2" : ""
                      }`}
                    >
                      {section.points.map((pt, j) => (
                        <Reveal key={pt.title} y={14} duration={0.55} delay={0.05 + j * 0.05}>
                          <div className="border-t border-line py-6">
                            <dt className="flex gap-3 font-display text-lg font-semibold tracking-[-0.01em] md:text-xl">
                              <span aria-hidden className="mt-1 font-mono text-xs text-accent">
                                →
                              </span>
                              {pt.title}
                            </dt>
                            <dd className="mt-2 max-w-2xl pl-6 text-[15px] leading-relaxed text-body">
                              {rich(pt.body)}
                            </dd>
                          </div>
                        </Reveal>
                      ))}
                    </dl>
                  ) : null}
                </div>
              </div>
            </section>
          ))}

          {cs.related ? (
            <aside className="mx-auto max-w-7xl px-5 pb-20 md:px-10 md:pb-32">
              <div className="grid md:grid-cols-12">
                <Reveal className="md:col-span-8 md:col-start-3" y={16}>
                  <div className="border border-line bg-bg-2/60 p-6 md:p-8">
                    <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">Related work</p>
                    <p className="mt-3 font-display text-xl font-semibold tracking-[-0.01em] md:text-2xl">
                      {cs.related.title}
                    </p>
                    <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-body">{rich(cs.related.body)}</p>
                  </div>
                </Reveal>
              </div>
            </aside>
          ) : null}
        </article>
        <Contact index={String(cs.sections.length + 1).padStart(2, "0")} />
      </main>
    </SiteShell>
  );
}
