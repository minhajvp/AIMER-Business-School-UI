'use client';

import React, { useState, useRef } from 'react';
import { Navbar } from '@/components/navbar/Navbar';
import { Footer } from '@/components/footer/Footer';
import { BrochureModal } from '@/components/ui/BrochureModal';
import { AboutHero } from './AboutHero';
import { CampusFilmModal } from './CampusFilmModal';
import { AboutFeatures } from './AboutFeatures';
import { AboutVisionMission } from './AboutVisionMission';
import { AboutValues } from './AboutValues';
import { AboutCampusMKC } from './AboutCampusMKC';
import { AboutFounderMessage } from './AboutFounderMessage';
import { AboutLeadership } from './AboutLeadership';
import { AboutTransformation } from './AboutTransformation';
import { AboutFacultyBand } from './AboutFacultyBand';
import { AboutClosing } from './AboutClosing';
import { AboutNewsletter } from './AboutNewsletter';
import { aboutContent } from '@/contents/about';
import { programmesData } from '@/data/programmes.data';

export const AboutClientPage: React.FC = () => {
  const [isFilmOpen, setIsFilmOpen] = useState(false);
  const [isBrochureOpen, setIsBrochureOpen] = useState(false);
  const filmButtonRef = useRef<HTMLButtonElement | null>(null);

  return (
    <div className="min-h-screen bg-white text-charcoal-900 font-poppins selection:bg-aimer-100 selection:text-aimer-900">
      {/* 0. Accessible Skip Link */}
      <a
        href="#about-main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-50 px-4 py-2 bg-aimer-600 text-white text-xs font-semibold rounded-md shadow-lg outline-none"
      >
        Skip to content
      </a>

      {/* 1. Global Navigation */}
      <Navbar programmes={programmesData} />

      {/* Main Page Flow */}
      <main id="about-main-content" tabIndex={-1} className="focus:outline-none">
        {/* 2. Hero Section with Video Backdrop & Count-up Metrics */}
        <AboutHero
          content={aboutContent.hero}
          onOpenFilm={() => setIsFilmOpen(true)}
          filmButtonRef={filmButtonRef}
        />

        {/* 3. Alternating Feature Rows with Clip-Path Reveal */}
        <AboutFeatures features={aboutContent.features} />

        {/* 4. Vision & Mission with Interactive Word Fill & Split Layout */}
        <AboutVisionMission content={aboutContent.visionMission} />

        {/* 5. Institutional Principles Accordion */}
        <AboutValues content={aboutContent.values} />

        {/* 6. Markaz Knowledge City Campus Panoramic & 3 Pillars */}
        <AboutCampusMKC content={aboutContent.campus} />

        {/* 7. Message from the Founder */}
        <AboutFounderMessage content={aboutContent.founder} />

        {/* 8. Leadership Team Interactive Expanding Panels */}
        <AboutLeadership content={aboutContent.leadership} />

        {/* 9. The AIMER 5-Stage Transformation Route */}
        <AboutTransformation content={aboutContent.transformation} />

        {/* 10. Meet the Faculty Band */}
        <AboutFacultyBand content={aboutContent.faculty} />

        {/* 11. Closing Call-To-Action Band */}
        <AboutClosing
          content={aboutContent.closing}
          onOpenBrochure={() => setIsBrochureOpen(true)}
        />

        {/* 12. Corporate Newsletter Subscription */}
        <AboutNewsletter content={aboutContent.newsletter} />
      </main>

      {/* 13. Institutional Global Footer */}
      <Footer programmes={programmesData} />

      {/* Campus Film Lightbox Modal */}
      <CampusFilmModal
        isOpen={isFilmOpen}
        onClose={() => setIsFilmOpen(false)}
        triggerRef={filmButtonRef}
      />

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

