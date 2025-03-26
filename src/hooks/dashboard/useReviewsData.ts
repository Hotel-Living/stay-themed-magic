
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { handleApiError } from '@/utils/errorHandling';
import { DashboardReview } from '@/components/dashboard/types';

// A hook to handle fetching and managing reviews data from the database
export function useReviewsData(propertyFilter: string | null) {
  const [reviews, setReviews] = useState<DashboardReview[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Function to transform a Supabase review row into a DashboardReview
  const transformReviewData = useCallback((review: any, profiles: any[]): DashboardReview => {
    const reviewer = profiles.find(p => p.id === review.user_id);
    const reviewerName = reviewer 
      ? `${reviewer.first_name || ''} ${reviewer.last_name || ''}`.trim() || 'Anonymous'
      : 'Anonymous';
      
    // Calculate relative time (like "3 days ago", "1 week ago", etc.)
    const getRelativeTimeString = (date: string) => {
      const now = new Date();
      const reviewDate = new Date(date);
      const diffInDays = Math.floor((now.getTime() - reviewDate.getTime()) / (1000 * 60 * 60 * 24));
      
      if (diffInDays === 0) return 'Today';
      if (diffInDays === 1) return 'Yesterday';
      if (diffInDays < 7) return `${diffInDays} days ago`;
      if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} ${Math.floor(diffInDays / 7) === 1 ? 'week' : 'weeks'} ago`;
      if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} ${Math.floor(diffInDays / 30) === 1 ? 'month' : 'months'} ago`;
      return `${Math.floor(diffInDays / 365)} ${Math.floor(diffInDays / 365) === 1 ? 'year' : 'years'} ago`;
    };

    // Convert to our DashboardReview format
    return {
      id: review.id,
      name: reviewerName,
      rating: review.rating,
      property: review.hotel_name || 'Unknown Property',
      comment: review.comment || '',
      date: getRelativeTimeString(review.created_at),
      isResponded: !!review.response_text,
      response: review.response_text || '',
      hotel_id: review.hotel_id,
      user_id: review.user_id,
      created_at: review.created_at,
      notified: review.is_notified || false
    };
  }, []);

  // Function to fetch reviews from Supabase
  const fetchReviews = useCallback(async () => {
    setIsLoading(true);

    try {
      // Build the base query
      let query = supabase
        .from('reviews')
        .select(`
          *,
          hotels:hotel_id (
            id,
            name
          )
        `);

      // Apply property filter if provided
      if (propertyFilter) {
        // First get the hotel_id for the property name
        const { data: hotelData, error: hotelError } = await supabase
          .from('hotels')
          .select('id')
          .eq('name', propertyFilter)
          .single();

        if (hotelError) {
          throw hotelError;
        }

        // Then filter reviews by this hotel_id
        if (hotelData) {
          query = query.eq('hotel_id', hotelData.id);
        }
      }

      // Execute the query
      const { data: reviewsData, error: reviewsError } = await query;

      if (reviewsError) {
        throw reviewsError;
      }

      // Get all user profiles for the reviews
      const userIds = [...new Set(reviewsData.map(review => review.user_id))];
      const { data: profilesData, error: profilesError } = await supabase
        .from('profiles')
        .select('id, first_name, last_name')
        .in('id', userIds);

      if (profilesError) {
        throw profilesError;
      }

      // Transform reviews to our format
      const transformedReviews = reviewsData.map(review => {
        const hotelName = review.hotels ? review.hotels.name : 'Unknown Property';
        return transformReviewData({
          ...review,
          hotel_name: hotelName
        }, profilesData || []);
      });

      setReviews(transformedReviews);
      setIsLoading(false);
    } catch (error) {
      handleApiError(error, 'Failed to load reviews');
      setIsLoading(false);
    }
  }, [propertyFilter, transformReviewData]);

  // Set up real-time subscription for reviews
  useEffect(() => {
    fetchReviews();

    // Subscribe to changes in the reviews table
    const channel = supabase
      .channel('reviews-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'reviews'
        },
        (payload) => {
          console.log('Real-time update for reviews:', payload);
          fetchReviews(); // Re-fetch all reviews when any change happens
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchReviews]);

  return {
    reviews,
    isLoading,
    refetch: fetchReviews
  };
}
