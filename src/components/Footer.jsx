import React from 'react';
import { DEVELOPER_PROFILE } from '../data/portfolioData';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 border-b border-hairline text-xs bg-obsidian">
      {/* Bio and Branding */}
      <div className="p-6 sm:p-8 border-r border-b border-hairline lg:col-span-2 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 bg-white text-black flex items-center justify-center font-display font-extrabold text-lg">
              A
            </div>
            <span className="font-mono text-xs text-white tracking-widest">
              {DEVELOPER_PROFILE.systemName}
            </span>
          </div>
          <p className="mt-4 text-zinc-400 max-w-xs leading-relaxed text-xs sm:text-sm">
            {DEVELOPER_PROFILE.name} — Full-Stack Developer &amp; Backend Tech Lead based in {DEVELOPER_PROFILE.location}.
          </p>
        </div>
        <div className="mt-8 font-mono text-[10px] text-zinc-500 tracking-widest flex items-center justify-between">
          <span>© 2026 AMARJIT.SYS // ALL RIGHTS RESERVED</span>
          <button
            onClick={scrollToTop}
            className="text-neonCyan hover:underline cursor-pointer"
          >
            TOP ↑
          </button>
        </div>
      </div>

      {/* Core Stack */}
      <div className="p-6 sm:p-8 border-r border-b border-hairline">
        <div className="font-mono text-[10px] tracking-[0.18em] text-zinc-500 uppercase mb-4">
          CORE STACK
        </div>
        <ul className="space-y-2.5 text-zinc-300 font-mono text-[11px]">
          <li>Python / FastAPI</li>
          <li>Next.js / React</li>
          <li>TypeScript / JS</li>
          <li>MongoDB / SQL</li>
          <li>Tailwind CSS</li>
        </ul>
      </div>

      {/* Shipped Systems */}
      <div className="p-6 sm:p-8 border-r border-b border-hairline">
        <div className="font-mono text-[10px] tracking-[0.18em] text-zinc-500 uppercase mb-4">
          SHIPPED SYSTEMS
        </div>
        <ul className="space-y-2.5 text-zinc-300 font-mono text-[11px]">
          <li>UrbanNest SaaS</li>
          <li>Ojas WhatsApp App</li>
          <li>Project JARVIS</li>
          <li>FastShip Extension</li>
          <li>Ticket-Exchange SSO</li>
          <li>Decentro eKYC</li>
        </ul>
      </div>

      {/* Infrastructure */}
      <div className="p-6 sm:p-8 border-b border-hairline">
        <div className="font-mono text-[10px] tracking-[0.18em] text-zinc-500 uppercase mb-4">
          INFRASTRUCTURE
        </div>
        <ul className="space-y-2.5 text-zinc-300 font-mono text-[11px]">
          <li>Google Cloud Platform</li>
          <li>Cloud Run &amp; Build</li>
          <li>Docker Containers</li>
          <li>Nginx &amp; Gunicorn</li>
          <li>Linux systemd</li>
        </ul>
      </div>
    </footer>
  );
}
