import { motion } from 'framer-motion';
import { skillGroups, skillIcons } from '../data';
import { Reveal, Section } from './ui';

export default function Skills() {
  const icons = skillIcons.split(',');
  return (
    <Section
      id="skills"
      eyebrow="Tech stack"
      title={
        <>
          Tools I use to <span className="text-gradient">ship</span>
        </>
      }
      intro="Mostly the Microsoft stack on the backend and React on the frontend, plus the integrations finance apps need."
    >
      <Reveal className="mb-12">
        <div className="relative overflow-hidden py-2 [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
          <motion.div
            className="flex w-max gap-4"
            animate={{ x: ['0%', '-50%'] }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          >
            {[...icons, ...icons].map((i, idx) => (
              <div key={idx} className="card grid h-20 w-20 shrink-0 place-items-center !rounded-2xl">
                <img src={`https://skillicons.dev/icons?i=${i}`} alt={i} className="h-11 w-11" loading="lazy" width={44} height={44} />
              </div>
            ))}
          </motion.div>
        </div>
      </Reveal>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((g, i) => (
          <Reveal key={g.title} delay={i * 0.05}>
            <div className="card h-full p-6">
              <h3 className="mb-4 flex items-center gap-2 font-mono text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                <span className="h-2 w-2 rounded-full bg-brand" />
                {g.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {g.items.map((s) => (
                  <motion.span key={s} whileHover={{ scale: 1.08 }} className="chip cursor-default">
                    {s}
                  </motion.span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
