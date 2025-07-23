
import { supabase } from "@/integrations/supabase/client";

/**
 * Fetches current hotel data including relationship fields for comparison
 */
export const fetchCurrentHotelData = async (hotelId: string) => {
  console.log("🔍 Fetching current hotel data for:", hotelId);
  
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
  
  console.log("📄 Raw hotel data:", currentHotel);
  console.log("📄 Raw hotel_themes:", currentHotel.hotel_themes);
  console.log("📄 Raw hotel_activities:", currentHotel.hotel_activities);
  
  // Extract theme and activity IDs for comparison
  const currentThemes = currentHotel.hotel_themes?.map(ht => ht.theme_id).filter(Boolean) || [];
  const currentActivities = currentHotel.hotel_activities?.map(ha => ha.activity_id).filter(Boolean) || [];
  
  console.log("🎯 Extracted current themes:", currentThemes);
  console.log("🎯 Extracted current activities:", currentActivities);
  
  // Add relationship fields to the hotel object for comparison
  const result = {
    ...currentHotel,
    themes: currentThemes,
    activities: currentActivities
  };
  
  console.log("✅ Final current hotel data with relationships:", result);
  
  return result;
};
