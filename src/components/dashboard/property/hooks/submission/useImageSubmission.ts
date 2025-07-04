
import { supabase } from "@/integrations/supabase/client";
import { UploadedImage } from "@/hooks/usePropertyImages";

export const useImageSubmission = () => {
  const handlePlaceholderImages = async (hotelId: string) => {
    console.log("Using placeholder images for hotel:", hotelId);
    
    // For now, we don't add any placeholder images here since they'll be handled by auto-population
    // This function remains for backward compatibility
    return Promise.resolve();
  };

  const handleCustomImages = async (hotelId: string, images: UploadedImage[]) => {
    console.log("Processing custom images for hotel:", hotelId, "Images:", images);
    
    if (!images || images.length === 0) {
      console.log("No custom images provided");
      return;
    }

    // Filter for images that haven't been uploaded to storage yet (blob URLs)
    const imagesToUpload = images.filter(img => img.url.startsWith('blob:'));
    const storageImages = images.filter(img => !img.url.startsWith('blob:'));
    
    console.log("Images to upload:", imagesToUpload.length, "Storage images:", storageImages.length);
    
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
          console.error("Error uploading image:", uploadError);
          continue;
        }

        // Get public URL
        const { data: urlData } = supabase.storage
          .from('hotel-images')
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
    
    console.log(`Successfully processed ${allImageUrls.length} custom images for hotel ${hotelId}`);
  };

  const handleAutoImagePopulation = async (hotelId: string, hotelData: any) => {
    console.log("Starting auto image population for hotel:", hotelId);
    
    try {
      const { data, error } = await supabase.functions.invoke('fetch-hotel-images', {
        body: {
          hotelId,
          city: hotelData.city,
          country: hotelData.country,
          style: hotelData.style || 'luxury',
          hotelName: hotelData.name
        }
      });

      if (error) {
        console.error("Error calling fetch-hotel-images function:", error);
        return;
      }

      console.log("Auto image population result:", data);
      
    } catch (error) {
      console.error("Error in auto image population:", error);
      // Don't throw error - auto population failure shouldn't break hotel creation
    }
  };

  return {
    handlePlaceholderImages,
    handleCustomImages,
    handleAutoImagePopulation
  };
};
