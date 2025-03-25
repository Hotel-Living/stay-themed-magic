
import { useState } from "react";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Review } from "@/hooks/useHotelDetail";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface ReviewFormProps {
  hotelId: string;
  userId: string;
  onAddReview: (review: Review) => void;
}

export function ReviewForm({ hotelId, userId, onAddReview }: ReviewFormProps) {
  const [isAddReviewOpen, setIsAddReviewOpen] = useState(false);
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleRatingChange = (rating: number) => {
    setNewRating(rating);
  };
  
  const handleAddReview = async () => {
    try {
      setIsSubmitting(true);
      
      await onAddReview({
        hotel_id: hotelId,
        user_id: userId,
        rating: newRating,
        comment: newComment
      });
      
      // Reset form and close dialog
      setNewRating(5);
      setNewComment("");
      setIsAddReviewOpen(false);
    } catch (error) {
      console.error("Error adding review:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <Dialog open={isAddReviewOpen} onOpenChange={setIsAddReviewOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="mb-6">
          Write a review
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Share your experience</DialogTitle>
          <DialogDescription>
            Rate and review your stay at this hotel.
          </DialogDescription>
        </DialogHeader>
        
        <div className="my-4">
          <div className="flex items-center justify-center gap-2 mb-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star 
                key={i} 
                className={`w-6 h-6 cursor-pointer ${i < newRating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400'}`}
                onClick={() => handleRatingChange(i + 1)}
              />
            ))}
          </div>
          
          <Textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Share details of your experience at this hotel..."
            className="min-h-[120px]"
          />
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsAddReviewOpen(false)}>
            Cancel
          </Button>
          <Button 
            onClick={handleAddReview} 
            disabled={isSubmitting || !newComment.trim()}
          >
            {isSubmitting ? "Submitting..." : "Submit Review"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
