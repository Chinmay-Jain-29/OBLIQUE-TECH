import type { Metadata, Viewport } from 'next';
import './globals.css';
import { ThemeProvider } from '@/context/ThemeContext';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CustomCursor } from '@/components/ui/CustomCursor';
import { WhatsAppButton } from '@/components/ui/WhatsAppButton';
import { ObliqueAIChatbot } from '@/components/ai/ObliqueAIChatbot';

export const metadata: Metadata = {
  metadataBase: new URL('https://obliquetech.com'),
  title: {
    default: 'ObliqueTech — See Business Differently | Custom Software, AI & Engineering',
    template: '%s | ObliqueTech'
  },
  description: 'Technology solutions designed around your goals, built for the future, and delivered with clarity, quality, and commitment. Software, AI/ML, Web, Mobile, and IT Consulting.',
  keywords: [
    'software development company',
    'web development company',
    'AI development company',
    'AI solutions',
    'IT consulting',
    'UI UX design',
    'mobile app development',
    'digital transformation',
    'custom software development',
    'startup technology partner'
  ],
  authors: [{ name: 'ObliqueTech' }],
  creator: 'ObliqueTech',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://obliquetech.com',
    title: 'ObliqueTech — See Business Differently',
    description: 'We design, engineer, and scale digital solutions that help businesses adapt to a technology-first world.',
    siteName: 'ObliqueTech',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ObliqueTech — See Business Differently',
    description: 'Technology solutions designed around your goals, built for the future.',
    creator: '@obliquetech'
  },
  robots: {
    index: true,
    follow: true,
  }
};

export const viewport: Viewport = {
  themeColor: '#07080b',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col bg-slate-950 text-slate-100 antialiased selection:bg-cyan-400 selection:text-slate-950">
        <ThemeProvider>
          <CustomCursor />
          <Navbar />
          <main className="flex-1 pt-20">
            {children}
          </main>
          <Footer />
          <WhatsAppButton />
          <ObliqueAIChatbot />
        </ThemeProvider>
      </body>
    </html>
  );
}
