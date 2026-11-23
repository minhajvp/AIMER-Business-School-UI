'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { SectionBadge } from '@/components/ui/SectionBadge';
import { ParentsContent } from '@/contents/parents';

interface ParentVisitProps {
  content: ParentsContent['visit'];
}

export const ParentVisit: React.FC<ParentVisitProps> = ({ content }) => {
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

    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="campus-visit" className="py-20 lg:py-28 bg-white border-b border-charcoal-200/70">
      <div ref={containerRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="space-y-4 max-w-3xl">
          <SectionBadge>{content.eyebrow}</SectionBadge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-poppins text-charcoal-900 tracking-tight leading-tight">
            {content.heading}
          </h2>
          <p className="text-base sm:text-lg text-charcoal-600 font-light leading-relaxed">
            {content.description}
          </p>
        </div>

        {/* Wide 21:9 Campus Layout Visual */}
        <div className="relative aspect-[21/9] w-full min-h-[240px] sm:min-h-[340px] lg:min-h-[420px] rounded-2xl overflow-hidden bg-charcoal-100 shadow-md border border-charcoal-200/60 group">
          <Image
            src={content.image}
            alt={content.alt}
            fill
            sizes="(max-width: 1280px) 100vw, 1280px"
            className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
            priority={false}
          />
        </div>

        {/* 3 Tour Checklist Columns with Hairlines */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
          <div className="space-y-2 border-l border-charcoal-200/80 pl-6">
            <span className="text-xs font-poppins font-bold text-aimer-600 tracking-wider">
              01
            </span>
            <h4 className="text-lg font-bold font-poppins text-charcoal-900">
              Hostel & Dining Walkthrough
            </h4>
            <p className="text-sm text-charcoal-600 font-light leading-relaxed">
              Inspect residential rooms, meet live-in wardens, and taste meals at the student dining commons.
            </p>
          </div>

          <div className="space-y-2 border-l border-charcoal-200/80 pl-6">
            <span className="text-xs font-poppins font-bold text-aimer-600 tracking-wider">
              02
            </span>
            <h4 className="text-lg font-bold font-poppins text-charcoal-900">
              Academic Lab Interaction
            </h4>
            <p className="text-sm text-charcoal-600 font-light leading-relaxed">
              Tour digital classrooms, venture incubation labs, and speak directly with faculty programme directors.
            </p>
          </div>

          <div className="space-y-2 border-l border-charcoal-200/80 pl-6">
            <span className="text-xs font-poppins font-bold text-aimer-600 tracking-wider">
              03
            </span>
            <h4 className="text-lg font-bold font-poppins text-charcoal-900">
              Fee & Scholarship Consultation
            </h4>
            <p className="text-sm text-charcoal-600 font-light leading-relaxed">
              Sit down with admissions counsellors for personalized guidance on 0% EMI plans and NAAT scholarships.
            </p>
          </div>
        </div>

        {/* Action CTAs */}
        <div className="pt-6 flex flex-wrap items-center gap-4">
          <a
            href={content.bookTourHref}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3.5 rounded-full bg-aimer-600 hover:bg-aimer-700 text-white font-poppins font-semibold text-xs sm:text-sm uppercase tracking-wider transition-all duration-200 shadow-sm active:scale-95 inline-flex items-center gap-2"
          >
            <span>Book a Family Campus Tour</span>
            <span>&rarr;</span>
          </a>

          <a
            href={content.phoneTel}
            className="px-7 py-3.5 rounded-full border border-charcoal-300 hover:border-aimer-600 text-charcoal-800 hover:text-aimer-700 font-poppins font-semibold text-xs sm:text-sm uppercase tracking-wider transition-colors active:scale-95 bg-white inline-flex items-center gap-2"
          >
            <svg
              className="w-4 h-4 text-aimer-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
            <span>Call {content.phone}</span>
          </a>
        </div>
      </div>
    </section>
  );
};

