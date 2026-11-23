'use client';

import React from 'react';
import Link from 'next/link';
import { ParentsContent } from '@/contents/parents';

interface ParentClosingProps {
  content: ParentsContent['closing'];
  onOpenBrochure: () => void;
}

export const ParentClosing: React.FC<ParentClosingProps> = ({ content, onOpenBrochure }) => {
  return (
    <section className="py-20 lg:py-24 bg-charcoal-950 text-white relative overflow-hidden">
      {/* Subtle Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-aimer-600/10 blur-[120px] pointer-events-none rounded-full" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-aimer-950/80 border border-aimer-800/80 text-aimer-400 text-[10px] font-poppins tracking-widest uppercase">
            <span>{content.badge}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-poppins text-white tracking-tight leading-tight">
            {content.heading}
          </h2>

          <p className="text-sm sm:text-base text-charcoal-300 font-light leading-relaxed max-w-2xl mx-auto">
            {content.description}
          </p>

          {/* 3 Bullets */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            {content.bullets.map((bullet, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 text-xs sm:text-[13px] text-charcoal-200"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-aimer-400 shrink-0" />
                <span>{bullet}</span>
              </div>
            ))}
          </div>

          {/* Action CTAs */}
          <div className="pt-6 flex flex-wrap items-center justify-center gap-3.5">
            <Link
              href={content.applyHref}
              className="px-8 py-3.5 rounded-full bg-aimer-600 hover:bg-aimer-500 text-white text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all duration-200 shadow-md active:scale-95"
            >
              Apply via NAAT &rarr;
            </Link>

            <a
              href={content.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-7 py-3.5 rounded-full bg-charcoal-900 hover:bg-charcoal-800 text-charcoal-200 text-xs sm:text-sm font-semibold uppercase tracking-wider border border-charcoal-800 transition-colors"
            >
              Talk to a Counsellor
            </a>

            <button
              type="button"
              onClick={onOpenBrochure}
              className="px-7 py-3.5 rounded-full border border-charcoal-700 hover:border-aimer-500 text-charcoal-200 hover:text-white text-xs sm:text-sm font-semibold uppercase tracking-wider transition-colors inline-flex items-center gap-2 cursor-pointer"
            >
              <span>Download Brochure</span>
              <svg
                className="w-4 h-4 text-aimer-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

