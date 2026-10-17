import React from 'react';
import { DEVELOPER_PROFILE, TECH_MATRIX, HOBBIES } from '../data/portfolioData';

export default function AboutTools() {
  return (
    <section id="about" data-hud-label="ARSENAL" className="relative border-b border-hairline">
      {/* Sticky Sub-Header */}
      <div className="sticky top-14 z-30 h-10 bg-obsidian/90 backdrop-blur-md border-b border-hairline px-6 flex items-center justify-between font-mono text-[11px] tracking-[0.16em] text-zinc-400">
        <div>
          <span className="text-white">05</span> / ARSENAL &amp; PERSONA
        </div>
        <div className="hidden sm:block">FULL-STACK SYSTEM ARCHITECT • NEW DELHI</div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 border-b border-hairline">
        {/* Left Column: Developer Portrait & Bio */}
        <div className="lg:col-span-5 p-6 sm:p-10 border-b lg:border-b-0 lg:border-r border-hairline flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-neonCyan/40 bg-zinc-900 flex-shrink-0">
                <img
                  src="/assets/amar.webp"
                  alt={DEVELOPER_PROFILE.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = '/assets/memoji-smile.png';
                  }}
                />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  {DEVELOPER_PROFILE.name}
                </h3>
                <div className="font-mono text-xs text-neonCyan mt-0.5">
                  Tech Lead // Systems Architect
                </div>
                <div className="font-mono text-[11px] text-zinc-400">
                  {DEVELOPER_PROFILE.location}
                </div>
              </div>
            </div>

            <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
              {DEVELOPER_PROFILE.bio}
            </p>

            <div className="mt-6 p-4 border border-white/10 bg-zinc-950/60 font-mono text-xs text-zinc-400 space-y-2">
              <div className="flex justify-between">
                <span className="text-zinc-500">EXPERIENCE:</span>
                <span className="text-white">{DEVELOPER_PROFILE.experienceYears}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">PRIMARY FOCUS:</span>
                <span className="text-neonCyan">Distributed Backends &amp; Next.js</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">STATUS:</span>
                <span className="text-neonGreen">Available for High-Impact Roles</span>
              </div>
            </div>
          </div>

          {/* Beyond the Code Badges */}
          <div className="mt-8">
            <div className="font-mono text-xs text-zinc-400 uppercase tracking-wider mb-3">
              BEYOND THE TERMINAL
            </div>
            <div className="flex flex-wrap gap-2">
              {HOBBIES.map((h) => (
                <div
                  key={h.name}
                  className="px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.03] text-xs text-zinc-300 flex items-center gap-2 hover:border-neonCyan/40 transition-colors"
                >
                  <span>{h.icon}</span>
                  <span className="font-medium">{h.name}</span>
                  <span className="text-[10px] text-zinc-500 font-mono">[{h.tag}]</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Technical Arsenal Matrix */}
        <div className="lg:col-span-7 p-6 sm:p-10 space-y-8">
          <div className="font-mono text-xs text-neonCyan tracking-[0.2em] uppercase">
            [ TECHNICAL ARSENAL &amp; MATRIX ]
          </div>
          <h3 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight">
            Tools chosen for throughput, not trends.
          </h3>

          <div className="space-y-6">
            {TECH_MATRIX.map((grp) => (
              <div key={grp.category} className="space-y-2.5">
                <div className="font-mono text-xs text-zinc-400 font-medium">
                  {grp.category}
                </div>
                <div className="flex flex-wrap gap-2">
                  {grp.items.map((item) => (
                    <span
                      key={item}
                      className="px-3 py-1 font-mono text-xs bg-zinc-950 border border-hairline text-zinc-300 hover:border-white/40 hover:text-white transition-all cursor-default"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
