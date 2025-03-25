
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
  const [hoverRating, setHoverRating] = useState(0);
  const [newComment, setNewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleRatingChange = (rating: number) => {
    setNewRating(rating);
  };
  
  const handleMouseEnter = (rating: number) => {
    setHoverRating(rating);
  };
  
  const handleMouseLeave = () => {
    setHoverRating(0);
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
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Share your experience</DialogTitle>
          <DialogDescription>
            Rate and review your stay at this hotel.
          </DialogDescription>
        </DialogHeader>
        
        <div className="my-4">
          <div className="flex flex-col items-center gap-2 mb-4">
            <div className="flex items-center justify-center gap-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star 
                  key={i} 
                  className={`w-8 h-8 cursor-pointer transition-all hover:scale-110 ${
                    i < (hoverRating || newRating) 
                      ? 'fill-yellow-400 text-yellow-400' 
                      : 'text-gray-400'
                  }`}
                  onClick={() => handleRatingChange(i + 1)}
                  onMouseEnter={() => handleMouseEnter(i + 1)}
                  onMouseLeave={handleMouseLeave}
                />
              ))}
            </div>
            <span className="text-sm text-foreground/80 mt-1">
              {
                newRating === 1 ? "Poor" :
                newRating === 2 ? "Fair" :
                newRating === 3 ? "Good" :
                newRating === 4 ? "Very good" :
                "Excellent"
              }
            </span>
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
