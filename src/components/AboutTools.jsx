import React from 'react';
import { DEVELOPER_PROFILE, TECH_MATRIX, HOBBIES } from '../data/portfolioData';
import { trackTechHover } from '../utils/analytics';

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
        {/* Left Column (50%): Mobile Dossier Card OR Desktop Editorial Lockup */}
        <div className="lg:col-span-6 p-6 sm:p-10 border-b lg:border-b-0 lg:border-r border-hairline flex flex-col justify-between">
          <div>
            {/* ============================================================ */}
            {/* 1. MOBILE-ONLY VIEW: Clean Camera Focus Card with Blurred BG */}
            {/* ============================================================ */}
            <div className="block lg:hidden">
              <div className="group relative rounded-xl border border-white/10 bg-gradient-to-b from-white/[0.04] via-zinc-950/70 to-[#060606] overflow-hidden mb-6 shadow-[0_8px_32px_rgba(0,0,0,0.6)]">
                {/* Portrait Container: Exact 523/611 Aspect Ratio (Zero Black Bars / Seams) */}
                <div className="relative w-full aspect-[523/611] max-h-[460px] overflow-hidden bg-[#24262c] flex items-center justify-center">
                  {/* Studio Portrait: Fills Edge-to-Edge with Natural Slate Background */}
                  <img
                    src="/amar_img.webp"
                    alt={DEVELOPER_PROFILE.name}
                    className="w-full h-full object-cover object-top filter contrast-[1.04] brightness-[1.0]"
                    onError={(e) => {
                      e.target.src = '/assets/amar.webp';
                    }}
                  />

                  {/* Camera Autofocus Viewfinder Reticle (Framing Face & Shoulders) */}
                  <div className="absolute inset-5 sm:inset-7 pointer-events-none z-20">
                    <span className="absolute top-0 left-0 font-mono text-base text-neonGreen font-bold select-none leading-none">┌</span>
                    <span className="absolute top-0 right-0 font-mono text-base text-neonGreen font-bold select-none leading-none">┐</span>
                    <span className="absolute bottom-0 left-0 font-mono text-base text-neonGreen font-bold select-none leading-none">└</span>
                    <span className="absolute bottom-0 right-0 font-mono text-base text-neonGreen font-bold select-none leading-none">┘</span>
                  </div>

                  {/* Subtle Bottom Collar Feather into Details Below */}
                  <div className="absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-[#060606] via-[#060606]/65 to-transparent pointer-events-none z-10" />
                </div>

                {/* Bio & Details Inside Mobile Card */}
                <div className="relative px-5 pt-4 pb-5 z-20 bg-gradient-to-b from-[#060606]/90 to-[#060606]">
                  <div className="flex flex-col">
                    <h3 className="text-xl font-bold text-white tracking-tight">
                      {DEVELOPER_PROFILE.name}
                    </h3>
                    <div className="font-mono text-xs text-neonCyan mt-1 flex flex-wrap items-center gap-x-2 gap-y-1">
                      <span>Tech Lead // Systems Architect</span>
                      <span className="text-zinc-600">•</span>
                      <span className="text-zinc-400 text-[11px]">{DEVELOPER_PROFILE.location}</span>
                    </div>
                  </div>

                  <p className="mt-4 text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans">
                    {DEVELOPER_PROFILE.bio}
                  </p>

                  {/* Mobile Telemetry Metrics */}
                  <div className="mt-5 p-3.5 border border-white/10 bg-zinc-950/80 rounded font-mono text-xs text-zinc-400 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-zinc-500">EXPERIENCE:</span>
                      <span className="text-white font-semibold">{DEVELOPER_PROFILE.experienceYears}</span>
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
              </div>
            </div>

            {/* ============================================================ */}
            {/* 2. DESKTOP-ONLY VIEW: 50/50 Horizontal Editorial Lockup      */}
            {/* ============================================================ */}
            <div className="hidden lg:block">
              {/* Editorial Horizontal Lockup: Larger Portrait on Left, Identity & Capabilities on Right */}
              <div className="flex gap-7 items-start mb-6">
                {/* Natural-Ratio Portrait Card with Camera Focus Reticles */}
                <div className="relative flex-shrink-0 w-60 xl:w-72 aspect-[523/611] rounded-xl overflow-hidden border border-white/15 bg-[#090a0d] shadow-[0_8px_32px_rgba(0,0,0,0.7)] group">
                  {/* Camera Focus Reticle Corners (Green — Inset to Frame Subject) */}
                  <div className="absolute inset-4 pointer-events-none z-20">
                    <span className="absolute top-0 left-0 font-mono text-base text-neonGreen font-bold select-none leading-none">┌</span>
                    <span className="absolute top-0 right-0 font-mono text-base text-neonGreen font-bold select-none leading-none">┐</span>
                    <span className="absolute bottom-0 left-0 font-mono text-base text-neonGreen font-bold select-none leading-none">└</span>
                    <span className="absolute bottom-0 right-0 font-mono text-base text-neonGreen font-bold select-none leading-none">┘</span>
                  </div>

                  {/* Ambient Top Glow */}
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-neonCyan/20 via-transparent to-transparent pointer-events-none opacity-60" />

                  {/* Full Headshot (Natural Aspect, Zero Letterboxing) */}
                  <img
                    src="/amar_img.webp"
                    alt={DEVELOPER_PROFILE.name}
                    className="w-full h-full object-cover object-top filter contrast-[1.04] brightness-[1.0] transition-transform duration-700 ease-out group-hover:scale-105"
                    style={{
                      maskImage: 'linear-gradient(to bottom, black 82%, rgba(0,0,0,0.7) 92%, transparent 100%)',
                      WebkitMaskImage: 'linear-gradient(to bottom, black 82%, rgba(0,0,0,0.7) 92%, transparent 100%)',
                    }}
                    onError={(e) => {
                      e.target.src = '/assets/amar.webp';
                    }}
                  />

                  {/* Bottom Obsidian Blend */}
                  <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-[#060606] via-[#060606]/70 to-transparent pointer-events-none z-10" />
                </div>

                {/* Identity & Core Specialization Beside Portrait */}
                <div className="flex-1 min-w-0 flex flex-col justify-between pt-1">
                  <div>
                    <div className="inline-flex items-center gap-1.5 font-mono text-[10px] text-neonCyan tracking-[0.2em] uppercase mb-1.5">
                      <span>[ ARCHITECT // LEAD ]</span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight leading-tight">
                      {DEVELOPER_PROFILE.name}
                    </h3>
                    <div className="font-mono text-xs sm:text-sm text-neonCyan/90 mt-1 font-medium">
                      Tech Lead // Systems Architect
                    </div>
                    <div className="font-mono text-xs text-zinc-400 mt-1 flex items-center gap-2">
                      <span>{DEVELOPER_PROFILE.location}</span>
                      <span className="text-zinc-600">•</span>
                      <span className="text-zinc-500 font-mono text-[11px]">UTC+5:30</span>
                    </div>
                  </div>

                  {/* Core Architecture Capabilities (Filling Down to Match Image Bottom) */}
                  <div className="mt-3.5 space-y-1.5 border-l-2 border-neonCyan/40 pl-3.5 font-mono text-xs">
                    <div className="flex items-center justify-between text-zinc-200">
                      <span className="font-medium">Distributed Backends</span>
                      <span className="text-neonCyan text-[11px]">Python // FastAPI</span>
                    </div>
                    <div className="flex items-center justify-between text-zinc-300">
                      <span>Reactive Frontends</span>
                      <span className="text-zinc-400 text-[11px]">Next.js // React</span>
                    </div>
                    <div className="flex items-center justify-between text-zinc-300">
                      <span>Container Infrastructure</span>
                      <span className="text-neonGreen text-[11px]">GCP // Docker</span>
                    </div>
                    <div className="flex items-center justify-between text-zinc-400">
                      <span>Async Event Webhooks</span>
                      <span className="text-zinc-400 text-[11px]">99.9% Prod SLA</span>
                    </div>
                    <div className="flex items-center justify-between text-zinc-400">
                      <span>In-Memory Caching</span>
                      <span className="text-neonAmber text-[11px]">Redis // PubSub</span>
                    </div>
                    <div className="flex items-center justify-between text-zinc-300">
                      <span className="font-medium text-white">LLM &amp; RAG Pipelines</span>
                      <span className="text-neonCyan text-[10px] sm:text-[11px] whitespace-nowrap">Pinecone // Vector DB</span>
                    </div>
                    <div className="flex items-center justify-between text-zinc-300">
                      <span>Performance Profiling</span>
                      <span className="text-neonGreen text-[10px] sm:text-[11px] whitespace-nowrap">Sub-100ms P99 Latency</span>
                    </div>
                    <div className="flex items-center justify-between text-zinc-500">
                      <span>FinTech &amp; Integrations</span>
                      <span className="text-zinc-400 text-[11px]">Shopify // WhatsApp</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Extended Architectural Bio Section — Flows Below Image Across Full Width */}
              <div className="space-y-4 text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans pt-6 border-t border-white/10 w-full">
                <p className="text-zinc-200 font-medium">
                  {DEVELOPER_PROFILE.bio}
                </p>
                <p>
                  Specialized in architecting high-concurrency event pipelines, asynchronous message queues, and fault-tolerant microservices. From handling high-throughput webhooks with 99.9% SLA guarantees to tuning PostgreSQL query plans and Redis cache invalidation strategies, every layer is designed for deterministic reliability under production scale.
                </p>
              </div>
            </div>
          </div>

          {/* Beyond the Code Badges */}
          <div className="mt-6 pt-6 border-t border-white/5">
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

        {/* Right Column (50%): Technical Arsenal Matrix + Experience Telemetry */}
        <div className="lg:col-span-6 p-6 sm:p-10 space-y-7 flex flex-col justify-between">
          <div>
            <div className="font-mono text-xs text-neonCyan tracking-[0.2em] uppercase">
              [ TECHNICAL ARSENAL &amp; MATRIX ]
            </div>
            <h3 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight mt-1 mb-6">
              Tools chosen for throughput, not trends.
            </h3>

            <div className="space-y-5">
              {TECH_MATRIX.map((grp) => (
                <div key={grp.category} className="space-y-2">
                  <div className="font-mono text-xs text-zinc-400 font-medium">
                    {grp.category}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {grp.items.map((item) => (
                      <span
                        key={item}
                        onMouseEnter={() => trackTechHover(item, grp.category)}
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

          {/* Telemetry Metrics Grid (Desktop Only — on mobile it is inside the Dossier Card) */}
          <div className="hidden lg:block mt-6 p-4 border border-white/10 bg-zinc-950/70 rounded-lg font-mono text-xs text-zinc-400 space-y-2.5">
            <div className="flex justify-between items-center">
              <span className="text-zinc-500 tracking-wider">EXPERIENCE:</span>
              <span className="text-white font-semibold">{DEVELOPER_PROFILE.experienceYears}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-zinc-500 tracking-wider">PRIMARY FOCUS:</span>
              <span className="text-neonCyan font-medium">Distributed Backends &amp; Next.js</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-zinc-500 tracking-wider">SYSTEM RELIABILITY:</span>
              <span className="text-white">99.9% Uptime Target</span>
            </div>
            <div className="flex justify-between items-center pt-1 border-t border-white/5">
              <span className="text-zinc-500 tracking-wider">STATUS:</span>
              <span className="text-neonGreen font-medium flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-neonGreen animate-pulse" />
                Available for High-Impact Roles
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
