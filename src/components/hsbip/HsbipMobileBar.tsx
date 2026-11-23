'use client';

import React from 'react';
import Link from 'next/link';

interface HsbipMobileBarProps {
  onOpenBrochure?: () => void;
}

export const HsbipMobileBar: React.FC<HsbipMobileBarProps> = ({ onOpenBrochure }) => {
  return (
    <aside
      aria-label="Mobile quick actions"
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-charcoal-200 p-3 shadow-lg"
    >
      <div className="flex items-center gap-2 max-w-md mx-auto">
        <Link
          href="#admission"
          className="flex-1 text-center py-2.5 px-4 rounded-full bg-aimer-600 text-white text-xs font-semibold uppercase tracking-wider shadow-sm active:scale-95 transition-all"
        >
          Apply for HSBIP
        </Link>

        {onOpenBrochure && (
          <button
            type="button"
            onClick={onOpenBrochure}
            className="flex-1 text-center py-2.5 px-4 rounded-full border border-charcoal-300 text-charcoal-800 text-xs font-semibold uppercase tracking-wider bg-white active:scale-95 transition-all"
          >
            Brochure
          </button>
        )}
      </div>
    </aside>
  );
};

