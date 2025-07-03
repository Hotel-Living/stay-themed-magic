
import { supabase } from "@/integrations/supabase/client";
import { UploadedImage } from "@/hooks/usePropertyImages";

export const useImageSubmission = () => {
  const handlePlaceholderImages = async (hotelId: string) => {
    console.log("Skipping placeholder images - user images take priority");
    
    // Do NOT add placeholder images if user has uploaded custom images
    // This prevents overwriting user-uploaded photos
    return Promise.resolve();
  };

  const handleCustomImages = async (hotelId: string, images: UploadedImage[]) => {
    console.log("Processing ONLY user-uploaded custom images for hotel:", hotelId, "Images:", images);
    
    if (!images || images.length === 0) {
      console.log("No custom images provided by user");
      return;
    }

    // Filter for images that haven't been uploaded to storage yet (blob URLs)
    const imagesToUpload = images.filter(img => img.url.startsWith('blob:'));
    const storageImages = images.filter(img => !img.url.startsWith('blob:'));
    
    console.log("User images to upload:", imagesToUpload.length, "Existing storage images:", storageImages.length);
    
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
          .from('hotel-images')
          .upload(fileName, blob, {
            contentType: blob.type,
            upsert: false
          });

        if (uploadError) {
          console.error("Error uploading user image:", uploadError);
          continue;
        }

        // Get public URL
        const { data: urlData } = supabase.storage
          .from('hotel-images')
          .getPublicUrl(uploadData.path);
        
        allImageUrls.push(urlData.publicUrl);
        console.log("Successfully uploaded USER image:", urlData.publicUrl);
        
        // Clean up blob URL
        URL.revokeObjectURL(image.url);
        
      } catch (error) {
        console.error("Error processing user image:", error);
      }
    }
    
    if (allImageUrls.length === 0) {
      console.warn("No user images were successfully processed");
      return;
    }
    
    // Insert ONLY user image records into database
    const imageRecords = allImageUrls.map((url, index) => ({
      hotel_id: hotelId,
      image_url: url,
      is_main: index === 0 || (images.find(img => img.url === url)?.isMain === true)
    }));
    
    const { error: insertError } = await supabase
      .from('hotel_images')
      .insert(imageRecords);
    
    if (insertError) {
      console.error("Error inserting user image records:", insertError);
      throw insertError;
    }
    
    // Update hotel's main image URL with user's main image
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
    
    console.log(`Successfully processed ${allImageUrls.length} USER IMAGES for hotel ${hotelId}`);
  };

  const handleAutoImagePopulation = async (hotelId: string, hotelData: any) => {
    console.log("SKIPPING auto image population - user images take priority");
    
    // DO NOT auto-populate images if user has uploaded their own
    // This prevents overwriting user-uploaded photos with system images
    return Promise.resolve();
  };

  return {
    handlePlaceholderImages,
    handleCustomImages,
    handleAutoImagePopulation
  };
};
