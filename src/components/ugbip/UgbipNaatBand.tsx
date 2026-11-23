import React from 'react';
import Link from 'next/link';
import { SectionBadge } from '@/components/ui/SectionBadge';
import { UgbipContent } from '@/contents/programmes/ugbip';

interface UgbipNaatBandProps {
  content: UgbipContent['naatBand'];
}

export const UgbipNaatBand: React.FC<UgbipNaatBandProps> = ({ content }) => {
  // Check if NAAT date is in the future
  const isFutureDate = content.nextNaatDate
    ? new Date(content.nextNaatDate).getTime() > new Date('2026-01-01').getTime()
    : false;

  return (
    <section className="py-16 lg:py-24 bg-[#EAF7F6] border-b border-aimer-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="max-w-3xl">
          <SectionBadge>{content.badge}</SectionBadge>
          <h2 className="text-3xl sm:text-4xl font-bold font-poppins text-charcoal-900 tracking-tight mt-2">
            {content.heading}
          </h2>
          <p className="text-sm sm:text-base text-charcoal-600 font-light leading-relaxed mt-2">
            {content.subheading}
          </p>
        </div>

        {/* 4 Competency Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {content.competencies.map((c) => (
            <div
              key={c.num}
              className="p-5 sm:p-6 bg-white rounded-xl border border-aimer-200 shadow-2xs transition-transform duration-200 hover:-translate-y-1"
            >
              <div className="text-xs font-poppins font-bold text-aimer-700 bg-aimer-50 px-2 py-0.5 rounded inline-block">
                COMPETENCY {c.num}
              </div>
              <h3 className="text-base font-bold text-charcoal-900 font-poppins mt-3">
                {c.title}
              </h3>
              <p className="text-xs text-charcoal-600 font-light leading-relaxed mt-2">
                {c.description}
              </p>
            </div>
          ))}
        </div>

        {/* Action Row: CTAs & Contact */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-aimer-200/80">
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href={content.applyHref}
              className="px-6 py-3 rounded-full bg-aimer-600 hover:bg-aimer-700 text-white text-xs sm:text-sm font-semibold uppercase tracking-wider transition-colors shadow-xs"
            >
              Apply for UGBIP &rarr;
            </Link>

            <Link
              href={content.faqHref}
              className="px-5 py-3 rounded-full bg-white hover:bg-charcoal-50 text-charcoal-800 text-xs sm:text-sm font-semibold uppercase tracking-wider border border-charcoal-200 transition-colors"
            >
              Admissions Process & FAQs
            </Link>

            <a
              href={content.phoneHref}
              className="px-5 py-3 rounded-full text-aimer-800 text-xs sm:text-sm font-semibold tracking-wide hover:underline"
            >
              Ask about fees: {content.phoneText}
            </a>
          </div>

          {isFutureDate && (
            <div className="inline-flex items-center gap-2 text-xs font-poppins font-semibold text-aimer-900 bg-white px-3.5 py-2 rounded-full border border-aimer-300">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Next NAAT: 30 November 2026</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

