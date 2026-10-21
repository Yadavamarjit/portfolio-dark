import React, { useState } from 'react';
import { SHIPPED_SYSTEMS } from '../data/portfolioData';
import { trackSystemSelect, trackSystemModalClose } from '../utils/analytics';

export default function SystemsBento({ selectedSystemId, onSelectSystem }) {
  const [modalSystem, setModalSystem] = useState(null);

  const handleOpenDetail = (system) => {
    trackSystemSelect(system.id, system.title, 'bento_card');
    setModalSystem(system);
    if (onSelectSystem) onSelectSystem(system.id);
  };

  const handleCloseDetail = () => {
    if (modalSystem) {
      trackSystemModalClose(modalSystem.id);
    }
    setModalSystem(null);
  };

  return (
    <section id="systems" data-hud-label="SYSTEMS" className="relative border-b border-hairline bg-[#060606]">
      {/* Sticky Sub-Header Bar */}
      <div className="sticky top-14 z-30 h-10 bg-obsidian/90 backdrop-blur-md border-b border-hairline px-6 flex items-center justify-between font-mono text-[11px] tracking-[0.14em] text-zinc-400">
        <div className="flex items-center gap-2">
          <span className="text-white font-bold">01</span>
          <span className="text-zinc-600">//</span>
          <span className="text-zinc-300">PRODUCTION ARCHITECTURES</span>
        </div>
        <div className="hidden sm:block text-zinc-500 font-mono text-[10px] tracking-widest">
          LIVE DEPLOYMENTS — DETERMINISTIC HIGH-THROUGHPUT NODES
        </div>
      </div>

      {/* Editorial Intro Header */}
      <div className="px-6 py-14 sm:py-16 border-b border-hairline max-w-4xl">
        <div className="font-mono text-[10px] tracking-[0.22em] text-neonCyan uppercase mb-2">
          [ ARCHITECTURAL NODES // SILICON IC SPECIFICATION ]
        </div>
        <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight text-white leading-[1.1]">
          The throughput that mere{' '}
          <span className="font-serif italic font-normal text-4xl sm:text-6xl text-neonCyan">
            templates
          </span>{' '}
          cannot buy.
        </h2>
        <p className="mt-4 text-zinc-400 text-sm sm:text-base max-w-2xl leading-relaxed font-sans">
          Boilerplate breaks at scale. Production traffic craves deterministic control. Below are 8 core deployed systems featuring custom database partitioning, asynchronous queue workers, cryptographic handshakes, and sub-40ms latency budgets.
        </p>
      </div>

      {/* 2-Column Grid of Silicon-Chip System Nodes (Matching Hero Floating Card Aesthetic) */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-px bg-white/[0.07]">
        {SHIPPED_SYSTEMS.map((sys) => {
          const isHighlighted = selectedSystemId === sys.id;

          return (
            <article
              key={sys.id}
              id={`system-${sys.id}`}
              onClick={() => handleOpenDetail(sys)}
              className={`relative bg-[#09090e] p-6 sm:p-7 flex flex-col justify-between cursor-pointer group transition-all duration-300 overflow-hidden ${
                isHighlighted ? 'ring-1 ring-neonCyan/70 bg-[#0c0c14]' : 'hover:bg-[#0c0c13]'
              }`}
            >
              {/* Top Subtle Ambient Colored Glow Halo */}
              <div
                className="absolute -top-16 left-1/2 -translate-x-1/2 w-72 h-32 rounded-full blur-3xl pointer-events-none transition-opacity duration-300 opacity-20 group-hover:opacity-60"
                style={{ backgroundColor: sys.accentColor }}
              />

              {/* Silicon IC Leadframe Contact Pins (Left Edge) */}
              <div className="absolute left-0 top-1/2 -translate-y-1/2 flex flex-col gap-1.5 pointer-events-none z-20">
                {[...Array(6)].map((_, pi) => (
                  <span
                    key={`lpin-${pi}`}
                    className="w-[3px] h-[4px] rounded-r-xs bg-zinc-700 transition-colors duration-200 group-hover:bg-amber-400/90"
                  />
                ))}
              </div>

              {/* Silicon IC Leadframe Contact Pins (Right Edge) */}
              <div className="absolute right-0 top-1/2 -translate-y-1/2 flex flex-col gap-1.5 pointer-events-none z-20">
                {[...Array(6)].map((_, pi) => (
                  <span
                    key={`rpin-${pi}`}
                    className="w-[3px] h-[4px] rounded-l-xs bg-zinc-700 transition-colors duration-200 group-hover:bg-amber-400/90"
                  />
                ))}
              </div>

              {/* Chip Registration Corner Marks */}
              <span className="absolute top-2 left-2 text-[10px] font-mono text-zinc-600 select-none pointer-events-none leading-none">┌</span>
              <span className="absolute top-2 right-2 text-[10px] font-mono text-zinc-600 select-none pointer-events-none leading-none">┐</span>
              <span className="absolute bottom-2 left-2 text-[10px] font-mono text-zinc-600 select-none pointer-events-none leading-none">└</span>
              <span className="absolute bottom-2 right-2 text-[10px] font-mono text-zinc-600 select-none pointer-events-none leading-none">┘</span>

              {/* Subtle Background Circuit Trace Lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.05] group-hover:opacity-[0.12] transition-opacity z-0">
                <path d="M 0,35 L 50,35 L 75,60 L 220,60" fill="none" stroke="currentColor" strokeWidth="1" />
                <circle cx="220" cy="60" r="2" fill="currentColor" />
                <path d="M 320,180 L 280,180 L 250,150 L 140,150" fill="none" stroke="currentColor" strokeWidth="1" />
                <circle cx="140" cy="150" r="2" fill="currentColor" />
              </svg>

              {/* Card Main Body */}
              <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                  {/* Top Header: Node Code + Pulsing Live LED + Status Badge */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-4 border-b border-white/[0.08] font-mono text-[10px] tracking-wider">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-2 h-2 rounded-full animate-pulse shrink-0"
                        style={{ backgroundColor: sys.accentColor }}
                      />
                      <span className="font-bold tracking-widest" style={{ color: sys.accentColor }}>
                        {sys.nodeCode}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-zinc-300 font-mono text-[9px] uppercase tracking-widest">
                        {sys.statusBadge}
                      </span>
                      <span
                        className="font-mono text-[9px] font-semibold px-2 py-0.5 rounded bg-black/60 border tracking-wider"
                        style={{ color: sys.accentColor, borderColor: `${sys.accentColor}40` }}
                      >
                        {sys.slaBadge}
                      </span>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl sm:text-2xl font-bold font-display text-white group-hover:text-white transition-colors tracking-tight">
                    {sys.title}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-zinc-400 leading-relaxed font-sans line-clamp-2 sm:line-clamp-none">
                    {sys.description}
                  </p>

                  {/* Live Telemetry Terminal Box (High Value Technical Input) */}
                  <div className="mt-4 p-3.5 rounded-lg bg-black/80 border border-white/10 font-mono text-xs overflow-hidden shadow-inner">
                    <div className="flex items-center justify-between pb-2 border-b border-white/[0.06] text-[10px] text-zinc-400">
                      <div className="flex items-center gap-1.5 truncate max-w-[80%]">
                        <span className="text-emerald-400">⚡</span>
                        <span className="text-zinc-200 font-semibold truncate">{sys.terminalData.action}</span>
                      </div>
                      <span
                        className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-white/5 shrink-0"
                        style={{ color: sys.accentColor }}
                      >
                        {sys.terminalData.badge}
                      </span>
                    </div>

                    <div className="pt-2.5 space-y-1 text-[10.5px]">
                      <div className="text-zinc-300 leading-tight flex items-start gap-1">
                        <span className="text-zinc-500 select-none">01</span>
                        <span>{sys.terminalData.log1}</span>
                      </div>
                      <div className="text-zinc-400 leading-tight flex items-start gap-1">
                        <span className="text-zinc-500 select-none">02</span>
                        <span style={{ color: `${sys.accentColor}dd` }}>{sys.terminalData.log2}</span>
                      </div>
                    </div>
                  </div>

                  {/* 3 High-Value Performance Telemetry Metrics */}
                  <div className="grid grid-cols-3 gap-2 mt-4 font-mono">
                    {sys.highlights.map((h, hi) => (
                      <div
                        key={hi}
                        className="p-2 sm:p-2.5 rounded bg-white/[0.02] border border-white/[0.06] flex flex-col justify-between"
                      >
                        <span className="text-[8.5px] sm:text-[9px] text-zinc-500 uppercase tracking-wider truncate">
                          {h.label}
                        </span>
                        <span className="text-xs sm:text-[13px] font-bold text-white mt-1 truncate">
                          {h.val}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Architecture Pillars Quick-Spec */}
                  <div className="mt-4 pt-3 border-t border-white/[0.06] grid grid-cols-1 sm:grid-cols-3 gap-2 font-mono text-[9.5px]">
                    {sys.architecturePillars.map((pillar, pi) => (
                      <div key={pi} className="text-zinc-400 leading-tight">
                        <span className="text-white font-semibold block text-[9px] uppercase tracking-wide">
                          ▪ {pillar.title}
                        </span>
                        <span className="text-zinc-400 text-[8.5px] line-clamp-2 mt-0.5">
                          {pillar.desc}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer: Tech Stack Chips + Action Trigger */}
                <div className="mt-5 pt-3.5 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-3 font-mono text-[10px]">
                  <div className="flex flex-wrap gap-1.5">
                    {sys.techs.slice(0, 5).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded bg-white/[0.04] border border-white/[0.08] text-zinc-300 font-mono text-[9px] tracking-wider"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <span
                    className="font-semibold flex items-center gap-1.5 transition-transform group-hover:translate-x-1"
                    style={{ color: sys.accentColor }}
                  >
                    <span>INSPECT SPECS</span>
                    <span>↗</span>
                  </span>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* Architectural Spec Deep-Dive Modal */}
      {modalSystem && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          onClick={handleCloseDetail}
        >
          <div
            className="bg-[#0b0b12] border border-white/20 max-w-3xl w-full p-6 sm:p-8 relative max-h-[90vh] overflow-y-auto shadow-2xl rounded-xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Ambient Modal Glow */}
            <div
              className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-36 rounded-full blur-3xl pointer-events-none opacity-30"
              style={{ backgroundColor: modalSystem.accentColor }}
            />

            <button
              onClick={handleCloseDetail}
              className="absolute top-5 right-5 text-zinc-400 hover:text-white font-mono text-xs px-2.5 py-1 rounded bg-white/5 border border-white/10 hover:border-white cursor-pointer transition-all"
            >
              [ ESC / CLOSE ]
            </button>

            {/* Header */}
            <div className="flex items-center gap-2 font-mono text-[10px] tracking-[0.2em] uppercase mb-2">
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: modalSystem.accentColor }}
              />
              <span style={{ color: modalSystem.accentColor }}>{modalSystem.nodeCode}</span>
              <span className="text-zinc-600">//</span>
              <span className="text-zinc-400">{modalSystem.statusBadge}</span>
            </div>

            <h3 className="text-2xl sm:text-4xl font-bold font-display text-white tracking-tight">
              {modalSystem.title}
            </h3>

            <p className="mt-4 text-sm sm:text-base text-zinc-300 leading-relaxed font-sans">
              {modalSystem.description}
            </p>

            {/* Live Terminal Replay */}
            <div className="mt-6 p-4 rounded-lg bg-black/90 border border-white/15 font-mono text-xs shadow-inner">
              <div className="text-[10px] text-zinc-500 uppercase tracking-widest mb-2 pb-1 border-b border-white/10">
                ACTIVE PIPELINE EXECUTION TRACE
              </div>
              <div className="flex items-center justify-between text-neonCyan font-semibold mb-2">
                <span>$ {modalSystem.terminalData.action}</span>
                <span className="text-white text-[10px] px-2 py-0.5 rounded bg-white/10">
                  {modalSystem.terminalData.badge}
                </span>
              </div>
              <div className="space-y-1 text-zinc-300 text-[11px]">
                <div>{modalSystem.terminalData.log1}</div>
                <div style={{ color: modalSystem.accentColor }}>{modalSystem.terminalData.log2}</div>
              </div>
            </div>

            {/* 3 Performance Telemetry Pillars */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
              {modalSystem.highlights.map((h, hi) => (
                <div
                  key={hi}
                  className="p-3 rounded-lg bg-white/[0.03] border border-white/10 font-mono"
                >
                  <div className="text-[9px] text-zinc-400 uppercase tracking-wider">{h.label}</div>
                  <div className="text-base font-bold text-white mt-1">{h.val}</div>
                </div>
              ))}
            </div>

            {/* Architectural Engineering Pillars */}
            <div className="mt-6 border border-white/10 rounded-lg p-4 sm:p-5 bg-white/[0.02]">
              <div className="font-mono text-xs text-white font-semibold mb-3 tracking-wider flex items-center gap-2">
                <span className="text-neonCyan">▪</span>
                <span>ARCHITECTURAL HIGHLIGHTS &amp; RESILIENCE STRATEGY</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
                {modalSystem.architecturePillars.map((pillar, pi) => (
                  <div key={pi} className="p-2.5 rounded bg-black/50 border border-white/[0.06]">
                    <div className="text-white font-semibold text-[10.5px] uppercase tracking-wide">
                      {pillar.title}
                    </div>
                    <div className="text-zinc-400 text-[10px] mt-1 leading-relaxed">
                      {pillar.desc}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Production Technology Stack */}
            <div className="mt-6 border border-white/10 rounded-lg p-4 bg-black/60">
              <div className="font-mono text-xs text-white font-semibold mb-2.5 tracking-wider">
                PRODUCTION TECHNOLOGY STACK
              </div>
              <div className="flex flex-wrap gap-2">
                {modalSystem.techs.map((t) => (
                  <span
                    key={t}
                    className="font-mono text-xs px-3 py-1 rounded bg-white/5 text-zinc-200 border border-white/10"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="mt-6 pt-4 border-t border-white/10 flex justify-end gap-3 font-mono text-xs">
              <button
                onClick={handleCloseDetail}
                className="px-5 py-2.5 bg-white text-black font-semibold rounded hover:bg-neonCyan transition-colors cursor-pointer"
              >
                RETURN TO SYSTEM ARCHITECTURES
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
