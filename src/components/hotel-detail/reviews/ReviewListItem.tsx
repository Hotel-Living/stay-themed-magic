
import { Review } from "@/hooks/useHotelDetail";
import { User, Star } from "lucide-react";

interface ReviewListItemProps {
  review: Review;
}

export function ReviewListItem({ review }: ReviewListItemProps) {
  return (
    <div className="border-t border-fuchsia-900/20 pt-4">
      <div className="flex gap-4">
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-fuchsia-800/30 flex items-center justify-center">
          <User className="w-5 h-5 text-fuchsia-300" />
        </div>
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2 mb-1">
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
                {new Date(review.created_at).toLocaleDateString(undefined, {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })}
              </span>
            )}
          </div>
          <p className="text-foreground/80">{review.comment}</p>
        </div>
      </div>
    </div>
  );
}
