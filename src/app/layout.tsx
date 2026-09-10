import type { Metadata, Viewport } from 'next';
import './globals.css';
import { ThemeProvider } from '@/context/ThemeContext';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { WhatsAppButton } from '@/components/ui/WhatsAppButton';
import { ObliqueAIChatbot } from '@/components/ai/ObliqueAIChatbot';

export const metadata: Metadata = {
  metadataBase: new URL('https://obliquetech.com'),
  title: {
    default: 'ObliqueTech — See Business Differently | Custom Software, AI & Engineering',
    template: '%s | ObliqueTech'
  },
  description: 'Different perspective. Better technology. Practical technology solutions for businesses ready to move forward. Web Development, AI/ML, UI/UX, and IT Consulting.',
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
    description: 'We build practical digital solutions that help businesses grow, adapt, and compete in a changing market.',
    siteName: 'ObliqueTech',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ObliqueTech — See Business Differently',
    description: 'Practical technology solutions for businesses ready to move forward.',
    creator: '@obliquetech'
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
};

import { SiteIntro } from '@/components/ui/SiteIntro';
import { AuthProvider } from '@/lib/authContext';
import { AuthModal } from '@/components/auth/AuthModal';

export const viewport: Viewport = {
  themeColor: '#08090B',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" style={{ colorScheme: 'dark' }} suppressHydrationWarning>
      <head>
        <script
          id="oblique-intro-init"
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var seen = sessionStorage.getItem('oblique_intro_seen');
                var prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
                if (!seen && !prefersReduced) {
                  document.documentElement.classList.add('oblique-intro-active');
                }
              } catch(e) {}
            `,
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col antialiased bg-[#08090B] text-[#F8FAFC] selection:bg-[#D4AF5A] selection:text-[#08090B]">
        <ThemeProvider>
          <AuthProvider>
            <SiteIntro />
            <div id="site-main-content" className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-1">
                {children}
              </main>
              <Footer />
            </div>
            <div className="floating-controls">
              <WhatsAppButton />
              <ObliqueAIChatbot />
            </div>
            <AuthModal />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
