'use client';

import React, { useEffect, useRef, useState } from 'react';
import { SectionBadge } from '@/components/ui/SectionBadge';
import { ParentsContent } from '@/contents/parents';

interface ParentPillarsProps {
  content: ParentsContent['pillars'];
}

export const ParentPillars: React.FC<ParentPillarsProps> = ({ content }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visibleItems, setVisibleItems] = useState<boolean[]>(
    new Array(content.items.length).fill(false)
  );

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setVisibleItems(new Array(content.items.length).fill(true));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const indexStr = entry.target.getAttribute('data-index');
            if (indexStr !== null) {
              const idx = parseInt(indexStr, 10);
              setVisibleItems((prev) => {
                const next = [...prev];
                next[idx] = true;
                return next;
              });
            }
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    const cards = containerRef.current?.querySelectorAll('.pillar-card');
    cards?.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, [content.items.length]);

  return (
    <section id="pillars" className="py-20 lg:py-28 bg-white border-b border-charcoal-200/70">
      <div ref={containerRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Header */}
        <div className="space-y-4 max-w-3xl">
          <SectionBadge>{content.eyebrow}</SectionBadge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-poppins text-charcoal-900 tracking-tight leading-tight">
            {content.heading}
          </h2>
          <p className="text-base sm:text-lg text-charcoal-600 font-light leading-relaxed">
            {content.description}
          </p>
        </div>

        {/* 6 Pillars Grid: 2 Columns on Desktop, Hairline Separators */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {content.items.map((item, idx) => {
            const isVisible = visibleItems[idx];

            return (
              <div
                key={item.num}
                data-index={idx}
                className="pillar-card relative bg-[#FAFCFC] border border-charcoal-200/80 p-8 rounded-2xl flex flex-col justify-between space-y-6 transition-all duration-700 ease-out hover:border-aimer-600 hover:shadow-sm"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(28px)',
                  transitionDelay: `${idx * 80}ms`,
                }}
              >
                {/* Top Row: Number + Tag */}
                <div className="flex items-center justify-between border-b border-charcoal-200/60 pb-4">
                  <span className="text-xs font-poppins font-bold text-aimer-600 tracking-wider">
                    {item.num}
                  </span>
                  <span className="text-[10px] font-poppins font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full bg-aimer-50 text-aimer-700 border border-aimer-200/60">
                    {item.tag}
                  </span>
                </div>

                {/* Content */}
                <div className="space-y-3 flex-1">
                  <h3 className="text-xl sm:text-2xl font-bold font-poppins text-charcoal-900 tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-sm text-charcoal-600 font-light leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Bottom Hairline Highlight Accent */}
                <div className="pt-2">
                  <div className="w-8 h-0.5 bg-aimer-500/60 rounded-full" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

