import React from 'react';
import Image from 'next/image';
import { SectionBadge } from '@/components/ui/SectionBadge';
import { AboutContent } from '@/contents/about';

interface AboutFounderMessageProps {
  content: AboutContent['founder'];
}

export const AboutFounderMessage: React.FC<AboutFounderMessageProps> = ({ content }) => {
  return (
    <section id="founder" className="py-20 lg:py-28 bg-[#F4FAFA] border-b border-charcoal-200/70 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: 4:5 Portrait with Offset Primary Outline (5 cols) */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-sm sm:max-w-md">
              {/* Thin Primary Colored Outline Offset 16px Down and Right */}
              <div
                aria-hidden="true"
                className="absolute inset-0 translate-x-4 translate-y-4 rounded-2xl border-2 border-aimer-500/80 pointer-events-none"
              />

              {/* Foreground Image Container */}
              <div className="relative aspect-[4/5] w-full min-h-[360px] sm:min-h-[440px] rounded-2xl overflow-hidden shadow-lg bg-charcoal-200 z-10 border border-charcoal-200/60">
                <Image
                  src="/About-Images/board-member/muhammed-mon-thekkayil.jpg"
                  alt={content.alt || 'Mr. Muhammed Mon, Founder of AIMER Business School'}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover object-top"
                  priority={false}
                />
              </div>
            </div>
          </div>

          {/* Right Column: Founder Quote (7 cols) */}
          <div className="lg:col-span-7 space-y-6 relative">
            {/* Large Faint Opening Quotation Mark Behind the Quote */}
            <div
              aria-hidden="true"
              className="absolute -top-12 -left-6 text-[11rem] font-serif leading-none text-aimer-500/10 select-none pointer-events-none -z-0"
            >
              &ldquo;
            </div>

            <div className="relative z-10 space-y-3">
              <SectionBadge>{content.eyebrow}</SectionBadge>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-poppins text-charcoal-900 tracking-tight">
                {content.heading}
              </h2>
            </div>

            {/* Quote Body */}
            <div className="relative z-10 space-y-4 text-charcoal-700 font-light leading-relaxed">
              <p className="font-poppins font-medium text-charcoal-900 text-[clamp(1.25rem,2.2vw,1.75rem)]">
                {content.salutation}
              </p>

              <p className="text-sm sm:text-base">
                Welcome to{' '}
                <strong className="font-semibold text-aimer-800">AIMER Business School</strong> — where we redefine Business Education by bridging academic excellence with real-world application with{' '}
                <strong className="font-semibold text-aimer-800">
                  India&apos;s first ever PG Business Integrated Program.
                </strong>
              </p>

              <p className="text-sm sm:text-base">
                This is an era of rapid transformation, where knowledge alone is not enough. Our mission is to cultivate these attributes in every student who walks through our doors. We are proud to pioneer a transformative approach to education in Kerala, emphasising{' '}
                <strong className="font-semibold text-aimer-800">Experiential Learning</strong> as a core component of our curriculum. Whether your goal is to lead an organization, build a startup, or create meaningful change,{' '}
                <strong className="font-semibold text-aimer-800">AIMER</strong> equips you with the skills, network, and mindset to thrive.
              </p>

              <p className="text-sm sm:text-base italic pt-1">
                {content.closing}
              </p>
            </div>

            {/* Signature Block */}
            <div className="relative z-10 pt-4 border-t border-charcoal-200/80 space-y-0.5">
              <div className="text-base sm:text-lg font-bold font-poppins text-charcoal-900">
                {content.name}
              </div>
              <div className="text-[11px] font-poppins font-semibold uppercase tracking-widest text-aimer-700">
                {content.role}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

