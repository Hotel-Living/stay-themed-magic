
import { supabase } from "@/integrations/supabase/client";
import { PropertyFormData } from "../usePropertyFormData";
import { prepareHotelData } from "./prepareHotelData";
import { UploadedImage } from "@/hooks/usePropertyImages";

// Image upload utility function
const uploadHotelImages = async (hotelId: string, images: UploadedImage[]) => {
  console.log("Processing user-uploaded images for hotel:", hotelId, "Images:", images);
  
  if (!images || images.length === 0) {
    console.log("No images provided by user");
    return;
  }

  // Filter for images that haven't been uploaded to storage yet (blob URLs)
  const imagesToUpload = images.filter(img => img.url.startsWith('blob:'));
  const storageImages = images.filter(img => !img.url.startsWith('blob:'));
  
  console.log("Images to upload:", imagesToUpload.length, "Existing storage images:", storageImages.length);
  
  const allImageUrls: string[] = [];
  
  // Add existing storage URLs
  storageImages.forEach(img => allImageUrls.push(img.url));
  
  // Upload blob images to storage
  for (const image of imagesToUpload) {
    try {
      // Convert blob URL to file
      const response = await fetch(image.url);
      const blob = await response.blob();
      
      // Generate unique filename
      const fileExt = blob.type.split('/')[1] || 'jpg';
      const fileName = `${hotelId}/${Date.now()}-${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
      
      // Upload to Supabase Storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('Hotel Images')
        .upload(fileName, blob, {
          contentType: blob.type,
          upsert: false
        });

      if (uploadError) {
        console.error("Error uploading image:", uploadError);
        continue;
      }

      // Get public URL
      const { data: urlData } = supabase.storage
        .from('Hotel Images')
        .getPublicUrl(uploadData.path);
      
      allImageUrls.push(urlData.publicUrl);
      console.log("Successfully uploaded image:", urlData.publicUrl);
      
      // Clean up blob URL
      URL.revokeObjectURL(image.url);
      
    } catch (error) {
      console.error("Error processing image:", error);
    }
  }
  
  if (allImageUrls.length === 0) {
    console.warn("No images were successfully processed");
    return;
  }
  
  // Insert image records into database
  const imageRecords = allImageUrls.map((url, index) => ({
    hotel_id: hotelId,
    image_url: url,
    is_main: index === 0 || (images.find(img => img.url === url)?.isMain === true)
  }));
  
  const { error: insertError } = await supabase
    .from('hotel_images')
    .insert(imageRecords);
  
  if (insertError) {
    console.error("Error inserting image records:", insertError);
    throw insertError;
  }
  
  // Update hotel's main image URL
  const mainImageUrl = allImageUrls.find((url, index) => 
    imageRecords[index].is_main
  ) || allImageUrls[0];
  
  if (mainImageUrl) {
    const { error: updateError } = await supabase
      .from('hotels')
      .update({ main_image_url: mainImageUrl })
      .eq('id', hotelId);
    
    if (updateError) {
      console.warn("Could not update hotel main image:", updateError);
    }
  }
  
  console.log(`Successfully processed ${allImageUrls.length} images for hotel ${hotelId}`);
};

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
      await uploadHotelImages(hotel.id, formData.hotelImages);
    }
    
    // Handle room images (from formData.roomImages or extracted from roomTypes)
    let roomImages: UploadedImage[] = [];
    
    // Get room images from formData.roomImages if available
    if (formData.roomImages && formData.roomImages.length > 0) {
      roomImages = formData.roomImages;
    } else if (formData.roomTypes && formData.roomTypes.length > 0) {
      // Extract images from room types
      formData.roomTypes.forEach((roomType: any) => {
        if (roomType.images && roomType.images.length > 0) {
          roomImages.push(...roomType.images);
        }
      });
    }
    
    if (roomImages.length > 0) {
      console.log("Processing room images:", roomImages.length);
      await uploadHotelImages(hotel.id, roomImages);
    }
    
  } catch (error) {
    console.error("Error handling related data:", error);
    // Don't throw - let the hotel creation succeed even if some related data fails
  }

  console.log("Hotel creation completed with all data preserved");
  return hotel;
};
