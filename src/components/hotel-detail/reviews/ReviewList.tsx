
import { Review } from "@/hooks/useHotelDetail";
import { useEffect } from "react";
import { ReviewSorter } from "./ReviewSorter";
import { ReviewListItem } from "./ReviewListItem";
import { ReviewEmptyState } from "./ReviewEmptyState";
import { ReviewListSkeleton } from "./ReviewListSkeleton";
import { ReviewListPagination } from "./ReviewListPagination";
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
    handleSortChange,
    handlePageChange
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
  
  return (
    <div id="reviews-section" className="space-y-6">
      <div className="flex justify-end mb-4">
        <ReviewSorter 
          onSortChange={handleSortChange} 
          initialValue={sortOption} 
        />
      </div>
      
      {currentReviews.map((review, index) => (
        <ReviewListItem key={review.id || index} review={review} />
      ))}
      
      <ReviewListPagination 
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
