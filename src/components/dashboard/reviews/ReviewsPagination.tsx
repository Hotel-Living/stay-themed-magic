
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ReviewsPaginationProps {
  currentPage: number;
  totalPages: number;
  totalReviews: number;
  reviewsPerPage: number;
  currentCount: number;
  onPageChange: (page: number) => void;
}

export function ReviewsPagination({
  currentPage,
  totalPages,
  totalReviews,
  reviewsPerPage,
  currentCount,
  onPageChange
}: ReviewsPaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-between items-center mt-6">
      <div className="text-sm text-foreground/70">
        Showing {currentCount} of {totalReviews} reviews
      </div>
      <div className="flex items-center gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <span className="text-sm">
          Page {currentPage} of {totalPages}
        </span>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
