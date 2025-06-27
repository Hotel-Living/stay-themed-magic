
import React from "react";
import { FilterState } from "./FilterTypes";
import { FilterContainer } from "./FilterContainer";

interface FilterSidebarProps {
  onFilterChange: (filters: FilterState) => void;
  showSearchButton?: boolean;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({ 
  onFilterChange, 
  showSearchButton = true 
}) => {
  return (
    <FilterContainer 
      onFilterChange={onFilterChange}
      showSearchButton={showSearchButton}
    />
  );
};

export default FilterSidebar;
