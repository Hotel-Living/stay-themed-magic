
import React from 'react';
import { WifiOff } from 'lucide-react';
import { useNetworkStatus } from '@/hooks/useNetworkStatus';

export const OfflineBanner: React.FC = () => {
  const isOnline = useNetworkStatus();
  
  if (isOnline) return null;
  
  return (
    <div className="sticky top-16 z-50 w-full bg-amber-900/70 backdrop-blur text-amber-100 py-2 px-4">
      <div className="container max-w-6xl mx-auto flex items-center">
        <WifiOff className="h-4 w-4 mr-2 flex-shrink-0" />
        <p className="text-sm">
          You're currently in offline mode. Some features may be limited.
        </p>
      </div>
    </div>
  );
};
