import { Metadata } from 'next';
import { UgbipClientPage } from '@/components/ugbip/UgbipClientPage';

export const metadata: Metadata = {
  title: 'Undergraduate Business Integrated Program (UGBIP) | AIMER Business School',
  description:
    'A 3-year enterprise-driven undergraduate degree featuring 75% practical learning, 2 corporate internships with paid monthly stipends, and international business immersion in Dubai.',
  alternates: {
    canonical: 'https://www.aimerbschool.com/programmes/ugbip',
  },
  openGraph: {
    title: 'Undergraduate Business Integrated Program (UGBIP) | AIMER Business School',
    description:
      '3-year enterprise-driven undergraduate degree featuring 75% practical learning, 2 corporate residencies with paid monthly stipends, and global business immersion in Dubai.',
    url: 'https://www.aimerbschool.com/programmes/ugbip',
    siteName: 'AIMER Business School',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Undergraduate Business Integrated Program (UGBIP) | AIMER Business School',
    description:
      '3-year enterprise-driven undergraduate degree featuring 75% practical learning and guaranteed corporate residencies.',
  },
};

export default function UgbipPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Course',
        '@id': 'https://www.aimerbschool.com/programmes/ugbip#course',
        name: 'Undergraduate Business Integrated Program (UGBIP)',
        description:
          'A 3-year enterprise-driven undergraduate degree featuring 75% practical learning, 2 corporate internships with paid monthly stipends, and international business immersion in Dubai.',
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
        timeToComplete: 'P3Y',
        educationalCredentialAwarded: 'Recognized Bachelor Degree + Global Industry Diploma',
        occupationalCredentialAwarded: '2 Paid Corporate Residencies',
        hasCourseInstance: {
          '@type': 'CourseInstance',
          courseMode: 'Blended (On-Campus & Corporate Residency)',
          location: 'Markaz Knowledge City, Calicut & Dubai',
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
            name: 'UGBIP',
            item: 'https://www.aimerbschool.com/programmes/ugbip',
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
      <UgbipClientPage />
    </>
  );
}

