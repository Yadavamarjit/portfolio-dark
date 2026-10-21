import { useEffect, useRef } from 'react';
import {
  trackPageView,
  trackScrollDepth,
  trackSectionView,
  trackSectionDwell,
  trackEvent,
} from '../utils/analytics';

const TRACKED_SECTIONS = [
  { id: 'hero', name: 'Hero Node Graph' },
  { id: 'systems', name: 'Production Architectures (Systems Bento)' },
  { id: 'experience', name: 'Career Leadership (Experience Timeline)' },
  { id: 'philosophy', name: 'Engineering Philosophy' },
  { id: 'benchmarks', name: 'Telemetry & Benchmarks' },
  { id: 'about', name: 'Arsenal & Persona (About Tools)' },
  { id: 'contact', name: 'Initiate Deployment (Contact Section)' },
];

const SCROLL_THRESHOLDS = [25, 50, 75, 90, 100];

export function useAnalyticsTracker() {
  const scrollMilestonesRef = useRef(new Set());
  const activeSectionRef = useRef(null);
  const sectionStartTimeRef = useRef(0);
  const lastScrollYRef = useRef(0);

  useEffect(() => {
    // 1. Initial Page View & Timer Init
    sectionStartTimeRef.current = Date.now();
    trackPageView(document.title);

    // 2. Scroll Depth Tracker
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;

      const currentScrollPercent = Math.min(100, Math.round((scrollY / docHeight) * 100));
      lastScrollYRef.current = scrollY;

      SCROLL_THRESHOLDS.forEach((threshold) => {
        if (currentScrollPercent >= threshold && !scrollMilestonesRef.current.has(threshold)) {
          scrollMilestonesRef.current.add(threshold);
          trackScrollDepth(threshold);
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // 3. Section Visibility & Dwell Time Tracker via IntersectionObserver
    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          const sectionMeta = TRACKED_SECTIONS.find((s) => s.id === sectionId);
          const sectionName = sectionMeta ? sectionMeta.name : sectionId;
          const now = Date.now();

          // If there was a previous active section, record its dwell time
          if (activeSectionRef.current && activeSectionRef.current !== sectionId) {
            const elapsedSeconds = (now - sectionStartTimeRef.current) / 1000;
            trackSectionDwell(activeSectionRef.current, elapsedSeconds);
          }

          // Update active section
          const scrollDirection = window.scrollY >= lastScrollYRef.current ? 'down' : 'up';
          activeSectionRef.current = sectionId;
          sectionStartTimeRef.current = now;

          trackSectionView(sectionId, sectionName, scrollDirection);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.3, // 30% visible in viewport
    });

    TRACKED_SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    // 4. Tab Visibility (Engagement) Tracker
    const handleVisibilityChange = () => {
      const isVisible = document.visibilityState === 'visible';
      const now = Date.now();

      if (!isVisible && activeSectionRef.current) {
        // User switched tab or minimized window, record dwell
        const elapsed = (now - sectionStartTimeRef.current) / 1000;
        trackSectionDwell(activeSectionRef.current, elapsed);
      } else if (isVisible) {
        // Reset timer when coming back
        sectionStartTimeRef.current = now;
      }

      trackEvent('tab_visibility_change', {
        visibility_state: document.visibilityState,
      });
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      observer.disconnect();

      // Flush final dwell time on unmount
      if (activeSectionRef.current) {
        const finalElapsed = (Date.now() - sectionStartTimeRef.current) / 1000;
        trackSectionDwell(activeSectionRef.current, finalElapsed);
      }
    };
  }, []);
}
