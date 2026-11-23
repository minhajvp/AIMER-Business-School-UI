'use client';

import React, { useState, useRef, useEffect, useCallback, useId } from 'react';
import { Programme } from '@/types';

interface EnquirySectionProps {
  programmes?: Programme[];
}

interface FormState {
  name: string;
  mobile: string;
  email: string;
  programme: string;
  website: string; // Honeypot
}

export const EnquirySection: React.FC<EnquirySectionProps> = ({ programmes }) => {
  const [formState, setFormState] = useState<FormState>({
    name: '',
    mobile: '',
    email: '',
    programme: '',
    website: '',
  });

  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [isShake, setIsShake] = useState(false);
  const [serverError, setServerError] = useState(false);
  const [submittedData, setSubmittedData] = useState<FormState | null>(null);

  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Field refs for auto-focus
  const nameInputRef = useRef<HTMLInputElement>(null);
  const mobileInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const programmeSelectRef = useRef<HTMLSelectElement>(null);

  // Intersection observer for section entrance
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Normalization helper for Indian mobile numbers
  const normMobile = useCallback((v: string) => {
    let d = v.replace(/\D/g, '');
    if (d.length === 12 && d.startsWith('91')) d = d.slice(2);
    else if (d.length === 11 && d.startsWith('0')) d = d.slice(1);
    return d;
  }, []);

  // Field validators
  const validateField = useCallback(
    (field: keyof FormState, val: string): string => {
      switch (field) {
        case 'name': {
          const v = val.replace(/\s+/g, ' ').trim();
          if (!v) return 'Please enter your full name.';
          if (v.length < 2) return 'Your name must be at least 2 characters.';
          if (v.length > 60) return 'Please keep your name under 60 characters.';
          if (!/^[\p{L}][\p{L}\s.'\-]*$/u.test(v))
            return 'Use letters only (spaces, . \' and - are allowed).';
          return '';
        }
        case 'mobile': {
          const v = normMobile(val);
          if (!val.trim()) return 'Please enter your mobile number.';
          if (!/^[6-9]\d{9}$/.test(v))
            return 'Enter a valid 10-digit mobile number starting with 6, 7, 8 or 9.';
          return '';
        }
        case 'email': {
          const v = val.trim();
          if (!v) return 'Please enter your email address.';
          if (
            v.length > 254 ||
            /\.\./.test(v) ||
            !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)
          )
            return 'Enter a valid email address, for example you@example.com.';
          return '';
        }
        case 'programme': {
          return val ? '' : 'Please select a programme.';
        }
        default:
          return '';
      }
    },
    [normMobile]
  );

  // Calculate live progress (0 to 4)
  const validCount = ['name', 'mobile', 'email', 'programme'].filter(
    (k) => !validateField(k as keyof FormState, formState[k as keyof FormState])
  ).length;

  // Handle change
  const handleChange = (field: keyof FormState, val: string) => {
    let cleanVal = val;
    if (field === 'mobile') {
      cleanVal = val.replace(/\D/g, '').slice(0, 12);
    }
    setFormState((prev) => ({ ...prev, [field]: cleanVal }));

    // Real-time validation if touched or once valid
    const err = validateField(field, cleanVal);
    if (touched[field] || !err) {
      setTouched((prev) => ({ ...prev, [field]: true }));
      setErrors((prev) => ({ ...prev, [field]: err }));
    }
  };

  // Handle blur
  const handleBlur = (field: keyof FormState) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors((prev) => ({
      ...prev,
      [field]: validateField(field, formState[field]),
    }));
  };

  // Form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setServerError(false);

    // Honeypot check: silently accept bots
    if (formState.website) {
      setIsDone(true);
      return;
    }

    // Touch and validate all fields
    const newErrors: Record<string, string> = {};
    const fields: (keyof FormState)[] = ['name', 'mobile', 'email', 'programme'];
    let firstInvalid: keyof FormState | null = null;

    fields.forEach((k) => {
      const err = validateField(k, formState[k]);
      if (err) {
        newErrors[k] = err;
        if (!firstInvalid) firstInvalid = k;
      }
    });

    setTouched({ name: true, mobile: true, email: true, programme: true });
    setErrors(newErrors);

    if (firstInvalid) {
      setIsShake(true);
      setTimeout(() => setIsShake(false), 500);

      if (firstInvalid === 'name') nameInputRef.current?.focus();
      else if (firstInvalid === 'mobile') mobileInputRef.current?.focus();
      else if (firstInvalid === 'email') emailInputRef.current?.focus();
      else if (firstInvalid === 'programme') programmeSelectRef.current?.focus();
      return;
    }

    const payload: FormState = {
      name: formState.name.replace(/\s+/g, ' ').trim(),
      mobile: '+91' + normMobile(formState.mobile),
      email: formState.email.trim().toLowerCase(),
      programme: formState.programme,
      website: '',
    };

    setIsSubmitting(true);

    try {
      // Async submission handler (stubbed for API/DB connectivity)
      await new Promise((resolve) => setTimeout(resolve, 800));
      setSubmittedData(payload);
      setIsDone(true);
    } catch {
      setServerError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormState({
      name: '',
      mobile: '',
      email: '',
      programme: '',
      website: '',
    });
    setTouched({});
    setErrors({});
    setIsDone(false);
    setServerError(false);
    setSubmittedData(null);
  };

  // Programme options fallback
  const defaultProgrammes = [
    { code: 'UGBIP', label: 'UGBIP · Undergraduate Business Integrated Program' },
    { code: 'PGBIP', label: 'PGBIP · Postgraduate Business Integrated Program' },
    { code: 'HSBIP', label: 'HSBIP · Plus One & Plus Two Commerce' },
    { code: 'EXEC-AI-HR', label: 'Executive AI & HR' },
  ];

  return (
    <section
      ref={sectionRef}
      id="enquiry"
      className="py-16 sm:py-20 lg:py-24 bg-[#F6FAFA] border-t border-charcoal-200 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Block */}
        <div
          className={`transition-all duration-700 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[2px] text-aimer-700">
            <span className="w-7 h-[1px] bg-aimer-600" />
            TAKE THE NEXT STEP
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-charcoal-900 mt-4 max-w-3xl leading-tight font-poppins">
            Start Your Business Journey{' '}
            <span className="text-aimer-600 font-normal italic">Today.</span>
          </h2>

          <p className="text-xs sm:text-sm md:text-base text-charcoal-600 font-light mt-3.5 max-w-xl leading-relaxed">
            Connect directly with our admissions team, book an in-person tour of Markaz Knowledge City, or register for NAAT 2026.
          </p>
        </div>

        {/* Content Grid: Channels on Left, Compact Form Sheet on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mt-10 sm:mt-12 items-start">
          
          {/* Left Column: Direct Channels (5 cols on desktop) */}
          <div
            className={`lg:col-span-5 space-y-6 transition-all duration-700 delay-150 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <div className="border-t border-b border-charcoal-200 divide-y divide-charcoal-200">
              
              {/* WhatsApp Counsellor */}
              <a
                href="https://wa.me/917450030600?text=Hi%20AIMER,%20I%20would%20like%20to%20connect%20with%20an%20admissions%20advisor"
                target="_blank"
                rel="noopener noreferrer"
                className="group block py-6 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg sm:text-xl font-semibold text-charcoal-900 group-hover:text-aimer-600 transition-colors">
                    WhatsApp Counsellor
                  </h3>
                  <span className="text-xs text-aimer-600 group-hover:translate-x-1 transition-transform">
                    &rarr;
                  </span>
                </div>
                <div className="text-xs font-medium tracking-wide text-aimer-700 mt-1.5 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Instant Response · +91 74500 30600
                </div>
                <p className="text-xs sm:text-sm text-charcoal-600 font-light mt-2 leading-relaxed">
                  Chat directly with an admissions advisor regarding seats, merit scholarships, and test dates.
                </p>
                <span className="inline-block mt-3 text-xs font-semibold text-aimer-700 border-b border-aimer-600 pb-0.5 group-hover:text-aimer-800">
                  Open WhatsApp Chat <span className="inline-block transition-transform group-hover:translate-x-1">&rarr;</span>
                </span>
              </a>

              {/* Campus Tour Booking */}
              <a
                href="https://wa.me/917450030600?text=Hi%20AIMER,%20I%20would%20like%20to%20book%20a%20guided%20campus%20tour"
                target="_blank"
                rel="noopener noreferrer"
                className="group block py-6 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg sm:text-xl font-semibold text-charcoal-900 group-hover:text-aimer-600 transition-colors">
                    Visit Markaz Knowledge City
                  </h3>
                  <span className="text-xs text-aimer-600 group-hover:translate-x-1 transition-transform">
                    &rarr;
                  </span>
                </div>
                <div className="text-xs font-medium tracking-wide text-aimer-700 mt-1.5">
                  In-Person · Guided Tour
                </div>
                <p className="text-xs sm:text-sm text-charcoal-600 font-light mt-2 leading-relaxed">
                  Bring your family to experience our classrooms, incubation hub, and student residences firsthand.
                </p>
                <span className="inline-block mt-3 text-xs font-semibold text-aimer-700 border-b border-aimer-600 pb-0.5 group-hover:text-aimer-800">
                  Book a Campus Tour <span className="inline-block transition-transform group-hover:translate-x-1">&rarr;</span>
                </span>
              </a>

            </div>

            {/* Helpline badge */}
            <div className="p-4 rounded-xl bg-white/70 border border-charcoal-200 flex items-center justify-between text-xs text-charcoal-600">
              <span className="font-medium text-charcoal-800">Direct Admissions Desk:</span>
              <a href="tel:+917450030600" className="text-aimer-700 font-semibold hover:underline">
                +91 74500 30600
              </a>
            </div>
          </div>

          {/* Right Column: Compact Form Sheet (7 cols on desktop, snug and refined) */}
          <div
            className={`lg:col-span-7 transition-all duration-700 delay-200 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            {/* Compact Form Card with Architectural Offset Outline */}
            <div className="relative max-w-lg mx-auto lg:ml-auto w-full">
              
              {/* Subtle Architectural Accent Box (10px offset) */}
              <div
                aria-hidden="true"
                className="absolute inset-0 border border-aimer-600/30 translate-x-2.5 translate-y-2.5 pointer-events-none -z-10"
              />

              <div className="relative bg-white border border-charcoal-200 shadow-xs overflow-hidden">
                
                {/* 2px Teal Progress Bar at the Top */}
                <div className="h-[2px] bg-charcoal-100 relative overflow-hidden">
                  <div
                    style={{
                      transform: `scaleX(${validCount / 4})`,
                      transformOrigin: 'left',
                      transition: 'transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)',
                    }}
                    className="absolute inset-0 bg-aimer-600"
                  />
                </div>

                {/* Form Body - Compact padding */}
                {!isDone ? (
                  <form
                    onSubmit={handleSubmit}
                    noValidate
                    className={`p-6 sm:p-7 transition-all duration-300 ${isShake ? 'animate-shake' : ''}`}
                  >
                    {/* Form Header */}
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-lg sm:text-xl font-bold text-charcoal-900 tracking-tight font-poppins">
                          Request Admissions Callback
                        </h3>
                        <p className="text-xs text-charcoal-500 font-light mt-1">
                          Our counsellors will guide you through admissions, syllabus, and scholarships.
                        </p>
                      </div>
                      
                      {/* Step Counter */}
                      <div className="text-[11px] font-semibold text-charcoal-400 font-poppins tracking-wider tabular-nums whitespace-nowrap pt-1">
                        <span className="text-aimer-600 font-bold">{validCount}</span> / 4
                      </div>
                    </div>

                    {/* Field 1: Full Name */}
                    <div className="mt-4">
                      <label htmlFor="enquiry-name" className="block text-[10px] font-medium tracking-wider uppercase text-charcoal-500">
                        Full Name<span className="text-aimer-600 ml-0.5">*</span>
                      </label>
                      <div className="relative">
                        <input
                          ref={nameInputRef}
                          id="enquiry-name"
                          name="name"
                          type="text"
                          value={formState.name}
                          onChange={(e) => handleChange('name', e.target.value)}
                          onBlur={() => handleBlur('name')}
                          placeholder="e.g. Rahul Sharma"
                          maxLength={60}
                          className="w-full h-10 border-b border-charcoal-300 bg-transparent text-sm text-charcoal-900 placeholder-charcoal-400 pr-8 focus:outline-none focus:border-aimer-600 transition-colors"
                        />
                        {/* Live Valid Tick */}
                        {touched.name && !errors.name && (
                          <span className="absolute right-1 top-2.5 w-4 h-4 rounded-full bg-aimer-600 text-white flex items-center justify-center text-[10px]">
                            ✓
                          </span>
                        )}
                      </div>
                      {touched.name && errors.name && (
                        <div className="text-[11px] text-red-600 font-medium mt-1 animate-fadeIn">
                          {errors.name}
                        </div>
                      )}
                    </div>

                    {/* Field 2: Mobile Number */}
                    <div className="mt-3.5">
                      <label htmlFor="enquiry-mobile" className="block text-[10px] font-medium tracking-wider uppercase text-charcoal-500">
                        Mobile Number (WhatsApp)<span className="text-aimer-600 ml-0.5">*</span>
                      </label>
                      <div className="relative">
                        <input
                          ref={mobileInputRef}
                          id="enquiry-mobile"
                          name="mobile"
                          type="tel"
                          inputMode="numeric"
                          value={formState.mobile}
                          onChange={(e) => handleChange('mobile', e.target.value)}
                          onBlur={() => handleBlur('mobile')}
                          placeholder="10-digit mobile number"
                          maxLength={12}
                          className="w-full h-10 border-b border-charcoal-300 bg-transparent text-sm text-charcoal-900 placeholder-charcoal-400 pr-8 focus:outline-none focus:border-aimer-600 transition-colors"
                        />
                        {touched.mobile && !errors.mobile && (
                          <span className="absolute right-1 top-2.5 w-4 h-4 rounded-full bg-aimer-600 text-white flex items-center justify-center text-[10px]">
                            ✓
                          </span>
                        )}
                      </div>
                      {touched.mobile && errors.mobile && (
                        <div className="text-[11px] text-red-600 font-medium mt-1 animate-fadeIn">
                          {errors.mobile}
                        </div>
                      )}
                    </div>

                    {/* Field 3: Email Address */}
                    <div className="mt-3.5">
                      <label htmlFor="enquiry-email" className="block text-[10px] font-medium tracking-wider uppercase text-charcoal-500">
                        Email Address<span className="text-aimer-600 ml-0.5">*</span>
                      </label>
                      <div className="relative">
                        <input
                          ref={emailInputRef}
                          id="enquiry-email"
                          name="email"
                          type="email"
                          value={formState.email}
                          onChange={(e) => handleChange('email', e.target.value)}
                          onBlur={() => handleBlur('email')}
                          placeholder="you@example.com"
                          maxLength={254}
                          className="w-full h-10 border-b border-charcoal-300 bg-transparent text-sm text-charcoal-900 placeholder-charcoal-400 pr-8 focus:outline-none focus:border-aimer-600 transition-colors"
                        />
                        {touched.email && !errors.email && (
                          <span className="absolute right-1 top-2.5 w-4 h-4 rounded-full bg-aimer-600 text-white flex items-center justify-center text-[10px]">
                            ✓
                          </span>
                        )}
                      </div>
                      {touched.email && errors.email && (
                        <div className="text-[11px] text-red-600 font-medium mt-1 animate-fadeIn">
                          {errors.email}
                        </div>
                      )}
                    </div>

                    {/* Field 4: Programme of Interest */}
                    <div className="mt-3.5">
                      <label htmlFor="enquiry-programme" className="block text-[10px] font-medium tracking-wider uppercase text-charcoal-500">
                        Programme of Interest<span className="text-aimer-600 ml-0.5">*</span>
                      </label>
                      <div className="relative">
                        <select
                          ref={programmeSelectRef}
                          id="enquiry-programme"
                          name="programme"
                          value={formState.programme}
                          onChange={(e) => handleChange('programme', e.target.value)}
                          onBlur={() => handleBlur('programme')}
                          className="w-full h-10 border-b border-charcoal-300 bg-transparent text-sm text-charcoal-900 pr-8 focus:outline-none focus:border-aimer-600 transition-colors appearance-none cursor-pointer"
                        >
                          <option value="" disabled>
                            Select a programme
                          </option>
                          {programmes && programmes.length > 0
                            ? programmes.map((p) => (
                                <option key={p.id} value={p.shortTitle}>
                                  {p.shortTitle} · {p.title}
                                </option>
                              ))
                            : defaultProgrammes.map((p) => (
                                <option key={p.code} value={p.code}>
                                  {p.label}
                                </option>
                              ))}
                        </select>
                        <span className="absolute right-1 top-3 text-xs text-charcoal-400 pointer-events-none">
                          ▼
                        </span>
                        {touched.programme && !errors.programme && (
                          <span className="absolute right-5 top-2.5 w-4 h-4 rounded-full bg-aimer-600 text-white flex items-center justify-center text-[10px]">
                            ✓
                          </span>
                        )}
                      </div>
                      {touched.programme && errors.programme && (
                        <div className="text-[11px] text-red-600 font-medium mt-1 animate-fadeIn">
                          {errors.programme}
                        </div>
                      )}
                    </div>

                    {/* Honeypot field for anti-bot protection */}
                    <div className="hidden" aria-hidden="true">
                      <label>
                        Website
                        <input
                          type="text"
                          name="website"
                          value={formState.website}
                          onChange={(e) => handleChange('website', e.target.value)}
                          tabIndex={-1}
                          autoComplete="off"
                        />
                      </label>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="mt-5 w-full h-11 rounded-full bg-aimer-600 hover:bg-aimer-700 active:scale-[0.99] text-white text-xs sm:text-sm font-semibold tracking-wide flex items-center justify-center gap-2 transition-all duration-200 shadow-sm cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <>
                          <span>Submit Enquiry</span>
                          <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
                        </>
                      )}
                    </button>

                    {serverError && (
                      <div className="mt-3 text-xs text-red-600 text-center font-medium">
                        Something went wrong. Please try again or reach us on WhatsApp at +91 74500 30600.
                      </div>
                    )}
                  </form>
                ) : (
                  /* Success View */
                  <div className="p-6 sm:p-7 animate-fadeIn">
                    <div className="w-12 h-12 rounded-full border-2 border-aimer-600 flex items-center justify-center text-aimer-600 text-xl font-bold">
                      ✓
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold text-charcoal-900 mt-4 tracking-tight font-poppins">
                      Thank you{submittedData?.name ? `, ${submittedData.name.split(' ')[0]}` : ''}.
                    </h3>

                    <p className="text-xs sm:text-sm text-charcoal-600 font-light mt-2 leading-relaxed">
                      Your enquiry has been received. Our admissions team will call you shortly to guide you through programme selection, syllabus, and scholarships.
                    </p>

                    {submittedData && (
                      <div className="mt-5 border-t border-b border-charcoal-200 divide-y divide-charcoal-100 text-xs">
                        <div className="py-2 flex justify-between gap-4">
                          <span className="text-charcoal-500">Programme:</span>
                          <strong className="text-charcoal-800">{submittedData.programme}</strong>
                        </div>
                        <div className="py-2 flex justify-between gap-4">
                          <span className="text-charcoal-500">We will call:</span>
                          <strong className="text-charcoal-800">{submittedData.mobile}</strong>
                        </div>
                        <div className="py-2 flex justify-between gap-4">
                          <span className="text-charcoal-500">Confirmation to:</span>
                          <strong className="text-charcoal-800">{submittedData.email}</strong>
                        </div>
                      </div>
                    )}

                    <button
                      type="button"
                      onClick={handleReset}
                      className="mt-5 text-xs font-semibold text-aimer-700 hover:text-aimer-800 border-b border-aimer-600 pb-0.5 cursor-pointer"
                    >
                      Submit another enquiry &rarr;
                    </button>
                  </div>
                )}

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default EnquirySection;

