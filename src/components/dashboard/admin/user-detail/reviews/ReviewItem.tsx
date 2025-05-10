
import React, { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { type UserReview } from "../hooks/user-data/useUserReviews";
import { ReviewHeader } from "./components/ReviewHeader";
import { ReviewContent } from "./components/ReviewContent";
import { ReviewEditor } from "./components/ReviewEditor";
import { AdminNoteSection } from "./components/AdminNoteSection";
import { ReviewActionButtons } from "./components/ReviewActionButtons";

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

  const updateAdminNote = (note: string) => {
    review.admin_note = note;
  };

  return (
    <li className="border p-3 rounded-md bg-muted/20">
      <ReviewHeader review={review} />
      
      {isEditing ? (
        <ReviewEditor 
          editText={editText}
          isSubmitting={isSubmitting}
          onEditChange={setEditText}
          onSave={handleSaveEdit}
          onCancel={handleCancelEdit}
          originalText={review.comment || ""}
        />
      ) : (
        <>
          <ReviewContent review={review} />
          
          <AdminNoteSection 
            reviewId={review.id} 
            initialNote={review.admin_note}
            onUpdate={updateAdminNote}
          />
          
          <ReviewActionButtons 
            isHidden={review.is_hidden}
            isFlagged={review.is_flagged}
            onEdit={handleEditClick}
            onToggleVisibility={toggleVisibility}
            onToggleFlag={toggleFlag}
          />
        </>
      )}
    </li>
  );
};
