'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { SectionBadge } from '@/components/ui/SectionBadge';
import { AboutContent } from '@/contents/about';

interface AboutLeadershipProps {
  content: AboutContent['leadership'];
}

export const AboutLeadership: React.FC<AboutLeadershipProps> = ({ content }) => {
  const [activeIdx, setActiveIdx] = useState<number>(0);

  return (
    <section id="leadership" className="py-20 lg:py-28 bg-white border-b border-charcoal-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="space-y-3 max-w-3xl">
          <SectionBadge>{content.eyebrow}</SectionBadge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-poppins text-charcoal-900 tracking-tight leading-tight">
            {content.heading}
          </h2>
          <p className="text-sm sm:text-base text-charcoal-600 font-light leading-relaxed">
            Governed by accomplished entrepreneurs and institutional directors with proven leadership across healthcare, technology, consumer brands, and global education.
          </p>
        </div>

        {/* Desktop: Expanding Flex Row (Height 540px, 10px Gap) */}
        <div className="hidden lg:flex w-full h-[540px] gap-2.5">
          {content.members.map((member, idx) => {
            const isActive = activeIdx === idx;

            return (
              <div
                key={member.id}
                role="button"
                tabIndex={0}
                aria-label={`${member.name}, ${member.role}`}
                onMouseEnter={() => setActiveIdx(idx)}
                onFocus={() => setActiveIdx(idx)}
                onClick={() => setActiveIdx(idx)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setActiveIdx(idx);
                  }
                }}
                className="relative rounded-2xl overflow-hidden cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-aimer-500 focus-visible:ring-offset-2 transition-[flex-grow] duration-[900ms]"
                style={{
                  flexGrow: isActive ? 2.6 : 1,
                  transitionTimingFunction: 'cubic-bezier(0.7, 0, 0.2, 1)',
                }}
              >
                {/* Background Image with Scale Animation */}
                <div
                  className="absolute inset-0 transition-transform duration-[1200ms] ease-out"
                  style={{
                    transform: isActive ? 'scale(1)' : 'scale(1.08)',
                  }}
                >
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    sizes="(max-width: 1280px) 40vw, 30vw"
                    className="object-cover"
                    style={{
                      objectPosition: member.focalPosition || 'center 20%',
                    }}
                  />
                </div>

                {/* Dark Gradient Overlay for Readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/40 to-transparent" />

                {/* Content Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 z-10 flex flex-col justify-end text-white">
                  {/* Role in Light-Primary Uppercase */}
                  <div className="text-[10px] font-poppins font-semibold uppercase tracking-widest text-aimer-300">
                    {member.role}
                  </div>

                  {/* Name */}
                  <h3 className="text-xl xl:text-2xl font-bold font-poppins text-white tracking-tight mt-0.5">
                    {member.name}
                  </h3>

                  {/* Organization Line with Initials Logo Box (Revealed when active via Grid 0fr to 1fr) */}
                  <div
                    className="grid transition-all duration-500 ease-out overflow-hidden"
                    style={{
                      gridTemplateRows: isActive ? '1fr' : '0fr',
                      opacity: isActive ? 1 : 0,
                    }}
                  >
                    <div className="min-h-0 pt-3 flex items-center gap-2.5">
                      {/* Square Initials Logo Box */}
                      <span className="w-7 h-7 rounded-md bg-white text-charcoal-900 font-poppins font-bold text-[10px] flex items-center justify-center shrink-0 shadow-xs">
                        {member.initials}
                      </span>
                      <span className="text-xs text-charcoal-200 font-light line-clamp-1">
                        {member.organization}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile / Tablet: 2x2 Grid of 4:5 Tiles (Always Visible Details) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:hidden gap-6">
          {content.members.map((member) => (
            <div
              key={member.id}
              className="relative aspect-[4/5] min-h-[300px] rounded-2xl overflow-hidden shadow-sm bg-charcoal-900 border border-charcoal-200"
            >
              <Image
                src={member.image}
                alt={member.name}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                style={{
                  objectPosition: member.focalPosition || 'center 20%',
                }}
              />

              {/* Dark Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/40 to-transparent" />

              {/* Bottom Details */}
              <div className="absolute bottom-0 left-0 right-0 p-5 z-10 text-white space-y-1">
                <div className="text-[10px] font-poppins font-semibold uppercase tracking-widest text-aimer-300">
                  {member.role}
                </div>
                <h3 className="text-lg font-bold font-poppins text-white">
                  {member.name}
                </h3>
                <div className="flex items-center gap-2 pt-1">
                  <span className="w-6 h-6 rounded bg-white text-charcoal-900 font-poppins font-bold text-[9px] flex items-center justify-center shrink-0">
                    {member.initials}
                  </span>
                  <span className="text-xs text-charcoal-200 font-light line-clamp-1">
                    {member.organization}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

