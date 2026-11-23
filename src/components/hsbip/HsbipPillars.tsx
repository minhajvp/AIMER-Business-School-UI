'use client';

import React, { useState } from 'react';
import { SectionBadge } from '@/components/ui/SectionBadge';
import { HsbipContent, HsbipPillar } from '@/contents/programmes/hsbip';

interface HsbipPillarsProps {
  content: HsbipContent['pillars'];
}

const CATEGORIES = ['All', 'Academics', 'Venture', 'Leadership', 'Practical'] as const;

export const HsbipPillars: React.FC<HsbipPillarsProps> = ({ content }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const filteredPillars =
    activeCategory === 'All'
      ? content.items
      : content.items.filter((p) => p.category === activeCategory);

  return (
    <section id="pillars" className="py-20 lg:py-28 bg-[#FBFDFC] border-b border-charcoal-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-3xl space-y-3">
            <SectionBadge>{content.badge}</SectionBadge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-poppins text-charcoal-900 tracking-tight leading-tight">
              {content.heading}{' '}
              <span className="text-aimer-600 font-normal italic">
                {content.headingAccent}
              </span>
            </h2>
            <p className="text-sm sm:text-base text-charcoal-600 font-light leading-relaxed pt-1">
              {content.description}
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-poppins transition-all duration-200 ${
                  activeCategory === cat
                    ? 'bg-aimer-600 text-white font-medium shadow-xs'
                    : 'bg-white border border-charcoal-200 text-charcoal-600 hover:border-aimer-400 hover:text-aimer-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* 11 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPillars.map((pillar) => (
            <div
              key={pillar.num}
              className="bg-white rounded-2xl p-6 sm:p-7 border border-charcoal-200/80 shadow-xs hover:shadow-md hover:border-aimer-300 transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="space-y-4">
                {/* Top Row: Pillar Number & Category Badge */}
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold font-poppins text-aimer-600 tracking-tight">
                    {pillar.num}
                  </span>
                  <span className="text-[10px] font-poppins uppercase tracking-wider font-semibold px-2.5 py-1 rounded-full bg-aimer-50 text-aimer-800 border border-aimer-200">
                    {pillar.category}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold font-poppins text-charcoal-900 group-hover:text-aimer-700 transition-colors">
                  {pillar.title}
                </h3>

                {/* Summary */}
                <p className="text-xs sm:text-sm text-charcoal-600 font-light leading-relaxed">
                  {pillar.summary}
                </p>
              </div>

              {/* Deliverables Checklist */}
              <div className="mt-6 pt-5 border-t border-charcoal-100 space-y-2">
                <div className="text-[10px] font-poppins uppercase tracking-wider text-charcoal-400 font-semibold">
                  Core Components
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {pillar.deliverables.map((item, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] font-poppins px-2 py-0.5 rounded bg-charcoal-50 text-charcoal-700 border border-charcoal-200/60"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary Banner */}
        <div className="p-6 rounded-2xl bg-white border border-aimer-200/80 text-center max-w-4xl mx-auto shadow-2xs">
          <p className="text-xs sm:text-sm text-charcoal-700 font-light">
            <span className="font-semibold text-aimer-800">Complete Venture Ecosystem:</span> Collectively, these 11 pillars transform a standard commerce curriculum into an active student startup accelerator and executive leadership academy.
          </p>
        </div>
      </div>
    </section>
  );
};

