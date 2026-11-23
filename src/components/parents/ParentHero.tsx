'use client';

import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { SectionBadge } from '@/components/ui/SectionBadge';
import { ParentsContent } from '@/contents/parents';

interface ParentHeroProps {
  content: ParentsContent['hero'];
}

export const ParentHero: React.FC<ParentHeroProps> = ({ content }) => {
  const [mounted, setMounted] = useState(false);
  const [counters, setCounters] = useState<number[]>([0, 0, 0, 0]);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Video autoplay & visibility listener
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.play().catch(() => {});

    const handleVisibility = () => {
      if (document.hidden) {
        if (!video.paused) video.pause();
      } else {
        if (video.paused) video.play().catch(() => {});
      }
    };

    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, []);

  // Entrance mask reveal trigger & metric counters
  useEffect(() => {
    setMounted(true);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setCounters([125, 24, 100, 50]);
      return;
    }

    const startTime = performance.now() + 500;
    const duration = 1500;
    const targetValues = [125, 24, 100, 50];

    const easeOutQuart = (x: number): number => {
      return 1 - Math.pow(1 - x, 4);
    };

    let animationFrameId: number;

    const tick = (now: number) => {
      const elapsed = Math.max(0, now - startTime);
      const progress = Math.min(1, elapsed / duration);
      const easedProgress = easeOutQuart(progress);

      setCounters(targetValues.map((target) => Math.round(target * easedProgress)));

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(tick);
      }
    };

    animationFrameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <section className="relative pt-28 pb-16 lg:pt-36 lg:pb-20 border-b border-charcoal-200/70 overflow-hidden min-h-[88vh] flex flex-col justify-between bg-white isolate">
      {/* Background Video: Campus film muted loop with increased visibility and letterbox crop */}
      <div
        aria-hidden="true"
        tabIndex={-1}
        className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0 isolate"
      >
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          disablePictureInPicture
          disableRemotePlayback
          tabIndex={-1}
          preload="auto"
          className="w-full h-full object-cover opacity-60 scale-[1.22] origin-center"
        >
          <source src="/campus-video/hero-1080.mp4" type="video/mp4" />
        </video>

        {/* Soft Scrim Overlays preserving WCAG text legibility while keeping video clearly visible */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/75 to-white/35" />
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-white via-white/80 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 flex flex-col justify-between">
        {/* Eyebrow and Breadcrumb Row */}
        <div className="pt-2 pb-6">
          <SectionBadge>{content.eyebrow}</SectionBadge>
        </div>

        {/* Hero Main Grid: Title on left, Paragraph + CTAs on right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end my-auto py-8">
          {/* Giant Title with Overflow Hidden Slide-Up Mask (7 cols) */}
          <div className="lg:col-span-7">
            <h1 className="font-poppins font-bold tracking-tight text-charcoal-900 leading-[0.94] select-none text-[clamp(2.75rem,6.5vw,6.5rem)]">
              <span className="block overflow-hidden py-1">
                <span
                  className="block transition-transform duration-[1100ms]"
                  style={{
                    transform: mounted ? 'translateY(0)' : 'translateY(112%)',
                    transitionTimingFunction: 'cubic-bezier(0.7, 0, 0.2, 1)',
                    transitionDelay: '0ms',
                  }}
                >
                  {content.title}
                </span>
              </span>

              <span className="block overflow-hidden py-1">
                <span
                  className="block font-normal text-aimer-600 transition-transform duration-[1100ms]"
                  style={{
                    transform: mounted ? 'translateY(0)' : 'translateY(112%)',
                    transitionTimingFunction: 'cubic-bezier(0.7, 0, 0.2, 1)',
                    transitionDelay: '130ms',
                  }}
                >
                  {content.titleAccent}
                </span>
              </span>
            </h1>
          </div>

          {/* Paragraph and Action CTAs (5 cols) */}
          <div className="lg:col-span-5 space-y-6 pb-2">
            <p className="text-base sm:text-lg text-charcoal-700 font-light leading-relaxed">
              {content.paragraph}
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              {/* Primary WhatsApp Counsellor Button */}
              <a
                href={content.counsellorUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3.5 rounded-full bg-aimer-600 hover:bg-aimer-700 text-white font-poppins font-semibold text-xs sm:text-sm uppercase tracking-wider transition-all duration-200 shadow-sm active:scale-95 whitespace-nowrap inline-flex items-center gap-2"
              >
                <span>Speak to Parent Counsellor</span>
                <span>&rarr;</span>
              </a>

              {/* Schedule Campus Visit Button */}
              <a
                href={content.tourHref}
                className="px-7 py-3.5 rounded-full border border-charcoal-300 hover:border-aimer-600 text-charcoal-800 hover:text-aimer-700 font-poppins font-semibold text-xs sm:text-sm uppercase tracking-wider transition-colors active:scale-95 bg-white/90 whitespace-nowrap"
              >
                Schedule Campus Visit
              </a>
            </div>
          </div>
        </div>

        {/* 4-Column Stats Strip Along Bottom Edge Separated by Hairlines */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-8 mt-12 border-t border-charcoal-200/80">
          {content.stats.map((stat, idx) => (
            <div
              key={idx}
              className={`space-y-1.5 ${
                idx > 0 ? 'lg:border-l lg:border-charcoal-200/70 lg:pl-6' : ''
              }`}
            >
              <div className="text-[10px] sm:text-[11px] font-poppins font-semibold uppercase tracking-widest text-charcoal-500">
                {stat.label}
              </div>
              <div className="text-3xl sm:text-4xl lg:text-5xl font-bold font-poppins text-aimer-700 tracking-tight tabular-nums flex items-baseline gap-1.5">
                <span>
                  {idx === 0
                    ? counters[0]
                    : idx === 1
                    ? `${counters[1]}/7`
                    : idx === 2
                    ? `${counters[2]}%`
                    : `₹${counters[3]}k`}
                </span>
                <span className="text-xs sm:text-sm font-semibold text-charcoal-800 uppercase tracking-wider">
                  {stat.suffix}
                </span>
              </div>
              <p className="text-xs text-charcoal-600 font-light leading-relaxed">
                {stat.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

