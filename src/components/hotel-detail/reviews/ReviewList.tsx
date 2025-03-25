
import { Review } from "@/hooks/useHotelDetail";
import { User, Star } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface ReviewListProps {
  reviews: Review[];
  isLoading?: boolean;
}

export function ReviewList({ reviews, isLoading }: ReviewListProps) {
  if (isLoading) {
    return (
      <>
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
      </>
    );
  }
  
  if (reviews.length === 0) {
    return (
      <p className="text-foreground/60 italic text-center py-4">
        No reviews yet. Be the first to share your experience!
      </p>
    );
  }
  
  return (
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
  );
}
