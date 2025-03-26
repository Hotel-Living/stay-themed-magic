
import React from 'react';
import { CheckboxFilter } from './CheckboxFilter';
import { useLanguage } from '@/context/LanguageContext';

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
  const { t } = useLanguage();
  
  // Extract just the labels for the CheckboxFilter component
  const amenityLabels = AMENITIES_OPTIONS.map(option => t(`amenities.${option.value}`) || option.label);
  
  // Handle option changes and map back to the expected format
  const handleOptionChange = (selectedOptions: string[]) => {
    onChange(selectedOptions);
  };
  
  return (
    <CheckboxFilter
      title={t("search.filters.amenities")}
      options={amenityLabels}
      selectedOptions={activeFilters}
      onChange={handleOptionChange}
    />
  );
}
