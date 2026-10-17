import React, { useState } from 'react';
import { DEVELOPER_PROFILE } from '../data/portfolioData';

export default function ContactSection({ isOpen, onClose }) {
  const [copied, setCopied] = useState(false);
  const [formSent, setFormSent] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(DEVELOPER_PROFILE.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormSent(true);
    setTimeout(() => {
      setFormSent(false);
      setFormData({ name: '', email: '', message: '' });
      if (onClose) onClose();
    }, 2000);
  };

  return (
    <>
      <section id="contact" data-hud-label="DEPLOY" className="relative border-b border-hairline bg-dot-grid">
        {/* Sticky Sub-Header Bar */}
        <div className="sticky top-14 z-30 h-10 bg-obsidian/90 backdrop-blur-md border-b border-hairline px-6 flex items-center justify-between font-mono text-[11px] tracking-[0.14em] text-zinc-400">
          <div className="flex items-center gap-2">
            <span className="text-white font-bold">04</span>
            <span className="text-zinc-600">//</span>
            <span className="text-zinc-300">INITIATE DEPLOYMENT</span>
          </div>
          <div className="hidden sm:block text-zinc-500">
            AVAILABLE FOR HIGH-IMPACT ARCHITECTURE &amp; LEADERSHIP
          </div>
        </div>

        {/* Giant Centered Call-To-Action */}
        <div className="px-6 py-24 sm:py-36 text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center space-x-2 font-mono text-[10px] sm:text-xs tracking-[0.22em] text-neonCyan uppercase mb-4">
            <span>[ TERMINAL TRANSMISSION READY ]</span>
          </div>

          <h2 className="text-5xl sm:text-7xl md:text-8xl font-semibold text-white tracking-tight leading-tight select-none">
            Start{' '}
            <span className="font-serif italic font-normal text-6xl sm:text-8xl md:text-9xl text-neonCyan">
              shipping.
            </span>
          </h2>

          <p className="mt-6 text-zinc-400 text-sm sm:text-lg max-w-xl mx-auto leading-relaxed">
            Need a Tech Lead to architect your next SaaS platform, scale an async Python/FastAPI backend, or ship a full-stack Next.js product?
          </p>

          {/* Dual Sharp Buttons */}
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a
              href={`mailto:${DEVELOPER_PROFILE.email}`}
              className="bg-white text-black font-mono text-xs font-semibold tracking-[0.15em] px-8 py-4 hover:bg-neonCyan transition-colors flex items-center gap-2"
            >
              <span>DISPATCH EMAIL ↗</span>
            </a>

            <button
              onClick={handleCopyEmail}
              className="border border-white/20 text-white font-mono text-xs tracking-[0.15em] px-8 py-4 hover:border-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              {copied ? '✓ COPIED TO CLIPBOARD!' : 'COPY DIRECT EMAIL'}
            </button>

            <a
              href={DEVELOPER_PROFILE.linkedin}
              target="_blank"
              rel="noreferrer"
              className="border border-white/20 text-white font-mono text-xs tracking-[0.15em] px-8 py-4 hover:border-white hover:bg-white/10 transition-colors"
            >
              LINKEDIN PROFILE ↗
            </a>
          </div>

          <div className="mt-10 pt-6 border-t border-hairline font-mono text-xs text-zinc-500">
            DIRECT: <span className="text-zinc-300">{DEVELOPER_PROFILE.email}</span> // LOCATION: NEW DELHI, INDIA
          </div>
        </div>
      </section>

      {/* Quick Message / Initiate Build Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-obsidian border border-hairline max-w-lg w-full p-6 sm:p-8 relative shadow-2xl">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-zinc-400 hover:text-white font-mono text-xs px-2 py-1 border border-hairline cursor-pointer"
            >
              [ ESC / CLOSE ]
            </button>

            <div className="font-mono text-xs text-neonCyan tracking-[0.2em] uppercase mb-1">
              DISPATCH_TRANSMISSION //
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Initiate System Build</h3>
            <p className="text-xs text-zinc-400 mb-6">
              Send a direct query or project scope to {DEVELOPER_PROFILE.name}.
            </p>

            {formSent ? (
              <div className="p-6 border border-emerald-500/40 bg-emerald-950/20 text-center font-mono text-sm text-emerald-300">
                ✓ TRANSMISSION SENT TO {DEVELOPER_PROFILE.email}
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-4 font-mono text-xs">
                <div>
                  <label className="block text-zinc-400 mb-1">YOUR NAME</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-zinc-950 border border-hairline px-3 py-2.5 text-white focus:outline-none focus:border-neonCyan"
                    placeholder="e.g. Alex Chen"
                  />
                </div>
                <div>
                  <label className="block text-zinc-400 mb-1">YOUR EMAIL</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-zinc-950 border border-hairline px-3 py-2.5 text-white focus:outline-none focus:border-neonCyan"
                    placeholder="e.g. alex@company.com"
                  />
                </div>
                <div>
                  <label className="block text-zinc-400 mb-1">PROJECT SCOPE / ARCHITECTURAL SPECS</label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-zinc-950 border border-hairline px-3 py-2.5 text-white focus:outline-none focus:border-neonCyan"
                    placeholder="Describe your technical requirements or timeline..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3.5 bg-white text-black font-semibold hover:bg-neonCyan transition-colors cursor-pointer"
                >
                  TRANSMIT MESSAGE
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
