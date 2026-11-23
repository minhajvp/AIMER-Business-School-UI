'use client';

import React, { useState } from 'react';
import { AboutContent } from '@/contents/about';

interface AboutNewsletterProps {
  content: AboutContent['newsletter'];
}

// TODO: Replace with real newsletter subscription API endpoint
const subscribeNewsletter = async (email: string): Promise<{ success: boolean }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, email: email.trim() } as unknown as { success: boolean });
    }, 900);
  });
};

export const AboutNewsletter: React.FC<AboutNewsletterProps> = ({ content }) => {
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [touched, setTouched] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validateEmail = (value: string): boolean => {
    const trimmed = value.trim();
    if (!trimmed) {
      setError('Email address is required.');
      return false;
    }
    if (trimmed.length > 254) {
      setError('Email address cannot exceed 254 characters.');
      return false;
    }
    if (trimmed.includes('..')) {
      setError('Email address cannot contain consecutive dots.');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmed)) {
      setError('Please enter a valid email address.');
      return false;
    }

    setError(null);
    return true;
  };

  const handleBlur = () => {
    setTouched(true);
    validateEmail(email);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setEmail(val);
    if (touched) {
      validateEmail(val);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);

    const isEmailValid = validateEmail(email);
    if (!isEmailValid) return;

    if (!consent) {
      setError('You must agree to receive emails to continue.');
      return;
    }

    setIsSubmitting(true);
    try {
      await subscribeNewsletter(email);
      setIsSuccess(true);
      setError(null);
    } catch {
      setError('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setEmail('');
    setConsent(false);
    setTouched(false);
    setError(null);
    setIsSuccess(false);
  };

  return (
    <section className="py-20 bg-white border-b border-charcoal-200/70">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold font-poppins text-charcoal-900 tracking-tight">
            {content.heading}
          </h2>
          <p className="text-xs sm:text-sm text-charcoal-600 font-light max-w-lg mx-auto">
            {content.description}
          </p>
        </div>

        {isSuccess ? (
          <div
            aria-live="polite"
            className="p-8 rounded-2xl bg-aimer-50 border border-aimer-200 space-y-3"
          >
            <div className="w-12 h-12 rounded-full bg-aimer-100 text-aimer-700 flex items-center justify-center mx-auto text-xl font-bold">
              ✓
            </div>
            <h3 className="text-lg font-bold font-poppins text-charcoal-900">
              Thank you.
            </h3>
            <p className="text-xs sm:text-sm text-charcoal-700 font-light">
              You have successfully subscribed to the AIMER Business School newsletter.
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={handleReset}
                className="text-xs font-semibold text-aimer-700 hover:text-aimer-800 underline cursor-pointer"
              >
                Subscribe another email
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-5 text-left">
            {/* Underlined Email Field */}
            <div className="relative">
              <div className="flex items-center justify-between mb-1">
                <label
                  htmlFor="about-newsletter-email"
                  className="text-[11px] font-poppins font-semibold uppercase tracking-wider text-charcoal-700"
                >
                  Email address <span className="text-aimer-600">*</span>
                </label>
                {touched && !error && email && (
                  <span className="text-emerald-600 text-xs font-bold">✓</span>
                )}
              </div>

              <div className="relative">
                <input
                  id="about-newsletter-email"
                  type="email"
                  value={email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="name@example.com"
                  className="w-full pb-2.5 pt-1 text-sm text-charcoal-900 bg-transparent border-b border-charcoal-300 focus:outline-none transition-colors peer"
                />

                {/* Animated Growing Teal Underline */}
                <div
                  aria-hidden="true"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-aimer-600 origin-left scale-x-0 peer-focus:scale-x-100 transition-transform duration-300 ease-out pointer-events-none"
                />
              </div>

              {/* Error Message with aria-live */}
              <div
                aria-live="assertive"
                className="overflow-hidden transition-all duration-300"
                style={{
                  maxHeight: error ? '40px' : '0px',
                  opacity: error ? 1 : 0,
                }}
              >
                <p className="text-[11px] text-red-600 mt-1 font-medium">
                  {error}
                </p>
              </div>
            </div>

            {/* Required Consent Checkbox */}
            <div className="flex items-start gap-2.5 pt-1">
              <input
                id="about-newsletter-consent"
                type="checkbox"
                checked={consent}
                onChange={(e) => {
                  setConsent(e.target.checked);
                  if (e.target.checked && error?.includes('agree')) {
                    setError(null);
                  }
                }}
                className="mt-0.5 h-4 w-4 rounded border-charcoal-300 text-aimer-600 focus:ring-aimer-500 cursor-pointer"
              />
              <label
                htmlFor="about-newsletter-consent"
                className="text-xs text-charcoal-600 font-light leading-snug cursor-pointer select-none"
              >
                {content.consentText}
              </label>
            </div>

            {/* Subscribe Pill Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-full bg-aimer-600 hover:bg-aimer-700 disabled:opacity-60 text-white font-poppins font-semibold text-xs uppercase tracking-wider transition-all duration-200 shadow-xs active:scale-98 cursor-pointer"
              >
                {isSubmitting ? 'Subscribing...' : 'Subscribe'}
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
};

