'use client';

import React, { useEffect, useRef } from 'react';
import { ABOUT_VIDEO_CONFIG } from '@/contents/about';

interface CampusFilmModalProps {
  isOpen: boolean;
  onClose: () => void;
  triggerRef?: React.RefObject<HTMLButtonElement | null>;
}

export const CampusFilmModal: React.FC<CampusFilmModalProps> = ({
  isOpen,
  onClose,
  triggerRef,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  // Lock scroll and handle keyboard accessibility (Esc & focus trap)
  useEffect(() => {
    if (!isOpen) return;

    // 1. Lock page scroll
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // 2. Focus close button on open
    setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 50);

    // 3. Handle Esc key
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);

      // Restore focus to trigger button
      triggerRef?.current?.focus();
    };
  }, [isOpen, onClose, triggerRef]);

  // Cleanly stop video & abort network stream on close
  const handleClose = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.removeAttribute('src');
      videoRef.current.load();
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="AIMER Business School Official Campus Film"
      className="fixed inset-0 z-50 flex items-center justify-center p-3.5 sm:p-6"
    >
      {/* Backdrop */}
      <div
        onClick={handleClose}
        className="fixed inset-0 bg-charcoal-950/85 backdrop-blur-sm transition-opacity duration-300"
      />

      {/* Lightbox Container */}
      <div className="relative w-full max-w-5xl bg-black rounded-2xl overflow-hidden shadow-2xl z-10 border border-charcoal-800">
        {/* Top Control Bar with Close Button */}
        <div className="absolute top-3 right-3 z-20 flex items-center gap-3">
          <button
            ref={closeButtonRef}
            type="button"
            onClick={handleClose}
            aria-label="Close campus film"
            className="w-10 h-10 rounded-full bg-charcoal-900/80 hover:bg-charcoal-800 text-white flex items-center justify-center border border-white/20 transition-colors cursor-pointer"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* 16:9 Video Box */}
        <div className="relative aspect-video w-full bg-black flex items-center justify-center">
          <video
            ref={videoRef}
            controls
            autoPlay
            playsInline
            className="w-full h-full object-contain"
          >
            <source src={ABOUT_VIDEO_CONFIG.mp4Url} type="video/mp4" />
            <source src={ABOUT_VIDEO_CONFIG.webmUrl} type="video/webm" />
            Your browser does not support HTML5 video playback.
          </video>
        </div>
      </div>
    </div>
  );
};

