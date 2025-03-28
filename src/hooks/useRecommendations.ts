
import { useQuery } from "@tanstack/react-query";
import { supabase, invokeFunctionWithFallback } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";
import { adaptHotelData } from "@/hooks/hotels/hotelAdapter";
import { HotelDetailProps } from "@/types/hotel";
import { useState, useEffect, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";

export interface RecommendationResult {
  hotel: HotelDetailProps;
  confidence: number;
}

// Fallback recommendations when offline
const FALLBACK_RECOMMENDATIONS: RecommendationResult[] = [
  {
    hotel: {
      id: "offline-rec-1",
      name: "Offline Beach Resort",
      description: "A beautiful beach resort (offline data)",
      stars: 4,
      price_per_month: 1500,
      country: "Mexico",
      city: "Cancun",
      images: ["/placeholder.svg"],
      mainImage: "/placeholder.svg",
      themes: ["Beach", "Luxury"],
      amenities: ["Pool", "Spa", "Restaurant"],
      available_months: ["January", "February", "March"]
    },
    confidence: 0.85
  },
  {
    hotel: {
      id: "offline-rec-2",
      name: "Offline Mountain Lodge",
      description: "A cozy mountain lodge (offline data)",
      stars: 5,
      price_per_month: 2200,
      country: "Switzerland",
      city: "Zermatt",
      images: ["/placeholder.svg"],
      mainImage: "/placeholder.svg",
      themes: ["Mountain", "Winter"],
      amenities: ["Fireplace", "Hot Tub", "Restaurant"],
      available_months: ["June", "July", "August"]
    },
    confidence: 0.92
  }
];

export function useRecommendations() {
  // Get network status
  const isOnline = window.appNetwork?.isOnline() ?? navigator.onLine;
  const [networkStatus, setNetworkStatus] = useState(isOnline);
  const { user } = useAuth();
  const { toast } = useToast();
  
  // Listen for network changes
  useEffect(() => {
    const handleNetworkChange = (event: Event | CustomEvent) => {
      const isNowOnline = (event as CustomEvent)?.detail?.online ?? navigator.onLine;
      setNetworkStatus(isNowOnline);
      
      // Only show toast if status changed
      if (isNowOnline !== networkStatus) {
        if (isNowOnline) {
          toast({
            title: "Connected",
            description: "Your network connection has been restored.",
            variant: "default"
          });
        } else {
          toast({
            title: "Offline",
            description: "You are currently offline. Using cached data.",
            variant: "destructive"
          });
        }
      }
    };
    
    // Listen for both standard events and our custom event
    window.addEventListener('online', handleNetworkChange);
    window.addEventListener('offline', handleNetworkChange);
    window.addEventListener('app:networkStateChanged', handleNetworkChange);
    
    return () => {
      window.removeEventListener('online', handleNetworkChange);
      window.removeEventListener('offline', handleNetworkChange);
      window.removeEventListener('app:networkStateChanged', handleNetworkChange);
    };
  }, [networkStatus, toast]);
  
  return useQuery({
    queryKey: ['recommendations', user?.id, networkStatus],
    queryFn: async (): Promise<RecommendationResult[]> => {
      if (!user) {
        console.log("No user found, returning empty recommendations");
        return [];
      }
      
      // If we're offline, return fallback data immediately
      if (!networkStatus) {
        console.log("Offline mode: using fallback recommendations");
        return FALLBACK_RECOMMENDATIONS;
      }
      
      try {
        console.log("Fetching recommendations for user:", user.id);
        
        // Use our helper that handles timeouts and fallbacks
        const data = await invokeFunctionWithFallback<{recommendations: any[]}>(
          'get-recommendations',
          { body: { user_id: user.id } },
          { recommendations: [] }
        );
        
        // Safety check for recommendations property
        if (!data || !data.recommendations) {
          console.warn("Invalid recommendations data structure:", data);
          return [];
        }
        
        // Transform and adapt the data
        console.log(`Received ${data.recommendations.length} recommendations`);
        return data.recommendations.map((recommendation: any) => ({
          hotel: adaptHotelData([recommendation])[0],
          confidence: recommendation.confidence || 0.5
        }));
      } catch (err) {
        console.error("Failed to fetch recommendations:", err);
        
        // Return fallback recommendations on error
        return FALLBACK_RECOMMENDATIONS.slice(0, 1); // Just return one as a fallback
      }
    },
    enabled: !!user, // Only run when we have a user
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes 
    retry: networkStatus ? 1 : 0, // Retry once if online, don't retry if offline
    retryDelay: 1000, // 1 second delay between retries
    refetchOnReconnect: false, // Manual control instead of automatic
    refetchOnMount: true
  });
}
