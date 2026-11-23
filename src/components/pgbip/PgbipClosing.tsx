import React from 'react';
import Link from 'next/link';
import { PgbipContent } from '@/contents/programmes/pgbip';

interface PgbipClosingProps {
  content: PgbipContent['closing'];
}

export const PgbipClosing: React.FC<PgbipClosingProps> = ({ content }) => {
  return (
    <section className="py-20 lg:py-24 bg-charcoal-950 text-white relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-aimer-600/10 blur-[120px] pointer-events-none rounded-full" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-aimer-950/80 border border-aimer-800/80 text-aimer-400 text-[10px] font-poppins tracking-widest uppercase">
            <span>{content.badge}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-poppins text-white tracking-tight leading-tight">
            {content.heading}
          </h2>

          <p className="text-sm sm:text-base text-charcoal-300 font-light leading-relaxed max-w-2xl mx-auto">
            {content.description}
          </p>

          {/* Perks Checklist */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            {content.perks.map((perk, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 text-xs sm:text-[13px] text-charcoal-200"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-aimer-400" />
                <span>{perk}</span>
              </div>
            ))}
          </div>

          {/* Action CTAs */}
          <div className="pt-6 flex flex-wrap items-center justify-center gap-3.5">
            <Link
              href={content.applyHref}
              className="px-8 py-3.5 rounded-full bg-aimer-600 hover:bg-aimer-500 text-white text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all duration-200 shadow-md"
            >
              Apply via NAAT &rarr;
            </Link>

            <a
              href={content.counsellorHref}
              target="_blank"
              rel="noopener noreferrer"
              className="px-7 py-3.5 rounded-full bg-charcoal-900 hover:bg-charcoal-800 text-charcoal-200 text-xs sm:text-sm font-semibold uppercase tracking-wider border border-charcoal-800 transition-colors"
            >
              Talk to a Counsellor
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
