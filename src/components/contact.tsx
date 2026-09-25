"use client";

import { ArrowUp, ArrowUpRight, FileDown } from "lucide-react";
import Reveal from "./reveal";
import MaskText from "./mask-text";
import Magnetic from "./magnetic";
import { profile } from "@/lib/content";
import { useHashScrollTo } from "./site-shell";

/** `index` is the section number shown in the kicker; pages number their own sections. */
export default function Contact({ index = "04" }: { index?: string }) {
  const scrollToHash = useHashScrollTo();

  return (
    <footer id="contact" aria-labelledby="contact-title" className="bg-bg-deep text-fg">
      <div className="mx-auto max-w-7xl px-5 py-20 md:px-10 md:py-28">
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-fg/50">
            <span className="mr-4 text-accent">{index}</span>Contact
          </p>
        </Reveal>

        <h2
          id="contact-title"
          className="mt-8 font-display text-[clamp(2.6rem,7vw,5.5rem)] font-semibold leading-[1.02] tracking-[-0.03em]"
        >
          <MaskText delay={0.05} duration={0.8}>
            Have a system to build,
          </MaskText>
          <MaskText delay={0.14} duration={0.8}>
            <span className="text-fg/55">or a role to fill?</span>
          </MaskText>
        </h2>

        <Reveal delay={0.2}>
          <p className="mt-6 max-w-md text-base leading-relaxed text-fg/60">
            I&rsquo;m open to software engineering roles and select freelance work. Email is
            fastest — I reply within a day.
          </p>
        </Reveal>

        <Reveal delay={0.24}>
          <div className="mt-12">
            <Magnetic className="inline-block">
              <a
                href={`mailto:${profile.email}`}
                className="u-line font-display text-2xl font-medium tracking-tight md:text-4xl"
              >
                {profile.email}
              </a>
            </Magnetic>
          </div>
        </Reveal>

        <Reveal delay={0.28}>
          <dl className="mt-14 grid gap-8 border-t border-fg/15 pt-8 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <dt className="font-mono text-[11px] uppercase tracking-[0.25em] text-fg/40">
                GitHub
              </dt>
              <dd className="mt-2 text-sm">
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer"
                  className="u-line inline-flex items-center gap-1"
                >
                  github.com/Abhiraj-cuchd <ArrowUpRight aria-hidden size={12} strokeWidth={1.75} />
                </a>
              </dd>
            </div>
            <div>
              <dt className="font-mono text-[11px] uppercase tracking-[0.25em] text-fg/40">
                LinkedIn
              </dt>
              <dd className="mt-2 text-sm">
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="u-line inline-flex items-center gap-1"
                >
                  in/abhiraj-ghosh <ArrowUpRight aria-hidden size={12} strokeWidth={1.75} />
                </a>
              </dd>
            </div>
            <div>
              <dt className="font-mono text-[11px] uppercase tracking-[0.25em] text-fg/40">
                Elsewhere
              </dt>
              <dd className="mt-2 text-sm">
                <a
                  href={profile.linktree}
                  target="_blank"
                  rel="noreferrer"
                  className="u-line inline-flex items-center gap-1"
                >
                  linktr.ee/dev_abhiraj <ArrowUpRight aria-hidden size={12} strokeWidth={1.75} />
                </a>
              </dd>
            </div>
            <div>
              <dt className="font-mono text-[11px] uppercase tracking-[0.25em] text-fg/40">
                Resume
              </dt>
              <dd className="mt-2 text-sm">
                <a
                  href={profile.resume}
                  download
                  className="inline-flex items-center gap-2 rounded-full border border-accent/60 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.18em] text-accent transition-colors duration-300 hover:border-accent hover:bg-accent hover:text-bg-deep"
                >
                  <FileDown aria-hidden size={12} strokeWidth={1.75} /> Download PDF
                </a>
              </dd>
            </div>
          </dl>
        </Reveal>

        <div className="mt-20 flex flex-wrap items-baseline justify-between gap-4 border-t border-fg/15 pt-6 font-mono text-[11px] uppercase tracking-[0.2em] text-fg/40">
          <span>© 2026 Abhiraj Ghosh</span>
          <span className="hidden md:inline">Hand-built in Next.js</span>
          <a
            href="#top"
            onClick={scrollToHash("top")}
            className="u-line inline-flex items-center gap-1 text-fg/70 hover:text-fg"
          >
            Back to top <ArrowUp aria-hidden size={12} strokeWidth={1.75} />
          </a>
        </div>
      </div>
    </footer>
  );
}
