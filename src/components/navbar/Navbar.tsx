'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Programme } from '@/types';

// ============================================================================
// PROGRAMMES MEGA MENU DATA
// ============================================================================
export const NAVBAR_PROGRAMMES = [
  {
    id: 'ugbip',
    name: 'UGBIP',
    previewName: 'UGBIP',
    fullName: 'Undergraduate Business Integrated Program',
    duration: '3 Years · 6 Semesters',
    href: '/programmes/ugbip',
  },
  {
    id: 'pgbip',
    name: 'PGBIP',
    previewName: 'PGBIP',
    fullName: 'Postgraduate Business Integrated Program',
    duration: '2 Years · Full-Time Immersion',
    href: '/programmes/pgbip',
  },
  {
    id: 'hsbip',
    name: 'HSBIP',
    previewName: 'HSBIP',
    fullName: 'Higher Secondary Business Integrated Program',
    duration: '2 Years · Residential (+1 & +2)',
    href: '/programmes/hsbip',
  },
  {
    id: 'executive-ai-hr',
    name: 'Executive AI & HR',
    previewName: 'AI & HR',
    fullName: 'Future HR & AI Mastery Concentration',
    duration: '6 Months to 1 Year · Modular',
    href: '/#programmes',
  },
];

const NAV_LINKS = [
  { label: 'Programmes', href: '/#programmes', isMegaMenu: true },
  { label: 'About', href: '/about', isMegaMenu: false },
  { label: 'For Parents', href: '/parents', isMegaMenu: false },
  { label: 'CXO Mentors', href: '/#mentors', isMegaMenu: false },
  { label: 'Smart Campus', href: '/#campus', isMegaMenu: false },
];

interface NavbarProps {
  programmes?: Programme[];
}

export const Navbar: React.FC<NavbarProps> = () => {
  const pathname = usePathname();
  const isProgramPage = pathname?.startsWith('/programmes/');

  // ---------------------------------------------------------------------------
  // State
  // ---------------------------------------------------------------------------
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProgrammesAccordionOpen, setIsProgrammesAccordionOpen] = useState(false);
  const [activeProgrammeIdx, setActiveProgrammeIdx] = useState(0);
  const [previewAnimKey, setPreviewAnimKey] = useState(0);
  const [previewFontSize, setPreviewFontSize] = useState(85);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  // Sliding Indicator state
  const [indicatorStyle, setIndicatorStyle] = useState<{
    left: number;
    width: number;
    opacity: number;
  }>({ left: 0, width: 0, opacity: 0 });

  // ---------------------------------------------------------------------------
  // Refs
  // ---------------------------------------------------------------------------
  const navContainerRef = useRef<HTMLDivElement>(null);
  const navLinksRef = useRef<(HTMLAnchorElement | HTMLButtonElement | null)[]>([]);
  const programmesBtnRef = useRef<HTMLButtonElement | null>(null);
  const megaMenuPanelRef = useRef<HTMLDivElement | null>(null);

  const openTimerRef = useRef<NodeJS.Timeout | null>(null);
  const closeTimerRef = useRef<NodeJS.Timeout | null>(null);
  const lastScrollYRef = useRef(0);
  const rAFScrollRef = useRef<number | null>(null);

  // ---------------------------------------------------------------------------
  // Reduced Motion & Viewport Resize Listener
  // ---------------------------------------------------------------------------
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(motionQuery.matches);
    const motionHandler = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    motionQuery.addEventListener('change', motionHandler);

    const resizeHandler = () => {
      if (window.innerWidth >= 960) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', resizeHandler);

    return () => {
      motionQuery.removeEventListener('change', motionHandler);
      window.removeEventListener('resize', resizeHandler);
    };
  }, []);

  // ---------------------------------------------------------------------------
  // Lock body scroll when mobile menu is open
  // ---------------------------------------------------------------------------
  useEffect(() => {
    if (typeof document === 'undefined') return;
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // ---------------------------------------------------------------------------
  // Auto-fit preview text calculation (measureText in canvas)
  // Target inner width: 340px - 64px padding = 276px
  // ---------------------------------------------------------------------------
  const fitPreviewText = useCallback((text: string) => {
    if (typeof window === 'undefined') return;
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.font = 'bold 132px Poppins, sans-serif';
    const textWidth = ctx.measureText(text).width;
    const innerWidth = 276; // 340px - 2 * 32px padding
    const calculated = Math.min(132, Math.floor((innerWidth / (textWidth || 1)) * 132));
    setPreviewFontSize(Math.max(38, calculated));
  }, []);

  useEffect(() => {
    const activeText = NAVBAR_PROGRAMMES[activeProgrammeIdx]?.previewName || 'UGBIP';
    fitPreviewText(activeText);

    if (typeof document !== 'undefined' && 'fonts' in document) {
      document.fonts.ready.then(() => fitPreviewText(activeText));
    }
  }, [activeProgrammeIdx, fitPreviewText]);

  // ---------------------------------------------------------------------------
  // Sliding Indicator Positioning
  // ---------------------------------------------------------------------------
  const getActiveNavIndex = useCallback(() => {
    if (pathname === '/about') return 1;
    if (pathname === '/parents') return 2;
    return null;
  }, [pathname]);

  const updateIndicatorTo = useCallback((index: number | null) => {
    if (!navContainerRef.current) return;
    if (index === null) {
      if (isMegaMenuOpen) {
        // While mega menu is open, stay locked under "Programmes" (index 0)
        const targetEl = navLinksRef.current[0];
        if (targetEl) {
          const navRect = navContainerRef.current.getBoundingClientRect();
          const targetRect = targetEl.getBoundingClientRect();
          setIndicatorStyle({
            left: targetRect.left - navRect.left,
            width: targetRect.width,
            opacity: 1,
          });
        }
        return;
      }
      const activeIdx = getActiveNavIndex();
      if (activeIdx !== null && navLinksRef.current[activeIdx]) {
        const navRect = navContainerRef.current.getBoundingClientRect();
        const targetRect = navLinksRef.current[activeIdx]!.getBoundingClientRect();
        setIndicatorStyle({
          left: targetRect.left - navRect.left,
          width: targetRect.width,
          opacity: 1,
        });
        return;
      }
      setIndicatorStyle((prev) => ({ ...prev, opacity: 0 }));
      return;
    }

    const targetEl = navLinksRef.current[index];
    if (!targetEl) return;

    const navRect = navContainerRef.current.getBoundingClientRect();
    const targetRect = targetEl.getBoundingClientRect();

    setIndicatorStyle({
      left: targetRect.left - navRect.left,
      width: targetRect.width,
      opacity: 1,
    });
  }, [isMegaMenuOpen, getActiveNavIndex]);

  useEffect(() => {
    if (isMegaMenuOpen) {
      updateIndicatorTo(0);
    } else {
      updateIndicatorTo(null);
    }
  }, [isMegaMenuOpen, isScrolled, pathname, updateIndicatorTo]);

  // ---------------------------------------------------------------------------
  // Scroll Listener: Permanently sticky; shrinks height from 84px to 68px past 8px
  // ---------------------------------------------------------------------------
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 8);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ---------------------------------------------------------------------------
  // Hover Intent for Programmes Mega Menu
  // Opens after ~90ms, closes ~220ms after pointer leaves item + panel
  // ---------------------------------------------------------------------------
  const handleProgrammesPointerEnter = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    if (!isMegaMenuOpen) {
      openTimerRef.current = setTimeout(() => {
        setIsMegaMenuOpen(true);
      }, 90);
    }
  };

  const handleProgrammesPointerLeave = () => {
    if (openTimerRef.current) {
      clearTimeout(openTimerRef.current);
      openTimerRef.current = null;
    }
    closeTimerRef.current = setTimeout(() => {
      setIsMegaMenuOpen(false);
    }, 220);
  };

  const handlePanelPointerEnter = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };

  const handlePanelPointerLeave = () => {
    closeTimerRef.current = setTimeout(() => {
      setIsMegaMenuOpen(false);
    }, 220);
  };

  const handleProgrammesClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches) {
      // Touch screen toggle
      setIsMegaMenuOpen((prev) => !prev);
    } else {
      // On hover devices: if already open, click does NOT close
      if (!isMegaMenuOpen) {
        setIsMegaMenuOpen(true);
      }
    }
  };

  // Keyboard accessibility: Escape closes mega menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isMegaMenuOpen) {
          setIsMegaMenuOpen(false);
          programmesBtnRef.current?.focus();
        }
        if (isMobileMenuOpen) {
          setIsMobileMenuOpen(false);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMegaMenuOpen, isMobileMenuOpen]);

  // Change active programme in mega menu (only triggers animation if index actually changes)
  const handleSelectProgramme = (idx: number) => {
    if (idx !== activeProgrammeIdx) {
      setActiveProgrammeIdx(idx);
      setPreviewAnimKey((k) => k + 1);
    }
  };

  const activeProgramme = NAVBAR_PROGRAMMES[activeProgrammeIdx] || NAVBAR_PROGRAMMES[0];

  return (
    <>
      {/* =======================================================================
          TOP STICKY NAVBAR HEADER (Permanently sticky at top while scrolling)
          ======================================================================= */}
      <header
        role="banner"
        className={`fixed top-0 left-0 right-0 z-50 bg-white select-none transition-[height] duration-300 ease-out ${
          isScrolled ? 'h-[68px]' : 'h-[84px]'
        } ${
          isScrolled || isMegaMenuOpen ? 'border-b border-charcoal-200' : 'border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Logo (Existing Asset) */}
          <Link
            href="/"
            onClick={() => {
              setIsMegaMenuOpen(false);
              setIsMobileMenuOpen(false);
            }}
            className="flex items-center group focus:outline-none focus-visible:ring-2 focus-visible:ring-aimer-600 shrink-0"
            aria-label="AIMER Business School Homepage"
          >
            <div className="relative h-9 w-40 sm:h-10 sm:w-48 transition-opacity duration-200 group-hover:opacity-90">
              <Image
                src="/logo/aimer-logo.png"
                alt="AIMER Business School"
                fill
                priority
                className="object-contain object-left"
                sizes="(max-width: 640px) 160px, 192px"
              />
            </div>
          </Link>

          {/* Desktop Navigation Links (Visible >= 960px) */}
          <nav
            ref={navContainerRef}
            aria-label="Main Navigation"
            className="hidden min-[960px]:flex items-center h-full relative"
            onMouseLeave={() => updateIndicatorTo(null)}
          >
            {NAV_LINKS.map((link, idx) => {
              if (link.isMegaMenu) {
                return (
                  <div
                    key={link.label}
                    className="h-full flex items-center"
                    onPointerEnter={handleProgrammesPointerEnter}
                    onPointerLeave={handleProgrammesPointerLeave}
                  >
                    <button
                      ref={(el) => {
                        navLinksRef.current[idx] = el;
                        programmesBtnRef.current = el;
                      }}
                      type="button"
                      onClick={handleProgrammesClick}
                      onPointerEnter={() => updateIndicatorTo(idx)}
                      onFocus={() => {
                        updateIndicatorTo(idx);
                        setIsMegaMenuOpen(true);
                      }}
                      aria-expanded={isMegaMenuOpen}
                      aria-haspopup="true"
                      aria-controls="programmes-mega-menu"
                      className={`h-full flex items-center gap-1.5 px-3.5 text-sm font-medium whitespace-nowrap transition-colors duration-200 cursor-pointer focus:outline-none focus-visible:text-aimer-700 ${
                        isMegaMenuOpen
                          ? 'text-aimer-700'
                          : 'text-charcoal-700 hover:text-aimer-700'
                      }`}
                    >
                      <span>{link.label}</span>
                      <svg
                        className={`w-3.5 h-3.5 transition-transform duration-300 ${
                          isMegaMenuOpen ? 'rotate-180 text-aimer-700' : 'text-charcoal-400'
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                        aria-hidden="true"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  </div>
                );
              }

              const isCurrent = pathname === link.href;

              return (
                <div key={link.label} className="h-full flex items-center">
                  <Link
                    ref={(el) => {
                      navLinksRef.current[idx] = el;
                    }}
                    href={link.href}
                    aria-current={isCurrent ? 'page' : undefined}
                    onClick={() => setIsMegaMenuOpen(false)}
                    onPointerEnter={() => updateIndicatorTo(idx)}
                    onFocus={() => updateIndicatorTo(idx)}
                    className={`h-full flex items-center px-3.5 text-sm font-medium whitespace-nowrap transition-colors duration-200 focus:outline-none focus-visible:text-aimer-700 ${
                      isCurrent
                        ? 'text-aimer-700 font-semibold'
                        : 'text-charcoal-700 hover:text-aimer-700'
                    }`}
                  >
                    {link.label}
                  </Link>
                </div>
              );
            })}

            {/* Sliding Indicator: 2px primary-colored bar gliding at bottom edge */}
            <div
              aria-hidden="true"
              style={{
                transform: `translateX(${indicatorStyle.left}px)`,
                width: `${indicatorStyle.width}px`,
                opacity: indicatorStyle.opacity,
                transition: isReducedMotion
                  ? 'none'
                  : 'transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1), width 0.5s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.3s ease',
              }}
              className="absolute bottom-0 left-0 h-[2px] bg-aimer-600 pointer-events-none"
            />
          </nav>

          {/* Right Action Block (Phone + Pill CTA) */}
          <div className="flex items-center gap-4 shrink-0">
            {/* Phone Block (Hidden below 1120px) */}
            {/* <a
              href="tel:+917450030600"
              className="hidden min-[1120px]:flex items-center gap-2 text-xs font-medium text-charcoal-600 hover:text-aimer-700 transition-colors py-1.5 focus:outline-none focus-visible:ring-1 focus-visible:ring-aimer-600"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
              <span>Admissions:</span>
              <span className="font-semibold text-charcoal-900">+91 74500 30600</span>
            </a> */}

            {/* Pill CTA: "APPLY VIA NAAT →" */}
            <Link
              href={isProgramPage ? '#admission' : '/#admissions'}
              onClick={() => {
                setIsMegaMenuOpen(false);
                setIsMobileMenuOpen(false);
              }}
              className="hidden sm:inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider text-white bg-aimer-600 hover:bg-aimer-700 transition-all duration-300 shadow-none hover:shadow-xs group focus:outline-none focus-visible:ring-2 focus-visible:ring-aimer-600"
            >
              <span>APPLY VIA NAAT</span>
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>

            {/* Mobile Hamburger Button (44px target, < 960px) */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              aria-expanded={isMobileMenuOpen}
              aria-label={isMobileMenuOpen ? 'Close Menu' : 'Open Navigation Menu'}
              className="flex min-[960px]:hidden w-11 h-11 items-center justify-center p-2 text-charcoal-800 hover:text-aimer-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-aimer-600 cursor-pointer"
            >
              <div className="w-5 h-3.5 relative flex flex-col justify-between">
                <span
                  style={{
                    transform: isMobileMenuOpen ? 'translateY(6px) rotate(45deg)' : 'none',
                    transition: isReducedMotion ? 'none' : 'transform 0.4s ease',
                  }}
                  className="w-full h-[1.5px] bg-charcoal-900 rounded-full block origin-center"
                />
                <span
                  style={{
                    transform: isMobileMenuOpen ? 'translateY(-6px) rotate(-45deg)' : 'none',
                    transition: isReducedMotion ? 'none' : 'transform 0.4s ease',
                  }}
                  className="w-full h-[1.5px] bg-charcoal-900 rounded-full block origin-center"
                />
              </div>
            </button>
          </div>
        </div>

        {/* =====================================================================
            PROGRAMMES MEGA MENU (DESKTOP: position absolute top-100%)
            ===================================================================== */}
        <div
          id="programmes-mega-menu"
          ref={megaMenuPanelRef}
          role="region"
          aria-label="Programmes Directory"
          onPointerEnter={handlePanelPointerEnter}
          onPointerLeave={handlePanelPointerLeave}
          style={{
            clipPath: isMegaMenuOpen || isReducedMotion ? 'inset(0 0 0% 0)' : 'inset(0 0 100% 0)',
            visibility: isMegaMenuOpen ? 'visible' : 'hidden',
            pointerEvents: isMegaMenuOpen ? 'auto' : 'none',
            transition: isReducedMotion
              ? 'none'
              : `clip-path 0.6s cubic-bezier(0.7, 0, 0.2, 1), visibility 0s ${
                  isMegaMenuOpen ? '0s' : '0.6s'
                }`,
          }}
          className="absolute top-full left-0 right-0 bg-white border-b border-charcoal-200 z-50 overflow-hidden"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-12">
            <div className="grid grid-cols-12 gap-14 items-stretch">
              
              {/* ---------------------------------------------------------------
                  LEFT COLUMN: Practice-Led Pathways + Programme Rows
                  --------------------------------------------------------------- */}
              <div
                style={{
                  opacity: isMegaMenuOpen || isReducedMotion ? 1 : 0,
                  transform:
                    isMegaMenuOpen || isReducedMotion ? 'translateY(0)' : 'translateY(14px)',
                  transition: isReducedMotion
                    ? 'none'
                    : 'opacity 0.7s cubic-bezier(0.2, 0.8, 0.2, 1) 200ms, transform 0.7s cubic-bezier(0.2, 0.8, 0.2, 1) 200ms',
                }}
                className="col-span-8 flex flex-col justify-between"
              >
                <div>
                  {/* Category Eyebrow */}
                  <div className="text-[11px] font-poppins font-semibold tracking-widest uppercase text-aimer-600 mb-4">
                    PRACTICE-LED PATHWAYS
                  </div>

                  {/* 4 Programme Rows */}
                  <div className="space-y-0">
                    {NAVBAR_PROGRAMMES.map((prog, idx) => {
                      const isActive = activeProgrammeIdx === idx;

                      return (
                        <Link
                          key={prog.id}
                          href={prog.href}
                          onClick={() => setIsMegaMenuOpen(false)}
                          onPointerEnter={() => handleSelectProgramme(idx)}
                          onFocus={() => handleSelectProgramme(idx)}
                          className="group relative block border-t border-charcoal-200/80 py-4 outline-none"
                        >
                          {/* Active Row Top 1px Primary Line (scaleX 0 to 1) */}
                          <div
                            aria-hidden="true"
                            style={{
                              transform: isActive ? 'scaleX(1)' : 'scaleX(0)',
                              transformOrigin: '0% 50%',
                              transition: isReducedMotion ? 'none' : 'transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)',
                            }}
                            className="absolute top-0 left-0 right-0 h-[1.5px] bg-aimer-600"
                          />

                          <div className="grid grid-cols-12 items-center gap-4">
                            {/* Small Index: "01" to "04" */}
                            <div
                              className={`col-span-1 text-xs font-poppins font-semibold transition-colors duration-300 ${
                                isActive ? 'text-aimer-600' : 'text-charcoal-400'
                              }`}
                            >
                              0{idx + 1}
                            </div>

                            {/* Name & Full Name (Shifts 8px right when active) */}
                            <div
                              style={{
                                transform: isActive ? 'translateX(8px)' : 'translateX(0)',
                                transition: isReducedMotion ? 'none' : 'transform 0.3s ease-out',
                              }}
                              className="col-span-7"
                            >
                              <div
                                className={`text-[25px] font-medium tracking-tight leading-tight transition-colors duration-300 font-poppins ${
                                  isActive ? 'text-aimer-600' : 'text-charcoal-900'
                                }`}
                              >
                                {prog.name}
                              </div>
                              <div className="text-xs text-charcoal-500 font-light mt-0.5">
                                {prog.fullName}
                              </div>
                            </div>

                            {/* Duration (Plain Muted Text Aligned Right) */}
                            <div className="col-span-3 text-right text-xs text-charcoal-500 font-light pr-2">
                              {prog.duration}
                            </div>

                            {/* Primary-Colored Arrow (Fades and slides in from left) */}
                            <div className="col-span-1 flex justify-end">
                              <span
                                style={{
                                  opacity: isActive ? 1 : 0,
                                  transform: isActive ? 'translateX(0)' : 'translateX(-8px)',
                                  transition: isReducedMotion
                                    ? 'none'
                                    : 'opacity 0.3s ease, transform 0.3s ease',
                                }}
                                className="text-aimer-600 text-lg font-bold inline-block"
                              >
                                →
                              </span>
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>

                {/* Bottom Strip: Admissions via NAAT 2026 + Check Eligibility */}
                <div className="pt-6 mt-4 border-t border-charcoal-200/80 flex items-center justify-between text-xs">
                  <span className="text-charcoal-500 font-light">
                    Admissions via NAAT 2026
                  </span>
                  <Link
                    href="#admissions"
                    onClick={() => setIsMegaMenuOpen(false)}
                    className="inline-flex items-center gap-1.5 font-semibold text-aimer-700 underline decoration-aimer-600/40 hover:decoration-aimer-700 transition-colors group/check"
                  >
                    <span>Check Eligibility</span>
                    <span className="inline-block transition-transform duration-200 group-hover/check:translate-x-1">
                      →
                    </span>
                  </Link>
                </div>
              </div>

              {/* ---------------------------------------------------------------
                  RIGHT PREVIEW COLUMN: Fixed 340px, Light Tint Background
                  --------------------------------------------------------------- */}
              <div
                style={{
                  opacity: isMegaMenuOpen || isReducedMotion ? 1 : 0,
                  transform:
                    isMegaMenuOpen || isReducedMotion ? 'translateY(0)' : 'translateY(14px)',
                  transition: isReducedMotion
                    ? 'none'
                    : 'opacity 0.7s cubic-bezier(0.2, 0.8, 0.2, 1) 270ms, transform 0.7s cubic-bezier(0.2, 0.8, 0.2, 1) 270ms',
                }}
                className="col-span-4 w-[340px] bg-[#EAF7F6] rounded-none px-8 py-[30px] min-h-[400px] overflow-hidden flex flex-col justify-between"
              >
                {/* Outlined Text at Top (Full short name: "UGBIP", "PGBIP", "HSBIP", "AI & HR") */}
                <div
                  key={`outlined-${previewAnimKey}`}
                  className="preview-fade-rise"
                >
                  <div
                    style={{
                      fontSize: `${previewFontSize}px`,
                      lineHeight: 0.9,
                      WebkitTextStroke: '1.5px rgba(22, 140, 155, 0.55)',
                      color: 'transparent',
                    }}
                    className="font-bold font-poppins tracking-tight whitespace-nowrap select-none"
                  >
                    {activeProgramme.previewName}
                  </div>
                </div>

                {/* Bottom Metadata & Link */}
                <div
                  key={`meta-${previewAnimKey}`}
                  className="preview-fade-rise-delayed pt-8"
                >
                  <div className="text-[21px] font-semibold text-charcoal-900 tracking-tight leading-snug font-poppins">
                    {activeProgramme.duration}
                  </div>
                  <div className="text-xs text-charcoal-600 font-light mt-1 line-clamp-2">
                    {activeProgramme.fullName}
                  </div>
                  <div className="pt-4">
                    <Link
                      href={activeProgramme.href}
                      onClick={() => setIsMegaMenuOpen(false)}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-aimer-700 underline decoration-aimer-600/40 hover:decoration-aimer-700 transition-colors group/explore"
                    >
                      <span>Explore {activeProgramme.name}</span>
                      <span className="inline-block transition-transform duration-200 group-hover/explore:translate-x-1">
                        →
                      </span>
                    </Link>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </header>

      {/* =======================================================================
          DIM SCRIM OVERLAY (Translucent dark overlay below header, no blur)
          ======================================================================= */}
      {isMegaMenuOpen && (
        <div
          aria-hidden="true"
          onClick={() => setIsMegaMenuOpen(false)}
          className="fixed inset-0 top-0 bg-black/40 z-40 transition-opacity duration-300"
        />
      )}

      {/* =======================================================================
          MOBILE MENU PANEL (< 960px): Top-down wipe with clip-path
          ======================================================================= */}
      <div
        style={{
          clipPath: isMobileMenuOpen || isReducedMotion ? 'inset(0 0 0% 0)' : 'inset(0 0 100% 0)',
          visibility: isMobileMenuOpen ? 'visible' : 'hidden',
          transition: isReducedMotion
            ? 'none'
            : `clip-path 0.5s cubic-bezier(0.7, 0, 0.2, 1), visibility 0s ${
                isMobileMenuOpen ? '0s' : '0.5s'
              }`,
        }}
        className="fixed inset-x-0 bottom-0 top-[68px] sm:top-[84px] bg-white z-40 flex flex-col justify-between overflow-y-auto min-[960px]:hidden px-6 py-8"
      >
        <div className="space-y-1">
          {/* Programmes Accordion Row */}
          <div className="border-b border-charcoal-200/80 pb-3">
            <button
              type="button"
              onClick={() => setIsProgrammesAccordionOpen((prev) => !prev)}
              className="w-full flex items-center justify-between text-2xl font-medium text-charcoal-900 py-3 text-left font-poppins cursor-pointer"
            >
              <span>Programmes</span>
              <svg
                className={`w-5 h-5 text-charcoal-500 transition-transform duration-300 ${
                  isProgrammesAccordionOpen ? 'rotate-180 text-aimer-600' : ''
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Accordion List with grid-template-rows */}
            <div
              style={{
                display: 'grid',
                gridTemplateRows: isProgrammesAccordionOpen ? '1fr' : '0fr',
                transition: 'grid-template-rows 0.35s ease-out',
              }}
              className="overflow-hidden"
            >
              <div className="min-h-0 space-y-3 pt-2 pb-4 pl-3">
                {NAVBAR_PROGRAMMES.map((prog) => (
                  <Link
                    key={prog.id}
                    href={prog.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block p-2 border-l-2 border-aimer-600 bg-[#EAF7F6]/60 pl-3"
                  >
                    <div className="text-base font-semibold text-charcoal-900 font-poppins">
                      {prog.name}
                    </div>
                    <div className="text-xs text-charcoal-600 font-light mt-0.5">
                      {prog.fullName}
                    </div>
                    <div className="text-[11px] text-aimer-700 font-medium mt-1">
                      {prog.duration}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Regular Navigation Links */}
          {[
            { label: 'About', href: '/about' },
            { label: 'Parents', href: '/parents' },
            { label: 'The AIMER Method', href: '/#method' },
            { label: 'Outcomes & Careers', href: '/#outcomes' },
            { label: 'CXO Mentors', href: '/#mentors' },
            { label: 'Smart Campus', href: '/#campus' },
          ].map((item) => {
            const isCurrent = pathname === item.href;
            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                aria-current={isCurrent ? 'page' : undefined}
                className={`block text-2xl font-medium border-b border-charcoal-200/80 py-4 font-poppins transition-colors ${
                  isCurrent
                    ? 'text-aimer-600 font-semibold'
                    : 'text-charcoal-900 hover:text-aimer-600'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        {/* Bottom Drawer Actions */}
        <div className="pt-8 space-y-4">
          <a
            href="tel:+917450030600"
            className="flex items-center gap-2 text-sm text-charcoal-700 py-1"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>Admissions Helpline:</span>
            <span className="font-semibold text-aimer-700">+91 74500 30600</span>
          </a>

          <Link
            href={isProgramPage ? '#admission' : '/#admissions'}
            onClick={() => setIsMobileMenuOpen(false)}
            className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider text-white bg-aimer-600 hover:bg-aimer-700 transition-colors shadow-sm"
          >
            <span>APPLY VIA NAAT</span>
            <span>→</span>
          </Link>
        </div>
      </div>

      {/* =======================================================================
          SCOPED KEYFRAMES: Preview Fade & Rise Animation
          ======================================================================= */}
      <style jsx>{`
        @keyframes previewRise {
          0% {
            opacity: 0;
            transform: translateY(14px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .preview-fade-rise {
          animation: previewRise 0.55s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
        }
        .preview-fade-rise-delayed {
          animation: previewRise 0.55s cubic-bezier(0.2, 0.8, 0.2, 1) 60ms forwards;
        }
      `}</style>
    </>
  );
};

export default Navbar;
