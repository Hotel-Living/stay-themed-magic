
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Hotel, HotelImage, HotelTheme } from "@/integrations/supabase/types-custom";

// Extended interface to include additional properties like average_rating
interface HotelWithDetails extends Hotel {
  hotel_images: HotelImage[];
  hotel_themes: {
    theme_id: string;
    themes: {
      id: string;
      name: string;
    }
  }[];
  average_rating?: number;
}

// Function to fetch a specific hotel by ID
export const fetchHotelById = async (id: string): Promise<HotelWithDetails | null> => {
  if (!id) return null;
  
  // First fetch the hotel with its images and themes
  const { data, error } = await supabase
    .from('hotels')
    .select(`
      *,
      hotel_images(image_url, is_main),
      hotel_themes(theme_id, themes:themes(id, name))
    `)
    .eq('id', id)
    .single();
  
  if (error) {
    throw error;
  }
  
  // Create a properly typed object with our hotel data
  const hotelData = data as HotelWithDetails;
  
  // Now fetch the average rating for this hotel
  const { data: ratingData, error: ratingError } = await supabase
    .from('reviews')
    .select('rating')
    .eq('hotel_id', id);
  
  if (ratingError) {
    console.error("Error fetching ratings:", ratingError);
  } else if (ratingData && ratingData.length > 0) {
    // Calculate average rating
    const sum = ratingData.reduce((acc, review) => acc + review.rating, 0);
    hotelData.average_rating = sum / ratingData.length;
  } else {
    hotelData.average_rating = 0; // No reviews yet
  }
  
  return hotelData;
};

// Hook to get a specific hotel by ID
export function useHotelDetail(id: string | undefined, enabled = true) {
  return useQuery({
    queryKey: ['hotel', id],
    queryFn: () => id ? fetchHotelById(id) : null,
    enabled: !!id && enabled
  });
}
