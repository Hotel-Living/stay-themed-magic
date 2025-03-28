
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

export function useNetworkStatus() {
  // Initialize with the current network status if available, or assume online
  const [isOnline, setIsOnline] = useState(
    typeof navigator !== 'undefined' ? navigator.onLine : true
  );
  const { toast } = useToast();

  useEffect(() => {
    // Function to handle online status changes
    const handleOnline = () => {
      setIsOnline(true);
      toast({
        title: "Connected",
        description: "Your network connection has been restored.",
        variant: "default"
      });
    };

    // Function to handle offline status changes
    const handleOffline = () => {
      setIsOnline(false);
      toast({
        title: "Offline Mode",
        description: "You're currently viewing in offline mode. Some features may be limited.",
        variant: "destructive"
      });
    };

    // Add event listeners
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Clean up on unmount
    return () => {
      window.addEventListener('online', handleOnline);
      window.addEventListener('offline', handleOffline);
    };
  }, [toast]);

  return isOnline;
}
