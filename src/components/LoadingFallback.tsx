
import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingFallbackProps {
  message?: string;
}

export const LoadingFallback: React.FC<LoadingFallbackProps> = ({ 
  message = "Loading Hotel Life..." 
}) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <Loader2 className="h-12 w-12 text-fuchsia-500 animate-spin mb-4" />
      <p className="text-foreground text-lg">{message}</p>
    </div>
  );
};
