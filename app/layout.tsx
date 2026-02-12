import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'AI Nettside-Generator | Gratis Forhåndsvisning på 1 Minutt',
  description: 'Generer profesjonelle nettsider med AI på under 1 minutt. Gratis forhåndsvisning uten forpliktelser. Moderne design tilpasset din bransje.',
  keywords: [
  'AI nettside generator Norge',
  'gratis nettside forhåndsvisning',
  'AI webdesign norsk',
  'nettside generator',
  'automatisk nettside AI',
  'AI website builder Norge',
],
  authors: [{ name: 'Fjellstad Teknologi' }],
  openGraph: {
    title: 'AI Nettside-Generator | Gratis Forhåndsvisning',
    description: 'Få din profesjonelle nettside generert med AI på under 1 minutt. Helt gratis, ingen forpliktelser.',
    type: 'website',
    url: 'https://sedinside.no',
    images: [
      {
        url: 'https://sedinside.no/preview-image.png',
        width: 1200,
        height: 630,
        alt: 'AI Nettside-Generator Preview',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Nettside-Generator | Gratis Forhåndsvisning',
    description: 'Generer profesjonelle nettsider med AI på under 1 minutt.',
    images: ['https://sedinside.no/preview-image.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="no">
      <body className={inter.className}>{children}</body>
    </html>
  );
}