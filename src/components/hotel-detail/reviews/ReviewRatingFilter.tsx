
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";

interface ReviewRatingFilterProps {
  onRatingChange: (rating: number | null) => void;
  currentRating: number | null;
  reviewCounts?: Record<number, number>;
}

export function ReviewRatingFilter({ 
  onRatingChange, 
  currentRating,
  reviewCounts = {} 
}: ReviewRatingFilterProps) {
  const ratings = [5, 4, 3, 2, 1];
  
  // Calculate total reviews for showing in the "Clear" button tooltip
  const totalReviews = Object.values(reviewCounts).reduce((sum, count) => sum + count, 0);

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 animate-fade-in">
      <span className="text-sm text-muted-foreground whitespace-nowrap font-medium">Filter by:</span>
      <div className="flex flex-wrap gap-1.5">
        <TooltipProvider>
          {ratings.map((rating) => {
            const count = reviewCounts[rating] || 0;
            const hasReviews = count > 0;
            
            return (
              <Tooltip key={rating}>
                <TooltipTrigger asChild>
                  <div className="relative">
                    <Button
                      size="sm"
                      variant="outline"
                      className={cn(
                        "h-8 px-2 border-fuchsia-900/20 transition-all duration-200",
                        currentRating === rating 
                          ? "bg-fuchsia-900/20 text-foreground font-medium ring-1 ring-fuchsia-500/30 shadow-sm" 
                          : hasReviews 
                            ? "hover:bg-fuchsia-900/10 hover:text-foreground" 
                            : "opacity-40 cursor-not-allowed",
                      )}
                      onClick={() => hasReviews && onRatingChange(currentRating === rating ? null : rating)}
                      aria-pressed={currentRating === rating}
                      aria-label={`${rating} star reviews${count > 0 ? ` (${count})` : ''}`}
                      disabled={!hasReviews}
                    >
                      <span className="mr-1 font-medium">{rating}</span>
                      <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                      {hasReviews && (
                        <Badge 
                          variant="secondary" 
                          className={cn(
                            "ml-1 px-1 py-0 text-xs font-normal",
                            currentRating === rating ? "bg-fuchsia-900/40" : "bg-secondary/80"
                          )}
                        >
                          {count}
                        </Badge>
                      )}
                    </Button>
                  </div>
                </TooltipTrigger>
                <TooltipContent 
                  side="top" 
                  align="center" 
                  className="text-xs bg-popover/95 backdrop-blur-sm border-fuchsia-900/30"
                >
                  {hasReviews 
                    ? `Show only ${rating}-star reviews (${count})`
                    : `No ${rating}-star reviews available`
                  }
                </TooltipContent>
              </Tooltip>
            )
          })}
          {currentRating !== null && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-8 px-2 text-fuchsia-400 hover:text-fuchsia-300 hover:bg-fuchsia-900/10 transition-colors"
                  onClick={() => onRatingChange(null)}
                  aria-label="Clear filter"
                >
                  Clear
                </Button>
              </TooltipTrigger>
              <TooltipContent 
                side="top" 
                align="center" 
                className="text-xs bg-popover/95 backdrop-blur-sm border-fuchsia-900/30"
              >
                {`Show all ${totalReviews} reviews`}
              </TooltipContent>
            </Tooltip>
          )}
        </TooltipProvider>
      </div>
    </div>
  );
}
