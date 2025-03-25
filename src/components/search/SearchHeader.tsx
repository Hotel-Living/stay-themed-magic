
import { SortOption } from "@/hooks/useHotels";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  DropdownMenu, 
  DropdownMenuTrigger, 
  DropdownMenuContent, 
  DropdownMenuItem
} from "@/components/ui/dropdown-menu";
import { ArrowUpDown, SortAsc, SortDesc } from "lucide-react";

interface SearchHeaderProps {
  isLoading: boolean;
  totalHotels: number;
  onSortChange: (field: string, direction: 'asc' | 'desc') => void;
}

export function SearchHeader({ isLoading, totalHotels, onSortChange }: SearchHeaderProps) {
  return (
    <div className="glass-card rounded-xl p-4 mb-6">
      <div className="flex justify-between items-center">
        <div>
          <span className="text-sm text-white/70">
            {isLoading ? (
              <Skeleton className="h-4 w-24" />
            ) : (
              `Found ${totalHotels} hotels`
            )}
          </span>
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="ml-auto">
              <ArrowUpDown className="h-4 w-4 mr-2" />
              Sort by
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[200px]">
            <DropdownMenuItem onClick={() => onSortChange('price_per_month', 'asc')}>
              <SortAsc className="mr-2 h-4 w-4" />
              Price (Low to High)
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onSortChange('price_per_month', 'desc')}>
              <SortDesc className="mr-2 h-4 w-4" />
              Price (High to Low)
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onSortChange('name', 'asc')}>
              <SortAsc className="mr-2 h-4 w-4" />
              Name (A-Z)
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onSortChange('name', 'desc')}>
              <SortDesc className="mr-2 h-4 w-4" />
              Name (Z-A)
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onSortChange('category', 'desc')}>
              <SortDesc className="mr-2 h-4 w-4" />
              Rating (High to Low)
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
