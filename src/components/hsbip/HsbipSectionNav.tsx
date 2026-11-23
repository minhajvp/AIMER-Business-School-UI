'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

interface NavItem {
  id: string;
  label: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'pillars', label: '11 Pillars' },
  { id: 'outcomes', label: 'Student Outcomes' },
  { id: 'campus', label: 'Campus & Hostel' },
  { id: 'admission', label: 'Admission' },
];

export const HsbipSectionNav: React.FC = () => {
  const [activeId, setActiveId] = useState<string>('overview');
  const [indicatorStyle, setIndicatorStyle] = useState<{ left: number; width: number }>({
    left: 0,
    width: 0,
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<Map<string, HTMLAnchorElement>>(new Map());

  // Update underline indicator position using exact getBoundingClientRect relative to container
  const updateIndicator = (id = activeId) => {
    const activeBtn = buttonRefs.current.get(id);
    const container = containerRef.current;
    if (activeBtn && container) {
      const btnRect = activeBtn.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      setIndicatorStyle({
        left: btnRect.left - containerRect.left + container.scrollLeft,
        width: btnRect.width,
      });
    }
  };

  // Scroll spy to update active tab based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 220;

      for (let i = NAV_ITEMS.length - 1; i >= 0; i--) {
        const item = NAV_ITEMS[i];
        const el = document.getElementById(item.id);
        if (el && el.offsetTop <= scrollPos) {
          setActiveId(item.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Recalculate indicator position on activeId change or resize
  useEffect(() => {
    updateIndicator(activeId);

    const handleResize = () => updateIndicator(activeId);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [activeId]);

  return (
    <div className="sticky top-16 sm:top-20 z-40 bg-white/95 backdrop-blur-md border-b border-charcoal-200/80 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Navigation Links with sliding underline using flex gap to prevent space-x margin bugs */}
          <div
            ref={containerRef}
            className="relative flex items-center gap-4 sm:gap-8 overflow-x-auto no-scrollbar py-2"
          >
            {NAV_ITEMS.map((item) => {
              const isActive = activeId === item.id;
              return (
                <Link
                  key={item.id}
                  href={`#${item.id}`}
                  ref={(el) => {
                    if (el) buttonRefs.current.set(item.id, el);
                    else buttonRefs.current.delete(item.id);
                  }}
                  onClick={() => {
                    setActiveId(item.id);
                    updateIndicator(item.id);
                  }}
                  className={`text-xs sm:text-sm font-poppins transition-colors duration-150 whitespace-nowrap py-2 px-1 relative ${
                    isActive
                      ? 'text-aimer-700 font-semibold'
                      : 'text-charcoal-600 hover:text-charcoal-900 font-normal'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}

            {/* Sliding Underline Indicator - explicit m-0 and exact computed bounding rect */}
            <div
              aria-hidden="true"
              className="absolute bottom-0 h-0.5 bg-aimer-600 transition-all duration-300 ease-out hidden sm:block pointer-events-none m-0"
              style={{
                transform: `translateX(${indicatorStyle.left}px)`,
                width: `${indicatorStyle.width}px`,
                left: 0,
              }}
            />
          </div>

          {/* Quick Apply Action Button */}
          <div className="flex items-center pl-4">
            <Link
              href="#admission"
              className="px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-aimer-600 hover:bg-aimer-700 text-white text-xs font-semibold tracking-wide transition-all shadow-xs active:scale-95 whitespace-nowrap"
            >
              Apply now &rarr;
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
