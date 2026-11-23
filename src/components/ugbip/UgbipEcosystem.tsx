import React from 'react';
import { UgbipContent } from '@/contents/programmes/ugbip';

interface UgbipEcosystemProps {
  content: UgbipContent['ecosystem'];
}

export const UgbipEcosystem: React.FC<UgbipEcosystemProps> = ({ content }) => {
  return (
    <section className="py-12 bg-charcoal-50/70 border-b border-charcoal-200/60 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="text-[11px] font-poppins font-semibold uppercase tracking-widest text-aimer-700">
            {content.heading}
          </div>
          <p className="text-xs text-charcoal-500 font-light mt-1">
            {content.subheading}
          </p>
        </div>

        {/* Partners Grid */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          {content.partners.map((partner, idx) => (
            <div
              key={idx}
              className="px-4 py-2.5 bg-white rounded-lg border border-charcoal-200 text-xs sm:text-sm font-medium text-charcoal-700 shadow-2xs hover:border-aimer-500 hover:text-aimer-800 transition-colors"
            >
              {partner}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

