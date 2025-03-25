
import { MessageSquare } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/context/AuthContext";
import { Review } from "@/hooks/useHotelDetail";
import { ReviewList } from "./ReviewList";
import { ReviewForm } from "./ReviewForm";
import { RatingDisplay } from "./RatingDisplay";

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
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h2 className="text-xl font-bold flex items-center gap-2">
          Guest Reviews
          <MessageSquare className="w-5 h-5 text-fuchsia-400" />
        </h2>
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <RatingDisplay rating={averageRating} reviewCount={reviews.length} />
          
          {user && onAddReview && (
            <ReviewForm 
              hotelId={hotelId} 
              userId={user.id} 
              onAddReview={onAddReview} 
            />
          )}
        </div>
      </div>
      
      {/* Reviews list with pagination and sorting */}
      <ReviewList reviews={reviews} isLoading={isLoading} />
    </div>
  );
}
