'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { SectionBadge } from '@/components/ui/SectionBadge';
import { StudentOutcome } from '@/types';

interface OutcomesSectionProps {
  outcomes: StudentOutcome[];
}

type OutcomeFilter = 'all' | 'placement' | 'internship' | 'venture';

export const OutcomesSection: React.FC<OutcomesSectionProps> = ({ outcomes }) => {
  const [activeFilter, setActiveFilter] = useState<OutcomeFilter>('all');
  const [posterWidth, setPosterWidth] = useState(280);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  // Filter items
  const filtered = useMemo(() => {
    if (activeFilter === 'all') return outcomes;
    return outcomes.filter((o) => o.type === activeFilter);
  }, [outcomes, activeFilter]);

  // Counts for each tab
  const counts = useMemo(() => {
    return {
      all: outcomes.length,
      placement: outcomes.filter((o) => o.type === 'placement').length,
      internship: outcomes.filter((o) => o.type === 'internship').length,
      venture: outcomes.filter((o) => o.type === 'venture').length,
    };
  }, [outcomes]);

  // Continuous motion state: pos (float) & target (integer)
  const [pos, setPos] = useState(0);
  const [target, setTarget] = useState(0);
  const posRef = useRef(0);
  const targetRef = useRef(0);
  const animationFrameRef = useRef<number | null>(null);

  // Deck refs & drag tracking
  const deckRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartPosRef = useRef(0);
  const dragLastXRef = useRef(0);
  const dragLastTimeRef = useRef(0);
  const dragVelocityRef = useRef(0);
  const hasDraggedFarRef = useRef(false);

  // Autoplay & user interaction timers
  const lastInteractionTimeRef = useRef<number>(Date.now());
  const isHoveredRef = useRef(false);
  const wheelThrottleTimerRef = useRef<number | null>(null);

  // Keep refs in sync
  posRef.current = pos;
  targetRef.current = target;

  // Reduced motion detection
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const media = window.matchMedia('(prefers-reduced-motion: reduce)');
      setIsReducedMotion(media.matches);
      const listener = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
      media.addEventListener('change', listener);
      return () => media.removeEventListener('change', listener);
    }
  }, []);

  // Responsive measure of poster width: clamp(240px, 25vw, 320px) on desktop, 68vw on mobile (<860px)
  const updatePosterDimensions = useCallback(() => {
    if (typeof window === 'undefined') return;
    const w = window.innerWidth;
    let computedWidth: number;
    if (w < 860) {
      computedWidth = Math.round(Math.min(290, Math.max(220, w * 0.68)));
    } else {
      computedWidth = Math.round(Math.min(320, Math.max(240, w * 0.25)));
    }
    setPosterWidth(computedWidth);
  }, []);

  useEffect(() => {
    updatePosterDimensions();
    window.addEventListener('resize', updatePosterDimensions);
    if (document.fonts?.ready) {
      document.fonts.ready.then(updatePosterDimensions);
    }
    return () => window.removeEventListener('resize', updatePosterDimensions);
  }, [updatePosterDimensions]);

  const step = posterWidth * 1.05;

  // Main animation loop: eases pos toward target
  const startAnimationLoop = useCallback(() => {
    if (animationFrameRef.current) return;

    const animate = () => {
      const currentPos = posRef.current;
      const currentTarget = targetRef.current;
      const diff = currentTarget - currentPos;

      if (isReducedMotion) {
        setPos(currentTarget);
        posRef.current = currentTarget;
        animationFrameRef.current = null;
        return;
      }

      // Snappy, brisk easing (14% per frame) for responsive sliding
      if (Math.abs(diff) > 0.001 || isDraggingRef.current) {
        const nextPos = isDraggingRef.current
          ? currentPos
          : currentPos + diff * 0.14;

        setPos(nextPos);
        posRef.current = nextPos;
        animationFrameRef.current = requestAnimationFrame(animate);
      } else {
        setPos(currentTarget);
        posRef.current = currentTarget;
        animationFrameRef.current = null;
      }
    };

    animationFrameRef.current = requestAnimationFrame(animate);
  }, [isReducedMotion]);

  // Jump to specific slide
  const goTo = useCallback((newTarget: number, isUserInteraction = true) => {
    const total = filtered.length;
    if (total === 0) return;
    const clamped = Math.max(0, Math.min(total - 1, newTarget));
    setTarget(clamped);
    targetRef.current = clamped;
    if (isUserInteraction) {
      lastInteractionTimeRef.current = Date.now();
    }
    startAnimationLoop();
  }, [filtered.length, startAnimationLoop]);

  // Switch filter: reset to 0, smoothly glide in from right
  const handleFilterChange = (filter: OutcomeFilter) => {
    setActiveFilter(filter);
    const newItems = filter === 'all'
      ? outcomes
      : outcomes.filter((o) => o.type === filter);
    
    const count = newItems.length;
    if (count > 0) {
      // Start pos slightly to right so slides glide in
      const initialPos = isReducedMotion ? 0 : Math.min(2.5, count - 1);
      setPos(initialPos);
      posRef.current = initialPos;
      setTarget(0);
      targetRef.current = 0;
      lastInteractionTimeRef.current = Date.now();
      startAnimationLoop();
    }
  };

  // Autoplay timer: 1s interval (1000ms per slide), pauses when hovered/dragging or recently interacted
  useEffect(() => {
    if (isReducedMotion) return;
    const interval = setInterval(() => {
      const timeSinceInteraction = Date.now() - lastInteractionTimeRef.current;
      if (
        !isHoveredRef.current &&
        !isDraggingRef.current &&
        timeSinceInteraction >= 950 &&
        filtered.length > 1
      ) {
        const next = (targetRef.current + 1) % filtered.length;
        goTo(next, false);
      }
    }, 1500);

    return () => clearInterval(interval);
  }, [filtered.length, goTo, isReducedMotion]);

  // Pointer drag events on the deck
  const handlePointerDown = (e: React.PointerEvent) => {
    if (e.button !== 0) return; // primary button only
    if (e.pointerType === 'touch') {
      isHoveredRef.current = false;
    }
    isDraggingRef.current = true;
    dragStartXRef.current = e.clientX;
    dragStartPosRef.current = posRef.current;
    dragLastXRef.current = e.clientX;
    dragLastTimeRef.current = Date.now();
    dragVelocityRef.current = 0;
    hasDraggedFarRef.current = false;
    lastInteractionTimeRef.current = Date.now();

    const targetEl = e.currentTarget as HTMLElement;
    targetEl.setPointerCapture(e.pointerId);
    startAnimationLoop();
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    const now = Date.now();
    const dx = e.clientX - dragStartXRef.current;

    if (Math.abs(dx) > 6) {
      hasDraggedFarRef.current = true;
    }

    const dt = Math.max(1, now - dragLastTimeRef.current);
    const stepDx = e.clientX - dragLastXRef.current;
    dragVelocityRef.current = stepDx / dt;
    dragLastXRef.current = e.clientX;
    dragLastTimeRef.current = now;

    // Direct positioning during drag with resistance at bounds
    const total = filtered.length;
    let nextPos = dragStartPosRef.current - dx / step;
    if (nextPos < 0) nextPos = nextPos * 0.35;
    else if (nextPos > total - 1) nextPos = (total - 1) + (nextPos - (total - 1)) * 0.35;

    posRef.current = nextPos;
    setPos(nextPos);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (e.pointerType === 'touch') {
      isHoveredRef.current = false;
    }
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    lastInteractionTimeRef.current = Date.now();

    try {
      const targetEl = e.currentTarget as HTMLElement;
      targetEl.releasePointerCapture(e.pointerId);
    } catch {
      // ignore
    }

    const total = filtered.length;
    const v = dragVelocityRef.current;
    // Add momentum to target
    const momentumOffset = (v * 200) / step;
    let newTarget = Math.round(posRef.current - momentumOffset);
    newTarget = Math.max(0, Math.min(total - 1, newTarget));

    setTarget(newTarget);
    targetRef.current = newTarget;
    startAnimationLoop();
  };

  // Keyboard navigation on deck
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      goTo(targetRef.current - 1);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      goTo(targetRef.current + 1);
    }
  };

  // Trackpad horizontal wheel
  const handleWheel = (e: React.WheelEvent) => {
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY) && Math.abs(e.deltaX) > 18) {
      e.preventDefault();
      if (!wheelThrottleTimerRef.current) {
        if (e.deltaX > 0) goTo(targetRef.current + 1);
        else goTo(targetRef.current - 1);

        wheelThrottleTimerRef.current = window.setTimeout(() => {
          wheelThrottleTimerRef.current = null;
        }, 240);
      }
    }
  };

  // Scrubber drag / click
  const scrubberRef = useRef<HTMLDivElement>(null);
  const handleScrubberPointer = (e: React.PointerEvent) => {
    if (!scrubberRef.current || filtered.length <= 1) return;
    const rect = scrubberRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(rect.width, e.clientX - rect.left));
    const ratio = x / rect.width;
    const newTarget = Math.round(ratio * (filtered.length - 1));
    goTo(newTarget);
  };

  // Active student calculation
  const activeIndex = Math.max(0, Math.min(filtered.length - 1, target));
  const activeStudent = filtered[activeIndex] || filtered[0];

  // Outcome label mapping
  const getOutcomeLabel = (type: string) => {
    switch (type) {
      case 'placement':
        return 'Career Placement';
      case 'internship':
        return 'Corporate Internship';
      case 'venture':
        return 'Student Startup';
      default:
        return 'Student Outcome';
    }
  };

  return (
    <section id="outcomes" className="py-14 sm:py-18 bg-[#fafbfc] border-b border-charcoal-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* =========================================================================
            HEADER STRIP (Keeps existing eyebrow, heading, and metric strip)
            ========================================================================= */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-charcoal-200">
          <div className="space-y-2 max-w-2xl">
            <SectionBadge variant="teal">Verified Outcomes</SectionBadge>
            <h2 className="text-3xl sm:text-3xl lg:text-5xl font-bold tracking-tight text-charcoal-900 leading-tight font-poppins">
              Beyond Classrooms.{' '}
              <span className="text-aimer-600 block sm:inline font-normal italic">
                Into Careers.
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-charcoal-600 font-light leading-relaxed">
              Real candidates, real corporate assignments, and active campus startups. Every outcome is a testament to experiential learning.
            </p>
          </div>

          {/* Metric Highlights Strip */}
          <div className="flex items-center gap-6 shrink-0">
            <div>
              <div className="text-xl sm:text-2xl font-bold text-aimer-700 font-poppins">₹14.5 LPA</div>
              <div className="text-[10px] uppercase tracking-wider text-charcoal-500 font-semibold mt-0.5">Peak Package</div>
            </div>
            <div className="w-px h-8 bg-charcoal-200" />
            <div>
              <div className="text-xl sm:text-2xl font-bold text-aimer-700 font-poppins">₹50,000</div>
              <div className="text-[10px] uppercase tracking-wider text-charcoal-500 font-semibold mt-0.5">Peak Mo. Stipend</div>
            </div>
            <div className="w-px h-8 bg-charcoal-200" />
            <div>
              <div className="text-xl sm:text-2xl font-bold text-aimer-700 font-poppins">12+</div>
              <div className="text-[10px] uppercase tracking-wider text-charcoal-500 font-semibold mt-0.5">Startups Built</div>
            </div>
          </div>
        </div>

        {/* =========================================================================
            PLAIN TEXT FILTER TABS
            - Plain text, no pills, no background boxes
            - Active tab has a thin primary underline
            - Scrolls horizontally on mobile
            ========================================================================= */}
        <div
          role="tablist"
          aria-label="Outcome Filter Tabs"
          className="pt-5 pb-3 flex items-center gap-6 sm:gap-8 overflow-x-auto whitespace-nowrap no-scrollbar border-b border-charcoal-200/60"
        >
          {[
            { id: 'all' as OutcomeFilter, label: 'All Outcomes', count: counts.all },
            { id: 'placement' as OutcomeFilter, label: 'Career Placements', count: counts.placement },
            { id: 'internship' as OutcomeFilter, label: 'Corporate Internships', count: counts.internship },
            { id: 'venture' as OutcomeFilter, label: 'Student Startups', count: counts.venture },
          ].map((tab) => {
            const isActive = activeFilter === tab.id;
            return (
              <button
                key={tab.id}
                role="tab"
                id={`tab-${tab.id}`}
                aria-selected={isActive}
                onClick={() => handleFilterChange(tab.id)}
                className={`group pb-2 text-xs sm:text-sm font-medium tracking-wide transition-colors relative flex items-center gap-2 focus:outline-none cursor-pointer ${
                  isActive ? 'text-charcoal-900 font-semibold' : 'text-charcoal-500 hover:text-charcoal-800'
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`text-[11px] font-poppins transition-colors ${
                    isActive ? 'text-aimer-600 font-bold' : 'text-charcoal-400 group-hover:text-charcoal-600'
                  }`}
                >
                  ({tab.count})
                </span>

                {/* Thin active underline in primary color */}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-aimer-600" />
                )}
              </button>
            );
          })}
        </div>

      </div>

      {/* =========================================================================
          FOCUS DECK (Full-bleed stage with 1:1 square posters shown in full)
          - Artwork shown 100% in full, never cropped awkwardly
          - Centered horizontally and vertically using calc(-50% + dx), -50%
          - Active poster centered & largest with 12px offset frame behind
          - Neighbors smaller and more transparent
          - Left & right edges fade out with smooth mask
          ========================================================================= */}
      <div
        className="mt-4 sm:mt-6 relative w-full overflow-hidden select-none"
        onMouseEnter={() => { isHoveredRef.current = true; }}
        onMouseLeave={() => { isHoveredRef.current = false; }}
      >
        {/* Full-bleed stage container with gradient masks */}
        <div
          ref={deckRef}
          tabIndex={0}
          role="region"
          aria-label="Student Outcome Focus Deck"
          onKeyDown={handleKeyDown}
          onWheel={handleWheel}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          style={{
            touchAction: 'pan-y',
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)',
            maskImage: 'linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)',
          }}
          className="relative w-full h-[360px] sm:h-[400px] lg:h-[430px] flex items-center justify-center focus:outline-none focus:ring-1 focus:ring-aimer-500/50 cursor-grab active:cursor-grabbing"
        >
          {filtered.map((item, index) => {
            const d = index - pos;
            const ad = Math.abs(d);

            // Scale & Opacity equations per specification
            const s = 1 - 0.16 * Math.min(ad, 1) - 0.04 * Math.max(0, Math.min(ad, 3) - 1);
            const opacity = Math.max(0.1, Math.min(1, 1 - 0.3 * Math.min(ad, 3)));
            const isVisible = ad <= 4.5;
            const zIndex = Math.round(50 - ad * 10);
            const offsetFrameOpacity = Math.max(0, 1 - Math.min(ad, 1));

            return (
              <div
                key={item.id}
                onClick={() => {
                  if (!hasDraggedFarRef.current && index !== target) {
                    goTo(index);
                  }
                }}
                style={{
                  position: 'absolute',
                  left: '50%',
                  top: '50%',
                  width: `${posterWidth}px`,
                  visibility: isVisible ? 'visible' : 'hidden',
                  zIndex,
                  transform: `translate3d(calc(-50% + ${d * step}px), -50%, 0) scale(${s})`,
                  opacity,
                  willChange: 'transform, opacity',
                  transition: isReducedMotion ? 'none' : undefined,
                }}
                className="shrink-0 cursor-pointer"
              >
                {/* 12px Offset Outline Frame in Primary Color (Active slide only) */}
                <div
                  aria-hidden="true"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    transform: 'translate(12px, 12px)',
                    border: '2px solid #168C9B',
                    opacity: offsetFrameOpacity,
                    zIndex: 0,
                    pointerEvents: 'none',
                    transition: 'opacity 0.2s linear',
                  }}
                />

                {/* Poster Artwork: 1:1 Aspect ratio, shown in full, never cropped awkwardly */}
                <div className="relative z-10 w-full aspect-square bg-white border border-charcoal-200 overflow-hidden shadow-xs">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={`${item.name} - ${getOutcomeLabel(item.type)}`}
                      className="w-full h-full object-contain select-none pointer-events-none block bg-white"
                      loading={ad <= 2 ? 'eager' : 'lazy'}
                      onError={(e) => {
                        const targetImg = e.target as HTMLImageElement;
                        targetImg.style.display = 'none';
                        if (targetImg.nextElementSibling) {
                          (targetImg.nextElementSibling as HTMLElement).style.display = 'flex';
                        }
                      }}
                    />
                  ) : null}

                  {/* Fallback poster canvas if image fails */}
                  <div
                    style={{ display: item.image ? 'none' : 'flex' }}
                    className="w-full h-full flex-col justify-between p-5 bg-gradient-to-b from-charcoal-50 to-charcoal-100 text-charcoal-800"
                  >
                    <div className="text-[10px] font-poppins uppercase tracking-widest text-aimer-600 font-semibold">
                      AIMER Success Poster
                    </div>
                    <div>
                      <div className="text-3xl font-bold font-poppins text-aimer-800">
                        {item.initials}
                      </div>
                      <div className="text-base font-semibold text-charcoal-900 mt-2">
                        {item.name}
                      </div>
                      <div className="text-xs text-charcoal-500 mt-0.5">
                        {item.role}
                      </div>
                    </div>
                    <div className="text-[10px] font-semibold uppercase tracking-wider text-charcoal-400">
                      {getOutcomeLabel(item.type)}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* =========================================================================
          INFO ROW UNDER THE DECK (Separated by thin hairline)
          - Left: Large counter (e.g. "04 / 16")
          - Center: Centered student details (Outcome -> Name -> Position)
          - Right: Square arrow buttons (← →)
          ========================================================================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
        <div className="pt-4 border-t border-charcoal-200 flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6">
          
          {/* Left: Large Counter */}
          {/* <div className="w-full md:w-36 flex items-center justify-start order-2 md:order-1">
            <span className="text-lg sm:text-xl font-poppins font-medium text-charcoal-900 tracking-tight">
              {String(activeIndex + 1).padStart(2, '0')}{' '}
              <span className="text-charcoal-400 font-light">/</span>{' '}
              {String(filtered.length).padStart(2, '0')}
            </span>
          </div> */}

          {/* Center: Student Details (Aria-live region, animated on target change) */}
          <div
            aria-live="polite"
            className="flex-1 text-center min-h-[82px] flex flex-col justify-center order-1 md:order-2"
          >
            {activeStudent && (
              <div key={activeStudent.id} className="space-y-0.5">
                {/* 1. Outcome Type (Small uppercase letter-spaced text in primary color) */}
                <div className="text-xs font-semibold tracking-widest text-aimer-600 uppercase font-poppins animate-outcome-line-1">
                  {getOutcomeLabel(activeStudent.type)}
                </div>

                {/* 2. Student Name (Large medium-weight heading) */}
                <h3 className="text-xl sm:text-2xl font-medium text-charcoal-900 tracking-tight font-poppins animate-outcome-line-2">
                  {activeStudent.name}
                </h3>

                {/* 3. Student Position (Muted text beneath) */}
                <div className="text-xs sm:text-sm text-charcoal-500 font-normal animate-outcome-line-3">
                  {activeStudent.role}
                </div>
              </div>
            )}
          </div>

          {/* Right: Two Square Arrow Buttons */}
          <div className="w-full md:w-36 flex items-center justify-end gap-2 order-3">
            <button
              type="button"
              onClick={() => goTo(target - 1)}
              disabled={target <= 0}
              aria-label="Previous student"
              className={`w-10 h-10 border border-charcoal-200 flex items-center justify-center text-charcoal-800 transition-colors bg-white focus:outline-none cursor-pointer ${
                target <= 0
                  ? 'opacity-30 cursor-not-allowed'
                  : 'hover:border-aimer-600 hover:text-aimer-600 active:bg-charcoal-50'
              }`}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              type="button"
              onClick={() => goTo(target + 1)}
              disabled={target >= filtered.length - 1}
              aria-label="Next student"
              className={`w-10 h-10 border border-charcoal-200 flex items-center justify-center text-charcoal-800 transition-colors bg-white focus:outline-none cursor-pointer ${
                target >= filtered.length - 1
                  ? 'opacity-30 cursor-not-allowed'
                  : 'hover:border-aimer-600 hover:text-aimer-600 active:bg-charcoal-50'
              }`}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

        </div>

        {/* =========================================================================
            SCRUBBER (Thin vertical ticks with dock-like magnification effect)
            ========================================================================= */}
        <div className="mt-5 max-w-md mx-auto w-full px-2">
          <div
            ref={scrubberRef}
            role="slider"
            aria-label="Student scrubber"
            aria-valuemin={1}
            aria-valuemax={filtered.length}
            aria-valuenow={activeIndex + 1}
            tabIndex={0}
            onPointerDown={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.setPointerCapture(e.pointerId);
              handleScrubberPointer(e);
            }}
            onPointerMove={(e) => {
              if (e.buttons > 0) handleScrubberPointer(e);
            }}
            onPointerUp={(e) => {
              try {
                const el = e.currentTarget as HTMLElement;
                el.releasePointerCapture(e.pointerId);
              } catch {
                // ignore
              }
            }}
            className="h-8 flex items-center justify-between cursor-pointer focus:outline-none select-none px-1"
          >
            {filtered.map((_, i) => {
              const dist = Math.abs(i - pos);
              // Dock magnification: height grows from 5px to 24px over 3 ticks
              const tickHeight = 5 + Math.max(0, 19 * (1 - dist / 3));
              const isClosest = dist < 0.5;

              return (
                <span
                  key={i}
                  style={{
                    height: `${tickHeight}px`,
                    width: '1.5px',
                    backgroundColor: isClosest ? '#168C9B' : '#CBD5E1',
                    transition: isReducedMotion ? 'none' : 'height 0.15s ease-out, background-color 0.15s ease-out',
                  }}
                  className="block shrink-0"
                />
              );
            })}
          </div>

          {/* Caption under Scrubber */}
          {/* <div className="text-[10px] uppercase font-poppins tracking-widest text-charcoal-400 text-center select-none mt-1 font-medium">
            DRAG · SWIPE · ← →
          </div> */}
        </div>

      </div>

      {/* Scoped CSS animations for the 3 staggered text lines */}
      <style jsx>{`
        @keyframes outcomeSlideUp {
          0% {
            opacity: 0;
            transform: translateY(8px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-outcome-line-1 {
          animation: outcomeSlideUp 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-outcome-line-2 {
          animation: outcomeSlideUp 0.35s cubic-bezier(0.16, 1, 0.3, 1) 0.05s forwards;
        }
        .animate-outcome-line-3 {
          animation: outcomeSlideUp 0.35s cubic-bezier(0.16, 1, 0.3, 1) 0.1s forwards;
        }
      `}</style>
    </section>
  );
};

export default OutcomesSection;
