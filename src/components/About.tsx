import { Building2, FileBarChart, Landmark, MessageSquareText, ScanFace, Server } from 'lucide-react';
import { motion } from 'framer-motion';
import { expertise } from '../data';
import { Reveal, Section } from './ui';

const icons = { Landmark, ScanFace, FileBarChart, Building2, Server, MessageSquareText };

const K = ({ children }: { children: string }) => <span className="text-[#c792ea]">{children}</span>;
const T = ({ children }: { children: string }) => <span className="text-[#82aaff]">{children}</span>;
const S = ({ children }: { children: string }) => <span className="text-[#c3e88d]">{children}</span>;
const P = ({ children }: { children: string }) => <span className="text-[#f78c6c]">{children}</span>;

export default function About() {
  return (
    <Section
      id="about"
      eyebrow="About me"
      title={
        <>
          I build software that <span className="text-gradient">moves money and people</span>.
        </>
      }
    >
      <div className="grid gap-8 lg:grid-cols-2">
        <Reveal className="space-y-5 text-lg leading-relaxed text-slate-600 dark:text-slate-400">
          <p>
            I&apos;m a <strong className="text-slate-900 dark:text-white">.NET Full Stack Developer</strong> with{' '}
            <strong className="text-slate-900 dark:text-white">2 years of experience</strong> building enterprise web applications in the{' '}
            <strong className="text-slate-900 dark:text-white">ERP</strong> and <strong className="text-slate-900 dark:text-white">finance (NBFC)</strong>{' '}
            domains.
          </p>
          <p>
            Most recently I built loan-processing and customer-onboarding workflows for an NBFC, including biometric and webcam KYC,
            DigiLocker, Aadhaar and CIBIL integrations, RDLC reports and SMS alerts. Before that I built ERP modules for hiring, quality
            (NCR) and room booking.
          </p>
          <p>
            I care about OOP, clean code that's easy to maintain, and shipping in Agile teams. I hold an <strong className="text-slate-900 dark:text-white">MCA</strong>{' '}
            from Chandigarh University.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0d1224] shadow-2xl shadow-dotnet/20">
            <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
              <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
              <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
              <span className="h-3 w-3 rounded-full bg-[#28c840]" />
              <span className="ml-3 font-mono text-xs text-slate-400">Ashutosh.cs</span>
            </div>
            <pre className="overflow-x-auto p-5 font-mono text-[13px] leading-6 text-slate-300 sm:text-sm">
              <code>
                <K>var</K> ashutosh = <K>new</K> <T>Developer</T>
                {'\n{\n'}
                {'    '}Role       = <S>".NET Full Stack Developer"</S>,{'\n'}
                {'    '}Experience = <S>"2 years"</S>,{'\n'}
                {'    '}Domains    = [<S>"ERP"</S>, <S>"NBFC"</S>],{'\n'}
                {'    '}Backend    = [<S>"C#"</S>, <S>".NET Core"</S>, <S>"Web API"</S>],{'\n'}
                {'    '}Frontend   = [<S>"React"</S>, <S>"TypeScript"</S>],{'\n'}
                {'    '}Database   = [<S>"SQL Server"</S>, <S>"MySQL"</S>],{'\n'}
                {'    '}OpenToWork = <P>true</P>,{'\n'}
                {'    '}Relocation = <P>true</P>{'\n'}
                {'};\n\n'}
                <K>await</K> ashutosh.<T>JoinYourTeamAsync</T>();
              </code>
            </pre>
          </div>
        </Reveal>
      </div>

      <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {expertise.map((e, i) => {
          const Icon = icons[e.icon];
          return (
            <Reveal key={e.title} delay={i * 0.06}>
              <motion.div whileHover={{ y: -6 }} className="card group h-full p-6 transition-colors hover:border-dotnet/40 dark:hover:border-indigo-400/40">
                <div className="mb-4 grid h-12 w-12 place-items-center rounded-xl bg-brand text-white shadow-lg shadow-dotnet/30 transition-transform group-hover:rotate-6 group-hover:scale-110">
                  <Icon size={22} />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">{e.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{e.text}</p>
              </motion.div>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
