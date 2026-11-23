'use client';

import React from 'react';
import { SectionBadge } from '@/components/ui/SectionBadge';
import { IndustryPartner } from '@/types';

interface PartnersSectionProps {
  partners?: IndustryPartner[];
}

export const PartnersSection: React.FC<PartnersSectionProps> = () => {
  // Row 1: Global Corporate Giants, Tier-1 Consultancies & Financial Institutions
  const row1Logos = [
    {
      id: 'google',
      label: 'Google',
      svg: (
        <svg className="h-7 w-auto max-w-[140px]" viewBox="0 0 272 92" fill="none">
          <path d="M115.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18c0-12.85 9.99-22.18 22.25-22.18s22.25 9.33 22.25 22.18zm-9.74 0c0-7.98-5.79-13.6-12.51-13.6-6.73 0-12.52 5.62-12.52 13.6 0 7.9 5.79 13.6 12.52 13.6 6.72 0 12.51-5.7 12.51-13.6z" fill="#EA4335" />
          <path d="M163.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18c0-12.85 9.99-22.18 22.25-22.18s22.25 9.33 22.25 22.18zm-9.74 0c0-7.98-5.79-13.6-12.51-13.6-6.73 0-12.51 5.62-12.51 13.6 0 7.9 5.78 13.6 12.51 13.6 6.72 0 12.51-5.7 12.51-13.6z" fill="#FBBC05" />
          <path d="M209.75 26.34v39.82c0 16.38-9.66 23.07-21.08 23.07-10.75 0-17.22-7.19-19.66-13.07l8.48-3.53c1.51 3.61 5.21 7.87 11.17 7.87 7.31 0 11.85-4.51 11.85-13.02v-3.19h-.34c-2.18 2.69-6.38 5.04-11.68 5.04-11.09 0-21.25-9.66-21.25-22.09 0-12.52 10.16-22.26 21.25-22.26 5.29 0 9.49 2.35 11.68 4.96h.34v-3.6h9.24zm-8.86 20.92c0-7.81-5.21-13.6-11.93-13.6-6.72 0-12.26 5.79-12.26 13.6 0 7.73 5.54 13.43 12.26 13.43 6.72 0 11.93-5.7 11.93-13.43z" fill="#4285F4" />
          <path d="M225.75 6.34h9.57v63.02h-9.57z" fill="#34A853" />
          <path d="M261.75 54.49l7.65 5.1c-2.48 3.68-8.51 9.77-17.65 9.77-12.18 0-21.25-9.49-21.25-22.18 0-13.19 9.16-22.18 20.24-22.18 11.17 0 16.72 9.16 18.52 14.11l1.01 2.52-27.97 11.59c2.15 4.25 5.52 6.45 10.25 6.45 4.73 0 7.84-2.35 9.2-5.18zm-19.74-7.98l18.73-7.78c-1.03-2.58-4.08-4.42-7.81-4.42-4.73 0-11.29 4.14-10.92 12.2z" fill="#EA4335" />
          <path d="M35.63 42.45v11.45h27.42c-.81 5.92-2.79 10.24-5.87 13.32-3.76 3.76-9.66 7.89-21.55 7.89-17.18 0-30.65-13.91-30.65-31.11 0-17.2 13.47-31.11 30.65-31.11 9.27 0 16.08 3.66 21.09 8.44l8.09-8.09C57.65 6.24 47.96 1.89 35.63 1.89 16.27 1.89.5 17.66.5 37s15.77 35.11 35.13 35.11c10.46 0 18.34-3.44 24.5-9.84 6.32-6.32 8.32-15.24 8.32-22.42 0-2.24-.22-4.34-.58-6.4H35.63z" fill="#4285F4" />
        </svg>
      ),
    },
    {
      id: 'microsoft',
      label: 'Microsoft',
      svg: (
        <svg className="h-6 w-auto max-w-[145px]" viewBox="0 0 240 52" fill="none">
          <rect x="0" y="5" width="18" height="18" fill="#F25022" />
          <rect x="22" y="5" width="18" height="18" fill="#7FBA00" />
          <rect x="0" y="27" width="18" height="18" fill="#00A4EF" />
          <rect x="22" y="27" width="18" height="18" fill="#FFB900" />
          <text x="52" y="32" fontFamily="system-ui, -apple-system, Segoe UI, Roboto" fontSize="23" fontWeight="600" fill="#24292e" letterSpacing="-0.5">
            Microsoft
          </text>
        </svg>
      ),
    },
    {
      id: 'deloitte',
      label: 'Deloitte',
      svg: (
        <svg className="h-6 w-auto max-w-[135px]" viewBox="0 0 160 40" fill="none">
          <text x="2" y="29" fontFamily="system-ui, -apple-system, sans-serif" fontSize="27" fontWeight="800" fill="#171B1D" letterSpacing="-0.75">
            Deloitte<tspan fill="#86BC25">.</tspan>
          </text>
        </svg>
      ),
    },
    {
      id: 'mckinsey',
      label: 'McKinsey & Company',
      svg: (
        <svg className="h-6 w-auto max-w-[155px]" viewBox="0 0 220 40" fill="none">
          <text x="2" y="28" fontFamily="Georgia, serif" fontSize="22" fontWeight="700" fill="#002244" letterSpacing="-0.2">
            McKinsey&amp;Company
          </text>
        </svg>
      ),
    },
    {
      id: 'tata',
      label: 'Tata Group',
      svg: (
        <svg className="h-7 w-auto max-w-[130px]" viewBox="0 0 160 50" fill="none">
          <circle cx="25" cy="25" r="21" stroke="#005696" strokeWidth="2.5" fill="none" />
          <path d="M14 21c7-5 15-5 22 0M17 26c5-4 11-4 16 0M21 31c2.5-2.5 5.5-2.5 8 0" stroke="#005696" strokeWidth="2.5" strokeLinecap="round" />
          <text x="60" y="33" fontFamily="system-ui, -apple-system, sans-serif" fontSize="26" fontWeight="800" fill="#005696" letterSpacing="4">
            TATA
          </text>
        </svg>
      ),
    },
    {
      id: 'pwc',
      label: 'PwC',
      svg: (
        <svg className="h-7 w-auto max-w-[110px]" viewBox="0 0 130 50" fill="none">
          <rect x="5" y="10" width="10" height="10" fill="#DC6900" />
          <rect x="18" y="10" width="10" height="10" fill="#E0301E" />
          <rect x="5" y="23" width="10" height="10" fill="#EB8C00" />
          <rect x="18" y="23" width="10" height="10" fill="#D04A02" />
          <text x="36" y="34" fontFamily="Georgia, serif" fontSize="28" fontWeight="700" fill="#2D2D2D" letterSpacing="-0.5">
            pwc
          </text>
        </svg>
      ),
    },
    {
      id: 'amazon',
      label: 'Amazon',
      svg: (
        <svg className="h-6 w-auto max-w-[130px]" viewBox="0 0 160 48" fill="none">
          <text x="4" y="29" fontFamily="system-ui, -apple-system, sans-serif" fontSize="26" fontWeight="700" fill="#171B1D" letterSpacing="-0.5">
            amazon
          </text>
          <path d="M22 36c25 9 65 9 90-2" stroke="#FF9900" strokeWidth="3" strokeLinecap="round" />
          <path d="M107 33l7 1-4 6" fill="#FF9900" />
        </svg>
      ),
    },
    {
      id: 'emirates-nbd',
      label: 'Emirates NBD',
      svg: (
        <svg className="h-7 w-auto max-w-[155px]" viewBox="0 0 200 48" fill="none">
          <polygon points="12,8 24,14 16,38 4,32" fill="#003A70" />
          <polygon points="26,15 38,21 30,45 18,39" fill="#008FD5" />
          <text x="46" y="25" fontFamily="system-ui, -apple-system, sans-serif" fontSize="13" fontWeight="700" fill="#003A70" letterSpacing="1">
            Emirates NBD
          </text>
          <text x="46" y="38" fontFamily="system-ui, -apple-system, sans-serif" fontSize="9" fontWeight="600" fill="#008FD5" letterSpacing="0.5">
            GLOBAL WEALTH
          </text>
        </svg>
      ),
    },
    {
      id: 'kpmg',
      label: 'KPMG',
      svg: (
        <svg className="h-6 w-auto max-w-[125px]" viewBox="0 0 140 40" fill="none">
          <text x="2" y="30" fontFamily="system-ui, -apple-system, Arial, sans-serif" fontSize="28" fontWeight="900" fill="#00338D" letterSpacing="3">
            KPMG
          </text>
        </svg>
      ),
    },
    {
      id: 'hsbc',
      label: 'HSBC',
      svg: (
        <svg className="h-6 w-auto max-w-[135px]" viewBox="0 0 150 42" fill="none">
          <polygon points="18,7 32,21 18,35" fill="#DB0011" />
          <polygon points="4,21 18,7 18,35" fill="#FFFFFF" stroke="#DB0011" strokeWidth="1" />
          <polygon points="32,21 46,7 46,35" fill="#DB0011" />
          <polygon points="18,21 32,7 32,35" fill="#FFFFFF" stroke="#DB0011" strokeWidth="1" />
          <text x="56" y="29" fontFamily="system-ui, -apple-system, sans-serif" fontSize="22" fontWeight="700" fill="#333333" letterSpacing="1">
            HSBC
          </text>
        </svg>
      ),
    },
  ];

  // Row 2: GCC Mobility Hubs, Sovereign Entities & High-Growth Partner Firms
  const row2Logos = [
    {
      id: 'difc',
      label: 'DIFC Dubai',
      svg: (
        <svg className="h-7 w-auto max-w-[145px]" viewBox="0 0 180 48" fill="none">
          <circle cx="20" cy="24" r="16" stroke="#9A7B38" strokeWidth="2.5" fill="none" />
          <path d="M12 24h16M20 16v16" stroke="#9A7B38" strokeWidth="2" />
          <text x="44" y="26" fontFamily="system-ui, -apple-system, sans-serif" fontSize="17" fontWeight="800" fill="#1B2B38" letterSpacing="2">
            DIFC
          </text>
          <text x="44" y="38" fontFamily="system-ui, -apple-system, sans-serif" fontSize="8" fontWeight="600" fill="#9A7B38" letterSpacing="0.8">
            DUBAI FINANCIAL CENTRE
          </text>
        </svg>
      ),
    },
    {
      id: 'dubai-future',
      label: 'Dubai Future Foundation',
      svg: (
        <svg className="h-7 w-auto max-w-[160px]" viewBox="0 0 210 48" fill="none">
          <circle cx="22" cy="24" r="16" stroke="#0B9B90" strokeWidth="2.5" strokeDasharray="3 2" fill="none" />
          <circle cx="22" cy="24" r="7" fill="#0B9B90" />
          <text x="48" y="23" fontFamily="system-ui, -apple-system, sans-serif" fontSize="12" fontWeight="800" fill="#171B1D" letterSpacing="0.8">
            DUBAI FUTURE
          </text>
          <text x="48" y="35" fontFamily="system-ui, -apple-system, sans-serif" fontSize="9" fontWeight="600" fill="#0B9B90" letterSpacing="0.5">
            FOUNDATION
          </text>
        </svg>
      ),
    },
    {
      id: 'ey',
      label: 'Ernst & Young (EY)',
      svg: (
        <svg className="h-7 w-auto max-w-[110px]" viewBox="0 0 110 48" fill="none">
          <path d="M10 12l26-6v4L10 16z" fill="#FFE600" />
          <text x="10" y="37" fontFamily="system-ui, -apple-system, sans-serif" fontSize="30" fontWeight="900" fill="#2E2E38" letterSpacing="-1">
            EY
          </text>
          <text x="58" y="26" fontFamily="system-ui, -apple-system, sans-serif" fontSize="9" fontWeight="600" fill="#747480" letterSpacing="0.5">
            Building a better
          </text>
          <text x="58" y="36" fontFamily="system-ui, -apple-system, sans-serif" fontSize="9" fontWeight="600" fill="#747480" letterSpacing="0.5">
            working world
          </text>
        </svg>
      ),
    },
    {
      id: 'morgan-stanley',
      label: 'Morgan Stanley',
      svg: (
        <svg className="h-6 w-auto max-w-[155px]" viewBox="0 0 210 42" fill="none">
          <text x="2" y="29" fontFamily="Georgia, serif" fontSize="21" fontWeight="700" fill="#002B49" letterSpacing="0.5">
            Morgan Stanley
          </text>
        </svg>
      ),
    },
    {
      id: 'infosys',
      label: 'Infosys',
      svg: (
        <svg className="h-6 w-auto max-w-[125px]" viewBox="0 0 130 40" fill="none">
          <text x="2" y="29" fontFamily="system-ui, -apple-system, sans-serif" fontSize="25" fontWeight="700" fill="#007CC3" letterSpacing="-0.5">
            Infosys
          </text>
        </svg>
      ),
    },
    {
      id: 'vi',
      label: 'Vodafone Idea',
      svg: (
        <svg className="h-7 w-auto max-w-[95px]" viewBox="0 0 100 48" fill="none">
          <path d="M12 10l12 26 12-26h-7l-5 13-5-13z" fill="#E60000" />
          <circle cx="48" cy="14" r="4.5" fill="#FFC20E" />
          <rect x="44.5" y="22" width="7" height="14" fill="#E60000" rx="2" />
        </svg>
      ),
    },
    {
      id: 'cii',
      label: 'Confederation of Indian Industry',
      svg: (
        <svg className="h-7 w-auto max-w-[150px]" viewBox="0 0 190 48" fill="none">
          <rect x="4" y="10" width="28" height="28" rx="6" fill="#086C78" />
          <text x="8" y="30" fontFamily="system-ui, -apple-system, sans-serif" fontSize="14" fontWeight="800" fill="#FFFFFF" letterSpacing="1">
            CII
          </text>
          <text x="40" y="23" fontFamily="system-ui, -apple-system, sans-serif" fontSize="10" fontWeight="700" fill="#171B1D">
            Confederation of
          </text>
          <text x="40" y="35" fontFamily="system-ui, -apple-system, sans-serif" fontSize="10" fontWeight="700" fill="#086C78">
            Indian Industry
          </text>
        </svg>
      ),
    },
    {
      id: 'kimshealth',
      label: 'KIMSHEALTH',
      svg: (
        <svg className="h-7 w-auto max-w-[155px]" viewBox="0 0 200 48" fill="none">
          <path d="M18 10h8v8h8v8h-8v8h-8v-8h-8v-8h8z" fill="#008289" />
          <text x="44" y="26" fontFamily="system-ui, -apple-system, sans-serif" fontSize="15" fontWeight="800" fill="#003B46" letterSpacing="1">
            KIMSHEALTH
          </text>
          <text x="44" y="37" fontFamily="system-ui, -apple-system, sans-serif" fontSize="8" fontWeight="600" fill="#008289" letterSpacing="1">
            EXCELLENCE IN HEALTHCARE
          </text>
        </svg>
      ),
    },
    {
      id: 'zil-money',
      label: 'Zil Money',
      svg: (
        <svg className="h-7 w-auto max-w-[130px]" viewBox="0 0 150 48" fill="none">
          <circle cx="20" cy="24" r="14" fill="#0052FF" />
          <path d="M14 19h12l-10 10h10" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <text x="42" y="27" fontFamily="system-ui, -apple-system, sans-serif" fontSize="18" fontWeight="800" fill="#0A0E1A" letterSpacing="-0.5">
            Zil<tspan fill="#0052FF">Money</tspan>
          </text>
        </svg>
      ),
    },
    {
      id: 'ksum',
      label: 'Kerala Startup Mission',
      svg: (
        <svg className="h-7 w-auto max-w-[150px]" viewBox="0 0 180 48" fill="none">
          <polygon points="18,10 32,24 18,38 4,24" fill="#F05A28" />
          <polygon points="18,16 26,24 18,32 10,24" fill="#FFFFFF" />
          <text x="40" y="25" fontFamily="system-ui, -apple-system, sans-serif" fontSize="14" fontWeight="800" fill="#171B1D" letterSpacing="1">
            KSUM
          </text>
          <text x="40" y="36" fontFamily="system-ui, -apple-system, sans-serif" fontSize="8" fontWeight="600" fill="#F05A28" letterSpacing="0.5">
            STARTUP MISSION
          </text>
        </svg>
      ),
    },
  ];

  // Seamless duplication for infinite continuous loop without gaps
  const doubledRow1 = [...row1Logos, ...row1Logos];
  const doubledRow2 = [...row2Logos, ...row2Logos];

  return (
    <section id="partners" className="pt-14 sm:pt-16 pb-20 lg:pb-24 bg-white border-b border-charcoal-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Strip */}
        <div className="text-center max-w-3xl mx-auto space-y-2.5">
          <SectionBadge variant="teal">Enterprise Ecosystem</SectionBadge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-charcoal-900 font-poppins">
            Where Our Cohorts Operate &amp; Excel
          </h2>
          <p className="text-xs sm:text-sm text-charcoal-600 font-light max-w-2xl mx-auto leading-relaxed">
            74+ corporate recruiters, sovereign innovation corridors, and multinational enterprises providing embedded residencies, CXO teardowns, and leadership placement offers.
          </p>
        </div>

      </div>

      {/* =========================================================================
          DUAL AUTO-SLIDING LOGO MARQUEE (Row 1: Left-to-Right / Row 2: Right-to-Left)
          - No company name text; only clean, authentic vector brandmarks
          - Left & right gradient masks for seamless fade
          - Hover pauses the animation & lights up the logo
          ========================================================================= */}
      <div className="mt-12 sm:mt-14 relative w-full overflow-hidden pause-on-hover">
        
        {/* Left & Right Gradient Fade Masks */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 z-10 pointer-events-none bg-gradient-to-r from-white via-white/80 to-transparent" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 z-10 pointer-events-none bg-gradient-to-l from-white via-white/80 to-transparent" />

        {/* Row 1: Sliding Left to Right */}
        <div className="flex overflow-hidden py-2.5">
          <div className="animate-marquee-right flex items-center gap-4 sm:gap-6 shrink-0">
            {doubledRow1.map((item, idx) => (
              <div
                key={`${item.id}-r1-${idx}`}
                title={item.label}
                className="w-44 sm:w-52 h-20 sm:h-22 shrink-0 rounded-2xl bg-white border border-charcoal-100 shadow-2xs hover:border-aimer-400 hover:shadow-md flex items-center justify-center p-4 transition-all duration-300 group cursor-pointer"
              >
                <div className="grayscale opacity-65 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300 flex items-center justify-center w-full h-full">
                  {item.svg}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Row 2: Sliding Right to Left */}
        <div className="flex overflow-hidden py-2.5 mt-2 sm:mt-3">
          <div className="animate-marquee-left flex items-center gap-4 sm:gap-6 shrink-0">
            {doubledRow2.map((item, idx) => (
              <div
                key={`${item.id}-r2-${idx}`}
                title={item.label}
                className="w-44 sm:w-52 h-20 sm:h-22 shrink-0 rounded-2xl bg-white border border-charcoal-100 shadow-2xs hover:border-aimer-400 hover:shadow-md flex items-center justify-center p-4 transition-all duration-300 group cursor-pointer"
              >
                <div className="grayscale opacity-65 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300 flex items-center justify-center w-full h-full">
                  {item.svg}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Enterprise Value Callout Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 sm:mt-14">
        <div className="p-6 sm:p-8 rounded-3xl bg-aimer-50/70 border border-aimer-200/80 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs">
          <div className="space-y-1 text-center md:text-left">
            <div className="text-sm font-semibold text-aimer-800 font-poppins">
              Corporate Residency &amp; Placement Network
            </div>
            <div className="text-xs sm:text-sm text-charcoal-600 font-light">
              Are you an enterprise interested in onboarding high-agency management cohorts for residency sprints?
            </div>
          </div>
          <a
            href="mailto:partners@aimerbschool.com"
            className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white bg-aimer-700 hover:bg-aimer-800 rounded-full transition-colors whitespace-nowrap shadow-sm hover:shadow-md active:scale-95 duration-200"
          >
            Partner With AIMER &rarr;
          </a>
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
