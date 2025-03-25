
import { Review } from "@/hooks/useHotelDetail";
import { useEffect, useMemo } from "react";
import { ReviewSorter } from "./ReviewSorter";
import { ReviewListItem } from "./ReviewListItem";
import { ReviewEmptyState } from "./ReviewEmptyState";
import { ReviewListSkeleton } from "./ReviewListSkeleton";
import { ReviewListPagination } from "./ReviewListPagination";
import { ReviewRatingFilter } from "./ReviewRatingFilter";
import { useReviewList } from "@/hooks/hotel-detail/useReviewList";
import { FilterX } from "lucide-react";

interface ReviewListProps {
  reviews: Review[];
  isLoading?: boolean;
}

export function ReviewList({ reviews, isLoading }: ReviewListProps) {
  const {
    currentReviews,
    currentPage,
    totalPages,
    sortOption,
    ratingFilter,
    handleSortChange,
    handlePageChange,
    handleRatingFilterChange,
    filteredReviews,
    sortedReviews
  } = useReviewList({
    reviews,
    reviewsPerPage: 5,
    initialSortOption: "newest"
  });
  
  // Calculate review counts by rating for the filter badges
  const reviewCountsByRating = useMemo(() => {
    const counts: Record<number, number> = {};
    // Initialize all ratings with 0
    [1, 2, 3, 4, 5].forEach(rating => {
      counts[rating] = 0;
    });
    
    // Count reviews for each rating
    sortedReviews.forEach(review => {
      if (counts[review.rating] !== undefined) {
        counts[review.rating]++;
      }
    });
    
    return counts;
  }, [sortedReviews]);
  
  // Handle scroll to top when page changes
  useEffect(() => {
    // This effect is kept separate to maintain the scroll behavior
    const reviewsSection = document.getElementById("reviews-section");
    if (reviewsSection && currentPage > 1) {
      reviewsSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [currentPage]);
  
  if (isLoading) {
    return <ReviewListSkeleton />;
  }
  
  if (reviews.length === 0) {
    return <ReviewEmptyState />;
  }
  
  const showFilteredEmptyState = ratingFilter !== null && filteredReviews.length === 0;
  
  return (
    <div id="reviews-section" className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
        <ReviewRatingFilter 
          onRatingChange={handleRatingFilterChange} 
          currentRating={ratingFilter}
          reviewCounts={reviewCountsByRating}
        />

        <ReviewSorter 
          onSortChange={handleSortChange} 
          initialValue={sortOption} 
        />
      </div>
      
      {filteredReviews.length > 0 && !showFilteredEmptyState ? (
        <>
          <div className="space-y-6 animate-fade-in-up">
            {currentReviews.map((review, index) => (
              <ReviewListItem key={review.id || index} review={review} />
            ))}
          </div>
          
          {totalPages > 1 && (
            <ReviewListPagination 
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </>
      ) : (
        <div className="text-center p-8 bg-background/50 rounded-lg border border-fuchsia-900/10 animate-fade-in">
          <div className="flex justify-center mb-4">
            <div className="p-3 rounded-full bg-secondary/80">
              <FilterX className="h-6 w-6 text-fuchsia-400" />
            </div>
          </div>
          <p className="text-muted-foreground mb-3">
            {ratingFilter !== null 
              ? `No ${ratingFilter}-star reviews found` 
              : "No reviews match your filters"}
          </p>
          {ratingFilter !== null && (
            <button 
              className="text-fuchsia-500 font-medium hover:underline focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:ring-offset-2 focus:ring-offset-background rounded px-2 py-1 transition-colors"
              onClick={() => handleRatingFilterChange(null)}
              aria-label="Clear rating filter"
            >
              Clear filter
            </button>
          )}
        </div>
      )}
    </div>
  );
}
