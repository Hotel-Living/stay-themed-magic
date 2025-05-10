
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { formatDate } from "@/components/dashboard/utils/dateUtils";
import { useToast } from "@/hooks/use-toast";
import { handleApiError } from "@/utils/errorHandling";

export interface UserReview {
  id: string;
  rating: number;
  comment: string | null;
  created_at: string;
  formattedDate: string;
  is_hidden: boolean;
  is_flagged: boolean;
  admin_note: string | null;  // Added admin_note field
  hotel: {
    name: string;
  } | null;
}

export const useUserReviews = (userId: string | undefined) => {
  const [reviews, setReviews] = useState<UserReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Create an abort controller for cleanup
    const abortController = new AbortController();
    
    const fetchReviews = async () => {
      if (!userId) {
        setReviews([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);
      
      try {
        const { data, error: supabaseError } = await supabase
          .from("reviews")
          .select("id, rating, comment, created_at, is_hidden, is_flagged, admin_note, hotel:hotel_id(name)")  // Added admin_note to selection
          .eq("user_id", userId)
          .abortSignal(abortController.signal);

        if (supabaseError) {
          throw supabaseError;
        }

        // Format the dates and add to each review
        const formattedReviews = data.map(review => ({
          ...review,
          formattedDate: formatDate(review.created_at)
        }));
        
        setReviews(formattedReviews);
      } catch (error) {
        // Only process the error if it's not an abort error
        if (!abortController.signal.aborted) {
          const errorMessage = handleApiError(error, "Error fetching user reviews");
          setError(errorMessage);
          console.error("Error in useUserReviews hook:", error);
          
          toast({
            title: "Error",
            description: "Failed to load user reviews",
            variant: "destructive"
          });
        }
      } finally {
        if (!abortController.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchReviews();

    // Cleanup function to abort any pending requests
    return () => {
      abortController.abort();
    };
  }, [userId, toast]);

  return { reviews, loading, error };
};
