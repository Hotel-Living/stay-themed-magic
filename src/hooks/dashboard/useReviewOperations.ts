
import { useState, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useSendNotification } from '@/hooks/useSendNotification';
import { DashboardReview } from '@/components/dashboard/types';
import { supabase } from '@/integrations/supabase/client';
import { handleApiError } from '@/utils/errorHandling';

export function useReviewOperations(initialReviews: DashboardReview[], refetchReviews?: () => Promise<void>) {
  const [reviews, setReviews] = useState<DashboardReview[]>(initialReviews);
  const { toast } = useToast();
  const { sendNotification, isSending } = useSendNotification();

  // Update the local state when initialReviews changes (from API)
  useState(() => {
    if (initialReviews !== reviews) {
      setReviews(initialReviews);
    }
  });

  const respondToReview = useCallback(async (reviewId: string, responseText: string) => {
    try {
      // Update the review in the database
      const { error } = await supabase
        .from('reviews')
        .update({ response_text: responseText })
        .eq('id', reviewId);

      if (error) throw error;

      // Update local state
      setReviews(prevReviews => 
        prevReviews.map(review => 
          review.id === reviewId 
            ? { ...review, isResponded: true, response: responseText } 
            : review
        )
      );
      
      toast({
        title: "Response submitted",
        description: "Your response has been successfully submitted.",
      });

      // Refetch reviews if provided
      if (refetchReviews) {
        await refetchReviews();
      }
      
    } catch (error) {
      handleApiError(error, "Failed to submit response");
    }
  }, [toast, refetchReviews]);

  const sendNotifications = useCallback(async (unnotifiedReviews: DashboardReview[]) => {
    if (unnotifiedReviews.length === 0) {
      toast({
        title: "No new reviews",
        description: "There are no new unnotified reviews.",
      });
      return;
    }
    
    const hotelOwnerEmail = "owner@example.com";
    
    try {
      const promises = unnotifiedReviews.map(async (review) => {
        await sendNotification('review', hotelOwnerEmail, {
          hotelName: review.property,
          rating: review.rating,
          comment: review.comment,
        });
        
        // Mark the review as notified in the database
        const { error } = await supabase
          .from('reviews')
          .update({ is_notified: true })
          .eq('id', review.id);
          
        if (error) throw error;
        
        return { ...review, notified: true };
      });
      
      await Promise.all(promises);
      
      // Update local state
      setReviews(prevReviews => 
        prevReviews.map(review => 
          unnotifiedReviews.some(ur => ur.id === review.id)
            ? { ...review, notified: true }
            : review
        )
      );
      
      toast({
        title: "Notifications sent",
        description: `Sent ${unnotifiedReviews.length} notifications to hotel owner.`,
      });

      // Refetch reviews if provided
      if (refetchReviews) {
        await refetchReviews();
      }
      
    } catch (error) {
      toast({
        title: "Error sending notifications",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
    }
  }, [toast, sendNotification, refetchReviews]);

  return {
    reviews,
    isSending,
    respondToReview,
    sendNotifications
  };
}
