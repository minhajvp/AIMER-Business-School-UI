'use client';

import React, { useState } from 'react';
import { SectionBadge } from '@/components/ui/SectionBadge';
import { PgbipContent } from '@/contents/programmes/pgbip';

interface PgbipAdmissionProps {
  content: PgbipContent['admission'];
}

interface FormState {
  fullName: string;
  whatsapp: string;
  email: string;
  qualification: string;
  city: string;
  consent: boolean;
  website: string; // Honeypot
}

export const PgbipAdmission: React.FC<PgbipAdmissionProps> = ({ content }) => {
  const [form, setForm] = useState<FormState>({
    fullName: '',
    whatsapp: '',
    email: '',
    qualification: '',
    city: '',
    consent: true,
    website: '',
  });

  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = (field: keyof FormState, value: any): string => {
    switch (field) {
      case 'fullName':
        if (!value.trim()) return 'Please enter your full legal name.';
        if (value.trim().length < 2) return 'Name must be at least 2 characters.';
        return '';
      case 'whatsapp': {
        const clean = value.replace(/\D/g, '');
        if (!clean) return 'Please enter your WhatsApp mobile number.';
        if (clean.length < 10) return 'Enter a valid 10-digit number.';
        return '';
      }
      case 'email':
        if (!value.trim()) return 'Please enter your email address.';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim()))
          return 'Enter a valid email address.';
        return '';
      case 'qualification':
        if (!value) return 'Please select your current educational status.';
        return '';
      case 'consent':
        if (!value) return 'Please accept the consent terms.';
        return '';
      default:
        return '';
    }
  };

  const handleChange = (field: keyof FormState, val: any) => {
    setForm((prev) => ({ ...prev, [field]: val }));
    if (touched[field]) {
      setErrors((prev) => ({ ...prev, [field]: validate(field, val) }));
    }
  };

  const handleBlur = (field: keyof FormState) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors((prev) => ({ ...prev, [field]: validate(field, form[field]) }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (form.website) {
      setIsSubmitted(true);
      return;
    }

    const newErrors: Record<string, string> = {
      fullName: validate('fullName', form.fullName),
      whatsapp: validate('whatsapp', form.whatsapp),
      email: validate('email', form.email),
      qualification: validate('qualification', form.qualification),
      consent: validate('consent', form.consent),
    };

    setErrors(newErrors);
    setTouched({
      fullName: true,
      whatsapp: true,
      email: true,
      qualification: true,
      consent: true,
    });

    const hasError = Object.values(newErrors).some((err) => Boolean(err));
    if (hasError) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 700);
  };

  return (
    <section id="admission" className="py-20 lg:py-28 bg-white text-charcoal-900 border-b border-charcoal-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column */}
          <div className="lg:col-span-5 space-y-6">
            <SectionBadge>{content.badge}</SectionBadge>

            <h2 className="text-3xl sm:text-4xl font-bold font-poppins text-charcoal-900 tracking-tight leading-tight">
              {content.heading}
            </h2>

            <p className="text-sm sm:text-base text-charcoal-600 font-light leading-relaxed">
              {content.subheading}
            </p>

            <div className="space-y-4 pt-4 border-t border-charcoal-200">
              {content.perks.map((pt, idx) => (
                <div key={idx} className="space-y-0.5">
                  <div className="text-sm font-bold text-charcoal-900 font-poppins flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-aimer-600" />
                    <span>{pt.title}</span>
                  </div>
                  <div className="text-xs sm:text-[13px] text-charcoal-600 pl-3.5 font-light">
                    {pt.desc}
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <a
                href={content.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold uppercase tracking-wider transition-colors shadow-xs"
              >
                <span>WhatsApp Admissions: {content.whatsappNumber}</span>
                <span>&rarr;</span>
              </a>
            </div>
          </div>

          {/* Right Column: Application Form */}
          <div className="lg:col-span-7 bg-[#F8FCFC] rounded-2xl p-6 sm:p-10 border border-charcoal-200 shadow-sm">
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <div>
                  <h3 className="text-xl font-bold font-poppins text-charcoal-900">
                    Register for PGBIP 2026–27 Intake
                  </h3>
                  <p className="text-xs text-charcoal-500 font-light mt-0.5">
                    Submit your academic profile. Our admissions committee will review credentials and schedule test slots.
                  </p>
                </div>

                {/* Honeypot */}
                <input
                  type="text"
                  name="website"
                  value={form.website}
                  onChange={(e) => handleChange('website', e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                  className="hidden"
                />

                {/* Candidate Full Name */}
                <div className="space-y-1">
                  <label className="block text-[11px] font-poppins uppercase tracking-wider text-charcoal-700">
                    Candidate Full Name *
                  </label>
                  <input
                    type="text"
                    value={form.fullName}
                    onChange={(e) => handleChange('fullName', e.target.value)}
                    onBlur={() => handleBlur('fullName')}
                    placeholder="Enter your full legal name"
                    className="w-full bg-transparent border-b-2 border-charcoal-300 py-2 text-sm text-charcoal-900 placeholder-charcoal-400 focus:outline-none focus:border-aimer-600 transition-colors"
                  />
                  {errors.fullName && (
                    <p className="text-[11px] text-rose-600 font-poppins">{errors.fullName}</p>
                  )}
                </div>

                {/* WhatsApp & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-[11px] font-poppins uppercase tracking-wider text-charcoal-700">
                      WhatsApp Number *
                    </label>
                    <input
                      type="tel"
                      value={form.whatsapp}
                      onChange={(e) => handleChange('whatsapp', e.target.value)}
                      onBlur={() => handleBlur('whatsapp')}
                      placeholder="10-digit number"
                      className="w-full bg-transparent border-b-2 border-charcoal-300 py-2 text-sm text-charcoal-900 placeholder-charcoal-400 focus:outline-none focus:border-aimer-600 transition-colors"
                    />
                    {errors.whatsapp && (
                      <p className="text-[11px] text-rose-600 font-poppins">{errors.whatsapp}</p>
                    )}
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[11px] font-poppins uppercase tracking-wider text-charcoal-700">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      onBlur={() => handleBlur('email')}
                      placeholder="name@example.com"
                      className="w-full bg-transparent border-b-2 border-charcoal-300 py-2 text-sm text-charcoal-900 placeholder-charcoal-400 focus:outline-none focus:border-aimer-600 transition-colors"
                    />
                    {errors.email && (
                      <p className="text-[11px] text-rose-600 font-poppins">{errors.email}</p>
                    )}
                  </div>
                </div>

                {/* Current Qualification */}
                <div className="space-y-1">
                  <label className="block text-[11px] font-poppins uppercase tracking-wider text-charcoal-700">
                    Current Educational Status *
                  </label>
                  <select
                    value={form.qualification}
                    onChange={(e) => handleChange('qualification', e.target.value)}
                    onBlur={() => handleBlur('qualification')}
                    className="w-full bg-transparent border-b-2 border-charcoal-300 py-2 text-sm text-charcoal-900 focus:outline-none focus:border-aimer-600 transition-colors"
                  >
                    <option value="">Select your education level</option>
                    {content.qualificationOptions.map((opt, idx) => (
                      <option key={idx} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                  {errors.qualification && (
                    <p className="text-[11px] text-rose-600 font-poppins">{errors.qualification}</p>
                  )}
                </div>

                {/* City / Town */}
                <div className="space-y-1">
                  <label className="block text-[11px] font-poppins uppercase tracking-wider text-charcoal-700">
                    City / Town (Optional)
                  </label>
                  <input
                    type="text"
                    value={form.city}
                    onChange={(e) => handleChange('city', e.target.value)}
                    placeholder="e.g. Calicut, Bangalore, Mumbai, Dubai"
                    className="w-full bg-transparent border-b-2 border-charcoal-300 py-2 text-sm text-charcoal-900 placeholder-charcoal-400 focus:outline-none focus:border-aimer-600 transition-colors"
                  />
                </div>

                {/* Consent Checkbox */}
                <div className="pt-2">
                  <label className="flex items-start gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.consent}
                      onChange={(e) => handleChange('consent', e.target.checked)}
                      className="mt-1 rounded text-aimer-600 focus:ring-aimer-500"
                    />
                    <span className="text-xs text-charcoal-600 leading-snug">
                      I agree to be contacted by AIMER Business School via phone, WhatsApp or email regarding my PGBIP application.
                    </span>
                  </label>
                  {errors.consent && (
                    <p className="text-[11px] text-rose-600 font-poppins mt-1">{errors.consent}</p>
                  )}
                </div>

                {/* Submit Button */}
                <div className="pt-3">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-6 rounded-full bg-aimer-600 hover:bg-aimer-700 text-white text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Verifying Eligibility...</span>
                    ) : (
                      <>
                        <span>Submit Application & Enquire</span>
                        <span>&rarr;</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            ) : (
              /* Success State */
              <div className="text-center py-8 space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto text-2xl font-bold">
                  ✓
                </div>
                <h3 className="text-2xl font-bold text-charcoal-900 font-poppins">
                  Application Received, {form.fullName || 'Candidate'}!
                </h3>
                <p className="text-xs sm:text-sm text-charcoal-600 leading-relaxed max-w-md mx-auto">
                  Thank you for applying to the <strong>Postgraduate Business Integrated Program</strong>. Our executive admissions committee will review your profile and reach out within 24–48 hours with interview details.
                </p>

                <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
                  <a
                    href="https://wa.me/917450030600?text=Hi%20AIMER,%20I%20have%20submitted%20my%20PGBIP%20application"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold uppercase tracking-wider transition-colors shadow-xs"
                  >
                    Connect on WhatsApp &rarr;
                  </a>
                  <button
                    type="button"
                    onClick={() => {
                      setIsSubmitted(false);
                      setForm({
                        fullName: '',
                        whatsapp: '',
                        email: '',
                        qualification: '',
                        city: '',
                        consent: true,
                        website: '',
                      });
                    }}
                    className="px-6 py-3 rounded-full bg-white hover:bg-charcoal-100 text-charcoal-700 text-xs font-semibold uppercase tracking-wider border border-charcoal-300 transition-colors"
                  >
                    Submit Another Application
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};
