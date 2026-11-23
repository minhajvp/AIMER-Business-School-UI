'use client';

import React, { useState } from 'react';

interface PgbipVideoFacadeProps {
  youtubeId: string;
  title: string;
  runtime: string;
  poster: string;
}

export const PgbipVideoFacade: React.FC<PgbipVideoFacadeProps> = ({
  youtubeId,
  title,
  runtime,
  poster,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [posterSrc, setPosterSrc] = useState(
    `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`
  );

  return (
    <div
      id="program-film"
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
              if (posterSrc !== poster) {
                setPosterSrc(poster);
              }
            }}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />

          {/* Dark Cinematic Scrim Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/90 via-charcoal-950/40 to-charcoal-950/20 group-hover:from-charcoal-950/80 transition-colors" />

          {/* Center Circular Play Button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative flex items-center justify-center">
              {/* Outer Pulsing Ring */}
              <div className="absolute w-24 h-24 sm:w-28 sm:h-28 rounded-full border border-white/40 animate-ping opacity-60 pointer-events-none" />

              {/* Circular Play Button */}
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white/20 backdrop-blur-md border border-white/60 flex items-center justify-center text-white shadow-2xl transition-all duration-300 group-hover:scale-110 group-hover:bg-aimer-600 group-hover:border-aimer-500">
                <svg
                  className="w-8 h-8 sm:w-9 sm:h-9 fill-white translate-x-0.5"
                  viewBox="0 0 24 24"
                >
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
              </div>
            </div>
          </div>

          {/* Bottom Metatags */}
          <div className="absolute bottom-4 left-5 sm:bottom-6 sm:left-7 text-white select-none">
            <div className="text-[11px] sm:text-xs font-bold tracking-widest uppercase font-poppins text-aimer-300">
              OFFICIAL PROGRAM FILM
            </div>
            <div className="text-base sm:text-lg font-semibold tracking-tight text-white mt-0.5 font-poppins">
              {title}
            </div>
            <div className="text-xs text-charcoal-300 font-poppins mt-0.5">
              YouTube HD
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
  );
};
