'use client';

import React, { useEffect, useRef, useState } from 'react';
import { SectionBadge } from '@/components/ui/SectionBadge';
import { AboutContent } from '@/contents/about';

interface AboutVisionMissionProps {
  content: AboutContent['visionMission'];
}

export const AboutVisionMission: React.FC<AboutVisionMissionProps> = ({ content }) => {
  const visionRef = useRef<HTMLDivElement>(null);
  const words = content.visionStatement.split(' ');
  const [activeWordCount, setActiveWordCount] = useState<number>(0);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setActiveWordCount(words.length);
      return;
    }

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (visionRef.current) {
            const rect = visionRef.current.getBoundingClientRect();
            const vh = window.innerHeight;
            // p = clamp((viewportHeight * 0.86 - element.top) / (viewportHeight * 0.5), 0, 1)
            const rawP = (vh * 0.86 - rect.top) / (vh * 0.5);
            const p = Math.max(0, Math.min(1, rawP));
            const count = Math.floor(p * words.length);

            setActiveWordCount((prev) => (prev !== count ? count : prev));
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [words.length]);

  return (
    <section id="vision" className="py-20 lg:py-28 bg-[#FBFDFC] border-b border-charcoal-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 lg:space-y-24">
        {/* 1. Vision Statement with Word-by-Word Interactive Scroll Fill */}
        <div ref={visionRef} className="space-y-6 max-w-5xl">
          <SectionBadge>{content.visionEyebrow}</SectionBadge>

          <h2 className="text-xs font-poppins uppercase tracking-widest text-charcoal-500 font-semibold">
            {content.visionHeading}
          </h2>

          <p className="font-poppins font-medium leading-[1.3] tracking-tight text-[clamp(1.625rem,4vw,3.125rem)]">
            {words.map((word, idx) => {
              const isFilled = idx < activeWordCount;
              return (
                <span
                  key={idx}
                  className="inline-block mr-[0.28em] transition-colors duration-500"
                  style={{
                    color: isFilled ? '#171B1D' : 'rgba(23, 27, 29, 0.22)',
                  }}
                >
                  {word}
                </span>
              );
            })}
          </p>
        </div>

        {/* 2. Mission Split Row with Top Hairline */}
        <div className="pt-12 border-t border-charcoal-200/80 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          <div className="lg:col-span-4 space-y-2">
            <span className="text-xs font-poppins font-bold text-aimer-400 tracking-wider">
              {content.missionEyebrow.toUpperCase()}
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold font-poppins text-charcoal-900 tracking-tight">
              {content.missionHeading}
            </h3>
          </div>

          <div className="lg:col-span-8">
            <p className="font-poppins font-normal text-charcoal-700 leading-relaxed text-[clamp(1rem,1.5vw,1.3125rem)]">
              {content.missionStatement}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

