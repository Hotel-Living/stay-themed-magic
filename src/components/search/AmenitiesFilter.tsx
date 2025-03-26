import React from 'react';
import { CheckboxFilter } from './CheckboxFilter';

interface AmenitiesFilterProps {
  activeFilters: string[];
  onChange: (values: string[]) => void;
}

const AMENITIES_OPTIONS = [
  { value: 'wifi', label: 'Free WiFi' },
  { value: 'pool', label: 'Swimming Pool' },
  { value: 'spa', label: 'Spa & Wellness' },
  { value: 'gym', label: 'Fitness Center' },
  { value: 'restaurant', label: 'Restaurant' },
  { value: 'bar', label: 'Bar/Lounge' },
  { value: 'parking', label: 'Free Parking' },
  { value: 'roomService', label: 'Room Service' },
  { value: 'airportShuttle', label: 'Airport Shuttle' },
  { value: 'petFriendly', label: 'Pet Friendly' }
];

export function AmenitiesFilter({ activeFilters, onChange }: AmenitiesFilterProps) {
  const handleOptionChange = (selectedOptions: string[]) => {
    onChange(selectedOptions);
  };
  
  return (
    <CheckboxFilter
      title="Amenities"
      options={AMENITIES_OPTIONS.map(option => option.label)}
      selectedOptions={activeFilters}
      onChange={handleOptionChange}
    />
  );
}
