'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { SectionBadge } from '@/components/ui/SectionBadge';
import { Programme } from '@/types';

interface ProgrammesSectionProps {
  programmes: Programme[];
}

/**
 * Animated number counter with Indian digit grouping (e.g. 50,000 / 14.5)
 */
const AnimatedMetric: React.FC<{
  rawHighlight: string;
  reduceMotion: boolean;
}> = ({ rawHighlight, reduceMotion }) => {
  const [displayValue, setDisplayValue] = useState<string>(rawHighlight);

  useEffect(() => {
    if (reduceMotion) {
      setDisplayValue(rawHighlight);
      return;
    }

    // Extract numbers, prefixes, and suffixes (e.g., "₹50,000 / mo" -> prefix "₹", number 50000, suffix " / mo")
    const match = rawHighlight.match(/^([^\d]*)([\d,.]+)(.*)$/);
    if (!match) {
      setDisplayValue(rawHighlight);
      return;
    }

    const prefix = match[1] || '';
    const numStr = match[2].replace(/,/g, '');
    const suffix = match[3] || '';
    const target = parseFloat(numStr);

    if (isNaN(target)) {
      setDisplayValue(rawHighlight);
      return;
    }

    const isDecimal = numStr.includes('.');
    const decimalPlaces = isDecimal ? numStr.split('.')[1].length : 0;
    const duration = 900; // ms
    const startTime = performance.now();

    let animationFrameId: number;

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic curve: 1 - (1 - progress)^3
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const current = target * easeProgress;

      let formattedNumber: string;
      if (isDecimal) {
        formattedNumber = current.toFixed(decimalPlaces);
      } else {
        formattedNumber = Math.round(current).toLocaleString('en-IN');
      }

      setDisplayValue(`${prefix}${formattedNumber}${suffix}`);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setDisplayValue(rawHighlight);
      }
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [rawHighlight, reduceMotion]);

  return <span>{displayValue}</span>;
};

export const ProgrammesSection: React.FC<ProgrammesSectionProps> = ({ programmes }) => {
  const [selectedId, setSelectedId] = useState<string>(programmes[0]?.id || 'ugbip');
  const [blobStyle, setBlobStyle] = useState<{ left: number; width: number; ready: boolean }>({
    left: 0,
    width: 0,
    ready: false,
  });
  const [reduceMotion, setReduceMotion] = useState(false);

  const navContainerRef = useRef<HTMLDivElement | null>(null);
  const tabRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
  const isFirstRenderRef = useRef(true);

  // Check prefers-reduced-motion
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setReduceMotion(mediaQuery.matches);
      const listener = (e: MediaQueryListEvent) => setReduceMotion(e.matches);
      mediaQuery.addEventListener('change', listener);
      return () => mediaQuery.removeEventListener('change', listener);
    }
  }, []);

  // Update blob dimensions and position based on active tab button
  const updateBlobPosition = useCallback(() => {
    const activeBtn = tabRefs.current.get(selectedId);
    const container = navContainerRef.current;
    if (!activeBtn || !container) return;

    const left = activeBtn.offsetLeft;
    const width = activeBtn.offsetWidth;

    setBlobStyle({
      left,
      width,
      ready: true,
    });
  }, [selectedId]);

  // Sync blob on tab change, resize, and font ready
  useEffect(() => {
    updateBlobPosition();

    const handleResize = () => {
      updateBlobPosition();
    };

    window.addEventListener('resize', handleResize);

    if (typeof document !== 'undefined' && 'fonts' in document) {
      document.fonts.ready.then(() => {
        updateBlobPosition();
      });
    }

    const timer = setTimeout(() => {
      isFirstRenderRef.current = false;
    }, 50);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timer);
    };
  }, [updateBlobPosition]);

  // Keyboard navigation for accessible tabs (ArrowLeft, ArrowRight)
  const handleKeyDown = (e: React.KeyboardEvent, currentIndex: number) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      const nextIndex = (currentIndex + 1) % programmes.length;
      const nextProgramme = programmes[nextIndex];
      if (nextProgramme) {
        setSelectedId(nextProgramme.id);
        tabRefs.current.get(nextProgramme.id)?.focus();
      }
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      const prevIndex = (currentIndex - 1 + programmes.length) % programmes.length;
      const prevProgramme = programmes[prevIndex];
      if (prevProgramme) {
        setSelectedId(prevProgramme.id);
        tabRefs.current.get(prevProgramme.id)?.focus();
      }
    }
  };

  const activeProgramme = programmes.find((p) => p.id === selectedId) || programmes[0];

  return (
    <section id="programmes" className="pt-20 lg:pt-28 pb-12 sm:pb-16 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-14 border-b border-charcoal-100">
          <div className="space-y-3 max-w-2xl">
            <SectionBadge variant="teal">Curriculum Architecture</SectionBadge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-charcoal-900 leading-tight">
              Four Specialized Pathways.{' '}
              <span className="text-aimer-600 block sm:inline font-normal italic">
                One Practicum Philosophy.
              </span>
            </h2>
            <p className="text-sm sm:text-base text-charcoal-600 font-light">
              Every pathway features 75% experiential learning, embedded corporate projects,
              and guaranteed global immersion.
            </p>
          </div>

          <div className="text-left md:text-right">
            <div className="text-xs font-semibold uppercase tracking-wider text-charcoal-500">
              Admission Gateway
            </div>
            <div className="text-sm font-semibold text-aimer-600 mt-0.5">
              NAAT 2026 Batch Applications Open
            </div>
          </div>
        </div>

        {/* =========================================================================
            CONNECTED TABS SELECTOR & PANEL ARCHITECTURE
            ========================================================================= */}
        <div className="mt-14 w-full">
          
          {/* Centered Option Row Container (Narrower than the panel below) */}
          <div className="w-full flex justify-center px-4 overflow-x-auto no-scrollbar">
            <div
              ref={navContainerRef}
              role="tablist"
              aria-label="Academic Programmes"
              className="relative flex justify-center items-center gap-2 sm:gap-3 w-fit mx-auto"
              style={{
                /* Ensures the options row stays tightly fitted to contents and centered */
                marginBottom: 0,
              }}
            >
              {/* SLIDING BLOB BACKGROUND ELEMENT:
                  - Same color as the panel (#E3F3F4)
                  - Height is 47px (tab height 46px + 1px) to overlap the panel with no seam
                  - Inverted rounded corners created via pseudo-elements ::before and ::after */}
              {blobStyle.ready && (
                <div
                  aria-hidden="true"
                  className="absolute pointer-events-none z-[1] rounded-t-[16px]"
                  style={{
                    backgroundColor: '#E3F3F4',
                    top: 0,
                    height: 'calc(100% + 1px)',
                    left: `${blobStyle.left}px`,
                    width: `${blobStyle.width}px`,
                    transition:
                      reduceMotion || isFirstRenderRef.current
                        ? 'none'
                        : 'left 0.45s cubic-bezier(0.3, 0.9, 0.3, 1), width 0.45s cubic-bezier(0.3, 0.9, 0.3, 1)',
                  }}
                >
                  {/* Left inverse corner fillet */}
                  <span
                    className="absolute bottom-0 -left-[16px] w-[16px] h-[16px] pointer-events-none"
                    style={{
                      background: 'radial-gradient(circle at top left, transparent 16px, #E3F3F4 16.5px)',
                    }}
                  />
                  {/* Right inverse corner fillet */}
                  <span
                    className="absolute bottom-0 -right-[16px] w-[16px] h-[16px] pointer-events-none"
                    style={{
                      background: 'radial-gradient(circle at top right, transparent 16px, #E3F3F4 16.5px)',
                    }}
                  />
                </div>
              )}

              {/* Individual Tab Option Buttons */}
              {programmes.map((p, idx) => {
                const isSelected = p.id === selectedId;
                const durationPill = p.duration.split('·')[0].trim();

                return (
                  <button
                    key={p.id}
                    ref={(el) => {
                      if (el) tabRefs.current.set(p.id, el);
                      else tabRefs.current.delete(p.id);
                    }}
                    role="tab"
                    id={`tab-${p.id}`}
                    aria-selected={isSelected}
                    aria-controls={`panel-${p.id}`}
                    tabIndex={isSelected ? 0 : -1}
                    onClick={() => setSelectedId(p.id)}
                    onKeyDown={(e) => handleKeyDown(e, idx)}
                    className="relative z-[2] flex items-center gap-2.5 h-[46px] px-[18px] select-none focus:outline-none transition-colors duration-200"
                    style={{
                      color: isSelected ? '#0b6b74' : '#6b7280',
                      fontWeight: isSelected ? 600 : 500,
                    }}
                  >
                    <span className="text-xs sm:text-sm font-poppins tracking-wide whitespace-nowrap">
                      {p.shortTitle}
                    </span>

                    {/* Small Pill Chip */}
                    <span
                      className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full transition-colors duration-250 whitespace-nowrap"
                      style={{
                        backgroundColor: isSelected ? '#12838f' : '#e5e7eb',
                        color: isSelected ? '#ffffff' : '#6b7280',
                      }}
                    >
                      {durationPill}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* LARGE CONNECTED CONTENT PANEL:
              - Sits directly under the row with 0 gap
              - Shares the exact light-teal color #E3F3F4
              - 22px border radius, 26px padding, no border to maintain seamless shape
              - Inner cards are white with rounded corners (14-16px) */}
          <div
            id={`panel-${activeProgramme?.id}`}
            role="tabpanel"
            aria-labelledby={`tab-${activeProgramme?.id}`}
            className="w-full rounded-[22px] p-[26px] relative z-0 shadow-sm"
            style={{
              backgroundColor: '#E3F3F4',
              marginTop: 0,
            }}
          >
            {/* Animated Swapping Container (Fades and rises in on tab switch) */}
            <div
              key={activeProgramme?.id}
              className="space-y-6"
              style={{
                animation: reduceMotion
                  ? 'none'
                  : 'panelFadeIn 0.45s cubic-bezier(0.25, 1, 0.5, 1) forwards',
              }}
            >
              {/* Panel Top Row: Pathway Header & Details */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                
                {/* Left Overview (7 cols) */}
                <div className="lg:col-span-7 space-y-4">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white text-aimer-700 shadow-2xs">
                      {activeProgramme?.badge}
                    </span>
                    <span className="text-xs font-medium text-charcoal-600">
                      Eligibility: <strong className="text-charcoal-900 font-semibold">{activeProgramme?.eligibility}</strong>
                    </span>
                  </div>

                  <div>
                    <h3 className="text-2xl sm:text-3xl font-semibold text-charcoal-900 tracking-tight">
                      {activeProgramme?.title}
                    </h3>
                    <p className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-aimer-700 mt-1">
                      {activeProgramme?.audience} • {activeProgramme?.duration}
                    </p>
                  </div>

                  <p className="text-sm sm:text-base text-charcoal-700 leading-relaxed font-light">
                    {activeProgramme?.description}
                  </p>
                </div>

                {/* Right Metric Benchmark & Scholarship Inset (5 cols) */}
                <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
                  
                  {/* Verified Metric Card (White card, rounded 16px) */}
                  <div className="p-6 rounded-[16px] bg-white shadow-xs space-y-2 border border-white">
                    <div className="text-[11px] font-semibold uppercase tracking-wider text-aimer-600">
                      Verified Benchmark Outcome
                    </div>
                    <div className="text-3xl sm:text-4xl font-bold text-aimer-700 tracking-tight">
                      <AnimatedMetric
                        rawHighlight={activeProgramme?.keyOutcome.highlight || ''}
                        reduceMotion={reduceMotion}
                      />
                    </div>
                    <div className="text-xs font-medium text-charcoal-700">
                      {activeProgramme?.keyOutcome.label}
                    </div>
                  </div>

                  {/* Scholarship Inset Card (White card, rounded 16px) */}
                  <div className="p-5 rounded-[16px] bg-white shadow-xs space-y-1.5 border border-white">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] uppercase tracking-wider text-aimer-700 font-bold">
                        Scholarship Framework
                      </span>
                      <span className="text-[10px] font-semibold bg-aimer-50 text-aimer-800 px-2 py-0.5 rounded-full">
                        0% Interest EMI
                      </span>
                    </div>
                    <div className="text-sm font-semibold text-charcoal-900">
                      {activeProgramme?.scholarship}
                    </div>
                  </div>

                </div>
              </div>

              {/* Staggered Feature Cards Grid (White cards, rounded 14px) */}
              <div className="space-y-2.5 pt-2">
                <div className="text-xs font-bold uppercase tracking-wider text-charcoal-800 px-1">
                  Distinctive Programme Deliverables
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {activeProgramme?.features.map((feat, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-[14px] bg-white shadow-xs flex items-start gap-3 border border-white hover:border-aimer-200 transition-colors"
                      style={{
                        animation: reduceMotion
                          ? 'none'
                          : `cardFadeIn 0.45s cubic-bezier(0.25, 1, 0.5, 1) forwards`,
                        animationDelay: reduceMotion ? '0ms' : `${idx * 100}ms`,
                      }}
                    >
                      <span
                        className="w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0 mt-0.5"
                        style={{
                          backgroundColor: '#12838f',
                          color: '#ffffff',
                        }}
                      >
                        ✓
                      </span>
                      <span className="text-xs sm:text-sm text-charcoal-800 leading-snug">
                        {feat}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Dark Strip (#17191c, white text, 14px radius with primary teal pill button) */}
              <div
                className="mt-6 p-5 sm:p-6 rounded-[14px] flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md"
                style={{
                  backgroundColor: '#17191c',
                  color: '#ffffff',
                }}
              >
                <div className="space-y-1 text-center sm:text-left">
                  <div className="text-sm sm:text-base font-semibold text-white">
                    {activeProgramme?.hasNAAT ? 'Admissions Open via NAAT 2026 Batch' : 'Direct Corporate Admission Track'}
                  </div>
                  <div className="text-xs text-charcoal-300">
                    Dual degree accreditation • 12-month embedded corporate residencies • Global study corridors
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  {activeProgramme?.id === 'ugbip' && (
                    <Link
                      href="/programmes/ugbip"
                      className="px-5 py-3 rounded-full text-xs font-semibold uppercase tracking-wider text-charcoal-900 bg-white hover:bg-charcoal-100 transition-colors shadow-sm whitespace-nowrap"
                    >
                      Explore UGBIP Page &rarr;
                    </Link>
                  )}
                  {activeProgramme?.id === 'pgbip' && (
                    <Link
                      href="/programmes/pgbip"
                      className="px-5 py-3 rounded-full text-xs font-semibold uppercase tracking-wider text-white bg-gradient-to-r from-violet-600 to-aimer-600 hover:from-violet-500 hover:to-aimer-500 transition-all shadow-sm whitespace-nowrap"
                    >
                      Explore PGBIP Page &rarr;
                    </Link>
                  )}
                  {activeProgramme?.id === 'hsbip' && (
                    <Link
                      href="/programmes/hsbip"
                      className="px-5 py-3 rounded-full text-xs font-semibold uppercase tracking-wider text-charcoal-900 bg-white hover:bg-charcoal-100 transition-colors shadow-sm whitespace-nowrap"
                    >
                      Explore HSBIP Page &rarr;
                    </Link>
                  )}
                  <Link
                    href="#admissions"
                    className="px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider text-white transition-all duration-200 hover:brightness-110 active:scale-95 shadow-sm whitespace-nowrap"
                    style={{
                      backgroundColor: '#12838f',
                    }}
                  >
                    {activeProgramme?.hasNAAT ? 'Apply via NAAT 2026 →' : 'Register Direct Admission →'}
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>

      {/* Scoped CSS animations for panel and card stagger */}
      <style jsx>{`
        @keyframes panelFadeIn {
          0% {
            opacity: 0;
            transform: translateY(8px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes cardFadeIn {
          0% {
            opacity: 0;
            transform: translateY(8px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
};

export default ProgrammesSection;
