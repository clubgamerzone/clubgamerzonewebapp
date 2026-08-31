import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'ClubGamerZone | Software, AI & Interactive Products',
  description: 'ClubGamerZone designs and builds web, mobile, AI, cloud and interactive products for ambitious teams.',
  keywords: ['software development', 'AI integration', 'web development', 'mobile apps', 'game development', 'Barranquilla'],
  openGraph: {
    title: 'ClubGamerZone | Software, AI & Interactive Products',
    description: 'We turn ambitious ideas into working products.',
    type: 'website',
    images: [{ url: '/og.png', width: 1728, height: 910, alt: 'ClubGamerZone — Software, AI & Interactive Products' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ClubGamerZone | Software, AI & Interactive Products',
    description: 'We turn ambitious ideas into working products.',
    images: ['/og.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
