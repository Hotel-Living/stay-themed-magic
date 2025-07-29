
import { supabase } from "@/integrations/supabase/client";

/**
 * Updates the hotel table with pending changes
 */
export const updateHotelTable = async (hotelId: string, hotelTableChanges: Record<string, any>) => {
  if (Object.keys(hotelTableChanges).length > 0) {
    const { error } = await supabase
      .from('hotels')
      .update({
        pending_changes: hotelTableChanges,
        status: 'pending'
      })
      .eq('id', hotelId);
    
    if (error) {
      console.error("Error updating hotel with pending changes:", error);
      throw error;
    }
  }
};
