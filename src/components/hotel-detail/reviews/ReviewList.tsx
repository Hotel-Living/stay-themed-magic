
import { Review } from "@/hooks/useHotelDetail";
import { useEffect, useState } from "react";
import { ReviewSorter } from "./ReviewSorter";
import { ReviewListItem } from "./ReviewListItem";
import { ReviewEmptyState } from "./ReviewEmptyState";
import { ReviewListSkeleton } from "./ReviewListSkeleton";
import { ReviewListPagination } from "./ReviewListPagination";

interface ReviewListProps {
  reviews: Review[];
  isLoading?: boolean;
}

export function ReviewList({ reviews, isLoading }: ReviewListProps) {
  const [sortedReviews, setSortedReviews] = useState<Review[]>([]);
  const [sortOption, setSortOption] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 5;
  
  // Apply sorting whenever sort option or reviews change
  useEffect(() => {
    if (!reviews || reviews.length === 0) {
      setSortedReviews([]);
      return;
    }
    
    const sortReviews = [...reviews];
    
    switch(sortOption) {
      case "newest":
        sortReviews.sort((a, b) => 
          new Date(b.created_at || "").getTime() - new Date(a.created_at || "").getTime()
        );
        break;
      case "oldest":
        sortReviews.sort((a, b) => 
          new Date(a.created_at || "").getTime() - new Date(b.created_at || "").getTime()
        );
        break;
      case "highest":
        sortReviews.sort((a, b) => b.rating - a.rating);
        break;
      case "lowest":
        sortReviews.sort((a, b) => a.rating - b.rating);
        break;
      default:
        break;
    }
    
    setSortedReviews(sortReviews);
  }, [reviews, sortOption]);
  
  // Handle sort option change
  const handleSortChange = (value: string) => {
    setSortOption(value);
    setCurrentPage(1); // Reset to first page when sort changes
  };
  
  // Calculate pagination values
  const totalPages = Math.ceil(sortedReviews.length / reviewsPerPage);
  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = sortedReviews.slice(indexOfFirstReview, indexOfLastReview);
  
  // Handle page changes
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to the top of the review section
    document.getElementById("reviews-section")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  
  if (isLoading) {
    return <ReviewListSkeleton />;
  }
  
  if (reviews.length === 0) {
    return <ReviewEmptyState />;
  }
  
  return (
    <div id="reviews-section" className="space-y-6">
      <div className="flex justify-end mb-4">
        <ReviewSorter onSortChange={handleSortChange} initialValue={sortOption} />
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
