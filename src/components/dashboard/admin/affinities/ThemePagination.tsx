
import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { PaginationState } from "./types";

interface ThemePaginationProps {
  pagination: PaginationState;
  onPageChange: (page: number) => void;
}

export const ThemePagination: React.FC<ThemePaginationProps> = ({
  pagination,
  onPageChange,
}) => {
  const { currentPage, pageSize, totalCount } = pagination;
  const totalPages = Math.ceil(totalCount / pageSize);
  
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  if (totalCount <= pageSize) {
    return null; // Don't show pagination if all items fit on one page
  }

  return (
    <Pagination className="mt-4">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious 
            onClick={handlePrevious} 
            disabled={currentPage === 1}
            className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
          />
        </PaginationItem>
        
        <PaginationItem className="flex items-center">
          <span className="text-sm">
            Page {currentPage} of {totalPages}
          </span>
        </PaginationItem>
        
        <PaginationItem>
          <PaginationNext 
            onClick={handleNext} 
            disabled={currentPage >= totalPages}
            className={currentPage >= totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
