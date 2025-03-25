
import { useQuery } from "@tanstack/react-query";
import { fetchHotelReviews } from "./fetchHotelDetail";

// Hook to get reviews for a hotel
export const useHotelReviews = (hotelId: string | undefined, enabled = true) => {
  return useQuery({
    queryKey: ['hotelReviews', hotelId],
    queryFn: () => hotelId ? fetchHotelReviews(hotelId) : [],
    enabled: !!hotelId && enabled,
    staleTime: 5 * 60 * 1000
  });
};
