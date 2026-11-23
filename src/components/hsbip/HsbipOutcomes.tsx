import React from 'react';
import { SectionBadge } from '@/components/ui/SectionBadge';
import { HsbipContent } from '@/contents/programmes/hsbip';

interface HsbipOutcomesProps {
  content: HsbipContent['outcomes'];
}

export const HsbipOutcomes: React.FC<HsbipOutcomesProps> = ({ content }) => {
  return (
    <section id="outcomes" className="py-20 lg:py-28 bg-white border-b border-charcoal-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
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

        {/* 5 Transformation Cards Grid (2-column + 1 full or 3-column) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {content.items.map((outcome, idx) => (
            <div
              key={outcome.id}
              className={`p-7 rounded-2xl border border-charcoal-200/80 bg-white hover:border-aimer-300 hover:shadow-md transition-all duration-300 flex flex-col justify-between ${
                idx === 0 ? 'md:col-span-2 lg:col-span-1 bg-gradient-to-br from-aimer-50/40 via-white to-white border-aimer-200' : ''
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-poppins font-bold uppercase tracking-widest text-aimer-600">
                    TRANSFORMATION {outcome.num}
                  </span>
                  <div className="w-2 h-2 rounded-full bg-aimer-500" />
                </div>

                <h3 className="text-xl font-bold font-poppins text-charcoal-900 tracking-tight">
                  {outcome.title}
                </h3>

                <div className="text-xs font-semibold text-aimer-800 font-poppins">
                  {outcome.subtitle}
                </div>

                <p className="text-xs sm:text-sm text-charcoal-600 font-light leading-relaxed">
                  {outcome.description}
                </p>
              </div>

              {/* Tags */}
              <div className="mt-6 pt-5 border-t border-charcoal-100 flex flex-wrap gap-1.5">
                {outcome.tags.map((tag, tagIdx) => (
                  <span
                    key={tagIdx}
                    className="text-[10px] font-poppins px-2.5 py-1 rounded-full bg-charcoal-50 text-charcoal-700 font-medium"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

