
import { supabase } from "@/integrations/supabase/client";
import { PropertyFormData } from "../usePropertyFormData";
import { prepareHotelData } from "./prepareHotelData";
import { UploadedImage } from "@/hooks/usePropertyImages";

// Enhanced image upload utility function with better error handling
const uploadHotelImages = async (hotelId: string, images: UploadedImage[]) => {
  console.log("🖼️ Processing user-uploaded images for hotel:", hotelId, "Images count:", images?.length || 0);
  console.log("🖼️ Image details:", images?.map(img => ({ url: img.url, isMain: img.isMain, name: img.name })));
  
  if (!images || images.length === 0) {
    console.log("⚠️ No images provided by user");
    return { success: false, message: "No images provided" };
  }

  // Filter for images that haven't been uploaded to storage yet (blob URLs or file objects)
  const imagesToUpload = images.filter(img => 
    img.url && (img.url.startsWith('blob:') || img.url.startsWith('data:'))
  );
  const storageImages = images.filter(img => 
    img.url && !img.url.startsWith('blob:') && !img.url.startsWith('data:')
  );
  
  console.log("📤 Images to upload:", imagesToUpload.length, "📁 Existing storage images:", storageImages.length);
  
  const allImageUrls: string[] = [];
  const uploadPromises: Promise<string | null>[] = [];
  
  // Add existing storage URLs
  storageImages.forEach(img => {
    if (img.url) {
      allImageUrls.push(img.url);
    }
  });
  
  // Upload blob/data images to storage
  for (const image of imagesToUpload) {
    const uploadPromise = (async () => {
      try {
        let blob: Blob;
        
        // Handle different image formats
        if (image.url.startsWith('blob:')) {
          const response = await fetch(image.url);
          blob = await response.blob();
        } else if (image.url.startsWith('data:')) {
          // Convert data URL to blob
          const response = await fetch(image.url);
          blob = await response.blob();
        } else {
          console.warn("⚠️ Unknown image format:", image.url);
          return null;
        }
        
        // Generate unique filename
        const timestamp = Date.now();
        const random = Math.random().toString(36).substring(2, 15);
        const fileExt = blob.type.split('/')[1] || 'jpg';
        const fileName = `${hotelId}/${timestamp}-${random}.${fileExt}`;
        
        console.log("📤 Uploading image to storage:", fileName, "Size:", blob.size, "Type:", blob.type);
        
        // Upload to Supabase Storage with retry logic
        let uploadData, uploadError;
        for (let attempt = 1; attempt <= 3; attempt++) {
          const result = await supabase.storage
            .from('Hotel Images')
            .upload(fileName, blob, {
              contentType: blob.type,
              upsert: false
            });
          
          uploadData = result.data;
          uploadError = result.error;
          
          if (!uploadError) break;
          
          console.warn(`⚠️ Upload attempt ${attempt} failed:`, uploadError);
          if (attempt === 3) {
            console.error("❌ Final upload attempt failed:", uploadError);
            return null;
          }
          
          // Wait before retry
          await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
        }

        if (uploadError || !uploadData) {
          console.error("❌ Error uploading image after all attempts:", uploadError);
          return null;
        }

        // Get public URL
        const { data: urlData } = supabase.storage
          .from('Hotel Images')
          .getPublicUrl(uploadData.path);
        
        console.log("✅ Successfully uploaded image:", urlData.publicUrl);
        
        // Clean up blob URL
        if (image.url.startsWith('blob:')) {
          URL.revokeObjectURL(image.url);
        }
        
        return urlData.publicUrl;
        
      } catch (error) {
        console.error("❌ Error processing image:", error, image);
        return null;
      }
    })();
    
    uploadPromises.push(uploadPromise);
  }
  
  // Wait for all uploads to complete
  const uploadedUrls = await Promise.all(uploadPromises);
  const successfulUploads = uploadedUrls.filter(url => url !== null) as string[];
  
  // Add successful uploads to the list
  allImageUrls.push(...successfulUploads);
  
  console.log(`📊 Upload summary: ${successfulUploads.length}/${imagesToUpload.length} new images uploaded successfully`);
  console.log(`📊 Total images to save: ${allImageUrls.length}`);
  
  if (allImageUrls.length === 0) {
    console.warn("⚠️ No images were successfully processed");
    return { success: false, message: "No images were successfully uploaded" };
  }
  
  // Insert image records into database
  const imageRecords = allImageUrls.map((url, index) => {
    const originalImage = images.find(img => img.url === url) || 
                          images.find(img => successfulUploads.includes(url)) ||
                          images[index];
    
    return {
      hotel_id: hotelId,
      image_url: url,
      is_main: originalImage?.isMain === true || index === 0
    };
  });
  
  console.log("💾 Inserting image records into database:", imageRecords);
  
  const { error: insertError } = await supabase
    .from('hotel_images')
    .insert(imageRecords);
  
  if (insertError) {
    console.error("❌ Error inserting image records:", insertError);
    throw insertError;
  }
  
  // Update hotel's main image URL and photos array
  const mainImageUrl = allImageUrls.find((url, index) => 
    imageRecords[index].is_main
  ) || allImageUrls[0];
  
  if (mainImageUrl) {
    console.log("🖼️ Setting main image URL and photos array:", { mainImageUrl, photos: allImageUrls });
    const { error: updateError } = await supabase
      .from('hotels')
      .update({ 
        main_image_url: mainImageUrl,
        photos: allImageUrls // Populate the photos array
      })
      .eq('id', hotelId);
    
    if (updateError) {
      console.warn("⚠️ Could not update hotel images:", updateError);
    } else {
      console.log("✅ Successfully updated hotel main image URL and photos array");
    }
  }
  
  console.log(`✅ Successfully processed ${allImageUrls.length} images for hotel ${hotelId}`);
  return { success: true, message: `Processed ${allImageUrls.length} images successfully` };
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
