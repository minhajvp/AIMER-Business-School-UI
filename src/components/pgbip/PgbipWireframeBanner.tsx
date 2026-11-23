import React from 'react';
import Link from 'next/link';
import { PgbipContent } from '@/contents/programmes/pgbip';

interface PgbipWireframeBannerProps {
  content: PgbipContent['campusBanner'];
}

export const PgbipWireframeBanner: React.FC<PgbipWireframeBannerProps> = ({ content }) => {
  return (
    <section className="relative py-14 sm:py-16 bg-[#EAF7F6] overflow-hidden border-y border-aimer-200">
      {/* Background Radiating Curved Contour Lines (Matching Image 2 in AIMER's clean palette) */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-40 overflow-hidden flex items-center justify-center"
      >
        <svg
          viewBox="0 0 1600 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full object-cover"
        >
          <g stroke="#168C9B" strokeWidth="0.85" strokeOpacity="0.35">
            <ellipse cx="800" cy="100" rx="900" ry="80" />
            <ellipse cx="800" cy="100" rx="800" ry="70" />
            <ellipse cx="800" cy="100" rx="700" ry="60" />
            <ellipse cx="800" cy="100" rx="600" ry="50" />
            <ellipse cx="800" cy="100" rx="500" ry="40" />
            <ellipse cx="800" cy="100" rx="400" ry="30" />
            <ellipse cx="800" cy="100" rx="300" ry="20" />
          </g>
        </svg>
      </div>

      {/* Content */}
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 text-center">
        <p className="text-xs sm:text-sm md:text-base text-charcoal-800 font-light leading-relaxed">
          <span>{content.quote}</span>{' '}
          <Link
            href={content.linkHref}
            className="text-aimer-700 hover:text-aimer-800 underline font-semibold transition-colors inline-block ml-1"
          >
            {content.linkText}
          </Link>
        </p>
      </div>
    </section>
  );
};
