import React from 'react';
import Link from 'next/link';
import { SectionBadge } from '@/components/ui/SectionBadge';
import { PgbipContent } from '@/contents/programmes/pgbip';
import { PgbipVideoFacade } from './PgbipVideoFacade';

interface PgbipWireframeHeroProps {
  content: PgbipContent['hero'];
  onOpenBrochure?: () => void;
}

export const PgbipWireframeHero: React.FC<PgbipWireframeHeroProps> = ({
  content,
  onOpenBrochure,
}) => {
  return (
    <section className="relative pt-28 pb-16 lg:pt-36 lg:pb-24 bg-gradient-to-b from-[#F6FAFA] via-[#F8FCFC] to-white text-charcoal-900 overflow-hidden border-b border-charcoal-200/60">
      {/* Background Subtle Curved Wireframe Lines */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-20 overflow-hidden"
      >
        <svg
          viewBox="0 0 1440 800"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full object-cover"
        >
          <g stroke="#168C9B" strokeWidth="1" strokeOpacity="0.4">
            <path d="M-100 200 C300 100, 800 350, 1540 150" />
            <path d="M-100 280 C300 180, 800 430, 1540 230" />
            <path d="M-100 360 C300 260, 800 510, 1540 310" />
            <path d="M-100 440 C300 340, 800 590, 1540 390" />
            <path d="M-100 520 C300 420, 800 670, 1540 470" />
            <path d="M-100 600 C300 500, 800 750, 1540 550" />
            <path d="M-100 680 C300 580, 800 830, 1540 630" />
          </g>
        </svg>
      </div>

      {/* Atmospheric Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-aimer-100/30 blur-3xl rounded-full pointer-events-none" />

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
          <span className="text-aimer-700 font-semibold">PGBIP</span>
        </nav>

        {/* Hero Copy Area */}
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

          {/* Key Specifications Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-6 border-y border-charcoal-200/70 mt-6">
            <div className="p-3 rounded-lg bg-white border border-charcoal-200/80 shadow-2xs">
              <div className="text-[10px] font-poppins uppercase tracking-wider text-charcoal-400">
                Duration
              </div>
              <div className="text-xs sm:text-sm font-semibold text-charcoal-900 font-poppins mt-0.5">
                {content.quickStats.duration}
              </div>
            </div>

            <div className="p-3 rounded-lg bg-white border border-charcoal-200/80 shadow-2xs">
              <div className="text-[10px] font-poppins uppercase tracking-wider text-charcoal-400">
                Delivery Mode
              </div>
              <div className="text-xs sm:text-sm font-semibold text-charcoal-900 font-poppins mt-0.5">
                {content.quickStats.mode}
              </div>
            </div>

            <div className="p-3 rounded-lg bg-white border border-charcoal-200/80 shadow-2xs">
              <div className="text-[10px] font-poppins uppercase tracking-wider text-charcoal-400">
                Residencies
              </div>
              <div className="text-xs sm:text-sm font-semibold text-aimer-700 font-poppins mt-0.5">
                {content.quickStats.internship}
              </div>
            </div>

            <div className="p-3 rounded-lg bg-white border border-charcoal-200/80 shadow-2xs">
              <div className="text-[10px] font-poppins uppercase tracking-wider text-charcoal-400">
                Peak Placement
              </div>
              <div className="text-xs sm:text-sm font-semibold text-charcoal-900 font-poppins mt-0.5">
                {content.quickStats.peakPackage}
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3.5 pt-2">
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

          {/* Feature Pills */}
          <div className="flex flex-wrap gap-2 pt-2">
            {content.pills.map((pill, idx) => (
              <span
                key={idx}
                className="px-3 py-1 rounded-full bg-white border border-charcoal-200/80 text-xs text-charcoal-600 font-light shadow-2xs"
              >
                ✓ {pill}
              </span>
            ))}
          </div>
        </div>

        {/* Video Facade Container */}
        <div className="mt-12 lg:mt-16">
          <PgbipVideoFacade
            youtubeId={content.video.youtubeId}
            title={content.video.title}
            runtime={content.video.runtime}
            poster={content.video.poster}
          />
        </div>
      </div>
    </section>
  );
};
