
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Review } from "./types";
import { useToast } from "@/hooks/use-toast";

// Hook to add a review
export const useAddReview = (hotelId?: string) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  
  return useMutation({
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
      if (hotelId) {
        queryClient.invalidateQueries({ queryKey: ['hotel', hotelId] });
        queryClient.invalidateQueries({ queryKey: ['hotelReviews', hotelId] });
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
};
