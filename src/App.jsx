import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HeroNodeGraph from './components/HeroNodeGraph';
import CapabilityTicker from './components/CapabilityTicker';
import SystemsBento from './components/SystemsBento';
import ExperienceTimeline from './components/ExperienceTimeline';
import ArchitecturePhilosophy from './components/ArchitecturePhilosophy';
import TelemetryBenchmarks from './components/TelemetryBenchmarks';
import AboutTools from './components/AboutTools';
import ContactSection from './components/ContactSection';
import ElevatorHUD from './components/ElevatorHUD';
import Footer from './components/Footer';

export default function App() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [selectedSystemId, setSelectedSystemId] = useState(null);

  const handleSelectSystem = (nodeId) => {
    // Map node id to system id
    const systemMap = {
      'node-ojas': 'ojas',
      'node-urbannest': 'urbannest',
      'node-sso': 'sso',
      'node-jarvis': 'jarvis',
      'node-fastship': 'fastship',
      'node-ekyc': 'ekyc',
      'node-notification': 'ojas',
      'node-microsite': 'urbannest',
      'node-askamar': 'askamar',
      'node-stockscope': 'stockscope',
      'node-infra': 'urbannest',
      'node-revo': 'fastship',
    };
    const sysId = systemMap[nodeId] || 'urbannest';
    setSelectedSystemId(sysId);

    const el = document.getElementById(`system-${sysId}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
      const sec = document.getElementById('systems');
      if (sec) sec.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-[#060606] text-[#F4F4F5] min-h-screen selection:bg-white selection:text-black">
      {/* Top Fixed Navbar */}
      <Navbar onOpenContact={() => setIsContactOpen(true)} />

      {/* Main Layout Container (Left Content Viewport + Right Elevator HUD) */}
      <div className="relative flex min-h-screen pt-14">
        {/* Left / Main Scrollable Content — 100% Full-Width (Zero Extra Space) */}
        <main className="w-full relative">
          <HeroNodeGraph
            onSelectSystem={handleSelectSystem}
            onOpenContact={() => setIsContactOpen(true)}
          />

          <CapabilityTicker />

          {/* Content sections with clean elevator corridor clearance on desktop */}
          <div className="pr-0 lg:pr-24">
            <SystemsBento
              selectedSystemId={selectedSystemId}
              onSelectSystem={setSelectedSystemId}
            />

            <ExperienceTimeline />

            <ArchitecturePhilosophy />

            <TelemetryBenchmarks />

            <AboutTools />

            <ContactSection
              isOpen={isContactOpen}
              onClose={() => setIsContactOpen(false)}
            />
          </div>

          <Footer />
        </main>

        {/* Right HUD Precision Elevator Caliper */}
        <ElevatorHUD />
      </div>
    </div>
  );
}
