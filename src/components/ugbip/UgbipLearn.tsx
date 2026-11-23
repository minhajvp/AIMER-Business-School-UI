import React from 'react';
import { SectionBadge } from '@/components/ui/SectionBadge';
import { UgbipContent } from '@/contents/programmes/ugbip';

interface UgbipLearnProps {
  content: UgbipContent['learn'];
}

export const UgbipLearn: React.FC<UgbipLearnProps> = ({ content }) => {
  return (
    <section id="learn" className="py-20 lg:py-28 bg-[#F8FCFC] border-b border-charcoal-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20 lg:space-y-28">

        {/* Section Intro */}
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

        {/* ===================================================================
            1. STARTUP FOUNDER SERIES & MASTERCLASSES
            =================================================================== */}
        <div>
          <div className="max-w-2xl mb-8">
            <div className="text-[11px] font-poppins font-semibold uppercase tracking-widest text-aimer-700">
              {content.speakers.eyebrow}
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold font-poppins text-charcoal-900 mt-1">
              {content.speakers.heading}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {content.speakers.items.map((spk, idx) => (
              <div
                key={idx}
                className="p-5 rounded-xl bg-white border border-charcoal-200 shadow-2xs hover:border-aimer-500 transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="text-sm font-bold text-charcoal-900 font-poppins">
                    {spk.name}
                  </div>
                  <div className="text-xs text-aimer-700 font-medium">
                    {spk.role} · {spk.company}
                  </div>
                  <div className="mt-3 text-xs sm:text-sm text-charcoal-600 font-light leading-relaxed">
                    &ldquo;{spk.topic}&rdquo;
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-charcoal-100 flex items-center gap-1.5 text-[11px] font-poppins text-charcoal-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-aimer-500" />
                  <span>Executive Masterclass</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ===================================================================
            2. 6 MULTI-DISCIPLINARY MANAGEMENT CHALLENGES
            =================================================================== */}
        <div>
          <div className="max-w-2xl mb-8">
            <div className="text-[11px] font-poppins font-semibold uppercase tracking-widest text-aimer-700">
              {content.managementChallenges.eyebrow}
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold font-poppins text-charcoal-900 mt-1">
              {content.managementChallenges.heading}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {content.managementChallenges.items.map((ch) => (
              <div
                key={ch.num}
                className="group relative p-6 bg-white rounded-xl border border-charcoal-200/90 shadow-2xs transition-all duration-300 hover:shadow-md hover:-translate-y-0.5"
              >
                {/* Hairline draw top border on hover */}
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-aimer-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

                <div className="flex items-center justify-between">
                  <span className="text-xs font-poppins font-bold text-aimer-700 bg-aimer-50 px-2 py-0.5 rounded">
                    CHALLENGE {ch.num}
                  </span>
                  <span className="text-[10px] font-poppins uppercase tracking-wider text-charcoal-400">
                    Live Sprint
                  </span>
                </div>

                <h4 className="text-lg font-bold text-charcoal-900 font-poppins mt-3">
                  {ch.title}
                </h4>

                <p className="text-xs sm:text-sm text-charcoal-600 font-light leading-relaxed mt-2">
                  {ch.summary}
                </p>

                <div className="mt-4 pt-3 border-t border-charcoal-100 text-[11px] font-poppins text-aimer-800 font-semibold">
                  Competency: {ch.skill}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ===================================================================
            3. PRACTICAL WORKSHOPS STRIP
            =================================================================== */}
        <div className="bg-white rounded-2xl p-6 sm:p-10 border border-charcoal-200">
          <div className="max-w-2xl mb-6">
            <div className="text-[11px] font-poppins font-semibold uppercase tracking-widest text-aimer-700">
              {content.workshops.eyebrow}
            </div>
            <h3 className="text-2xl font-bold font-poppins text-charcoal-900 mt-1">
              {content.workshops.heading}
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {content.workshops.items.map((item, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-lg border border-charcoal-200/80 bg-charcoal-50/50 flex items-start gap-2.5"
              >
                <span className="text-xs font-poppins font-bold text-aimer-600 mt-0.5">
                  ✓
                </span>
                <span className="text-xs sm:text-[13px] font-medium text-charcoal-800 leading-snug">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ===================================================================
            4. EXECUTIVE ADVISORS / MENTOR RAIL
            =================================================================== */}
        <div>
          <div className="max-w-2xl mb-8">
            <div className="text-[11px] font-poppins font-semibold uppercase tracking-widest text-aimer-700">
              {content.mentors.eyebrow}
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold font-poppins text-charcoal-900 mt-1">
              {content.mentors.heading}
            </h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {content.mentors.items.map((m) => (
              <div
                key={m.id}
                className="p-3 rounded-xl bg-white border border-charcoal-200 shadow-2xs text-center flex flex-col items-center"
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden bg-aimer-50 mb-3 border border-charcoal-200">
                  <img
                    src={m.photo}
                    alt={m.name}
                    className="w-full h-full object-cover object-top"
                    onError={(e) => {
                      // Fallback silhouette
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                </div>
                <div className="text-xs sm:text-sm font-bold text-charcoal-900 font-poppins">
                  {m.name}
                </div>
                <div className="text-[10px] sm:text-[11px] text-aimer-700 font-medium mt-0.5">
                  {m.role}
                </div>
                <div className="text-[10px] text-charcoal-500 font-light mt-0.5">
                  {m.company}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

