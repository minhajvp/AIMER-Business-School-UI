import { Metadata } from 'next';
import { AboutClientPage } from '@/components/about/AboutClientPage';
import { aboutContent } from '@/contents/about';

export const metadata: Metadata = {
  title: aboutContent.meta.title,
  description: aboutContent.meta.description,
  alternates: {
    canonical: aboutContent.meta.canonical,
  },
  openGraph: {
    title: aboutContent.meta.title,
    description: aboutContent.meta.description,
    url: aboutContent.meta.canonical,
    siteName: 'AIMER Business School',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: aboutContent.meta.title,
    description: aboutContent.meta.description,
  },
};

export default function AboutPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: 'AIMER Business School',
    alternateName: 'AIMER B-School',
    url: 'https://www.aimerbschool.com',
    logo: 'https://www.aimerbschool.com/logo/aimer-logo.png',
    description:
      'Practice-led business school at Markaz Knowledge City, Calicut, delivering 75% experiential learning, embedded corporate residencies, and international business mobility.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Markaz Knowledge City',
      addressLocality: 'Calicut',
      addressRegion: 'Kerala',
      postalCode: '673580',
      addressCountry: 'IN',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+917450030600',
      contactType: 'Admissions',
      areaServed: 'IN',
      availableLanguage: ['en', 'ml'],
    },
    founder: {
      '@type': 'Person',
      name: 'Mohamed Dilshad C',
      jobTitle: 'Founder & CEO',
      worksFor: {
        '@type': 'EducationalOrganization',
        name: 'AIMER Business School',
      },
    },
    member: [
      {
        '@type': 'Person',
        name: 'Dr. Abdul Hakim Azhari',
        jobTitle: 'Managing Director, Markaz Knowledge City',
      },
      {
        '@type': 'Person',
        name: 'Dr. Abdussalam',
        jobTitle: 'CEO, Markaz Knowledge City',
      },
      {
        '@type': 'Person',
        name: 'Ameen Ahsan',
        jobTitle: 'Managing Director, Ameen Ahsan Strategy Consulting',
      },
      {
        '@type': 'Person',
        name: 'Dr. P. R. Swaminathan',
        jobTitle: 'Director of Education, AIMER Business School',
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AboutClientPage />
    </>
  );
}

