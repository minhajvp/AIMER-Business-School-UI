'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/navbar/Navbar';
import { Hero } from '@/components/hero/Hero';
import { Positioning } from '@/components/positioning/Positioning';
import { ProgrammesSection } from '@/components/programmes/ProgrammesSection';
import { MethodSection } from '@/components/method/MethodSection';
import { PartnersSection } from '@/components/partners/PartnersSection';
import { OutcomesSection } from '@/components/outcomes/OutcomesSection';
import { MentorsSection } from '@/components/mentors/MentorsSection';
import { CampusSection } from '@/components/campus/CampusSection';
import { CampusFilmSection } from '@/components/campus/CampusFilmSection';
import { AdmissionsSection } from '@/components/admissions/AdmissionsSection';
import { EnquirySection } from '@/components/enquiry/EnquirySection';
import { Footer } from '@/components/footer/Footer';
import { BrochureModal } from '@/components/ui/BrochureModal';
import {
  Programme,
  InstitutionalStat,
  MethodPhase,
  IndustryPartner,
  StudentOutcome,
  Mentor,
} from '@/types';

interface HomeClientProps {
  programmes: Programme[];
  heroMetrics: { value: string; label: string }[];
  institutionalStats: InstitutionalStat[];
  methodPhases: MethodPhase[];
  partners: IndustryPartner[];
  outcomes: StudentOutcome[];
  mentors: Mentor[];
}

export const HomeClient: React.FC<HomeClientProps> = ({
  programmes,
  heroMetrics,
  institutionalStats,
  methodPhases,
  partners,
  outcomes,
  mentors,
}) => {
  const [isBrochureOpen, setIsBrochureOpen] = useState(false);

  return (
    <main className="min-h-screen bg-white text-charcoal-900">
      {/* 1. Premium Top Navigation */}
      <Navbar programmes={programmes} />

      {/* 2. Hero Section */}
      <Hero
        metrics={heroMetrics}
        onOpenBrochureModal={() => setIsBrochureOpen(true)}
      />

      {/* 3. Institutional Positioning & Core Pillars */}
      <div className="section-content-visibility">
        <Positioning stats={institutionalStats} />
      </div>

      {/* 4. Practice-Led Degree Pathways */}
      <div className="section-content-visibility">
        <ProgrammesSection programmes={programmes} />
      </div>

      {/* 5. The AIMER Method: 5 Progressive Phases */}
      <div className="section-content-visibility">
        <MethodSection phases={methodPhases} />
      </div>

      {/* 6. Corporate Ecosystem & Placement Partners */}
      <div className="section-content-visibility">
        <PartnersSection partners={partners} />
      </div>

      {/* 7. Verified Student Outcomes & Ventures */}
      <div className="section-content-visibility">
        <OutcomesSection outcomes={outcomes} />
      </div>

      {/* 8. Operating Founders & CXO Mentors */}
      <div className="section-content-visibility">
        <MentorsSection mentors={mentors} />
      </div>

      {/* 9. 125-Acre Smart City Campus Experience */}
      <div className="section-content-visibility">
        <CampusSection />
      </div>

      {/* 10. Campus Experience Film */}
      <div className="section-content-visibility">
        <CampusFilmSection />
      </div>

      {/* 11. Admissions & NAAT Fast-Track Registration */}
      <div className="section-content-visibility">
        <AdmissionsSection programmes={programmes} />
      </div>

      {/* 12. Admissions Callback & Enquiry Section */}
      <div className="section-content-visibility">
        <EnquirySection programmes={programmes} />
      </div>

      {/* 13. Premium Institutional Footer */}
      <Footer programmes={programmes} />

      {/* Reusable Prospectus Download Modal (mounted only on open) */}
      {isBrochureOpen && (
        <BrochureModal
          isOpen={isBrochureOpen}
          onClose={() => setIsBrochureOpen(false)}
          programmes={programmes}
        />
      )}
    </main>
  );
};

export default HomeClient;
