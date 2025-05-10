
import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { type UserReview } from "../hooks/user-data/useUserReviews";

interface ReviewItemProps {
  review: UserReview;
}

export const ReviewItem: React.FC<ReviewItemProps> = ({ review }) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const isEditing = editingId === review.id;

  const handleEditClick = () => {
    setEditingId(review.id);
    setEditText(review.comment || "");
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditText("");
  };

  const handleSaveEdit = async () => {
    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from("reviews")
        .update({ comment: editText })
        .eq("id", review.id);

      if (error) throw error;
      
      toast({
        title: "Review updated",
        description: "The review has been successfully updated",
      });
      
      // Update the review comment locally
      review.comment = editText;
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

  const toggleVisibility = async () => {
    try {
      const { error } = await supabase
        .from("reviews")
        .update({ is_hidden: !review.is_hidden })
        .eq("id", review.id);

      if (error) throw error;
      
      toast({
        title: review.is_hidden ? "Review published" : "Review hidden",
        description: `The review is now ${review.is_hidden ? "visible" : "hidden"} to users`,
      });
      
      // Update the review visibility locally
      review.is_hidden = !review.is_hidden;
    } catch (error) {
      console.error("Error toggling review visibility:", error);
      toast({
        title: "Action failed",
        description: "Failed to update review visibility. Please try again.",
        variant: "destructive"
      });
    }
  };

  const toggleFlag = async () => {
    try {
      const { error } = await supabase
        .from("reviews")
        .update({ is_flagged: !review.is_flagged })
        .eq("id", review.id);

      if (error) throw error;
      
      toast({
        title: review.is_flagged ? "Flag removed" : "Review flagged",
        description: `The review is now ${review.is_flagged ? "unflagged" : "flagged"}`,
      });
      
      // Update the review flag locally
      review.is_flagged = !review.is_flagged;
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
    <li className="border p-3 rounded-md bg-muted/20">
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
      
      {isEditing ? (
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
              onClick={handleSaveEdit}
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
            <Button size="sm" variant="outline" onClick={handleEditClick}>
              Edit
            </Button>
            <Button 
              size="sm" 
              variant={review.is_hidden ? "default" : "secondary"}
              onClick={toggleVisibility}
            >
              {review.is_hidden ? "Publish" : "Hide"}
            </Button>
            <Button 
              size="sm" 
              variant={review.is_flagged ? "outline" : "destructive"}
              onClick={toggleFlag}
            >
              {review.is_flagged ? "Remove Flag" : "Flag"}
            </Button>
          </div>
        </>
      )}
    </li>
  );
};
