'use client';

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import Image from 'next/image';
import { InstitutionalStat } from '@/types';
import SectionBadge from '../ui/SectionBadge';

interface PillarItem {
  id: string;
  index: string;
  title: string;
  description: string;
  keywords: string;
  image: string;
  alt: string;
}

export const PILLARS_DATA: PillarItem[] = [
  {
    id: 'agency',
    index: '01',
    title: 'High Agency & Full Ownership',
    description:
      'Students are conditioned as operators, not passive observers. You take ownership of client deliverables, financial forecasts, and measurable enterprise KPIs.',
    keywords: 'Client deliverables · Financial forecasts · Enterprise KPIs',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80',
    alt: 'AIMER students leading an executive business strategy meeting',
  },
  {
    id: 'practicum',
    index: '02',
    title: '75% Practicum Pedagogy',
    description:
      'Lectures take a back seat. Live business labs, financial modeling sprints, and product teardowns dominate your weekly schedule from semester one.',
    keywords: 'Live business labs · Modeling sprints · Product teardowns',
    image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80',
    alt: 'Students analyzing real-time financial models in an enterprise business lab',
  },
  {
    id: 'residency',
    index: '03',
    title: 'Embedded Corporate Residencies',
    description:
      'Up to 12 months spent on-site with corporate partners across India, working alongside leadership teams and drawing paid monthly stipends.',
    keywords: 'Up to 12 months · On-site · Paid monthly stipends',
    image: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80',
    alt: 'Corporate resident working on-site inside a partner enterprise office',
  },
  {
    id: 'corridors',
    index: '04',
    title: 'Cross-Border Trade Corridors',
    description:
      'Guaranteed international immersion to Dubai (DIFC & Dubai Future Foundation) and Singapore trade networks to cultivate global commercial acumen.',
    keywords: 'DIFC · Dubai Future Foundation · Singapore',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80',
    alt: 'Dubai international financial center and global trade corridor',
  },
];

interface PositioningProps {
  stats?: InstitutionalStat[];
}

export const Positioning: React.FC<PositioningProps> = () => {
  // ---------------------------------------------------------------------------
  // 1. Accessibility: prefers-reduced-motion
  // ---------------------------------------------------------------------------
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    if (typeof window !== 'undefined') {
      const media = window.matchMedia('(prefers-reduced-motion: reduce)');
      setIsReducedMotion(media.matches);
      const listener = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
      media.addEventListener('change', listener);
      return () => media.removeEventListener('change', listener);
    }
  }, []);

  // ---------------------------------------------------------------------------
  // 2. Scroll-Fill Statement Computation
  // ---------------------------------------------------------------------------
  const statementRef = useRef<HTMLDivElement | null>(null);

  // Sentence 1 split: "Most business schools" + "teach history."
  const s1Prefix = useMemo(() => ['Most', 'business', 'schools'], []);
  const s1StrikeWords = useMemo(() => ['teach', 'history.'], []);

  // Sentence 2 split: "We operate the future."
  const s2Words = useMemo(() => ['We', 'operate', 'the', 'future.'], []);

  // Paragraph words
  const pWords = useMemo(
    () => [
      'At', 'AIMER', 'Business', 'School,', 'industry-led', 'education', 'breaks', 'free', 'from',
      'traditional', 'classroom', 'inertia.', 'Our', 'curriculum', 'integrates', 'university',
      'degree', 'frameworks', 'with', 'rigorous', 'corporate', 'residencies,', 'active', 'venture',
      'incubation,', 'and', 'direct', 'executive', 'mentorship—equipping', 'students', 'with',
      'high', 'agency,', 'commercial', 'literacy,', 'and', 'cross-border', 'vision.',
    ],
    []
  );

  const [s1Count, setS1Count] = useState(0);
  const [s1Strikethrough, setS1Strikethrough] = useState(false);
  const [s2Count, setS2Count] = useState(0);
  const [paragraphCount, setParagraphCount] = useState(0);

  const stateKeyRef = useRef('0-false-0-0');

  useEffect(() => {
    if (isReducedMotion) {
      setS1Count(5);
      setS1Strikethrough(true);
      setS2Count(4);
      setParagraphCount(pWords.length);
      return;
    }

    let rafId: number | null = null;

    const handleScroll = () => {
      if (rafId !== null) return;

      rafId = requestAnimationFrame(() => {
        rafId = null;
        const el = statementRef.current;
        if (!el) return;

        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight || 800;

        // Skip computation if far outside viewport
        if (rect.bottom < -100 || rect.top > vh * 1.5) return;

        // p = clamp((viewportHeight * 0.88 - head.top) / (viewportHeight * 0.55), 0, 1)
        const rawP = (vh * 0.88 - rect.top) / (vh * 0.55);
        const p = Math.max(0, Math.min(1, rawP));

        // 1) Sentence 1: words turn to main text color over p from 0 to 0.4 (total 5 words)
        const s1TotalWords = 5;
        const s1Progress = Math.max(0, Math.min(1, p / 0.4));
        const computedS1Count = Math.floor(s1Progress * s1TotalWords);

        // Strike through "teach history." when p reaches ~0.42
        const computedStrike = p >= 0.42;

        // 2) Sentence 2: words turn to primary color over p from 0.46 to 0.76 (total 4 words)
        const s2Progress = Math.max(0, Math.min(1, (p - 0.46) / (0.76 - 0.46)));
        const computedS2Count = Math.floor(s2Progress * s2Words.length);

        // 3) Paragraph: words turn to dark body color over p from 0.06 to 0.88 (total 37 words)
        const pProgress = Math.max(0, Math.min(1, (p - 0.06) / (0.88 - 0.06)));
        const computedPCount = Math.floor(pProgress * pWords.length);

        const newKey = `${computedS1Count}-${computedStrike}-${computedS2Count}-${computedPCount}`;
        if (newKey !== stateKeyRef.current) {
          stateKeyRef.current = newKey;
          setS1Count(computedS1Count);
          setS1Strikethrough(computedStrike);
          setS2Count(computedS2Count);
          setParagraphCount(computedPCount);
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [isReducedMotion, s2Words.length, pWords.length]);

  // ---------------------------------------------------------------------------
  // 3. Pillars State & Auto-Advance with Pause
  // ---------------------------------------------------------------------------
  const [activePillar, setActivePillar] = useState(0);
  const [isPillarHovered, setIsPillarHovered] = useState(false);
  const [isPillarsInView, setIsPillarsInView] = useState(true);
  const pillarsSectionRef = useRef<HTMLDivElement | null>(null);

  // IntersectionObserver for pillars section
  useEffect(() => {
    const el = pillarsSectionRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsPillarsInView(entry.isIntersecting);
      },
      { threshold: 0.35 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Keyboard navigation on active pillar
  const handlePillarKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setActivePillar(index);
    } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      setActivePillar((prev) => (prev + 1) % PILLARS_DATA.length);
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      setActivePillar((prev) => (prev - 1 + PILLARS_DATA.length) % PILLARS_DATA.length);
    }
  };

  const handlePillarPointerEnter = (index: number) => {
    if (typeof window !== 'undefined') {
      const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
      if (canHover) {
        setActivePillar(index);
      }
    }
  };

  // ---------------------------------------------------------------------------
  // 4. Entrance Animations & Campus Band Count-Up
  // ---------------------------------------------------------------------------
  const labelRowRef = useRef<HTMLDivElement | null>(null);
  const [labelRowVisible, setLabelRowVisible] = useState(false);

  const campusBandRef = useRef<HTMLDivElement | null>(null);
  const [campusBandVisible, setCampusBandVisible] = useState(false);
  const [campusCount, setCampusCount] = useState(0);

  // Entrance observer for Label Row
  useEffect(() => {
    const el = labelRowRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setLabelRowVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLabelRowVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Entrance observer & count-up for Campus Band
  useEffect(() => {
    const el = campusBandRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setCampusBandVisible(true);
      setCampusCount(125);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCampusBandVisible(true);
          observer.disconnect();

          if (isReducedMotion) {
            setCampusCount(125);
            return;
          }

          // Ease-out quartic count-up from 0 to 125 over 1.5s
          const duration = 1500;
          const start = performance.now();
          const step = (now: number) => {
            const elapsed = Math.min(duration, now - start);
            const progress = elapsed / duration;
            // Ease-out quartic: 1 - (1 - t)^4
            const easeOutQuartic = 1 - Math.pow(1 - progress, 4);
            const currentVal = Math.round(easeOutQuartic * 125);
            setCampusCount(currentVal);

            if (elapsed < duration) {
              requestAnimationFrame(step);
            } else {
              setCampusCount(125);
            }
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [isReducedMotion]);

  // Is progress paused?
  const isProgressPaused = isPillarHovered || !isPillarsInView || isReducedMotion;

  return (
    <section className="py-20 lg:py-28 bg-[#FFFFFF] border-y border-charcoal-200 relative overflow-hidden font-poppins selection:bg-aimer-500 selection:text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* =========================================================================
            1. EYEBROW
            ========================================================================= */}
        <div className="flex items-center gap-3 mb-6">
          {/* <span
            aria-hidden="true"
            className="inline-block w-7 h-px bg-aimer-700 origin-left transition-transform duration-700 ease-out"
            style={{ transform: isMounted ? 'scaleX(1)' : 'scaleX(0)' }}
          /> */}
          {/* <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.16em] text-aimer-700">
            Educational Philosophy
          </span> */}
          <SectionBadge>Educational Philosophy</SectionBadge>
        </div>

        {/* =========================================================================
            2. STATEMENT ROW (Two-Column Desktop, Scroll-Driven Word Reveal)
            ========================================================================= */}
        <div
          ref={statementRef}
          className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-8 lg:gap-[72px] items-start"
        >
          {/* Left Column: Heading */}
          <div>
            <h2
              className="font-semibold text-charcoal-900 leading-[1.06] tracking-[-2.2px]"
              style={{ fontSize: 'clamp(34px, 4.9vw, 48px)' }}
            >
              {/* Sentence 1: "Most business schools teach history." */}
              <span>
                {s1Prefix.map((word, i) => {
                  const isFilled = isReducedMotion || i < s1Count;
                  return (
                    <span
                      key={i}
                      className="inline-block transition-colors duration-500 mr-[0.28em]"
                      style={{ color: isFilled ? '#171B1D' : '#CBD5E1' }}
                    >
                      {word}
                    </span>
                  );
                })}

                {/* Strikethrough words: "teach history." */}
                <span className="relative inline-block whitespace-nowrap mr-[0.28em]">
                  {s1StrikeWords.map((word, i) => {
                    const wordIdx = 3 + i;
                    const isFilled = isReducedMotion || wordIdx < s1Count;
                    return (
                      <span
                        key={i}
                        className="inline-block transition-colors duration-500 mr-[0.28em] last:mr-0"
                        style={{
                          color: s1Strikethrough
                            ? '#8D9A9F'
                            : isFilled
                            ? '#171B1D'
                            : '#CBD5E1',
                        }}
                      >
                        {word}
                      </span>
                    );
                  })}

                  {/* 3px primary strike line */}
                  <span
                    aria-hidden="true"
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-[3px] bg-aimer-500 origin-left transition-transform duration-900 ease-[cubic-bezier(.7,0,.2,1)]"
                    style={{
                      transform: isReducedMotion || s1Strikethrough ? 'scaleX(1)' : 'scaleX(0)',
                    }}
                  />
                </span>
              </span>{' '}

              {/* Sentence 2: "We operate the future." in italic regular weight */}
              <span className="italic font-normal block sm:inline">
                {s2Words.map((word, i) => {
                  const isFilled = isReducedMotion || i < s2Count;
                  return (
                    <span
                      key={i}
                      className="inline-block transition-colors duration-500 mr-[0.28em] last:mr-0"
                      style={{ color: isFilled ? '#168C9B' : '#CBD5E1' }}
                    >
                      {word}
                    </span>
                  );
                })}
              </span>
            </h2>
          </div>

          {/* Right Column: Paragraph top-aligned with heading's first line */}
          <div className="lg:pt-[0px]">
            <p
              className="font-light leading-[1.75]"
              style={{ fontSize: 'clamp(16px, 1.6vw, 20px)' }}
            >
              {pWords.map((word, i) => {
                const isFilled = isReducedMotion || i < paragraphCount;
                return (
                  <span
                    key={i}
                    className="inline-block transition-colors duration-500 mr-[0.26em] last:mr-0"
                    style={{ color: isFilled ? '#272C2F' : '#CBD5E1' }}
                  >
                    {word}
                  </span>
                );
              })}
            </p>
          </div>
        </div>

        {/* =========================================================================
            3. LABEL ROW ABOVE PILLARS ("THE FOUR PILLARS" & "01 / 04")
            ========================================================================= */}
        <div
          ref={labelRowRef}
          className="mt-14 sm:mt-18 pt-6 pb-3 border-t border-charcoal-200 flex items-center justify-between text-xs font-poppins uppercase tracking-widest text-charcoal-500 transition-all duration-1000 ease-out"
          style={{
            opacity: labelRowVisible ? 1 : 0,
            transform: labelRowVisible ? 'translateY(0)' : 'translateY(24px)',
          }}
        >
          <span className="font-poppins font-semibold text-charcoal-800 tracking-[0.14em]">
            The Four Pillars
          </span>
          {/* <span aria-live="polite" className="font-medium text-aimer-700">
            {`0${activePillar + 1}`} <span className="text-charcoal-400">/</span> 04
          </span> */}
        </div>

        {/* =========================================================================
            4. IMAGE-BACKED EXPANDING PILLARS
            ========================================================================= */}
        <div
          ref={pillarsSectionRef}
          onMouseEnter={() => setIsPillarHovered(true)}
          onMouseLeave={() => setIsPillarHovered(false)}
          className="w-full relative select-none"
        >
          {/* DESKTOP FLEX ROW (height 480px, flex-grow animation) */}
          <div className="hidden md:flex flex-row h-[480px] w-full border-y border-charcoal-200 overflow-hidden">
            {PILLARS_DATA.map((pillar, index) => {
              const isActive = activePillar === index;

              return (
                <div
                  key={pillar.id}
                  role="tab"
                  tabIndex={0}
                  aria-selected={isActive}
                  aria-expanded={isActive}
                  aria-label={`${pillar.index} - ${pillar.title}`}
                  onClick={() => setActivePillar(index)}
                  onMouseEnter={() => handlePillarPointerEnter(index)}
                  onKeyDown={(e) => handlePillarKeyDown(e, index)}
                  style={{
                    flexGrow: isActive ? 3.3 : 1,
                    flexShrink: 1,
                    flexBasis: '0%',
                    transition: isReducedMotion ? 'none' : 'flex-grow 0.95s cubic-bezier(.7,0,.2,1)',
                  }}
                  className={`relative min-w-0 overflow-hidden cursor-pointer group focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-aimer-500 ${
                    index > 0 ? 'border-l border-white/20' : ''
                  }`}
                >
                  {/* Layer 1: Background Image */}
                  <div
                    className="absolute inset-[-3%] bg-cover bg-center will-change-transform"
                    style={{
                      transform: isReducedMotion
                        ? 'scale(1)'
                        : isActive
                        ? 'scale(1)'
                        : 'scale(1.1)',
                      transition: isReducedMotion ? 'none' : 'transform 1.8s cubic-bezier(.2,.8,.2,1)',
                    }}
                  >
                    <Image
                      src={pillar.image}
                      alt={pillar.alt}
                      fill
                      priority={index === 0}
                      loading={index === 0 ? 'eager' : 'lazy'}
                      sizes="(max-width: 1200px) 50vw, 35vw"
                      className="object-cover object-center pointer-events-none"
                    />
                  </div>

                  {/* Layer 2: Flat Deep Primary-Dark Theme Overlay */}
                  <div
                    className="absolute inset-0 bg-[#086C78] transition-opacity duration-900 pointer-events-none"
                    style={{
                      opacity: isActive ? 0.12 : isPillarHovered ? 0.5 : 0.66,
                    }}
                  />

                  {/* Layer 3: Bottom Gradient Overlay for High Contrast Text */}
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-[#0D0F10]/95 via-[#0D0F10]/40 to-transparent transition-opacity duration-900 pointer-events-none"
                    style={{ opacity: isActive ? 1 : 0.35 }}
                  />

                  {/* Layer 4: Progress Line along the top of each pillar */}
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-white/20 z-20 overflow-hidden">
                    {isActive && (
                      <div
                        key={`progress-${activePillar}`}
                        onAnimationEnd={() => {
                          if (!isReducedMotion) {
                            setActivePillar((prev) => (prev + 1) % PILLARS_DATA.length);
                          }
                        }}
                        style={{
                          animation: isReducedMotion
                            ? 'none'
                            : 'pillarProgress 6.5s linear forwards',
                          animationPlayState: isProgressPaused ? 'paused' : 'running',
                        }}
                        className="h-full bg-aimer-400 origin-left"
                      />
                    )}
                  </div>

                  {/* Layer 5: Content */}
                  {/* Top-Left Index ("01" to "04") */}
                  <div className="absolute top-5 left-5 z-10 text-xs font-poppins font-medium tracking-widest text-white/85">
                    {pillar.index}
                  </div>

                  {/* Collapsed State: Vertical Title at bottom-left */}
                  <div
                    className={`absolute bottom-6 left-6 z-10 text-white font-medium text-[18px] transition-all duration-500 whitespace-nowrap select-none group-hover:text-aimer-300 ${
                      isActive ? 'opacity-0 pointer-events-none' : 'opacity-100'
                    }`}
                    style={{
                      writingMode: 'vertical-rl',
                      transform: 'rotate(180deg)',
                    }}
                  >
                    {pillar.title}
                  </div>

                  {/* Expanded State: Bottom-Left Block */}
                  <div
                    className="absolute bottom-6 left-6 right-6 max-w-[430px] z-10 text-white transition-all duration-900"
                    style={{
                      opacity: isActive ? 1 : 0,
                      transform: isReducedMotion
                        ? 'none'
                        : isActive
                        ? 'translateY(0)'
                        : 'translateY(18px)',
                      transitionDelay: isActive && !isReducedMotion ? '0.32s' : '0s',
                      pointerEvents: isActive ? 'auto' : 'none',
                    }}
                  >
                    <h3
                      className="font-semibold text-white tracking-tight leading-snug"
                      style={{ fontSize: 'clamp(22px, 2.2vw, 30px)' }}
                    >
                      {pillar.title}
                    </h3>
                    <p className="text-[14.5px] leading-[1.75] text-white/90 mt-2 font-light">
                      {pillar.description}
                    </p>
                    <div className="border-t border-white/20 pt-3 mt-3 text-[11.5px] font-medium text-aimer-300 tracking-wide">
                      {pillar.keywords}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* MOBILE VERTICAL ACCORDION (below ~860px) */}
          <div className="block md:hidden border-y border-charcoal-200 divide-y divide-white/20">
            {PILLARS_DATA.map((pillar, index) => {
              const isActive = activePillar === index;

              return (
                <div
                  key={pillar.id}
                  role="button"
                  tabIndex={0}
                  aria-expanded={isActive}
                  aria-label={`${pillar.index} - ${pillar.title}`}
                  onClick={() => setActivePillar(index)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setActivePillar(index);
                    }
                  }}
                  className="relative min-h-[84px] py-[22px] pr-5 pl-14 overflow-hidden cursor-pointer select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-aimer-500"
                >
                  {/* Background Image */}
                  <div className="absolute inset-0">
                    <Image
                      src={pillar.image}
                      alt={pillar.alt}
                      fill
                      loading={index === 0 ? 'eager' : 'lazy'}
                      sizes="100vw"
                      className="object-cover object-center pointer-events-none"
                    />
                  </div>

                  {/* Overlays */}
                  <div
                    className="absolute inset-0 bg-[#086C78] transition-opacity duration-500"
                    style={{ opacity: isActive ? 0.22 : 0.72 }}
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-[#0D0F10]/95 via-[#0D0F10]/50 to-transparent transition-opacity duration-500"
                    style={{ opacity: isActive ? 1 : 0.45 }}
                  />

                  {/* Top Progress Line */}
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-white/20 z-20 overflow-hidden">
                    {isActive && (
                      <div
                        key={`m-progress-${activePillar}`}
                        onAnimationEnd={() => {
                          if (!isReducedMotion) {
                            setActivePillar((prev) => (prev + 1) % PILLARS_DATA.length);
                          }
                        }}
                        style={{
                          animation: isReducedMotion
                            ? 'none'
                            : 'pillarProgress 6.5s linear forwards',
                          animationPlayState: isProgressPaused ? 'paused' : 'running',
                        }}
                        className="h-full bg-aimer-400 origin-left"
                      />
                    )}
                  </div>

                  {/* Index */}
                  <div className="absolute left-4 top-[24px] text-xs font-poppins font-medium text-white/85">
                    {pillar.index}
                  </div>

                  {/* Always Visible Title */}
                  <div className="relative z-10 text-white">
                    <h3 className="text-lg sm:text-xl font-semibold tracking-tight leading-snug">
                      {pillar.title}
                    </h3>

                    {/* Animated Description & Keyword Grid Wrapper */}
                    <div
                      className="grid transition-all duration-600 ease-out"
                      style={{
                        gridTemplateRows: isActive ? '1fr' : '0fr',
                        transition: isReducedMotion ? 'none' : 'grid-template-rows 0.6s ease-out',
                      }}
                    >
                      <div className="overflow-hidden">
                        <p className="text-[14px] leading-relaxed text-white/90 font-light pt-2">
                          {pillar.description}
                        </p>
                        <div className="border-t border-white/20 pt-2.5 mt-2.5 text-[11px] font-medium text-aimer-300 tracking-wide">
                          {pillar.keywords}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* =========================================================================
            5. CAMPUS BAND (~96px Below Pillars, Hairline Top Border, Count-Up)
            ========================================================================= */}
        <div
          ref={campusBandRef}
          className="mt-24 border-t border-charcoal-200 pt-11 transition-all duration-1000 ease-out"
          style={{
            opacity: campusBandVisible ? 1 : 0,
            transform: campusBandVisible ? 'translateY(0)' : 'translateY(24px)',
          }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-[72px] items-end">
            
            {/* Left Column: Eyebrow + Heading */}
            <div>
              {/* <div className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.16em] text-aimer-700">
                Markaz Knowledge City Ecosystem
              </div> */}
              <SectionBadge>Markaz Knowledge City Ecosystem</SectionBadge>
              <h3
                className="font-semibold text-charcoal-900 leading-[1.14] tracking-tight mt-3 max-w-[560px]"
                style={{ fontSize: 'clamp(26px, 3vw, 42px)' }}
              >
                Integrated Smart City Hub for Education, Technology &amp; Commerce
              </h3>
            </div>

            {/* Right Column: Big Number "125", Animated 1px Line, Description */}
            <div>
              <div className="flex items-end gap-3 sm:gap-4 leading-none">
                <span
                  className="font-bold text-aimer-700 tracking-[-0.04em] tabular-nums"
                  style={{ fontSize: 'clamp(90px, 13vw, 184px)' }}
                >
                  {campusCount}
                </span>
                <span className="text-xs sm:text-sm font-semibold tracking-widest text-aimer-600 pb-4 sm:pb-6 uppercase leading-none whitespace-nowrap">
                  Acre Township
                </span>
              </div>

              {/* 1px primary line drawing in from the left */}
              <div
                aria-hidden="true"
                className="w-full h-px bg-aimer-500 origin-left transition-transform duration-[1400ms] ease-out mt-2"
                style={{
                  transform: campusBandVisible ? 'scaleX(1)' : 'scaleX(0)',
                }}
              />

              {/* Text beneath line */}
              <p className="text-[15px] leading-[1.75] text-charcoal-600 max-w-[460px] font-light mt-4">
                Nestled within the 125-acre knowledge township in Calicut, offering world-class residential and executive learning facilities.
              </p>
            </div>

          </div>
        </div>

      </div>

      {/* Scoped CSS for linear pillar auto-advance progress */}
      <style jsx>{`
        @keyframes pillarProgress {
          0% {
            transform: scaleX(0);
          }
          100% {
            transform: scaleX(1);
          }
        }
      `}</style>
    </section>
  );
};

export default Positioning;
