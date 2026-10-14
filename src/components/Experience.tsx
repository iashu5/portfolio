import { motion, useScroll } from 'framer-motion';
import { Briefcase, CheckCircle2, MapPin } from 'lucide-react';
import { useRef } from 'react';
import { experience } from '../data';
import { Reveal, Section } from './ui';

export default function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 60%'] });

  return (
    <Section
      id="experience"
      eyebrow="Career journey"
      title={
        <>
          Where I&apos;ve <span className="text-gradient">worked</span>
        </>
      }
    >
      <div ref={ref} className="relative">
        {/* rail */}
        <div className="absolute bottom-0 left-5 top-0 w-[3px] rounded-full bg-slate-200 md:left-1/2 md:-translate-x-1/2 dark:bg-white/10" />
        <motion.div
          style={{ scaleY: scrollYProgress }}
          className="absolute bottom-0 left-5 top-0 w-[3px] origin-top rounded-full bg-gradient-to-b from-violet-brand via-dotnet to-sky-brand md:left-1/2 md:-translate-x-1/2"
        />

        <div className="space-y-12">
          {experience.map((job, i) => {
            const right = i % 2 === 1;
            return (
              <div key={job.company} className={`relative md:flex ${right ? 'md:justify-end' : ''}`}>
                {/* node */}
                <div className="absolute left-5 top-6 z-10 -translate-x-1/2 md:left-1/2">
                  <span className="relative flex h-5 w-5">
                    {i === 0 && <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-brand opacity-60" />}
                    <span className="relative h-5 w-5 rounded-full border-4 border-slate-50 bg-brand dark:border-ink-950" />
                  </span>
                </div>

                <Reveal className={`ml-12 md:ml-0 md:w-[calc(50%-2.5rem)]`} delay={0.05}>
                  <motion.article whileHover={{ y: -4 }} className="card p-6 transition-colors hover:border-dotnet/40 dark:hover:border-indigo-400/40">
                    <div className="flex items-start gap-4">
                      <div className="grid h-12 w-12 shrink-0 place-items-center overflow-hidden rounded-xl border border-slate-200 bg-white dark:border-white/10">
                        {job.logo ? (
                          <img src={job.logo} alt="" className="h-full w-full object-contain p-1" loading="lazy" />
                        ) : (
                          <Briefcase className="text-dotnet" size={22} />
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="font-mono text-xs font-semibold text-sky-600 dark:text-sky-brand">{job.period}</p>
                        <h3 className="mt-1 text-lg font-bold leading-snug text-slate-900 dark:text-white">{job.role}</h3>
                        <p className="text-sm font-medium text-slate-600 dark:text-slate-300">{job.company}</p>
                        <p className="mt-1 flex flex-wrap items-center gap-x-3 text-xs text-slate-500">
                          <span className="inline-flex items-center gap-1">
                            <MapPin size={12} /> {job.location}
                          </span>
                          <span className="rounded-full bg-dotnet/10 px-2 py-0.5 font-semibold text-dotnet dark:text-indigo-300">{job.domain}</span>
                        </p>
                      </div>
                    </div>
                    <ul className="mt-5 space-y-2.5">
                      {job.points.map((p) => (
                        <li key={p} className="flex gap-2.5 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                          <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-emerald-500" />
                          {p}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-5 flex flex-wrap gap-1.5">
                      {job.tech.map((t) => (
                        <span key={t} className="chip">
                          {t}
                        </span>
                      ))}
                    </div>
                  </motion.article>
                </Reveal>
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
