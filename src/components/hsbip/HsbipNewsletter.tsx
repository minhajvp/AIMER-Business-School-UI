'use client';

import React, { useState } from 'react';
import { HsbipContent } from '@/contents/programmes/hsbip';

interface HsbipNewsletterProps {
  content: HsbipContent['newsletter'];
}

export const HsbipNewsletter: React.FC<HsbipNewsletterProps> = ({ content }) => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubscribed(true);
  };

  return (
    <section className="py-14 bg-white border-b border-charcoal-200/70">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <h3 className="text-xl sm:text-2xl font-bold font-poppins text-charcoal-900">
          {content.heading}
        </h3>
        <p className="text-xs sm:text-sm text-charcoal-600 font-light max-w-lg mx-auto">
          {content.description}
        </p>

        {!isSubscribed ? (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto pt-2"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="w-full sm:w-auto flex-1 px-4 py-2.5 rounded-full border border-charcoal-300 text-xs text-charcoal-900 focus:outline-none focus:border-aimer-500 placeholder:text-charcoal-400 bg-white"
            />
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-aimer-600 hover:bg-aimer-700 text-white text-xs font-semibold tracking-wide transition-all shadow-xs active:scale-95 whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
        ) : (
          <div className="pt-2 text-xs text-aimer-700 font-medium flex items-center justify-center gap-1.5">
            <span>✓</span>
            <span>Thank you for subscribing to AIMER HSBIP updates.</span>
          </div>
        )}
      </div>
    </section>
  );
};

