import React, { useState } from 'react';
import { WORK_EXPERIENCES } from '../data/portfolioData';
import { trackExperienceTab } from '../utils/analytics';

export default function ExperienceTimeline() {
  const [activeIdx, setActiveIdx] = useState(0);
  const activeExp = WORK_EXPERIENCES[activeIdx];

  const handleTabClick = (idx, exp) => {
    trackExperienceTab(exp.company, exp.role);
    setActiveIdx(idx);
  };

  return (
    <section id="experience" data-hud-label="EXPERIENCE" className="relative border-b border-hairline">
      {/* Sticky Section Sub-Header */}
      <div className="sticky top-14 z-30 h-10 bg-obsidian/90 backdrop-blur-md border-b border-hairline px-6 flex items-center justify-between font-mono text-[11px] tracking-[0.16em] text-zinc-400">
        <div>
          <span className="text-white">02</span> / ENGINEERING LEADERSHIP
        </div>
        <div className="hidden sm:block">WHERE I&apos;VE WORKED • VERIFIED TRACK RECORD</div>
      </div>

      <div className="px-6 py-16 sm:py-20 max-w-5xl mx-auto">
        <div className="mb-12">
          <div className="inline-flex items-center space-x-2 font-mono text-[10px] tracking-[0.2em] text-neonGreen uppercase mb-3">
            <span>[ CAREER TELEMETRY ]</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight text-white leading-tight">
            High-scale leadership &amp;{' '}
            <span className="font-serif italic font-normal text-4xl sm:text-6xl text-neonCyan">
              execution.
            </span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-zinc-400 max-w-xl">
            From mentoring developer teams to architecting sub-100ms real-time pipelines and global merchant checkout engines.
          </p>
        </div>

        {/* Company Tab Switcher */}
        <div className="flex border-b border-hairline mb-8 overflow-x-auto">
          {WORK_EXPERIENCES.map((exp, idx) => (
            <button
              key={exp.company}
              onClick={() => handleTabClick(idx, exp)}
              className={`px-6 py-3 font-mono text-xs tracking-wider border-b-2 transition-all flex items-center gap-3 whitespace-nowrap cursor-pointer ${
                activeIdx === idx
                  ? 'border-neonCyan text-white bg-white/5 font-semibold'
                  : 'border-transparent text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.02]'
              }`}
            >
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: exp.color }}
              ></span>
              <span>{exp.company}</span>
              <span className="text-[10px] text-zinc-500 font-normal">
                ({exp.period})
              </span>
            </button>
          ))}
        </div>

        {/* Active Experience Card */}
        <div className="border border-white/10 bg-zinc-950/70 p-6 sm:p-8 relative">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-hairline gap-3">
            <div>
              <div className="flex items-center gap-3">
                <h3 className="text-2xl font-bold text-white tracking-tight">
                  {activeExp.role}
                </h3>
                <span className="font-mono text-xs text-neonCyan font-semibold">
                  @ {activeExp.company}
                </span>
              </div>
              <div className="font-mono text-xs text-zinc-400 mt-1">
                {activeExp.location} • {activeExp.period}
              </div>
            </div>

            <div className="font-mono text-[10px] px-3 py-1 bg-white/5 border border-white/10 text-zinc-300 w-fit">
              {activeExp.badge}
            </div>
          </div>

          {/* Sub-projects inside this role */}
          <div className="space-y-8">
            {activeExp.projects.map((proj, pIdx) => (
              <div key={pIdx} className="space-y-3">
                <h4 className="font-mono text-sm sm:text-base text-zinc-200 font-semibold flex items-center gap-2">
                  <span className="text-neonCyan">▶</span>
                  <span>{proj.title}</span>
                </h4>
                <ul className="space-y-2.5 pl-4 sm:pl-6 border-l border-white/10">
                  {proj.points.map((pt, ptIdx) => (
                    <li
                      key={ptIdx}
                      className="text-xs sm:text-sm text-zinc-400 leading-relaxed list-disc marker:text-zinc-600"
                    >
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
