
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";
import { adaptHotelData } from "@/hooks/hotels/hotelAdapter";
import { HotelDetailProps } from "@/types/hotel";

export interface RecommendationResult {
  hotel: HotelDetailProps;
  confidence: number;
}

export function useRecommendations() {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ['recommendations', user?.id],
    queryFn: async (): Promise<RecommendationResult[]> => {
      if (!user) {
        return [];
      }
      
      const { data, error } = await supabase.functions.invoke('get-recommendations', {
        body: { user_id: user.id }
      });
      
      if (error) {
        console.error("Error fetching recommendations:", error);
        throw error;
      }
      
      // Transform and adapt the data
      const recommendations = data.recommendations || [];
      return recommendations.map((recommendation: any) => ({
        hotel: adaptHotelData([recommendation])[0],
        confidence: recommendation.confidence
      }));
    },
    enabled: !!user,
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
  });
}
