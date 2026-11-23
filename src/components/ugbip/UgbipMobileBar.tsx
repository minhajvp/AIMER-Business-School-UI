'use client';

import React from 'react';
import Link from 'next/link';

interface UgbipMobileBarProps {
  onOpenBrochure: () => void;
}

export const UgbipMobileBar: React.FC<UgbipMobileBarProps> = ({ onOpenBrochure }) => {
  return (
    <div className="fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-charcoal-200 p-3 sm:hidden shadow-lg flex items-center gap-3">
      <button
        type="button"
        onClick={onOpenBrochure}
        className="flex-1 py-2.5 rounded-full border border-charcoal-300 text-charcoal-800 text-xs font-semibold uppercase tracking-wider text-center"
      >
        Brochure
      </button>

      <Link
        href="#admission"
        className="flex-1 py-2.5 rounded-full bg-aimer-600 hover:bg-aimer-700 text-white text-xs font-semibold uppercase tracking-wider text-center shadow-xs"
      >
        Apply Now
      </Link>
    </div>
  );
};

