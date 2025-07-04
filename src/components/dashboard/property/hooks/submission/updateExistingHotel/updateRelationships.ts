
import { supabase } from "@/integrations/supabase/client";

/**
 * Updates hotel themes and activities relationships
 */
export const updateThemes = async (hotelId: string, themes: string[]) => {
  console.log("Updating hotel themes:", themes);
  
  // Delete existing themes
  const { error: deleteThemesError } = await supabase
    .from('hotel_themes')
    .delete()
    .eq('hotel_id', hotelId);
  
  if (deleteThemesError) {
    console.warn("Error deleting existing themes:", deleteThemesError);
  }
  
  // Insert new themes if any
  if (themes && themes.length > 0) {
    const themeRows = themes.map((themeId: string) => ({
      hotel_id: hotelId,
      theme_id: themeId
    }));
    
    const { error: insertThemesError } = await supabase
      .from('hotel_themes')
      .insert(themeRows);
    
    if (insertThemesError) {
      console.error("Error inserting themes:", insertThemesError);
      throw insertThemesError;
    }
    
    console.log("Successfully updated themes");
  }
};

export const updateActivities = async (hotelId: string, activities: string[]) => {
  console.log("Updating hotel activities:", activities);
  
  // Delete existing activities
  const { error: deleteActivitiesError } = await supabase
    .from('hotel_activities')
    .delete()
    .eq('hotel_id', hotelId);
  
  if (deleteActivitiesError) {
    console.warn("Error deleting existing activities:", deleteActivitiesError);
  }
  
  // Insert new activities if any
  if (activities && activities.length > 0) {
    const activityRows = activities.map((activityId: string) => ({
      hotel_id: hotelId,
      activity_id: activityId
    }));
    
    const { error: insertActivitiesError } = await supabase
      .from('hotel_activities')
      .insert(activityRows);
    
    if (insertActivitiesError) {
      console.error("Error inserting activities:", insertActivitiesError);
      throw insertActivitiesError;
    }
    
    console.log("Successfully updated activities");
  }
};
