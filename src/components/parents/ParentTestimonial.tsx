'use client';

import React, { useEffect, useRef, useState } from 'react';
import { SectionBadge } from '@/components/ui/SectionBadge';
import { ParentsContent } from '@/contents/parents';

interface ParentTestimonialProps {
  content: ParentsContent['testimonial'];
}

export const ParentTestimonial: React.FC<ParentTestimonialProps> = ({ content }) => {
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
      { threshold: 0.2 }
    );

    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-20 lg:py-28 bg-[#F4FAFA] border-b border-charcoal-200/70 overflow-hidden">
      <div
        ref={containerRef}
        className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-1000 ease-out"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
        }}
      >
        <div className="relative bg-white border border-charcoal-200/80 rounded-3xl p-8 sm:p-12 lg:p-16 shadow-xs space-y-8">
          {/* Large Faint Opening Quotation Mark Behind Quote */}
          <div
            aria-hidden="true"
            className="absolute top-4 left-6 text-[10rem] font-serif leading-none text-aimer-500/10 select-none pointer-events-none"
          >
            &ldquo;
          </div>

          <div className="relative z-10 space-y-4">
            <SectionBadge>{content.badge}</SectionBadge>

            {/* Testimonial Quote */}
            <blockquote className="text-xl sm:text-2xl lg:text-3xl font-medium font-poppins text-charcoal-900 leading-relaxed tracking-tight">
              &ldquo;{content.quote}&rdquo;
            </blockquote>
          </div>

          {/* Author Block */}
          <div className="relative z-10 pt-6 border-t border-charcoal-200/80 flex items-center justify-between flex-wrap gap-4">
            <div className="space-y-0.5">
              <div className="text-base sm:text-lg font-bold font-poppins text-charcoal-900">
                {content.author}
              </div>
              <div className="text-xs text-charcoal-600 font-light">
                {content.role} &bull; {content.location}
              </div>
            </div>

            
          </div>
        </div>
      </div>
    </section>
  );
};

