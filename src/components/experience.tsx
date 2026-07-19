import Reveal from "./reveal";
import MaskText from "./mask-text";
import SectionHeading from "./section-heading";
import CompanyLogo from "./company-logo";
import { experience } from "@/lib/content";
import { rich } from "@/lib/rich";

export default function Experience() {
  return (
    <section
      id="experience"
      aria-labelledby="experience-title"
      className="mx-auto max-w-7xl px-5 py-20 md:px-10 md:py-32"
    >
      <SectionHeading id="experience-title" index="02" title="Experience" note="2023 — Present" />
      <div>
        {experience.map((job, i) => (
          <article
            key={job.company}
            className="group -mx-5 border-t border-line px-5 py-10 transition-colors duration-300 hover:bg-bg-2/60 md:-mx-10 md:grid md:grid-cols-12 md:gap-8 md:px-10 md:py-14 last:border-b"
          >
            <Reveal
              className="mb-4 flex items-center gap-4 md:col-span-3 md:mb-0 md:flex-col md:items-start md:gap-5"
              y={0}
              x={-20}
              duration={0.65}
              delay={i * 0.05}
            >
              <CompanyLogo src={job.logo} alt={job.company} />
              <p className="font-mono text-[11px] uppercase leading-relaxed tracking-[0.2em] text-muted">
                {job.period}
                <br />
                {job.location}
              </p>
            </Reveal>
            <div className="md:col-span-9">
              <MaskText delay={0.08 + i * 0.05} duration={0.7}>
                <h3 className="font-display text-2xl font-semibold tracking-[-0.015em] md:text-3xl">
                  {job.role} <span className="text-muted">—</span>{" "}
                  <a href={job.url} target="_blank" rel="noreferrer" className="u-line">
                    {job.company}
                  </a>
                </h3>
              </MaskText>
              <ul className="mt-5 max-w-2xl space-y-3 text-[15px] leading-relaxed text-body">
                {job.points.map((point, j) => (
                  <Reveal key={point.slice(0, 24)} y={14} duration={0.55} delay={0.15 + j * 0.08}>
                    <li className="flex gap-3">
                      <span aria-hidden className="mt-px font-mono text-xs text-accent">
                        →
                      </span>
                      <span>{rich(point)}</span>
                    </li>
                  </Reveal>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
