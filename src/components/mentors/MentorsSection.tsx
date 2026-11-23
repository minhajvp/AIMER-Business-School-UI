'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { SectionBadge } from '@/components/ui/SectionBadge';
import { Mentor } from '@/types';
import { mentorsData } from '@/data/mentors.data';

interface MentorsSectionProps {
  mentors?: Mentor[];
}

type CategoryType = 'Core Faculty' | 'Visiting Faculty' | 'Industry Experts';

export const MentorsSection: React.FC<MentorsSectionProps> = ({ mentors }) => {
  const allMentors = useMemo(() => {
    return mentors && mentors.length > 0 ? mentors : mentorsData;
  }, [mentors]);

  const categories: CategoryType[] = ['Core Faculty', 'Visiting Faculty', 'Industry Experts'];
  const [activeCategory, setActiveCategory] = useState<CategoryType>('Core Faculty');
  const [isSwitching, setIsSwitching] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  // Detail Sheet Modal State
  const [selectedMember, setSelectedMember] = useState<Mentor | null>(null);
  const [sheetOrigin, setSheetOrigin] = useState<{ x: string; y: string }>({ x: '50%', y: '50%' });
  const [isSheetAnimating, setIsSheetAnimating] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const detailsScrollRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const triggerElementRef = useRef<HTMLElement | null>(null);

  // Rail DOM & drag state
  const railContainerRef = useRef<HTMLDivElement>(null);
  const indexContainerRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const scrollStartXRef = useRef(0);
  const hasDraggedFarRef = useRef(false);

  // Scroll Mask State
  const [isAtEnd, setIsAtEnd] = useState(false);

  // Indicator position (vertical on desktop, horizontal on mobile)
  const [indicatorOffset, setIndicatorOffset] = useState<number>(0);
  const [indicatorSize, setIndicatorSize] = useState<number>(0);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const tabButtonRefs = useRef<Map<string, HTMLButtonElement>>(new Map());

  // Detect reduced motion & mobile screen width & mounting
  useEffect(() => {
    setIsMounted(true);
    if (typeof window !== 'undefined') {
      const media = window.matchMedia('(prefers-reduced-motion: reduce)');
      setIsReducedMotion(media.matches);
      const listener = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
      media.addEventListener('change', listener);

      const checkMobile = () => {
        setIsMobile(window.innerWidth < 860);
      };
      checkMobile();
      window.addEventListener('resize', checkMobile);

      return () => {
        media.removeEventListener('change', listener);
        window.removeEventListener('resize', checkMobile);
      };
    }
  }, []);

  // Filter members by active category
  const activeMembers = useMemo(() => {
    return allMentors.filter((m) => m.category === activeCategory);
  }, [allMentors, activeCategory]);

  // Counts for each category
  const categoryCounts = useMemo(() => {
    return {
      'Core Faculty': allMentors.filter((m) => m.category === 'Core Faculty').length,
      'Visiting Faculty': allMentors.filter((m) => m.category === 'Visiting Faculty').length,
      'Industry Experts': allMentors.filter((m) => m.category === 'Industry Experts').length,
    };
  }, [allMentors]);

  // Re-measure indicator position
  const updateIndicator = useCallback(() => {
    const activeBtn = tabButtonRefs.current.get(activeCategory);
    if (!activeBtn) return;

    if (isMobile) {
      setIndicatorOffset(activeBtn.offsetLeft);
      setIndicatorSize(activeBtn.offsetWidth);
    } else {
      const center = activeBtn.offsetTop + activeBtn.offsetHeight / 2;
      setIndicatorOffset(center);
    }
  }, [activeCategory, isMobile]);

  useEffect(() => {
    updateIndicator();
    const handleResize = () => updateIndicator();
    window.addEventListener('resize', handleResize);
    if (document.fonts?.ready) {
      document.fonts.ready.then(updateIndicator);
    }
    return () => window.removeEventListener('resize', handleResize);
  }, [updateIndicator]);

  // Scroll updates with requestAnimationFrame for right-edge mask fade
  const updateScrollState = useCallback(() => {
    const el = railContainerRef.current;
    if (!el) return;

    const maxScroll = el.scrollWidth - el.clientWidth;
    if (maxScroll <= 0) {
      setIsAtEnd(true);
      return;
    }

    const current = el.scrollLeft;
    setIsAtEnd(current >= maxScroll - 8);
  }, []);

  useEffect(() => {
    const el = railContainerRef.current;
    if (!el) return;

    let rAFId: number;
    const handleScroll = () => {
      cancelAnimationFrame(rAFId);
      rAFId = requestAnimationFrame(updateScrollState);
    };

    el.addEventListener('scroll', handleScroll, { passive: true });
    updateScrollState();

    return () => {
      cancelAnimationFrame(rAFId);
      el.removeEventListener('scroll', handleScroll);
    };
  }, [updateScrollState, activeCategory]);

  // Category switch with smooth fade-out and wipe reveal
  const handleCategorySwitch = (cat: CategoryType) => {
    if (cat === activeCategory || isSwitching) return;

    setIsSwitching(true);

    if (isReducedMotion) {
      setActiveCategory(cat);
      if (railContainerRef.current) railContainerRef.current.scrollLeft = 0;
      setIsSwitching(false);
      return;
    }

    setTimeout(() => {
      setActiveCategory(cat);
      if (railContainerRef.current) railContainerRef.current.scrollLeft = 0;
      setTimeout(() => {
        setIsSwitching(false);
      }, 50);
    }, 240);
  };

  // Mouse Drag-to-scroll logic
  const handlePointerDown = (e: React.PointerEvent) => {
    if (e.pointerType !== 'mouse' || e.button !== 0) return;
    isDraggingRef.current = true;
    dragStartXRef.current = e.clientX;
    scrollStartXRef.current = railContainerRef.current?.scrollLeft || 0;
    hasDraggedFarRef.current = false;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current || !railContainerRef.current) return;
    const dx = e.clientX - dragStartXRef.current;
    if (Math.abs(dx) > 5) {
      hasDraggedFarRef.current = true;
    }
    railContainerRef.current.scrollLeft = scrollStartXRef.current - dx;
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
    setTimeout(() => {
      hasDraggedFarRef.current = false;
    }, 50);
  };

  // Open Detail Sheet
  const openDetailSheet = (member: Mentor, e: React.MouseEvent<HTMLElement>) => {
    if (hasDraggedFarRef.current) return;

    triggerElementRef.current = e.currentTarget;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = `${Math.round(((rect.left + rect.width / 2) / window.innerWidth) * 100)}%`;
    const y = `${Math.round(((rect.top + rect.height / 2) / window.innerHeight) * 100)}%`;
    setSheetOrigin({ x, y });

    setSelectedMember(member);
    setIsSheetAnimating(true);
    document.body.style.overflow = 'hidden';

    setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 100);
  };

  // Close Detail Sheet
  const closeDetailSheet = useCallback(() => {
    setIsSheetAnimating(false);
    setTimeout(() => {
      setSelectedMember(null);
      document.body.style.overflow = '';
      triggerElementRef.current?.focus();
    }, 280);
  }, []);

  // Navigate adjacent member in sheet
  const activeCategoryMembers = activeMembers;
  const currentMemberIndex = selectedMember
    ? activeCategoryMembers.findIndex((m) => m.id === selectedMember.id)
    : -1;

  const navigateMember = (direction: -1 | 1) => {
    if (currentMemberIndex === -1) return;
    const nextIdx = currentMemberIndex + direction;
    if (nextIdx >= 0 && nextIdx < activeCategoryMembers.length) {
      setSelectedMember(activeCategoryMembers[nextIdx]);
      if (detailsScrollRef.current) {
        detailsScrollRef.current.scrollTop = 0;
      }
    }
  };

  // Keyboard controls for modal (Esc to close, Arrow keys to navigate)
  useEffect(() => {
    if (!selectedMember) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        closeDetailSheet();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        navigateMember(-1);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        navigateMember(1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  // Staircase height formula:
  // First portrait is tallest (430px desktop, 340px mobile).
  // Each next is shorter by min(34px, (maxHeight - minHeight) / (count - 1))
  const count = activeMembers.length;
  const maxHeight = isMobile ? 340 : 430;
  const minHeight = isMobile ? 230 : 270;
  const stepHeight = count > 1 ? Math.min(34, (maxHeight - minHeight) / (count - 1)) : 0;

  return (
    <section id="mentors" className="py-20 lg:py-28 bg-[#fafbfc] border-b border-charcoal-200 relative select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* =========================================================================
            SECTION HEADER
            - Eyebrow: FACULTY & MENTORS
            - Heading with accent: Meet the leading minds shaping future business leaders.
            - Text link on right with hover nudge
            ========================================================================= */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-charcoal-200">
          <div className="space-y-2.5 max-w-2xl">
            <SectionBadge variant="teal">AIMER Startup Series &amp; Masterclasses</SectionBadge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-charcoal-900 leading-tight font-poppins">
              Meet the leading minds{' '}
              <span className="text-aimer-600 block sm:inline font-normal italic">
                shaping future business leaders.
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-charcoal-600 font-light leading-relaxed">
              Our students learn strategy, financial modeling, and venture building directly from the operators who run high-growth enterprises and venture capital funds.
            </p>
          </div>

          <div className="shrink-0 pt-2">
            <a
              href="#admissions"
              className="group inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-charcoal-900 hover:text-aimer-600 transition-colors pb-1 border-b border-aimer-600"
            >
              <span>View all 38 Faculty &amp; Mentors</span>
              <span className="transition-transform duration-200 group-hover:translate-x-1.5">&rarr;</span>
            </a>
          </div>
        </div>

        {/* =========================================================================
            MAIN TWO-COLUMN LAYOUT (DESKTOP) / STACK (MOBILE)
            ========================================================================= */}
        <div className="mt-12 lg:mt-16 flex flex-col lg:flex-row items-start gap-8 lg:gap-12">
          
          {/* =========================================================================
              CATEGORY INDEX (LEFT)
              - 3 vertical buttons on desktop, horizontal tabs on mobile
              - Large 07 count numeral
              - Sliding round dot with halo ring along the vertical hairline
              ========================================================================= */}
          <div
            ref={indexContainerRef}
            className="w-full lg:w-60 shrink-0 relative lg:border-r lg:border-charcoal-200 lg:pr-8"
          >
            {/* Desktop: Vertical Hairline Indicator Dot */}
            {!isMobile && (
              <div
                aria-hidden="true"
                style={{
                  top: 0,
                  transform: `translateY(${indicatorOffset - 6}px)`,
                  transition: isReducedMotion ? 'none' : 'transform 0.55s cubic-bezier(0.25, 1, 0.5, 1)',
                }}
                className="absolute -right-[6.5px] w-3 h-3 rounded-full bg-aimer-600 ring-4 ring-aimer-500/20 pointer-events-none z-10"
              />
            )}

            {/* Mobile: Horizontal Bar Indicator */}
            {isMobile && (
              <div
                aria-hidden="true"
                style={{
                  bottom: 0,
                  left: `${indicatorOffset}px`,
                  width: `${indicatorSize}px`,
                  transition: isReducedMotion ? 'none' : 'all 0.45s cubic-bezier(0.25, 1, 0.5, 1)',
                }}
                className="absolute h-[2px] bg-aimer-600 pointer-events-none z-10"
              />
            )}

            {/* Category Buttons List */}
            <div
              role="tablist"
              aria-label="Faculty Categories"
              className={`flex ${
                isMobile
                  ? 'flex-row justify-between border-b border-charcoal-200 pb-1'
                  : 'flex-col space-y-8 py-2'
              }`}
            >
              {categories.map((cat) => {
                const isActive = activeCategory === cat;
                const countFormatted = String(categoryCounts[cat] || 0).padStart(2, '0');

                return (
                  <button
                    key={cat}
                    role="tab"
                    id={`tab-${cat.replace(/\s+/g, '-').toLowerCase()}`}
                    aria-selected={isActive}
                    ref={(el) => {
                      if (el) tabButtonRefs.current.set(cat, el);
                      else tabButtonRefs.current.delete(cat);
                    }}
                    type="button"
                    onClick={() => handleCategorySwitch(cat)}
                    disabled={isSwitching}
                    className={`text-left focus:outline-none transition-colors duration-300 cursor-pointer ${
                      isMobile ? 'pb-3 px-2 flex-1 text-center' : ''
                    }`}
                  >
                    <div
                      className={`text-xs sm:text-sm font-semibold tracking-wide transition-colors ${
                        isActive ? 'text-charcoal-900 font-bold' : 'text-charcoal-500 hover:text-charcoal-800'
                      }`}
                    >
                      {cat}
                    </div>

                    <div
                      className={`text-3xl sm:text-4xl lg:text-5xl font-bold font-poppins mt-1 transition-colors ${
                        isActive ? 'text-aimer-600' : 'text-charcoal-300'
                      }`}
                    >
                      {countFormatted}
                    </div>

                    {!isMobile && (
                      <div className="text-[10px] uppercase font-poppins tracking-widest text-charcoal-400 mt-0.5 font-medium">
                        Members
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* =========================================================================
              PORTRAIT RAIL (RIGHT)
              - Horizontal flex row aligned to flex-end (descending staircase)
              - Fixed rail height (460px desktop, 370px mobile)
              - Square cornered, logo box + name + position beneath
              - Drag-to-scroll, fade mask on right
              ========================================================================= */}
          <div className="flex-1 w-full min-w-0 relative">
            
            {/* The Rail Viewport */}
            <div
              ref={railContainerRef}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
              style={{
                overscrollBehaviorX: 'contain',
                WebkitMaskImage: isAtEnd
                  ? 'none'
                  : 'linear-gradient(to right, black 84%, transparent 100%)',
                maskImage: isAtEnd
                  ? 'none'
                  : 'linear-gradient(to right, black 84%, transparent 100%)',
              }}
              className={`overflow-x-auto no-scrollbar pb-4 pt-4 cursor-grab active:cursor-grabbing transition-opacity duration-260 ${
                isSwitching ? 'opacity-0 translate-y-3' : 'opacity-100 translate-y-0'
              }`}
            >
              {/* Flex row anchored at flex-end */}
              <div
                className="flex items-end gap-5 sm:gap-6 min-w-max"
                style={{
                  height: isMobile ? '355px' : '445px',
                }}
              >
                {activeMembers.map((member, index) => {
                  const portraitHeight = Math.round(maxHeight - index * stepHeight);

                  return (
                    <div
                      key={member.id}
                      onClick={(e) => openDetailSheet(member, e)}
                      tabIndex={0}
                      role="button"
                      aria-haspopup="dialog"
                      aria-label={`${member.name}, ${member.role}`}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          openDetailSheet(member, e as any);
                        }
                      }}
                      className="group flex flex-col justify-end shrink-0 focus:outline-none cursor-pointer"
                      style={{
                        width: isMobile ? '168px' : '200px',
                      }}
                    >
                      {/* Portrait Frame (Staircase Height, square corners, lifts 10px on hover) */}
                      <div
                        style={{
                          height: `${portraitHeight}px`,
                        }}
                        className="relative w-full bg-[#EAF2F3] border border-charcoal-200 overflow-hidden transition-all duration-300 group-hover:-translate-y-2.5 group-focus:ring-2 group-focus:ring-aimer-600 animate-portrait-wipe"
                      >
                        {/* Neutral brand avatar fallback background (Teal silhouette) */}
                        <div className="absolute inset-0 flex flex-col items-center justify-end pb-0 pointer-events-none bg-[#E7F2F3]">
                          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-aimer-600/80 mb-3" />
                          <div className="w-32 sm:w-36 h-24 sm:h-28 rounded-t-full bg-aimer-600/80" />
                        </div>

                        {/* Real photo if provided */}
                        {member.photo && (
                          <img
                            src={member.photo}
                            alt={member.name}
                            className="relative z-10 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 select-none pointer-events-none block"
                            loading={index <= 3 ? 'eager' : 'lazy'}
                            onError={(e) => {
                              // If image fails to load, gracefully fall back to brand silhouette
                              (e.target as HTMLImageElement).style.display = 'none';
                            }}
                          />
                        )}
                      </div>

                      {/* Under Portrait Caption Row (Company Logo Box + Name + Role) */}
                      <div className="pt-3 border-t border-charcoal-200 flex items-center gap-2.5 mt-2 animate-caption-fade">
                        {/* 32px Square Company Logo Box */}
                        <div className="w-8 h-8 shrink-0 bg-white border border-charcoal-200 flex items-center justify-center p-1 text-[11px] font-bold text-aimer-700 font-poppins">
                          {member.companyLogo ? (
                            <img
                              src={member.companyLogo}
                              alt={member.organization}
                              className="w-full h-full object-contain"
                              onError={(e) => {
                                (e.target as HTMLElement).style.display = 'none';
                              }}
                            />
                          ) : (
                            member.companyInitials || member.initials || 'AB'
                          )}
                        </div>

                        {/* Name & Position */}
                        <div className="min-w-0 flex-1">
                          <h4 className="text-xs sm:text-sm font-semibold text-charcoal-900 truncate leading-snug font-poppins group-hover:text-aimer-700 transition-colors">
                            {member.name}
                          </h4>
                          <p className="text-[11px] text-charcoal-500 truncate font-light mt-0.5">
                            {member.role}
                          </p>
                        </div>
                      </div>

                    </div>
                  );
                })}
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* =========================================================================
          FULL-DETAIL SHEET (MODAL DIALOG)
          - Rendered via createPortal directly to document.body
          - Escapes all parent container transforms and content-visibility stacking contexts
          - Opens in the absolute center of the user's viewport screen
          ========================================================================= */}
      {selectedMember && isMounted && typeof document !== 'undefined' && createPortal(
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Faculty Details: ${selectedMember.name}`}
          className={`fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-5 md:p-6 transition-all duration-300 ${
            isSheetAnimating ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        >
          {/* Dimmed Overlay that covers the whole screen including navbar */}
          <div
            onClick={closeDetailSheet}
            className="fixed inset-0 bg-charcoal-950/75 backdrop-blur-xs transition-opacity duration-300"
          />

          {/* Modal Container: centered in absolute center of screen */}
          <div
            style={{
              transform: isSheetAnimating ? 'scale(1) translateY(0)' : 'scale(0.96) translateY(12px)',
              transition: isReducedMotion
                ? 'none'
                : 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.25s ease',
            }}
            className="relative z-10 w-full max-w-2xl max-h-[82vh] sm:h-[480px] bg-white rounded-2xl border border-charcoal-200/90 flex flex-col sm:flex-row overflow-hidden shadow-2xl"
          >
            {/* Close Button at Top Right */}
            <button
              ref={closeButtonRef}
              type="button"
              onClick={closeDetailSheet}
              aria-label="Close details"
              className="absolute top-3 right-3 sm:top-3.5 sm:right-3.5 z-30 w-8 h-8 rounded-full bg-white/95 sm:bg-charcoal-100/90 hover:bg-charcoal-200 text-charcoal-700 flex items-center justify-center transition-all cursor-pointer shadow-xs border border-charcoal-200/60"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Left Column: Photo + Navigation Bar */}
            <div className="w-full sm:w-56 md:w-64 shrink-0 bg-aimer-50/50 flex flex-col justify-between border-b sm:border-b-0 sm:border-r border-charcoal-200">
              
              {/* Photo Area */}
              <div className="relative w-full h-44 sm:h-auto sm:flex-1 overflow-hidden bg-aimer-50/70">
                {/* Silhouette Fallback */}
                <div className="absolute inset-0 flex flex-col items-center justify-end pb-0 pointer-events-none bg-aimer-100/60">
                  <div className="w-16 h-16 rounded-full bg-aimer-600/70 mb-3" />
                  <div className="w-32 h-24 rounded-t-full bg-aimer-600/70" />
                </div>

                {selectedMember.photo && (
                  <img
                    key={selectedMember.id}
                    src={selectedMember.photo}
                    alt={selectedMember.name}
                    className="relative z-10 w-full h-full object-cover object-top block animate-photo-fade"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                )}
              </div>

              {/* Counter & Arrow Bar */}
              <div className="h-11 px-3 bg-white border-t border-charcoal-200 flex items-center justify-between shrink-0">
                <div className="text-xs font-poppins font-medium text-charcoal-800 tracking-tight">
                  {String(currentMemberIndex + 1).padStart(2, '0')}{' '}
                  <span className="text-charcoal-400 font-light">/</span>{' '}
                  {String(activeCategoryMembers.length).padStart(2, '0')}
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => navigateMember(-1)}
                    disabled={currentMemberIndex <= 0}
                    aria-label="Previous member in category"
                    className={`w-7 h-7 rounded-md border border-charcoal-200 flex items-center justify-center text-charcoal-800 bg-white transition-colors cursor-pointer ${
                      currentMemberIndex <= 0
                        ? 'opacity-30 cursor-not-allowed'
                        : 'hover:border-aimer-600 hover:text-aimer-600 hover:bg-aimer-50/50 active:scale-95'
                    }`}
                  >
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>

                  <button
                    type="button"
                    onClick={() => navigateMember(1)}
                    disabled={currentMemberIndex >= activeCategoryMembers.length - 1}
                    aria-label="Next member in category"
                    className={`w-7 h-7 rounded-md border border-charcoal-200 flex items-center justify-center text-charcoal-800 bg-white transition-colors cursor-pointer ${
                      currentMemberIndex >= activeCategoryMembers.length - 1
                        ? 'opacity-30 cursor-not-allowed'
                        : 'hover:border-aimer-600 hover:text-aimer-600 hover:bg-aimer-50/50 active:scale-95'
                    }`}
                  >
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>

            </div>

            {/* Right Column: Scrollable Details */}
            <div
              ref={detailsScrollRef}
              className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-3.5"
            >
              <div key={selectedMember.id} className="space-y-3.5">
                
                {/* Header Information */}
                <div className="pr-8">
                  {/* Category Tag */}
                  <span className="inline-block px-2.5 py-0.5 bg-aimer-50 text-aimer-700 text-[10px] font-semibold uppercase tracking-wider rounded-full border border-aimer-200/80">
                    {selectedMember.category}
                  </span>

                  {/* Name as heading */}
                  <h3 className="text-xl sm:text-2xl font-bold text-charcoal-900 tracking-tight font-poppins mt-2">
                    {selectedMember.name}
                  </h3>

                  {/* Position in primary color */}
                  <div className="text-xs sm:text-sm font-medium text-aimer-600 mt-0.5 font-poppins">
                    {selectedMember.role}
                  </div>

                  {/* Company Row: Logo Box + Company Name */}
                  {selectedMember.organization && (
                    <div className="flex items-center gap-2 mt-2 pt-0.5">
                      <div className="w-6 h-6 rounded-md bg-white border border-charcoal-200 flex items-center justify-center p-0.5 text-[10px] font-bold text-aimer-700 font-poppins shrink-0">
                        {selectedMember.companyLogo ? (
                          <img
                            src={selectedMember.companyLogo}
                            alt={selectedMember.organization}
                            className="w-full h-full object-contain"
                            onError={(e) => {
                              (e.target as HTMLElement).style.display = 'none';
                            }}
                          />
                        ) : (
                          selectedMember.companyInitials || 'AB'
                        )}
                      </div>
                      <span className="text-xs font-medium text-charcoal-700">
                        {selectedMember.organization}
                      </span>
                    </div>
                  )}

                  {/* LinkedIn Profile Button */}
                  {selectedMember.linkedin && (
                    <div className="mt-3">
                      <a
                        href={selectedMember.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-aimer-600 hover:bg-aimer-700 text-white text-[11px] font-semibold tracking-wider transition-colors shadow-xs"
                      >
                        <span>LinkedIn Profile</span>
                        <span>&rarr;</span>
                      </a>
                    </div>
                  )}
                </div>

                {/* Biography Section */}
                {selectedMember.bio && (
                  <div className="pt-3 border-t border-charcoal-100">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-aimer-700 mb-1 font-poppins">
                      Biography
                    </div>
                    <p className="text-xs sm:text-[13px] text-charcoal-600 leading-relaxed font-light">
                      {selectedMember.bio}
                    </p>
                  </div>
                )}

                {/* Professional Experience Section */}
                {selectedMember.experience && (
                  <div className="pt-3 border-t border-charcoal-100">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-aimer-700 mb-1 font-poppins">
                      Professional Experience
                    </div>
                    <p className="text-xs sm:text-[13px] text-charcoal-600 leading-relaxed font-light">
                      {selectedMember.experience}
                    </p>
                  </div>
                )}

                {/* Areas of Expertise Section */}
                {selectedMember.expertise && selectedMember.expertise.length > 0 && (
                  <div className="pt-3 border-t border-charcoal-100">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-aimer-700 mb-1.5 font-poppins">
                      Areas of Expertise
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedMember.expertise.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2.5 py-0.5 rounded-md border border-charcoal-200/70 bg-charcoal-50/70 text-[11px] font-medium text-charcoal-700"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            </div>

          </div>
        </div>,
        document.body
      )}

      {/* Scoped Keyframes for Wipe Reveal and Photo Transition */}
      <style jsx>{`
        @keyframes portraitWipe {
          0% {
            clip-path: inset(100% 0 0 0);
          }
          100% {
            clip-path: inset(0% 0 0 0);
          }
        }
        @keyframes captionFade {
          0% {
            opacity: 0;
            transform: translateY(6px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes photoFade {
          0% {
            opacity: 0.3;
            transform: scale(1.05);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-portrait-wipe {
          animation: portraitWipe 0.7s cubic-bezier(0.25, 1, 0.5, 1) forwards;
        }
        .animate-caption-fade {
          animation: captionFade 0.4s ease-out 0.2s forwards;
        }
        .animate-photo-fade {
          animation: photoFade 0.35s ease-out forwards;
        }
      `}</style>
    </section>
  );
};

export default MentorsSection;
