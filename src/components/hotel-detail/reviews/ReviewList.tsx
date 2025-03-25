
import { Review } from "@/hooks/useHotelDetail";
import { User, Star } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";
import { ReviewSorter } from "./ReviewSorter";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

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
  
  // Get pagination items
  const getPaginationItems = () => {
    let items = [];
    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 || 
        i === totalPages || 
        (i >= currentPage - 1 && i <= currentPage + 1)
      ) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink 
              isActive={i === currentPage} 
              onClick={() => handlePageChange(i)}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      } else if (
        i === currentPage - 2 || 
        i === currentPage + 2
      ) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink className="cursor-default">...</PaginationLink>
          </PaginationItem>
        );
      }
    }
    return items;
  };

  if (isLoading) {
    return (
      <>
        <div className="flex items-center gap-4 mb-6">
          <Skeleton className="h-16 w-16 rounded-full" />
          <div className="space-y-2 flex-1">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-16 w-full" />
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <Skeleton className="h-16 w-16 rounded-full" />
          <div className="space-y-2 flex-1">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-16 w-full" />
          </div>
        </div>
      </>
    );
  }
  
  if (reviews.length === 0) {
    return (
      <p className="text-foreground/60 italic text-center py-4">
        No reviews yet. Be the first to share your experience!
      </p>
    );
  }
  
  return (
    <div id="reviews-section" className="space-y-6">
      <div className="flex justify-end mb-4">
        <ReviewSorter onSortChange={handleSortChange} />
      </div>
      
      {currentReviews.map((review, index) => (
        <div key={review.id || index} className="border-t border-fuchsia-900/20 pt-4">
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-fuchsia-800/30 flex items-center justify-center">
              <User className="w-5 h-5 text-fuchsia-300" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className="font-medium">{review.user_name || "Anonymous"}</span>
                <div className="flex items-center">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-3 h-3 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400'}`} 
                    />
                  ))}
                </div>
                {review.created_at && (
                  <span className="text-xs text-foreground/60">
                    {new Date(review.created_at).toLocaleDateString()}
                  </span>
                )}
              </div>
              <p className="text-foreground/80">{review.comment}</p>
            </div>
          </div>
        </div>
      ))}
      
      {totalPages > 1 && (
        <Pagination className="mt-6">
          <PaginationContent>
            {currentPage > 1 && (
              <PaginationItem>
                <PaginationPrevious onClick={() => handlePageChange(currentPage - 1)} />
              </PaginationItem>
            )}
            
            {getPaginationItems()}
            
            {currentPage < totalPages && (
              <PaginationItem>
                <PaginationNext onClick={() => handlePageChange(currentPage + 1)} />
              </PaginationItem>
            )}
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}
