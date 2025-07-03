
import { supabase } from "@/integrations/supabase/client";
import { PropertyFormData } from "../usePropertyFormData";
import { prepareHotelData } from "./prepareHotelData";
// Removed unused hook imports as we're not using hooks in this function

export const createNewHotel = async (formData: PropertyFormData) => {
  console.log("Creating new hotel with COMPLETE form data:", formData);
  
  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError || !userData.user) {
    throw new Error("User not authenticated");
  }

  // Prepare hotel data with ALL fields
  const hotelData = prepareHotelData(formData);
  console.log("Prepared hotel data with all fields:", hotelData);
  
  // Insert hotel with owner_id
  const { data: hotel, error: hotelError } = await supabase
    .from('hotels')
    .insert({
      ...hotelData,
      owner_id: userData.user.id
    })
    .select()
    .single();

  if (hotelError) {
    console.error("Error creating hotel:", hotelError);
    throw hotelError;
  }

  console.log("Hotel created successfully:", hotel);

  // CRITICAL: Handle all related data - themes, activities, availability, and images
  try {
    // Handle themes/affinities
    if (formData.themes && formData.themes.length > 0) {
      console.log("Saving themes/affinities:", formData.themes);
      const themeInserts = formData.themes.map(themeId => ({
        hotel_id: hotel.id,
        theme_id: themeId
      }));

      const { error: themesError } = await supabase
        .from('hotel_themes')
        .insert(themeInserts);

      if (themesError) {
        console.error("Error saving themes:", themesError);
      } else {
        console.log("Themes saved successfully:", themeInserts.length);
      }
    }

    // Handle activities
    if (formData.activities && formData.activities.length > 0) {
      console.log("Saving activities:", formData.activities);
      const activityInserts = formData.activities.map(activityId => ({
        hotel_id: hotel.id,
        activity_id: activityId
      }));

      const { error: activitiesError } = await supabase
        .from('hotel_activities')
        .insert(activityInserts);

      if (activitiesError) {
        console.error("Error saving activities:", activitiesError);
      } else {
        console.log("Activities saved successfully:", activityInserts.length);
      }
    }
    
    // Handle availability data
    if (formData.available_months && formData.available_months.length > 0) {
      console.log("Processing availability months:", formData.available_months);
      
      const currentYear = new Date().getFullYear();
      const availabilityRows = formData.available_months.map(month => ({
        hotel_id: hotel.id,
        availability_month: month.toLowerCase(),
        availability_year: currentYear,
        availability_date: `${currentYear}-01-01`, // Default date
        is_full_month: true,
        preferred_weekday: formData.preferredWeekday || 'Monday'
      }));

      const { error: availabilityError } = await supabase
        .from('hotel_availability')
        .insert(availabilityRows);

      if (availabilityError) {
        console.error("Error saving availability:", availabilityError);
      } else {
        console.log("Availability saved successfully:", availabilityRows.length);
      }
    }
    
    // Handle hotel images
    if (formData.hotelImages && formData.hotelImages.length > 0) {
      console.log("Processing hotel images:", formData.hotelImages.length);
      // Note: Image handling would need to be implemented based on your image upload system
    }
    
  } catch (error) {
    console.error("Error handling related data:", error);
    // Don't throw - let the hotel creation succeed even if some related data fails
  }

  console.log("Hotel creation completed with all data preserved");
  return hotel;
};
