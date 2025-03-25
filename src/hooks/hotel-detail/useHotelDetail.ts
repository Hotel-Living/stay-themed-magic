
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { fetchHotelWithDetails } from "./fetchHotelDetail";
import { useHotelReviews } from "./useHotelReviews";
import { useAddReview } from "./useAddReview";

// Hook to get a specific hotel by ID
export function useHotelDetail(id: string | undefined, enabled = true) {
  const queryClient = useQueryClient();

  // Memoize the prefetch function for related data
  const prefetchRelatedData = useMemo(() => (hotelId: string) => {
    // Prefetch reviews for this hotel
    queryClient.prefetchQuery({
      queryKey: ['hotelReviews', hotelId],
      queryFn: () => useHotelReviews(hotelId).refetch()
    });
  }, [queryClient]);
  
  // Get hotel details
  const hotelDetailsQuery = useQuery({
    queryKey: ['hotel', id],
    queryFn: () => id ? fetchHotelWithDetails(id) : null,
    enabled: !!id && enabled,
    staleTime: 5 * 60 * 1000, // 5 minutes - data won't refetch for 5 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes - keep in cache for 30 minutes (renamed from cacheTime)
    meta: {
      onSuccess: (data) => {
        // Prefetch related data if the hotel exists
        if (data && data.id) {
          prefetchRelatedData(data.id);
        }
      }
    }
  });
  
  // Get the mutation to add a review
  const addReviewMutation = useAddReview(id);
  
  return {
    ...hotelDetailsQuery,
    useHotelReviews,
    addReview: addReviewMutation.mutate
  };
}

// Re-export types for convenience
export * from "./types";
