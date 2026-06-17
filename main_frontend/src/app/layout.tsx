import type { Metadata } from 'next';
import './globals.css';
import { cormorant, inter } from '@/lib/fonts';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { StickyCta } from '@/components/layout/sticky-cta';
import { ComingSoonProvider } from '@/components/coming-soon/coming-soon-provider';

export const metadata: Metadata = {
  title: 'Crafted Sprays | Discover The Fragrance That Suits You',
  description: 'Discover a fragrance crafted around who you are, not what everyone else is wearing.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <body className="grain-overlay">
        <ComingSoonProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <StickyCta />
        </ComingSoonProvider>
      </body>
    </html>
  );
}
