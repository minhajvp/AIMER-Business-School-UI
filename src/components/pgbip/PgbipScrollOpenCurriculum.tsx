'use client';

import React, { useState } from 'react';
import { SectionBadge } from '@/components/ui/SectionBadge';
import { PgbipContent } from '@/contents/programmes/pgbip';

interface PgbipScrollOpenCurriculumProps {
  content: PgbipContent['scrollOpenCurriculum'];
}

export const PgbipScrollOpenCurriculum: React.FC<PgbipScrollOpenCurriculumProps> = ({
  content,
}) => {
  // Store expanded semester indices; default to first two open
  const [expandedIndices, setExpandedIndices] = useState<number[]>([0, 1]);

  const toggleIndex = (idx: number) => {
    setExpandedIndices((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  const toggleAll = () => {
    if (expandedIndices.length === content.semesters.length) {
      setExpandedIndices([]);
    } else {
      setExpandedIndices(content.semesters.map((_, i) => i));
    }
  };

  return (
    <section id="curriculum" className="py-20 lg:py-28 bg-[#F6FAFA] text-charcoal-900 border-b border-charcoal-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 lg:mb-16">
          <div className="max-w-2xl space-y-3">
            <SectionBadge>4-SEMESTER EXECUTIVE ROADMAP</SectionBadge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-poppins text-charcoal-900 tracking-tight">
              {content.heading}
            </h2>
            <p className="text-sm sm:text-base text-charcoal-600 font-light leading-relaxed pt-1">
              {content.subheading}
            </p>
          </div>

          {/* Toggle All Button */}
          <button
            type="button"
            onClick={toggleAll}
            className="self-start md:self-auto px-4 py-2 rounded-full border border-charcoal-300 hover:border-aimer-600 bg-white text-xs font-poppins text-charcoal-700 transition-colors cursor-pointer shadow-2xs"
          >
            {expandedIndices.length === content.semesters.length
              ? 'Collapse All Tracks −'
              : 'Expand All Tracks +'}
          </button>
        </div>

        {/* Scroll-Open Expandable Cards */}
        <div className="space-y-4">
          {content.semesters.map((sem, idx) => {
            const isExpanded = expandedIndices.includes(idx);
            const isResidency = sem.semester.includes('02') || sem.semester.includes('04');

            return (
              <div
                key={sem.semester}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isExpanded
                    ? 'bg-white border-aimer-500 shadow-md'
                    : 'bg-white border-charcoal-200 hover:border-charcoal-300'
                }`}
              >
                {/* Header (Always Visible, Clickable) */}
                <button
                  type="button"
                  onClick={() => toggleIndex(idx)}
                  aria-expanded={isExpanded}
                  className="w-full text-left p-5 sm:p-7 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer focus:outline-none"
                >
                  <div className="flex items-start sm:items-center gap-4">
                    <span
                      className={`text-xs font-poppins font-bold px-3 py-1 rounded-full uppercase tracking-wider ${
                        isResidency
                          ? 'bg-aimer-100 text-aimer-800 border border-aimer-300'
                          : 'bg-charcoal-100 text-charcoal-800 border border-charcoal-200'
                      }`}
                    >
                      {sem.semester}
                    </span>

                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-charcoal-900 font-poppins">
                        {sem.title}
                      </h3>
                      <div className="text-xs text-charcoal-500 font-light mt-0.5">
                        {sem.phase}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 self-end md:self-auto">
                    {/* Deliverable Pill */}
                    <span className="text-[11px] font-poppins text-aimer-800 bg-aimer-50 px-3 py-1 rounded-full border border-aimer-200 hidden sm:inline-block">
                      Deliverable: {sem.deliverable}
                    </span>

                    {/* Expand/Collapse Chevron */}
                    <div
                      className={`w-8 h-8 rounded-full border border-charcoal-200 flex items-center justify-center text-charcoal-700 transition-transform duration-300 ${
                        isExpanded ? 'rotate-180 bg-aimer-50 text-aimer-700 border-aimer-300' : 'bg-charcoal-50'
                      }`}
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </button>

                {/* Scroll-Open Content Body (Smooth expansion) */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateRows: isExpanded ? '1fr' : '0fr',
                    transition: 'grid-template-rows 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                  className="overflow-hidden"
                >
                  <div className="min-h-0 px-5 sm:px-7 pb-6 pt-2 border-t border-charcoal-100 space-y-4">
                    {/* Focus Description */}
                    <p className="text-xs sm:text-sm text-charcoal-600 font-light leading-relaxed">
                      {sem.focus}
                    </p>

                    {/* Modules Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      {sem.modules.map((mod, mIdx) => (
                        <div
                          key={mIdx}
                          className="flex items-center gap-2.5 p-3 rounded-lg bg-charcoal-50/70 border border-charcoal-200/80 text-xs sm:text-[13px] text-charcoal-800 font-medium"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-aimer-600 shrink-0" />
                          <span>{mod}</span>
                        </div>
                      ))}
                    </div>

                    {/* Milestone Banner */}
                    <div className="p-3.5 rounded-xl bg-aimer-50/80 border border-aimer-200 flex items-center justify-between text-xs">
                      <span className="font-poppins text-aimer-800 font-semibold uppercase">
                        Semester Benchmark Outcome
                      </span>
                      <span className="text-charcoal-900 font-medium">{sem.deliverable}</span>
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
