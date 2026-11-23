'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/navbar/Navbar';
import { Footer } from '@/components/footer/Footer';
import { BrochureModal } from '@/components/ui/BrochureModal';
import { HsbipHero } from '@/components/hsbip/HsbipHero';
import { HsbipEcosystemStrip } from '@/components/hsbip/HsbipEcosystemStrip';
import { HsbipSectionNav } from '@/components/hsbip/HsbipSectionNav';
import { HsbipOverview } from '@/components/hsbip/HsbipOverview';
import { HsbipPillars } from '@/components/hsbip/HsbipPillars';
import { HsbipOutcomes } from '@/components/hsbip/HsbipOutcomes';
import { HsbipCampusLife } from '@/components/hsbip/HsbipCampusLife';
import { HsbipAdmission } from '@/components/hsbip/HsbipAdmission';
import { HsbipClosing } from '@/components/hsbip/HsbipClosing';
import { HsbipNewsletter } from '@/components/hsbip/HsbipNewsletter';
import { HsbipMobileBar } from '@/components/hsbip/HsbipMobileBar';
import { hsbipContent } from '@/contents/programmes/hsbip';
import { programmesData } from '@/data/programmes.data';

export const HsbipClientPage: React.FC = () => {
  const [isBrochureOpen, setIsBrochureOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white text-charcoal-900 font-poppins selection:bg-aimer-100 selection:text-aimer-900">
      {/* 1. Global Navigation */}
      <Navbar programmes={programmesData} />

      <main>
        {/* 2. Hero Section with Video Facade & Subtle Background Lines */}
        <HsbipHero
          content={hsbipContent.hero}
          onOpenBrochure={() => setIsBrochureOpen(true)}
        />

        {/* 3. Corporate Ecosystem Partners Marquee */}
        <HsbipEcosystemStrip content={hsbipContent.ecosystem} />

        {/* 4. Sticky Section Scroll-Spy Sub-Nav */}
        <HsbipSectionNav />

        {/* 5. Overview: Counters & Pedagogy Ratio Bar */}
        <HsbipOverview content={hsbipContent.overview} />

        {/* 6. The 11 Pillars of Value Delivery */}
        <HsbipPillars content={hsbipContent.pillars} />

        {/* 7. Student Outcomes: Five Transformations */}
        <HsbipOutcomes content={hsbipContent.outcomes} />

        {/* 8. Residential Campus Life & Hostel Security */}
        <HsbipCampusLife content={hsbipContent.campus} />

        {/* 9. Fast-Track Admissions & Interactive Application Form */}
        <HsbipAdmission content={hsbipContent.admissions} />

        {/* 10. Deep Corporate Closing Band */}
        <HsbipClosing />

        {/* 11. Compact Newsletter */}
        <HsbipNewsletter content={hsbipContent.newsletter} />
      </main>

      {/* 12. Institutional Footer */}
      <Footer programmes={programmesData} />

      {/* 13. Mobile Bottom Sticky Bar */}
      <HsbipMobileBar onOpenBrochure={() => setIsBrochureOpen(true)} />

      {/* 14. Brochure Download Modal */}
      {isBrochureOpen && (
        <BrochureModal
          isOpen={isBrochureOpen}
          onClose={() => setIsBrochureOpen(false)}
          programmes={programmesData}
          defaultProgramme="hsbip"
        />
      )}
    </div>
  );
};

