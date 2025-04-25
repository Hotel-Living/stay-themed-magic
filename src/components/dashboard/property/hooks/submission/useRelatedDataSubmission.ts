
import { supabase } from "@/integrations/supabase/client";
import { format, parse } from "date-fns";
import { isValidUuid, filterValidUuids } from "@/utils/validation";

export const useRelatedDataSubmission = () => {
  const handleThemesAndActivities = async (hotelId: string, themes: string[], activities: string[]) => {
    console.log("Handling themes and activities for hotel:", hotelId, { themes, activities });
    
    // Ensure themes and activities arrays only contain valid UUIDs
    const validThemes = filterValidUuids(themes);
    const validActivities = filterValidUuids(activities);
    
    console.log("Valid themes after UUID filtering:", validThemes.length);
    console.log("Valid activities after UUID filtering:", validActivities.length);
    
    if (validThemes.length > 0) {
      // First delete existing hotel themes
      const { error: deleteError } = await supabase
        .from('hotel_themes')
        .delete()
        .eq('hotel_id', hotelId);
      
      if (deleteError) {
        console.error("Error deleting existing themes:", deleteError);
        throw deleteError;
      }

      // Then insert new themes
      const themeRows = validThemes.map(themeId => ({
        hotel_id: hotelId,
        theme_id: themeId
      }));
      
      if (themeRows.length > 0) {
        const { error: insertError } = await supabase
          .from('hotel_themes')
          .insert(themeRows);
          
        if (insertError) {
          console.error("Error inserting themes:", insertError);
          throw insertError;
        } else {
          console.log("Successfully inserted themes:", themeRows.length);
        }
      }
    }

    if (validActivities.length > 0) {
      // First delete existing hotel activities
      const { error: deleteError } = await supabase
        .from('hotel_activities')
        .delete()
        .eq('hotel_id', hotelId);
      
      if (deleteError) {
        console.error("Error deleting existing activities:", deleteError);
        throw deleteError;
      }

      // Then insert new activities
      const activityRows = validActivities.map(activityId => ({
        hotel_id: hotelId,
        activity_id: activityId
      }));
      
      if (activityRows.length > 0) {
        const { error: insertError } = await supabase
          .from('hotel_activities')
          .insert(activityRows);
          
        if (insertError) {
          console.error("Error inserting activities:", insertError);
          throw insertError;
        } else {
          console.log("Successfully inserted activities:", activityRows.length);
        }
      }
    }
  };

  const handleAvailability = async (hotelId: string, stayLengths: number[]) => {
    try {
      console.log("Handling availability for hotel:", hotelId);
      
      // Get user-selected months from form data
      const { data: formData, error: formDataError } = await supabase
        .from('hotels')
        .select('available_months')
        .eq('id', hotelId)
        .single();
      
      if (formDataError) {
        console.error("Error fetching hotel available months:", formDataError);
        return;
      }
      
      const availableMonths = formData?.available_months || [];
      console.log("Available months from form data:", availableMonths);
      
      if (availableMonths && availableMonths.length > 0) {
        // Clear existing hotel availability entries
        const { error: deleteError } = await supabase
          .from('hotel_availability')
          .delete()
          .eq('hotel_id', hotelId);
          
        if (deleteError) {
          console.error("Error deleting existing availability:", deleteError);
          return;
        }
        
        // Normalize months and create availability entries
        const currentYear = new Date().getFullYear();
        const normalizedMonths = [...new Set(availableMonths.map(month => {
          return month.charAt(0).toUpperCase() + month.slice(1).toLowerCase();
        }))];
        
        console.log("Normalized months for availability:", normalizedMonths);
        
        const availabilityRows = normalizedMonths.map(month => {
          const firstDayOfMonth = parse(`01 ${month} ${currentYear}`, 'dd MMMM yyyy', new Date());
          const formattedDate = format(firstDayOfMonth, 'yyyy-MM-dd');
          
          return {
            hotel_id: hotelId,
            availability_month: month.toLowerCase(),
            availability_year: currentYear,
            availability_date: formattedDate,
            is_full_month: true,
            preferred_weekday: 'Monday',
          };
        });
        
        if (availabilityRows.length > 0) {
          const { error: insertError } = await supabase
            .from('hotel_availability')
            .insert(availabilityRows);
            
          if (insertError) {
            console.error("Error inserting availability:", insertError);
          } else {
            console.log("Successfully inserted availability:", availabilityRows.length);
            
            // Update the hotel record with the normalized months
            const { error: updateError } = await supabase
              .from('hotels')
              .update({ available_months: normalizedMonths })
              .eq('id', hotelId);
              
            if (updateError) {
              console.error("Error updating hotel available months:", updateError);
            } else {
              console.log("Successfully updated hotel available months");
            }
          }
        }
      }
    } catch (error) {
      console.error("Error in handleAvailability:", error);
    }
  };

  return {
    handleThemesAndActivities,
    handleAvailability
  };
};
