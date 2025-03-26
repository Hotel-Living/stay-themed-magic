
import React from 'react';
import { CheckboxFilter } from '../CheckboxFilter';

interface RoomFilterSectionProps {
  activeFilters: {
    roomTypes: string[];
    hotelFeatures: string[];
    roomFeatures: string[];
    meals: string[];
    activities: string[];
  };
  handleArrayFilterChange: (key: string, value: string[]) => void;
}

export function RoomFilterSection({ 
  activeFilters, 
  handleArrayFilterChange 
}: RoomFilterSectionProps) {
  const ROOM_TYPES = [
    'Single Room',
    'Double Room',
    'Suite',
    'Penthouse'
  ];

  const HOTEL_FEATURES = [
    'Swimming Pool',
    'Spa',
    'Fitness Center',
    'Restaurant',
    'Bar/Lounge'
  ];

  const ROOM_FEATURES = [
    'Balcony',
    'Kitchen',
    'Jacuzzi',
    'Workspace'
  ];

  const MEALS = [
    'Breakfast Included',
    'Half Board',
    'Full Board',
    'All Inclusive'
  ];

  const ACTIVITIES = [
    'Hiking',
    'Skiing',
    'Snorkeling',
    'Golf',
    'Yoga'
  ];

  return (
    <>
      <div className="border-t border-foreground/10 pt-4">
        <CheckboxFilter 
          title="Room Types" 
          options={ROOM_TYPES}
          selectedOptions={activeFilters.roomTypes}
          onChange={(value) => handleArrayFilterChange('roomTypes', value)}
        />
      </div>
      
      <div className="border-t border-foreground/10 pt-4">
        <CheckboxFilter 
          title="Hotel Features" 
          options={HOTEL_FEATURES}
          selectedOptions={activeFilters.hotelFeatures}
          onChange={(value) => handleArrayFilterChange('hotelFeatures', value)}
        />
      </div>
      
      <div className="border-t border-foreground/10 pt-4">
        <CheckboxFilter 
          title="Room Features" 
          options={ROOM_FEATURES}
          selectedOptions={activeFilters.roomFeatures}
          onChange={(value) => handleArrayFilterChange('roomFeatures', value)}
        />
      </div>
      
      <div className="border-t border-foreground/10 pt-4">
        <CheckboxFilter 
          title="Meals" 
          options={MEALS}
          selectedOptions={activeFilters.meals}
          onChange={(value) => handleArrayFilterChange('meals', value)}
        />
      </div>
      
      <div className="border-t border-foreground/10 pt-4">
        <CheckboxFilter 
          title="Activities" 
          options={ACTIVITIES}
          selectedOptions={activeFilters.activities}
          onChange={(value) => handleArrayFilterChange('activities', value)}
        />
      </div>
    </>
  );
}
