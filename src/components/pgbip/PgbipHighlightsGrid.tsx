import React from 'react';
import { SectionBadge } from '@/components/ui/SectionBadge';
import { PgbipContent } from '@/contents/programmes/pgbip';

interface PgbipHighlightsGridProps {
  content: PgbipContent['highlights'];
}

export const PgbipHighlightsGrid: React.FC<PgbipHighlightsGridProps> = ({ content }) => {
  return (
    <section id="highlights" className="py-20 lg:py-28 bg-white text-charcoal-900 border-b border-charcoal-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 lg:mb-16 space-y-3">
          <SectionBadge>PRACTICUM & RESIDENCY PEDAGOGY</SectionBadge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-poppins text-charcoal-900 tracking-tight">
            {content.heading}
          </h2>
          <p className="text-sm sm:text-base text-charcoal-600 font-light leading-relaxed pt-1">
            {content.subheading}
          </p>
        </div>

        {/* 2-Column Grid (Directly matching Image 1 layout in clean white theme) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {content.items.map((item) => (
            <div
              key={item.id}
              className="group flex flex-col sm:flex-row items-center gap-5 p-5 sm:p-6 rounded-2xl bg-[#F8FCFC] border border-charcoal-200/90 hover:border-aimer-500 hover:bg-white hover:shadow-md transition-all duration-300"
            >
              {/* Left Photo (Image 1 layout) */}
              <div className="w-full sm:w-48 lg:w-52 h-44 sm:h-36 rounded-xl overflow-hidden shrink-0 relative bg-aimer-50 border border-charcoal-200">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80';
                  }}
                />
              </div>

              {/* Right Content Block (Image 1 layout) */}
              <div className="flex-1 space-y-1.5 min-w-0">
                <h3 className="text-lg sm:text-xl font-bold font-poppins text-charcoal-900 tracking-tight group-hover:text-aimer-800 transition-colors">
                  {item.title}
                </h3>

                {item.badge && (
                  <div className="text-xs sm:text-[13px] font-semibold text-aimer-700 font-poppins">
                    {item.badge}
                  </div>
                )}

                <p className="text-xs sm:text-sm text-charcoal-600 leading-relaxed font-light pt-0.5">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
