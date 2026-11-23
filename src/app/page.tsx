import React from 'react';
import { HomeClient } from '@/components/home/HomeClient';
import {
  programmeService,
  statsService,
  methodService,
  partnerService,
  outcomeService,
  mentorService,
} from '@/services';

export default async function HomePage() {
  const [
    programmes,
    heroMetrics,
    institutionalStats,
    methodPhases,
    partners,
    outcomes,
    mentors,
  ] = await Promise.all([
    programmeService.getAllProgrammes(),
    statsService.getHeroMetrics(),
    statsService.getInstitutionalStats(),
    methodService.getMethodPhases(),
    partnerService.getCorporatePartners(),
    outcomeService.getAllOutcomes(),
    mentorService.getFeaturedMentors(),
  ]);

  return (
    <HomeClient
      programmes={programmes}
      heroMetrics={heroMetrics}
      institutionalStats={institutionalStats}
      methodPhases={methodPhases}
      partners={partners}
      outcomes={outcomes}
      mentors={mentors}
    />
  );
}
