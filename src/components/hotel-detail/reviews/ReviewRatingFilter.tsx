
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface ReviewRatingFilterProps {
  onRatingChange: (rating: number | null) => void;
  currentRating: number | null;
}

export function ReviewRatingFilter({ onRatingChange, currentRating }: ReviewRatingFilterProps) {
  const ratings = [5, 4, 3, 2, 1];

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
      <span className="text-sm text-muted-foreground whitespace-nowrap">Filter by:</span>
      <div className="flex flex-wrap gap-1">
        <TooltipProvider>
          {ratings.map((rating) => (
            <Tooltip key={rating}>
              <TooltipTrigger asChild>
                <Button
                  size="sm"
                  variant="outline"
                  className={cn(
                    "h-8 px-2 border-fuchsia-900/20 hover:bg-fuchsia-900/10 hover:text-foreground transition-colors",
                    currentRating === rating && "bg-fuchsia-900/20 text-foreground font-medium"
                  )}
                  onClick={() => onRatingChange(currentRating === rating ? null : rating)}
                  aria-pressed={currentRating === rating}
                  aria-label={`${rating} star reviews`}
                >
                  <span className="mr-1">{rating}</span>
                  <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top" align="center" className="text-xs">
                Show only {rating}-star reviews
              </TooltipContent>
            </Tooltip>
          ))}
          {currentRating !== null && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-8 px-2 text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => onRatingChange(null)}
                  aria-label="Clear filter"
                >
                  Clear
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top" align="center" className="text-xs">
                Show all reviews
              </TooltipContent>
            </Tooltip>
          )}
        </TooltipProvider>
      </div>
    </div>
  );
}
