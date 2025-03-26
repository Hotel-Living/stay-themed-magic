
import React from 'react';
import { RoomFilterSection } from './filter-sections/RoomFilterSection';
import { PropertyFilterSection } from './filter-sections/PropertyFilterSection';
import { TravelFilterSection } from './filter-sections/TravelFilterSection';
import { AmenitiesFilterSection } from './filter-sections/AmenitiesFilterSection';
import { PriceFilterSection } from './filter-sections/PriceFilterSection';
import { FilterActions } from './FilterActions';

// Interface for the FilterSidebar component
interface FilterSidebarProps {
  activeFilters: {
    priceRange: number | null;
    propertyType: string | null;
    propertyStyle: string | null;
    roomTypes: string[];
    hotelFeatures: string[];
    roomFeatures: string[];
    meals: string[];
    lengthOfStay: string | null;
    activities: string[];
    location: string | null;
    category: string | null;
    country: string | null;
    month: string | null;
    theme: any | null;
    amenities?: string[];
    distance?: number | null;
    rating?: number | null;
  };
  handleFilterChange: (key: string, value: any) => void;
  handleArrayFilterChange: (key: string, value: string[]) => void;
  onClearAll?: () => void;
}

export function FilterSidebar({ 
  activeFilters, 
  handleFilterChange, 
  handleArrayFilterChange,
  onClearAll 
}: FilterSidebarProps) {
  // Calculate if any active filters exist
  const hasActiveFilters = Object.values(activeFilters).some(v => 
    v !== null && (Array.isArray(v) ? v.length > 0 : true)
  );
  
  return (
    <div className="glass-card p-5 rounded-xl space-y-4">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-bold">Filters</h2>
        <FilterActions 
          onClearAll={onClearAll} 
          hasActiveFilters={hasActiveFilters} 
        />
      </div>
      
      <PriceFilterSection 
        activeFilters={activeFilters}
        handleFilterChange={handleFilterChange}
      />
      
      <TravelFilterSection 
        activeFilters={activeFilters}
        handleFilterChange={handleFilterChange}
      />
      
      <PropertyFilterSection 
        activeFilters={activeFilters}
        handleFilterChange={handleFilterChange}
      />
      
      <AmenitiesFilterSection 
        activeFilters={activeFilters}
        handleFilterChange={handleFilterChange}
        handleArrayFilterChange={handleArrayFilterChange}
      />
      
      <RoomFilterSection 
        activeFilters={activeFilters}
        handleArrayFilterChange={handleArrayFilterChange}
      />
    </div>
  );
}
