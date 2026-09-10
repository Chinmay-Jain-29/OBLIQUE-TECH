// =============================================================================
// OBLIQUETECH — ANONYMOUS SESSION TELEMETRY & ANALYTICS
// Privacy-first, zero-PII session engagement tracking (Section 32, 33, 34, 35)
// =============================================================================

export interface AnonymousSession {
  sessionId: string;
  entryPage: string;
  referrer: string;
  deviceType: 'Desktop' | 'Mobile' | 'Tablet';
  startTime: number;
  lastActiveTime: number;
  pagesVisited: string[];
  articlesRead: string[];
  ctaClicks: { label: string; path: string; timestamp: number }[];
}

const SESSION_KEY = 'oblique_anon_session';

function getDeviceType(): 'Desktop' | 'Mobile' | 'Tablet' {
  if (typeof window === 'undefined') return 'Desktop';
  const ua = navigator.userAgent;
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    return 'Tablet';
  }
  if (/Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
    return 'Mobile';
  }
  return 'Desktop';
}

export function initAnonymousSession(): AnonymousSession {
  if (typeof window === 'undefined') {
    return {
      sessionId: 'server',
      entryPage: '/',
      referrer: '',
      deviceType: 'Desktop',
      startTime: Date.now(),
      lastActiveTime: Date.now(),
      pagesVisited: [],
      articlesRead: [],
      ctaClicks: []
    };
  }

  try {
    const existing = sessionStorage.getItem(SESSION_KEY);
    if (existing) {
      const parsed: AnonymousSession = JSON.parse(existing);
      parsed.lastActiveTime = Date.now();
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(parsed));
      return parsed;
    }
  } catch (e) {
    // Ignore storage issues
  }

  const newSession: AnonymousSession = {
    sessionId: `sess-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
    entryPage: window.location.pathname,
    referrer: document.referrer || '',
    deviceType: getDeviceType(),
    startTime: Date.now(),
    lastActiveTime: Date.now(),
    pagesVisited: [window.location.pathname],
    articlesRead: [],
    ctaClicks: []
  };

  try {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(newSession));
  } catch (e) {
    // Ignore
  }

  return newSession;
}

export function trackPageView(pathname: string) {
  if (typeof window === 'undefined') return;
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    if (!raw) {
      initAnonymousSession();
      return;
    }
    const session: AnonymousSession = JSON.parse(raw);
    session.lastActiveTime = Date.now();
    if (!session.pagesVisited.includes(pathname)) {
      session.pagesVisited.push(pathname);
    }
    if (pathname.startsWith('/insights/') && pathname !== '/insights/' && pathname !== '/insights/write') {
      const slug = pathname.replace('/insights/', '');
      if (!session.articlesRead.includes(slug)) {
        session.articlesRead.push(slug);
      }
    }
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
  } catch (e) {
    // Ignore
  }
}

export function trackCtaClick(label: string, path: string) {
  if (typeof window === 'undefined') return;
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    if (!raw) return;
    const session: AnonymousSession = JSON.parse(raw);
    session.ctaClicks.push({ label, path, timestamp: Date.now() });
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
  } catch (e) {
    // Ignore
  }
}
