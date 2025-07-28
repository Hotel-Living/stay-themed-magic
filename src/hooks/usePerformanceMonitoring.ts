import { useEffect, useCallback } from 'react';

interface WebVitalsMetric {
  name: string;
  value: number;
  id: string;
  navigationType: string;
}

interface PerformanceData {
  CLS: number | null;
  FCP: number | null;
  FID: number | null;
  LCP: number | null;
  TTFB: number | null;
}

export function usePerformanceMonitoring() {
  const metrics: PerformanceData = {
    CLS: null,
    FCP: null,
    FID: null,
    LCP: null,
    TTFB: null
  };

  const reportMetric = useCallback((metric: WebVitalsMetric) => {
    // Store metric (could be sent to analytics service in production)
    console.log(`[Performance] ${metric.name}:`, metric.value);
    
    // Update local metrics
    if (metric.name in metrics) {
      (metrics as any)[metric.name] = metric.value;
    }
    
    // Optional: Send to analytics service
    // This would be configured based on project needs
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'web_vitals', {
        event_category: 'Performance',
        event_label: metric.name,
        value: Math.round(metric.value),
        custom_map: { metric_value: 'value' }
      });
    }
  }, []);

  const observeWebVitals = useCallback(() => {
    if (typeof window === 'undefined') return;

    // Observe Core Web Vitals using Performance Observer API
    try {
      // LCP (Largest Contentful Paint)
      const lcpObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const lastEntry = entries[entries.length - 1] as any;
        if (lastEntry) {
          reportMetric({
            name: 'LCP',
            value: lastEntry.startTime,
            id: 'lcp-' + Date.now(),
            navigationType: 'navigate'
          });
        }
      });
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

      // FCP (First Contentful Paint)
      const fcpObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        entries.forEach((entry: any) => {
          if (entry.name === 'first-contentful-paint') {
            reportMetric({
              name: 'FCP',
              value: entry.startTime,
              id: 'fcp-' + Date.now(),
              navigationType: 'navigate'
            });
          }
        });
      });
      fcpObserver.observe({ entryTypes: ['paint'] });

      // CLS (Cumulative Layout Shift)
      let clsValue = 0;
      const clsObserver = new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries() as any[]) {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        }
        reportMetric({
          name: 'CLS',
          value: clsValue,
          id: 'cls-' + Date.now(),
          navigationType: 'navigate'
        });
      });
      clsObserver.observe({ entryTypes: ['layout-shift'] });

      // FID (First Input Delay)
      const fidObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        entries.forEach((entry: any) => {
          reportMetric({
            name: 'FID',
            value: entry.processingStart - entry.startTime,
            id: 'fid-' + Date.now(),
            navigationType: 'navigate'
          });
        });
      });
      fidObserver.observe({ entryTypes: ['first-input'] });

      // TTFB (Time to First Byte)
      const navigationEntries = performance.getEntriesByType('navigation') as any[];
      if (navigationEntries.length > 0) {
        const navEntry = navigationEntries[0];
        const ttfb = navEntry.responseStart - navEntry.requestStart;
        reportMetric({
          name: 'TTFB',
          value: ttfb,
          id: 'ttfb-' + Date.now(),
          navigationType: navEntry.type
        });
      }

    } catch (error) {
      console.warn('[Performance] Web Vitals observation failed:', error);
    }
  }, [reportMetric]);

  useEffect(() => {
    // Start monitoring when component mounts
    observeWebVitals();
  }, [observeWebVitals]);

  return {
    metrics,
    reportMetric
  };
}