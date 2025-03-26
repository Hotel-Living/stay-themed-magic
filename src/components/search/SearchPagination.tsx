
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface SearchPaginationProps {
  page: number;
  total: number;
  pageSize: number;
  onChange: (page: number) => void;
}

export function SearchPagination({ page, total, pageSize, onChange }: SearchPaginationProps) {
  const totalPages = Math.ceil(total / pageSize);
  
  const handlePrevious = () => {
    if (page > 1) {
      onChange(page - 1);
    }
  };
  
  const handleNext = () => {
    if (page < totalPages) {
      onChange(page + 1);
    }
  };
  
  // If there's only one page, don't render pagination
  if (totalPages <= 1) {
    return null;
  }
  
  return (
    <div className="flex items-center justify-center gap-2">
      <Button
        variant="outline"
        size="icon"
        onClick={handlePrevious}
        disabled={page === 1}
      >
        <ChevronLeft className="h-4 w-4" />
        <span className="sr-only">Previous page</span>
      </Button>
      
      <div className="flex items-center gap-1">
        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
          // Show pages around the current page
          let pageNum = page;
          if (totalPages <= 5) {
            // If total pages is 5 or less, show all pages
            pageNum = i + 1;
          } else if (page <= 3) {
            // If current page is near the beginning
            pageNum = i + 1;
          } else if (page >= totalPages - 2) {
            // If current page is near the end
            pageNum = totalPages - 4 + i;
          } else {
            // If current page is in the middle
            pageNum = page - 2 + i;
          }
          
          return (
            <Button
              key={pageNum}
              variant={page === pageNum ? "default" : "outline"}
              size="sm"
              onClick={() => onChange(pageNum)}
              className="h-8 w-8"
            >
              {pageNum}
            </Button>
          );
        })}
      </div>
      
      <Button
        variant="outline"
        size="icon"
        onClick={handleNext}
        disabled={page === totalPages}
      >
        <ChevronRight className="h-4 w-4" />
        <span className="sr-only">Next page</span>
      </Button>
    </div>
  );
}
