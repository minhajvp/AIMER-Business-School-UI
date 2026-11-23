import React from 'react';
import { SectionBadge } from '@/components/ui/SectionBadge';
import { HsbipContent } from '@/contents/programmes/hsbip';

interface HsbipOverviewProps {
  content: HsbipContent['overview'];
}

export const HsbipOverview: React.FC<HsbipOverviewProps> = ({ content }) => {
  return (
    <section id="overview" className="py-20 lg:py-28 bg-white border-b border-charcoal-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 lg:space-y-24">
        {/* 1. Header & Lead */}
        <div className="max-w-3xl space-y-4">
          <SectionBadge>{content.badge}</SectionBadge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-poppins text-charcoal-900 tracking-tight leading-tight">
            {content.heading}{' '}
            <span className="text-aimer-600 font-normal italic">
              {content.headingAccent}
            </span>
          </h2>
          <p className="text-sm sm:text-base text-charcoal-600 font-light leading-relaxed pt-1">
            {content.lead}
          </p>
        </div>

        {/* 2. 4 Large Metric Counters */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-6 border-t border-charcoal-200/70">
          {content.counters.map((c, idx) => (
            <div key={idx} className="space-y-1 p-4 rounded-xl hover:bg-[#F6FAFA] transition-colors">
              <div className="text-4xl sm:text-5xl font-bold font-poppins text-aimer-800 tracking-tight">
                {c.value}
              </div>
              <div className="text-xs sm:text-sm font-semibold text-charcoal-800 mt-1">
                {c.label}
              </div>
              <div className="text-xs text-charcoal-500 font-light">
                {c.detail}
              </div>
            </div>
          ))}
        </div>

        {/* 3. 40% Academics vs 60% Experiential Incubation Bar */}
        <div className="bg-[#F6FAFA] rounded-2xl p-6 sm:p-10 border border-aimer-200/80">
          <div className="max-w-2xl mb-6">
            <div className="text-[11px] font-poppins font-semibold uppercase tracking-widest text-aimer-700">
              PEDAGOGICAL ARCHITECTURE
            </div>
            <h3 className="text-2xl font-bold font-poppins text-charcoal-900 mt-1">
              40% State Board Theory + 60% Venture Practicum
            </h3>
          </div>

          {/* Visual Split Bar */}
          <div className="w-full h-9 rounded-full overflow-hidden flex bg-charcoal-200 shadow-inner">
            <div
              style={{ width: `${content.pedagogy.academicPercent}%` }}
              className="h-full bg-charcoal-700 flex items-center justify-center text-white text-[11px] sm:text-xs font-poppins font-bold px-2 text-center"
            >
              40% ACADEMIC THEORY
            </div>
            <div
              style={{ width: `${content.pedagogy.experientialPercent}%` }}
              className="h-full bg-aimer-600 flex items-center justify-center text-white text-[11px] sm:text-xs font-poppins font-bold px-2 text-center"
            >
              60% VENTURE INCUBATION & PRACTICUM
            </div>
          </div>

          {/* Two-Column Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 pt-6 border-t border-charcoal-200/70">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-charcoal-700 inline-block" />
                <h4 className="font-semibold text-sm sm:text-base text-charcoal-900 font-poppins">
                  Academic Foundations (SCOLE Kerala)
                </h4>
              </div>
              <p className="text-xs sm:text-sm text-charcoal-600 font-light leading-relaxed pl-5">
                {content.pedagogy.academicDesc}
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-aimer-600 inline-block" />
                <h4 className="font-semibold text-sm sm:text-base text-aimer-800 font-poppins">
                  Experiential Practicum (Junior Venture Studio)
                </h4>
              </div>
              <p className="text-xs sm:text-sm text-charcoal-600 font-light leading-relaxed pl-5">
                {content.pedagogy.experientialDesc}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

