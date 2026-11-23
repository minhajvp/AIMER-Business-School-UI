'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/navbar/Navbar';
import { Footer } from '@/components/footer/Footer';
import { BrochureModal } from '@/components/ui/BrochureModal';
import { AboutNewsletter } from '@/components/about/AboutNewsletter';
import { ParentHero } from './ParentHero';
import { ParentPillars } from './ParentPillars';
import { ParentTestimonial } from './ParentTestimonial';
import { ParentFaqs } from './ParentFaqs';
import { ParentVisit } from './ParentVisit';
import { ParentClosing } from './ParentClosing';
import { parentsContent } from '@/contents/parents';
import { programmesData } from '@/data/programmes.data';

export const ParentsClientPage: React.FC = () => {
  const [isBrochureOpen, setIsBrochureOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white text-charcoal-900 font-poppins selection:bg-aimer-100 selection:text-aimer-900">
      {/* 0. Accessible Skip Link */}
      <a
        href="#parents-main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-50 px-4 py-2 bg-aimer-600 text-white text-xs font-semibold rounded-md shadow-lg outline-none"
      >
        Skip to content
      </a>

      {/* 1. Global Navigation */}
      <Navbar programmes={programmesData} />

      {/* Main Page Flow */}
      <main id="parents-main-content" tabIndex={-1} className="focus:outline-none">
        {/* 2. Hero Section with Video Backdrop & Metrics */}
        <ParentHero content={parentsContent.hero} />

        {/* 3. The 6 Pillars of Parent Trust */}
        <ParentPillars content={parentsContent.pillars} />

        {/* 4. Parent Perspective Testimonial */}
        <ParentTestimonial content={parentsContent.testimonial} />

        {/* 5. Frequently Asked Questions by Parents Accordion */}
        <ParentFaqs content={parentsContent.faqs} />

        {/* 6. Campus Visit & Family Immersion */}
        <ParentVisit content={parentsContent.visit} />

        {/* 7. Dark Closing Band with NAAT CTAs */}
        <ParentClosing
          content={parentsContent.closing}
          onOpenBrochure={() => setIsBrochureOpen(true)}
        />

        {/* 8. Corporate Newsletter Subscription */}
        <AboutNewsletter content={parentsContent.newsletter} />
      </main>

      {/* 9. Institutional Global Footer */}
      <Footer programmes={programmesData} />

      {/* Reusable Prospectus Download Modal */}
      {isBrochureOpen && (
        <BrochureModal
          isOpen={isBrochureOpen}
          onClose={() => setIsBrochureOpen(false)}
          programmes={programmesData}
        />
      )}
    </div>
  );
};

