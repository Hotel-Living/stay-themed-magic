
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
  activities?: string[];
}

// Function to fetch a specific hotel by ID
export const fetchHotelById = async (id: string): Promise<HotelWithDetails | null> => {
  if (!id) return null;
  
  // First fetch the hotel with its images and themes
  const { data, error } = await supabase
    .from('hotels')
    .select(`
      *,
      hotel_images(id, hotel_id, image_url, is_main, created_at),
      hotel_themes(theme_id, themes:themes(id, name))
    `)
    .eq('id', id)
    .maybeSingle();
  
  if (error) {
    console.error("Error fetching hotel:", error);
    throw error;
  }
  
  if (!data) {
    console.log("No hotel found with ID:", id);
    return null;
  }
  
  // Create a properly typed object with our hotel data
  const hotelData = data as unknown as HotelWithDetails;
  
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
  
  // Add sample activities for the hotel
  hotelData.activities = [
    "Sightseeing",
    "Local Cuisine",
    "Cultural Tours"
  ];
  
  // For higher category hotels, add more activities
  if (hotelData.category && hotelData.category >= 4) {
    hotelData.activities.push("Wine Tasting", "Spa Treatments");
  }
  
  // For luxury hotels, add premium activities
  if (hotelData.category && hotelData.category >= 5) {
    hotelData.activities.push("Private Tours", "Yacht Cruises");
  }
  
  // Normalize available months if they exist
  // This ensures we only show what was actually saved to the database
  if (hotelData.available_months && Array.isArray(hotelData.available_months)) {
    // Process to remove duplicates and normalize capitalization
    const processedMonths = [...new Set(hotelData.available_months.map(month => {
      if (typeof month !== 'string') return '';
      return month.charAt(0).toUpperCase() + month.slice(1).toLowerCase();
    }))].filter(Boolean);
    
    hotelData.available_months = processedMonths;
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
