
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { HotelDetailProps } from "@/types/hotel";

const fetchHotelDetail = async (id: string | undefined): Promise<HotelDetailProps | null> => {
  if (!id) return null;
  
  try {
    const { data, error } = await supabase
      .from("hotels")
      .select(`
        *,
        hotel_images(*),
        hotel_themes!hotel_id(
          theme_id,
          themes(*)
        ),
        hotel_activities!hotel_id(
          activity_id,
          activities(*)
        )
      `)
      .eq("id", id)
      .single();
      
    if (error) throw error;
    
    // Extract amenities from features objects
    const hotelFeatures = data.features_hotel 
      ? Object.entries(data.features_hotel)
          .filter(([_, isSelected]) => isSelected)
          .map(([feature]) => feature)
      : [];
      
    const roomFeatures = data.features_room
      ? Object.entries(data.features_room)
          .filter(([_, isSelected]) => isSelected)
          .map(([feature]) => feature)
      : [];
    
    // Extract activities
    const activities = data.hotel_activities
      ? data.hotel_activities.map(item => item.activities?.name).filter(Boolean)
      : [];
    
    return {
      ...data,
      hotelFeatures,
      roomFeatures,
      activities,
    };
  } catch (error) {
    console.error("Error fetching hotel details:", error);
    throw error;
  }
};

export function useHotelDetail(id: string | undefined) {
  return useQuery({
    queryKey: ["hotel", id],
    queryFn: () => fetchHotelDetail(id),
    enabled: !!id,
  });
}
