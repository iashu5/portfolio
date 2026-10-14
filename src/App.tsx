import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { useEffect, useState } from 'react';
import About from './components/About';
import Contact from './components/Contact';
import Education from './components/Education';
import Experience from './components/Experience';
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Stats from './components/Stats';
import { profile } from './data';

export default function App() {
  const [showTop, setShowTop] = useState(false);
  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 800);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Education />
        <Contact />
      </main>

      <footer className="border-t border-slate-200 py-10 dark:border-white/5">
        <div className="container-x flex flex-col items-center justify-between gap-3 text-sm text-slate-500 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {profile.name} · Built with React, TypeScript, Tailwind & Framer Motion
          </p>
          <p className="font-mono">
            <span className="text-sky-brand">&lt;</span>
            <span className="text-gradient font-bold">Ashutosh</span>
            <span className="text-sky-brand"> /&gt;</span>
          </p>
        </div>
      </footer>

      <AnimatePresence>
        {showTop && (
          <motion.a
            href="#top"
            aria-label="Back to top"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            className="fixed bottom-6 right-6 z-40 grid h-12 w-12 place-items-center rounded-2xl bg-brand text-white shadow-xl shadow-dotnet/40 transition hover:-translate-y-1"
          >
            <ArrowUp size={20} />
          </motion.a>
        )}
      </AnimatePresence>
    </>
  );
}
