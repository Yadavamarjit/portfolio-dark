import React from 'react';

const CAPABILITIES = [
  "FASTAPI MICROSERVICES",
  "CENTRALIZED SSO AUTHENTICATION",
  "SHOPIFY ADMIN UI EXTENSIONS",
  "DECENTRO EKYC & DIGILOCKER PIPELINES",
  "GCP CLOUD RUN & DOCKER CI/CD",
  "NEXT.JS + TYPESCRIPT FULL-STACK",
  "WHATSAPP WEBHOOK AUTOMATION",
  "HIGH-CONCURRENCY ASYNCIO",
  "MONGODB & REDIS CACHING",
  "SOCKET.IO REALTIME ENGINES",
  "NGINX & SYSTEMD WORKERS"
];

export default function CapabilityTicker() {
  return (
    <div className="w-full h-10 border-t border-b border-hairline bg-obsidian overflow-hidden flex items-center select-none z-30 relative">
      <div className="animate-marquee font-mono text-[11px] tracking-[0.16em] text-zinc-400 uppercase space-x-6 px-4 flex items-center whitespace-nowrap shrink-0">
        {CAPABILITIES.map((cap, i) => (
          <div key={`ticker-1-${i}`} className="inline-flex items-center space-x-6 whitespace-nowrap shrink-0">
            <span className="text-zinc-300 whitespace-nowrap shrink-0">{cap}</span>
            <span className="text-zinc-600 whitespace-nowrap shrink-0">//</span>
            <span className="text-neonCyan whitespace-nowrap shrink-0">•</span>
          </div>
        ))}
        {/* Duplicate for seamless infinite loop */}
        {CAPABILITIES.map((cap, i) => (
          <div key={`ticker-2-${i}`} className="inline-flex items-center space-x-6 whitespace-nowrap shrink-0">
            <span className="text-zinc-300 whitespace-nowrap shrink-0">{cap}</span>
            <span className="text-zinc-600 whitespace-nowrap shrink-0">//</span>
            <span className="text-neonCyan whitespace-nowrap shrink-0">•</span>
          </div>
        ))}
      </div>
    </div>
  );
}
