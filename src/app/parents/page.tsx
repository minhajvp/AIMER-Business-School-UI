import { Metadata } from 'next';
import { ParentsClientPage } from '@/components/parents/ParentsClientPage';
import { parentsContent } from '@/contents/parents';

export const metadata: Metadata = {
  title: parentsContent.meta.title,
  description: parentsContent.meta.description,
  alternates: {
    canonical: parentsContent.meta.canonical,
  },
  openGraph: {
    title: parentsContent.meta.title,
    description: parentsContent.meta.description,
    url: parentsContent.meta.canonical,
    siteName: 'AIMER Business School',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: parentsContent.meta.title,
    description: parentsContent.meta.description,
  },
};

export default function ParentsPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'EducationalOrganization',
        '@id': 'https://www.aimerbschool.com/#organization',
        name: 'AIMER Business School',
        url: 'https://www.aimerbschool.com',
        logo: 'https://www.aimerbschool.com/logo/aimer-logo.png',
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
          contactType: 'Parent Admissions Helpline',
          areaServed: 'IN',
          availableLanguage: ['en', 'ml'],
        },
      },
      {
        '@type': 'FAQPage',
        '@id': 'https://www.aimerbschool.com/parents/#faq',
        mainEntity: parentsContent.faqs.items.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer,
          },
        })),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ParentsClientPage />
    </>
  );
}

