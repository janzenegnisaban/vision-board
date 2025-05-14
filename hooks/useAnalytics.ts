import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

interface AnalyticsEvent {
  type: 'page_view' | 'click' | 'interaction';
  path: string;
  timestamp: number;
  data?: Record<string, any>;
}

export function useAnalytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Track page views
    const trackPageView = async () => {
      const event: AnalyticsEvent = {
        type: 'page_view',
        path: pathname + searchParams.toString(),
        timestamp: Date.now(),
      };

      try {
        await fetch('/api/analytics', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(event),
        });
      } catch (error) {
        console.error('Error tracking page view:', error);
      }
    };

    trackPageView();
  }, [pathname, searchParams]);

  const trackEvent = async (type: 'click' | 'interaction', data?: Record<string, any>) => {
    const event: AnalyticsEvent = {
      type,
      path: pathname + searchParams.toString(),
      timestamp: Date.now(),
      data,
    };

    try {
      await fetch('/api/analytics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(event),
      });
    } catch (error) {
      console.error('Error tracking event:', error);
    }
  };

  return { trackEvent };
} 