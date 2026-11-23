'use client';

import React, { useEffect, useRef, useState } from 'react';
import { ABOUT_VIDEO_CONFIG } from '@/contents/about';

interface HeroBackgroundVideoProps {
  className?: string;
}

export const HeroBackgroundVideo: React.FC<HeroBackgroundVideoProps> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [canLoadVideo, setCanLoadVideo] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // 1. Check user preferences & network constraints
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const connection = (navigator as unknown as { connection?: { saveData?: boolean; effectiveType?: string } })
      .connection;
    const isSaveData = connection?.saveData === true;
    const isSlowConnection = connection?.effectiveType === '2g' || connection?.effectiveType === '3g';

    if (prefersReducedMotion || isSaveData || isSlowConnection) {
      return; // Keep poster only
    }

    // 2. Defer video load until after window load / idle callback to protect LCP
    const loadTask = () => {
      setCanLoadVideo(true);
    };

    if ('requestIdleCallback' in window) {
      const id = (window as Window & { requestIdleCallback: (cb: () => void, opts?: { timeout: number }) => number })
        .requestIdleCallback(loadTask, { timeout: 1200 });
      return () => {
        if ('cancelIdleCallback' in window) {
          (window as Window & { cancelIdleCallback: (id: number) => void }).cancelIdleCallback(id);
        }
      };
    } else {
      const timer = setTimeout(loadTask, 300);
      return () => clearTimeout(timer);
    }
  }, []);

  // Handle video element setup and playback controls
  useEffect(() => {
    if (!canLoadVideo || !videoRef.current || hasError) return;

    const video = videoRef.current;

    const handleCanPlay = () => {
      setVideoLoaded(true);
      video.play().catch(() => {
        // Autoplay rejection is handled gracefully
      });
    };

    const handleError = () => {
      setHasError(true);
      setVideoLoaded(false);
    };

    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('error', handleError);

    // 3. Pause video when scrolled out of view (< 5% visible)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.05) {
            if (video.paused && videoLoaded) {
              video.play().catch(() => {});
            }
          } else {
            if (!video.paused) {
              video.pause();
            }
          }
        });
      },
      { threshold: [0, 0.05, 0.5] }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    // 4. Pause video when browser tab is hidden
    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (!video.paused) video.pause();
      } else {
        if (video.paused && videoLoaded) video.play().catch(() => {});
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('error', handleError);
      observer.disconnect();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [canLoadVideo, hasError, videoLoaded]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      tabIndex={-1}
      className={`absolute inset-0 overflow-hidden pointer-events-none select-none z-0 isolate ${className}`}
    >
      {/* Decorative Video Layer (No image overlay) */}
      {canLoadVideo && !hasError && (
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
          className="w-full h-full object-cover transition-opacity duration-1000 ease-out"
          style={{
            opacity: videoLoaded ? 0.6 : 0,
          }}
        >
          <source src={ABOUT_VIDEO_CONFIG.mp4Url} type="video/mp4" />
          <source src={ABOUT_VIDEO_CONFIG.webmUrl} type="video/webm" />
        </video>
      )}

      {/* Scrim Overlays ensuring WCAG text contrast */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/70 to-white/30" />
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-white via-white/80 to-transparent" />
    </div>
  );
};

