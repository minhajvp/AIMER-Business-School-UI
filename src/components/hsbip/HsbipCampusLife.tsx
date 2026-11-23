import React from 'react';
import Link from 'next/link';
import { SectionBadge } from '@/components/ui/SectionBadge';
import { HsbipWireframeLines } from './HsbipWireframeLines';
import { HsbipContent } from '@/contents/programmes/hsbip';

interface HsbipCampusLifeProps {
  content: HsbipContent['campus'];
}

export const HsbipCampusLife: React.FC<HsbipCampusLifeProps> = ({ content }) => {
  return (
    <section id="campus" className="relative py-20 lg:py-28 bg-[#F6FAFA] border-b border-charcoal-200/70 overflow-hidden">
      {/* Curved Wireframe Background Lines from PGBIP */}
      <HsbipWireframeLines opacity={0.3} height={400} className="top-10" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="max-w-3xl space-y-3">
          <SectionBadge>{content.badge}</SectionBadge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-poppins text-charcoal-900 tracking-tight leading-tight">
            {content.heading}{' '}
            <span className="text-aimer-600 font-normal italic">
              {content.headingAccent}
            </span>
          </h2>
          <p className="text-sm sm:text-base text-charcoal-600 font-light leading-relaxed pt-1">
            {content.description}
          </p>
          <div className="pt-1 flex items-center gap-2 text-xs text-aimer-700 font-medium">
            <svg className="w-4 h-4 fill-aimer-600 shrink-0" viewBox="0 0 24 24">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
            </svg>
            <span>{content.locationNote}</span>
          </div>
        </div>

        {/* 4 Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {content.features.map((feature, idx) => (
            <div
              key={idx}
              className="p-7 rounded-2xl bg-white border border-aimer-200/80 shadow-xs hover:shadow-md transition-all duration-300 space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-poppins font-semibold uppercase tracking-wider text-aimer-700 px-3 py-1 rounded-full bg-aimer-50 border border-aimer-200">
                  {feature.badge}
                </span>
                <span className="text-xs font-mono text-charcoal-400">0{idx + 1}</span>
              </div>

              <h3 className="text-xl font-bold font-poppins text-charcoal-900">
                {feature.title}
              </h3>

              <p className="text-xs sm:text-sm text-charcoal-600 font-light leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Reassurance Callout for Concerned Parents */}
        <div className="p-8 sm:p-10 rounded-2xl bg-white border border-charcoal-200/80 shadow-sm max-w-4xl mx-auto space-y-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <h4 className="font-bold text-base sm:text-lg text-charcoal-900 font-poppins">
              {content.parentNote.title}
            </h4>
          </div>

          <p className="text-xs sm:text-sm text-charcoal-600 font-light leading-relaxed">
            {content.parentNote.description}
          </p>

          <div className="pt-2">
            <Link
              href={content.parentNote.contactHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-aimer-50 hover:bg-aimer-100 text-aimer-800 border border-aimer-200 font-poppins font-medium text-xs sm:text-sm transition-all duration-200"
            >
              <svg className="w-4 h-4 fill-[#25D366]" viewBox="0 0 24 24">
                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.693.076-2.027-.47-1.705-.699-2.809-2.433-2.894-2.547-.086-.114-.689-.915-.689-1.745 0-.829.434-1.238.588-1.396.154-.158.337-.198.45-.198.113 0 .225.001.324.006.103.005.241-.039.377.288.144.348.486 1.186.53 1.272.044.086.072.186.014.3-.058.114-.087.186-.172.286-.086.1-.182.224-.26.3-.086.086-.176.18-.076.353.1.172.443.731.95 1.183.654.582 1.205.762 1.377.848.172.086.273.072.375-.044.102-.115.434-.505.549-.679.115-.173.231-.144.388-.086.158.057 1.002.472 1.174.558.173.086.288.13.331.202.043.072.043.418-.101.823z" />
              </svg>
              <span>{content.parentNote.contactText}</span>
              <span className="text-xs">&rarr;</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

