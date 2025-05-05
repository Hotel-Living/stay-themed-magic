import { useState } from 'react';
import { FilterContainer } from '@/components/filters/FilterContainer';
import { FilterSection } from '@/components/filters/FilterSection';
import { FilterState } from '@/components/filters';

interface FilterSectionWrapperProps {
  onFilterChange: (filters: FilterState) => void;
  availableThemes: string[];
}

export function FilterSectionWrapper({ onFilterChange, availableThemes }: FilterSectionWrapperProps) {
  const [isFiltersVisible, setIsFiltersVisible] = useState(false);

  // This component is still included but will be hidden by default in the new design
  // The functionality remains the same for compatibility
  return (
    <div className="hidden">
      <FilterContainer>
        <FilterSection 
          onFilterChange={onFilterChange} 
          availableThemes={availableThemes} 
        />
      </FilterContainer>
    </div>
  );
}
