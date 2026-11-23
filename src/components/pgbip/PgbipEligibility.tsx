import React from 'react';
import { SectionBadge } from '@/components/ui/SectionBadge';
import { PgbipContent } from '@/contents/programmes/pgbip';

interface PgbipEligibilityProps {
  content: PgbipContent['eligibility'];
}

export const PgbipEligibility: React.FC<PgbipEligibilityProps> = ({ content }) => {
  return (
    <section id="eligibility" className="py-20 lg:py-28 bg-white text-charcoal-900 border-b border-charcoal-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="max-w-3xl space-y-3">
          <SectionBadge>ADMISSIONS QUALIFICATION MATRIX</SectionBadge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-poppins text-charcoal-900 tracking-tight">
            {content.heading}
          </h2>
          <p className="text-sm sm:text-base text-charcoal-600 font-light leading-relaxed pt-1">
            {content.subheading}
          </p>
        </div>

        {/* 4 Eligibility Criteria Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {content.criteria.map((crit, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-7 rounded-2xl bg-[#F8FCFC] border border-charcoal-200/90 hover:border-aimer-500 transition-colors space-y-3 shadow-2xs"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-poppins font-bold text-aimer-700 bg-aimer-50 px-2.5 py-1 rounded border border-aimer-200 uppercase">
                  CRITERION 0{idx + 1}
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
              </div>

              <h3 className="text-lg font-bold text-charcoal-900 font-poppins">
                {crit.title}
              </h3>

              <div className="text-xs sm:text-sm font-semibold text-aimer-700 font-poppins">
                {crit.requirement}
              </div>

              <p className="text-xs sm:text-sm text-charcoal-600 font-light leading-relaxed">
                {crit.detail}
              </p>
            </div>
          ))}
        </div>

        {/* NAAT Competency Evaluation Block */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[#F6FAFA] border border-aimer-200 space-y-6">
          <div>
            <div className="text-xs font-poppins uppercase tracking-widest text-aimer-700 font-semibold">
              NATIONAL AIMER ADMISSION TEST (NAAT)
            </div>
            <h3 className="text-xl sm:text-2xl font-bold font-poppins text-charcoal-900 mt-1">
              Core Competencies Evaluated in Every Candidate
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {content.naatCompetencies.map((comp) => (
              <div
                key={comp.num}
                className="p-4 rounded-xl bg-white border border-charcoal-200 hover:border-aimer-500 transition-colors shadow-2xs"
              >
                <div className="text-xs font-poppins font-bold text-aimer-700">
                  {comp.num}
                </div>
                <div className="text-sm font-bold text-charcoal-900 font-poppins mt-1">
                  {comp.name}
                </div>
                <div className="text-xs text-charcoal-600 font-light mt-1">
                  {comp.desc}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
