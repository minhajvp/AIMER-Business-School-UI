import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AIMER Business School | Premium Practice-Led Business Education',
  description: 'India’s pioneering experiential business school located at Markaz Knowledge City. Featuring 75% practicum, 12 months embedded corporate residencies, and guaranteed global immersion in Dubai & Singapore.',
  keywords: [
    'AIMER Business School',
    'Best Business School in South India',
    'UGBIP',
    'PGBIP',
    'HSBIP',
    'Markaz Knowledge City',
    'Experiential Business Education',
    'Corporate Residency',
    'Global Immersion',
    'NAAT 2026',
  ],
  authors: [{ name: 'AIMER Business School' }],
  openGraph: {
    title: 'AIMER Business School | Learn Business By Doing Business',
    description: 'Transformative business education with 75% practicum, 12M paid corporate residency, and international mobility.',
    url: 'https://www.aimerbschool.com',
    siteName: 'AIMER Business School',
    locale: 'en_IN',
    type: 'website',
  },
  icons: {
    icon: [
      { url: '/icon.png', type: 'image/png' },
      { url: '/favicon.ico' },
    ],
    shortcut: '/icon.png',
    apple: '/icon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap"
        />
      </head>
      <body className="min-h-screen bg-white text-charcoal-900 font-poppins selection:bg-aimer-500 selection:text-white antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
