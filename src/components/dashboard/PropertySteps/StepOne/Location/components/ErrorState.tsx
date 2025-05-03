
import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface ErrorStateProps {
  error: string;
}

export const ErrorState: React.FC<ErrorStateProps> = ({ error }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full p-4 text-center">
      <AlertTriangle className="h-12 w-12 text-red-500 mb-3" />
      <h3 className="text-lg font-semibold text-red-400 mb-2">Google Maps Error</h3>
      <p className="text-sm text-white/70">{error}</p>
      <p className="mt-3 text-xs text-white/50">
        Please check that your Google Maps API key is correctly configured with the appropriate domain restrictions.
      </p>
    </div>
  );
};
