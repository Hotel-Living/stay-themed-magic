
import { supabase } from "@/integrations/supabase/client";
import { format, parse } from "date-fns";
import { handleSupabaseError } from "@/utils/errorHandling";

export const useRelatedDataSubmission = () => {
  const handleThemesAndActivities = async (hotelId: string, themes: string[], activities: string[]) => {
    console.log("Handling themes and activities for hotel:", hotelId, { themes, activities });
    
    if (themes && themes.length > 0) {
      try {
        // Delete existing themes first
        const { error: deleteError } = await supabase
          .from('hotel_themes')
          .delete()
          .eq('hotel_id', hotelId);
          
        if (deleteError) {
          console.warn("Error deleting existing themes, will try to insert anyway:", deleteError);
        }
  
        // Create theme records - ensure each theme ID is properly processed
        const themeRows = themes.map(themeId => ({
          hotel_id: hotelId,
          theme_id: themeId
        }));
        
        if (themeRows.length > 0) {
          const { data, error } = await supabase
            .from('hotel_themes')
            .insert(themeRows)
            .select();
            
          if (error) {
            console.error("Error inserting themes:", error);
            handleSupabaseError(error, "Failed to add hotel themes");
          } else {
            console.log("Successfully inserted themes:", data?.length || 0);
          }
        }
      } catch (error) {
        console.error("Error in theme processing:", error);
        // Continue execution - don't throw error to parent function
      }
    }

    if (activities && activities.length > 0) {
      try {
        // Delete existing activities first
        const { error: deleteActError } = await supabase
          .from('hotel_activities')
          .delete()
          .eq('hotel_id', hotelId);
          
        if (deleteActError) {
          console.warn("Error deleting existing activities, will try to insert anyway:", deleteActError);
        }
  
        // First, ensure we have all activity IDs from the database
        const { data: activityData, error: activityLookupError } = await supabase
          .from('activities')
          .select('id, name')
          .in('name', activities);
          
        if (activityLookupError) {
          console.warn("Error looking up activities, will try to create new ones:", activityLookupError);
        }
        
        // Create a mapping of activity names to IDs
        const activityMap = new Map();
        if (activityData) {
          activityData.forEach(activity => {
            activityMap.set(activity.name, activity.id);
          });
        }
        
        // For any activities that don't exist yet, create them
        const missingActivities = activities.filter(name => !activityMap.has(name));
        
        if (missingActivities.length > 0) {
          const newActivitiesRows = missingActivities.map(name => ({
            name: name
          }));
          
          const { data: newActivitiesData, error: createError } = await supabase
            .from('activities')
            .insert(newActivitiesRows)
            .select('id, name');
            
          if (createError) {
            console.warn("Error creating new activities:", createError);
          } else if (newActivitiesData) {
            // Add new activities to our map
            newActivitiesData.forEach(activity => {
              activityMap.set(activity.name, activity.id);
            });
          }
        }
        
        // Now create hotel_activities records using the correct activity IDs
        const activityRows = activities.map(activityName => ({
          hotel_id: hotelId,
          activity_id: activityMap.get(activityName)
        })).filter(row => row.activity_id); // Filter out any undefined activity IDs
        
        if (activityRows.length > 0) {
          const { data, error } = await supabase
            .from('hotel_activities')
            .insert(activityRows)
            .select();
            
          if (error) {
            console.error("Error inserting activities:", error);
            handleSupabaseError(error, "Failed to add hotel activities");
          } else {
            console.log("Successfully inserted activities:", data?.length || 0);
          }
        }
      } catch (error) {
        console.error("Error in activity processing:", error);
        // Continue execution - don't throw error to parent function
      }
    }
  };

  const handleAvailability = async (hotelId: string, stayLengths: number[]) => {
    if (!stayLengths || stayLengths.length === 0) return;
    
    try {
      // Get the selected months from the hotel submission
      const { data: hotelData, error: hotelError } = await supabase
        .from('hotels')
        .select('available_months, preferredWeekday')
        .eq('id', hotelId)
        .single();
        
      if (hotelError) {
        console.warn("Error fetching hotel available months, skipping availability creation:", hotelError);
        return;
      }
      
      // Use the available months data from the hotel record
      const availableMonths = hotelData?.available_months || [];
      const preferredWeekday = hotelData?.preferredWeekday || 'Monday';
      
      console.log("Available months for hotel:", availableMonths);
      
      // Clear existing hotel availability entries
      const { error: deleteError } = await supabase
        .from('hotel_availability')
        .delete()
        .eq('hotel_id', hotelId);
        
      if (deleteError) {
        console.warn("Error deleting existing availability, will try to insert anyway:", deleteError);
      }
      
      // Only create entries if there are actual months selected
      if (availableMonths.length > 0) {
        const currentYear = new Date().getFullYear();
        const availabilityRows = availableMonths
          .map(month => {
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
              console.warn(`Error parsing month ${month}, skipping:`, error);
              return null;
            }
          })
          .filter(Boolean); // Filter out any null entries from parsing errors

        if (availabilityRows.length > 0) {
          const { data, error } = await supabase
            .from('hotel_availability')
            .insert(availabilityRows)
            .select();
            
          if (error) {
            console.warn("Error inserting availability:", error);
          } else {
            console.log("Successfully inserted availability:", data?.length || 0);
          }
        }
      }
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
