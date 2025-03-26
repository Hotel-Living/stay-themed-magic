
import React from 'react';
import { AmenitiesFilter } from '../AmenitiesFilter';

interface AmenitiesFilterSectionProps {
  activeFilters: {
    amenities?: string[];
  };
  handleFilterChange: (key: string, value: any) => void;
  handleArrayFilterChange: (key: string, value: string[]) => void;
}

export function AmenitiesFilterSection({ 
  activeFilters, 
  handleArrayFilterChange 
}: AmenitiesFilterSectionProps) {
  return (
    <div className="border-t border-foreground/10 pt-4">
      <AmenitiesFilter 
        activeFilters={activeFilters.amenities || []} 
        onChange={(value) => handleArrayFilterChange('amenities', value)} 
      />
    </div>
  );
}
