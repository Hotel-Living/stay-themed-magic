
import { useState, useEffect, useMemo } from "react";
import { Review } from "./types";

type SortOption = "newest" | "oldest" | "highest" | "lowest";

interface UseReviewListOptions {
  reviews: Review[];
  reviewsPerPage?: number;
  initialSortOption?: SortOption;
}

interface UseReviewListReturn {
  sortedReviews: Review[];
  currentReviews: Review[];
  currentPage: number;
  totalPages: number;
  sortOption: SortOption;
  handleSortChange: (value: SortOption) => void;
  handlePageChange: (page: number) => void;
}

/**
 * Custom hook to handle review list sorting and pagination
 */
export function useReviewList({
  reviews,
  reviewsPerPage = 5,
  initialSortOption = "newest"
}: UseReviewListOptions): UseReviewListReturn {
  const [sortedReviews, setSortedReviews] = useState<Review[]>([]);
  const [sortOption, setSortOption] = useState<SortOption>(initialSortOption);
  const [currentPage, setCurrentPage] = useState(1);
  
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
  
  // Calculate pagination values
  const totalPages = useMemo(() => 
    Math.ceil(sortedReviews.length / reviewsPerPage),
    [sortedReviews.length, reviewsPerPage]
  );
  
  // Get current page reviews
  const currentReviews = useMemo(() => {
    const indexOfLastReview = currentPage * reviewsPerPage;
    const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
    return sortedReviews.slice(indexOfFirstReview, indexOfLastReview);
  }, [sortedReviews, currentPage, reviewsPerPage]);
  
  // Handle sort option change
  const handleSortChange = (value: SortOption) => {
    setSortOption(value);
    setCurrentPage(1); // Reset to first page when sort changes
  };
  
  // Handle page changes
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  
  return {
    sortedReviews,
    currentReviews,
    currentPage,
    totalPages,
    sortOption,
    handleSortChange,
    handlePageChange
  };
}
