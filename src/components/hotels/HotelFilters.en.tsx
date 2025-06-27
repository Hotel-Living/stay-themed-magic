
import React from "react";
import { FilterState } from "@/components/filters/FilterTypes";
import { FilterSection } from "@/components/filters/FilterSection";

interface HotelFiltersENProps {
  filters: FilterState;
  onFiltersChange: (newFilters: Partial<FilterState>) => void;
}

export default function HotelFiltersEN({ filters, onFiltersChange }: HotelFiltersENProps) {
  return (
    <div className="mb-8">
      <FilterSection 
        onFilterChange={onFiltersChange}
        showSearchButton={true}
        verticalLayout={false}
        useCollapsibleThemes={true}
        expandedLayout={true}
        compactSpacing={false}
        useBoldLabels={true}
        usePurpleFilterBackground={true}
        placeholders={{
          country: "Country",
          month: "Month", 
          theme: "Affinity",
          priceRange: "Price per Month"
        }}
        useLargerMobileText={true}
      />
    </div>
  );
}
