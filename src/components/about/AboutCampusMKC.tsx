'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { SectionBadge } from '@/components/ui/SectionBadge';
import { AboutContent } from '@/contents/about';

interface AboutCampusMKCProps {
  content: AboutContent['campus'];
}

export const AboutCampusMKC: React.FC<AboutCampusMKCProps> = ({ content }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="campus" className="py-20 lg:py-28 bg-white border-b border-charcoal-200/70">
      <div ref={containerRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="space-y-3 max-w-3xl">
          <SectionBadge>{content.eyebrow}</SectionBadge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-poppins text-charcoal-900 tracking-tight leading-tight">
            {content.heading}
          </h2>
        </div>

        {/* Wide 21:9 Campus Image */}
        <div
          className="relative aspect-[21/9] w-full min-h-[240px] sm:min-h-[340px] lg:min-h-[420px] rounded-2xl overflow-hidden bg-charcoal-100 shadow-md border border-charcoal-200/60"
        >
          <div
            className="w-full h-full relative transition-transform duration-[1200ms] ease-out hover:scale-105"
          >
            <Image
              src={content.image}
              alt={content.alt}
              fill
              sizes="(max-width: 1280px) 100vw, 1280px"
              className="object-cover"
              priority={false}
            />
          </div>
        </div>

        {/* 3 Columns Underneath with Top Hairline that Draws Across on Hover */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-6">
          {content.points.map((point) => (
            <div
              key={point.index}
              className="relative pt-6 group transition-colors"
            >
              {/* Hairline Base */}
              <div className="absolute top-0 left-0 right-0 h-px bg-charcoal-200" />
              {/* Hairline Hover Fill that Draws Across */}
              <div
                aria-hidden="true"
                className="absolute top-0 left-0 right-0 h-0.5 bg-aimer-600 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out"
              />

              <div className="space-y-3">
                <span className="text-xs font-poppins font-bold text-aimer-600 tracking-wider">
                  {point.index}
                </span>
                <h3 className="text-xl font-bold font-poppins text-charcoal-900 group-hover:text-aimer-700 transition-colors">
                  {point.title}
                </h3>
                <p className="text-xs sm:text-sm text-charcoal-600 font-light leading-relaxed">
                  {point.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

