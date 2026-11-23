'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { SectionBadge } from '@/components/ui/SectionBadge';
import { MethodPhase } from '@/types';

interface MethodSectionProps {
  phases?: MethodPhase[];
}

export const MethodSection: React.FC<MethodSectionProps> = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  // Structured Phase Data matching exact institutional copy and design
  const phaseDetails = [
    {
      num: '01',
      phaseLabel: 'PHASE 01',
      name: 'Learn',
      subtitle: 'CEO MASTERCLASSES',
      heading: 'Immersion & Deconstruction',
      topHeadline: 'CEO Masterclasses',
      topSubheadline: 'Real case simulations',
      description:
        'Real case studies, market simulations, and interactive business teardowns led directly by visiting CEOs and operating entrepreneurs.',
      pillTag: 'CEO Masterclasses · Live Case Studies',
      highlights: [
        'Harvard & Ivey business case methodology',
        'Direct instruction from operating CEOs and CXOs',
        'Zero textbook rote memorization; 100% contextual inquiry',
        'Dynamic financial modeling and risk simulation',
      ],
    },
    {
      num: '02',
      phaseLabel: 'PHASE 02',
      name: 'Build',
      subtitle: 'VENTURE INCUBATION',
      heading: 'Venture Build & Prototyping',
      topHeadline: '₹25L Seed Pool',
      topSubheadline: 'Campus startup incubation',
      description:
        'Test ideas inside the AIMER Venture Launchpad. Build prototypes, run customer discovery sprints, and validate real market demand.',
      pillTag: 'Venture Launchpad · ₹25L Seed Pool',
      highlights: [
        'Dedicated on-campus venture incubation lab',
        'Rapid MVP prototyping with commercial toolkits',
        'Customer interviews and unit economics testing',
        'Direct access to angel investors and seed grants',
      ],
    },
    {
      num: '03',
      phaseLabel: 'PHASE 03',
      name: 'Work',
      subtitle: 'CORPORATE RESIDENCY',
      heading: 'Embedded Corporate Residency',
      topHeadline: 'Up to 12 Months',
      topSubheadline: 'Paid corporate residency',
      description:
        'Up to 12 months of embedded corporate residency inside partner firms. Real KPIs, live client deliverables, and monthly stipends.',
      pillTag: 'Up to 12 months · Paid stipend',
      highlights: [
        'Full-time placement inside 74+ corporate recruiters',
        'Real performance KPIs with senior manager reviews',
        'Monthly stipends up to ₹50,000 during residency',
        'Executive responsibility across strategy and operations',
      ],
    },
    {
      num: '04',
      phaseLabel: 'PHASE 04',
      name: 'Go Global',
      subtitle: 'CROSS-BORDER MOBILITY',
      heading: 'Cross-Border Immersion',
      topHeadline: 'Dubai & SG',
      topSubheadline: 'Global immersion corridors',
      description:
        'Overseas business immersion delegations to Dubai Future Foundation, DIFC, and Singapore financial and trade corridors.',
      pillTag: 'Dubai · DIFC · Singapore',
      highlights: [
        'Visits to Dubai Future Foundation & DIFC Fintech Hive',
        'Gulf trade dynamics and cross-border regulatory corridors',
        'Singapore financial technology immersion',
        'Global executive networking with expatriate entrepreneurs',
      ],
    },
    {
      num: '05',
      phaseLabel: 'PHASE 05',
      name: 'Launch',
      subtitle: 'CAREER & VENTURE ACCELERATION',
      heading: 'Executive Career Launch',
      topHeadline: '₹14.5 LPA Peak',
      topSubheadline: 'Pre-placement conversion',
      description:
        'Graduate with pre-placement corporate offers (PPOs), executive roles, or your own revenue-generating startup backed by seed capital.',
      pillTag: 'Pre-Placement Offers · ₹14.5 LPA Peak',
      highlights: [
        'Direct conversion into high-growth corporate careers',
        'Alumni-backed angel funding for standout ventures',
        '100% placement support across all core pathways',
        'Lifetime executive alumni network across India and GCC',
      ],
    },
  ];

  // Scroll listener: Smooth, calm progression across a comfortable 550vh track
  useEffect(() => {
    const handleScroll = () => {
      if (!trackRef.current) return;
      const rect = trackRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const totalDistance = rect.height - windowHeight;

      if (totalDistance <= 0) return;

      const scrolled = -rect.top;

      if (scrolled <= 0) {
        setActiveIdx(0);
        return;
      }

      if (scrolled >= totalDistance) {
        setActiveIdx(phaseDetails.length - 1);
        return;
      }

      const progress = Math.max(0, Math.min(1, scrolled / totalDistance));
      const newIdx = Math.min(phaseDetails.length - 1, Math.floor(progress * phaseDetails.length));

      setActiveIdx((prev) => (prev !== newIdx ? newIdx : prev));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [phaseDetails.length]);

  // Click on any stepper node to smoothly scroll to that phase's segment
  const handleStepClick = (idx: number) => {
    setActiveIdx(idx);
    if (!trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const trackTop = rect.top + scrollTop;
    const totalDistance = rect.height - window.innerHeight;

    if (totalDistance > 0) {
      const targetScroll = trackTop + ((idx + 0.5) / phaseDetails.length) * totalDistance;
      window.scrollTo({ top: targetScroll, behavior: 'smooth' });
    }
  };

  const current = phaseDetails[activeIdx] || phaseDetails[0];

  return (
    <section id="method" className="bg-[#0e1719] text-white relative">
      {/* Background Ambience: Subtle dot grid and atmospheric radial glows */}
      <div className="absolute inset-0 bg-aimer-dots opacity-30 pointer-events-none [mask-image:radial-gradient(ellipse_at_center,black_45%,transparent_80%)]" />
      <div className="absolute top-1/4 right-0 w-[550px] h-[550px] rounded-full bg-aimer-600/10 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[550px] h-[550px] rounded-full bg-aimer-500/10 blur-[130px] pointer-events-none" />

      {/* =========================================================================
          SCROLL TRACK (550vh track provides relaxed, comfortable ~90vh scroll per phase)
          ========================================================================= */}
      <div ref={trackRef} className="relative h-[550vh]">
        <div className="sticky top-0 h-screen max-h-screen flex flex-col justify-center overflow-hidden px-4 sm:px-6 lg:px-8 py-2 sm:py-4">
          <div className="max-w-4xl lg:max-w-5xl mx-auto w-full relative z-10 flex flex-col justify-center">
            
            {/* Header: Proportionally scaled to ensure full viewport visibility */}
            <div className="text-center max-w-2xl mx-auto space-y-1 sm:space-y-1.5">
              <SectionBadge variant="outline" className="text-aimer-300 border-aimer-500/50 bg-aimer-950/50 text-[10px] sm:text-[11px] py-0.5 px-2.5">
                Experiential Pedagogy
              </SectionBadge>

              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-white leading-tight font-poppins">
                The AIMER Method:{' '}
                <span className="text-[#32b2be] font-bold">Integrated Journey.</span>
              </h2>

              <p className="text-[11px] sm:text-xs text-charcoal-300 font-light max-w-xl mx-auto leading-relaxed">
                We replaced textbook memorization with five progressive phases built for real-world capability.
              </p>
            </div>

            {/* Stepper Rail: Compact, clean vertical footprint */}
            <div className="mt-3 sm:mt-4 max-w-2xl mx-auto w-full relative px-4">
              {/* Base Track Line */}
              <div className="absolute left-6 right-6 top-3.5 sm:top-4 h-[2px] bg-charcoal-800 -z-0" />

              {/* Active Filled Teal Track Line */}
              <div
                className="absolute left-6 top-3.5 sm:top-4 h-[2px] bg-gradient-to-r from-aimer-400 to-aimer-500 -z-0 transition-all duration-500 shadow-[0_0_12px_rgba(50,178,190,0.8)]"
                style={{
                  width: `${(activeIdx / (phaseDetails.length - 1)) * 92}%`,
                }}
              />

              {/* Stepper Nodes */}
              <div className="relative z-10 flex justify-between items-start">
                {phaseDetails.map((p, idx) => {
                  const isActive = idx === activeIdx;
                  const isPast = idx < activeIdx;

                  return (
                    <button
                      key={p.num}
                      type="button"
                      onClick={() => handleStepClick(idx)}
                      className="group flex flex-col items-center focus:outline-none cursor-pointer"
                    >
                      {/* Node Circle */}
                      <div
                        className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-[11px] sm:text-xs font-poppins font-bold transition-all duration-300 ${
                          isActive
                            ? 'bg-[#1cb0bd] text-[#0e1719] shadow-[0_0_16px_rgba(28,176,189,0.8)] scale-110'
                            : isPast
                            ? 'bg-[#153439] text-[#32b2be] border-2 border-[#1cb0bd]'
                            : 'bg-[#141e21] text-charcoal-400 border border-charcoal-700 group-hover:border-charcoal-500'
                        }`}
                      >
                        {p.num}
                      </div>

                      {/* Node Title */}
                      <span
                        className={`text-[9px] sm:text-[10px] mt-1 font-semibold tracking-wide transition-colors duration-200 ${
                          isActive ? 'text-[#32b2be]' : 'text-charcoal-400 group-hover:text-charcoal-200'
                        }`}
                      >
                        {p.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Spotlight Card: Compact proportions ensure 100% fits within screen without cutting off */}
            <div className="mt-3 sm:mt-4">
              <div className="relative rounded-2xl sm:rounded-3xl bg-[#131f22]/95 border border-[#1e3439] shadow-2xl p-4 sm:p-6 lg:p-7 overflow-hidden">
                
                {/* HUGE OUTLINED PHASE NUMBER IN BACKGROUND */}
                <div
                  aria-hidden="true"
                  className="absolute right-4 sm:right-8 lg:right-10 top-1/2 -translate-y-1/2 pointer-events-none select-none z-0"
                >
                  <span
                    key={current.num}
                    className="text-[8rem] sm:text-[11rem] lg:text-[13rem] font-bold font-poppins tracking-tighter leading-none select-none transition-all duration-300 animate-method-fade block"
                    style={{
                      color: 'transparent',
                      WebkitTextStroke: '2px rgba(35, 137, 148, 0.45)',
                      opacity: 0.6,
                    }}
                  >
                    {current.num}
                  </span>
                </div>

                {/* Inner Content (Above background number) */}
                <div key={current.num} className="relative z-10 space-y-2.5 sm:space-y-3.5 animate-method-fade">
                  
                  {/* Top Bar inside Card: Headline & Subheadline */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2.5 border-b border-[#1f373c]/70 gap-1.5">
                    <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-white tracking-tight font-poppins">
                      {current.topHeadline}
                    </div>
                    <div className="text-[11px] sm:text-xs text-charcoal-400 font-medium sm:text-right">
                      {current.topSubheadline}
                    </div>
                  </div>

                  {/* Meta Row: Phase Outline Pill + Uppercase Kicker */}
                  <div className="flex items-center gap-2.5 pt-0.5">
                    <span className="text-[10px] sm:text-[11px] font-poppins font-semibold text-[#32b2be] bg-[#112c31] px-2.5 py-0.5 rounded-full border border-[#1cb0bd]/50">
                      {current.phaseLabel}
                    </span>
                    <span className="text-[10px] sm:text-[11px] uppercase tracking-widest text-charcoal-400 font-semibold">
                      {current.subtitle}
                    </span>
                  </div>

                  {/* Main Heading */}
                  <h3 className="text-base sm:text-lg lg:text-xl font-bold text-white tracking-tight leading-snug">
                    {current.heading}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-[13px] text-charcoal-300 leading-normal max-w-2xl font-light">
                    {current.description}
                  </p>

                  {/* Highlight Pill */}
                  <div className="pt-0.5">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#14262a] border border-[#23454b] text-[11px] sm:text-xs font-semibold text-white shadow-xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#1cb0bd] animate-pulse" />
                      {current.pillTag}
                    </span>
                  </div>

                  {/* Verified Phase Deliverables Checklist */}
                  <div className="pt-2.5 border-t border-[#1f373c]/70">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-charcoal-400 mb-1.5">
                      Verified Phase Deliverables
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2 max-w-2xl">
                      {current.highlights.map((item, hIdx) => (
                        <div
                          key={hIdx}
                          className="p-2 sm:p-2.5 rounded-lg bg-[#112428]/80 border border-[#1b3a40] text-[11px] sm:text-xs text-charcoal-200 flex items-start gap-2"
                        >
                          <span className="w-3.5 h-3.5 rounded-full bg-[#1b4349] text-[#32b2be] flex items-center justify-center text-[9px] font-bold shrink-0 mt-0.5">
                            ✓
                          </span>
                          <span className="leading-tight">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* =========================================================================
          BOTTOM CALL TO ACTION (Apply via NAAT 2026)
          Cleanly separated from the sticky container with pt-20 to prevent overlap,
          and tight pb-12 to seamlessly align with Enterprise Ecosystem below.
          ========================================================================= */}
      <div className="max-w-4xl lg:max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-24 pb-14 sm:pb-16 relative z-10">
        <div className="p-5 sm:p-7 rounded-2xl sm:rounded-3xl bg-[#131f22] border border-[#1e3439] flex flex-col sm:flex-row items-center justify-between gap-5 shadow-xl">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
              Ready to start <span className="text-[#32b2be] italic">Phase 01?</span>
            </h3>
            <p className="text-xs sm:text-[13px] text-charcoal-400 font-light">
              Begin your journey with Harvard-case simulations, CEO masterclasses, and venture launch sprints.
            </p>
          </div>

          <Link
            href="#admissions"
            className="px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider text-white bg-aimer-500 hover:bg-aimer-600 transition-all duration-200 shadow-md hover:shadow-lg whitespace-nowrap"
          >
            Apply via NAAT 2026 &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
};

export default MethodSection;
