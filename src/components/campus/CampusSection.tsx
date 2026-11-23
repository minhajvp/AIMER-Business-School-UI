'use client';

import React from 'react';
import Image from 'next/image';
import { SectionBadge } from '@/components/ui/SectionBadge';

export const CampusSection: React.FC = () => {
  return (
    <section id="campus" className="py-24 lg:py-32 bg-charcoal-900 text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end pb-14 border-b border-charcoal-800">
          <div className="lg:col-span-8 space-y-3">
            <SectionBadge variant="outline" className="text-aimer-300 border-aimer-500/50 bg-aimer-950/40">
              Campus Ecosystem
            </SectionBadge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white leading-tight">
              A 125-Acre Smart City Hub.{' '}
              <span className="text-aimer-400 font-normal italic block sm:inline">
                Markaz Knowledge City, Calicut.
              </span>
            </h2>
            <p className="text-sm sm:text-base text-charcoal-300 font-light max-w-2xl">
              Nestled at the foothills of the Western Ghats within South India’s premier knowledge smart city, 
              AIMER integrates modern architectural design with residential living, executive labs, and startup spaces.
            </p>
          </div>

          <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 lg:items-end">
            <div className="text-right">
              <span className="text-2xl font-bold text-aimer-400">125 Acres</span>
              <div className="text-xs text-charcoal-400 uppercase tracking-wider">Integrated Smart City</div>
            </div>
          </div>
        </div>

        {/* Editorial Visual Composition: 3-Image Asymmetrical Mosaic */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
          {/* Main Large Visual (7 cols) */}
          <div className="md:col-span-7 relative rounded-3xl overflow-hidden aspect-[16/10] sm:aspect-[16/9] md:aspect-auto min-h-[380px] shadow-xl border border-charcoal-800">
            <Image
              src="https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=1200&q=80"
              alt="AIMER Business School modern campus and amphitheatre"
              fill
              className="object-cover object-center brightness-90 hover:scale-105 transition-transform duration-700 ease-out"
              sizes="(max-width: 768px) 100vw, 60vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/90 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <span className="text-xs uppercase tracking-wider text-aimer-400 font-semibold">
                Innovation Amphitheatre & Executive Labs
              </span>
              <h3 className="text-lg sm:text-xl font-bold mt-1">
                Designed for collaborative strategy, debate, and venture pitches
              </h3>
            </div>
          </div>

          {/* Right Stack (5 cols) */}
          <div className="md:col-span-5 grid grid-cols-1 gap-6">
            {/* Upper Right Image */}
            <div className="relative rounded-3xl overflow-hidden min-h-[200px] shadow-lg border border-charcoal-800">
              <Image
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80"
                alt="Students collaborating at AIMER Venture Launchpad"
                fill
                className="object-cover object-center brightness-90 hover:scale-105 transition-transform duration-700 ease-out"
                sizes="(max-width: 768px) 100vw, 40vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/80 to-transparent" />
              <div className="absolute bottom-4 left-5 right-5 text-white">
                <div className="text-xs uppercase tracking-wider text-aimer-400 font-semibold">
                  Venture Launchpad
                </div>
                <div className="text-sm font-bold">24/7 Co-working and prototype build space</div>
              </div>
            </div>

            {/* Lower Right Image */}
            <div className="relative rounded-3xl overflow-hidden min-h-[200px] shadow-lg border border-charcoal-800">
              <Image
                src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80"
                alt="Executive masterclasses at Markaz Knowledge City"
                fill
                className="object-cover object-center brightness-90 hover:scale-105 transition-transform duration-700 ease-out"
                sizes="(max-width: 768px) 100vw, 40vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/80 to-transparent" />
              <div className="absolute bottom-4 left-5 right-5 text-white">
                <div className="text-xs uppercase tracking-wider text-aimer-400 font-semibold">
                  Residential Life
                </div>
                <div className="text-sm font-bold">Executive suites, wellness & community recreation</div>
              </div>
            </div>
          </div>
        </div>

        {/* Campus Visit Invitation Bar */}
        <div className="mt-12 p-6 rounded-2xl bg-charcoal-800/80 border border-charcoal-700 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
            <div className="text-xs sm:text-sm text-charcoal-200">
              Experience the classrooms, incubation hub, and student residences firsthand.
            </div>
          </div>
          <a
            href="https://wa.me/917450030600?text=Hi%20AIMER,%20I%20would%20like%20to%20schedule%20a%20campus%20tour"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider text-charcoal-900 bg-aimer-400 hover:bg-aimer-300 transition-colors whitespace-nowrap"
          >
            Schedule a Campus Tour &rarr;
          </a>
        </div>
      </div>
    </section>
  );
};

export default CampusSection;

