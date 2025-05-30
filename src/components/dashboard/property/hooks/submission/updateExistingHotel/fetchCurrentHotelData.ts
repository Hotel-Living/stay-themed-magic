
import { supabase } from "@/integrations/supabase/client";

/**
 * Fetches current hotel data including relationship fields for comparison
 */
export const fetchCurrentHotelData = async (hotelId: string) => {
  const { data: currentHotel, error: fetchError } = await supabase
    .from('hotels')
    .select(`
      *,
      hotel_themes (theme_id),
      hotel_activities (activity_id)
    `)
    .eq('id', hotelId)
    .single();
  
  if (fetchError) {
    console.error("Error fetching current hotel data:", fetchError);
    throw fetchError;
  }
  
  // Extract theme and activity IDs for comparison
  const currentThemes = currentHotel.hotel_themes?.map(ht => ht.theme_id) || [];
  const currentActivities = currentHotel.hotel_activities?.map(ha => ha.activity_id) || [];
  
  // Add relationship fields to the hotel object for comparison
  return {
    ...currentHotel,
    themes: currentThemes,
    activities: currentActivities
  };
};
