
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
  ratingFilter: number | null;
  handleSortChange: (value: SortOption) => void;
  handlePageChange: (page: number) => void;
  handleRatingFilterChange: (rating: number | null) => void;
  filteredReviews: Review[];
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
  const [ratingFilter, setRatingFilter] = useState<number | null>(null);
  
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

  // Apply rating filter to sorted reviews
  const filteredReviews = useMemo(() => {
    if (ratingFilter === null) {
      return sortedReviews;
    }
    return sortedReviews.filter(review => review.rating === ratingFilter);
  }, [sortedReviews, ratingFilter]);
  
  // Calculate pagination values based on filtered reviews
  const totalPages = useMemo(() => 
    Math.ceil(filteredReviews.length / reviewsPerPage),
    [filteredReviews.length, reviewsPerPage]
  );
  
  // Reset to first page when filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [ratingFilter]);
  
  // Get current page reviews
  const currentReviews = useMemo(() => {
    const indexOfLastReview = currentPage * reviewsPerPage;
    const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
    return filteredReviews.slice(indexOfFirstReview, indexOfLastReview);
  }, [filteredReviews, currentPage, reviewsPerPage]);
  
  // Handle sort option change
  const handleSortChange = (value: SortOption) => {
    setSortOption(value);
    setCurrentPage(1); // Reset to first page when sort changes
  };
  
  // Handle page changes
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Handle rating filter change
  const handleRatingFilterChange = (rating: number | null) => {
    setRatingFilter(rating);
  };
  
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
