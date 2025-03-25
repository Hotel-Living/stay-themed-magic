
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

// Sort options configuration - easier to maintain
const SORT_OPTIONS = [
  { label: "Price (Low to High)", field: "price_per_month", direction: "asc", icon: SortAsc },
  { label: "Price (High to Low)", field: "price_per_month", direction: "desc", icon: SortDesc },
  { label: "Name (A-Z)", field: "name", direction: "asc", icon: SortAsc },
  { label: "Name (Z-A)", field: "name", direction: "desc", icon: SortDesc },
  { label: "Rating (High to Low)", field: "category", direction: "desc", icon: SortDesc },
];

export function SearchHeader({ isLoading, totalHotels, onSortChange }: SearchHeaderProps) {
  return (
    <div className="glass-card rounded-xl p-4 mb-6">
      <div className="flex justify-between items-center">
        <div>
          {isLoading ? (
            <Skeleton className="h-4 w-24" />
          ) : (
            <span className="text-sm text-white/70">
              Found {totalHotels} hotels
            </span>
          )}
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="ml-auto">
              <ArrowUpDown className="h-4 w-4 mr-2" />
              Sort by
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[200px] bg-popover/90 backdrop-blur-sm">
            {SORT_OPTIONS.map((option) => {
              const Icon = option.icon;
              return (
                <DropdownMenuItem 
                  key={`${option.field}-${option.direction}`}
                  onClick={() => onSortChange(option.field, option.direction as 'asc' | 'desc')}
                >
                  <Icon className="mr-2 h-4 w-4" />
                  {option.label}
                </DropdownMenuItem>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
