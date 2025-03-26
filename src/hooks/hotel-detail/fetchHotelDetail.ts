
import { supabase } from "@/integrations/supabase/client";
import { HotelWithDetails, Review } from "./types";
import { getHotelAmenities, getAvailableMonths } from "./hotelUtils";
import { fetchHotelById } from "../hotels/fetchHotels";

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
    .select('*')
    .eq('hotel_id', hotelId)
    .order('created_at', { ascending: false });
    
  if (error) throw error;
  
  return (data || []).map(review => ({
    ...review,
    user_name: 'Anonymous'  // Default name if no profile info
  }));
};
