import React, { ReactNode } from 'react';
import { usePerformanceMonitoring } from '@/hooks/usePerformanceMonitoring';
import { useErrorReporting } from '@/hooks/useErrorReporting';
import { useAnalytics } from '@/hooks/useAnalytics';

interface MonitoringProviderProps {
  children: ReactNode;
}

export function MonitoringProvider({ children }: MonitoringProviderProps) {
  // Initialize monitoring hooks
  usePerformanceMonitoring();
  useErrorReporting();
  useAnalytics();

  return <>{children}</>;
}