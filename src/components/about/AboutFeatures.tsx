'use client';

import React from 'react';
import Image from 'next/image';
import { AboutContent } from '@/contents/about';

interface AboutFeaturesProps {
  features: AboutContent['features'];
}

const FEATURE_IMAGES = [
  '/About-Images/aimer-students-laptops-focused.jpg',
  '/About-Images/aimer-cxo-speaker-stage.jpg',
];

export const AboutFeatures: React.FC<AboutFeaturesProps> = ({ features }) => {
  return (
    <section className="py-20 lg:py-28 bg-white border-b border-charcoal-200/70 space-y-24 lg:space-y-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24 lg:space-y-32">
        {features.map((feature, idx) => {
          const isReversed = idx % 2 === 1;
          const imageSrc = FEATURE_IMAGES[idx] || feature.image;

          return (
            <div
              key={feature.index}
              className={`grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center ${
                isReversed ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Text Column (5 cols) */}
              <div
                className={`space-y-5 ${
                  isReversed ? 'lg:col-span-5 lg:order-2' : 'lg:col-span-5 lg:order-1'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xs font-poppins font-bold text-aimer-600 tracking-wider">
                    {feature.index}
                  </span>
                  <span className="w-6 h-px bg-aimer-300" />
                  <span className="text-[11px] font-poppins font-semibold uppercase tracking-widest text-charcoal-500">
                    {feature.eyebrow}
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-poppins text-charcoal-900 tracking-tight leading-tight">
                  {feature.heading}
                </h2>

                <p className="text-sm sm:text-base text-charcoal-600 font-light leading-relaxed">
                  {feature.text}
                </p>
              </div>

              {/* Image Column (7 cols) */}
              <div
                className={`${
                  isReversed ? 'lg:col-span-7 lg:order-1' : 'lg:col-span-7 lg:order-2'
                }`}
              >
                <div className="relative aspect-[4/3] w-full min-h-[260px] sm:min-h-[340px] lg:min-h-[380px] rounded-2xl overflow-hidden bg-charcoal-100 shadow-md border border-charcoal-200/60 group">
                  <Image
                    src={imageSrc}
                    alt={feature.alt || feature.heading}
                    fill
                    sizes="(max-width: 1024px) 100vw, 55vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    priority={idx === 0}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
