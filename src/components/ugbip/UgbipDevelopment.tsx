import React from 'react';
import { SectionBadge } from '@/components/ui/SectionBadge';
import { UgbipContent } from '@/contents/programmes/ugbip';

interface UgbipDevelopmentProps {
  content: UgbipContent['development'];
}

export const UgbipDevelopment: React.FC<UgbipDevelopmentProps> = ({ content }) => {
  return (
    <section id="development" className="py-20 lg:py-28 bg-white border-b border-charcoal-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 lg:space-y-20">

        {/* Section Intro */}
        <div className="max-w-3xl space-y-3">
          <SectionBadge>{content.sectionBadge}</SectionBadge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-poppins text-charcoal-900 tracking-tight leading-tight">
            {content.heading}{' '}
            <span className="text-aimer-600 font-normal italic">
              {content.headingAccent}
            </span>
          </h2>
        </div>

        {/* Panoramic Campus Image with 3 Outcomes Overlays */}
        <div className="relative aspect-[21/9] sm:aspect-[2.4/1] rounded-2xl overflow-hidden shadow-xl border border-charcoal-200">
          <img
            src={content.panoramicImage}
            alt="AIMER Markaz Knowledge City Campus"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/80 via-charcoal-950/20 to-transparent" />

          {/* 3 Outcome Badge Overlays */}
          <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 flex flex-wrap items-center justify-between gap-3 text-white">
            <div className="text-xs sm:text-sm font-poppins uppercase tracking-widest text-aimer-300">
              CORE LEADERSHIP OUTCOMES:
            </div>
            <div className="flex flex-wrap gap-2">
              {content.outcomes.map((out, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-semibold tracking-wide border border-white/40 text-white"
                >
                  ✓ {out}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* SDP & SRC Side-by-Side Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Student Development Program */}
          <div className="p-6 sm:p-8 rounded-2xl border border-charcoal-200 bg-[#F6FAFA] space-y-4">
            <div className="text-xs font-poppins font-bold uppercase tracking-wider text-aimer-700 bg-aimer-100/70 px-2.5 py-1 rounded inline-block">
              EXECUTIVE PRESENCE
            </div>
            <h3 className="text-2xl font-bold font-poppins text-charcoal-900">
              {content.sdp.title}
            </h3>
            <p className="text-xs sm:text-sm text-charcoal-600 leading-relaxed font-light">
              {content.sdp.description}
            </p>
            <div className="pt-2 space-y-2 border-t border-aimer-200/80">
              {content.sdp.focusAreas.map((area, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs sm:text-[13px] text-charcoal-700 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-aimer-600" />
                  <span>{area}</span>
                </div>
              ))}
            </div>
          </div>

          {/* SRC Programs */}
          <div className="p-6 sm:p-8 rounded-2xl border border-charcoal-200 bg-white space-y-4 shadow-2xs">
            <div className="text-xs font-poppins font-bold uppercase tracking-wider text-charcoal-700 bg-charcoal-100 px-2.5 py-1 rounded inline-block">
              STUDENT GOVERNANCE
            </div>
            <h3 className="text-2xl font-bold font-poppins text-charcoal-900">
              {content.src.title}
            </h3>
            <p className="text-xs sm:text-sm text-charcoal-600 leading-relaxed font-light">
              {content.src.description}
            </p>
            <div className="pt-2 space-y-2 border-t border-charcoal-200">
              {content.src.pillars.map((pil, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs sm:text-[13px] text-charcoal-700 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-charcoal-800" />
                  <span>{pil}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 3-Image Campus Life Grid */}
        <div className="space-y-6">
          <div>
            <div className="text-[11px] font-poppins font-semibold uppercase tracking-widest text-aimer-700">
              {content.campusLife.eyebrow}
            </div>
            <h3 className="text-2xl font-bold font-poppins text-charcoal-900 mt-1">
              {content.campusLife.heading}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {content.campusLife.images.map((item, idx) => (
              <div
                key={idx}
                className="group relative aspect-[4/3] rounded-xl overflow-hidden shadow-sm border border-charcoal-200"
              >
                <img
                  src={item.url}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="text-[10px] font-poppins uppercase tracking-widest text-aimer-300">
                    {item.category}
                  </div>
                  <div className="text-sm font-semibold font-poppins mt-0.5">
                    {item.title}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

