'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Programme } from '@/types';
import SectionBadge from '../ui/SectionBadge';

// ============================================================================
// CONFIGURABLE DATA & CONTENT (Editable via CMS or Config)
// ============================================================================
export const ADMISSIONS_CONFIG = {
  eyebrow: 'TRANSPARENT PATHWAY',
  heading: 'Admissions, Made',
  headingAccent: 'Simple.',
  subtitle:
    'A 4-step merit process designed to evaluate ambition, logical reasoning, and leadership aptitude.',

  steps: [
    {
      step: 'STEP 01',
      num: '01',
      title: 'Apply Online',
      description:
        'Complete our simple 5-minute registration form with your basic academic background.',
    },
    {
      step: 'STEP 02',
      num: '02',
      title: 'NAAT Evaluation',
      description:
        'Take the National AIMER Aptitude Test evaluating logical aptitude and business mindset.',
    },
    {
      step: 'STEP 03',
      num: '03',
      title: 'Personal Interview',
      description:
        'Interactive 1:1 conversation with academic directors and industry practitioners.',
    },
    {
      step: 'STEP 04',
      num: '04',
      title: 'Offer & Scholarship',
      description:
        'Receive your admission confirmation alongside applicable merit scholarships (up to 100%).',
    },
  ],

  calendar: {
    eyebrow: 'BATCH 2026 ADMISSIONS CALENDAR',
    heading: 'Key Dates & Deadlines',
    naatSlot: 'Currently Active · Limited Slots',
    deadlineText: '30 November 2026',
    // ISO string used for live countdown calculation:
    deadlineISO: '2026-11-30T23:59:59',
    orientation: 'July 2026',
  },

  scholarship: {
    eyebrow: 'FINANCIAL FLEXIBILITY',
    heading: 'Scholarships & EMI Support',
    stat1Value: 100,
    stat1Label: 'Up to, merit scholarship',
    stat2Value: '0%',
    stat2Label: 'Interest on monthly EMI',
    paragraph:
      'No student is held back by financial constraints. We offer institutional 0% interest monthly EMI options and documentation assistance with nationalized banks.',
    ctaText: 'Apply for NAAT & Scholarship',
    ctaLink: '#admissions-apply',
  },
};

interface AdmissionsSectionProps {
  programmes?: Programme[];
}

export const AdmissionsSection: React.FC<AdmissionsSectionProps> = () => {
  // ---------------------------------------------------------------------------
  // State
  // ---------------------------------------------------------------------------
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [litStepIndex, setLitStepIndex] = useState<number>(-1); // -1 = unlit
  const [isRouteEntered, setIsRouteEntered] = useState(false);
  const [isPanelEntered, setIsPanelEntered] = useState(false);
  const [isMeterEntered, setIsMeterEntered] = useState(false);
  const [scholarshipCount, setScholarshipCount] = useState<number>(0);
  const [isMobile, setIsMobile] = useState(false);

  // ---------------------------------------------------------------------------
  // Refs
  // ---------------------------------------------------------------------------
  const routeRef = useRef<HTMLDivElement>(null);
  const stepNodeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const panelRef = useRef<HTMLDivElement>(null);
  const meterRef = useRef<HTMLDivElement>(null);
  const hasAnimatedScholarship = useRef(false);

  // ---------------------------------------------------------------------------
  // Media Query & Reduced Motion Check
  // ---------------------------------------------------------------------------
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(motionQuery.matches);
    const motionHandler = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    motionQuery.addEventListener('change', motionHandler);

    const mobileQuery = window.matchMedia('(max-width: 860px)');
    setIsMobile(mobileQuery.matches);
    const mobileHandler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mobileQuery.addEventListener('change', mobileHandler);

    return () => {
      motionQuery.removeEventListener('change', motionHandler);
      mobileQuery.removeEventListener('change', mobileHandler);
    };
  }, []);

  // ---------------------------------------------------------------------------
  // Measure --len: Distance from first node to last node (Desktop & Mobile)
  // ---------------------------------------------------------------------------
  const measureLineLength = () => {
    if (!routeRef.current) return;
    const firstNode = stepNodeRefs.current[0];
    const lastNode = stepNodeRefs.current[stepNodeRefs.current.length - 1];
    if (!firstNode || !lastNode) return;

    const rFirst = firstNode.getBoundingClientRect();
    const rLast = lastNode.getBoundingClientRect();
    const rRoute = routeRef.current.getBoundingClientRect();

    if (window.innerWidth <= 860) {
      // Mobile: Vertical distance between node centers
      const firstCenterY = rFirst.top + rFirst.height / 2;
      const lastCenterY = rLast.top + rLast.height / 2;
      const lenY = Math.max(0, lastCenterY - firstCenterY);
      const startOffsetY = firstCenterY - rRoute.top;
      routeRef.current.style.setProperty('--len', `${lenY}px`);
      routeRef.current.style.setProperty('--start-offset', `${startOffsetY}px`);
    } else {
      // Desktop: Horizontal distance between node centers
      const firstCenterX = rFirst.left + rFirst.width / 2;
      const lastCenterX = rLast.left + rLast.width / 2;
      const lenX = Math.max(0, lastCenterX - firstCenterX);
      const startOffsetX = firstCenterX - rRoute.left;
      routeRef.current.style.setProperty('--len', `${lenX}px`);
      routeRef.current.style.setProperty('--start-offset', `${startOffsetX}px`);
    }
  };

  useEffect(() => {
    measureLineLength();
    window.addEventListener('resize', measureLineLength);

    if (typeof document !== 'undefined' && 'fonts' in document) {
      document.fonts.ready.then(measureLineLength);
    }

    return () => window.removeEventListener('resize', measureLineLength);
  }, [isMobile]);

  // ---------------------------------------------------------------------------
  // Scroll Logic: requestAnimationFrame-throttled scroll listener
  // p = clamp((viewportHeight * 0.78 - route.top) / (min(route.height, viewportHeight) * 0.8), 0, 1)
  // ---------------------------------------------------------------------------
  useEffect(() => {
    if (isReducedMotion) {
      if (routeRef.current) {
        routeRef.current.style.setProperty('--p', '1');
      }
      setLitStepIndex(3);
      return;
    }

    let rAFId: number;

    const handleScroll = () => {
      cancelAnimationFrame(rAFId);
      rAFId = requestAnimationFrame(() => {
        if (!routeRef.current) return;
        const rect = routeRef.current.getBoundingClientRect();
        const vh = window.innerHeight;
        const denom = Math.min(rect.height, vh) * 0.8;
        const rawP = (vh * 0.78 - rect.top) / (denom > 0 ? denom : 1);
        const p = Math.max(0, Math.min(1, rawP));

        routeRef.current.style.setProperty('--p', p.toFixed(4));

        // Step lighting: step i lights when p >= i / 3 (step 0 lights once p > 0.02)
        let activeIdx = -1;
        if (p >= 0.98) {
          activeIdx = 3;
        } else if (p >= 2 / 3) {
          activeIdx = 2;
        } else if (p >= 1 / 3) {
          activeIdx = 1;
        } else if (p > 0.02) {
          activeIdx = 0;
        }
        setLitStepIndex(activeIdx);
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(rAFId);
    };
  }, [isReducedMotion]);

  // ---------------------------------------------------------------------------
  // IntersectionObservers (Fires once and disconnects)
  // ---------------------------------------------------------------------------
  useEffect(() => {
    // 1. Route Entrance
    const routeEl = routeRef.current;
    if (routeEl) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsRouteEntered(true);
            observer.disconnect();
          }
        },
        { threshold: 0.15 }
      );
      observer.observe(routeEl);
    }

    // 2. Panel Entrance & Scholarship Count-up
    const panelEl = panelRef.current;
    if (panelEl) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsPanelEntered(true);
            if (!hasAnimatedScholarship.current) {
              hasAnimatedScholarship.current = true;
              if (isReducedMotion) {
                setScholarshipCount(ADMISSIONS_CONFIG.scholarship.stat1Value);
              } else {
                const start = performance.now();
                const duration = 1100;
                const animateCount = (now: number) => {
                  const elapsed = now - start;
                  const progress = Math.min(1, elapsed / duration);
                  const eased = 1 - Math.pow(1 - progress, 3); // cubic ease-out
                  setScholarshipCount(Math.round(eased * ADMISSIONS_CONFIG.scholarship.stat1Value));
                  if (progress < 1) {
                    requestAnimationFrame(animateCount);
                  }
                };
                requestAnimationFrame(animateCount);
              }
            }
            observer.disconnect();
          }
        },
        { threshold: 0.15 }
      );
      observer.observe(panelEl);
    }

    // 3. Meter Entrance
    const meterEl = meterRef.current;
    if (meterEl) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsMeterEntered(true);
            observer.disconnect();
          }
        },
        { threshold: 0.4 }
      );
      observer.observe(meterEl);
    }
  }, [isReducedMotion]);

  // ---------------------------------------------------------------------------
  // Deadline & Meter Computation
  // ---------------------------------------------------------------------------
  const deadlineDate = new Date(ADMISSIONS_CONFIG.calendar.deadlineISO);
  const now = new Date();
  const todayMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  const deadlineMidnight = new Date(
    deadlineDate.getFullYear(),
    deadlineDate.getMonth(),
    deadlineDate.getDate()
  ).getTime();
  const diffDays = Math.round((deadlineMidnight - todayMidnight) / 86400000);

  let countdownText = '';
  if (diffDays < 0) {
    countdownText = 'DEADLINE PASSED';
  } else if (diffDays === 0) {
    countdownText = 'LAST DAY';
  } else if (diffDays === 1) {
    countdownText = '1 DAY LEFT';
  } else {
    countdownText = `${diffDays} DAYS LEFT`;
  }

  // 30 ticks represent the 30-day window leading up to the deadline
  const elapsedTicks = Math.max(0, Math.min(30, 30 - diffDays));

  return (
    <section
      id="admissions"
      className="py-20 lg:py-28 bg-white text-charcoal-900 relative overflow-hidden select-none"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* =====================================================================
            1. HEADER BLOCK: Left-aligned, max width ~560px
            ===================================================================== */}
        <div className="max-w-xl space-y-3">
          
          <SectionBadge>{ADMISSIONS_CONFIG.eyebrow}</SectionBadge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-poppins text-charcoal-900 tracking-tight leading-tight">
            {ADMISSIONS_CONFIG.heading}{' '}
            <span className="text-aimer-600 font-normal italic">
              {ADMISSIONS_CONFIG.headingAccent}
            </span>
          </h2>
          <p className="text-sm sm:text-base text-charcoal-600 font-light leading-relaxed">
            {ADMISSIONS_CONFIG.subtitle}
          </p>
        </div>

        {/* =====================================================================
            2. SCROLL-DRAWN PATHWAY: 4-Column on Desktop, 1-Column on Mobile
            ===================================================================== */}
        <div
          ref={routeRef}
          style={
            {
              '--p': isReducedMotion ? '1' : '0',
              '--len': '0px',
              '--start-offset': '0px',
            } as React.CSSProperties
          }
          className="mt-16 lg:mt-24 relative"
        >
          {/* -----------------------------------------------------------------
              DESKTOP PATHWAY TRACK & TRAVELER (Hidden on desktop as requested)
              ----------------------------------------------------------------- */}
          <div className="hidden pointer-events-none z-0">
            {/* Background Muted Hairline */}
            <div
              style={{
                left: 'var(--start-offset)',
                width: 'var(--len)',
              }}
              className="absolute top-0 h-[1.5px] bg-charcoal-200"
            />

            {/* Primary-Colored Fill Line (scaleX) */}
            <div
              style={{
                left: 'var(--start-offset)',
                width: 'var(--len)',
                transform: 'scaleX(var(--p))',
                transformOrigin: '0% 50%',
                transition: isReducedMotion ? 'none' : 'transform 0.08s linear',
              }}
              className="absolute top-0 h-[2px] bg-aimer-600"
            />

            {/* Traveling Dot (15px with soft halo ring) */}
            <div
              style={{
                left: 'var(--start-offset)',
                transform: 'translate3d(calc(var(--p) * var(--len) - 7.5px), -6.5px, 0)',
                transition: isReducedMotion ? 'none' : 'transform 0.08s linear',
              }}
              className="absolute top-0 w-[15px] h-[15px] rounded-full bg-aimer-600 ring-4 ring-aimer-600/25 z-20"
            />
          </div>

          {/* -----------------------------------------------------------------
              MOBILE PATHWAY TRACK & TRAVELER (Visible <= 860px)
              ----------------------------------------------------------------- */}
          <div className="block min-[861px]:hidden absolute top-0 left-[7px] w-[2px] bottom-0 pointer-events-none z-0">
            {/* Background Muted Vertical Hairline */}
            <div
              style={{
                top: 'var(--start-offset)',
                height: 'var(--len)',
              }}
              className="absolute left-0 w-[1.5px] bg-charcoal-200"
            />

            {/* Primary-Colored Vertical Fill Line (scaleY) */}
            <div
              style={{
                top: 'var(--start-offset)',
                height: 'var(--len)',
                transform: 'scaleY(var(--p))',
                transformOrigin: '50% 0%',
                transition: isReducedMotion ? 'none' : 'transform 0.08s linear',
              }}
              className="absolute left-0 w-[2px] bg-aimer-600"
            />

            {/* Mobile Traveling Dot (15px with halo) */}
            <div
              style={{
                top: 'var(--start-offset)',
                transform: 'translate3d(-6.5px, calc(var(--p) * var(--len) - 7.5px), 0)',
                transition: isReducedMotion ? 'none' : 'transform 0.08s linear',
              }}
              className="absolute left-0 w-[15px] h-[15px] rounded-full bg-aimer-600 ring-4 ring-aimer-600/25 z-20"
            />
          </div>

          {/* -----------------------------------------------------------------
              ORDERED LIST OF 4 STEPS (<ol>)
              ----------------------------------------------------------------- */}
          <ol className="grid grid-cols-1 min-[861px]:grid-cols-4 gap-10 min-[861px]:gap-8 lg:gap-12 relative z-10 list-none p-0 m-0">
            {ADMISSIONS_CONFIG.steps.map((item, idx) => {
              const isLit = litStepIndex >= idx || isReducedMotion;

              return (
                <li
                  key={item.num}
                  style={{
                    opacity: isRouteEntered || isReducedMotion ? 1 : 0,
                    transform:
                      isRouteEntered || isReducedMotion
                        ? 'translateY(0)'
                        : 'translateY(22px)',
                    transition: isReducedMotion
                      ? 'none'
                      : `opacity 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) ${idx * 110}ms, transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) ${idx * 110}ms`,
                  }}
                  className="relative group pl-10 min-[861px]:pl-0"
                >
                  {/* Large Ghost Numeral ("01" to "04") behind step */}
                  <div
                    aria-hidden="true"
                    className={`absolute right-0 top-0 text-6xl min-[861px]:text-7xl lg:text-8xl font-bold font-poppins select-none pointer-events-none transition-all duration-500 ${
                      isLit ? 'ghost-stroke-lit' : 'ghost-stroke-unlit'
                    }`}
                  >
                    {item.num}
                  </div>

                  {/* Node Dot (15px): Sits on horizontal line on desktop, vertical line on mobile */}
                  <div
                    ref={(el) => {
                      stepNodeRefs.current[idx] = el;
                    }}
                    aria-hidden="true"
                    className={`absolute min-[861px]:relative top-1.5 min-[861px]:top-0 left-0 min-[861px]:left-0 w-[15px] h-[15px] rounded-full border-2 transition-all duration-500 z-10 ${
                      isLit
                        ? 'bg-aimer-600 border-aimer-600 scale-105'
                        : 'bg-white border-charcoal-300'
                    }`}
                  />

                  {/* Step Metadata & Typography */}
                  <div className="mt-0 min-[861px]:mt-6 relative z-10 pr-12 min-[861px]:pr-0">
                    <div className="text-[10px] sm:text-xs font-poppins font-semibold tracking-widest uppercase text-aimer-600">
                      {item.step}
                    </div>

                    <h3 className="text-lg sm:text-[22px] font-semibold text-charcoal-900 tracking-tight mt-1.5 transition-colors duration-300 group-hover:text-aimer-800">
                      {item.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-charcoal-600 leading-[1.7] mt-2 font-light max-w-[260px]">
                      {item.description}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        {/* =====================================================================
            3. TWO-COLUMN PANEL: Light Tint Background (#EAF7F6), Square Corners
            ===================================================================== */}
        <div
          ref={panelRef}
          style={{
            opacity: isPanelEntered || isReducedMotion ? 1 : 0,
            transform:
              isPanelEntered || isReducedMotion
                ? 'translateY(0)'
                : 'translateY(18px)',
            transition: isReducedMotion
              ? 'none'
              : 'opacity 0.9s cubic-bezier(0.2, 0.8, 0.2, 1), transform 0.9s cubic-bezier(0.2, 0.8, 0.2, 1)',
          }}
          className="mt-16 lg:mt-24 bg-[#EAF7F6] rounded-none p-6 sm:p-10 lg:p-12"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-stretch divide-y lg:divide-y-0 lg:divide-x divide-aimer-200/80">
            {/* -----------------------------------------------------------------
                PANEL LEFT SIDE: Key Dates & Deadlines Ledger + Live Deadline Meter
                ----------------------------------------------------------------- */}
            <div className="space-y-8 pr-0 lg:pr-10">
              {/* Header */}
              <div>
               
                <SectionBadge>{ADMISSIONS_CONFIG.calendar.eyebrow}</SectionBadge>
                <h3 className="text-2xl sm:text-3xl font-bold font-poppins text-charcoal-900 mt-1.5 tracking-tight">
                  {ADMISSIONS_CONFIG.calendar.heading}
                </h3>
              </div>

              {/* Dotted-Leader Ledger */}
              <div className="space-y-4">
                {/* Row 1: NAAT Slot Booking */}
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 pb-3.5 border-b border-aimer-200/60">
                  <span className="text-xs sm:text-sm text-charcoal-600 font-light shrink-0">
                    NAAT Slot Booking
                  </span>
                  <span className="hidden sm:block flex-1 border-b-[1.5px] border-dotted border-charcoal-300 mx-3 mb-1" />
                  <span className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-charcoal-900 shrink-0">
                    <span className="relative flex h-2 w-2 items-center justify-center">
                      <span className="animate-active-pulse absolute inline-flex h-full w-full rounded-full bg-aimer-500 opacity-75" />
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-aimer-600" />
                    </span>
                    {ADMISSIONS_CONFIG.calendar.naatSlot}
                  </span>
                </div>

                {/* Row 2: Merit Scholarship Deadline */}
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 pb-3.5 border-b border-aimer-200/60">
                  <span className="text-xs sm:text-sm text-charcoal-600 font-light shrink-0">
                    Merit Scholarship Deadline
                  </span>
                  <span className="hidden sm:block flex-1 border-b-[1.5px] border-dotted border-charcoal-300 mx-3 mb-1" />
                  <span className="text-xs sm:text-sm font-bold text-aimer-800 shrink-0">
                    {ADMISSIONS_CONFIG.calendar.deadlineText}
                  </span>
                </div>

                {/* Row 3: Session Orientation */}
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 pb-3.5 border-b border-aimer-200/60">
                  <span className="text-xs sm:text-sm text-charcoal-600 font-light shrink-0">
                    Session Orientation
                  </span>
                  <span className="hidden sm:block flex-1 border-b-[1.5px] border-dotted border-charcoal-300 mx-3 mb-1" />
                  <span className="text-xs sm:text-sm font-semibold text-charcoal-900 shrink-0">
                    {ADMISSIONS_CONFIG.calendar.orientation}
                  </span>
                </div>
              </div>

              {/* Live Deadline Meter */}
              <div ref={meterRef} className="pt-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] sm:text-[11px] font-poppins font-semibold uppercase tracking-wider text-charcoal-600">
                    MERIT SCHOLARSHIP WINDOW
                  </span>
                  <span
                    aria-live="polite"
                    className="text-xs sm:text-sm font-poppins font-bold text-charcoal-900"
                  >
                    {countdownText}
                  </span>
                </div>

                {/* 30 Thin Vertical Ticks */}
                <div
                  aria-hidden="true"
                  className="flex items-end gap-[3px] h-7 mt-3.5 w-full"
                >
                  {Array.from({ length: 30 }).map((_, idx) => {
                    const isElapsed = idx < elapsedTicks;
                    const isToday = idx === elapsedTicks;
                    const isFinal = idx === 29;

                    let heightClass = 'h-3'; // 12px
                    let colorClass = 'bg-[#C3E6E6]'; // Pale tint for future

                    if (isToday) {
                      heightClass = 'h-7'; // 28px
                      colorClass = 'bg-charcoal-900';
                    } else if (isFinal) {
                      heightClass = 'h-5'; // 20px
                      colorClass = 'bg-aimer-800';
                    } else if (isElapsed) {
                      heightClass = 'h-3'; // 12px
                      colorClass = 'bg-aimer-600';
                    }

                    return (
                      <div
                        key={idx}
                        style={{
                          transformOrigin: 'bottom',
                          transform: isMeterEntered || isReducedMotion ? 'scaleY(1)' : 'scaleY(0.3)',
                          opacity: isMeterEntered || isReducedMotion ? 1 : 0,
                          transition: isReducedMotion
                            ? 'none'
                            : `transform 0.4s ease-out ${idx * 18}ms, opacity 0.4s ease-out ${idx * 18}ms`,
                        }}
                        className={`flex-1 rounded-[1px] ${heightClass} ${colorClass}`}
                      />
                    );
                  })}
                </div>
              </div>
            </div>

            {/* -----------------------------------------------------------------
                PANEL RIGHT SIDE: Financial Flexibility + Scholarships + EMI
                ----------------------------------------------------------------- */}
            <div className="pt-8 lg:pt-0 pl-0 lg:pl-10 flex flex-col justify-between space-y-6">
              <div>
                
                <SectionBadge>{ADMISSIONS_CONFIG.scholarship.eyebrow}</SectionBadge>
                <h3 className="text-2xl sm:text-3xl font-bold font-poppins text-charcoal-900 mt-1.5 tracking-tight">
                  {ADMISSIONS_CONFIG.scholarship.heading}
                </h3>

                {/* Two Big Stats Side-by-Side */}
                <div className="grid grid-cols-2 gap-6 mt-8 pt-4 border-t border-aimer-200/80">
                  <div>
                    <div className="text-4xl sm:text-5xl lg:text-6xl font-bold font-poppins text-aimer-800 tracking-tight leading-none">
                      {isReducedMotion ? '100%' : `${scholarshipCount}%`}
                    </div>
                    <div className="text-[10px] sm:text-xs font-poppins font-semibold uppercase tracking-wider text-charcoal-500 mt-2">
                      {ADMISSIONS_CONFIG.scholarship.stat1Label}
                    </div>
                  </div>

                  <div>
                    <div className="text-4xl sm:text-5xl lg:text-6xl font-bold font-poppins text-aimer-800 tracking-tight leading-none">
                      {ADMISSIONS_CONFIG.scholarship.stat2Value}
                    </div>
                    <div className="text-[10px] sm:text-xs font-poppins font-semibold uppercase tracking-wider text-charcoal-500 mt-2">
                      {ADMISSIONS_CONFIG.scholarship.stat2Label}
                    </div>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-charcoal-600 leading-relaxed font-light max-w-[460px] mt-6">
                  {ADMISSIONS_CONFIG.scholarship.paragraph}
                </p>
              </div>

              {/* Primary Pill Button CTA */}
              <div className="pt-2">
                <Link
                  href={ADMISSIONS_CONFIG.scholarship.ctaLink}
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-aimer-600 hover:bg-aimer-700 text-white text-xs sm:text-sm font-semibold uppercase tracking-wider shadow-sm transition-all duration-300 group cursor-pointer"
                >
                  <span>{ADMISSIONS_CONFIG.scholarship.ctaText}</span>
                  <span className="inline-block transition-transform duration-300 group-hover:translate-x-1.5">
                    →
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =======================================================================
          SCOPED STYLES: Ghost Numeral Outline Strokes & Pulse Keyframe
          ======================================================================= */}
      <style jsx>{`
        .ghost-stroke-unlit {
          -webkit-text-stroke: 1.5px rgba(23, 27, 29, 0.14);
          color: transparent;
        }
        .ghost-stroke-lit {
          -webkit-text-stroke: 1.5px rgba(22, 140, 155, 0.45);
          color: transparent;
        }
        @keyframes activePulse {
          0% {
            transform: scale(1);
            opacity: 0.9;
          }
          100% {
            transform: scale(2.8);
            opacity: 0;
          }
        }
        .animate-active-pulse {
          animation: activePulse 2s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
      `}</style>
    </section>
  );
};

export default AdmissionsSection;
