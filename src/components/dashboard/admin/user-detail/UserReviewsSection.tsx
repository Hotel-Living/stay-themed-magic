
import React, { useState } from "react";
import { type UserReview } from "./hooks/user-data/useUserReviews";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface UserReviewsSectionProps {
  reviews: UserReview[];
}

export const UserReviewsSection: React.FC<UserReviewsSectionProps> = ({ reviews }) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  if (!reviews || reviews.length === 0) {
    return (
      <div className="text-sm text-muted-foreground">
        This user has not submitted any reviews.
      </div>
    );
  }

  const handleEditClick = (review: UserReview) => {
    setEditingId(review.id);
    setEditText(review.comment || "");
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditText("");
  };

  const handleSaveEdit = async (reviewId: string) => {
    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from("reviews")
        .update({ comment: editText })
        .eq("id", reviewId);

      if (error) throw error;
      
      toast({
        title: "Review updated",
        description: "The review has been successfully updated",
      });
      
      // Update the review in the local state
      const updatedReview = reviews.find(r => r.id === reviewId);
      if (updatedReview) {
        updatedReview.comment = editText;
      }
      
      setEditingId(null);
    } catch (error) {
      console.error("Error updating review:", error);
      toast({
        title: "Update failed",
        description: "Failed to update review. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleVisibility = async (reviewId: string, currentVisibility: boolean) => {
    try {
      const { error } = await supabase
        .from("reviews")
        .update({ is_hidden: !currentVisibility })
        .eq("id", reviewId);

      if (error) throw error;
      
      toast({
        title: currentVisibility ? "Review hidden" : "Review published",
        description: `The review is now ${currentVisibility ? "hidden" : "visible"} to users`,
      });
      
      // Update the review in the local state
      const updatedReview = reviews.find(r => r.id === reviewId);
      if (updatedReview) {
        updatedReview.is_hidden = !currentVisibility;
      }
    } catch (error) {
      console.error("Error toggling review visibility:", error);
      toast({
        title: "Action failed",
        description: "Failed to update review visibility. Please try again.",
        variant: "destructive"
      });
    }
  };

  const toggleFlag = async (reviewId: string, currentFlag: boolean) => {
    try {
      const { error } = await supabase
        .from("reviews")
        .update({ is_flagged: !currentFlag })
        .eq("id", reviewId);

      if (error) throw error;
      
      toast({
        title: currentFlag ? "Flag removed" : "Review flagged",
        description: `The review is now ${currentFlag ? "unflagged" : "flagged"}`,
      });
      
      // Update the review in the local state
      const updatedReview = reviews.find(r => r.id === reviewId);
      if (updatedReview) {
        updatedReview.is_flagged = !currentFlag;
      }
    } catch (error) {
      console.error("Error toggling review flag:", error);
      toast({
        title: "Action failed",
        description: "Failed to update review flag status. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <ul className="text-sm space-y-3">
      {reviews.map((review) => (
        <li key={review.id} className="border p-3 rounded-md bg-muted/20">
          <div className="flex justify-between items-start mb-2">
            <div><strong>Hotel:</strong> {review.hotel?.name}</div>
            <div className="flex gap-1">
              <Badge variant={review.is_flagged ? "error" : "outline"}>
                {review.is_flagged ? "Flagged" : "Reviewed"}
              </Badge>
              <Badge variant={review.is_hidden ? "warning" : "success"}>
                {review.is_hidden ? "Hidden" : "Published"}
              </Badge>
            </div>
          </div>
          <div><strong>Rating:</strong> {review.rating} / 5</div>
          
          {editingId === review.id ? (
            <div className="mt-2">
              <Textarea 
                value={editText} 
                onChange={(e) => setEditText(e.target.value)}
                className="min-h-[80px] mb-2"
              />
              <div className="flex gap-2 justify-end">
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={handleCancelEdit}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button 
                  size="sm" 
                  onClick={() => handleSaveEdit(review.id)}
                  disabled={isSubmitting || editText === review.comment}
                >
                  {isSubmitting ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </div>
          ) : (
            <>
              <div><strong>Comment:</strong> {review.comment || "No comment provided"}</div>
              <div className="text-xs text-muted-foreground">{review.formattedDate}</div>
              
              <div className="mt-2 flex gap-2">
                <Button size="sm" variant="outline" onClick={() => handleEditClick(review)}>
                  Edit
                </Button>
                <Button 
                  size="sm" 
                  variant={review.is_hidden ? "default" : "secondary"}
                  onClick={() => toggleVisibility(review.id, review.is_hidden || false)}
                >
                  {review.is_hidden ? "Publish" : "Hide"}
                </Button>
                <Button 
                  size="sm" 
                  variant={review.is_flagged ? "outline" : "destructive"}
                  onClick={() => toggleFlag(review.id, review.is_flagged || false)}
                >
                  {review.is_flagged ? "Remove Flag" : "Flag"}
                </Button>
              </div>
            </>
          )}
        </li>
      ))}
    </ul>
  );
};

