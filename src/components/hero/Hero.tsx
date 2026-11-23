'use client';

import React, { useRef, useEffect } from 'react';
import Link from 'next/link';
import { CampusDrawingAnimation } from './CampusDrawingAnimation';
import SectionBadge from '../ui/SectionBadge';

interface HeroProps {
  metrics: { value: string; label: string }[];
  onOpenBrochureModal?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ metrics, onOpenBrochureModal }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLElement | null>(null);

  // Interactive Dotted Canvas that dynamically reacts to cursor movement
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = container.offsetWidth);
    let height = (canvas.height = container.offsetHeight);

    const mouse = {
      x: -1000,
      y: -1000,
      targetX: -1000,
      targetY: -1000,
      radius: 70, // Cursor influence zone
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.targetX = e.clientX - rect.left;
      mouse.targetY = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.targetX = -1000;
      mouse.targetY = -1000;
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    const handleResize = () => {
      if (!container || !canvas) return;
      width = canvas.width = container.offsetWidth;
      height = canvas.height = container.offsetHeight;
      initDots();
    };

    window.addEventListener('resize', handleResize);

    // Create lattice of dots
    interface Dot {
      baseX: number;
      baseY: number;
      x: number;
      y: number;
      size: number;
      vx: number;
      vy: number;
    }

    let dots: Dot[] = [];
    const gap = 36; // spacing between dots

    const initDots = () => {
      dots = [];
      const cols = Math.floor(width / gap) + 2;
      const rows = Math.floor(height / gap) + 2;
      const offsetX = (width - cols * gap) / 2;
      const offsetY = (height - rows * gap) / 2;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = offsetX + i * gap;
          const y = offsetY + j * gap;
          dots.push({
            baseX: x,
            baseY: y,
            x: x,
            y: y,
            size: 2,
            vx: 0,
            vy: 0,
          });
        }
      }
    };

    initDots();

    // Render loop
    const render = () => {
      // Smooth mouse easing
      mouse.x += (mouse.targetX - mouse.x) * 0.15;
      mouse.y += (mouse.targetY - mouse.y) * 0.15;

      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < dots.length; i++) {
        const dot = dots[i];
        const dx = mouse.x - dot.x;
        const dy = mouse.y - dot.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        let force = 0;
        let angle = 0;

        if (distance < mouse.radius) {
          // Repel dots smoothly away from cursor
          force = (mouse.radius - distance) / mouse.radius;
          angle = Math.atan2(dy, dx);
          const pushX = Math.cos(angle) * force * 18;
          const pushY = Math.sin(angle) * force * 18;

          dot.vx -= pushX;
          dot.vy -= pushY;
        }

        // Return to home position with gentle spring damping
        const homeDx = dot.baseX - dot.x;
        const homeDy = dot.baseY - dot.y;
        dot.vx += homeDx * 0.08;
        dot.vy += homeDy * 0.08;
        dot.vx *= 0.72; // damping
        dot.vy *= 0.72;

        dot.x += dot.vx;
        dot.y += dot.vy;

        // Render dot in theme color
        ctx.beginPath();
        if (distance < mouse.radius) {
          const proximity = 1 - distance / mouse.radius;
          ctx.arc(dot.x, dot.y, dot.size + proximity * 1.8, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(22, 140, 155, ${0.35 + proximity * 0.6})`;
          ctx.shadowColor = 'rgba(22, 140, 155, 0.4)';
          ctx.shadowBlur = proximity * 6;
        } else {
          ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(22, 140, 155, 0.18)';
          ctx.shadowBlur = 0;
        }
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[92vh] pt-28 pb-16 lg:pt-32 lg:pb-20 overflow-hidden bg-white flex flex-col justify-center"
    >
      {/* Soft atmospheric gradient glow behind drawing */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none">
        <div className="absolute -top-32 -right-32 w-[650px] h-[650px] rounded-full bg-aimer-100/35 blur-3xl" />
        <div className="absolute bottom-10 left-1/4 w-[500px] h-[300px] rounded-full bg-aqua-subtle/40 blur-3xl" />
      </div>

      {/* Interactive Cursor-Reactive Dotted Grid Canvas:
          Preserved intact - hovering or moving cursor creates fluid ripples in theme teal (#168C9B). */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-[1] pointer-events-none"
      />

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        {/* Top Header Block: 2 Columns on Desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-end">
          {/* Left Column: Eyebrow + Display Headline */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2  border-aimer-700 pl-3 py-0.5 mb-4">
              
              <SectionBadge>Best Business School in South India</SectionBadge>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.35rem] font-semibold tracking-tight text-charcoal-900 leading-[1.08]">
              Learn Business by{' '}
              <span className="text-aimer-500 font-normal italic">Doing</span> Business.{' '}
              <br className="hidden sm:inline" />
              <span className="text-charcoal-900 font-medium">Beyond Classrooms. </span>
              <span className="text-aimer-700">Into Careers.</span>
            </h1>
          </div>

          {/* Right Column: Mission statement, Action CTAs, and NAAT status */}
          <div className="lg:col-span-5 flex flex-col justify-end">
            <p className="text-sm sm:text-base text-charcoal-600 leading-relaxed font-light">
              Disruption isn’t theory at AIMER. We eliminate passive textbook memorization through{' '}
              <strong className="text-charcoal-900 font-medium">75% enterprise practicum</strong>, up to{' '}
              <strong className="text-charcoal-900 font-medium">12 months of embedded corporate residency</strong>{' '}
              inside partner firms, and mandatory cross-border immersion.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <Link
                href="#programmes"
                className="inline-flex items-center justify-center px-6 py-3.5 text-xs sm:text-sm font-semibold tracking-wide text-white bg-aimer-500 hover:bg-aimer-600 active:bg-aimer-700 rounded-full transition-all duration-200 shadow-sm hover:shadow-md group whitespace-nowrap"
              >
                <span>Explore Degree Pathways</span>
                <svg
                  className="w-4 h-4 ml-2 transition-transform duration-200 group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>

              {/* <button
                type="button"
                onClick={onOpenBrochureModal}
                className="inline-flex items-center justify-center px-6 py-3.5 text-xs sm:text-sm font-medium text-charcoal-800 bg-white hover:bg-aimer-50/70 border border-charcoal-200 hover:border-aimer-300 rounded-full transition-all duration-200 shadow-2xs whitespace-nowrap"
              >
                <span>Download Prospectus 2026–27</span>
                <svg
                  className="w-4 h-4 ml-2 text-aimer-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </button> */}
            </div>

            <div className="pt-3 flex items-center gap-2 text-[11px] sm:text-xs text-charcoal-500">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
              <span>
                National AIMER Aptitude Test (NAAT) 2026 registrations are currently open. Up to 100% merit scholarships.
              </span>
            </div>
          </div>
        </div>

        {/* Centerpiece: Animated Campus Architectural Build Drawing:
            Replaces the static images with the 10-second technical sketch and paint sweep animation.
            Kept strictly clean with no overlaid text clutter. */}
        <div className="mt-8 sm:mt-12 w-full">
          <CampusDrawingAnimation />
        </div>

        {/* Key Metrics Strip: Hairline-separated editorial stats */}
        <div className="mt-8 sm:mt-10 pt-6 sm:pt-8 border-t border-charcoal-200/80 grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {metrics.map((m, idx) => (
            <div key={idx} className="space-y-1">
              <div className="text-2xl sm:text-3xl lg:text-[2rem] font-semibold text-aimer-700 tracking-tight leading-tight">
                {m.value}
              </div>
              <div className="text-[10px] sm:text-[11px] font-medium text-charcoal-500 uppercase tracking-wider">
                {m.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
