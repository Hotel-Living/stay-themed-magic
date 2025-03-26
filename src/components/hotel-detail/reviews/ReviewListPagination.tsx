
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface ReviewListPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function ReviewListPagination({ 
  currentPage, 
  totalPages, 
  onPageChange 
}: ReviewListPaginationProps) {
  if (totalPages <= 1) {
    return null;
  }
  
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
              onClick={() => onPageChange(i)}
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
  
  return (
    <Pagination className="mt-6">
      <PaginationContent>
        {currentPage > 1 && (
          <PaginationItem>
            <PaginationPrevious 
              aria-label="Go to previous page" 
              onClick={() => onPageChange(currentPage - 1)} 
            />
          </PaginationItem>
        )}
        
        {getPaginationItems()}
        
        {currentPage < totalPages && (
          <PaginationItem>
            <PaginationNext 
              aria-label="Go to next page" 
              onClick={() => onPageChange(currentPage + 1)} 
            />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}
