import React, { useEffect, useRef, useState } from 'react';
import { HERO_NODES, DEVELOPER_PROFILE } from '../data/portfolioData';
import { trackHeroCTA } from '../utils/analytics';

// Character-by-character horizontal split factors (inspired by ArtCraft Image 2)
const TITLE_LETTERS = [
  { char: 'A', dir: -2.8 },
  { char: 'M', dir: -1.8 },
  { char: 'A', dir: -0.7 },
  { char: 'R', dir: 0.2 },
  { char: 'J', dir: 1.4 },
  { char: 'I', dir: 2.5 },
  { char: 'T', dir: 3.8 },
];

// 8 Positioning Anchors matching Image 2 exact layout around AMARJIT
const ANCHOR_OFFSETS = [
  // 0: Node 01 (Top Left: Ojas)
  { dx: -410, dy: -275, floatSpeed: 0.85, floatAmp: 6 },
  // 1: Node 02 (Top Center: UrbanNest)
  { dx: 0, dy: -305, floatSpeed: 1.1, floatAmp: 7 },
  // 2: Node 03 (Top Right: SSO)
  { dx: 410, dy: -270, floatSpeed: 0.9, floatAmp: 6 },
  // 3: Node 04 (Mid Left: JARVIS)
  { dx: -530, dy: -10, floatSpeed: 1.0, floatAmp: 8 },
  // 4: Node 05 (Mid Right: eKYC)
  { dx: 510, dy: -10, floatSpeed: 0.85, floatAmp: 8 },
  // 5: Node 06 (Bottom Left: FastShip)
  { dx: -410, dy: 275, floatSpeed: 1.15, floatAmp: 6 },
  // 6: Node 07 (Bottom Center: Support Bot)
  { dx: -50, dy: 305, floatSpeed: 0.95, floatAmp: 7 },
  // 7: Node 08 (Bottom Right: Zero-Downtime)
  { dx: 410, dy: 270, floatSpeed: 1.05, floatAmp: 6 },
];

// 14 Radiant Celestial Stardust Dots: Randomly moving, glowing, organic shimmer & smooth color shift
const CELESTIAL_DOTS = [
  { id: 1, x: '14%', y: '20%', size: 3.2, driftAnim: 'celestialDrift1', driftDur: '18s', driftDelay: '-2s', shimmerAnim: 'starShimmerA', shimmerDur: '4.8s', shimmerDelay: '0.4s', colorAnim: 'dotColorCycle1', colorDur: '14s' },
  { id: 2, x: '82%', y: '16%', size: 3.4, driftAnim: 'celestialDrift2', driftDur: '22s', driftDelay: '-7s', shimmerAnim: 'starShimmerB', shimmerDur: '6.2s', shimmerDelay: '1.2s', colorAnim: 'dotColorCycle2', colorDur: '18s' },
  { id: 3, x: '11%', y: '62%', size: 3.0, driftAnim: 'celestialDrift3', driftDur: '19s', driftDelay: '-11s', shimmerAnim: 'starShimmerC', shimmerDur: '5.4s', shimmerDelay: '2.1s', colorAnim: 'dotColorCycle3', colorDur: '16s' },
  { id: 4, x: '88%', y: '68%', size: 3.2, driftAnim: 'celestialDrift4', driftDur: '24s', driftDelay: '-4s', shimmerAnim: 'starShimmerA', shimmerDur: '5.9s', shimmerDelay: '0.8s', colorAnim: 'dotColorCycle1', colorDur: '15s' },
  { id: 5, x: '24%', y: '84%', size: 3.0, driftAnim: 'celestialDrift2', driftDur: '20s', driftDelay: '-13s', shimmerAnim: 'starShimmerB', shimmerDur: '4.6s', shimmerDelay: '1.9s', colorAnim: 'dotColorCycle2', colorDur: '20s' },
  { id: 6, x: '76%', y: '82%', size: 3.4, driftAnim: 'celestialDrift1', driftDur: '23s', driftDelay: '-9s', shimmerAnim: 'starShimmerC', shimmerDur: '6.7s', shimmerDelay: '3.1s', colorAnim: 'dotColorCycle3', colorDur: '17s' },
  { id: 7, x: '32%', y: '12%', size: 2.8, driftAnim: 'celestialDrift4', driftDur: '17s', driftDelay: '-6s', shimmerAnim: 'starShimmerA', shimmerDur: '5.1s', shimmerDelay: '1.5s', colorAnim: 'dotColorCycle1', colorDur: '13s' },
  { id: 8, x: '68%', y: '24%', size: 3.2, driftAnim: 'celestialDrift3', driftDur: '25s', driftDelay: '-14s', shimmerAnim: 'starShimmerB', shimmerDur: '6.0s', shimmerDelay: '0.2s', colorAnim: 'dotColorCycle2', colorDur: '19s' },
  { id: 9, x: '7%', y: '40%', size: 3.0, driftAnim: 'celestialDrift1', driftDur: '21s', driftDelay: '-15s', shimmerAnim: 'starShimmerC', shimmerDur: '5.7s', shimmerDelay: '2.8s', colorAnim: 'dotColorCycle3', colorDur: '15s' },
  { id: 10, x: '93%', y: '36%', size: 3.2, driftAnim: 'celestialDrift2', driftDur: '19s', driftDelay: '-8s', shimmerAnim: 'starShimmerA', shimmerDur: '4.9s', shimmerDelay: '1.0s', colorAnim: 'dotColorCycle1', colorDur: '21s' },
  { id: 11, x: '44%', y: '90%', size: 2.8, driftAnim: 'celestialDrift3', driftDur: '26s', driftDelay: '-16s', shimmerAnim: 'starShimmerB', shimmerDur: '6.4s', shimmerDelay: '2.4s', colorAnim: 'dotColorCycle2', colorDur: '16s' },
  { id: 12, x: '58%', y: '8%', size: 3.2, driftAnim: 'celestialDrift4', driftDur: '21s', driftDelay: '-3s', shimmerAnim: 'starShimmerC', shimmerDur: '5.3s', shimmerDelay: '0.6s', colorAnim: 'dotColorCycle3', colorDur: '18s' },
  { id: 13, x: '20%', y: '48%', size: 2.8, driftAnim: 'celestialDrift2', driftDur: '23s', driftDelay: '-10s', shimmerAnim: 'starShimmerA', shimmerDur: '5.5s', shimmerDelay: '1.7s', colorAnim: 'dotColorCycle1', colorDur: '17s' },
  { id: 14, x: '84%', y: '50%', size: 3.0, driftAnim: 'celestialDrift4', driftDur: '22s', driftDelay: '-5s', shimmerAnim: 'starShimmerB', shimmerDur: '6.1s', shimmerDelay: '2.9s', colorAnim: 'dotColorCycle2', colorDur: '19s' },
];

export default function HeroNodeGraph({ onSelectSystem, onOpenContact }) {
  const containerRef = useRef(null);
  const cardElementsRef = useRef([]);
  const lettersRef = useRef([]);

  // Active interaction states
  const [hoveredNodeId, setHoveredNodeId] = useState(null);
  const hoveredNodeIdRef = useRef(null);
  const hoverVectorRef = useRef({ dx: 0, dy: 0 });
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth < 768 : false
  );

  // Continuous orbital angle tracking for each node
  const anglesRef = useRef(HERO_NODES.map((node) => node.initialAngle || 0));

  useEffect(() => {
    let animId;
    let mouseX = 0, mouseY = 0;
    let targetX = 0, targetY = 0;
    let cachedCenterX = window.innerWidth / 2;
    let cachedCenterY = window.innerHeight / 2;
    let cachedRect = null;
    let lastScrollY = -1;

    // Responsive anchor scaling - compute once on resize/mount, avoiding style mutation per frame
    const updateDimensions = () => {
      if (!containerRef.current) return;
      cachedRect = containerRef.current.getBoundingClientRect();
      cachedCenterX = cachedRect.left + cachedRect.width / 2;
      cachedCenterY = cachedRect.top + cachedRect.height / 2;

      const scaleX = Math.min(1, Math.max(0.72, cachedRect.width / 1440));
      const scaleY = Math.min(1, Math.max(0.72, cachedRect.height / 880));

      HERO_NODES.forEach((node, i) => {
        const cardEl = cardElementsRef.current[i];
        if (cardEl) {
          cardEl.style.width = `${node.width * scaleX}px`;
          cardEl.style.height = `${node.height * scaleY}px`;
        }
      });
    };

    updateDimensions();

    const handleMouseMove = (e) => {
      targetX = e.clientX - cachedCenterX;
      targetY = e.clientY - cachedCenterY;
    };

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      updateDimensions();
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });

    const animate = () => {
      // Smooth lerp mouse parallax
      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;

      if (containerRef.current && cachedRect) {
        const centerX = cachedRect.width / 2;
        const centerY = cachedRect.height / 2;
        const isMobile = cachedRect.width < 768;

        // Wide orbital radii to guarantee clean clearance around center AMARJIT
        const baseRx = isMobile ? cachedRect.width * 0.46 : Math.min(cachedRect.width * 0.52, 920);
        const baseRy = isMobile ? cachedRect.height * 0.40 : Math.min(cachedRect.height * 0.48, 520);

        const tracks = {
          1: { rx: Math.max(560, baseRx * 0.60), ry: Math.max(330, baseRy * 0.62), speed: 0.0013 }, // Inner: ~560px x 330px
          2: { rx: Math.max(750, baseRx * 0.80), ry: Math.max(440, baseRy * 0.82), speed: 0.0009 }, // Middle: ~750px x 440px
          3: { rx: Math.max(950, baseRx * 1.02), ry: Math.max(550, baseRy * 1.02), speed: 0.0006 }, // Outer: ~950px x 550px
        };

        const scrollY = window.scrollY;
        const progress = Math.min(1, Math.max(0, scrollY / 420));
        const disperseY = -progress * 200;
        const disperseOpacity = Math.max(0, 1 - progress * 1.6);

        // Only update scroll-dependent letter transforms and opacity when scrollY changes
        if (scrollY !== lastScrollY) {
          lastScrollY = scrollY;
          const spreadUnit = isMobile ? 0 : 95;
          lettersRef.current.forEach((el, idx) => {
            if (!el) return;
            const letter = TITLE_LETTERS[idx];
            const spreadX = isMobile ? 0 : letter.dir * progress * spreadUnit;
            el.style.transform = spreadX ? `translate3d(${spreadX}px, 0, 0)` : 'none';
          });
        }

        const scaleX = Math.min(1, Math.max(0.72, cachedRect.width / 1440));
        const scaleY = Math.min(1, Math.max(0.72, cachedRect.height / 880));

        const mouseWorldX = centerX + mouseX;
        const mouseWorldY = centerY + mouseY;
        const currentHoveredId = hoveredNodeIdRef.current;
        const currentHoverVector = hoverVectorRef.current;

        // Update 8 Architectural System Nodes along continuous orbital paths
        HERO_NODES.forEach((node, i) => {
          const cardEl = cardElementsRef.current[i];
          if (!cardEl) return;

          const trackConfig = tracks[node.track] || tracks[2];
          const isHovered = currentHoveredId === node.id;

          // Continuous orbital revolution unless hovered
          if (!isHovered) {
            anglesRef.current[i] += trackConfig.speed;
          }

          const angle = anglesRef.current[i];
          const cos = Math.cos(angle);
          const sin = Math.sin(angle);

          // 3D perspective depth scale: front cards (sin > 0) are slightly larger
          const depthScale = 0.88 + 0.20 * ((sin + 1) / 2);
          const tangentAngle = -cos * 3.5;

          const cardWidth = node.width * scaleX;
          const cardHeight = node.height * scaleY;

          // Base position along orbital ellipse
          const baseX = centerX + trackConfig.rx * cos - cardWidth / 2;
          const baseY = centerY + trackConfig.ry * sin - cardHeight / 2;

          // FLUID MAGNETIC CURSOR ATTRACTION
          const cardCenterX = baseX + cardWidth / 2;
          const cardCenterY = baseY + cardHeight / 2;

          const toMouseX = mouseWorldX - cardCenterX;
          const toMouseY = mouseWorldY - cardCenterY;
          const dist = Math.sqrt(toMouseX * toMouseX + toMouseY * toMouseY);

          const attractRadius = 380;
          let pullX = 0;
          let pullY = 0;
          let skewX = 0;
          let skewY = 0;
          let attractScale = 1;
          let attractGlow = 0;

          if (dist < attractRadius) {
            const t = 1 - dist / attractRadius;
            const force = Math.pow(t, 1.6); // smooth non-linear fluid falloff

            const dirX = toMouseX / Math.max(1, dist);
            const dirY = toMouseY / Math.max(1, dist);

            // Magnetic fluid pull towards cursor (up to 52px!)
            pullX = dirX * force * 52;
            pullY = dirY * force * 40;

            // Organic lean & skew toward cursor
            skewX = dirX * force * -6;
            skewY = dirY * force * -4;

            attractScale = 1 + force * 0.12;
            attractGlow = force;
          }

          if (isHovered) {
            pullX += currentHoverVector.dx * 16;
            pullY += currentHoverVector.dy * 12;
            skewX += currentHoverVector.dx * -3;
            skewY += currentHoverVector.dy * -3;
            attractScale = Math.max(attractScale, 1.08);
            attractGlow = 1;
          }

          const finalX = baseX + pullX;
          const finalY = baseY + pullY + disperseY;
          const finalScale = depthScale * attractScale;
          const finalRot = tangentAngle + (pullX * 0.04);

          // 100% GPU-composited transform
          cardEl.style.transform = `translate3d(${finalX}px, ${finalY}px, 0) scale(${finalScale}) rotate(${finalRot}deg) skew(${skewX}deg, ${skewY}deg)`;

          const zIndex = isHovered ? 45 : attractGlow > 0.3 ? 35 : 15;
          if (cardEl._currZIndex !== zIndex) {
            cardEl._currZIndex = zIndex;
            cardEl.style.zIndex = zIndex;
          }

          const finalOpacity = isHovered ? 1 : disperseOpacity;
          if (cardEl._currOpacity !== finalOpacity) {
            cardEl._currOpacity = finalOpacity;
            cardEl.style.opacity = finalOpacity;
          }
        });
      }

      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);

    const handleScroll = () => {
      if (window.innerWidth < 768) return;
      const scrollY = window.scrollY;
      const progress = Math.min(1, Math.max(0, scrollY / 420));
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animId);
    };
  }, []);

  // Handle directional mouse vector without triggering React re-renders
  const handleCardMouseMove = (e) => {
    const cardEl = e.currentTarget;
    const rect = cardEl.getBoundingClientRect();
    const nx = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const ny = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    hoverVectorRef.current = {
      dx: Math.max(-1, Math.min(1, nx)),
      dy: Math.max(-1, Math.min(1, ny)),
    };
  };

  // Reusable System Node Card Content matching Image 2 + Silicon Chip Detailing
  const renderCardContent = (node, isHovered) => (
    <div
      onClick={() => onSelectSystem && onSelectSystem(node.systemId)}
      className="relative w-full h-full p-3 sm:p-3.5 rounded-xl bg-[#0a0a0f] border transition-all duration-200 flex flex-col justify-between overflow-hidden cursor-pointer select-none text-left group"
      style={{
        boxShadow: isHovered
          ? `0 14px 35px -5px ${node.accentColor}40, 0 0 20px ${node.accentColor}30`
          : '0 8px 30px rgba(0,0,0,0.85)',
        borderColor: isHovered ? `${node.accentColor}95` : 'rgba(255,255,255,0.12)',
      }}
    >
      {/* Top Subtle Ambient Colored Glow */}
      <div
        className="absolute -top-10 left-1/2 -translate-x-1/2 w-36 h-20 rounded-full blur-xl pointer-events-none transition-opacity duration-300"
        style={{
          backgroundColor: node.accentColor,
          opacity: isHovered ? 0.85 : 0.35,
        }}
      />

      {/* High-Tech Internal Glow Accent */}
      <div
        className="absolute inset-0 rounded-xl pointer-events-none transition-opacity duration-200"
        style={{
          boxShadow: `inset 0 0 16px ${node.accentColor}18`,
          opacity: isHovered ? 1 : 0.4,
        }}
      />

      {/* Chip Registration Corner Marks */}
      <span className="absolute top-1 left-1.5 text-[8px] font-mono text-zinc-600 select-none pointer-events-none leading-none">┌</span>
      <span className="absolute top-1 right-1.5 text-[8px] font-mono text-zinc-600 select-none pointer-events-none leading-none">┐</span>
      <span className="absolute bottom-1 left-1.5 text-[8px] font-mono text-zinc-600 select-none pointer-events-none leading-none">└</span>
      <span className="absolute bottom-1 right-1.5 text-[8px] font-mono text-zinc-600 select-none pointer-events-none leading-none">┘</span>

      {/* Silicon IC Leadframe Contact Pins (Left Edge) */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-[2px] flex flex-col gap-1.5 pointer-events-none z-20">
        {[...Array(5)].map((_, pi) => (
          <span
            key={`lpin-${pi}`}
            className="w-[3px] h-[3px] rounded-xs bg-zinc-600 transition-colors duration-200 group-hover:bg-amber-400/90"
          />
        ))}
      </div>

      {/* Silicon IC Leadframe Contact Pins (Right Edge) */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-[2px] flex flex-col gap-1.5 pointer-events-none z-20">
        {[...Array(5)].map((_, pi) => (
          <span
            key={`rpin-${pi}`}
            className="w-[3px] h-[3px] rounded-xs bg-zinc-600 transition-colors duration-200 group-hover:bg-amber-400/90"
          />
        ))}
      </div>

      {/* Subtle Background Circuit Trace Lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.06] group-hover:opacity-[0.14] transition-opacity z-0">
        <path d="M 0,22 L 32,22 L 48,38 L 130,38" fill="none" stroke="currentColor" strokeWidth="1" />
        <circle cx="130" cy="38" r="1.5" fill="currentColor" />
        <path d="M 190,120 L 160,120 L 142,102 L 75,102" fill="none" stroke="currentColor" strokeWidth="1" />
        <circle cx="75" cy="102" r="1.5" fill="currentColor" />
      </svg>

      {/* Header: NODE_0X // CATEGORY + TAG */}
      <div className="relative z-10 flex items-center justify-between font-mono text-[9px] sm:text-[9.5px] tracking-wider whitespace-nowrap gap-2">
        <span
          className="font-bold drop-shadow-sm flex items-center gap-1.5 whitespace-nowrap shrink-0"
          style={{ color: node.accentColor }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full animate-pulse shrink-0"
            style={{ backgroundColor: node.accentColor }}
          />
          {node.nodeCode}
        </span>
        {node.rightTag && (
          <span
            className="font-mono text-[8.5px] sm:text-[9px] tracking-widest uppercase font-semibold whitespace-nowrap shrink-0"
            style={{ color: node.accentColor }}
          >
            {node.rightTag}
          </span>
        )}
      </div>

      {/* Main Body: Title & Subtitle or Terminal */}
      <div className="relative z-10 my-auto whitespace-nowrap">
        <h3 className="font-display font-bold text-[13px] sm:text-[14px] text-white tracking-tight leading-snug drop-shadow-sm whitespace-nowrap">
          {node.title}
        </h3>

        {node.subtitle && (
          <p className="font-mono text-[9.5px] sm:text-[10px] text-zinc-400 mt-0.5 leading-tight whitespace-nowrap">
            {node.subtitle}
          </p>
        )}

        {/* Custom Terminal Snippet for Node 04 */}
        {node.terminalSnippet && (
          <div className="mt-1 p-1.5 rounded bg-black/70 border border-emerald-500/30 font-mono text-[8px] text-emerald-400 leading-tight whitespace-nowrap overflow-hidden">
            <div className="opacity-75 whitespace-nowrap">{node.terminalSnippet.alert}</div>
            <div className="text-emerald-300 font-semibold tracking-wide whitespace-nowrap">
              {node.terminalSnippet.detail}
            </div>
          </div>
        )}
      </div>

      {/* Footer / Telemetry Badges */}
      <div className="relative z-10 pt-0.5 flex items-center justify-between font-mono text-[8.5px] text-zinc-400 whitespace-nowrap gap-2">
        {node.badges && (
          <div className="flex items-center gap-1.5 whitespace-nowrap shrink-0">
            {node.badges.map((b, bi) => (
              <span
                key={bi}
                className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-zinc-300 font-mono text-[8px] tracking-wider whitespace-nowrap"
              >
                {b}
              </span>
            ))}
          </div>
        )}

        {node.urlBadge && (
          <span className="text-amber-400/95 font-mono text-[9px] tracking-wider font-semibold whitespace-nowrap shrink-0">
            {node.urlBadge}
          </span>
        )}

        {node.streamBadge && (
          <span className="text-emerald-400 font-mono text-[8px] tracking-wider font-semibold flex items-center gap-1 whitespace-nowrap shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
            {node.streamBadge}
          </span>
        )}

        {node.metric && (
          <span className="text-zinc-400 font-mono text-[8.5px] tracking-wider ml-auto font-medium whitespace-nowrap shrink-0">
            {node.metric}
          </span>
        )}

        {node.hasProgressBar && (
          <div className="w-full h-1 bg-zinc-800 rounded-full overflow-hidden mt-0.5">
            <div className="w-3/4 h-full bg-neonCyan shadow-[0_0_8px_#00F0FF]" />
          </div>
        )}
      </div>
    </div>
  );

  return (
    <section
      id="hero"
      data-hud-label="SYSTEMS"
      ref={containerRef}
      className="relative w-full min-h-[100dvh] h-auto py-16 sm:py-0 sm:h-screen sm:min-h-[760px] overflow-hidden bg-[#060606] bg-dot-grid flex flex-col items-center justify-center border-b border-hairline select-none box-border"
    >
      {/* 14 Radiant Celestial Stardust Dots (Decoupled Drift, Organic Shimmer & Color Cycling) */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-1 overflow-hidden">
        {CELESTIAL_DOTS.map((dot) => (
          <span
            key={dot.id}
            className="absolute pointer-events-none will-change-transform"
            style={{
              left: dot.x,
              top: dot.y,
              animation: `${dot.driftAnim} ${dot.driftDur} ease-in-out infinite`,
              animationDelay: dot.driftDelay,
            }}
          >
            <span
              className="block rounded-full will-change-transform"
              style={{
                width: `${dot.size}px`,
                height: `${dot.size}px`,
                filter: 'blur(0.35px)',
                animation: `${dot.shimmerAnim} ${dot.shimmerDur} ease-in-out infinite, ${dot.colorAnim} ${dot.colorDur} linear infinite`,
                animationDelay: `${dot.shimmerDelay}, 0s`,
              }}
            />
          </span>
        ))}
      </div>

      {/* ============================================================ */}
      {/* Radiant Liquid Ambient Light Blob (Slow morph & Color shift) */}
      {/* ============================================================ */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] sm:w-[650px] md:w-[750px] h-[260px] sm:h-[350px] md:h-[380px] pointer-events-none z-0 overflow-visible flex items-center justify-center">
        {/* Layer 1: Core Liquid Organic Blob in deep jewel tones (avoids high-luminance yellow wash-out) */}
        <div
          className="w-full h-full rounded-full animate-liquid-blob will-change-transform"
          style={{
            background: 'radial-gradient(circle at center, rgba(124, 58, 237, 0.72) 0%, rgba(99, 102, 241, 0.65) 30%, rgba(217, 70, 239, 0.55) 60%, transparent 85%)',
          }}
        />
        {/* Layer 2: Counter-Rotating Secondary Soft Ambient Liquid Glow */}
        <div
          className="absolute w-[88%] h-[88%] rounded-full animate-liquid-blob-counter will-change-transform"
          style={{
            background: 'radial-gradient(circle at center, rgba(37, 99, 235, 0.65) 0%, rgba(14, 165, 233, 0.55) 35%, rgba(147, 51, 234, 0.45) 68%, transparent 88%)',
          }}
        />
      </div>

      {/* Background Concentric Orbital Rings & Traveling Neon Energy Beams (Temporarily Commented Out) */}
      {/*
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
        <defs>
          <linearGradient id="travel-gradient-cyan" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
            <stop offset="25%" stopColor="#00F0FF" stopOpacity="0.95" />
            <stop offset="65%" stopColor="#00F0FF" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#00F0FF" stopOpacity="0" />
          </linearGradient>

          <linearGradient id="travel-gradient-blue" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
            <stop offset="30%" stopColor="#3B82F6" stopOpacity="0.95" />
            <stop offset="70%" stopColor="#8B5CF6" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0" />
          </linearGradient>

          <linearGradient id="travel-gradient-emerald" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
            <stop offset="30%" stopColor="#10B981" stopOpacity="0.95" />
            <stop offset="70%" stopColor="#00F0FF" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#00F0FF" stopOpacity="0" />
          </linearGradient>

          <linearGradient id="travel-gradient-rose" x1="100%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
            <stop offset="30%" stopColor="#F43F5E" stopOpacity="0.95" />
            <stop offset="70%" stopColor="#F59E0B" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
          </linearGradient>
        </defs>

        <ellipse cx="50%" cy="50%" rx="540" ry="310" className="orbit-ring-dashed" />
        <ellipse cx="50%" cy="50%" rx="740" ry="430" className="orbit-ring-dashed" />
        <ellipse cx="50%" cy="50%" rx="940" ry="540" className="orbit-ring" />

        <ellipse
          cx="50%"
          cy="50%"
          rx="540"
          ry="310"
          fill="none"
          stroke="url(#travel-gradient-cyan)"
          strokeWidth="6"
          strokeDasharray="280 2420"
          className="animate-orbit-travel-1 opacity-35"
        />
        <ellipse
          cx="50%"
          cy="50%"
          rx="540"
          ry="310"
          fill="none"
          stroke="url(#travel-gradient-cyan)"
          strokeWidth="2.2"
          strokeDasharray="280 2420"
          className="animate-orbit-travel-1"
          style={{ filter: 'drop-shadow(0 0 7px #00F0FF)' }}
        />

        <ellipse
          cx="50%"
          cy="50%"
          rx="740"
          ry="430"
          fill="none"
          stroke="url(#travel-gradient-blue)"
          strokeWidth="6.5"
          strokeDasharray="400 3320"
          className="animate-orbit-travel-2 opacity-35"
        />
        <ellipse
          cx="50%"
          cy="50%"
          rx="740"
          ry="430"
          fill="none"
          stroke="url(#travel-gradient-blue)"
          strokeWidth="2.4"
          strokeDasharray="400 3320"
          className="animate-orbit-travel-2"
          style={{ filter: 'drop-shadow(0 0 7px #3B82F6)' }}
        />

        <ellipse
          cx="50%"
          cy="50%"
          rx="940"
          ry="540"
          fill="none"
          stroke="url(#travel-gradient-emerald)"
          strokeWidth="7"
          strokeDasharray="500 4210"
          className="animate-orbit-travel-3 opacity-35"
        />
        <ellipse
          cx="50%"
          cy="50%"
          rx="940"
          ry="540"
          fill="none"
          stroke="url(#travel-gradient-emerald)"
          strokeWidth="2.6"
          strokeDasharray="500 4210"
          className="animate-orbit-travel-3"
          style={{ filter: 'drop-shadow(0 0 8px #10B981)' }}
        />

        <ellipse
          cx="50%"
          cy="50%"
          rx="940"
          ry="540"
          fill="none"
          stroke="url(#travel-gradient-rose)"
          strokeWidth="5"
          strokeDasharray="420 4290"
          className="animate-orbit-travel-1 opacity-35"
          style={{ animationDuration: '24s', animationDirection: 'reverse' }}
        />
        <ellipse
          cx="50%"
          cy="50%"
          rx="940"
          ry="540"
          fill="none"
          stroke="url(#travel-gradient-rose)"
          strokeWidth="2"
          strokeDasharray="420 4290"
          className="animate-orbit-travel-1"
          style={{ animationDuration: '24s', animationDirection: 'reverse', filter: 'drop-shadow(0 0 6px #F43F5E)' }}
        />
      </svg>
      */}

      {/* Desktop 8 Orbiting Architectural System Cards (Temporarily Commented Out) */}
      {/*
      <div className="hidden md:block absolute inset-0 w-full h-full pointer-events-none">
        {HERO_NODES.map((node, i) => {
          const isHovered = hoveredNodeId === node.id;

          return (
            <div
              key={node.id}
              ref={(el) => (cardElementsRef.current[i] = el)}
              className="absolute pointer-events-auto will-change-transform"
              onMouseMove={handleCardMouseMove}
              onMouseEnter={() => {
                setHoveredNodeId(node.id);
                hoveredNodeIdRef.current = node.id;
              }}
              onMouseLeave={() => {
                setHoveredNodeId(null);
                hoveredNodeIdRef.current = null;
                hoverVectorRef.current = { dx: 0, dy: 0 };
              }}
            >
              {renderCardContent(node, isHovered)}
            </div>
          );
        })}
      </div>
      */}

      {/* 
        Centerpiece Hero Content (AMARJIT + Resilient Systems + Brutalist CTA)
        The container stays centered in place; ONLY the letters split horizontally on scroll!
      */}
      <div
        id="hero-center"
        className="relative z-30 text-center w-full max-w-4xl min-w-0 pl-4 pr-6 sm:px-6 py-4 mx-auto pointer-events-auto box-border"
      >
        <div
          className="inline-flex items-center space-x-2 font-mono text-[9.5px] sm:text-xs tracking-[0.16em] sm:tracking-[0.24em] text-neonCyan uppercase mb-2.5 sm:mb-3 transition-opacity duration-300 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]"
          style={{ opacity: isMobile ? 1 : Math.max(0, 1 - scrollProgress * 1.8) }}
        >
          <span>[ FULL-STACK &amp; BACKEND TECH LEAD ]</span>
        </div>

        {/* Display Title AMARJIT — Splitting character-by-character on scroll */}
        <h1
          id="kinetic-title"
          className="font-display font-extrabold text-4xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tight text-white leading-none select-none drop-shadow-[0_15px_40px_rgba(255,255,255,0.2)] flex justify-center space-x-1 sm:space-x-3 overflow-visible"
        >
          {TITLE_LETTERS.map((item, idx) => (
            <span
              key={idx}
              ref={(el) => (lettersRef.current[idx] = el)}
              className="inline-block will-change-transform"
            >
              {item.char}
            </span>
          ))}
        </h1>

        {/* Subtitle, Description, Buttons & Technical Strip (Matching Image 2) */}
        <div
          className="transition-opacity duration-300"
          style={{ opacity: isMobile ? 1 : Math.max(0, 1 - scrollProgress * 1.8) }}
        >
          <p className="mt-3 sm:mt-4 text-base sm:text-2xl md:text-3xl text-zinc-100 font-light drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)] px-1 sm:px-2">
            Resilient <span className="font-serif italic text-white text-lg sm:text-3xl md:text-4xl drop-shadow-[0_2px_14px_rgba(0,0,0,0.95)]">systems</span> for high-scale products.
          </p>

          <p className="mt-2.5 sm:mt-3 text-xs sm:text-sm text-zinc-300 max-w-lg sm:max-w-xl mx-auto leading-relaxed drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)] px-1 sm:px-3 break-words">
            {DEVELOPER_PROFILE.name} architects distributed Python/FastAPI backends, Next.js frontends, and automated cloud infrastructure with uncompromising control.
          </p>

          {/* Dual Sharp Brutalist Buttons */}
          <div className="mt-4 sm:mt-7 flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-3 w-full max-w-[280px] sm:max-w-none mx-auto px-1 sm:px-0">
            <a
              href="#systems"
              onClick={() => trackHeroCTA('EXPLORE SYSTEMS', 'scroll_to_systems')}
              className="w-full sm:w-auto text-center justify-center bg-white text-black font-mono text-xs font-semibold tracking-[0.14em] px-6 py-2.5 sm:py-3 rounded hover:bg-neonCyan transition-all flex items-center space-x-2 shadow-[0_10px_25px_rgba(255,255,255,0.15)] cursor-pointer"
            >
              <span>EXPLORE SYSTEMS</span>
              <span>↓</span>
            </a>
            <button
              onClick={onOpenContact}
              className="w-full sm:w-auto text-center justify-center border border-white/25 bg-black/40 text-white font-mono text-xs tracking-[0.14em] px-6 py-2.5 sm:py-3 rounded hover:border-white hover:bg-white/10 transition-all cursor-pointer backdrop-blur-sm"
            >
              ARCHITECTURAL SPECS
            </button>
          </div>

          {/* Monospace Technical Stack Bar */}
          <div className="mt-4 sm:mt-6 pt-1 sm:pt-2 font-mono text-[9px] sm:text-[11px] tracking-[0.14em] sm:tracking-[0.20em] text-zinc-500 uppercase flex flex-wrap items-center justify-center gap-x-2 gap-y-1 sm:gap-3 max-w-full px-2 min-w-0">
            <span>PYTHON</span>
            <span>•</span>
            <span>FASTAPI</span>
            <span>•</span>
            <span>NEXT.JS</span>
            <span>•</span>
            <span>TYPESCRIPT</span>
            <span>•</span>
            <span>MONGODB</span>
            <span>•</span>
            <span>GCP</span>
            <span>•</span>
            <span>DOCKER</span>
          </div>

          {/* Mobile Swipeable Deck of System Nodes (Temporarily Commented Out) */}
          {/*
          <div className="md:hidden mt-5 sm:mt-6 w-full max-w-md mx-auto px-1 min-w-0">
            <div className="flex items-center justify-between px-1 mb-2 text-zinc-500 font-mono text-[9px] uppercase tracking-wider">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-neonCyan animate-pulse" />
                SYSTEM NODES ({HERO_NODES.length})
              </span>
              <span className="text-neonCyan font-semibold tracking-widest text-[9px] flex items-center gap-1">
                SWIPE <span>→</span>
              </span>
            </div>
            <div className="flex overflow-x-auto gap-3 py-2 px-1 no-scrollbar snap-x snap-mandatory touch-pan-x overscroll-x-contain pointer-events-auto w-full min-w-0">
              {HERO_NODES.map((node) => (
                <div
                  key={`mobile-node-${node.id}`}
                  className="snap-start shrink-0 w-[240px] xs:w-[260px] h-[132px] active:scale-[0.98] transition-transform"
                >
                  {renderCardContent(node, false)}
                </div>
              ))}
            </div>
          </div>
          */}
        </div>
      </div>
    </section>
  );
}
