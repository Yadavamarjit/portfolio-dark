import React, { useState } from 'react';
import { DEVELOPER_PROFILE } from '../data/portfolioData';

export default function Navbar({ onOpenContact }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 h-14 bg-obsidian/85 backdrop-blur-md border-b border-hairline z-50 flex items-center justify-between px-4 lg:px-6">
      <div className="flex items-center space-x-8">
        {/* Monogram Logo */}
        <a href="#hero" className="flex items-center space-x-2 group">
          <div className="w-7 h-7 bg-white text-black flex items-center justify-center font-display font-extrabold text-base tracking-tighter group-hover:bg-neonCyan transition-colors">
            A
          </div>
          <span className="font-mono text-[11px] sm:text-xs tracking-[0.16em] sm:tracking-[0.2em] text-white">
            {DEVELOPER_PROFILE.systemName}
          </span>
        </a>

        {/* Monospace Nav Links */}
        <nav className="hidden md:flex items-center space-x-6 font-mono text-[11px] tracking-[0.14em] text-zinc-400">
          <a href="#systems" className="hover:text-white transition-colors">PROJECTS</a>
          <a href="#philosophy" className="hover:text-white transition-colors">ARCHITECTURE</a>
          <a href="#hero" className="hover:text-white transition-colors">SYSTEMS</a>
          <a href="#about" className="hover:text-white transition-colors">STACK</a>
          <a href="#benchmarks" className="hover:text-white transition-colors">LOGS</a>
        </nav>
      </div>

      <div className="flex items-center space-x-2 sm:space-x-4">
        {/* Live Status Pill */}
        <span className="hidden sm:inline-flex items-center space-x-2 font-mono text-[10px] tracking-[0.15em] text-zinc-300 border border-hairline bg-white/[0.02] px-2.5 py-1">
          <span className="w-1.5 h-1.5 rounded-full bg-neonGreen animate-pulse"></span>
          <span>TECH LEAD // 4+ YRS EXP</span>
        </span>
        
        {/* Solid white sharp-cornered CTA button */}
        <button
          onClick={onOpenContact}
          className="bg-white text-black font-mono text-[10px] sm:text-[11px] font-semibold tracking-wider px-2.5 sm:px-4 py-1.5 sm:py-2 hover:bg-neonCyan transition-colors cursor-pointer whitespace-nowrap"
        >
          <span className="hidden sm:inline">INITIATE CONTACT ↗</span>
          <span className="sm:hidden">CONTACT ↗</span>
        </button>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-zinc-400 hover:text-white p-1"
          aria-label="Toggle Navigation"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed top-14 left-0 right-0 bg-obsidian border-b border-hairline p-4 flex flex-col space-y-3 font-mono text-xs tracking-wider z-50">
          <a href="#systems" onClick={() => setMobileMenuOpen(false)} className="py-2 text-zinc-300 hover:text-neonCyan">
            PROJECTS
          </a>
          <a href="#philosophy" onClick={() => setMobileMenuOpen(false)} className="py-2 text-zinc-300 hover:text-neonCyan">
            ARCHITECTURE
          </a>
          <a href="#hero" onClick={() => setMobileMenuOpen(false)} className="py-2 text-zinc-300 hover:text-neonCyan">
            SYSTEMS
          </a>
          <a href="#about" onClick={() => setMobileMenuOpen(false)} className="py-2 text-zinc-300 hover:text-neonCyan">
            STACK
          </a>
          <a href="#benchmarks" onClick={() => setMobileMenuOpen(false)} className="py-2 text-zinc-300 hover:text-neonCyan">
            LOGS
          </a>
        </div>
      )}
    </header>
  );
}
