
import { supabase } from "@/integrations/supabase/client";

export interface UploadedImage {
  url: string;
  isMain: boolean;
  id?: string;
  isBlob?: boolean;
}

export const useImageSubmission = () => {
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
      
      const { data: insertData, error: insertError } = await supabase
        .from('hotel_images')
        .insert(imageRows);
        
      if (insertError) {
        console.error("Error inserting placeholder images:", insertError);
        throw insertError;
      }
      
      console.log("Insert result:", insertData);
      
      // Always ensure a main_image_url is set in the hotels table
      if (placeholderImages.length > 0) {
        const { error: updateError } = await supabase
          .from('hotels')
          .update({ main_image_url: placeholderImages[0] })
          .eq('id', hotelId);
          
        if (updateError) {
          console.error("Error updating main image URL:", updateError);
        }
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
      
      // Filter out any blob URLs as they can't be persisted
      const persistentImages = images.filter(image => !image.isBlob && !image.url.startsWith('blob:'));
      
      console.log("Filtered persistent images:", persistentImages);
      
      // If all images were blobs and we filtered them out, use placeholders
      if (persistentImages.length === 0) {
        console.warn("No persistent images found, using placeholders instead");
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
      
      const imageRows = persistentImages.map(image => ({
        hotel_id: hotelId,
        image_url: image.url,
        is_main: image.isMain
      }));
      
      console.log("Creating custom images:", imageRows);
      
      const { data: insertData, error: insertError } = await supabase
        .from('hotel_images')
        .insert(imageRows);
        
      if (insertError) {
        console.error("Error inserting custom images:", insertError);
        throw insertError;
      }
      
      console.log("Insert result:", insertData);
      
      // Find the main image and ensure it's set in the hotels table
      const mainImage = persistentImages.find(img => img.isMain);
      if (mainImage) {
        const { error: updateError } = await supabase
          .from('hotels')
          .update({ main_image_url: mainImage.url })
          .eq('id', hotelId);
          
        if (updateError) {
          console.error("Error updating main image URL:", updateError);
        }
      } else if (persistentImages.length > 0) {
        // If no image marked as main, use the first one
        const { error: updateError } = await supabase
          .from('hotels')
          .update({ main_image_url: persistentImages[0].url })
          .eq('id', hotelId);
          
        if (updateError) {
          console.error("Error updating main image URL:", updateError);
        }
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
