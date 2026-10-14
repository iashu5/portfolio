import { Award, ExternalLink, GraduationCap } from 'lucide-react';
import { certifications, education } from '../data';
import { Reveal, Section } from './ui';

export default function Education() {
  return (
    <Section
      id="education"
      eyebrow="Learning"
      title={
        <>
          Education & <span className="text-gradient">certifications</span>
        </>
      }
    >
      <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
        <div className="space-y-5">
          {education.map((e, i) => (
            <Reveal key={e.degree} delay={i * 0.08}>
              <div className="card flex items-center gap-5 p-6">
                <div className="grid h-16 w-16 shrink-0 place-items-center overflow-hidden rounded-2xl border border-slate-200 bg-white p-1.5 dark:border-white/10">
                  <img src={e.logo} alt={`${e.school} logo`} className="h-full w-full object-contain" loading="lazy" />
                </div>
                <div>
                  <p className="font-mono text-xs font-semibold text-sky-600 dark:text-sky-brand">{e.period}</p>
                  <h3 className="mt-1 font-bold text-slate-900 dark:text-white">{e.degree}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {e.school} · {e.place}
                  </p>
                </div>
                <GraduationCap className="ml-auto hidden shrink-0 text-dotnet/40 sm:block dark:text-indigo-300/30" size={36} />
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="card h-full p-6">
            <h3 className="mb-4 flex items-center gap-2 font-mono text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              <Award size={18} className="text-dotnet dark:text-indigo-300" /> Certifications
            </h3>
            <ul className="divide-y divide-slate-200 dark:divide-white/10">
              {certifications.map((c) => (
                <li key={c.title}>
                  <a href={c.url} target="_blank" rel="noreferrer" className="group flex items-center justify-between gap-3 py-3.5">
                    <span>
                      <span className="block font-semibold text-slate-800 group-hover:text-dotnet dark:text-slate-200 dark:group-hover:text-white">{c.title}</span>
                      <span className="text-xs text-slate-500">{c.issuer}</span>
                    </span>
                    <ExternalLink size={16} className="shrink-0 text-slate-400 transition group-hover:translate-x-0.5 group-hover:text-dotnet dark:group-hover:text-indigo-300" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
