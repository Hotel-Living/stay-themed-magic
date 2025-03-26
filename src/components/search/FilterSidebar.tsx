
import React from 'react';
import { PriceRangeFilter } from './PriceRangeFilter';
import { PropertyTypeFilter } from './PropertyTypeFilter';
import { PropertyStyleFilter } from './PropertyStyleFilter';
import { CheckboxFilter } from './CheckboxFilter';
import { CategoryFilter } from './CategoryFilter';
import { CountryFilter } from './CountryFilter';
import { LengthOfStayFilter } from './LengthOfStayFilter';
import { LocationFilter } from './LocationFilter';
import { MonthFilter } from './MonthFilter';
import { ThemeFilter } from './ThemeFilter';
import { FilterActions } from './FilterActions';
import { AmenitiesFilter } from './AmenitiesFilter';
import { DistanceFilter } from './DistanceFilter';
import { RatingFilter } from './RatingFilter';

// Room types options
const ROOM_TYPES = [
  { value: 'single', label: 'Single Room' },
  { value: 'double', label: 'Double Room' },
  { value: 'suite', label: 'Suite' },
  { value: 'penthouse', label: 'Penthouse' },
];

// Hotel features options
const HOTEL_FEATURES = [
  { value: 'pool', label: 'Swimming Pool' },
  { value: 'spa', label: 'Spa' },
  { value: 'gym', label: 'Fitness Center' },
  { value: 'restaurant', label: 'Restaurant' },
  { value: 'bar', label: 'Bar/Lounge' },
];

// Room features options
const ROOM_FEATURES = [
  { value: 'balcony', label: 'Balcony' },
  { value: 'kitchen', label: 'Kitchen' },
  { value: 'jacuzzi', label: 'Jacuzzi' },
  { value: 'workspace', label: 'Workspace' },
];

// Meal options
const MEALS = [
  { value: 'breakfast', label: 'Breakfast Included' },
  { value: 'halfBoard', label: 'Half Board' },
  { value: 'fullBoard', label: 'Full Board' },
  { value: 'allInclusive', label: 'All Inclusive' },
];

// Activities options
const ACTIVITIES = [
  { value: 'hiking', label: 'Hiking' },
  { value: 'skiing', label: 'Skiing' },
  { value: 'snorkeling', label: 'Snorkeling' },
  { value: 'golf', label: 'Golf' },
  { value: 'yoga', label: 'Yoga' },
];

interface FilterSidebarProps {
  activeFilters: {
    priceRange: [number, number] | null;
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
    theme: string | null;
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
  return (
    <div className="glass-card p-5 rounded-xl space-y-4">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-bold">Filters</h2>
        <FilterActions onClearAll={onClearAll} hasActiveFilters={Object.values(activeFilters).some(v => v !== null && (Array.isArray(v) ? v.length > 0 : true))} />
      </div>
      
      <PriceRangeFilter 
        value={activeFilters.priceRange} 
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
      
      <div className="border-t border-foreground/10 pt-4">
        <CountryFilter 
          value={activeFilters.country} 
          onChange={(value) => handleFilterChange('country', value)} 
        />
      </div>
      
      <div className="border-t border-foreground/10 pt-4">
        <MonthFilter 
          value={activeFilters.month} 
          onChange={(value) => handleFilterChange('month', value)} 
        />
      </div>
      
      <div className="border-t border-foreground/10 pt-4">
        <ThemeFilter 
          value={activeFilters.theme} 
          onChange={(value) => handleFilterChange('theme', value)} 
        />
      </div>
      
      <div className="border-t border-foreground/10 pt-4">
        <PropertyTypeFilter 
          value={activeFilters.propertyType} 
          onChange={(value) => handleFilterChange('propertyType', value)} 
        />
      </div>
      
      <div className="border-t border-foreground/10 pt-4">
        <PropertyStyleFilter 
          value={activeFilters.propertyStyle} 
          onChange={(value) => handleFilterChange('propertyStyle', value)} 
        />
      </div>
      
      <div className="border-t border-foreground/10 pt-4">
        <CategoryFilter 
          value={activeFilters.category} 
          onChange={(value) => handleFilterChange('category', value)} 
        />
      </div>
      
      <div className="border-t border-foreground/10 pt-4">
        <LocationFilter 
          value={activeFilters.location} 
          onChange={(value) => handleFilterChange('location', value)} 
        />
      </div>
      
      <div className="border-t border-foreground/10 pt-4">
        <LengthOfStayFilter 
          value={activeFilters.lengthOfStay} 
          onChange={(value) => handleFilterChange('lengthOfStay', value)} 
        />
      </div>
      
      <div className="border-t border-foreground/10 pt-4">
        <AmenitiesFilter 
          activeFilters={activeFilters.amenities || []} 
          onChange={(value) => handleArrayFilterChange('amenities', value)} 
        />
      </div>
      
      <div className="border-t border-foreground/10 pt-4">
        <CheckboxFilter 
          title="Room Types" 
          options={ROOM_TYPES} 
          selectedValues={activeFilters.roomTypes} 
          onChange={(value) => handleArrayFilterChange('roomTypes', value)} 
        />
      </div>
      
      <div className="border-t border-foreground/10 pt-4">
        <CheckboxFilter 
          title="Hotel Features" 
          options={HOTEL_FEATURES} 
          selectedValues={activeFilters.hotelFeatures} 
          onChange={(value) => handleArrayFilterChange('hotelFeatures', value)} 
        />
      </div>
      
      <div className="border-t border-foreground/10 pt-4">
        <CheckboxFilter 
          title="Room Features" 
          options={ROOM_FEATURES} 
          selectedValues={activeFilters.roomFeatures} 
          onChange={(value) => handleArrayFilterChange('roomFeatures', value)} 
        />
      </div>
      
      <div className="border-t border-foreground/10 pt-4">
        <CheckboxFilter 
          title="Meals" 
          options={MEALS} 
          selectedValues={activeFilters.meals} 
          onChange={(value) => handleArrayFilterChange('meals', value)} 
        />
      </div>
      
      <div className="border-t border-foreground/10 pt-4">
        <CheckboxFilter 
          title="Activities" 
          options={ACTIVITIES} 
          selectedValues={activeFilters.activities} 
          onChange={(value) => handleArrayFilterChange('activities', value)} 
        />
      </div>
    </div>
  );
}
