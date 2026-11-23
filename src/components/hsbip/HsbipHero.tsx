import React from 'react';
import Link from 'next/link';
import { SectionBadge } from '@/components/ui/SectionBadge';
import { HsbipVideoFacade } from './HsbipVideoFacade';
import { HsbipWireframeLines } from './HsbipWireframeLines';
import { HsbipContent } from '@/contents/programmes/hsbip';

interface HsbipHeroProps {
  content: HsbipContent['hero'];
  onOpenBrochure?: () => void;
}

export const HsbipHero: React.FC<HsbipHeroProps> = ({ content, onOpenBrochure }) => {
  return (
    <section className="relative pt-28 pb-16 lg:pt-36 lg:pb-24 bg-gradient-to-b from-[#F6FAFA] via-[#F8FCFC] to-white border-b border-charcoal-200/60 overflow-hidden">
      {/* Subtle Curved Wireframe Background Lines from PGBIP */}
      <HsbipWireframeLines opacity={0.25} height={320} className="-top-8" />

      {/* Subtle Radial Glow */}
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
          <span className="text-aimer-700 font-semibold">HSBIP</span>
        </nav>

        {/* Hero Grid: Left Copy & Right Video */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Headlines, Specs & CTAs (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-3">
              <SectionBadge>{content.eyebrow}</SectionBadge>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-poppins text-charcoal-900 tracking-tight leading-[1.1]">
                {content.title}{' '}
                <span className="text-aimer-600 font-normal italic">
                  {content.titleAccent}
                </span>
              </h1>

              <p className="text-base sm:text-lg text-charcoal-600 font-light leading-relaxed max-w-2xl pt-1">
                {content.subtitle}
              </p>
            </div>

            {/* Quick Specifications Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-5 border-y border-charcoal-200/70">
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
                  Mode
                </div>
                <div className="text-xs sm:text-sm font-semibold text-charcoal-900 font-poppins mt-0.5">
                  {content.quickStats.mode}
                </div>
              </div>

              <div>
                <div className="text-[10px] font-poppins uppercase tracking-wider text-charcoal-400">
                  Curriculum Board
                </div>
                <div className="text-xs sm:text-sm font-semibold text-aimer-700 font-poppins mt-0.5">
                  {content.quickStats.board}
                </div>
              </div>

              <div>
                <div className="text-[10px] font-poppins uppercase tracking-wider text-charcoal-400">
                  Location
                </div>
                <div className="text-xs sm:text-sm font-semibold text-charcoal-900 font-poppins mt-0.5">
                  {content.quickStats.campus}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-1">
              <Link
                href={content.ctas.primaryHref}
                className="px-8 py-3.5 rounded-full bg-aimer-600 text-white font-medium text-sm tracking-wide transition-all duration-200 hover:bg-aimer-700 hover:shadow-lg active:scale-95 shadow-md flex items-center gap-2"
              >
                <span>{content.ctas.primaryText}</span>
                <span className="text-xs">&rarr;</span>
              </Link>

              <button
                type="button"
                onClick={onOpenBrochure}
                className="px-7 py-3.5 rounded-full border border-charcoal-300 text-charcoal-800 font-medium text-sm tracking-wide transition-all duration-200 hover:border-aimer-600 hover:text-aimer-700 hover:bg-white active:scale-95 inline-flex items-center gap-2 cursor-pointer shadow-2xs"
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

            {/* 4 Feature Highlight Chips */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              {content.highlights.map((h, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-white border border-charcoal-200/80 shadow-sm flex flex-col justify-between"
                >
                  <span className="text-[10px] uppercase font-poppins tracking-wider text-aimer-700 font-semibold">
                    {h.label}
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-charcoal-900 mt-0.5 line-clamp-1">
                    {h.value}
                  </span>
                  {h.detail && (
                    <span className="text-[11px] text-charcoal-500 font-light mt-0.5 line-clamp-1">
                      {h.detail}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Video Facade (5 cols) */}
          <div className="lg:col-span-5">
            <HsbipVideoFacade
              youtubeId={content.video.youtubeId}
              title={content.video.title}
              runtime={content.video.runtime}
              locationNote={content.video.locationNote}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

