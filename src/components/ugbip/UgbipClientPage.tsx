'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/navbar/Navbar';
import { Footer } from '@/components/footer/Footer';
import { BrochureModal } from '@/components/ui/BrochureModal';
import { UgbipHero } from '@/components/ugbip/UgbipHero';
import { UgbipEcosystem } from '@/components/ugbip/UgbipEcosystem';
import { UgbipSectionNav } from '@/components/ugbip/UgbipSectionNav';
import { UgbipOverview } from '@/components/ugbip/UgbipOverview';
import { UgbipLearn } from '@/components/ugbip/UgbipLearn';
import { UgbipDevelopment } from '@/components/ugbip/UgbipDevelopment';
import { UgbipNaatBand } from '@/components/ugbip/UgbipNaatBand';
import { UgbipAdmission } from '@/components/ugbip/UgbipAdmission';
import { UgbipClosing } from '@/components/ugbip/UgbipClosing';
import { UgbipNewsletter } from '@/components/ugbip/UgbipNewsletter';
import { UgbipMobileBar } from '@/components/ugbip/UgbipMobileBar';
import { ugbipContent } from '@/contents/programmes/ugbip';
import { programmesData } from '@/data/programmes.data';

export const UgbipClientPage: React.FC = () => {
  const [isBrochureOpen, setIsBrochureOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white text-charcoal-900 font-poppins selection:bg-aimer-100 selection:text-aimer-900">
      {/* 1. Global Navigation */}
      <Navbar programmes={programmesData} />

      <main>
        {/* 2. Hero Section with Video Facade */}
        <UgbipHero
          content={ugbipContent.hero}
          onOpenBrochure={() => setIsBrochureOpen(true)}
        />

        {/* 3. Corporate Ecosystem Partners Strip */}
        <UgbipEcosystem content={ugbipContent.ecosystem} />

        {/* 4. Sticky Section Scroll-Spy Sub-Nav */}
        <UgbipSectionNav />

        {/* 5. Overview: Counters, 75% Practicum Bar, Global Immersion Dubai, 2x Internships */}
        <UgbipOverview content={ugbipContent.overview} />

        {/* 6. How You Learn: Masterclasses, 6 Management Challenges, Certified Workshops, Mentor Rail */}
        <UgbipLearn content={ugbipContent.learn} />

        {/* 7. Student Development: SDP, SRC, 3-Image Campus Life */}
        <UgbipDevelopment content={ugbipContent.development} />

        {/* 8. NAAT Band: 4 Competency Cards + Next Date */}
        <UgbipNaatBand content={ugbipContent.naatBand} />

        {/* 9. Fast-Track Admissions Form */}
        <UgbipAdmission content={ugbipContent.admission} />

        {/* 10. Dark Closing Band */}
        <UgbipClosing content={ugbipContent.closing} />

        {/* 11. Compact Newsletter */}
        <UgbipNewsletter content={ugbipContent.newsletter} />
      </main>

      {/* 12. Institutional Footer */}
      <Footer programmes={programmesData} />

      {/* 13. Mobile Bottom Sticky Bar */}
      <UgbipMobileBar onOpenBrochure={() => setIsBrochureOpen(true)} />

      {/* 14. Brochure Download Modal */}
      {isBrochureOpen && (
        <BrochureModal
          isOpen={isBrochureOpen}
          onClose={() => setIsBrochureOpen(false)}
          programmes={programmesData}
          defaultProgramme="ugbip"
        />
      )}
    </div>
  );
};

