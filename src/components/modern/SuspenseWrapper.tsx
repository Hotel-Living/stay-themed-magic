import React, { Suspense, ReactNode } from 'react';
import { ErrorBoundary } from './ErrorBoundary';

interface SuspenseWrapperProps {
  children: ReactNode;
  fallback?: ReactNode;
  errorFallback?: ReactNode;
  identifier?: string;
}

export const SuspenseWrapper: React.FC<SuspenseWrapperProps> = ({
  children,
  fallback = <div className="animate-pulse bg-purple-800/30 rounded-lg h-64 w-full" />,
  errorFallback,
  identifier = 'component'
}) => {
  return (
    <ErrorBoundary fallback={errorFallback} identifier={identifier}>
      <Suspense fallback={fallback}>
        {children}
      </Suspense>
    </ErrorBoundary>
  );
};