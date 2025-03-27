
import { useQuery } from "@tanstack/react-query";
import { supabase, fetchWithFallback } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";
import { adaptHotelData } from "@/hooks/hotels/hotelAdapter";
import { HotelDetailProps } from "@/types/hotel";
import { useState, useEffect } from "react";

export interface RecommendationResult {
  hotel: HotelDetailProps;
  confidence: number;
}

export function useRecommendations() {
  const { user } = useAuth();
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  
  // Listen for online/offline status changes
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);
  
  return useQuery({
    queryKey: ['recommendations', user?.id, isOnline],
    queryFn: async (): Promise<RecommendationResult[]> => {
      if (!user || !isOnline) {
        return [];
      }
      
      try {
        // Set timeout to prevent hanging requests
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);
        
        const { data, error } = await supabase.functions.invoke('get-recommendations', {
          body: { user_id: user.id },
          signal: controller.signal
        });
        
        clearTimeout(timeoutId);
        
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
        return []; // Return empty array on any error
      }
    },
    enabled: !!user && isOnline,
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
    retry: isOnline ? 1 : 0, // Only retry once if online
    refetchOnReconnect: true, // Refetch when coming back online
  });
}
