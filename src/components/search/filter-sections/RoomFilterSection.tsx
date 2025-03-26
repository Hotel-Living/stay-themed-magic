
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

  // Helper function to handle checkbox filter changes
  const handleOptionChange = (key: string, value: string, isChecked: boolean) => {
    const currentValues = activeFilters[key as keyof typeof activeFilters] as string[] || [];
    let newValues: string[];
    
    if (isChecked) {
      newValues = [...currentValues, value];
    } else {
      newValues = currentValues.filter(v => v !== value);
    }
    
    handleArrayFilterChange(key, newValues);
  };

  return (
    <>
      <div className="border-t border-foreground/10 pt-4">
        <CheckboxFilter 
          title="Room Types" 
          options={ROOM_TYPES} 
          selectedValues={activeFilters.roomTypes} 
          onChange={(value, isChecked) => handleOptionChange('roomTypes', value, isChecked)} 
        />
      </div>
      
      <div className="border-t border-foreground/10 pt-4">
        <CheckboxFilter 
          title="Hotel Features" 
          options={HOTEL_FEATURES} 
          selectedValues={activeFilters.hotelFeatures} 
          onChange={(value, isChecked) => handleOptionChange('hotelFeatures', value, isChecked)} 
        />
      </div>
      
      <div className="border-t border-foreground/10 pt-4">
        <CheckboxFilter 
          title="Room Features" 
          options={ROOM_FEATURES} 
          selectedValues={activeFilters.roomFeatures} 
          onChange={(value, isChecked) => handleOptionChange('roomFeatures', value, isChecked)} 
        />
      </div>
      
      <div className="border-t border-foreground/10 pt-4">
        <CheckboxFilter 
          title="Meals" 
          options={MEALS} 
          selectedValues={activeFilters.meals} 
          onChange={(value, isChecked) => handleOptionChange('meals', value, isChecked)} 
        />
      </div>
      
      <div className="border-t border-foreground/10 pt-4">
        <CheckboxFilter 
          title="Activities" 
          options={ACTIVITIES} 
          selectedValues={activeFilters.activities} 
          onChange={(value, isChecked) => handleOptionChange('activities', value, isChecked)} 
        />
      </div>
    </>
  );
}
