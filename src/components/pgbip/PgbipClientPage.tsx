'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/navbar/Navbar';
import { Footer } from '@/components/footer/Footer';
import { BrochureModal } from '@/components/ui/BrochureModal';
import { PgbipWireframeHero } from '@/components/pgbip/PgbipWireframeHero';
import { PgbipEcosystemStrip } from '@/components/pgbip/PgbipEcosystemStrip';
import { PgbipSectionNav } from '@/components/pgbip/PgbipSectionNav';
import { PgbipHighlightsGrid } from '@/components/pgbip/PgbipHighlightsGrid';
import { PgbipScrollOpenCurriculum } from '@/components/pgbip/PgbipScrollOpenCurriculum';
import { PgbipWireframeBanner } from '@/components/pgbip/PgbipWireframeBanner';
import { PgbipEligibility } from '@/components/pgbip/PgbipEligibility';
import { PgbipAdmission } from '@/components/pgbip/PgbipAdmission';
import { PgbipClosing } from '@/components/pgbip/PgbipClosing';
import { PgbipMobileBar } from '@/components/pgbip/PgbipMobileBar';
import { pgbipContent } from '@/contents/programmes/pgbip';
import { programmesData } from '@/data/programmes.data';

export const PgbipClientPage: React.FC = () => {
  const [isBrochureOpen, setIsBrochureOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white text-charcoal-900 font-poppins selection:bg-aimer-100 selection:text-aimer-900">
      {/* 1. Global Navigation */}
      <Navbar programmes={programmesData} />

      <main>
        {/* 2. Hero Section with Wireframe Background Lines & Video Facade */}
        <PgbipWireframeHero
          content={pgbipContent.hero}
          onOpenBrochure={() => setIsBrochureOpen(true)}
        />

        {/* 3. Hiring & Corporate Ecosystem Strip */}
        <PgbipEcosystemStrip content={pgbipContent.ecosystem} />

        {/* 4. Sticky Sub-Navbar with Scroll-Spy Indicator */}
        <PgbipSectionNav />

        {/* 5. Program Highlights (2-Column Grid Layout) */}
        <PgbipHighlightsGrid content={pgbipContent.highlights} />

        {/* 6. Scroll-Open Curriculum & Residency Roadmap */}
        <PgbipScrollOpenCurriculum content={pgbipContent.scrollOpenCurriculum} />

        {/* 7. Wireframe Campus Contour Banner */}
        <PgbipWireframeBanner content={pgbipContent.campusBanner} />

        {/* 8. Eligibility Criteria & NAAT Competency Matrix */}
        <PgbipEligibility content={pgbipContent.eligibility} />

        {/* 9. Postgraduate Fast-Track Application Form */}
        <PgbipAdmission content={pgbipContent.admission} />

        {/* 10. Executive Closing Band */}
        <PgbipClosing content={pgbipContent.closing} />
      </main>

      {/* 11. Institutional Footer */}
      <Footer programmes={programmesData} />

      {/* 12. Sticky Bottom Bar on Mobile */}
      <PgbipMobileBar onOpenBrochure={() => setIsBrochureOpen(true)} />

      {/* 13. Brochure Download Modal */}
      {isBrochureOpen && (
        <BrochureModal
          isOpen={isBrochureOpen}
          onClose={() => setIsBrochureOpen(false)}
          programmes={programmesData}
          defaultProgramme="pgbip"
        />
      )}
    </div>
  );
};
