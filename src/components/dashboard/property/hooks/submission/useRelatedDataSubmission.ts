
import { supabase } from "@/integrations/supabase/client";
import { format, parse } from "date-fns";
import { handleSupabaseError } from "@/utils/errorHandling";

export const useRelatedDataSubmission = () => {
  const handleThemesAndActivities = async (hotelId: string, themes: string[], activities: string[]) => {
    console.log("Handling themes and activities for hotel:", hotelId, { themes, activities });
    
    if (themes && themes.length > 0) {
      // Delete existing themes first
      const { error: deleteThemesError } = await supabase
        .from('hotel_themes')
        .delete()
        .eq('hotel_id', hotelId);
        
      if (deleteThemesError) {
        console.error("Error deleting existing themes:", deleteThemesError);
        throw deleteThemesError;
      }

      const themeRows = themes.map(themeId => ({
        hotel_id: hotelId,
        theme_id: themeId
      }));
      
      if (themeRows.length > 0) {
        const { error: insertThemesError } = await supabase
          .from('hotel_themes')
          .insert(themeRows);
          
        if (insertThemesError) {
          console.error("Error inserting themes:", insertThemesError);
          throw insertThemesError;
        } else {
          console.log("Successfully inserted themes:", themeRows.length);
        }
      }
    }

    if (activities && activities.length > 0) {
      // Delete existing activities first
      const { error: deleteActivitiesError } = await supabase
        .from('hotel_activities')
        .delete()
        .eq('hotel_id', hotelId);
        
      if (deleteActivitiesError) {
        console.error("Error deleting existing activities:", deleteActivitiesError);
        throw deleteActivitiesError;
      }

      console.log("Raw activities to process:", activities);
      
      try {
        // First, strictly validate activities are UUIDs before processing
        const validUuidFormat = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
        const validActivities = activities.filter(activityId => {
          const isValid = validUuidFormat.test(activityId);
          if (!isValid) {
            console.warn(`Skipping invalid activity ID format: "${activityId}"`);
          }
          return isValid;
        });

        console.log(`Processing ${validActivities.length} valid activities out of ${activities.length}`);

        if (validActivities.length === 0) {
          console.warn("No valid activity UUIDs found to insert");
          return; // Skip insert if no valid UUIDs
        }

        const activityRows = validActivities.map(activityId => ({
          hotel_id: hotelId,
          activity_id: activityId
        }));
        
        const { error: insertActivitiesError } = await supabase
          .from('hotel_activities')
          .insert(activityRows);
          
        if (insertActivitiesError) {
          console.error("Error inserting activities:", insertActivitiesError);
          throw insertActivitiesError;
        } else {
          console.log("Successfully inserted activities:", activityRows.length);
        }
      } catch (error) {
        console.error("Critical error processing activities:", error);
        throw error;
      }
    }
  };

  const handleAvailability = async (hotelId: string, stayLengths: number[]) => {
    if (stayLengths && stayLengths.length > 0) {
      // Get the selected months from the hotel submission
      const { data: hotelData, error: hotelError } = await supabase
        .from('hotels')
        .select('available_months, preferredWeekday')
        .eq('id', hotelId)
        .single();
        
      if (hotelError) {
        console.error("Error fetching hotel available months:", hotelError);
        return;
      }
      
      // Use the available months data from the hotel record
      const availableMonths = hotelData?.available_months || [];
      const preferredWeekday = hotelData?.preferredWeekday || 'Monday';
      
      console.log("Available months for hotel:", availableMonths);
      
      // Clear existing hotel availability entries
      await supabase
        .from('hotel_availability')
        .delete()
        .eq('hotel_id', hotelId);
      
      // Only create entries if there are actual months selected
      if (availableMonths.length > 0) {
        const currentYear = new Date().getFullYear();
        const availabilityRows = availableMonths.map(month => {
          // Ensure month name is properly capitalized
          const capitalizedMonth = month.charAt(0).toUpperCase() + month.slice(1).toLowerCase();
          
          try {
            // Try to parse the date - this might fail if the month name format is unexpected
            const firstDayOfMonth = parse(`01 ${capitalizedMonth} ${currentYear}`, 'dd MMMM yyyy', new Date());
            const formattedDate = format(firstDayOfMonth, 'yyyy-MM-dd');
            
            return {
              hotel_id: hotelId,
              availability_month: month.toLowerCase(), // Store lowercase in this field
              availability_year: currentYear,
              availability_date: formattedDate,
              is_full_month: true,
              preferred_weekday: preferredWeekday,
            };
          } catch (error) {
            console.error(`Error parsing month ${month}:`, error);
            return null;
          }
        }).filter(Boolean); // Filter out any null entries from parsing errors

        if (availabilityRows.length > 0) {
          const { data, error } = await supabase.from('hotel_availability').insert(availabilityRows);
          if (error) {
            console.error("Error inserting availability:", error);
          } else {
            console.log("Successfully inserted availability:", availabilityRows.length);
          }
        }
      }
    }
  };

  return {
    handleThemesAndActivities,
    handleAvailability
  };
};
