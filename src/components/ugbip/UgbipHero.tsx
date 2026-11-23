import React from 'react';
import Link from 'next/link';
import { SectionBadge } from '@/components/ui/SectionBadge';
import { UgbipVideoFacade } from './UgbipVideoFacade';
import { UgbipContent } from '@/contents/programmes/ugbip';

interface UgbipHeroProps {
  content: UgbipContent['hero'];
  onOpenBrochure?: () => void;
}

export const UgbipHero: React.FC<UgbipHeroProps> = ({ content, onOpenBrochure }) => {
  return (
    <section className="relative pt-28 pb-16 lg:pt-36 lg:pb-24 bg-gradient-to-b from-[#F6FAFA] via-[#F8FCFC] to-white border-b border-charcoal-200/60 overflow-hidden">
      {/* Background Subtle Gradient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-aimer-100/30 blur-3xl pointer-events-none rounded-full" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-xs font-poppins uppercase tracking-wider text-charcoal-500 mb-6"
        >
          <Link href="/" className="hover:text-aimer-600 transition-colors">
            Home
          </Link>
          <span className="text-charcoal-300">/</span>
          <Link href="/#programmes" className="hover:text-aimer-600 transition-colors">
            Programmes
          </Link>
          <span className="text-charcoal-300">/</span>
          <span className="text-aimer-700 font-semibold">UGBIP</span>
        </nav>

        {/* Hero Header Area */}
        <div className="max-w-4xl space-y-4">
          <SectionBadge>{content.badge}</SectionBadge>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-poppins text-charcoal-900 tracking-tight leading-[1.1]">
            {content.title}{' '}
            <span className="text-aimer-600 font-normal">
              {content.titleAccent}
            </span>
          </h1>

          <p className="text-base sm:text-lg text-charcoal-600 font-light leading-relaxed max-w-3xl pt-2">
            {content.subtitle}
          </p>

          {/* Quick Specifications Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-6 border-y border-charcoal-200/70 mt-6">
            <div>
              <div className="text-[10px] font-poppins uppercase tracking-wider text-charcoal-400">
                Duration
              </div>
              <div className="text-xs sm:text-sm font-semibold text-charcoal-900 font-poppins mt-0.5">
                {content.quickStats.duration}
              </div>
            </div>

            <div>
              <div className="text-[10px] font-poppins uppercase tracking-wider text-charcoal-400">
                Pedagogy Mode
              </div>
              <div className="text-xs sm:text-sm font-semibold text-charcoal-900 font-poppins mt-0.5">
                {content.quickStats.mode}
              </div>
            </div>

            <div>
              <div className="text-[10px] font-poppins uppercase tracking-wider text-charcoal-400">
                Practicum Split
              </div>
              <div className="text-xs sm:text-sm font-semibold text-aimer-700 font-poppins mt-0.5">
                {content.quickStats.practicum}
              </div>
            </div>

            <div>
              <div className="text-[10px] font-poppins uppercase tracking-wider text-charcoal-400">
                Degrees Conferred
              </div>
              <div className="text-xs sm:text-sm font-semibold text-charcoal-900 font-poppins mt-0.5">
                {content.quickStats.credential}
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3.5 pt-4">
            <Link
              href={content.ctas.primaryHref}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-aimer-600 hover:bg-aimer-700 text-white text-xs sm:text-sm font-semibold uppercase tracking-wider shadow-sm transition-all duration-200 group"
            >
              <span>{content.ctas.primaryText}</span>
              <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">
                &rarr;
              </span>
            </Link>

            <button
              type="button"
              onClick={onOpenBrochure}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white hover:bg-charcoal-50 text-charcoal-800 text-xs sm:text-sm font-semibold uppercase tracking-wider border border-charcoal-300 transition-colors shadow-2xs cursor-pointer active:scale-95"
            >
              <span>Download Brochure</span>
              <svg
                className="w-4 h-4 text-aimer-600"
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

        {/* Video Facade Container */}
        <div className="mt-12 lg:mt-16">
          <UgbipVideoFacade
            youtubeId={content.video.youtubeId}
            title={content.video.title}
            runtime={content.video.runtime}
            poster={content.video.poster}
          />
        </div>

        {/* 4-Item Highlights Ledger */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-8 pt-8 border-t border-charcoal-200/80">
          {content.highlights.map((item, idx) => (
            <div
              key={idx}
              className="p-4 sm:p-5 bg-white rounded-xl border border-charcoal-200/80 shadow-2xs"
            >
              <div className="text-[10px] sm:text-[11px] font-poppins uppercase tracking-wider text-charcoal-400">
                {item.label}
              </div>
              <div className="text-xl sm:text-2xl font-bold font-poppins text-aimer-800 tracking-tight mt-1">
                {item.value}
              </div>
              {item.detail && (
                <div className="text-xs text-charcoal-600 font-light mt-0.5">
                  {item.detail}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

