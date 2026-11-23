'use client';

import React, { useState } from 'react';
import { SectionBadge } from '@/components/ui/SectionBadge';
import { AboutContent } from '@/contents/about';

interface AboutValuesProps {
  content: AboutContent['values'];
}

export const AboutValues: React.FC<AboutValuesProps> = ({ content }) => {
  const [openIndex, setOpenIndex] = useState<number>(0);

  const toggleRow = (idx: number) => {
    setOpenIndex(idx);
  };

  return (
    <section id="values" className="py-20 lg:py-28 bg-white border-b border-charcoal-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="space-y-3 max-w-3xl">
          <SectionBadge>Institutional Principles</SectionBadge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-poppins text-charcoal-900 tracking-tight leading-tight">
            {content.heading}
          </h2>
        </div>

        {/* 5 Accordion Rows */}
        <div className="border-b border-charcoal-200/80">
          {content.items.map((item, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={item.num}
                className="relative border-t border-charcoal-200/80 transition-colors"
              >
                {/* Primary Draw Line Across Top Edge when Active */}
                <div
                  aria-hidden="true"
                  className="absolute top-0 left-0 right-0 h-0.5 bg-aimer-600 origin-left transition-transform duration-[800ms] ease-out pointer-events-none"
                  style={{
                    transform: isOpen ? 'scaleX(1)' : 'scaleX(0)',
                  }}
                />

                {/* Interactive Row Button */}
                <div
                  role="button"
                  tabIndex={0}
                  aria-expanded={isOpen}
                  onClick={() => toggleRow(idx)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      toggleRow(idx);
                    }
                  }}
                  className="w-full py-8 sm:py-10 flex items-center justify-between cursor-pointer select-none group text-left outline-none focus-visible:ring-2 focus-visible:ring-aimer-500 focus-visible:ring-offset-2"
                >
                  <div className="flex items-center gap-6 sm:gap-12 flex-1">
                    {/* Index Number */}
                    <span className="text-xs sm:text-sm font-poppins font-bold text-aimer-700 tracking-wider shrink-0">
                      {item.num}
                    </span>

                    {/* Title with 10px Right Shift when Active */}
                    <h3
                      className="font-poppins font-semibold tracking-tight transition-all duration-300 text-[clamp(1.625rem,3.5vw,3.125rem)]"
                      style={{
                        transform: isOpen ? 'translateX(10px)' : 'translateX(0)',
                        color: isOpen ? '#171B1D' : '#8D9A9F',
                      }}
                    >
                      {item.title}
                    </h3>
                  </div>

                  {/* Plus to Minus Icon */}
                  <div
                    aria-hidden="true"
                    className="w-8 h-8 rounded-full border border-charcoal-200 flex items-center justify-center shrink-0 relative transition-colors group-hover:border-aimer-500"
                  >
                    {/* Horizontal Line */}
                    <span className="absolute w-3.5 h-[1.5px] bg-charcoal-800 transition-colors group-hover:bg-aimer-600" />
                    {/* Vertical Line (rotates and scales to 0 when open) */}
                    <span
                      className="absolute w-[1.5px] h-3.5 bg-charcoal-800 transition-all duration-300 group-hover:bg-aimer-600 origin-center"
                      style={{
                        transform: isOpen ? 'rotate(90deg) scale(0)' : 'rotate(0deg) scale(1)',
                        opacity: isOpen ? 0 : 1,
                      }}
                    />
                  </div>
                </div>

                {/* Expandable Description using Grid 0fr to 1fr */}
                <div
                  className="grid transition-all duration-500 ease-in-out overflow-hidden"
                  style={{
                    gridTemplateRows: isOpen ? '1fr' : '0fr',
                  }}
                >
                  <div className="min-h-0">
                    <div className="pb-8 sm:pb-10 pl-10 sm:pl-20 max-w-3xl">
                      <p
                        className="text-base sm:text-lg text-charcoal-700 font-light leading-relaxed transition-opacity duration-500"
                        style={{
                          opacity: isOpen ? 1 : 0,
                          transform: isOpen ? 'translateY(0)' : 'translateY(8px)',
                          transition: 'opacity 0.5s ease-out, transform 0.5s ease-out',
                        }}
                      >
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

