'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

interface NavItem {
  id: string;
  label: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'highlights', label: 'Program highlights' },
  { id: 'curriculum', label: 'Curriculum & Residencies' },
  { id: 'eligibility', label: 'Eligibility' },
  { id: 'admission', label: 'Admission' },
];

export const PgbipSectionNav: React.FC = () => {
  const [activeId, setActiveId] = useState<string>('highlights');
  const [indicatorStyle, setIndicatorStyle] = useState<{ left: number; width: number }>({
    left: 0,
    width: 0,
  });
  const buttonRefs = useRef<Map<string, HTMLAnchorElement>>(new Map());

  // Scroll spy to update active section
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;

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

  // Update underline indicator position
  useEffect(() => {
    const activeBtn = buttonRefs.current.get(activeId);
    if (activeBtn) {
      setIndicatorStyle({
        left: activeBtn.offsetLeft,
        width: activeBtn.offsetWidth,
      });
    }
  }, [activeId]);

  return (
    <div className="sticky top-16 sm:top-20 z-40 bg-white/95 backdrop-blur-md border-b border-charcoal-200/80 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-13 sm:h-14">
          {/* Scroll Navigation Links */}
          <nav
            aria-label="PGBIP Sections"
            className="relative flex items-center gap-1 sm:gap-6 overflow-x-auto no-scrollbar py-2"
          >
            {NAV_ITEMS.map((item) => {
              const isActive = activeId === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  ref={(el) => {
                    if (el) buttonRefs.current.set(item.id, el);
                  }}
                  className={`text-xs sm:text-sm font-medium tracking-wide transition-colors whitespace-nowrap px-2.5 py-1.5 rounded-md ${
                    isActive
                      ? 'text-aimer-800 font-semibold'
                      : 'text-charcoal-600 hover:text-charcoal-900'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}

            {/* Sliding Underline Indicator in Teal */}
            <div
              style={{
                left: `${indicatorStyle.left}px`,
                width: `${indicatorStyle.width}px`,
                transition: 'left 0.25s cubic-bezier(0.2, 0.8, 0.2, 1), width 0.25s cubic-bezier(0.2, 0.8, 0.2, 1)',
              }}
              className="absolute bottom-0 h-0.5 bg-aimer-600 pointer-events-none"
            />
          </nav>

          {/* Quick Apply Button on Right */}
          <div className="hidden sm:block shrink-0">
            <Link
              href="#admission"
              className="px-4 py-2 rounded-full bg-aimer-600 hover:bg-aimer-700 text-white text-xs font-semibold uppercase tracking-wider transition-colors shadow-2xs"
            >
              Apply Now &rarr;
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
