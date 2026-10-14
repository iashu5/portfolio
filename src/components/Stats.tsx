import { animate, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { stats } from '../data';
import { Reveal } from './ui';

function Counter({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, to, { duration: 1.4, ease: 'easeOut', onUpdate: (v) => setN(Math.round(v)) });
    return () => c.stop();
  }, [inView, to]);
  return (
    <span ref={ref}>
      {n}
      {suffix}
    </span>
  );
}

export default function Stats() {
  return (
    <div className="container-x">
      <Reveal className="card grid grid-cols-2 divide-slate-200 overflow-hidden md:grid-cols-4 md:divide-x dark:divide-white/10">
        {stats.map((s) => (
          <div key={s.label} className="p-6 text-center sm:p-8">
            <div className="text-gradient text-4xl font-extrabold sm:text-5xl">
              <Counter to={s.value} suffix={s.suffix} />
            </div>
            <p className="mt-2 text-sm font-medium text-slate-500 dark:text-slate-400">{s.label}</p>
          </div>
        ))}
      </Reveal>
    </div>
  );
}
