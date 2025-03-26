
import React from 'react';
import { PriceRangeFilter } from '../PriceRangeFilter';
import { RatingFilter } from '../RatingFilter';
import { DistanceFilter } from '../DistanceFilter';

interface PriceFilterSectionProps {
  activeFilters: {
    priceRange: number | null;
    rating?: number | null;
    distance?: number | null;
  };
  handleFilterChange: (key: string, value: any) => void;
}

export function PriceFilterSection({ 
  activeFilters, 
  handleFilterChange 
}: PriceFilterSectionProps) {
  return (
    <>
      <PriceRangeFilter 
        activePrice={activeFilters.priceRange} 
        onChange={(value) => handleFilterChange('priceRange', value)} 
      />
      
      <div className="border-t border-foreground/10 pt-4">
        <RatingFilter 
          value={activeFilters.rating || null} 
          onChange={(value) => handleFilterChange('rating', value)} 
        />
      </div>
      
      <div className="border-t border-foreground/10 pt-4">
        <DistanceFilter 
          value={activeFilters.distance || null} 
          onChange={(value) => handleFilterChange('distance', value)} 
        />
      </div>
    </>
  );
}
