import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import { Download, Menu, Moon, Sun, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { profile } from '../data';

const links = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dark, setDark] = useState(() => document.documentElement.classList.contains('dark'));
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle('dark', next);
    try {
      localStorage.setItem('theme', next ? 'dark' : 'light');
    } catch {
      /* storage unavailable */
    }
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? 'border-b border-slate-200/70 bg-white/75 backdrop-blur-xl dark:border-white/5 dark:bg-ink-950/70' : 'bg-transparent'
      }`}
    >
      <nav className="container-x flex h-16 items-center justify-between">
        <a href="#top" className="font-mono text-lg font-bold text-slate-900 dark:text-white" aria-label="Back to top">
          <span className="text-sky-brand">&lt;</span>
          <span className="text-gradient">Ashutosh</span>
          <span className="text-sky-brand"> /&gt;</span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-dotnet/5 hover:text-dotnet dark:text-slate-300 dark:hover:bg-white/5 dark:hover:text-white"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'}
            className="grid h-10 w-10 place-items-center rounded-xl border border-slate-200 text-slate-700 transition hover:border-dotnet hover:text-dotnet dark:border-white/10 dark:text-slate-200 dark:hover:border-indigo-300"
          >
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <a href={profile.resume} download className="btn-primary hidden !px-4 !py-2.5 sm:inline-flex">
            <Download size={16} /> Resume
          </a>
          <button
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
            aria-expanded={open}
            className="grid h-10 w-10 place-items-center rounded-xl border border-slate-200 text-slate-700 md:hidden dark:border-white/10 dark:text-slate-200"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      <motion.div style={{ scaleX: progress }} className="absolute bottom-0 left-0 right-0 h-[2px] origin-left bg-brand" />

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="container-x overflow-hidden border-t border-slate-200 bg-white/95 pb-4 md:hidden dark:border-white/5 dark:bg-ink-950/95"
          >
            {links.map((l) => (
              <li key={l.href}>
                <a onClick={() => setOpen(false)} href={l.href} className="block py-3 text-base font-medium text-slate-700 dark:text-slate-200">
                  {l.label}
                </a>
              </li>
            ))}
            <li className="pt-2">
              <a href={profile.resume} download className="btn-primary w-full justify-center">
                <Download size={16} /> Download Resume
              </a>
            </li>
          </motion.ul>
        )}
      </AnimatePresence>
    </header>
  );
}
