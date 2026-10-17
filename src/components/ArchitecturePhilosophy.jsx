import React from 'react';

export default function ArchitecturePhilosophy() {
  const pillars = [
    {
      num: "1",
      title: "High-Concurrency Backends",
      desc: "Engineered on Python, FastAPI, and Flask with non-blocking event loops, strict Pydantic schema validation, idempotent webhook processing, and optimized MongoDB/SQL composite indexing to handle peak traffic deterministically.",
      specs: [
        "AsyncIO non-blocking event loop",
        "Strict Pydantic payload models",
        "Sub-100ms real-time WebSocket pipelines"
      ],
      tag: "PYTHON // FASTAPI // REDIS"
    },
    {
      num: "2",
      title: "Zero-Vendor Lock-In",
      desc: "Portable, containerized architectures that compile cleanly to standard Docker images. Run effortlessly across bare-metal Linux daemons managed by systemd & Nginx or serverless clusters on Google Cloud Run.",
      specs: [
        "Standards-based OCI containers",
        "Reverse-proxied Nginx gateways",
        "Systemd worker supervisors"
      ],
      tag: "DOCKER // GCP // NGINX"
    },
    {
      num: "3",
      title: "Cloud-Native Resiliency",
      desc: "Fault-tolerant systems featuring automated Cloud Build CI/CD triggers, zero-downtime rollouts, cryptographic identity verification (SSO tickets, HMAC signatures), and end-to-end telemetry observability.",
      specs: [
        "Automated Cloud Build CI/CD",
        "Cryptographic ticket identity",
        "Deterministic health & retry policies"
      ],
      tag: "NEXT.JS // TYPESCRIPT // CLOUD"
    }
  ];

  return (
    <section id="philosophy" data-hud-label="PHILOSOPHY" className="relative border-b border-hairline">
      {/* Sticky Sub-Header Bar */}
      <div className="sticky top-14 z-30 h-10 bg-obsidian/90 backdrop-blur-md border-b border-hairline px-6 flex items-center justify-between font-mono text-[11px] tracking-[0.14em] text-zinc-400">
        <div className="flex items-center gap-2">
          <span className="text-white font-bold">02</span>
          <span className="text-zinc-600">//</span>
          <span className="text-zinc-300">ENGINEERING PHILOSOPHY</span>
        </div>
        <div className="hidden sm:block text-zinc-500">
          CLEAN CODE • ZERO-VENDOR LOCK-IN • RESILIENCY
        </div>
      </div>

      {/* Large Editorial Header with Serif Italic Contrast */}
      <div className="px-6 py-16 sm:py-20 border-b border-hairline max-w-4xl">
        <h2 className="text-4xl sm:text-6xl font-semibold tracking-tight text-white leading-[1.08]">
          Stop shipping{' '}
          <span className="font-serif italic font-normal text-5xl sm:text-7xl text-neonCyan">
            fragile
          </span>{' '}
          abstractions.
        </h2>
        <p className="mt-5 text-zinc-400 text-base sm:text-lg max-w-xl leading-relaxed">
          Every system is designed for high observability, deterministic failure modes, low latency, and clean horizontal scaling across bare-metal Linux daemons or serverless cloud containers.
        </p>
      </div>

      {/* 3-Column Brutalist Specs with 1px Shared Hairline Borders */}
      <div className="grid grid-cols-1 md:grid-cols-3">
        {pillars.map((pillar) => (
          <div key={pillar.num} className="bento-cell p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="font-mono text-xs text-neonCyan mb-6 font-semibold flex items-center gap-2">
                <span>SPEC //</span>
                <span className="text-white font-bold">{pillar.num}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold text-white tracking-tight">
                {pillar.num} / {pillar.title}
              </h3>
              <p className="mt-3 text-sm text-zinc-400 leading-relaxed">
                {pillar.desc}
              </p>

              <ul className="mt-6 space-y-2 font-mono text-xs text-zinc-300 border-t border-hairline pt-4">
                {pillar.specs.map((spec, sIdx) => (
                  <li key={sIdx} className="flex items-center gap-2">
                    <span className="text-neonCyan text-[10px]">■</span>
                    <span>{spec}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 pt-4 border-t border-hairline font-mono text-[10px] text-zinc-500">
              {pillar.tag}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
