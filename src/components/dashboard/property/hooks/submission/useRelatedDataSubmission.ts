
import { supabase } from "@/integrations/supabase/client";
import { format, parse } from "date-fns";

export const useRelatedDataSubmission = () => {
  const handleThemesAndActivities = async (hotelId: string, themes: string[], activities: string[]) => {
    console.log("Handling themes and activities for hotel:", hotelId, { themes, activities });
    
    if (themes && themes.length > 0) {
      // Delete existing themes first
      await supabase
        .from('hotel_themes')
        .delete()
        .eq('hotel_id', hotelId);

      const themeRows = themes.map(themeId => ({
        hotel_id: hotelId,
        theme_id: themeId
      }));
      
      if (themeRows.length > 0) {
        const { data, error } = await supabase.from('hotel_themes').insert(themeRows);
        if (error) {
          console.error("Error inserting themes:", error);
        } else {
          console.log("Successfully inserted themes:", themeRows.length);
        }
      }
    }

    if (activities && activities.length > 0) {
      // Delete existing activities first
      await supabase
        .from('hotel_activities')
        .delete()
        .eq('hotel_id', hotelId);

      const activityRows = activities.map(activityId => ({
        hotel_id: hotelId,
        activity_id: activityId
      }));
      
      if (activityRows.length > 0) {
        const { data, error } = await supabase.from('hotel_activities').insert(activityRows);
        if (error) {
          console.error("Error inserting activities:", error);
        } else {
          console.log("Successfully inserted activities:", activityRows.length);
        }
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
