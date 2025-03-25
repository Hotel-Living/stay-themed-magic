
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Hotel, HotelImage, HotelTheme } from "@/integrations/supabase/types-custom";
import { useMemo } from "react";

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

// Generate hotel amenities based on category
const getHotelAmenities = (category?: number): string[] => {
  // Base amenities that all hotels have
  const baseAmenities = [
    "Free WiFi", 
    "Air Conditioning", 
    "Daily Housekeeping"
  ];
  
  if (!category) return baseAmenities;
  
  let amenities = [...baseAmenities];
  
  // Add more amenities based on hotel category
  if (category >= 3) {
    amenities.push("Pool", "Gym");
  }
  
  if (category >= 4) {
    amenities.push("Spa", "Room Service", "Restaurant");
  }
  
  if (category >= 5) {
    amenities.push("Concierge Service", "Valet Parking", "Business Center");
  }
  
  return amenities;
};

// Generate available months based on current date
const getAvailableMonths = (): string[] => {
  const currentMonth = new Date().getMonth();
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  
  // Generate next 6 available months starting from current month
  return Array.from({ length: 6 }, (_, i) => {
    const monthIndex = (currentMonth + i) % 12;
    return monthNames[monthIndex];
  });
};

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
  
  if (!ratingError && ratingData && ratingData.length > 0) {
    // Calculate average rating
    const sum = ratingData.reduce((acc, review) => acc + review.rating, 0);
    hotelData.average_rating = sum / ratingData.length;
  } else {
    hotelData.average_rating = 0; // No reviews yet
  }

  // Set consistent amenities
  hotelData.amenities = getHotelAmenities(hotelData.category);
  
  // Set available months
  hotelData.available_months = getAvailableMonths();
  
  return hotelData;
};

// Hook to get a specific hotel by ID
export function useHotelDetail(id: string | undefined, enabled = true) {
  const queryClient = useQueryClient();

  // Memoize the prefetch function for related data
  const prefetchRelatedData = useMemo(() => (hotelId: string) => {
    // Prefetch reviews for this hotel
    queryClient.prefetchQuery({
      queryKey: ['hotelReviews', hotelId],
      queryFn: () => supabase
        .from('reviews')
        .select('*')
        .eq('hotel_id', hotelId)
        .then(res => res.data)
    });
  }, [queryClient]);
  
  return useQuery({
    queryKey: ['hotel', id],
    queryFn: () => id ? fetchHotelById(id) : null,
    enabled: !!id && enabled,
    staleTime: 5 * 60 * 1000, // 5 minutes - data won't refetch for 5 minutes
    cacheTime: 30 * 60 * 1000, // 30 minutes - keep in cache for 30 minutes
    // Prefetch on hover from list page
    onSuccess: (data) => {
      // Prefetch related data if the hotel exists
      if (data && data.id) {
        prefetchRelatedData(data.id);
      }
    }
  });
}
