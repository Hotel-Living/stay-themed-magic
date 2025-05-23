
import { supabase } from "@/integrations/supabase/client";

export interface UploadedImage {
  url: string;
  isMain: boolean;
  id?: string;
}

export const useImageSubmission = () => {
  const uploadImageToStorage = async (file: File, hotelId: string, index: number): Promise<string> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${hotelId}/${Date.now()}-${index}.${fileExt}`;
    
    const { data, error } = await supabase.storage
      .from('hotel-images')
      .upload(fileName, file);

    if (error) {
      console.error('Error uploading image to storage:', error);
      throw error;
    }

    const { data: { publicUrl } } = supabase.storage
      .from('hotel-images')
      .getPublicUrl(fileName);

    return publicUrl;
  };

  const handlePlaceholderImages = async (hotelId: string) => {
    console.log("Using placeholder images for hotel:", hotelId);
    const placeholderImages = [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1025&q=80"
    ];
    
    try {
      // First, clean up any existing images
      const { error: deleteError } = await supabase
        .from('hotel_images')
        .delete()
        .eq('hotel_id', hotelId);
        
      if (deleteError) {
        console.error("Error deleting existing images:", deleteError);
      }
      
      const imageRows = placeholderImages.map((url, index) => ({
        hotel_id: hotelId,
        image_url: url,
        is_main: index === 0
      }));
      
      console.log("Creating placeholder images:", imageRows);
      
      const { error: insertError } = await supabase
        .from('hotel_images')
        .insert(imageRows);
        
      if (insertError) {
        console.error("Error inserting placeholder images:", insertError);
        throw insertError;
      }
      
      // Always ensure a main_image_url is set in the hotels table
      if (placeholderImages.length > 0) {
        await supabase
          .from('hotels')
          .update({ main_image_url: placeholderImages[0] })
          .eq('id', hotelId);
      }
    } catch (error) {
      console.error("Error in handlePlaceholderImages:", error);
      throw error;
    }
  };
  
  const handleCustomImages = async (hotelId: string, images: UploadedImage[] | undefined) => {
    console.log("Handling custom images for hotel:", hotelId, images);
    
    try {
      // If no images provided or empty array, use placeholders
      if (!images || images.length === 0) {
        console.warn("No custom images provided, using placeholders instead");
        return await handlePlaceholderImages(hotelId);
      }
      
      // First, clean up any existing images
      const { error: deleteError } = await supabase
        .from('hotel_images')
        .delete()
        .eq('hotel_id', hotelId);
        
      if (deleteError) {
        console.error("Error deleting existing images:", deleteError);
      }
      
      // Process images - convert blob URLs to actual files and upload them
      const processedImages = [];
      
      for (let i = 0; i < images.length; i++) {
        const image = images[i];
        let finalImageUrl = image.url;
        
        // If it's a blob URL, we need to upload it to storage
        if (image.url.startsWith('blob:')) {
          try {
            // Fetch the blob data
            const response = await fetch(image.url);
            const blob = await response.blob();
            
            // Create a file from the blob
            const file = new File([blob], `image-${i}.jpg`, { type: blob.type || 'image/jpeg' });
            
            // Upload to storage
            finalImageUrl = await uploadImageToStorage(file, hotelId, i);
            console.log(`Uploaded blob image ${i} to storage:`, finalImageUrl);
          } catch (uploadError) {
            console.error(`Error uploading blob image ${i}:`, uploadError);
            // Fall back to placeholder if upload fails
            finalImageUrl = "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80";
          }
        }
        
        processedImages.push({
          hotel_id: hotelId,
          image_url: finalImageUrl,
          is_main: image.isMain
        });
      }
      
      console.log("Creating processed images:", processedImages);
      
      const { error: insertError } = await supabase
        .from('hotel_images')
        .insert(processedImages);
        
      if (insertError) {
        console.error("Error inserting processed images:", insertError);
        throw insertError;
      }
      
      // Find the main image and ensure it's set in the hotels table
      const mainImage = processedImages.find(img => img.is_main);
      if (mainImage) {
        console.log("Setting main image URL to:", mainImage.image_url);
        await supabase
          .from('hotels')
          .update({ main_image_url: mainImage.image_url })
          .eq('id', hotelId);
      } else if (processedImages.length > 0) {
        // If no image marked as main, use the first one
        console.log("No main image found, using first image:", processedImages[0].image_url);
        await supabase
          .from('hotels')
          .update({ main_image_url: processedImages[0].image_url })
          .eq('id', hotelId);
      }
    } catch (error) {
      console.error("Error in handleCustomImages:", error);
      throw error;
    }
  };

  return {
    handlePlaceholderImages,
    handleCustomImages
  };
};
