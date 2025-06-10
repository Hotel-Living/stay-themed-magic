
import React from "react";
import { FilterState } from "@/components/filters/FilterTypes";
import { FilterContainer } from "@/components/filters/FilterContainer";

interface HotelFiltersProps {
  filters: FilterState;
  onFiltersChange: (newFilters: Partial<FilterState>) => void;
}

export function HotelFilters({ filters, onFiltersChange }: HotelFiltersProps) {
  return (
    <div className="mb-8">
      <FilterContainer 
        filters={filters}
        onFiltersChange={onFiltersChange}
      />
    </div>
  );
}
