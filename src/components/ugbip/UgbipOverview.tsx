import React from 'react';
import { SectionBadge } from '@/components/ui/SectionBadge';
import { UgbipContent } from '@/contents/programmes/ugbip';

interface UgbipOverviewProps {
  content: UgbipContent['overview'];
}

export const UgbipOverview: React.FC<UgbipOverviewProps> = ({ content }) => {
  return (
    <section id="overview" className="py-20 lg:py-28 bg-white border-b border-charcoal-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20 lg:space-y-28">
        
        {/* ===================================================================
            1. SECTION INTRO & COUNTERS
            =================================================================== */}
        <div>
          <div className="max-w-3xl space-y-3">
            <SectionBadge>{content.sectionBadge}</SectionBadge>
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

          {/* 4 Large Clean Counters */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-12 pt-8 border-t border-charcoal-200/70">
            {content.counters.map((c, idx) => (
              <div key={idx} className="space-y-1">
                <div className="text-4xl sm:text-5xl font-bold font-poppins text-aimer-800 tracking-tight">
                  {c.value}
                </div>
                <div className="text-xs sm:text-sm font-medium text-charcoal-700">
                  {c.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ===================================================================
            2. 25% THEORY VS 75% PRACTICUM SPLIT BAR
            =================================================================== */}
        <div className="bg-[#F6FAFA] rounded-2xl p-6 sm:p-10 border border-aimer-200/80">
          <div className="max-w-2xl mb-6">
            <div className="text-[11px] font-poppins font-semibold uppercase tracking-widest text-aimer-700">
              CURRICULAR DISTRIBUTION
            </div>
            <h3 className="text-2xl font-bold font-poppins text-charcoal-900 mt-1">
              75% Enterprise Practicum vs 25% Core Theory
            </h3>
          </div>

          {/* Ratio Visual Bar */}
          <div className="w-full h-8 rounded-full overflow-hidden flex bg-charcoal-200 shadow-inner">
            <div
              style={{ width: `${content.pedagogy.theoryPercent}%` }}
              className="h-full bg-charcoal-700 flex items-center justify-center text-white text-xs font-poppins font-bold"
            >
              25%
            </div>
            <div
              style={{ width: `${content.pedagogy.practicumPercent}%` }}
              className="h-full bg-aimer-600 flex items-center justify-center text-white text-xs font-poppins font-bold"
            >
              75% PRACTICUM
            </div>
          </div>

          {/* Two-Column Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 pt-6 border-t border-aimer-200/60">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-charcoal-700" />
                <h4 className="text-sm font-bold text-charcoal-900 uppercase tracking-wider font-poppins">
                  25% Theory & Foundation
                </h4>
              </div>
              <p className="text-xs sm:text-sm text-charcoal-600 leading-relaxed font-light pl-5">
                {content.pedagogy.theoryDesc}
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-aimer-600" />
                <h4 className="text-sm font-bold text-aimer-800 uppercase tracking-wider font-poppins">
                  75% Enterprise Practicum
                </h4>
              </div>
              <p className="text-xs sm:text-sm text-charcoal-600 leading-relaxed font-light pl-5">
                {content.pedagogy.practicumDesc}
              </p>
            </div>
          </div>
        </div>

        {/* ===================================================================
            3. GLOBAL IMMERSION BLOCK (Dubai, Numbered Rows, Ledger, Ribbon)
            =================================================================== */}
        <div className="space-y-8">
          <div className="max-w-2xl">
            <SectionBadge>{content.immersion.eyebrow}</SectionBadge>
            <h3 className="text-3xl font-bold font-poppins text-charcoal-900 tracking-tight mt-2">
              {content.immersion.heading}
            </h3>
            <p className="text-sm text-charcoal-600 font-light leading-relaxed mt-2">
              {content.immersion.description}
            </p>
          </div>

          {/* Two-Column: Image Left, Numbered Highlights Right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Dubai Skyline Image */}
            <div className="lg:col-span-5 relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg border border-charcoal-200">
              <img
                src={content.immersion.image}
                alt="Dubai International Financial Centre and commercial trade hub"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <div className="text-[10px] font-poppins uppercase tracking-widest text-aimer-300">
                  GUARANTEED IMMERSION
                </div>
                <div className="text-sm font-semibold font-poppins">
                  Dubai, UAE · DIFC & Dubai Future Foundation
                </div>
              </div>
            </div>

            {/* 3 Numbered Rows (replacing scraped emojis) */}
            <div className="lg:col-span-7 space-y-4">
              {content.immersion.highlights.map((row) => (
                <div
                  key={row.num}
                  className="flex items-start gap-4 p-4 sm:p-5 rounded-xl border border-charcoal-200/90 bg-white hover:border-aimer-500 transition-colors shadow-2xs"
                >
                  <div className="text-sm font-poppins font-bold text-aimer-700 bg-aimer-50 px-2.5 py-1 rounded-md shrink-0">
                    {row.num}
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-base font-semibold text-charcoal-900 font-poppins">
                      {row.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-charcoal-600 leading-relaxed font-light mt-1">
                      {row.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Corridor Ledger Table */}
          <div className="mt-8 border border-charcoal-200 rounded-xl overflow-hidden">
            <div className="bg-charcoal-50 px-5 py-3 border-b border-charcoal-200 flex items-center justify-between">
              <span className="text-xs font-poppins font-semibold uppercase tracking-wider text-charcoal-700">
                Active International Commercial Ledger
              </span>
              <span className="text-[11px] font-poppins text-aimer-700 font-medium">
                4 Corridors Connected
              </span>
            </div>
            <div className="divide-y divide-charcoal-200 bg-white text-xs sm:text-sm">
              {content.immersion.ledger.map((item, idx) => (
                <div
                  key={idx}
                  className="grid grid-cols-1 sm:grid-cols-3 p-4 gap-2 hover:bg-charcoal-50/50 transition-colors"
                >
                  <div className="font-semibold text-charcoal-900 font-poppins">
                    {item.corridor}
                  </div>
                  <div className="text-charcoal-600">{item.partner}</div>
                  <div className="text-aimer-800 font-medium">{item.focus}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Typographic Continuous Ticker Ribbon */}
          <div className="overflow-hidden py-3 bg-charcoal-950 text-white rounded-lg">
            <div className="whitespace-nowrap flex animate-marquee text-xs font-poppins tracking-widest uppercase">
              <span className="mx-4 text-aimer-400">{content.immersion.ribbonText}</span>
              <span className="mx-4 text-aimer-400">{content.immersion.ribbonText}</span>
              <span className="mx-4 text-aimer-400">{content.immersion.ribbonText}</span>
            </div>
          </div>
        </div>

        {/* ===================================================================
            4. TWO CORPORATE RESIDENCIES TIMELINE
            =================================================================== */}
        <div className="space-y-8">
          <div className="max-w-3xl">
            <SectionBadge>{content.internships.eyebrow}</SectionBadge>
            <h3 className="text-3xl font-bold font-poppins text-charcoal-900 tracking-tight mt-2">
              {content.internships.heading}
            </h3>
            <p className="text-sm text-charcoal-600 font-light leading-relaxed mt-2">
              {content.internships.lead}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {content.internships.phases.map((phase, idx) => (
              <div
                key={idx}
                className="p-6 sm:p-8 rounded-2xl border border-charcoal-200 bg-gradient-to-b from-[#FBFDFD] to-white shadow-2xs relative group hover:border-aimer-500 transition-colors"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-poppins font-semibold uppercase tracking-wider text-aimer-700 bg-aimer-50 px-3 py-1 rounded-full border border-aimer-200/60">
                    {phase.period}
                  </span>
                  <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-md">
                    {phase.stipend}
                  </span>
                </div>

                <h4 className="text-xl font-bold text-charcoal-900 font-poppins">
                  {phase.title}
                </h4>

                <p className="text-xs sm:text-sm text-charcoal-600 leading-relaxed font-light mt-3">
                  {phase.description}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

