
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
      verticalLayout={true}
      expandedLayout={false}
      compactSpacing={false}
      formWrapperBgColor="bg-white/10"
    >
      <div className="space-y-4">
        {/* Filter components will be rendered here */}
        <div className="text-white">
          Filters will be implemented here
        </div>
        
        {showSearchButton && (
          <button 
            className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            onClick={() => onFilterChange({})}
          >
            Search
          </button>
        )}
      </div>
    </FilterContainer>
  );
};

export default FilterSidebar;
