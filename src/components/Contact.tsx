import { CheckCircle2, Download, Github, Linkedin, Loader2, Mail, Send } from 'lucide-react';
import { useState, type FormEvent } from 'react';
import { profile } from '../data';
import { Reveal, Section } from './ui';

type Status = 'idle' | 'sending' | 'sent' | 'error';

export default function Contact() {
  const [status, setStatus] = useState<Status>('idle');

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus('sending');
    try {
      const body = new URLSearchParams(new FormData(form) as unknown as Record<string, string>).toString();
      const res = await fetch('/', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body });
      if (!res.ok) throw new Error(String(res.status));
      form.reset();
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  };

  const input =
    'w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-dotnet focus:ring-4 focus:ring-dotnet/15 dark:border-white/10 dark:bg-ink-800 dark:text-white dark:focus:border-indigo-400';

  return (
    <Section
      id="contact"
      eyebrow="Contact"
      title={
        <>
          Let&apos;s build something <span className="text-gradient">together</span>
        </>
      }
      intro="I'm looking for .NET and Full Stack Developer roles. I can join immediately and I'm open to relocating. I usually reply within 24 hours."
    >
      <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
        <Reveal className="space-y-4">
          {[
            { icon: Mail, label: 'Email', value: profile.email, href: `mailto:${profile.email}` },
            { icon: Linkedin, label: 'LinkedIn', value: 'linkedin.com/in/iashu5', href: profile.linkedin },
            { icon: Github, label: 'GitHub', value: 'github.com/iashu5', href: profile.github },
          ].map(({ icon: Icon, label, value, href }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel="noreferrer"
              className="card group flex items-center gap-4 p-5 transition hover:-translate-y-1 hover:border-dotnet/40 dark:hover:border-indigo-400/40"
            >
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-brand text-white shadow-lg shadow-dotnet/30">
                <Icon size={20} />
              </span>
              <span>
                <span className="block text-xs font-semibold uppercase tracking-wider text-slate-500">{label}</span>
                <span className="font-semibold text-slate-900 group-hover:text-dotnet dark:text-white dark:group-hover:text-indigo-200">{value}</span>
              </span>
            </a>
          ))}
          <a href={profile.resume} download className="btn-primary w-full justify-center !py-4">
            <Download size={18} /> Download my resume (PDF)
          </a>
        </Reveal>

        <Reveal delay={0.1}>
          <form name="contact" method="POST" data-netlify="true" netlify-honeypot="bot-field" onSubmit={onSubmit} className="card space-y-4 p-6 sm:p-8">
            <input type="hidden" name="form-name" value="contact" />
            <p hidden>
              <label>
                Don&apos;t fill this out: <input name="bot-field" />
              </label>
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="mb-1.5 block text-sm font-semibold text-slate-700 dark:text-slate-300">Name</span>
                <input required name="name" autoComplete="name" placeholder="Your name" className={input} />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-sm font-semibold text-slate-700 dark:text-slate-300">Email</span>
                <input required type="email" name="email" autoComplete="email" placeholder="you@company.com" className={input} />
              </label>
            </div>
            <label className="block">
              <span className="mb-1.5 block text-sm font-semibold text-slate-700 dark:text-slate-300">Message</span>
              <textarea required name="message" rows={5} placeholder="Tell me about the role or project…" className={`${input} resize-none`} />
            </label>
            <button type="submit" disabled={status === 'sending'} className="btn-primary w-full justify-center !py-3.5 disabled:opacity-60">
              {status === 'sending' ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
              {status === 'sending' ? 'Sending…' : 'Send message'}
            </button>
            <div aria-live="polite">
              {status === 'sent' && (
                <p className="flex items-center gap-2 text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 size={16} /> Thanks! Your message was sent. I&apos;ll get back to you soon.
                </p>
              )}
              {status === 'error' && (
                <p className="text-sm font-semibold text-rose-600 dark:text-rose-400">
                  Something went wrong. Please email me directly at {profile.email}.
                </p>
              )}
            </div>
          </form>
        </Reveal>
      </div>
    </Section>
  );
}
