import React from 'react';
import { HsbipContent } from '@/contents/programmes/hsbip';

interface HsbipEcosystemStripProps {
  content: HsbipContent['ecosystem'];
}

export const HsbipEcosystemStrip: React.FC<HsbipEcosystemStripProps> = ({ content }) => {
  return (
    <section className="py-8 bg-white border-b border-charcoal-200/70 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4 text-center">
        <p className="text-[11px] font-poppins uppercase tracking-widest text-charcoal-500 font-medium">
          {content.heading}
        </p>
      </div>

      {/* Seamless Marquee */}
      <div className="relative w-full overflow-hidden flex items-center">
        {/* Left & Right Fade Masks */}
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        <div className="flex animate-marquee-left whitespace-nowrap pause-on-hover gap-8 sm:gap-12 items-center">
          {[...content.partners, ...content.partners].map((partner, idx) => (
            <div
              key={idx}
              className="flex items-center gap-6 sm:gap-8 text-charcoal-800 font-poppins font-medium text-xs sm:text-sm tracking-wide"
            >
              <span className="hover:text-aimer-600 transition-colors cursor-default">
                {partner}
              </span>
              <span className="text-charcoal-300 select-none text-xs">•</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

