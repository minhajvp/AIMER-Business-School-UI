'use client';

import React, { useState } from 'react';

interface HsbipVideoFacadeProps {
  youtubeId: string;
  title: string;
  runtime: string;
  locationNote?: string;
}

export const HsbipVideoFacade: React.FC<HsbipVideoFacadeProps> = ({
  youtubeId,
  title,
  runtime,
  locationNote,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [posterSrc, setPosterSrc] = useState(
    `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`
  );

  return (
    <div className="w-full space-y-3">
      <div
        id="hsbip-film"
        className="relative w-full aspect-video rounded-2xl overflow-hidden bg-charcoal-950 shadow-2xl border border-charcoal-800/80 group"
      >
        {!isPlaying ? (
          <div
            onClick={() => setIsPlaying(true)}
            className="absolute inset-0 cursor-pointer z-10"
            role="button"
            tabIndex={0}
            aria-label={`Play ${title}`}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setIsPlaying(true);
              }
            }}
          >
            {/* Background Poster Image */}
            <img
              src={posterSrc}
              alt={title}
              onError={() => {
                // Fallback to high quality hqdefault if maxres is missing
                if (posterSrc.includes('maxresdefault')) {
                  setPosterSrc(`https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`);
                }
              }}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            />

            {/* Dark Cinematic Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/90 via-charcoal-950/40 to-charcoal-950/20 group-hover:from-charcoal-950/80 transition-colors" />

            {/* Center Circular Play Button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative flex items-center justify-center">
                {/* Outer Pulsing Ring */}
                <div className="absolute w-20 h-20 sm:w-28 sm:h-28 rounded-full border border-white/40 animate-ping opacity-60 pointer-events-none" />

                {/* Circular Play Button */}
                <div className="w-16 h-16 sm:w-22 sm:h-22 rounded-full bg-white/20 backdrop-blur-md border border-white/60 flex items-center justify-center text-white shadow-2xl transition-all duration-300 group-hover:scale-110 group-hover:bg-aimer-600 group-hover:border-aimer-500">
                  <svg
                    className="w-7 h-7 sm:w-8 sm:h-8 fill-white translate-x-0.5"
                    viewBox="0 0 24 24"
                  >
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Top Bar Info Badge */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-[11px] font-poppins font-medium text-white/90">
              <span className="px-3 py-1 rounded-full bg-charcoal-900/80 backdrop-blur-md border border-white/10 uppercase tracking-widest">
                Official Programme Film
              </span>
              <span className="px-2.5 py-1 rounded-full bg-charcoal-900/80 backdrop-blur-md border border-white/10">
                {runtime}
              </span>
            </div>

            {/* Bottom Caption */}
            <div className="absolute bottom-4 left-4 right-4">
              <div className="text-white font-semibold text-sm sm:text-base drop-shadow-md">
                {title}
              </div>
              <div className="text-charcoal-300 text-xs line-clamp-1 mt-0.5">
                Watch the campus immersion, classroom labs, and student ventures
              </div>
            </div>
          </div>
        ) : (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full border-0"
          />
        )}
      </div>

      {locationNote && (
        <p className="text-[11px] sm:text-xs text-charcoal-500 text-center font-light">
          {locationNote}
        </p>
      )}
    </div>
  );
};

