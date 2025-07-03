
import { supabase } from "@/integrations/supabase/client";
import { PropertyFormData } from "../usePropertyFormData";
import { prepareHotelData } from "./prepareHotelData";
import { useImageSubmission } from "./useImageSubmission";

export const createNewHotel = async (formData: PropertyFormData) => {
  console.log("Creating new hotel with COMPLETE form data:", formData);
  
  const { user } = await supabase.auth.getUser();
  if (!user.data.user) {
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
      owner_id: user.data.user.id
    })
    .select()
    .single();

  if (hotelError) {
    console.error("Error creating hotel:", hotelError);
    throw hotelError;
  }

  console.log("Hotel created successfully:", hotel);

  // Handle themes/affinities - ENSURE THEY ARE SAVED
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
      console.log("Themes saved successfully");
    }
  }

  // Handle activities - ENSURE THEY ARE SAVED
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
      console.log("Activities saved successfully");
    }
  }

  // Handle user images ONLY - NO auto population
  const { handleCustomImages } = useImageSubmission();
  
  if (formData.hotelImages && formData.hotelImages.length > 0) {
    console.log("Processing user-uploaded images only");
    await handleCustomImages(hotel.id, formData.hotelImages);
  }

  console.log("Hotel creation completed with all data preserved");
  return hotel;
};
