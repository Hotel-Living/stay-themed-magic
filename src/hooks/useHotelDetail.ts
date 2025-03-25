import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Hotel, HotelImage, HotelTheme } from "@/integrations/supabase/types-custom";
import { useMemo } from "react";
import { useToast } from "@/hooks/use-toast";
import { fetchHotelById } from "./hotels/fetchHotels";

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

// Review type
export interface Review {
  id?: string;
  hotel_id: string;
  user_id: string;
  rating: number;
  comment: string;
  created_at?: string;
  user_name?: string;
  profiles?: {
    full_name?: string;
  } | null;
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

// Enhanced fetchHotelById with additional data
export const fetchHotelWithDetails = async (id: string): Promise<HotelWithDetails | null> => {
  if (!id) return null;
  
  // First fetch the hotel with its images and themes
  const hotelData = await fetchHotelById(id) as HotelWithDetails;
  if (!hotelData) return null;
  
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

// Function to fetch reviews for a hotel
export const fetchHotelReviews = async (hotelId: string): Promise<Review[]> => {
  const { data, error } = await supabase
    .from('reviews')
    .select('*, profiles(full_name)')
    .eq('hotel_id', hotelId)
    .order('created_at', { ascending: false });
    
  if (error) throw error;
  
  return (data || []).map(review => ({
    ...review,
    user_name: review.profiles?.full_name || 'Anonymous'
  }));
};

// Hook to get a specific hotel by ID
export function useHotelDetail(id: string | undefined, enabled = true) {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  // Memoize the prefetch function for related data
  const prefetchRelatedData = useMemo(() => (hotelId: string) => {
    // Prefetch reviews for this hotel
    queryClient.prefetchQuery({
      queryKey: ['hotelReviews', hotelId],
      queryFn: () => fetchHotelReviews(hotelId)
    });
  }, [queryClient]);
  
  // Mutation to add a review
  const addReviewMutation = useMutation({
    mutationFn: async (review: Review) => {
      const { data, error } = await supabase
        .from('reviews')
        .insert([review])
        .select();
        
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      // Invalidate and refetch hotel details and reviews
      if (id) {
        queryClient.invalidateQueries({ queryKey: ['hotel', id] });
        queryClient.invalidateQueries({ queryKey: ['hotelReviews', id] });
      }
      toast({
        title: "Review added",
        description: "Your review has been successfully added.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error adding review",
        description: error.message,
        variant: "destructive",
      });
    }
  });
  
  const hotelDetailsQuery = useQuery({
    queryKey: ['hotel', id],
    queryFn: () => id ? fetchHotelWithDetails(id) : null,
    enabled: !!id && enabled,
    staleTime: 5 * 60 * 1000, // 5 minutes - data won't refetch for 5 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes - keep in cache for 30 minutes (renamed from cacheTime)
    // Prefetch on hover from list page
    onSuccess: (data) => {
      // Prefetch related data if the hotel exists
      if (data && data.id) {
        prefetchRelatedData(data.id);
      }
    }
  });
  
  // Hook to get reviews for a hotel
  const useHotelReviews = (hotelId: string | undefined, enabled = true) => {
    return useQuery({
      queryKey: ['hotelReviews', hotelId],
      queryFn: () => hotelId ? fetchHotelReviews(hotelId) : [],
      enabled: !!hotelId && enabled,
      staleTime: 5 * 60 * 1000
    });
  };
  
  return {
    ...hotelDetailsQuery,
    useHotelReviews,
    addReview: addReviewMutation.mutate
  };
}
