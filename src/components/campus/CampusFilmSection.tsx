'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { SectionBadge } from '@/components/ui/SectionBadge';

// Configurable video sources and poster image (can be swapped anytime)
const VIDEO_CONFIG = {
  src: '/campus-video/hero-1080.mp4',
  poster: 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=1600&q=80',
  runtime: '3:05',
  durationSeconds: 185,
};

export const CampusFilmSection: React.FC = () => {
  // Player state
  const [hasStarted, setHasStarted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isBuffering, setIsBuffering] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(VIDEO_CONFIG.durationSeconds);
  const [controlsVisible, setControlsVisible] = useState(true);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  // Scrubber hover & drag state
  const [isScrubbing, setIsScrubbing] = useState(false);
  const [scrubberHoverPos, setScrubberHoverPos] = useState<number | null>(null);
  const [scrubberHoverTime, setScrubberHoverTime] = useState<string>('0:00');
  const scrubberWidthRef = useRef<number>(1);

  // Magnetic play button state
  const [magneticOffset, setMagneticOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Scroll effect states
  const [scrollProgress, setScrollProgress] = useState(0);
  const [highlightsVisible, setHighlightsVisible] = useState(false);

  // Refs
  const stageContainerRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const scrubberTrackRef = useRef<HTMLDivElement>(null);
  const highlightsRef = useRef<HTMLDivElement>(null);
  const controlsTimeoutRef = useRef<number | null>(null);

  // Format seconds to mm:ss
  const formatTime = (seconds: number) => {
    if (isNaN(seconds) || seconds < 0) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Check prefers-reduced-motion
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const media = window.matchMedia('(prefers-reduced-motion: reduce)');
      setIsReducedMotion(media.matches);
      const listener = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
      media.addEventListener('change', listener);
      return () => media.removeEventListener('change', listener);
    }
  }, []);

  // Scroll-driven scale: scales frame from 0.9 to 1 as it enters viewport
  useEffect(() => {
    if (isReducedMotion) {
      setScrollProgress(1);
      return;
    }

    let rAFId: number;
    const handleScroll = () => {
      cancelAnimationFrame(rAFId);
      rAFId = requestAnimationFrame(() => {
        if (!stageContainerRef.current) return;
        const rect = stageContainerRef.current.getBoundingClientRect();
        const vh = window.innerHeight;
        // Progress: 0 when top is at vh, 1 when reached 65% of screen
        const p = Math.max(0, Math.min(1, (vh - rect.top) / (vh * 0.65)));
        setScrollProgress(p);
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      cancelAnimationFrame(rAFId);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isReducedMotion]);

  // Observer 1: Auto-pause video when <15% visible
  useEffect(() => {
    if (!stageContainerRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting && videoRef.current && !videoRef.current.paused) {
            videoRef.current.pause();
            setIsPlaying(false);
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(stageContainerRef.current);
    return () => observer.disconnect();
  }, []);

  // Observer 2: Highlights strip entrance reveal
  useEffect(() => {
    if (!highlightsRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setHighlightsVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(highlightsRef.current);
    return () => observer.disconnect();
  }, []);

  // Cache scrubber track width with ResizeObserver
  useEffect(() => {
    if (!scrubberTrackRef.current) return;
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        scrubberWidthRef.current = entry.contentRect.width;
      }
    });
    ro.observe(scrubberTrackRef.current);
    return () => ro.disconnect();
  }, [hasStarted]);

  // Auto-hide controls during playback after 2.6s of inactivity
  const resetControlsTimeout = useCallback(() => {
    setControlsVisible(true);
    if (controlsTimeoutRef.current) {
      window.clearTimeout(controlsTimeoutRef.current);
    }
    if (isPlaying && !isScrubbing) {
      controlsTimeoutRef.current = window.setTimeout(() => {
        setControlsVisible(false);
      }, 2600);
    }
  }, [isPlaying, isScrubbing]);

  const handlePointerActivity = () => {
    resetControlsTimeout();
  };

  // Video Action Adapter
  const handlePlay = useCallback(() => {
    if (!hasStarted) {
      setHasStarted(true);
    } else if (videoRef.current) {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
      resetControlsTimeout();
    }
  }, [hasStarted, resetControlsTimeout]);

  const handlePause = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
      setControlsVisible(true);
    }
  }, []);

  const togglePlayPause = useCallback(() => {
    if (!hasStarted) {
      handlePlay();
      return;
    }
    if (videoRef.current) {
      if (videoRef.current.paused) {
        handlePlay();
      } else {
        handlePause();
      }
    }
  }, [hasStarted, handlePlay, handlePause]);

  const toggleMute = () => {
    if (!videoRef.current) return;
    const nextMuted = !videoRef.current.muted;
    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  const toggleFullscreen = () => {
    const el = frameRef.current as any;
    const vid = videoRef.current as any;
    if (!document.fullscreenElement) {
      if (el?.requestFullscreen) {
        el.requestFullscreen().catch(() => {});
      } else if (vid?.webkitEnterFullscreen) {
        vid.webkitEnterFullscreen();
      }
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
      setIsFullscreen(false);
    }
  };

  // Listen to fullscreen changes
  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  // Scrubber drag / seek interactions
  const handleScrubberPointerDown = (e: React.PointerEvent) => {
    const track = scrubberTrackRef.current;
    if (!track) return;
    setIsScrubbing(true);
    track.setPointerCapture(e.pointerId);

    const rect = track.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const targetTime = ratio * duration;
    setCurrentTime(targetTime);
    if (videoRef.current) {
      videoRef.current.currentTime = targetTime;
    }
  };

  const handleScrubberPointerMove = (e: React.PointerEvent) => {
    const track = scrubberTrackRef.current;
    if (!track) return;
    const rect = track.getBoundingClientRect();
    const x = Math.max(0, Math.min(rect.width, e.clientX - rect.left));
    const ratio = x / rect.width;

    setScrubberHoverPos(x);
    setScrubberHoverTime(formatTime(ratio * duration));

    if (isScrubbing) {
      const targetTime = ratio * duration;
      setCurrentTime(targetTime);
      if (videoRef.current) {
        videoRef.current.currentTime = targetTime;
      }
    }
  };

  const handleScrubberPointerUp = (e: React.PointerEvent) => {
    setIsScrubbing(false);
    try {
      scrubberTrackRef.current?.releasePointerCapture(e.pointerId);
    } catch {
      // ignore
    }
  };

  // Keyboard controls on focused video frame
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === ' ' || e.key.toLowerCase() === 'k') {
      e.preventDefault();
      togglePlayPause();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      if (videoRef.current) {
        videoRef.current.currentTime = Math.max(0, videoRef.current.currentTime - 5);
      }
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      if (videoRef.current) {
        videoRef.current.currentTime = Math.min(duration, videoRef.current.currentTime + 5);
      }
    } else if (e.key.toLowerCase() === 'm') {
      e.preventDefault();
      toggleMute();
    } else if (e.key.toLowerCase() === 'f') {
      e.preventDefault();
      toggleFullscreen();
    }
  };

  // Magnetic play button drift on idle hover
  const handleStagePointerMove = (e: React.PointerEvent) => {
    if (hasStarted || isReducedMotion || e.pointerType !== 'mouse') return;
    const stage = stageContainerRef.current;
    if (!stage) return;
    const rect = stage.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = (e.clientX - centerX) * 0.12;
    const deltaY = (e.clientY - centerY) * 0.12;
    setMagneticOffset({
      x: Math.max(-22, Math.min(22, deltaX)),
      y: Math.max(-22, Math.min(22, deltaY)),
    });
  };

  const handleStagePointerLeave = () => {
    setMagneticOffset({ x: 0, y: 0 });
  };

  // Progress fraction
  const progressRatio = duration > 0 ? Math.max(0, Math.min(1, currentTime / duration)) : 0;

  // Scale computation for scroll entrance
  const frameScale = isFullscreen ? 1 : 0.9 + scrollProgress * 0.1;
  const outlineOpacity = scrollProgress;

  return (
    <section id="campus-film" className="py-20 lg:py-28 bg-white border-b border-charcoal-200 relative select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* =========================================================================
            HEADER: 2-column grid on desktop, 1-column on mobile
            ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end pb-12 border-b border-charcoal-200">
          <div className="lg:col-span-7 space-y-2.5">
            <SectionBadge variant="teal">Campus Experience Film</SectionBadge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-charcoal-900 leading-tight font-poppins">
              Inside AIMER Business{' '}
              <span className="text-aimer-600 font-normal italic">School.</span>
            </h2>
          </div>

          <div className="lg:col-span-5 pb-1">
            <p className="text-xs sm:text-sm text-charcoal-600 font-light leading-relaxed">
              Step inside Markaz Knowledge City — explore the cutting-edge facilities, executive boardrooms, corporate mentorship hubs, and immersive student journey.
            </p>
          </div>
        </div>

        {/* =========================================================================
            VIDEO STAGE CONTAINER: 16:9 Aspect Ratio with 14px Offset Outline
            ========================================================================= */}
        <div ref={stageContainerRef} className="mt-12 lg:mt-14 relative max-w-5xl mx-auto">
          
          {/* 14px Primary Offset Outline (8px on mobile) */}
          <div
            aria-hidden="true"
            style={{
              opacity: outlineOpacity,
              transition: isReducedMotion ? 'none' : 'opacity 0.3s linear',
            }}
            className="absolute inset-0 aspect-video translate-x-2 translate-y-2 sm:translate-x-3.5 sm:translate-y-3.5 border border-aimer-600 pointer-events-none z-0"
          />

          {/* Main Video Frame */}
          <div
            ref={frameRef}
            tabIndex={0}
            role="region"
            aria-label="Campus Experience Film Video Player"
            onKeyDown={handleKeyDown}
            onPointerMove={(e) => {
              handlePointerActivity();
              handleStagePointerMove(e);
            }}
            onPointerLeave={handleStagePointerLeave}
            style={{
              transform: isFullscreen ? 'none' : `scale(${frameScale})`,
              transformOrigin: '50% 0%',
              willChange: isFullscreen ? 'auto' : 'transform',
            }}
            className={`relative z-10 w-full aspect-video bg-charcoal-950 overflow-hidden focus:outline-none focus:ring-2 focus:ring-aimer-600 ${
              isPlaying && !controlsVisible ? 'cursor-none' : 'cursor-default'
            }`}
          >
            {/* FACADE PATTERN: Poster Image with Ken-Burns drift while idle */}
            {!hasStarted && (
              <div
                onClick={handlePlay}
                className="absolute inset-0 z-20 cursor-pointer overflow-hidden group"
              >
                <img
                  src={VIDEO_CONFIG.poster}
                  alt="Inside AIMER Business School Markaz Knowledge City Campus"
                  className={`w-full h-full object-cover select-none pointer-events-none ${
                    isReducedMotion ? '' : 'animate-kenburns'
                  }`}
                  loading="lazy"
                />

                {/* Dark Scrim */}
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-300" />

                {/* Centered Circular Play Button with Pulsing Ring */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div
                    style={{
                      transform: `translate3d(${magneticOffset.x}px, ${magneticOffset.y}px, 0)`,
                      transition: 'transform 0.18s ease-out',
                    }}
                    className="relative flex items-center justify-center"
                  >
                    {/* Outer Pulsing Ring */}
                    {!isReducedMotion && (
                      <div className="absolute w-24 h-24 sm:w-32 sm:h-32 rounded-full border border-white/60 animate-ping-ring pointer-events-none" />
                    )}

                    {/* Circular Button */}
                    <button
                      type="button"
                      aria-label="Play Campus Experience Film"
                      className="w-20 h-20 sm:w-28 sm:h-28 rounded-full border-2 border-white bg-white/25 backdrop-blur-xs flex items-center justify-center text-white shadow-xl group-hover:bg-aimer-600 group-hover:border-aimer-600 transition-all duration-300 pointer-events-auto cursor-pointer"
                    >
                      <svg className="w-8 h-8 sm:w-10 sm:h-10 fill-white translate-x-0.5" viewBox="0 0 24 24">
                        <polygon points="5 3 19 12 5 21 5 3" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Bottom-Left Cue */}
                <div className="absolute bottom-5 left-5 sm:bottom-7 sm:left-7 text-white select-none">
                  <div className="text-xs sm:text-sm font-bold tracking-widest uppercase font-poppins drop-shadow-md">
                    WATCH THE FILM
                  </div>
                  <div className="text-[11px] sm:text-xs text-white/80 font-poppins tracking-wider mt-0.5 drop-shadow-sm">
                    Runtime {VIDEO_CONFIG.runtime}
                  </div>
                </div>
              </div>
            )}

            {/* Video Element: Mounted ONLY after first click (Zero initial network overhead) */}
            {hasStarted && (
              <video
                ref={videoRef}
                src={VIDEO_CONFIG.src}
                autoPlay
                playsInline
                preload="auto"
                muted={isMuted}
                onClick={togglePlayPause}
                onDoubleClick={toggleFullscreen}
                onPlay={() => {
                  setIsPlaying(true);
                  setIsBuffering(false);
                  resetControlsTimeout();
                }}
                onPause={() => {
                  setIsPlaying(false);
                  setControlsVisible(true);
                }}
                onTimeUpdate={() => {
                  if (videoRef.current) {
                    setCurrentTime(videoRef.current.currentTime);
                  }
                }}
                onLoadedMetadata={() => {
                  if (videoRef.current) {
                    setDuration(videoRef.current.duration || VIDEO_CONFIG.durationSeconds);
                  }
                }}
                onWaiting={() => setIsBuffering(true)}
                onPlaying={() => {
                  setIsBuffering(false);
                  setIsPlaying(true);
                }}
                onEnded={() => {
                  setIsPlaying(false);
                  setControlsVisible(true);
                }}
                className="w-full h-full object-cover cursor-pointer"
              />
            )}

            {/* Buffering Spinner */}
            {isBuffering && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30">
                <div className="w-10 h-10 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              </div>
            )}

            {/* CONTROL BAR (Bottom scrim) */}
            {hasStarted && (
              <div
                onClick={(e) => e.stopPropagation()}
                className={`absolute bottom-0 inset-x-0 z-30 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-4 sm:p-5 pt-12 transition-opacity duration-300 ${
                  controlsVisible || !isPlaying ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                }`}
              >
                {/* Top Row: Scrubber */}
                <div
                  ref={scrubberTrackRef}
                  role="slider"
                  aria-label="Video scrubber"
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={Math.round(progressRatio * 100)}
                  tabIndex={0}
                  onPointerDown={handleScrubberPointerDown}
                  onPointerMove={handleScrubberPointerMove}
                  onPointerUp={handleScrubberPointerUp}
                  onPointerLeave={() => setScrubberHoverPos(null)}
                  style={{ touchAction: 'none' }}
                  className="group relative w-full h-4 flex items-center cursor-pointer select-none"
                >
                  {/* Hover Time Tooltip */}
                  {scrubberHoverPos !== null && (
                    <div
                      style={{
                        left: `${scrubberHoverPos}px`,
                        transform: 'translateX(-50%)',
                      }}
                      className="absolute -top-7 bg-white text-charcoal-900 text-[10px] font-poppins font-bold px-1.5 py-0.5 pointer-events-none shadow-xs"
                    >
                      {scrubberHoverTime}
                    </div>
                  )}

                  {/* Base Track */}
                  <div className="w-full h-[2px] group-hover:h-[4px] group-focus:h-[4px] bg-white/30 transition-all relative overflow-hidden">
                    {/* Filled Bar */}
                    <div
                      style={{
                        transform: `scaleX(${progressRatio})`,
                        transformOrigin: 'left',
                        transition: isScrubbing ? 'none' : 'transform 0.1s linear',
                      }}
                      className="absolute inset-0 bg-white"
                    />
                  </div>

                  {/* Square Scrubber Thumb in Primary Color */}
                  <div
                    style={{
                      left: `${progressRatio * 100}%`,
                      transform: 'translate(-50%, 0)',
                    }}
                    className="absolute w-3 h-3 bg-aimer-500 border border-white opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity pointer-events-none"
                  />
                </div>

                {/* Bottom Row: Controls */}
                <div className="flex items-center justify-between gap-4 mt-2">
                  
                  {/* Left: Play/Pause & Time */}
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={togglePlayPause}
                      aria-label={isPlaying ? 'Pause' : 'Play'}
                      className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center text-white hover:bg-white/15 transition-colors cursor-pointer"
                    >
                      {isPlaying ? (
                        <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
                          <rect x="6" y="4" width="4" height="16" />
                          <rect x="14" y="4" width="4" height="16" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5 fill-white translate-x-0.5" viewBox="0 0 24 24">
                          <polygon points="5 3 19 12 5 21 5 3" />
                        </svg>
                      )}
                    </button>

                    <div className="text-xs font-poppins font-medium text-white/90 tabular-nums">
                      {formatTime(currentTime)}{' '}
                      <span className="text-white/40">/</span>{' '}
                      {formatTime(duration)}
                    </div>
                  </div>

                  {/* Flexible Spacer */}
                  <div className="flex-1" />

                  {/* Right: Mute & Fullscreen */}
                  <div className="flex items-center gap-1.5">
                    {/* Mute/Unmute */}
                    <button
                      type="button"
                      onClick={toggleMute}
                      aria-label={isMuted ? 'Unmute' : 'Mute'}
                      className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center text-white hover:bg-white/15 transition-colors cursor-pointer"
                    >
                      {isMuted ? (
                        <svg className="w-5 h-5 stroke-white fill-none" viewBox="0 0 24 24" strokeWidth={2}>
                          <path d="M11 5L6 9H2v6h4l5 4V5zM23 9l-6 6M17 9l6 6" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5 stroke-white fill-none" viewBox="0 0 24 24" strokeWidth={2}>
                          <path d="M11 5L6 9H2v6h4l5 4V5zM15.54 8.46a5 5 0 010 7.07M19.07 4.93a10 10 0 010 14.14" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </button>

                    {/* Fullscreen */}
                    <button
                      type="button"
                      onClick={toggleFullscreen}
                      aria-label={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
                      className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center text-white hover:bg-white/15 transition-colors cursor-pointer"
                    >
                      {isFullscreen ? (
                        <svg className="w-5 h-5 stroke-white fill-none" viewBox="0 0 24 24" strokeWidth={2}>
                          <path d="M8 3v3a2 2 0 01-2 2H3m18 0h-3a2 2 0 01-2-2V3m0 18v-3a2 2 0 012-2h3M3 16h3a2 2 0 012 2v3" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5 stroke-white fill-none" viewBox="0 0 24 24" strokeWidth={2}>
                          <path d="M8 3H5a2 2 0 00-2 2v3m18 0V5a2 2 0 00-2-2h-3m0 18h3a2 2 0 002-2v-3M3 16v3a2 2 0 002 2h3" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </button>
                  </div>

                </div>
              </div>
            )}
          </div>

          {/* =========================================================================
              CAPTION ROW DIRECTLY UNDER VIDEO STAGE
              ========================================================================= */}
          <div className="flex items-center justify-between text-[11px] font-poppins uppercase tracking-widest text-charcoal-400 font-medium pt-3.5 px-1">
            <span>MARKAZ KNOWLEDGE CITY · CALICUT</span>
            <span>{VIDEO_CONFIG.runtime}</span>
          </div>

        </div>

        {/* =========================================================================
            FOUR HIGHLIGHTS STRIP: 4-column grid (2x2 on mobile) with hairline dividers
            ========================================================================= */}
        <div
          ref={highlightsRef}
          className="mt-14 pt-10 border-t border-charcoal-200"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-charcoal-200">
            {[
              { value: '125-Acre', label: 'Knowledge City' },
              { value: '12 Mo.', label: 'Corporate Residency' },
              { value: 'Direct', label: 'CXO Mentorship' },
              { value: 'Dubai & SG', label: 'Global Immersions' },
            ].map((item, idx) => (
              <div
                key={idx}
                style={{
                  opacity: highlightsVisible || isReducedMotion ? 1 : 0,
                  transform: highlightsVisible || isReducedMotion ? 'translateY(0)' : 'translateY(16px)',
                  transition: isReducedMotion
                    ? 'none'
                    : `opacity 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) ${idx * 90}ms, transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) ${idx * 90}ms`,
                }}
                className={`py-4 sm:py-2 ${
                  idx % 2 === 1 ? 'pl-6 sm:pl-8' : 'pr-6 sm:px-8'
                } lg:px-8 first:pl-0 last:pr-0`}
              >
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold font-poppins text-charcoal-900 tracking-tight">
                  {item.value}
                </div>
                <div className="text-[10px] sm:text-xs uppercase font-poppins tracking-wider text-charcoal-500 font-medium mt-1">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Scoped Keyframes for Ken-Burns & Pulsing Ring */}
      <style jsx>{`
        @keyframes kenBurns {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.07);
          }
          100% {
            transform: scale(1);
          }
        }
        @keyframes pingRing {
          0% {
            transform: scale(1);
            opacity: 0.8;
          }
          100% {
            transform: scale(1.7);
            opacity: 0;
          }
        }
        .animate-kenburns {
          animation: kenBurns 20s ease-in-out infinite alternate;
        }
        .animate-ping-ring {
          animation: pingRing 2.4s cubic-bezier(0.2, 0.8, 0.2, 1) infinite;
        }
      `}</style>
    </section>
  );
};

export default CampusFilmSection;

