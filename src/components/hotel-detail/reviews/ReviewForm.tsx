
import { useState, useEffect } from "react";
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
import { useToast } from "@/components/ui/use-toast";

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
  const [characterCount, setCharacterCount] = useState(0);
  const { toast } = useToast();
  
  const handleRatingChange = (rating: number) => {
    setNewRating(rating);
  };
  
  const handleMouseEnter = (rating: number) => {
    setHoverRating(rating);
  };
  
  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  useEffect(() => {
    setCharacterCount(newComment.length);
  }, [newComment]);
  
  const handleAddReview = async () => {
    if (newComment.trim().length < 10) {
      toast({
        title: "Review too short",
        description: "Please provide a more detailed comment (at least 10 characters)",
        variant: "destructive"
      });
      return;
    }
    
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

      toast({
        title: "Review submitted",
        description: "Thank you for sharing your experience!",
      });
    } catch (error) {
      console.error("Error adding review:", error);
      toast({
        title: "Error submitting review",
        description: "Please try again later",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getRatingLabel = () => {
    const rating = hoverRating || newRating;
    return rating === 1 ? "Poor" :
          rating === 2 ? "Fair" :
          rating === 3 ? "Good" :
          rating === 4 ? "Very good" :
          "Excellent";
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
            <span className="text-sm text-foreground/80 mt-1 font-medium">
              {getRatingLabel()}
            </span>
          </div>
          
          <div className="space-y-2">
            <Textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Share details of your experience at this hotel..."
              className="min-h-[120px]"
            />
            <div className="flex justify-end">
              <span className={`text-xs ${characterCount < 10 ? 'text-red-400' : 'text-muted-foreground'}`}>
                {characterCount}/500 characters {characterCount < 10 ? '(minimum 10)' : ''}
              </span>
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsAddReviewOpen(false)}>
            Cancel
          </Button>
          <Button 
            onClick={handleAddReview} 
            disabled={isSubmitting || newComment.trim().length < 10}
          >
            {isSubmitting ? "Submitting..." : "Submit Review"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
