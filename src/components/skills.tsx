import Reveal from "./reveal";
import SectionHeading from "./section-heading";
import SkillChip from "./skill-chip";
import { skills } from "@/lib/content";

export default function Skills() {
  return (
    <section id="stack" aria-labelledby="stack-title" className="border-t border-line bg-bg-2/45">
      <div className="mx-auto max-w-7xl px-5 py-20 md:px-10 md:py-32">
        <SectionHeading id="stack-title" title="Stack" note="What I reach for" />
        <dl>
          {skills.map((s, i) => (
            <Reveal key={s.group} delay={i * 0.04} y={16} duration={0.55}>
              <div className="grid gap-2 border-t border-line py-5 last:border-b md:grid-cols-12 md:items-baseline md:gap-8 md:py-6">
                <dt className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted md:col-span-3">
                  {s.group}
                </dt>
                <dd className="flex flex-wrap gap-x-2 gap-y-2 text-base md:col-span-9 md:text-lg">
                  {s.items.map((item) => (
                    <SkillChip key={item} name={item} />
                  ))}
                </dd>
              </div>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
