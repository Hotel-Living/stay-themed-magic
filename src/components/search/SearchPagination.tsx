
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface SearchPaginationProps {
  page: number;
  hasMore: boolean;
  onPageChange: (newPage: number) => void;
}

export function SearchPagination({ page, hasMore, onPageChange }: SearchPaginationProps) {
  return (
    <div className="mt-8 flex justify-center">
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </Button>
        
        <span className="text-sm text-white/70 px-2">
          Page {page}
        </span>
        
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(page + 1)}
          disabled={!hasMore}
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
