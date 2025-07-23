import React, { useRef, useEffect, useState } from 'react';
import { useGoogleMaps } from '@/hooks/useGoogleMaps';

declare global {
  interface Window {
    google: any;
  }
}

interface AddressAutocompleteProps {
  value?: string;
  onChange?: (value: string) => void;
  onPlaceSelected?: (place: any) => void;
  placeholder?: string;
  className?: string;
}

export const AddressAutocomplete = ({
  value,
  onChange,
  onPlaceSelected,
  placeholder,
  className
}: AddressAutocompleteProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const autocompleteRef = useRef<any>(null);
  const { isLoaded, isLoading, error } = useGoogleMaps();
  const [inputValue, setInputValue] = useState(value || '');

  // Initialize Google Places Autocomplete
  useEffect(() => {
    if (isLoaded && inputRef.current && !autocompleteRef.current) {
      try {
        // Configure autocomplete options
        const options = {
          types: ['address'],
          fields: ['formatted_address', 'geometry', 'address_components', 'place_id']
        };

        autocompleteRef.current = new window.google.maps.places.Autocomplete(
          inputRef.current,
          options
        );

        // Add place selection listener
        autocompleteRef.current.addListener('place_changed', () => {
          const place = autocompleteRef.current?.getPlace();
          
          if (place && place.formatted_address) {
            setInputValue(place.formatted_address);
            
            if (onChange) {
              onChange(place.formatted_address);
            }
            
            if (onPlaceSelected) {
              onPlaceSelected(place);
            }
          }
        });
      } catch (error) {
        console.error('Failed to initialize Google Places Autocomplete:', error);
      }
    }

    return () => {
      if (autocompleteRef.current) {
        window.google?.maps?.event?.clearInstanceListeners(autocompleteRef.current);
      }
    };
  }, [isLoaded, onChange, onPlaceSelected]);

  // Handle manual input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    
    if (onChange) {
      onChange(newValue);
    }
  };

  // Update input value when prop changes
  useEffect(() => {
    if (value !== undefined && value !== inputValue) {
      setInputValue(value);
    }
  }, [value]);

  // Show loading state while Google Maps is loading
  if (isLoading) {
    return (
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Loading address autocomplete..."
        className={className}
        disabled
      />
    );
  }

  // Show error state if Google Maps failed to load
  if (error) {
    return (
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder={placeholder}
        className={className}
        title="Address autocomplete unavailable - you can still enter addresses manually"
      />
    );
  }

  // Show regular input if Google Maps is not loaded
  if (!isLoaded) {
    return (
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder={placeholder}
        className={className}
      />
    );
  }

  // Show Google Places autocomplete input
  return (
    <input
      ref={inputRef}
      type="text"
      value={inputValue}
      onChange={handleInputChange}
      placeholder={placeholder}
      className={className}
      autoComplete="off"
    />
  );
};