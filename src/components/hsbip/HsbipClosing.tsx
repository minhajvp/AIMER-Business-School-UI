import React from 'react';
import Link from 'next/link';
import { HsbipWireframeLines } from './HsbipWireframeLines';

export const HsbipClosing: React.FC = () => {
  return (
    <section className="py-20 lg:py-24 bg-charcoal-950 text-white relative overflow-hidden">
      {/* Background Subtle Wireframe Lines */}
      <HsbipWireframeLines opacity={0.15} height={300} strokeColor="#96D3D5" />

      {/* Background Subtle Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-aimer-600/10 blur-[120px] pointer-events-none rounded-full" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-aimer-950/80 border border-aimer-800/80 text-aimer-400 text-[10px] font-poppins tracking-widest uppercase">
            <span>Markaz Knowledge City</span>
            <span>·</span>
            <span>Admissions 2026–27 Open</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-poppins text-white tracking-tight leading-tight">
            Launch Your Commerce & Venture Journey at AIMER
          </h2>

          <p className="text-sm sm:text-base text-charcoal-300 font-light leading-relaxed max-w-2xl mx-auto">
            A transformative 2-year residential ecosystem combining standard Kerala State Board Plus One & Plus Two academics with early venture incubation.
          </p>

          {/* 3 Highlights */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <div className="flex items-center gap-2 text-xs sm:text-[13px] text-charcoal-200">
              <span className="w-1.5 h-1.5 rounded-full bg-aimer-400" />
              <span>Full SCOLE Kerala Commerce Board Recognition</span>
            </div>
            <div className="flex items-center gap-2 text-xs sm:text-[13px] text-charcoal-200">
              <span className="w-1.5 h-1.5 rounded-full bg-aimer-400" />
              <span>Junior Venture Studio Incubation</span>
            </div>
            <div className="flex items-center gap-2 text-xs sm:text-[13px] text-charcoal-200">
              <span className="w-1.5 h-1.5 rounded-full bg-aimer-400" />
              <span>100% Residential Campus Security</span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-6 flex flex-wrap items-center justify-center gap-3.5">
            <Link
              href="#admission"
              className="px-8 py-3.5 rounded-full bg-aimer-600 hover:bg-aimer-500 text-white text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all duration-200 shadow-md"
            >
              Apply for HSBIP &rarr;
            </Link>

            <a
              href="https://wa.me/917450030600?text=Hi%20AIMER,%20I%20would%20like%20to%20talk%20to%20an%20admissions%20counsellor%20regarding%20HSBIP"
              target="_blank"
              rel="noopener noreferrer"
              className="px-7 py-3.5 rounded-full bg-charcoal-900 hover:bg-charcoal-800 text-charcoal-200 text-xs sm:text-sm font-semibold uppercase tracking-wider border border-charcoal-800 transition-colors"
            >
              Talk to a Counsellor
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

