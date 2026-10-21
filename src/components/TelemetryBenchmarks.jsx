import React, { useState } from 'react';
import { TELEMETRY_STATS, CERTIFICATES } from '../data/portfolioData';
import { trackCertificateModal, trackEvent } from '../utils/analytics';

export default function TelemetryBenchmarks() {
  const [activeCert, setActiveCert] = useState(null);

  const handleOpenCert = (cert) => {
    trackCertificateModal(cert.title, cert.issuer);
    setActiveCert(cert);
  };

  const handleCloseCert = () => {
    trackEvent('certificate_modal_close');
    setActiveCert(null);
  };

  const proofCards = [
    {
      tag: "M1",
      title: "Throughput & Latency Engineering",
      subtitle: "REAL PRODUCTION WORKLOADS",
      metricValue: "45%",
      metricLabel: "PAGE LOAD REDUCTION",
      description: "Engineered code-splitting and asset optimization strategies at Dpanda, slashing page latency by 45% and driving a measurable 10% increase in user retention across high-traffic publisher surfaces.",
      highlights: [
        "Sub-100ms real-time event pipeline latency",
        "+35% customer engagement via dynamic promotion logic",
        "Zero layout shifts across dynamic embeds"
      ],
      accentColor: "#10B981"
    },
    {
      tag: "M2",
      title: "Scale & Cloud Orchestration",
      subtitle: "MULTI-TENANT ARCHITECTURE",
      metricValue: "1,000+",
      metricLabel: "ACTIVE MERCHANTS",
      description: "Architected OAuth 2.0 merchant connection pipelines for Revo at Borderfree, cutting store onboarding time from 2 hours to 5 minutes while maintaining zero downtime on Google Cloud Run & Docker clusters.",
      highlights: [
        "Automated Cloud Build CI/CD deployment pipelines",
        "Nginx reverse-proxy & Gunicorn worker clusters",
        "Cross-domain ticket exchange security mesh"
      ],
      accentColor: "#00F0FF"
    },
    {
      tag: "M3",
      title: "Physical Benchmark & Grit",
      subtitle: "DISCIPLINE UNDER LOAD",
      metricValue: "200 KG",
      metricLabel: "DEADLIFT // 4:05/KM PACE",
      description: "Relentless physical discipline translates directly into technical perseverance. Rigorous barbell strength conditioning, MMA striking, and endurance running keep cognitive endurance at its peak under heavy engineering loads.",
      highlights: [
        "UpGrad Campus Data Science & Analytics Certified",
        "Daily.dev Top 1% Global Reader 2024",
        "Calisthenics & hybrid athletic conditioning"
      ],
      accentColor: "#F59E0B"
    }
  ];

  return (
    <section id="benchmarks" data-hud-label="BENCHMARKS" className="relative border-b border-hairline">
      {/* Sticky Sub-Header Bar */}
      <div className="sticky top-14 z-30 h-10 bg-obsidian/90 backdrop-blur-md border-b border-hairline px-6 flex items-center justify-between font-mono text-[11px] tracking-[0.14em] text-zinc-400">
        <div className="flex items-center gap-2">
          <span className="text-white font-bold">03</span>
          <span className="text-zinc-600">//</span>
          <span className="text-zinc-300">TELEMETRY &amp; BENCHMARKS</span>
        </div>
        <div className="hidden sm:block text-zinc-500">
          PROVEN METRICS • PRODUCTION PROOF • ATHLETIC GRIT
        </div>
      </div>

      {/* Editorial Header */}
      <div className="px-6 py-16 sm:py-20 border-b border-hairline max-w-4xl">
        <h2 className="text-4xl sm:text-6xl font-semibold tracking-tight text-white leading-[1.08]">
          Built with{' '}
          <span className="font-serif italic font-normal text-5xl sm:text-7xl text-neonCyan">
            precision.
          </span>
        </h2>
        <p className="mt-5 text-zinc-400 text-base sm:text-lg max-w-xl leading-relaxed">
          Verifiable numbers from real commercial deployments, authenticated industry credentials, and relentless physical conditioning.
        </p>
      </div>

      {/* 4 Stat Telemetry Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 border-b border-hairline">
        {TELEMETRY_STATS.map((stat, i) => (
          <div key={i} className="p-6 sm:p-8 border-r border-b lg:border-b-0 border-hairline bg-zinc-950/40">
            <div className="flex justify-between font-mono text-[10px] tracking-[0.16em] pb-3 mb-4 border-b border-hairline text-zinc-400">
              <span>METRIC_0{i + 1}</span>
              <span style={{ color: stat.color }} className="font-bold">VERIFIED</span>
            </div>
            <div className="py-2">
              <div className="font-display text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
                {stat.value}
                <span style={{ color: stat.color }}>{stat.suffix}</span>
              </div>
              <div className="font-mono text-xs text-zinc-200 mt-2 font-medium">
                {stat.label}
              </div>
              <div className="text-[11px] text-zinc-500 mt-1">
                {stat.subtext}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 3-Column Proof Cards with Neon Green Index Tags (M1, M2, M3) */}
      <div className="grid grid-cols-1 md:grid-cols-3">
        {proofCards.map((card) => (
          <div key={card.tag} className="bento-cell p-6 sm:p-8 flex flex-col justify-between">
            <div>
              {/* Top Bar with Neon Green Index Tag */}
              <div className="flex justify-between items-center font-mono text-[10px] tracking-[0.18em] pb-3 mb-5 border-b border-hairline">
                <span className="text-zinc-400">{card.subtitle}</span>
                <span className="text-neonGreen font-bold px-2 py-0.5 bg-neonGreen/10 border border-neonGreen/30">
                  {card.tag}
                </span>
              </div>

              {/* Massive Metric Hero Display */}
              <div className="py-6 px-4 text-center border border-white/10 bg-zinc-950/80 mb-5">
                <div className="font-display text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
                  {card.metricValue}
                </div>
                <div className="font-mono text-[10px] text-neonCyan mt-2 tracking-widest uppercase">
                  {card.metricLabel}
                </div>
              </div>

              <h3 className="text-xl font-semibold text-white tracking-tight">
                {card.title}
              </h3>
              <p className="mt-3 text-sm text-zinc-400 leading-relaxed">
                {card.description}
              </p>

              {/* Technical Bullet Highlights */}
              <ul className="mt-6 space-y-2 font-mono text-xs text-zinc-300 border-t border-hairline pt-4">
                {card.highlights.map((h, hIdx) => (
                  <li key={hIdx} className="flex items-center gap-2">
                    <span className="text-neonGreen text-[10px]">■</span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Bottom Actions / Credentials Preview Trigger */}
            <div className="mt-8 pt-4 border-t border-hairline flex justify-between items-center font-mono text-[10px]">
              <span className="text-zinc-500">TELEMETRY ARCHIVE</span>
              {card.tag === 'M3' ? (
                <button
                  onClick={() => handleOpenCert(CERTIFICATES[0])}
                  className="text-neonCyan hover:underline cursor-pointer"
                >
                  VIEW CERTIFICATES ↗
                </button>
              ) : (
                <span className="text-neonGreen">● LIVE STREAM</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Certificate Lightbox Modal */}
      {activeCert && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={handleCloseCert}
        >
          <div
            className="bg-obsidian border border-hairline max-w-2xl w-full p-6 relative shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleCloseCert}
              className="absolute top-4 right-4 text-zinc-400 hover:text-white font-mono text-xs px-2 py-1 border border-hairline cursor-pointer"
            >
              [ ESC / CLOSE ]
            </button>
            <div className="font-mono text-xs text-neonCyan mb-2">
              {activeCert.category} // {activeCert.date}
            </div>
            <h3 className="text-xl font-bold text-white mb-4">
              {activeCert.title} — {activeCert.issuer}
            </h3>
            <div className="border border-white/10 bg-black overflow-hidden flex items-center justify-center p-2 mb-4">
              <img
                src={activeCert.imageUrl}
                alt={activeCert.title}
                className="max-h-[60vh] object-contain w-auto"
              />
            </div>
            <div className="flex justify-between items-center font-mono text-xs">
              <div className="flex gap-2">
                {CERTIFICATES.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => handleOpenCert(c)}
                    className={`px-3 py-1 border text-xs cursor-pointer ${
                      activeCert.id === c.id ? 'border-neonCyan text-white bg-white/10' : 'border-hairline text-zinc-400'
                    }`}
                  >
                    {c.issuer}
                  </button>
                ))}
              </div>
              <button
                onClick={handleCloseCert}
                className="px-4 py-2 bg-white text-black font-semibold hover:bg-neonCyan transition-colors cursor-pointer"
              >
                CLOSE
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
