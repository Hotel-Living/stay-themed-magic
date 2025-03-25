
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useSendNotification } from '@/hooks/useSendNotification';
import { DashboardReview } from '@/components/dashboard/types';

export function useReviewOperations(initialReviews: DashboardReview[]) {
  const [reviews, setReviews] = useState<DashboardReview[]>(initialReviews);
  const { toast } = useToast();
  const { sendNotification, isSending } = useSendNotification();

  const respondToReview = (reviewId: string, responseText: string) => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
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
        
        resolve();
      }, 500);
    });
  };

  const sendNotifications = async (unnotifiedReviews: DashboardReview[]) => {
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
        
        return { ...review, notified: true };
      });
      
      const updatedReviews = await Promise.all(promises);
      
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
    } catch (error) {
      toast({
        title: "Error sending notifications",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
    }
  };

  return {
    reviews,
    isSending,
    respondToReview,
    sendNotifications
  };
}
