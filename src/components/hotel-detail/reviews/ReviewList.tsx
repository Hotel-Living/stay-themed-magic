
import { Review } from "@/hooks/useHotelDetail";
import { useEffect } from "react";
import { ReviewSorter } from "./ReviewSorter";
import { ReviewListItem } from "./ReviewListItem";
import { ReviewEmptyState } from "./ReviewEmptyState";
import { ReviewListSkeleton } from "./ReviewListSkeleton";
import { ReviewListPagination } from "./ReviewListPagination";
import { ReviewRatingFilter } from "./ReviewRatingFilter";
import { useReviewList } from "@/hooks/hotel-detail/useReviewList";

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
    filteredReviews
  } = useReviewList({
    reviews,
    reviewsPerPage: 5,
    initialSortOption: "newest"
  });
  
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
        />

        <ReviewSorter 
          onSortChange={handleSortChange} 
          initialValue={sortOption} 
        />
      </div>
      
      {filteredReviews.length > 0 && !showFilteredEmptyState ? (
        <>
          {currentReviews.map((review, index) => (
            <ReviewListItem key={review.id || index} review={review} />
          ))}
          
          <ReviewListPagination 
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      ) : (
        <div className="text-center p-8 bg-background/50 rounded-lg border border-fuchsia-900/10">
          <p className="text-muted-foreground">
            {ratingFilter !== null 
              ? `No ${ratingFilter}-star reviews found` 
              : "No reviews match your filters"}
          </p>
          {ratingFilter !== null && (
            <button 
              className="text-fuchsia-500 mt-2 text-sm hover:underline"
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
