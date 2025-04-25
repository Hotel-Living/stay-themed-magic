
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Hotel, HotelImage, HotelTheme } from "@/integrations/supabase/types-custom";

// Extended interface to include additional properties like average_rating, hotelFeatures, and available_months
interface HotelWithDetails extends Hotel {
  hotel_images: HotelImage[];
  hotel_themes: {
    theme_id: string;
    themes: {
      id: string;
      name: string;
    }
  }[];
  hotel_activities: {
    activity_id: string;
    activities: {
      id: string;
      name: string;
      category?: string;
    }
  }[];
  average_rating?: number;
  hotelFeatures?: string[];
  roomFeatures?: string[];
  available_months?: string[];
  activities?: string[];
}

// Function to fetch a specific hotel by ID
export const fetchHotelById = async (id: string): Promise<HotelWithDetails | null> => {
  if (!id) return null;
  
  console.log(`Fetching hotel details for ID: ${id}`);
  
  // First fetch the hotel with its images, themes and activities
  const { data, error } = await supabase
    .from('hotels')
    .select(`
      *,
      hotel_images(id, hotel_id, image_url, is_main, created_at),
      hotel_themes(theme_id, themes:themes(id, name, description, category)),
      hotel_activities(activity_id, activities:activities(id, name, category))
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
  
  console.log("Hotel data from API:", data);
  console.log("Hotel themes:", data.hotel_themes);
  console.log("Hotel activities:", data.hotel_activities);
  console.log("Available months:", data.available_months);
  console.log("Hotel features:", data.features_hotel);
  console.log("Room features:", data.features_room);
  
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

  // Extract hotel features from features_hotel object
  if (data.features_hotel && typeof data.features_hotel === 'object') {
    hotelData.hotelFeatures = Object.entries(data.features_hotel)
      .filter(([_, selected]) => selected)
      .map(([featureId]) => featureId.replace(/_/g, ' '));
  } else {
    hotelData.hotelFeatures = [];
  }
  
  // Extract room features from features_room object
  if (data.features_room && typeof data.features_room === 'object') {
    hotelData.roomFeatures = Object.entries(data.features_room)
      .filter(([_, selected]) => selected)
      .map(([featureId]) => featureId.replace(/_/g, ' '));
  } else {
    hotelData.roomFeatures = [];
  }
  
  // Extract activities from hotel_activities 
  if (hotelData.hotel_activities && hotelData.hotel_activities.length > 0) {
    hotelData.activities = hotelData.hotel_activities
      .filter(item => item.activities && item.activities.name)
      .map(item => item.activities.name);
  } else {
    hotelData.activities = [];
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
    console.log("Normalized available months:", hotelData.available_months);
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
