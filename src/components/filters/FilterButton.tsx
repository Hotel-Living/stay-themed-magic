
import React from "react";
import { Search } from "lucide-react";

interface FilterButtonProps {
  hasActiveFilters: boolean;
  onClearAllFilters: () => void;
  onSearch: () => void;
  searchBgColor: string;
  searchHoverBgColor: string;
}

export const FilterButton: React.FC<FilterButtonProps> = ({
  hasActiveFilters,
  onClearAllFilters,
  onSearch,
  searchBgColor,
  searchHoverBgColor,
}) => {
  return (
    <div className="flex gap-2">
      {hasActiveFilters && (
        <button
          onClick={onClearAllFilters}
          className="px-4 py-2 rounded-lg bg-fuchsia-950/50 text-foreground/80 hover:bg-fuchsia-900/30 text-sm transition-colors"
        >
          Clear All
        </button>
      )}
      <button
        onClick={onSearch}
        className={`flex-1 px-4 py-2 rounded-lg ${searchBgColor} text-white ${searchHoverBgColor} text-sm font-medium transition-colors flex items-center justify-center`}
      >
        <Search className="w-4 h-4 mr-2" /> Search
      </button>
    </div>
  );
};
