import { Metadata } from 'next';
import { PgbipClientPage } from '@/components/pgbip/PgbipClientPage';

export const metadata: Metadata = {
  title: 'Postgraduate Business Integrated Program (PGBIP) | AIMER Business School',
  description:
    'A 2-year full-time executive postgraduate program featuring 75% experiential learning, two 6-month embedded corporate residencies, direct CXO mentorship, and ₹14.5 LPA peak package.',
  alternates: {
    canonical: 'https://www.aimerbschool.com/programmes/pgbip',
  },
  openGraph: {
    title: 'Postgraduate Business Integrated Program (PGBIP) | AIMER Business School',
    description:
      'A 2-year full-time executive postgraduate program featuring 75% experiential learning, two 6-month corporate residencies, direct CXO mentorship, and ₹14.5 LPA peak package.',
    url: 'https://www.aimerbschool.com/programmes/pgbip',
    siteName: 'AIMER Business School',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Postgraduate Business Integrated Program (PGBIP) | AIMER Business School',
    description:
      '2-year flagship postgraduate business integrated program featuring two full 6-month corporate internships and C-suite mentorship.',
  },
};

export default function PgbipPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Course',
        '@id': 'https://www.aimerbschool.com/programmes/pgbip#course',
        name: 'Postgraduate Business Integrated Program (PGBIP)',
        description:
          'A 2-year full-time executive postgraduate program featuring 75% experiential learning, two 6-month corporate residencies, direct CXO mentorship, and ₹14.5 LPA peak package.',
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
        educationalCredentialAwarded: 'Postgraduate Business Integrated Program Credential',
        occupationalCredentialAwarded: '2 Paid Corporate Residencies (12 Months Total)',
        hasCourseInstance: {
          '@type': 'CourseInstance',
          courseMode: 'Blended (On-Campus & Corporate Residency)',
          location: 'Markaz Knowledge City, Calicut & Dubai DIFC',
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
            name: 'PGBIP',
            item: 'https://www.aimerbschool.com/programmes/pgbip',
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
      <PgbipClientPage />
    </>
  );
}

