'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { SectionBadge } from '@/components/ui/SectionBadge';
import { HsbipContent } from '@/contents/programmes/hsbip';

interface HsbipAdmissionProps {
  content: HsbipContent['admissions'];
}

export const HsbipAdmission: React.FC<HsbipAdmissionProps> = ({ content }) => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [qualification, setQualification] = useState('Class 10 Completed (Applying for +1 Commerce)');
  const [city, setCity] = useState('');
  const [consent, setConsent] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone || !email) return;

    setIsSubmitting(true);
    // Simulate submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  return (
    <section id="admission" className="py-20 lg:py-28 bg-white border-b border-charcoal-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="max-w-3xl space-y-3">
          <SectionBadge>{content.badge}</SectionBadge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-poppins text-charcoal-900 tracking-tight leading-tight">
            {content.heading}{' '}
            <span className="text-aimer-600 font-normal italic">
              {content.headingAccent}
            </span>
          </h2>
          <p className="text-sm sm:text-base text-charcoal-600 font-light leading-relaxed pt-1">
            {content.description}
          </p>
        </div>

        {/* 4-Step Eligibility & Selection Roadmap */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {content.criteria.map((c) => (
            <div
              key={c.step}
              className="p-6 rounded-2xl bg-[#F6FAFA] border border-aimer-100/90 shadow-2xs space-y-3"
            >
              <div className="text-2xl font-bold font-poppins text-aimer-600">
                {c.step}
              </div>
              <h3 className="text-base font-bold font-poppins text-charcoal-900">
                {c.title}
              </h3>
              <div className="text-xs font-semibold text-aimer-800 font-poppins">
                {c.requirement}
              </div>
              <p className="text-xs text-charcoal-600 font-light leading-relaxed">
                {c.details}
              </p>
            </div>
          ))}
        </div>

        {/* NAAT Competencies Section */}
        <div className="p-8 sm:p-10 rounded-2xl bg-white border border-charcoal-200/80 shadow-xs space-y-8">
          <div>
            <div className="text-[11px] font-poppins font-semibold uppercase tracking-widest text-aimer-700">
              NATIONAL AIMER ADMISSION TEST (NAAT)
            </div>
            <h3 className="text-2xl font-bold font-poppins text-charcoal-900 mt-1">
              What We Evaluate in Aspiring Commerce Leaders
            </h3>
            <p className="text-xs sm:text-sm text-charcoal-600 font-light mt-1">
              NAAT does not test rote memorization; it gauges native commercial acumen, moral clarity, and leadership instincts.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {content.naatCompetencies.map((comp, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-charcoal-50/60 border border-charcoal-100 space-y-1.5">
                <div className="text-xs font-bold font-poppins text-charcoal-900">
                  {comp.name}
                </div>
                <p className="text-xs text-charcoal-600 font-light leading-relaxed">
                  {comp.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Admissions Application Form & Counselor Hotline Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Benefits & WhatsApp Hotline (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-3">
              <h3 className="text-2xl font-bold font-poppins text-charcoal-900">
                Fast-Track Admissions Intake
              </h3>
              <p className="text-xs sm:text-sm text-charcoal-600 font-light leading-relaxed">
                Register your interest to schedule an interview, explore hostel availability, and calculate scholarship eligibility.
              </p>
            </div>

            <div className="space-y-4">
              {content.benefits.map((b, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-aimer-100 text-aimer-700 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                    ✓
                  </div>
                  <div>
                    <div className="text-xs sm:text-sm font-semibold text-charcoal-900 font-poppins">
                      {b.title}
                    </div>
                    <div className="text-xs text-charcoal-600 font-light">
                      {b.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Direct WhatsApp Callout */}
            <div className="p-5 rounded-2xl bg-aimer-50/70 border border-aimer-200 space-y-2">
              <div className="text-xs font-bold text-aimer-900 font-poppins">
                Need Immediate Parental Guidance?
              </div>
              <p className="text-xs text-charcoal-700 font-light">
                Speak directly with an admissions mentor regarding syllabus, safety, or hostel food.
              </p>
              <div className="pt-1">
                <Link
                  href={content.hotline.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-semibold text-aimer-700 hover:text-aimer-800 underline"
                >
                  <span>WhatsApp Admissions Hotline: {content.hotline.phone}</span>
                  <span>&rarr;</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column: Application Form (7 cols) */}
          <div className="lg:col-span-7 bg-[#F6FAFA] p-8 sm:p-10 rounded-2xl border border-aimer-200/90 shadow-sm">
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <h4 className="text-lg font-bold font-poppins text-charcoal-900">
                    Apply for HSBIP 2026-27
                  </h4>
                  <p className="text-xs text-charcoal-500 font-light mt-0.5">
                    Fill out the form below. Our admissions office will reach out within 24 hours.
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-poppins font-medium text-charcoal-700 mb-1">
                      Candidate Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Rahul Menon"
                      className="w-full px-4 py-2.5 rounded-lg border border-charcoal-200 bg-white text-xs text-charcoal-900 placeholder:text-charcoal-400 focus:outline-none focus:border-aimer-500 focus:ring-1 focus:ring-aimer-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-poppins font-medium text-charcoal-700 mb-1">
                        WhatsApp Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 98765 43210"
                        className="w-full px-4 py-2.5 rounded-lg border border-charcoal-200 bg-white text-xs text-charcoal-900 placeholder:text-charcoal-400 focus:outline-none focus:border-aimer-500 focus:ring-1 focus:ring-aimer-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-poppins font-medium text-charcoal-700 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="candidate@example.com"
                        className="w-full px-4 py-2.5 rounded-lg border border-charcoal-200 bg-white text-xs text-charcoal-900 placeholder:text-charcoal-400 focus:outline-none focus:border-aimer-500 focus:ring-1 focus:ring-aimer-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-poppins font-medium text-charcoal-700 mb-1">
                        Current Qualification *
                      </label>
                      <select
                        value={qualification}
                        onChange={(e) => setQualification(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-lg border border-charcoal-200 bg-white text-xs text-charcoal-900 focus:outline-none focus:border-aimer-500 focus:ring-1 focus:ring-aimer-500"
                      >
                        <option value="Class 10 Completed (Applying for +1 Commerce)">
                          Class 10 Completed (Applying for +1 Commerce)
                        </option>
                        <option value="Currently in Class 11">
                          Currently in Class 11
                        </option>
                        <option value="Parent of Class 10 Student">
                          Parent of Class 10 Student
                        </option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-poppins font-medium text-charcoal-700 mb-1">
                        City / Town
                      </label>
                      <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="e.g. Kozhikode / Kochi"
                        className="w-full px-4 py-2.5 rounded-lg border border-charcoal-200 bg-white text-xs text-charcoal-900 placeholder:text-charcoal-400 focus:outline-none focus:border-aimer-500 focus:ring-1 focus:ring-aimer-500"
                      />
                    </div>
                  </div>

                  <div className="flex items-start gap-2 pt-1">
                    <input
                      type="checkbox"
                      id="consent"
                      checked={consent}
                      onChange={(e) => setConsent(e.target.checked)}
                      className="mt-1 h-3.5 w-3.5 rounded text-aimer-600 focus:ring-aimer-500 border-charcoal-300"
                    />
                    <label htmlFor="consent" className="text-[11px] text-charcoal-500 font-light leading-tight">
                      I agree to be contacted by AIMER Business School via phone, WhatsApp or email regarding my HSBIP admission.
                    </label>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting || !consent}
                    className="w-full py-3.5 rounded-full bg-aimer-600 hover:bg-aimer-700 disabled:opacity-50 text-white font-poppins font-semibold text-xs tracking-wide transition-all shadow-md active:scale-98"
                  >
                    {isSubmitting ? 'Submitting Application...' : 'Submit Application & Enquire →'}
                  </button>
                </div>
              </form>
            ) : (
              <div className="py-8 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 text-2xl flex items-center justify-center mx-auto">
                  ✓
                </div>
                <h4 className="text-xl font-bold font-poppins text-charcoal-900">
                  Application Received, {fullName || 'Candidate'}!
                </h4>
                <p className="text-xs sm:text-sm text-charcoal-600 font-light max-w-md mx-auto leading-relaxed">
                  Thank you for applying to the <span className="font-semibold text-aimer-800">Higher Secondary Business Integrated Program</span>. Our admissions coordinator will reach out within 24–48 hours with interview and test slot details.
                </p>
                <div className="pt-4 flex flex-wrap justify-center gap-3">
                  <Link
                    href={content.hotline.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-2.5 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white font-poppins font-medium text-xs transition-colors flex items-center gap-1.5 shadow-xs"
                  >
                    <span>Connect on WhatsApp</span>
                    <span>&rarr;</span>
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      setIsSubmitted(false);
                      setFullName('');
                      setPhone('');
                      setEmail('');
                      setCity('');
                    }}
                    className="px-5 py-2.5 rounded-full border border-charcoal-300 text-charcoal-700 font-poppins text-xs hover:border-aimer-600 transition-colors"
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

