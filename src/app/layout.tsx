import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import { Header, Footer } from '@/components/cosmos/Shell';
import { BrandCursor } from '@/components/cosmos/BrandCursor';
import './globals.css';

export const metadata: Metadata = {
  title: 'COSMOS Innovation Labs',
  icons: { icon: { url: '/favicon.png', type: 'image/png' } },
};

export const viewport: Viewport = { width: 'device-width', initialScale: 1 };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <a href="#main-content" className="skip-link">Skip to content</a>
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
        <BrandCursor />
      </body>
    </html>
  );
}
