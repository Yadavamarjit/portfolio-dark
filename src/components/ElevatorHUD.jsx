import React, { useEffect, useState, useRef } from 'react';

const SECTIONS = [
  { id: 'systems', num: '01', label: 'SYSTEMS' },
  { id: 'experience', num: '02', label: 'EXPERIENCE' },
  { id: 'philosophy', num: '03', label: 'ARCHITECTURE' },
  { id: 'benchmarks', num: '04', label: 'BENCHMARKS' },
  { id: 'contact', num: '05', label: 'DEPLOY' },
];

// Helper functions for typographic kerning widths per character
const getCharWidthBottom = (c) => {
  if (c === 'I' || c === '1' || c === ' ') return 4.5;
  if (c === 'M' || c === 'W') return 11.5;
  if (c === 'T' || c === 'J' || c === 'L') return 7.5;
  return 8.6;
};

const getCharWidthTop = (c) => {
  if (c === 'I' || c === '1' || c === ' ') return 18.0;
  if (c === 'M' || c === 'W') return 44.0;
  if (c === 'T' || c === 'J' || c === 'L' || c === 'F') return 26.0;
  return 33.0;
};

// Color blending across 3 stops for the precision caliper scale:
// Stop 0.0 (Top): Neon Cyan #00F0FF (0, 240, 255)
// Stop 0.5 (Mid): Electric Violet #8B5CF6 (139, 92, 246)
// Stop 1.0 (Bottom): Hot Coral/Rose #F43F5E (244, 63, 94)
const getScaleColor = (t, opacity = 1) => {
  const clamped = Math.max(0, Math.min(1, t));
  let r, g, b;
  if (clamped <= 0.5) {
    const f = clamped / 0.5;
    r = Math.round(0 + (139 - 0) * f);
    g = Math.round(240 + (92 - 240) * f);
    b = Math.round(255 + (246 - 255) * f);
  } else {
    const f = (clamped - 0.5) / 0.5;
    r = Math.round(139 + (244 - 139) * f);
    g = Math.round(92 + (63 - 92) * f);
    b = Math.round(246 + (94 - 246) * f);
  }
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

export default function ElevatorHUD() {
  const [scrollPercent, setScrollPercent] = useState(0);
  const [heroPassed, setHeroPassed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeoutRef = useRef(null);
  const scaleTrackRef = useRef(null);

  // Smooth lerped animation progress state for each section: [0, 1]
  // 0 = pending in bottom stack
  // (0, 1) = in flight along the scale (corner turn ribbon into top dock)
  // 1 = docked at top
  const [progresses, setProgresses] = useState([0, 0, 0, 0, 0]);

  // Target progresses for smooth lerp
  const targetsRef = useRef([0, 0, 0, 0, 0]);
  const currentRef = useRef([0, 0, 0, 0, 0]);
  const rafIdRef = useRef(null);

  useEffect(() => {
    let scrollRaf = null;

    const handleScroll = () => {
      setIsScrolling(true);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      scrollTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false);
      }, 650);

      if (scrollRaf) return;
      scrollRaf = requestAnimationFrame(() => {
        scrollRaf = null;
        const sy = window.scrollY;
        const vh = window.innerHeight;
        const docHeight = document.documentElement.scrollHeight - vh;
        const pct = docHeight > 0 ? Math.min(100, Math.max(0, (sy / docHeight) * 100)) : 0;
        setScrollPercent(pct);

        const isMobileScreen = window.innerWidth < 1024;
        setHeroPassed(isMobileScreen ? sy > vh * 0.65 : sy > 80);

        // Compute target progress for each section
        const nextTargets = [0, 0, 0, 0, 0];

        // Section 0 (systems) triggers as user scrolls down through hero
        // Starts peeling around 100px, finishes docking at top by ~620px
        const p0 = Math.min(1, Math.max(0, (sy - 100) / 480));
        nextTargets[0] = p0;

        // For subsequent sections, track their live getBoundingClientRect
        for (let i = 1; i < SECTIONS.length; i++) {
          const el = document.getElementById(SECTIONS[i].id);
          if (el) {
            const rect = el.getBoundingClientRect();
            // Starts peeling when section top enters 85% of viewport
            // Finishes docking when section top reaches ~120px (under sticky navbar)
            const startY = vh * 0.85;
            const endY = 120;
            const p = Math.min(1, Math.max(0, (startY - rect.top) / (startY - endY)));
            nextTargets[i] = p;
          }
        }

        targetsRef.current = nextTargets;
      });
    };

    // Smooth 60fps / 120fps physics lerp animation loop
    const updateLoop = () => {
      let changed = false;
      const updated = [...currentRef.current];

      for (let i = 0; i < SECTIONS.length; i++) {
        const target = targetsRef.current[i];
        const current = updated[i];
        const diff = target - current;

        if (Math.abs(diff) > 0.002) {
          // Responsive spring damping
          updated[i] = current + diff * 0.16;
          changed = true;
        } else if (current !== target) {
          updated[i] = target;
          changed = true;
        }
      }

      if (changed) {
        currentRef.current = updated;
        setProgresses([...updated]);
      }

      rafIdRef.current = requestAnimationFrame(updateLoop);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    rafIdRef.current = requestAnimationFrame(updateLoop);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      if (scrollRaf) cancelAnimationFrame(scrollRaf);
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, []);

  const handleScaleClick = (e) => {
    if (!scaleTrackRef.current) return;
    const rect = scaleTrackRef.current.getBoundingClientRect();
    const clickY = e.clientY - rect.top;
    const ratio = Math.max(0, Math.min(1, clickY / rect.height));
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (docHeight > 0) {
      setIsScrolling(true);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      scrollTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false);
      }, 900);

      window.scrollTo({
        top: ratio * docHeight,
        behavior: 'smooth',
      });
    }
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const scaleMarks = Array.from({ length: 51 }, (_, i) => 50 - i);
  const formattedPercent = String(Math.round(scrollPercent)).padStart(3, '0') + '%';
  const vh = typeof window !== 'undefined' ? window.innerHeight : 900;
  const railRight = 60; // Distance of the vertical scale rail from right edge on desktop

  // Determine which section is currently the active top hero on desktop
  let activeDockedIdx = -1;
  for (let i = SECTIONS.length - 1; i >= 0; i--) {
    if (progresses[i] >= 0.98) {
      activeDockedIdx = i;
      break;
    }
  }

  const topCompletedSections = [];
  let topActiveSection = null;
  const inFlightSections = [];
  const bottomPendingSections = [];

  SECTIONS.forEach((sec, idx) => {
    const p = progresses[idx];
    const isDocked = p >= 0.98;
    const isNextTakingOver = idx < SECTIONS.length - 1 && progresses[idx + 1] >= 0.20;

    if (isDocked) {
      if (idx === activeDockedIdx && !isNextTakingOver) {
        topActiveSection = sec;
      } else {
        topCompletedSections.push(sec);
      }
    } else if (p > 0.02) {
      inFlightSections.push({ sec, idx, p });
    } else {
      bottomPendingSections.push(sec);
    }
  });

  // Dedicated active section for mobile HUD
  let currentMobileSection = SECTIONS[0];
  for (let i = SECTIONS.length - 1; i >= 0; i--) {
    if (progresses[i] >= 0.35 || (i === 0 && progresses[0] > 0.05)) {
      currentMobileSection = SECTIONS[i];
      break;
    }
  }

  return (
    <>
      {/* 
        ============================================================
        MOBILE DEDICATED HIGH-CONTRAST HUD CAPSULE (< 1024px)
        - Pinned neatly below navbar at top-right
        - 95% opaque dark glass with backdrop blur blocks background text bleed
        - Clean, compact typography replaces oversized text
        - Tapping opens a quick deck jumper
        - Hidden on hero so hero action buttons have zero interference
        ============================================================
      */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/40 backdrop-blur-xs"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      <div
        className={`lg:hidden fixed top-16 right-3 sm:right-4 z-40 transition-all duration-300 ${
          heroPassed ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'
        }`}
      >
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Current section and elevator menu"
          className="flex items-center gap-1.5 sm:gap-2 bg-[#09090b]/95 backdrop-blur-xl border border-white/20 shadow-[0_8px_30px_rgba(0,0,0,0.9)] px-2.5 sm:px-3 py-1.5 rounded-full text-left active:scale-95 transition-all cursor-pointer"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-neonCyan animate-pulse shadow-[0_0_8px_#00F0FF]" />
          <span className="font-mono text-[9px] text-zinc-400 font-semibold tracking-wider">
            {currentMobileSection.num}
          </span>
          <span className="font-display font-black text-[10.5px] sm:text-xs tracking-wider text-white whitespace-nowrap">
            {currentMobileSection.label}
          </span>
          <span className="h-3 w-[1px] bg-white/20" />
          <span className="font-mono text-[9px] text-neonCyan font-bold tabular-nums">
            {formattedPercent}
          </span>
          <svg
            className={`w-3 h-3 text-zinc-400 transition-transform duration-200 ${mobileMenuOpen ? 'rotate-180 text-neonCyan' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {/* Mobile Dropdown Quick Jumper */}
        {mobileMenuOpen && (
          <div className="absolute right-0 top-full mt-2 w-52 bg-[#09090b]/98 backdrop-blur-2xl border border-white/20 rounded-xl shadow-[0_16px_40px_rgba(0,0,0,0.95)] py-1.5 overflow-hidden animate-fadeIn z-50">
            <div className="px-3 py-1 text-[9px] font-mono tracking-widest text-zinc-500 border-b border-white/10 uppercase">
              ELEVATOR DECK
            </div>
            {SECTIONS.map((sec) => {
              const isActive = sec.id === currentMobileSection.id;
              return (
                <button
                  key={sec.id}
                  onClick={() => {
                    scrollToSection(sec.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 flex items-center justify-between transition-colors ${
                    isActive
                      ? 'bg-neonCyan/15 text-neonCyan font-bold'
                      : 'text-zinc-300 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[9px] opacity-60">{sec.num}</span>
                    <span className="font-display text-xs tracking-wider font-semibold">{sec.label}</span>
                  </div>
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-neonCyan shadow-[0_0_6px_#00F0FF]" />
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* 
        ============================================================
        DESKTOP FAR-RIGHT PRECISION RULER CALIPER (ArtCraft Style)
        Overlay pinned flush to rightmost edge. Hidden on mobile.
        ============================================================
      */}
      <aside className="flex fixed right-0 top-14 bottom-4 w-6 sm:w-8 lg:w-24 z-40 select-none pointer-events-none flex-col justify-between py-4 pr-0.5 sm:pr-1 lg:pr-1.5 items-end">
        {/* Vertical Scale Marks (50 down to 0) with Magnifying Lens & Multi-Color Blend */}
        <div
          ref={scaleTrackRef}
          onClick={handleScaleClick}
          className="relative flex-1 w-full flex flex-col justify-between py-2 items-end pointer-events-auto cursor-pointer select-none"
        >
          {scaleMarks.map((val) => {
            const t = (50 - val) / 50; // 0.0 (top) to 1.0 (bottom)
            const markScroll = t * 100;
            const isPassed = scrollPercent >= markScroll;
            const isMajor = val % 10 === 0;
            const isMid = !isMajor && val % 5 === 0;

            // Optical magnifying lens effect (radius ~10% around active needle)
            const diff = Math.abs(scrollPercent - markScroll);
            const lensRadius = 10;
            const magnify = diff < lensRadius ? Math.cos((diff / lensRadius) * (Math.PI / 2)) : 0;

            // Dynamic blended colors for this mark's vertical depth
            const activeColor = getScaleColor(t, 1);
            const passedGlow = getScaleColor(t, 0.6 + magnify * 0.4);

            // Compute magnifying expansion for lines and numbers (responsive)
            const baseWidth = isMajor ? 14 : isMid ? 9 : 5;
            const expandedWidth = baseWidth + magnify * (isMajor ? 10 : isMid ? 7 : 5);
            const lineHeight = isMajor ? 1.5 + magnify * 0.8 : 1 + magnify * 0.5;

            return (
              <div
                key={val}
                className="flex items-center space-x-1 sm:space-x-1.5"
                style={{
                  transform: magnify > 0 ? `translateX(${-magnify * 2.5}px)` : 'none',
                }}
              >
                {isMajor && (
                  <span
                    className="hidden lg:inline-block text-[9px] tabular-nums font-mono font-medium tracking-tight transition-colors duration-150"
                    style={{
                      color: isPassed ? activeColor : getScaleColor(t, 0.35 + magnify * 0.5),
                      textShadow: isPassed
                        ? `0 0 ${4 + magnify * 6}px ${getScaleColor(t, 0.6)}`
                        : magnify > 0
                        ? `0 0 ${magnify * 4}px ${getScaleColor(t, 0.4)}`
                        : 'none',
                      transform: magnify > 0 ? `scale(${1 + magnify * 0.3})` : 'scale(1)',
                      transformOrigin: 'right center',
                      fontWeight: magnify > 0.3 ? '700' : '500',
                    }}
                  >
                    {val}
                  </span>
                )}
                <span
                  className="rounded-l-full transition-colors duration-150"
                  style={{
                    width: `${expandedWidth}px`,
                    height: `${lineHeight}px`,
                    backgroundColor: isPassed
                      ? activeColor
                      : getScaleColor(t, (isMajor ? 0.3 : 0.18) + magnify * 0.55),
                    boxShadow: isPassed
                      ? `0 0 ${4 + magnify * 8}px ${passedGlow}`
                      : magnify > 0
                      ? `0 0 ${magnify * 6}px ${getScaleColor(t, magnify * 0.5)}`
                      : 'none',
                  }}
                />
              </div>
            );
          })}

          {/* Dynamic Laser Progress Indicator Line with Minimalist Clean Percentage Text (Desktop Only) */}
          {(() => {
            const currentT = Math.max(0, Math.min(1, scrollPercent / 100));
            const currentColor = getScaleColor(currentT, 1);
            const currentGlow = getScaleColor(currentT, 0.6);

            return (
              <div
                className="absolute right-0 flex items-center gap-1.5 lg:gap-2 pointer-events-none -translate-y-1/2 z-20 will-change-[top]"
                style={{ top: `${scrollPercent}%` }}
              >
                {/* Pure Percentage Text - Hidden on mobile, desktop-only with smooth fade on scroll stop */}
                <span
                  className={`hidden lg:inline-block font-mono text-[10px] font-bold tracking-wider tabular-nums transition-all duration-300 ease-out origin-right select-none ${
                    isScrolling
                      ? 'opacity-100 scale-100 translate-x-0'
                      : 'opacity-0 scale-90 translate-x-2'
                  }`}
                  style={{
                    color: currentColor,
                    textShadow: `0 0 10px ${currentGlow}`,
                  }}
                >
                  {Math.round(scrollPercent)}%
                </span>
                <span
                  className="w-4 sm:w-5 lg:w-6 h-[2px] lg:h-[2.5px] rounded-l-full transition-colors duration-150"
                  style={{
                    backgroundColor: currentColor,
                    boxShadow: `0 0 12px ${currentColor}`,
                  }}
                />
              </div>
            );
          })()}
        </div>

        {/* Bottom Calibration Zero Mark with matching bottom blend color */}
        <div
          className="hidden lg:block font-mono text-[8px] pr-1 transition-colors duration-150"
          style={{ color: getScaleColor(1.0, 0.5) }}
        >
          0.00
        </div>
      </aside>

      {/* 
        ============================================================
        DESKTOP TOP-RIGHT STACKED ELEVATOR DOCK (ArtCraft Signature)
        Hidden on mobile.
        ============================================================
      */}
      <div
        className={`hidden lg:block fixed top-16 right-16 z-40 transition-opacity duration-500 select-none text-right pointer-events-auto ${
          heroPassed ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Shrunk Mini Brand Title: AMARJIT */}
        <div
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="font-display font-extrabold text-[12px] tracking-[0.24em] text-zinc-400 hover:text-white transition-colors cursor-pointer mb-2"
        >
          AMARJIT
        </div>

        {/* Previously Completed Sections (Stacked Compactly Above Active) */}
        {topCompletedSections.map((sec) => (
          <div
            key={sec.id}
            onClick={() => scrollToSection(sec.id)}
            className="font-display font-bold text-[13px] tracking-[0.16em] text-zinc-500 hover:text-zinc-300 transition-all duration-300 cursor-pointer py-0.5 leading-tight"
          >
            {sec.label}
          </div>
        ))}

        {/* Current Fully Docked Active Section */}
        {topActiveSection && (
          <div
            key={topActiveSection.id}
            onClick={() => scrollToSection(topActiveSection.id)}
            className="font-display font-black text-[28px] tracking-[0.20em] text-white hover:text-neonCyan transition-all duration-300 cursor-pointer pt-1 pb-0.5 leading-none drop-shadow-[0_2px_14px_rgba(0,240,255,0.3)] animate-fadeIn whitespace-nowrap"
          >
            {topActiveSection.label}
          </div>
        )}
      </div>

      {/* 
        ============================================================
        DESKTOP IN-FLIGHT CORNER-TURN TRAIN (ArtCraft Image 2 Exact Replication)
        Letters arrive into the top dock along a curved quarter-circle track.
        Hidden on mobile.
        ============================================================
      */}
      <div className="hidden lg:block">
        {inFlightSections.map(({ sec, p, idx }) => {
          const letters = sec.label.split('');
          const N = letters.length;

          // Cumulative offsets for bottom kerning and top kerning
          const bottomOffsets = [];
          let accBottom = 0;
          for (let k = N - 1; k >= 0; k--) {
            bottomOffsets[k] = accBottom;
            accBottom += getCharWidthBottom(letters[k]);
          }

          const topOffsets = [];
          let accTop = 0;
          for (let k = N - 1; k >= 0; k--) {
            topOffsets[k] = accTop;
            accTop += getCharWidthTop(letters[k]);
          }

          // Pending sections below this section in the bottom stack
          const pendingBelowCount = SECTIONS.slice(idx + 1).filter(
            (s) => (progresses[SECTIONS.findIndex((item) => item.id === s.id)] || 0) <= 0.02
          ).length;

          // Base line Y in bottom stack
          const yBottom = vh - 48 - pendingBelowCount * 22;
          // Dock line Y in top stack
          const yTop = 84 + topCompletedSections.length * 22;

          // Radius of the corner turn into the dock
          const turnRadius = 135;

          // Stagger span across characters: trailing letters lead the train
          const staggerSpan = 0.52;
          const tDuration = 1 - staggerSpan;

          return (
            <div
              key={`track-train-${sec.id}`}
              onClick={() => scrollToSection(sec.id)}
              className="cursor-pointer"
            >
              {letters.map((char, k) => {
                // tau: 0 for last letter (k = N - 1, leads arrival), 1 for first letter (k = 0)
                const tau = (N - 1 - k) / Math.max(1, N - 1);
                const tStart = tau * staggerSpan;
                // Character-specific progress [0, 1]
                const pk = Math.min(1, Math.max(0, (p - tStart) / tDuration));

                let charY = yBottom;
                let charRight = railRight;
                let rotation = 0;
                let fontSize = 12;
                let fontWeight = 700;
                let color = '#A1A1AA';
                let textShadow = 'none';

                if (pk <= 0.20) {
                  // Zone 1: Lift-off from bottom stack
                  const t = pk / 0.20;
                  const curveFactor = Math.sin((t * Math.PI) / 2);
                  charY = yBottom - pk * 80;
                  charRight = railRight + (1 - curveFactor) * bottomOffsets[k];
                  rotation = -90 * curveFactor;
                  fontSize = 12;
                  color = pk > 0.10 ? '#D4D4D8' : '#A1A1AA';
                } else if (pk < 0.68) {
                  // Zone 2: Vertical climb along the scale rail
                  const vNorm = (pk - 0.20) / 0.48;
                  const startClimbY = yBottom - 16;
                  const endClimbY = yTop + turnRadius;
                  charY = startClimbY - vNorm * (startClimbY - endClimbY);
                  charRight = railRight;
                  rotation = -90;
                  fontSize = 13 + vNorm * 4;
                  color = vNorm > 0.4 ? '#E4E4E7' : '#A1A1AA';
                } else {
                  // Zone 3: Corner turn & horizontal docking
                  const u = Math.min(1, (pk - 0.68) / 0.32);
                  const alpha = u * (Math.PI / 2);

                  charY = yTop + turnRadius * (1 - Math.sin(alpha));
                  charRight = railRight + Math.sin(alpha) * topOffsets[k];
                  rotation = -90 * Math.cos(alpha);

                  fontSize = 17 + u * 10;
                  fontWeight = u > 0.5 ? 900 : 800;
                  color = '#FFFFFF';
                  textShadow = u > 0.6 ? '0 0 16px rgba(0, 240, 255, 0.45)' : 'none';
                }

                return (
                  <span
                    key={`peel-char-${sec.id}-${k}`}
                    className="fixed z-40 select-none font-display pointer-events-none inline-block text-center"
                    style={{
                      top: `${charY}px`,
                      right: `${charRight}px`,
                      transform: `rotate(${rotation}deg)`,
                      transformOrigin: 'center center',
                      fontSize: `${fontSize}px`,
                      color,
                      fontWeight,
                      textShadow,
                      lineHeight: 1,
                      transition: 'color 0.1s ease',
                    }}
                  >
                    {char}
                  </span>
                );
              })}
            </div>
          );
        })}
      </div>

      {/* 
        ============================================================
        DESKTOP BOTTOM-RIGHT PENDING STACK (ArtCraft Unvisited List)
        Hidden on mobile.
        ============================================================
      */}
      <div
        className={`hidden lg:block fixed bottom-8 right-16 z-40 select-none transition-all duration-500 text-right ${
          bottomPendingSections.length > 0 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        <nav
          aria-label="Pending Section Elevator Stack"
          className="flex flex-col items-end gap-1 font-display"
        >
          {bottomPendingSections.map((sec) => (
            <a
              key={sec.id}
              href={`#${sec.id}`}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(sec.id);
              }}
              className="font-display font-bold text-[13px] tracking-[0.18em] text-zinc-500 hover:text-white transition-all duration-200 block py-0.5 cursor-pointer leading-tight group"
            >
              <span className="group-hover:-translate-x-1 inline-block transition-transform duration-200">
                {sec.label}
              </span>
            </a>
          ))}
        </nav>
      </div>
    </>
  );
}
