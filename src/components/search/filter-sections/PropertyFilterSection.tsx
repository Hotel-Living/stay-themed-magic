
import React from 'react';
import { PropertyTypeFilter } from '../PropertyTypeFilter';
import { PropertyStyleFilter } from '../PropertyStyleFilter';
import { CategoryFilter } from '../CategoryFilter';

interface PropertyFilterSectionProps {
  activeFilters: {
    propertyType: string | null;
    propertyStyle: string | null;
    category: string | null;
  };
  handleFilterChange: (key: string, value: any) => void;
}

export function PropertyFilterSection({ 
  activeFilters, 
  handleFilterChange 
}: PropertyFilterSectionProps) {
  return (
    <>
      <div className="border-t border-foreground/10 pt-4">
        <PropertyTypeFilter 
          activePropertyType={activeFilters.propertyType} 
          onChange={(value) => handleFilterChange('propertyType', value)} 
        />
      </div>
      
      <div className="border-t border-foreground/10 pt-4">
        <PropertyStyleFilter 
          activePropertyStyle={activeFilters.propertyStyle} 
          onChange={(value) => handleFilterChange('propertyStyle', value)} 
        />
      </div>
      
      <div className="border-t border-foreground/10 pt-4">
        <CategoryFilter 
          activeCategory={activeFilters.category} 
          onChange={(value) => handleFilterChange('category', value)} 
        />
      </div>
    </>
  );
}
