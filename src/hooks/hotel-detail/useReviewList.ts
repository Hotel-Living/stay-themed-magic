
import { useState, useEffect, useMemo, useCallback } from "react";
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
  ratingFilter: number | null;
  handleSortChange: (value: SortOption) => void;
  handlePageChange: (page: number) => void;
  handleRatingFilterChange: (rating: number | null) => void;
  filteredReviews: Review[];
}

/**
 * Custom hook to handle review list sorting, filtering and pagination
 */
export function useReviewList({
  reviews,
  reviewsPerPage = 5,
  initialSortOption = "newest"
}: UseReviewListOptions): UseReviewListReturn {
  const [sortOption, setSortOption] = useState<SortOption>(initialSortOption);
  const [currentPage, setCurrentPage] = useState(1);
  const [ratingFilter, setRatingFilter] = useState<number | null>(null);
  
  // Apply sorting whenever sort option or reviews change
  const sortedReviews = useMemo(() => {
    if (!reviews || reviews.length === 0) {
      return [];
    }
    
    const sortReviews = [...reviews];
    
    switch(sortOption) {
      case "newest":
        return sortReviews.sort((a, b) => 
          new Date(b.created_at || "").getTime() - new Date(a.created_at || "").getTime()
        );
      case "oldest":
        return sortReviews.sort((a, b) => 
          new Date(a.created_at || "").getTime() - new Date(b.created_at || "").getTime()
        );
      case "highest":
        return sortReviews.sort((a, b) => b.rating - a.rating);
      case "lowest":
        return sortReviews.sort((a, b) => a.rating - b.rating);
      default:
        return sortReviews;
    }
  }, [reviews, sortOption]);

  // Apply rating filter to sorted reviews
  const filteredReviews = useMemo(() => {
    if (ratingFilter === null) {
      return sortedReviews;
    }
    return sortedReviews.filter(review => review.rating === ratingFilter);
  }, [sortedReviews, ratingFilter]);
  
  // Calculate pagination values based on filtered reviews
  const totalPages = useMemo(() => 
    Math.max(1, Math.ceil(filteredReviews.length / reviewsPerPage)),
    [filteredReviews.length, reviewsPerPage]
  );
  
  // Reset to first page when filter or sort changes
  useEffect(() => {
    setCurrentPage(1);
  }, [ratingFilter, sortOption]);
  
  // Get current page reviews
  const currentReviews = useMemo(() => {
    const indexOfLastReview = currentPage * reviewsPerPage;
    const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
    return filteredReviews.slice(indexOfFirstReview, indexOfLastReview);
  }, [filteredReviews, currentPage, reviewsPerPage]);
  
  // Memoize handlers to prevent unnecessary re-renders
  const handleSortChange = useCallback((value: SortOption) => {
    setSortOption(value);
  }, []);
  
  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(Math.min(Math.max(1, page), totalPages));
  }, [totalPages]);

  const handleRatingFilterChange = useCallback((rating: number | null) => {
    setRatingFilter(rating);
  }, []);
  
  return {
    sortedReviews,
    filteredReviews,
    currentReviews,
    currentPage,
    totalPages,
    sortOption,
    ratingFilter,
    handleSortChange,
    handlePageChange,
    handleRatingFilterChange
  };
}
