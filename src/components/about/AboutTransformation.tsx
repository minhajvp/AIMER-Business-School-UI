'use client';

import React, { useEffect, useRef, useState } from 'react';
import { SectionBadge } from '@/components/ui/SectionBadge';
import { AboutContent } from '@/contents/about';

interface AboutTransformationProps {
  content: AboutContent['transformation'];
}

export const AboutTransformation: React.FC<AboutTransformationProps> = ({ content }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState<number>(0);
  const [trackLength, setTrackLength] = useState<number>(1000);
  const [litStepCount, setLitStepCount] = useState<number>(1);
  const [isVertical, setIsVertical] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setProgress(1);
      setLitStepCount(5);
      return;
    }

    const checkOrientation = () => {
      setIsVertical(window.innerWidth < 1024);
      if (trackRef.current) {
        setTrackLength(
          window.innerWidth < 1024
            ? trackRef.current.offsetHeight
            : trackRef.current.offsetWidth
        );
      }
    };

    checkOrientation();
    window.addEventListener('resize', checkOrientation);

    // Also re-measure after fonts load
    if (document.fonts) {
      document.fonts.ready.then(checkOrientation);
    }

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (sectionRef.current) {
            const rect = sectionRef.current.getBoundingClientRect();
            const vh = window.innerHeight;
            // p = clamp((viewportHeight * 0.8 - route.top) / (min(route.height, viewportHeight) * 0.9), 0, 1)
            const denominator = Math.min(rect.height, vh) * 0.9;
            const rawP = (vh * 0.8 - rect.top) / (denominator || 1);
            const p = Math.max(0, Math.min(1, rawP));

            setProgress(p);

            // Compute lit count: step i is lit when p >= i/4 (first lights once p > 0.02)
            let lit = 1;
            if (p >= 1) lit = 5;
            else if (p >= 0.75) lit = 4;
            else if (p >= 0.5) lit = 3;
            else if (p >= 0.25) lit = 2;
            else if (p > 0.02) lit = 1;

            setLitStepCount(lit);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('resize', checkOrientation);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section
      id="transformation"
      ref={sectionRef}
      className="py-20 lg:py-28 bg-[#FBFDFC] border-b border-charcoal-200/70"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header with Live Counter (01 / 05 to 05 / 05) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <SectionBadge>{content.eyebrow}</SectionBadge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-poppins text-charcoal-900 tracking-tight leading-tight">
              {content.heading}
            </h2>
            <p className="text-sm sm:text-base text-charcoal-600 font-light leading-relaxed">
              {content.description}
            </p>
          </div>

          {/* Live Counter Display */}
          <div className="text-right shrink-0">
            <div className="text-4xl sm:text-5xl lg:text-6xl font-bold font-poppins text-aimer-700 tracking-tight tabular-nums">
              0{litStepCount} <span className="text-charcoal-300 font-light">/ 05</span>
            </div>
            <div className="text-[11px] font-poppins uppercase tracking-wider text-charcoal-500 font-medium mt-1">
              Active Progression Milestone
            </div>
          </div>
        </div>

        {/* Desktop: Horizontal Route */}
        <div className="hidden lg:block pt-8 pb-12">
          {/* Track Line Container */}
          <div ref={trackRef} className="relative w-full h-1 bg-charcoal-200 rounded-full mb-12">
            {/* Primary Fill Bar driven by scaleX(progress) */}
            <div
              className="absolute top-0 left-0 bottom-0 bg-aimer-600 origin-left transition-transform duration-100 ease-out rounded-full"
              style={{
                width: '100%',
                transform: `scaleX(${progress})`,
              }}
            />

            {/* Traveling Dot with Halo Ring */}
            <div
              aria-hidden="true"
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 transition-transform duration-100 ease-out pointer-events-none"
              style={{
                transform: `translate3d(${progress * trackLength}px, -50%, 0)`,
              }}
            >
              <div className="relative flex items-center justify-center">
                <div className="w-8 h-8 rounded-full bg-aimer-500/25 animate-ping absolute" />
                <div className="w-4 h-4 rounded-full bg-aimer-600 border-2 border-white shadow-md relative z-10" />
              </div>
            </div>

            {/* 5 Fixed Step Nodes on the line */}
            <div className="absolute inset-0 flex justify-between pointer-events-none">
              {content.steps.map((_, idx) => {
                const isLit = idx + 1 <= litStepCount;
                return (
                  <div
                    key={idx}
                    className="relative -top-1.5 flex flex-col items-center"
                  >
                    <div
                      className={`w-4 h-4 rounded-full border-2 transition-all duration-300 ${
                        isLit
                          ? 'bg-aimer-600 border-aimer-600 shadow-xs'
                          : 'bg-white border-charcoal-300'
                      }`}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* 5 Columns with Nodes, Index, and Step Description */}
          <div className="grid grid-cols-5 gap-6">
            {content.steps.map((step, idx) => {
              const isLit = idx + 1 <= litStepCount;

              return (
                <div
                  key={step.num}
                  className="space-y-3 p-4 rounded-xl transition-all duration-300"
                  style={{
                    opacity: 1,
                    transitionDelay: `${idx * 110}ms`,
                  }}
                >
                  <div
                    className={`text-xs font-poppins font-bold tracking-wider transition-colors duration-300 ${
                      isLit ? 'text-aimer-600' : 'text-charcoal-400'
                    }`}
                  >
                    STAGE {step.num}
                  </div>

                  <h3
                    className={`text-lg font-bold font-poppins transition-colors duration-300 ${
                      isLit ? 'text-charcoal-900' : 'text-charcoal-500'
                    }`}
                  >
                    {step.label}
                  </h3>

                  <p className="text-xs text-charcoal-600 font-light leading-relaxed">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile / Tablet: Vertical Route */}
        <div className="lg:hidden relative pl-8 pb-4 space-y-8">
          {/* Vertical Track Line on the Left */}
          <div
            ref={isVertical ? trackRef : undefined}
            className="absolute top-2 bottom-4 left-3 w-1 bg-charcoal-200 rounded-full"
          >
            {/* Primary Fill Bar driven by scaleY(progress) */}
            <div
              className="absolute top-0 left-0 right-0 bg-aimer-600 origin-top transition-transform duration-100 ease-out rounded-full"
              style={{
                height: '100%',
                transform: `scaleY(${progress})`,
              }}
            />

            {/* Traveling Dot on Vertical Line */}
            <div
              aria-hidden="true"
              className="absolute left-1/2 -translate-x-1/2 transition-transform duration-100 ease-out pointer-events-none"
              style={{
                transform: `translate3d(-50%, ${progress * trackLength}px, 0)`,
              }}
            >
              <div className="relative flex items-center justify-center">
                <div className="w-6 h-6 rounded-full bg-aimer-500/25 animate-ping absolute" />
                <div className="w-3.5 h-3.5 rounded-full bg-aimer-600 border-2 border-white shadow-md relative z-10" />
              </div>
            </div>
          </div>

          {/* Stacked Step Cards */}
          {content.steps.map((step, idx) => {
            const isLit = idx + 1 <= litStepCount;

            return (
              <div
                key={step.num}
                className="relative space-y-1.5 p-4 rounded-xl bg-white border border-charcoal-200/80 shadow-2xs"
              >
                {/* Node on vertical line */}
                <div
                  className={`absolute -left-[27px] top-5 w-3.5 h-3.5 rounded-full border-2 transition-all duration-300 ${
                    isLit
                      ? 'bg-aimer-600 border-aimer-600'
                      : 'bg-white border-charcoal-300'
                  }`}
                />

                <div
                  className={`text-xs font-poppins font-bold tracking-wider ${
                    isLit ? 'text-aimer-600' : 'text-charcoal-400'
                  }`}
                >
                  STAGE {step.num}
                </div>

                <h3
                  className={`text-base font-bold font-poppins ${
                    isLit ? 'text-charcoal-900' : 'text-charcoal-600'
                  }`}
                >
                  {step.label}
                </h3>

                <p className="text-xs text-charcoal-600 font-light leading-relaxed">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

