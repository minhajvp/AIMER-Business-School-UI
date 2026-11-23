import { Metadata } from 'next';
import { HsbipClientPage } from '@/components/hsbip/HsbipClientPage';

export const metadata: Metadata = {
  title: 'Higher Secondary Business Integrated Program (HSBIP) | AIMER Business School',
  description:
    'A 2-year residential program for Plus One & Plus Two Commerce students combining SCOLE Kerala academics with hands-on startup incubation, CXO mentorship, and campus immersion at Markaz Knowledge City.',
  alternates: {
    canonical: 'https://www.aimerbschool.com/programmes/hsbip',
  },
  openGraph: {
    title: 'Higher Secondary Business Integrated Program (HSBIP) | AIMER Business School',
    description:
      '2-year residential commerce program for Plus One & Plus Two students combining SCOLE Kerala academics with real startup incubation at Markaz Knowledge City.',
    url: 'https://www.aimerbschool.com/programmes/hsbip',
    siteName: 'AIMER Business School',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Higher Secondary Business Integrated Program (HSBIP) | AIMER Business School',
    description:
      'A 2-year residential commerce program combining Kerala State Board academics with Junior Venture Studio startup incubation.',
  },
};

export default function HsbipPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Course',
        '@id': 'https://www.aimerbschool.com/programmes/hsbip#course',
        name: 'Higher Secondary Business Integrated Program (HSBIP)',
        description:
          'A 2-year residential program for Plus One & Plus Two Commerce students combining SCOLE Kerala academics with hands-on business incubation and leadership mastery.',
        provider: {
          '@type': 'EducationalOrganization',
          name: 'AIMER Business School',
          url: 'https://www.aimerbschool.com',
          address: {
            '@type': 'PostalAddress',
            streetAddress: 'Markaz Knowledge City',
            addressLocality: 'Calicut',
            addressRegion: 'Kerala',
            postalCode: '673580',
            addressCountry: 'IN',
          },
        },
        timeToComplete: 'P2Y',
        educationalCredentialAwarded: 'Plus Two Commerce (SCOLE Kerala) + AIMER Venture Studio Certification',
        hasCourseInstance: {
          '@type': 'CourseInstance',
          courseMode: 'Full-Time Residential On-Campus',
          location: 'Markaz Knowledge City, Calicut',
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://www.aimerbschool.com',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Programmes',
            item: 'https://www.aimerbschool.com/#programmes',
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'HSBIP',
            item: 'https://www.aimerbschool.com/programmes/hsbip',
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HsbipClientPage />
    </>
  );
}

