
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
      category: 4,
      price_per_month: 1500,
      country: "Mexico",
      city: "Cancun",
      hotel_images: [{ 
        id: "img-1", 
        hotel_id: "offline-rec-1", 
        image_url: "/placeholder.svg", 
        is_main: true, 
        created_at: new Date().toISOString() 
      }],
      main_image_url: "/placeholder.svg",
      hotel_themes: [
        { theme_id: "theme-1", themes: { id: "1", name: "Beach" } },
        { theme_id: "theme-2", themes: { id: "2", name: "Luxury" } }
      ],
      amenities: ["Pool", "Spa", "Restaurant"],
      available_months: ["January", "February", "March"],
      average_rating: 4
    },
    confidence: 0.85
  },
  {
    hotel: {
      id: "offline-rec-2",
      name: "Offline Mountain Lodge",
      description: "A cozy mountain lodge (offline data)",
      category: 5,
      price_per_month: 2200,
      country: "Switzerland",
      city: "Zermatt",
      hotel_images: [{ 
        id: "img-2", 
        hotel_id: "offline-rec-2", 
        image_url: "/placeholder.svg", 
        is_main: true, 
        created_at: new Date().toISOString() 
      }],
      main_image_url: "/placeholder.svg",
      hotel_themes: [
        { theme_id: "theme-3", themes: { id: "3", name: "Mountain" } },
        { theme_id: "theme-4", themes: { id: "4", name: "Winter" } }
      ],
      amenities: ["Fireplace", "Hot Tub", "Restaurant"],
      available_months: ["June", "July", "August"],
      average_rating: 5
    },
    confidence: 0.92
  }
];

export function useRecommendations() {
  // Get network status in a way that works safely in any browser environment
  const [networkStatus, setNetworkStatus] = useState(typeof navigator !== 'undefined' && navigator.onLine);
  const { user } = useAuth() || { user: null };
  const { toast } = useToast();
  
  // Listen for network changes with a robust approach
  useEffect(() => {
    const handleNetworkChange = () => {
      const isNowOnline = typeof navigator !== 'undefined' && navigator.onLine;
      
      // Only update if status changed
      if (networkStatus !== isNowOnline) {
        setNetworkStatus(isNowOnline);
        
        // Show toast on status change
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
    
    // Initialize on mount
    handleNetworkChange();
    
    // Set up event listeners
    window.addEventListener('online', handleNetworkChange);
    window.addEventListener('offline', handleNetworkChange);
    
    return () => {
      window.removeEventListener('online', handleNetworkChange);
      window.removeEventListener('offline', handleNetworkChange);
    };
  }, [networkStatus, toast]);
  
  return useQuery({
    queryKey: ['recommendations', user?.id, networkStatus],
    queryFn: async (): Promise<RecommendationResult[]> => {
      // Safety check for user
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
