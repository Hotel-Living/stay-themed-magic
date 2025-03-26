
import React from 'react';
import { AmenitiesFilter } from '../AmenitiesFilter';
import { DistanceFilter } from '../DistanceFilter';
import { RatingFilter } from '../RatingFilter';

interface AmenitiesFilterSectionProps {
  activeFilters: {
    amenities?: string[];
    distance?: number | null;
    rating?: number | null;
  };
  handleFilterChange: (key: string, value: any) => void;
  handleArrayFilterChange: (key: string, value: string[]) => void;
}

export function AmenitiesFilterSection({ 
  activeFilters, 
  handleFilterChange,
  handleArrayFilterChange 
}: AmenitiesFilterSectionProps) {
  return (
    <div className="border-t border-foreground/10 pt-4">
      <AmenitiesFilter 
        activeFilters={activeFilters.amenities || []} 
        onChange={(value) => handleArrayFilterChange('amenities', value)} 
      />
      
      <div className="mt-4">
        <DistanceFilter 
          value={activeFilters.distance} 
          onChange={(value) => handleFilterChange('distance', value)} 
        />
      </div>
      
      <div className="mt-4">
        <RatingFilter 
          value={activeFilters.rating} 
          onChange={(value) => handleFilterChange('rating', value)} 
        />
      </div>
    </div>
  );
}
