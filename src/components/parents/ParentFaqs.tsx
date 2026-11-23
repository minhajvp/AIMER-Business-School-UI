'use client';

import React, { useState } from 'react';
import { SectionBadge } from '@/components/ui/SectionBadge';
import { ParentsContent } from '@/contents/parents';

interface ParentFaqsProps {
  content: ParentsContent['faqs'];
}

export const ParentFaqs: React.FC<ParentFaqsProps> = ({ content }) => {
  // All questions closed by default; only shows after clicking a question
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleRow = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <section id="faqs" className="py-20 lg:py-28 bg-white border-b border-charcoal-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="space-y-3 max-w-3xl">
          <SectionBadge>{content.eyebrow}</SectionBadge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-poppins text-charcoal-900 tracking-tight leading-tight">
            {content.heading}
          </h2>
          <p className="text-sm sm:text-base text-charcoal-600 font-light leading-relaxed">
            {content.description}
          </p>
        </div>

        {/* Accordion Rows */}
        <div className="border-b border-charcoal-200/80">
          {content.items.map((item, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div key={idx} className="relative">
                {/* ScaleX hairline top border (animates from left on expand) */}
                <div
                  aria-hidden="true"
                  style={{
                    transform: isOpen ? 'scaleX(1)' : 'scaleX(0)',
                    transformOrigin: 'left',
                    transition: 'transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)',
                  }}
                  className="absolute top-0 left-0 right-0 h-[2px] bg-aimer-600 z-10 pointer-events-none"
                />

                {/* Static hairline divider */}
                <div className="w-full h-px bg-charcoal-200/80" />

                {/* Accordion Header Button */}
                <button
                  type="button"
                  id={`faq-question-${idx}`}
                  onClick={() => toggleRow(idx)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${idx}`}
                  className="w-full py-6 sm:py-8 flex items-center justify-between text-left group focus:outline-none cursor-pointer select-none"
                >
                  <div className="flex items-baseline gap-4 sm:gap-6 pr-4">
                    <span className="text-xs sm:text-sm font-poppins font-bold text-aimer-600 shrink-0">
                      0{idx + 1}
                    </span>

                    <span
                      style={{
                        transform: isOpen ? 'translateX(8px)' : 'translateX(0)',
                        transition: 'transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)',
                      }}
                      className={`text-lg sm:text-xl lg:text-2xl font-bold font-poppins transition-colors duration-200 ${
                        isOpen
                          ? 'text-aimer-700'
                          : 'text-charcoal-900 group-hover:text-aimer-700'
                      }`}
                    >
                      {item.question}
                    </span>
                  </div>

                  {/* Plus / Minus Indicator (clean minus on open, plus on close) */}
                  <span
                    className={`w-9 h-9 rounded-full border flex items-center justify-center shrink-0 transition-colors duration-200 ${
                      isOpen
                        ? 'border-aimer-600 bg-aimer-50 text-aimer-700'
                        : 'border-charcoal-300 text-charcoal-600 group-hover:border-aimer-600 group-hover:text-aimer-700 bg-white'
                    }`}
                  >
                    <svg
                      className="w-4 h-4 transition-transform duration-200"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      {isOpen ? (
                        <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
                      ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                      )}
                    </svg>
                  </span>
                </button>

                {/* Collapsible Content: zero height and invisible until clicked */}
                <div
                  id={`faq-answer-${idx}`}
                  role="region"
                  aria-labelledby={`faq-question-${idx}`}
                  style={{
                    maxHeight: isOpen ? '400px' : '0px',
                    opacity: isOpen ? 1 : 0,
                    transition:
                      'max-height 0.35s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.25s ease-in-out',
                  }}
                  className="overflow-hidden"
                >
                  <div className="pb-8 pl-10 sm:pl-12 max-w-4xl pt-1">
                    <p className="text-sm sm:text-base text-charcoal-600 font-light leading-relaxed">
                      {item.answer}
                    </p>
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
