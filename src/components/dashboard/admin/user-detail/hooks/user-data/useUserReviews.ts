
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { formatDate } from "@/components/dashboard/utils/dateUtils";

export interface UserReview {
  id: string;
  rating: number;
  comment: string | null;
  created_at: string;
  formattedDate: string;
  hotel: {
    name: string;
  } | null;
}

export const useUserReviews = (userId: string | undefined) => {
  const [reviews, setReviews] = useState<UserReview[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      if (!userId) {
        setReviews([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const { data, error } = await supabase
          .from("reviews")
          .select("id, rating, comment, created_at, hotel:hotel_id(name)")
          .eq("user_id", userId);

        if (error) {
          console.error("Error fetching user reviews:", error);
          setReviews([]);
        } else {
          // Format the dates and add to each review
          const formattedReviews = data.map(review => ({
            ...review,
            formattedDate: formatDate(review.created_at)
          }));
          setReviews(formattedReviews);
        }
      } catch (error) {
        console.error("Error in useUserReviews hook:", error);
        setReviews([]);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [userId]);

  return { reviews, loading };
};
