import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

export function Reveal({ children, delay = 0, className = '' }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function Section({ id, eyebrow, title, intro, children }: { id: string; eyebrow: string; title: ReactNode; intro?: string; children: ReactNode }) {
  return (
    <section id={id} className="relative py-20 sm:py-28">
      <div className="container-x">
        <Reveal className="mb-12 max-w-2xl">
          <p className="mb-3 font-mono text-sm font-semibold uppercase tracking-[0.2em] text-dotnet dark:text-indigo-300">
            <span className="text-sky-brand">//</span> {eyebrow}
          </p>
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl dark:text-white">{title}</h2>
          {intro && <p className="mt-4 text-lg leading-relaxed text-slate-600 dark:text-slate-400">{intro}</p>}
        </Reveal>
        {children}
      </div>
    </section>
  );
}
