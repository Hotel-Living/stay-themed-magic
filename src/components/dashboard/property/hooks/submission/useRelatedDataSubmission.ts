import { supabase } from "@/integrations/supabase/client";
import { format, parse } from "date-fns";
import { handleSupabaseError } from "@/utils/errorHandling";

export const useRelatedDataSubmission = () => {
  const handleThemesAndActivities = async (hotelId: string, themes: string[], activities: string[]) => {
    console.log("Handling themes and activities for hotel:", hotelId, { themes, activities });
    
    if (themes && themes.length > 0) {
      try {
        // Create theme records - ensure each theme ID is properly processed
        const themeRows = themes
          .filter(themeId => themeId && typeof themeId === 'string') // Filter out invalid IDs
          .map(themeId => ({
            hotel_id: hotelId,
            theme_id: themeId
          }));
        
        if (themeRows.length > 0) {
          console.log("Attempting to insert theme rows:", themeRows);
          
          const { data, error } = await supabase
            .from('hotel_themes')
            .insert(themeRows)
            .select();
            
          if (error) {
            console.error("Error inserting themes:", error);
            console.error("Theme rows that failed:", themeRows);
            // Log the error but don't throw to prevent blocking hotel creation
            console.warn("Theme insertion failed but hotel creation will continue");
          } else {
            console.log("Successfully inserted themes:", data?.length || 0);
          }
        } else {
          console.warn("No valid theme IDs to insert");
        }
      } catch (error) {
        console.error("Error in theme processing:", error);
        // Continue execution - don't throw error to parent function
      }
    }

    if (activities && activities.length > 0) {
      try {
        // Activities are now directly provided as IDs, no need to fetch or create
        // Simply insert them into the hotel_activities table
        const activityRows = activities.map(activityId => ({
          hotel_id: hotelId,
          activity_id: activityId
        }));
        
        if (activityRows.length > 0) {
          const { data, error } = await supabase
            .from('hotel_activities')
            .insert(activityRows)
            .select();
            
          if (error) {
            console.error("Error inserting activities:", error);
            // Log the error but don't throw to prevent blocking hotel creation
            console.warn("Activity insertion failed but hotel creation will continue");
          } else {
            console.log("Successfully inserted activities:", data?.length || 0, activityRows);
          }
        }
      } catch (error) {
        console.error("Error in activity processing:", error);
        // Continue execution - don't throw error to parent function
      }
    }
  };

  const handleAvailability = async (hotelId: string, availableMonths: string[]) => {
    if (!availableMonths || availableMonths.length === 0) return;
    
    try {
      console.log("Available months for hotel:", availableMonths);
      
      // IMPORTANT: DO NOT create hotel_availability records for full months
      // Only availability_packages should determine what dates are available
      // This method should only update the hotel's available_months array
      
      // Update the hotel's available_months field directly
      const { error: updateError } = await supabase
        .from('hotels')
        .update({ 
          available_months: availableMonths.map(month => month.toLowerCase())
        })
        .eq('id', hotelId);
        
      if (updateError) {
        console.warn("Error updating hotel available_months:", updateError);
      } else {
        console.log("Successfully updated hotel available_months:", availableMonths);
      }
      
      console.log("IMPORTANT: Availability is now controlled ONLY by availability_packages, not by full month availability records");
    } catch (error) {
      console.error("Error in availability processing:", error);
      // Continue execution - don't throw error to parent function
    }
  };

  return {
    handleThemesAndActivities,
    handleAvailability
  };
};
