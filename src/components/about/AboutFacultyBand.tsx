import React from 'react';
import Link from 'next/link';
import { SectionBadge } from '@/components/ui/SectionBadge';
import { AboutContent } from '@/contents/about';

interface AboutFacultyBandProps {
  content: AboutContent['faculty'];
}

export const AboutFacultyBand: React.FC<AboutFacultyBandProps> = ({ content }) => {
  return (
    <section id="faculty" className="py-20 lg:py-24 bg-white border-b border-charcoal-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl space-y-6">
          <SectionBadge>{content.eyebrow}</SectionBadge>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-poppins text-charcoal-900 tracking-tight leading-tight">
            {content.heading}
          </h2>

          {/* Rendered exactly as written from the scraped source */}
          {/* TODO: Client must confirm the wording (source: "25% faculty, 25% visiting faculty and industry experts from companies across Kerala.") */}
          <p className="text-base sm:text-lg text-charcoal-700 font-light leading-relaxed max-w-3xl">
            {content.description}
          </p>

          {/* Action Buttons */}
          <div className="pt-2 flex flex-wrap items-center gap-4">
            <Link
              href={content.seeFacultyHref}
              className="px-8 py-3.5 rounded-full bg-aimer-600 hover:bg-aimer-700 text-white font-poppins font-semibold text-xs sm:text-sm uppercase tracking-wider transition-all duration-200 shadow-xs active:scale-95"
            >
              See the faculty &rarr;
            </Link>

            <Link
              href={content.teachHref}
              className="px-7 py-3.5 rounded-full border border-charcoal-300 hover:border-aimer-600 text-charcoal-800 hover:text-aimer-700 font-poppins font-semibold text-xs sm:text-sm uppercase tracking-wider transition-colors active:scale-95 bg-white"
            >
              Teach at AIMER
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

