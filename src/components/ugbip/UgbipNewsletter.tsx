'use client';

import React, { useState } from 'react';
import { UgbipContent } from '@/contents/programmes/ugbip';

interface UgbipNewsletterProps {
  content: UgbipContent['newsletter'];
}

export const UgbipNewsletter: React.FC<UgbipNewsletterProps> = ({ content }) => {
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(true);
  const [isDone, setIsDone] = useState(false);
  const [error, setError] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) {
      setError('Please enter a valid email address.');
      return;
    }
    if (!consent) {
      setError('Please agree to receive emails.');
      return;
    }
    setError('');
    setIsDone(true);
  };

  return (
    <section className="py-12 bg-charcoal-900 border-t border-charcoal-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {!isDone ? (
            <div className="space-y-4 text-center">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold font-poppins text-white">
                  {content.heading}
                </h3>
                <p className="text-xs sm:text-sm text-charcoal-400 font-light mt-1">
                  {content.lead}
                </p>
              </div>

              <form onSubmit={handleSubscribe} className="max-w-md mx-auto space-y-3">
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (error) setError('');
                    }}
                    placeholder="Enter your email address"
                    className="flex-1 bg-charcoal-800 border border-charcoal-700 rounded-full px-4 py-2.5 text-xs sm:text-sm text-white placeholder-charcoal-400 focus:outline-none focus:border-aimer-500"
                  />
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-full bg-aimer-600 hover:bg-aimer-500 text-white text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer shrink-0"
                  >
                    Subscribe
                  </button>
                </div>

                <div className="flex items-center justify-center gap-2">
                  <input
                    type="checkbox"
                    id="ugbip-nl-consent"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="rounded text-aimer-600 focus:ring-0"
                  />
                  <label
                    htmlFor="ugbip-nl-consent"
                    className="text-[11px] text-charcoal-400 cursor-pointer"
                  >
                    I agree to receive emails from AIMER Business School.
                  </label>
                </div>

                {error && <p className="text-[11px] text-rose-400 font-poppins">{error}</p>}
              </form>
            </div>
          ) : (
            <div className="text-center py-4 space-y-2">
              <div className="text-emerald-400 text-lg font-bold">✓ Subscribed!</div>
              <p className="text-xs sm:text-sm text-charcoal-300">
                You have successfully subscribed to the AIMER Business School journal.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

