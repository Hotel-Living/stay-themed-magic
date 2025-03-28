
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";
import { adaptHotelData } from "@/hooks/hotels/hotelAdapter";
import { HotelDetailProps } from "@/types/hotel";
import { useState, useEffect, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";

export interface RecommendationResult {
  hotel: HotelDetailProps;
  confidence: number;
}

export function useRecommendations() {
  const { user } = useAuth();
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const { toast } = useToast();
  
  // Function to handle reconnection
  const handleReconnection = useCallback(() => {
    if (!isOnline && navigator.onLine) {
      setIsOnline(true);
      toast({
        title: "Connected",
        description: "Your network connection has been restored.",
        variant: "default"
      });
    }
  }, [isOnline, toast]);
  
  // Listen for online/offline status changes
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      handleReconnection();
    };
    
    const handleOffline = () => {
      setIsOnline(false);
      toast({
        title: "Offline",
        description: "You are currently offline. Some features may be limited.",
        variant: "destructive"
      });
    };
    
    const handleNetworkReconnect = () => {
      handleReconnection();
    };
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    window.addEventListener('app:networkReconnected', handleNetworkReconnect);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('app:networkReconnected', handleNetworkReconnect);
    };
  }, [handleReconnection, toast]);
  
  return useQuery({
    queryKey: ['recommendations', user?.id, isOnline],
    queryFn: async (): Promise<RecommendationResult[]> => {
      if (!user || !isOnline) {
        return [];
      }
      
      try {
        // Set timeout for the function call
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 8000);
        
        // Call the function without passing the signal to the invoke options
        // since it's not supported in FunctionInvokeOptions type
        const { data, error } = await supabase.functions.invoke('get-recommendations', {
          body: { user_id: user.id }
        });
        
        clearTimeout(timeoutId);
        
        if (controller.signal.aborted) {
          console.warn("Recommendations request timed out");
          return [];
        }
        
        if (error) {
          console.error("Error fetching recommendations:", error);
          return [];  // Return empty array instead of throwing
        }
        
        // Transform and adapt the data
        const recommendations = data?.recommendations || [];
        return recommendations.map((recommendation: any) => ({
          hotel: adaptHotelData([recommendation])[0],
          confidence: recommendation.confidence
        }));
      } catch (err) {
        console.error("Failed to fetch recommendations:", err);
        
        // If we have an abort error, it means the request timed out
        if (err instanceof DOMException && err.name === 'AbortError') {
          console.warn("Recommendations request timed out");
        }
        
        return []; // Return empty array on any error
      }
    },
    enabled: !!user && isOnline,
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
    retry: isOnline ? 3 : 0, // Retry more times if online
    retryDelay: attempt => Math.min(1000 * 2 ** attempt, 30000), // Exponential backoff
    refetchOnReconnect: true, // Refetch when coming back online
    refetchOnMount: true
  });
}
