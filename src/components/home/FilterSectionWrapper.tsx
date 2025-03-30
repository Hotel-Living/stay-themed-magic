
import { useState } from 'react';
import { FilterSection, FilterState } from '@/components/filters';
import { allThemes } from '@/utils/themes';

interface FilterSectionWrapperProps {
  onFilterChange: (filters: FilterState) => void;
  availableThemes?: string[];
}

export function FilterSectionWrapper({ onFilterChange, availableThemes = [] }: FilterSectionWrapperProps) {
  // If no availableThemes are provided, use theme names from allThemes
  const themes = availableThemes.length > 0 ? availableThemes : allThemes.map(theme => theme.name);
  
  return (
    <section className="py-0 px-4">
      <div className="container max-w-6xl mx-auto">
        <FilterSection 
          onFilterChange={onFilterChange} 
          showSearchButton={true} 
          placeholders={{
            month: "Month?",
            country: "Country?",
            theme: "Theme?",
            priceRange: "Price per Month?"
          }}
          useCollapsibleThemes={true}
          expandedLayout={true}
          compactSpacing={true}
          useBoldLabels={true}
          usePurpleFilterBackground={true}
          availableThemes={themes}
        />
      </div>
    </section>
  );
}
