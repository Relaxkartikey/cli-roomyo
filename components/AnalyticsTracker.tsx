'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { trackPageView } from '@/lib/analytics';

/**
 * Component for tracking page views automatically.
 * Just place this once in your root layout.
 */
export default function AnalyticsTracker() {
  const pathname = usePathname();

  useEffect(() => {
    // Track page view when the path changes
    if (pathname) {
      trackPageView(pathname);
    }
  }, [pathname]);

  // This component doesn't render anything
  return null;
} 