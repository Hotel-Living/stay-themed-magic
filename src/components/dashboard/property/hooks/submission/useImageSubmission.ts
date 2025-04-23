
import { supabase } from "@/integrations/supabase/client";

export interface UploadedImage {
  url: string;
  isMain: boolean;
  id?: string;
}

export const useImageSubmission = () => {
  const handlePlaceholderImages = async (hotelId: string) => {
    const placeholderImages = [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1025&q=80"
    ];
    
    const imageRows = placeholderImages.map((url, index) => ({
      hotel_id: hotelId,
      image_url: url,
      is_main: index === 0
    }));
    
    await supabase.from('hotel_images').insert(imageRows);
    
    if (placeholderImages.length > 0) {
      await supabase
        .from('hotels')
        .update({ main_image_url: placeholderImages[0] })
        .eq('id', hotelId);
    }
  };
  
  const handleCustomImages = async (hotelId: string, images: UploadedImage[]) => {
    if (!images || images.length === 0) {
      return await handlePlaceholderImages(hotelId);
    }
    
    const imageRows = images.map(image => ({
      hotel_id: hotelId,
      image_url: image.url,
      is_main: image.isMain
    }));
    
    await supabase.from('hotel_images').insert(imageRows);
    
    const mainImage = images.find(img => img.isMain);
    if (mainImage) {
      await supabase
        .from('hotels')
        .update({ main_image_url: mainImage.url })
        .eq('id', hotelId);
    }
  };

  return {
    handlePlaceholderImages,
    handleCustomImages
  };
};
