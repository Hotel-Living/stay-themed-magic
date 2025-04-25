
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

      // Create activity records if they don't exist first
      for (const activityName of activities) {
        // Check if activity exists
        const { data: existingActivity } = await supabase
          .from('activities')
          .select('id')
          .eq('name', activityName)
          .maybeSingle();
        
        if (!existingActivity) {
          // Create the activity
          const { data: newActivity, error } = await supabase
            .from('activities')
            .insert({ name: activityName })
            .select('id')
            .single();
            
          if (error) {
            console.error("Error creating activity:", error);
          } else {
            console.log("Created new activity:", activityName);
          }
        }
      }
      
      // Now get all activities we need
      const { data: activityRecords } = await supabase
        .from('activities')
        .select('id, name')
        .in('name', activities);
      
      if (activityRecords && activityRecords.length > 0) {
        const activityRows = activityRecords.map(activity => ({
          hotel_id: hotelId,
          activity_id: activity.id
        }));
        
        const { data, error } = await supabase.from('hotel_activities').insert(activityRows);
        if (error) {
          console.error("Error inserting hotel_activities:", error);
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
      
      // Use only the existing months data, don't generate new ones
      const availableMonths = hotelData?.available_months || [];
      const preferredWeekday = hotelData?.preferredWeekday || 'Monday';
      
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
        });

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
