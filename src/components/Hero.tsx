import { motion } from 'framer-motion';
import { ArrowRight, Download, Github, Linkedin, Mail, MapPin } from 'lucide-react';
import { useEffect, useState } from 'react';
import { profile } from '../data';

function useTyping(words: string[], speed = 70, pause = 1600) {
  const [text, setText] = useState('');
  const [i, setI] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[i % words.length];
    if (!deleting && text === word) {
      const t = setTimeout(() => setDeleting(true), pause);
      return () => clearTimeout(t);
    }
    if (deleting && text === '') {
      setDeleting(false);
      setI((n) => n + 1);
      return;
    }
    const t = setTimeout(
      () => setText(deleting ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1)),
      deleting ? speed / 2 : speed,
    );
    return () => clearTimeout(t);
  }, [text, deleting, i, words, speed, pause]);

  return text;
}

const orbit = [
  { label: 'C#', className: 'left-[-6%] top-[18%]' },
  { label: '.NET', className: 'right-[-8%] top-[10%]' },
  { label: 'SQL Server', className: 'right-[-14%] bottom-[22%]' },
  { label: 'React', className: 'left-[-10%] bottom-[12%]' },
];

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
});

export default function Hero() {
  const typed = useTyping(profile.roles);

  return (
    <section id="top" className="relative overflow-hidden pb-16 pt-28 sm:pt-36">
      {/* background */}
      <div className="grid-bg pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute -left-32 top-10 h-80 w-80 animate-blob rounded-full bg-violet-brand/30 blur-3xl dark:bg-violet-brand/25" />
      <div className="pointer-events-none absolute -right-24 top-40 h-96 w-96 animate-blob rounded-full bg-sky-brand/25 blur-3xl [animation-delay:-5s]" />

      <div className="container-x relative grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <motion.div {...fadeUp(0)} className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-sm font-semibold text-emerald-700 dark:text-emerald-300">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
            </span>
            Open to work · Immediate joiner
          </motion.div>

          <motion.p {...fadeUp(0.05)} className="font-mono text-base text-slate-500 dark:text-slate-400">
            Hi there, I&apos;m
          </motion.p>
          <motion.h1 {...fadeUp(0.1)} className="mt-2 text-5xl font-extrabold tracking-tight text-slate-900 sm:text-6xl lg:text-7xl dark:text-white">
            Ashutosh <span className="text-gradient">Kumar</span>
          </motion.h1>

          <motion.div {...fadeUp(0.2)} className="mt-5 h-9 font-mono text-xl font-semibold text-dotnet sm:text-2xl dark:text-indigo-300" aria-label={profile.role}>
            <span aria-hidden="true">
              &gt; {typed}
              <span className="ml-0.5 inline-block h-6 w-[3px] translate-y-1 animate-blink bg-sky-brand" />
            </span>
          </motion.div>

          <motion.p {...fadeUp(0.3)} className="mt-6 max-w-xl text-lg leading-relaxed text-slate-600 dark:text-slate-400">
            {profile.tagline}
          </motion.p>

          <motion.div {...fadeUp(0.4)} className="mt-8 flex flex-wrap gap-3">
            <a href="#contact" className="btn-primary">
              Let&apos;s talk <ArrowRight size={16} />
            </a>
            <a href={profile.resume} download className="btn-ghost">
              <Download size={16} /> Download Resume
            </a>
          </motion.div>

          <motion.div {...fadeUp(0.5)} className="mt-8 flex flex-wrap items-center gap-5 text-sm text-slate-500 dark:text-slate-400">
            <div className="flex gap-2">
              {[
                { href: profile.github, icon: Github, label: 'GitHub' },
                { href: profile.linkedin, icon: Linkedin, label: 'LinkedIn' },
                { href: `mailto:${profile.email}`, icon: Mail, label: 'Email' },
              ].map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel="noreferrer"
                  aria-label={label}
                  className="grid h-11 w-11 place-items-center rounded-xl border border-slate-200 bg-white/60 text-slate-700 transition hover:-translate-y-0.5 hover:border-dotnet hover:text-dotnet dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:border-indigo-300 dark:hover:text-white"
                >
                  <Icon size={19} />
                </a>
              ))}
            </div>
            <span className="inline-flex items-center gap-1.5">
              <MapPin size={15} /> {profile.location} · Open to relocation
            </span>
          </motion.div>
        </div>

        {/* photo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-64 sm:w-80 lg:w-[22rem]"
        >
          <div className="absolute -inset-3 animate-spin-slow rounded-full bg-[conic-gradient(from_0deg,#7c3aed,#512BD4,#0ea5e9,#7c3aed)] opacity-80 blur-[2px]" />
          <div className="relative aspect-square overflow-hidden rounded-full border-[6px] border-slate-50 bg-ink-800 dark:border-ink-950">
            <img src={profile.photo} alt="Ashutosh Kumar" className="h-full w-full object-cover object-top" width={360} height={360} />
          </div>
          {orbit.map((o, idx) => (
            <motion.span
              key={o.label}
              className={`absolute ${o.className} rounded-xl border border-slate-200 bg-white/90 px-3 py-1.5 font-mono text-xs font-bold text-dotnet shadow-lg backdrop-blur dark:border-white/10 dark:bg-ink-800/90 dark:text-indigo-200`}
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3.5 + idx * 0.4, repeat: Infinity, ease: 'easeInOut', delay: idx * 0.3 }}
            >
              {o.label}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
