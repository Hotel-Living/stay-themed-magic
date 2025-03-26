
import { FilterState } from "./FilterTypes";
import { Search } from "lucide-react";

interface FilterActionsProps {
  hasActiveFilters: boolean;
  clearAllFilters: () => void;
  handleSearch: () => void;
  verticalLayout?: boolean;
  compactSpacing?: boolean;
  searchBgColor: string;
  searchHoverBgColor: string;
}

export function FilterActions({
  hasActiveFilters,
  clearAllFilters,
  handleSearch,
  verticalLayout = false,
  compactSpacing = false,
  searchBgColor,
  searchHoverBgColor
}: FilterActionsProps) {
  return (
    <div className={`flex ${verticalLayout ? "mt-4" : compactSpacing ? "mt-2" : "mt-3"} gap-2`}>
      {hasActiveFilters && (
        <button
          onClick={clearAllFilters}
          className="px-4 py-2 rounded-lg bg-fuchsia-950/50 text-foreground/80 hover:bg-fuchsia-900/30 text-sm transition-colors"
        >
          Clear All
        </button>
      )}
      <button
        onClick={handleSearch}
        className={`flex-1 px-4 py-2 rounded-lg ${searchBgColor} text-white ${searchHoverBgColor} text-sm font-medium transition-colors flex items-center justify-center`}
      >
        <Search className="w-4 h-4 mr-2" /> Search
      </button>
    </div>
  );
}
