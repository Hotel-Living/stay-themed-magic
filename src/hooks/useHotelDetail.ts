
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Hotel, HotelImage, HotelTheme } from "@/integrations/supabase/types-custom";

// Extended interface to include additional properties like average_rating, amenities, and available_months
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
  amenities?: string[];
  available_months?: string[];
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

  // For demo purposes, using realistic amenities based on hotel category/type
  // In a real application, these would come from a separate table in the database
  hotelData.amenities = [
    "Free WiFi", 
    "Air Conditioning", 
    "Daily Housekeeping"
  ];
  
  // Add more amenities based on hotel category
  if (hotelData.category && hotelData.category >= 3) {
    hotelData.amenities.push("Pool", "Gym");
  }
  
  if (hotelData.category && hotelData.category >= 4) {
    hotelData.amenities.push("Spa", "Room Service", "Restaurant");
  }
  
  if (hotelData.category && hotelData.category >= 5) {
    hotelData.amenities.push("Concierge Service", "Valet Parking", "Business Center");
  }
  
  // For demo purposes, generate available months based on current date
  // In a real application, these would come from a bookings/availability table
  const currentMonth = new Date().getMonth();
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  
  // Generate next 6 available months starting from current month
  hotelData.available_months = Array.from({ length: 6 }, (_, i) => {
    const monthIndex = (currentMonth + i) % 12;
    return monthNames[monthIndex];
  });
  
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
