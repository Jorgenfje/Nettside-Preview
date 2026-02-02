import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Nettside-Preview | Se din nettside på 30 sekunder',
  description: 'Gratis forhåndsvisning av din bedrifts eller personlige nettside. AI-generert, profesjonelt design på under 30 sekunder.',
  keywords: ['nettside', 'preview', 'gratis', 'AI', 'webdesign', 'Norge'],
  authors: [{ name: 'Fjellstad Teknologi' }],
  openGraph: {
    title: 'Nettside-Preview - Se din nettside på 30 sekunder',
    description: 'Gratis AI-generert forhåndsvisning av din profesjonelle nettside',
    type: 'website',
  }
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
