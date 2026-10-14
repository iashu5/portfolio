import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ChevronRight, Github } from 'lucide-react';
import { useState, type MouseEvent } from 'react';
import { projects, type Project } from '../data';
import { Section } from './ui';

const filters = ['All', '.NET', 'Full Stack', 'React'] as const;

function TiltCard({ p }: { p: Project }) {
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(y, [0, 1], [7, -7]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(x, [0, 1], [-7, 7]), { stiffness: 200, damping: 20 });
  const glowX = useTransform(x, (v) => `${v * 100}%`);
  const glowY = useTransform(y, (v) => `${v * 100}%`);

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - r.left) / r.width);
    y.set((e.clientY - r.top) / r.height);
  };
  const reset = () => {
    x.set(0.5);
    y.set(0.5);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.35 }}
      style={{ perspective: 1000 }}
    >
      <motion.div
        onMouseMove={onMove}
        onMouseLeave={reset}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="card group relative flex h-full flex-col overflow-hidden p-6"
      >
        <motion.div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: useTransform(
              [glowX, glowY] as never,
              ([gx, gy]: string[]) => `radial-gradient(420px circle at ${gx} ${gy}, rgba(124,58,237,0.16), transparent 45%)`,
            ),
          }}
        />
        <div className="absolute inset-x-0 top-0 h-1 bg-brand opacity-70" />

        <div className="relative flex items-start justify-between gap-3">
          <span className="chip">{p.tag}</span>
          <div className="flex gap-2">
            {p.links.map((l) => (
              <a
                key={l.url}
                href={l.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-2.5 py-1 text-xs font-semibold text-slate-700 transition hover:border-dotnet hover:text-dotnet dark:border-white/10 dark:text-slate-200 dark:hover:border-indigo-300 dark:hover:text-white"
              >
                <Github size={13} /> {l.label}
              </a>
            ))}
          </div>
        </div>

        <h3 className="relative mt-4 text-xl font-bold text-slate-900 dark:text-white">{p.title}</h3>
        <p className="relative mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{p.description}</p>

        {/* architecture flow */}
        <div className="relative mt-5 rounded-xl border border-dashed border-slate-300 bg-slate-50/80 p-3 dark:border-white/10 dark:bg-white/[0.03]">
          <p className="mb-2 font-mono text-[10px] font-bold uppercase tracking-widest text-slate-400">How it works</p>
          <div className="flex flex-wrap items-center gap-1">
            {p.flow.map((f, i) => (
              <span key={f} className="flex items-center gap-1">
                <span className="rounded-md bg-white px-2 py-1 font-mono text-[11px] font-semibold text-slate-700 shadow-sm dark:bg-ink-800 dark:text-slate-200">{f}</span>
                {i < p.flow.length - 1 && <ChevronRight size={14} className="text-sky-brand" />}
              </span>
            ))}
          </div>
        </div>

        <ul className="relative mt-4 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500 dark:text-slate-400">
          {p.highlights.map((h) => (
            <li key={h} className="before:mr-1.5 before:text-sky-brand before:content-['▹']">
              {h}
            </li>
          ))}
        </ul>

        <div className="relative mt-auto flex flex-wrap gap-1.5 pt-5">
          {p.tech.map((t) => (
            <span key={t} className="rounded-md bg-slate-100 px-2 py-0.5 font-mono text-[11px] text-slate-600 dark:bg-white/5 dark:text-slate-400">
              {t}
            </span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Projects() {
  const [filter, setFilter] = useState<(typeof filters)[number]>('All');
  const shown = projects.filter((p) => filter === 'All' || p.tag === filter);

  return (
    <Section
      id="projects"
      eyebrow="Selected work"
      title={
        <>
          Things I&apos;ve <span className="text-gradient">built</span>
        </>
      }
      intro="Personal projects built with the same stack I use at work. The code for each one is on GitHub."
    >
      <div className="mb-8 flex flex-wrap gap-2" role="tablist" aria-label="Filter projects">
        {filters.map((f) => (
          <button
            key={f}
            role="tab"
            aria-selected={filter === f}
            onClick={() => setFilter(f)}
            className={`relative rounded-xl px-4 py-2 text-sm font-semibold transition ${
              filter === f ? 'text-white' : 'text-slate-600 hover:text-dotnet dark:text-slate-400 dark:hover:text-white'
            }`}
          >
            {filter === f && <motion.span layoutId="pill" className="absolute inset-0 rounded-xl bg-brand" transition={{ type: 'spring', duration: 0.5 }} />}
            <span className="relative">{f}</span>
          </button>
        ))}
      </div>

      <motion.div layout className="grid gap-6 md:grid-cols-2">
        <AnimatePresence initial={false}>
          {shown.map((p) => (
            <TiltCard key={p.title} p={p} />
          ))}
        </AnimatePresence>
      </motion.div>

      <div className="mt-10 text-center">
        <a href="https://github.com/iashu5?tab=repositories" target="_blank" rel="noreferrer" className="btn-ghost">
          <Github size={16} /> See all repositories
        </a>
      </div>
    </Section>
  );
}
