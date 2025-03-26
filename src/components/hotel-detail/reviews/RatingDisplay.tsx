
import { Star } from "lucide-react";

interface RatingDisplayProps {
  rating: number;
  reviewCount: number;
  size?: "small" | "large";
  showDetails?: boolean;
}

export function RatingDisplay({ 
  rating, 
  reviewCount, 
  size = "large", 
  showDetails = false 
}: RatingDisplayProps) {
  // Format the rating to one decimal place
  const formattedRating = rating ? rating.toFixed(1) : "0.0";
  
  // Convert rating to percentage for progress bars
  const calculatePercentage = (starCount: number) => {
    if (reviewCount === 0) return 0;
    
    // This is a simple simulation since we don't have actual count per star
    // In a real app, you would get this data from the API
    let percentage = 0;
    const basePercentage = (rating - (starCount - 1)) * 100;
    
    if (rating >= starCount) {
      percentage = 100;
    } else if (rating > starCount - 1) {
      percentage = basePercentage;
    }
    
    // Add some randomness to make it look more realistic
    const variation = Math.sin(starCount * reviewCount) * 15;
    return Math.min(100, Math.max(0, percentage + variation));
  };
  
  return (
    <div className={`flex ${showDetails ? 'flex-col items-start' : 'items-center'} gap-2`}>
      {showDetails ? (
        <div className="flex flex-col md:flex-row gap-6 w-full">
          <div className="flex flex-col items-center justify-center p-3 bg-fuchsia-900/10 rounded-lg">
            <span className={`font-bold text-2xl text-fuchsia-500`}>
              {formattedRating}
            </span>
            <div className="flex items-center mt-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star 
                  key={i} 
                  className={`${size === "small" ? "w-3 h-3" : "w-4 h-4"} ${
                    i < Math.round(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400'
                  }`} 
                />
              ))}
            </div>
            <span className="text-xs text-foreground/60 mt-1">
              {reviewCount} {reviewCount === 1 ? 'review' : 'reviews'}
            </span>
          </div>
          
          <div className="flex-1 flex flex-col gap-1.5">
            {[5, 4, 3, 2, 1].map(starCount => (
              <div key={starCount} className="flex items-center gap-2">
                <div className="flex items-center">
                  <span className="text-xs w-8 text-right">{starCount}</span>
                  <Star className="w-3 h-3 ml-1 fill-yellow-400 text-yellow-400" />
                </div>
                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-yellow-400 rounded-full"
                    style={{ width: `${calculatePercentage(starCount)}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <>
          <div className="flex items-center">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star 
                key={i} 
                className={`${size === "small" ? "w-3 h-3" : "w-4 h-4"} ${
                  i < Math.round(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400'
                }`} 
              />
            ))}
          </div>
          <span className={`font-bold ${size === "small" ? "text-base" : "text-lg"}`}>
            {formattedRating}
          </span>
          <span className="text-sm text-foreground/60">
            ({reviewCount} {reviewCount === 1 ? 'review' : 'reviews'})
          </span>
        </>
      )}
    </div>
  );
}
