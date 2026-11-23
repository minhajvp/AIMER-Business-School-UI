'use client';

import React, { useState, useEffect } from 'react';
import { Programme } from '@/types';

interface BrochureModalProps {
  isOpen: boolean;
  onClose: () => void;
  programmes: Programme[];
  defaultProgramme?: string;
}

export const BrochureModal: React.FC<BrochureModalProps> = ({
  isOpen,
  onClose,
  programmes,
  defaultProgramme,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    whatsapp: '',
    email: '',
    programme: defaultProgramme || 'all',
  });
  const [isDownloaded, setIsDownloaded] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState('');
  const [downloadFilename, setDownloadFilename] = useState('');

  // Update programme if defaultProgramme changes or modal reopens
  useEffect(() => {
    if (defaultProgramme) {
      setFormData((prev) => ({ ...prev, programme: defaultProgramme }));
    }
  }, [defaultProgramme, isOpen]);

  const getBrochureDetails = (prog: string) => {
    const key = prog.toLowerCase();
    if (key.includes('hsbip')) {
      return {
        url: '/brochure/HSBIP-brochure.pdf',
        filename: 'AIMER-HSBIP-Brochure.pdf',
        name: 'HSBIP Prospectus',
      };
    }
    if (key.includes('pgbip')) {
      return {
        url: '/brochure/PGBIP-brochure.pdf',
        filename: 'AIMER-PGBIP-Brochure.pdf',
        name: 'PGBIP Prospectus',
      };
    }
    // Default to UGBIP
    return {
      url: '/brochure/UGBIP-brochure.pdf',
      filename: 'AIMER-UGBIP-Brochure.pdf',
      name: 'UGBIP Prospectus',
    };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.whatsapp || !formData.email) return;

    // Resolve which brochure to download based on selected programme or default
    const targetProgramme =
      formData.programme === 'all'
        ? defaultProgramme || 'ugbip'
        : formData.programme;

    const { url, filename } = getBrochureDetails(targetProgramme);
    setDownloadUrl(url);
    setDownloadFilename(filename);

    // Trigger direct file download
    try {
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filename);
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error('Auto download failed, fallback available', err);
    }

    setIsDownloaded(true);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-charcoal-950/70 backdrop-blur-xs transition-opacity duration-200"
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-charcoal-100 p-6 sm:p-8 z-10 overflow-hidden">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-charcoal-400 hover:text-charcoal-700 hover:bg-charcoal-100 transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {isDownloaded ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto text-xl font-bold">
              ✓
            </div>
            <h3 className="text-xl font-bold text-charcoal-900 font-poppins">
              Prospectus Ready, {formData.name || 'Candidate'}!
            </h3>
            <p className="text-xs sm:text-sm text-charcoal-600 leading-relaxed max-w-md mx-auto">
              Your official AIMER brochure download has started. Our admissions team is available on WhatsApp to answer any curriculum, fee, or eligibility queries.
            </p>

            {/* Direct Re-download Link */}
            {downloadUrl && (
              <div className="pt-1">
                <a
                  href={downloadUrl}
                  download={downloadFilename}
                  className="inline-flex items-center gap-1.5 text-xs text-aimer-600 hover:text-aimer-700 underline font-medium"
                >
                  <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    />
                  </svg>
                  <span>Click here if download didn&apos;t start automatically</span>
                </a>
              </div>
            )}

            <div className="pt-3 flex flex-col gap-2.5">
              <a
                href={`https://wa.me/917450030600?text=Hi%20AIMER,%20I%20have%20downloaded%20the%20${formData.programme.toUpperCase()}%20brochure%20and%20would%20like%20to%20know%20more.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-xl text-xs font-semibold uppercase tracking-wider text-white bg-emerald-600 hover:bg-emerald-700 transition-colors text-center shadow-sm flex items-center justify-center gap-2"
              >
                <span>Connect with Admissions on WhatsApp</span>
                <span>&rarr;</span>
              </a>
              <button
                type="button"
                onClick={onClose}
                className="w-full py-2.5 text-xs font-semibold text-charcoal-600 hover:text-charcoal-900 cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-6 space-y-1">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-aimer-600 font-poppins">
                Official Prospectus 2026–27
              </div>
              <h3 className="text-2xl font-bold text-charcoal-900 font-poppins">
                Download AIMER Brochure
              </h3>
              <p className="text-xs text-charcoal-500 font-light">
                Receive the complete curriculum structure, corporate residency terms, fee schedule, and scholarship matrix.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal-700 mb-1 font-poppins">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Fathima Zahra"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-charcoal-200 text-sm focus:border-aimer-500 focus:outline-none transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal-700 mb-1 font-poppins">
                    WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={formData.whatsapp}
                    onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-charcoal-200 text-sm focus:border-aimer-500 focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal-700 mb-1 font-poppins">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="you@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-charcoal-200 text-sm focus:border-aimer-500 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal-700 mb-1 font-poppins">
                  Programme of Interest
                </label>
                <select
                  value={formData.programme}
                  onChange={(e) => setFormData({ ...formData, programme: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-charcoal-200 text-sm focus:border-aimer-500 focus:outline-none transition-colors bg-white font-poppins"
                >
                  <option value="hsbip">HSBIP (Higher Secondary Business Integrated Program)</option>
                  <option value="ugbip">UGBIP (Undergraduate Business Integrated Program)</option>
                  <option value="pgbip">PGBIP (Postgraduate Business Integrated Program)</option>
                  <option value="all">All Programmes (Comprehensive Prospectus)</option>
                  {programmes.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.shortTitle} — {p.title}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl text-xs font-semibold uppercase tracking-wider text-white bg-aimer-600 hover:bg-aimer-700 transition-colors shadow-sm mt-2 cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Download Prospectus</span>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default BrochureModal;
