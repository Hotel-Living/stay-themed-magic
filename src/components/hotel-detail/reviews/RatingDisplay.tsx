
import { Star } from "lucide-react";

interface RatingDisplayProps {
  rating: number;
  reviewCount: number;
  size?: "small" | "large";
}

export function RatingDisplay({ rating, reviewCount, size = "large" }: RatingDisplayProps) {
  // Format the rating to one decimal place
  const formattedRating = rating ? rating.toFixed(1) : "0.0";
  
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star 
            key={i} 
            className={`${size === "small" ? "w-3 h-3" : "w-4 h-4"} ${i < Math.round(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400'}`} 
          />
        ))}
      </div>
      <span className={`font-bold ${size === "small" ? "text-base" : "text-lg"}`}>{formattedRating}</span>
      <span className="text-sm text-foreground/60">({reviewCount} reviews)</span>
    </div>
  );
}
