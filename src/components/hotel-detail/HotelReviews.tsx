
import { useState } from "react";
import { Star, MessageSquare, User } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/context/AuthContext";
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

interface HotelReviewsProps {
  hotelId: string;
  averageRating?: number;
  reviews?: Review[];
  onAddReview?: (review: Review) => void;
  isLoading?: boolean;
}

export function HotelReviews({ 
  hotelId, 
  averageRating = 0, 
  reviews = [],
  onAddReview,
  isLoading = false 
}: HotelReviewsProps) {
  const { user } = useAuth();
  const [isAddReviewOpen, setIsAddReviewOpen] = useState(false);
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Format the rating to one decimal place
  const formattedRating = averageRating ? averageRating.toFixed(1) : "0.0";
  
  const handleRatingChange = (rating: number) => {
    setNewRating(rating);
  };
  
  const handleAddReview = async () => {
    if (!user || !onAddReview) return;
    
    try {
      setIsSubmitting(true);
      
      await onAddReview({
        hotel_id: hotelId,
        user_id: user.id,
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
  
  if (isLoading) {
    return (
      <div className="glass-card rounded-2xl p-6 mb-8">
        <div className="flex items-center justify-between gap-2 mb-6">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-8 w-24" />
        </div>
        
        <div className="flex items-center gap-4 mb-6">
          <Skeleton className="h-16 w-16 rounded-full" />
          <div className="space-y-2 flex-1">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-16 w-full" />
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <Skeleton className="h-16 w-16 rounded-full" />
          <div className="space-y-2 flex-1">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-16 w-full" />
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="glass-card rounded-2xl p-6 mb-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold flex items-center gap-2">
          Guest Reviews
          <MessageSquare className="w-5 h-5 text-fuchsia-400" />
        </h2>
        
        <div className="flex items-center gap-2">
          <div className="flex items-center">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star 
                key={i} 
                className={`w-4 h-4 ${i < Math.round(averageRating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400'}`} 
              />
            ))}
          </div>
          <span className="font-bold text-lg">{formattedRating}</span>
          <span className="text-sm text-foreground/60">({reviews.length} reviews)</span>
        </div>
      </div>
      
      {/* Add review button */}
      {user && onAddReview && (
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
      )}
      
      {/* Reviews list */}
      {reviews.length > 0 ? (
        <div className="space-y-6">
          {reviews.map((review, index) => (
            <div key={review.id || index} className="border-t border-fuchsia-900/20 pt-4">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-fuchsia-800/30 flex items-center justify-center">
                  <User className="w-5 h-5 text-fuchsia-300" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium">{review.user_name || "Anonymous"}</span>
                    <div className="flex items-center">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-3 h-3 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400'}`} 
                        />
                      ))}
                    </div>
                    {review.created_at && (
                      <span className="text-xs text-foreground/60">
                        {new Date(review.created_at).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                  <p className="text-foreground/80">{review.comment}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-foreground/60 italic text-center py-4">
          No reviews yet. Be the first to share your experience!
        </p>
      )}
    </div>
  );
}
