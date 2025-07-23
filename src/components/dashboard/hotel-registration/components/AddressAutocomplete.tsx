import React, { useRef, useEffect, useState } from 'react';

declare global {
  interface Window {
    google: any;
  }
}

interface AddressAutocompleteProps {
  value?: string;
  onChange?: (value: string) => void;
  onPlaceSelected?: (place: any) => void;
  onAddressComponents?: (components: any) => void;
  placeholder?: string;
  className?: string;
}

export const AddressAutocomplete = ({
  value = '',
  onChange,
  onPlaceSelected,
  onAddressComponents,
  placeholder,
  className
}: AddressAutocompleteProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const autocompleteRef = useRef<any>(null);
  const [inputValue, setInputValue] = useState(value);
  const [isGoogleMapsLoaded, setIsGoogleMapsLoaded] = useState(false);

  // Load Google Maps script
  useEffect(() => {
    const loadGoogleMaps = () => {
      if (window.google && window.google.maps) {
        setIsGoogleMapsLoaded(true);
        return;
      }

      // Since this is connected to Supabase, we'll add a secret form for the API key
      const apiKey = 'YOUR_GOOGLE_MAPS_API_KEY'; // This will be replaced with Supabase secret
      
      if (!apiKey || apiKey === 'YOUR_GOOGLE_MAPS_API_KEY') {
        console.warn('Google Maps API key not found - using manual input mode');
        return;
      }

      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
      script.async = true;
      script.defer = true;

      script.onload = () => {
        setIsGoogleMapsLoaded(true);
      };

      script.onerror = () => {
        console.warn('Failed to load Google Maps API - using manual input mode');
      };

      document.head.appendChild(script);
    };

    loadGoogleMaps();
  }, []);

  // Initialize Google Places Autocomplete
  useEffect(() => {
    if (isGoogleMapsLoaded && inputRef.current && !autocompleteRef.current) {
      try {
        const options = {
          types: ['address'],
          fields: [
            'formatted_address', 
            'address_components', 
            'geometry', 
            'place_id'
          ]
        };

        autocompleteRef.current = new window.google.maps.places.Autocomplete(
          inputRef.current,
          options
        );

        // Add place selection listener
        autocompleteRef.current.addListener('place_changed', () => {
          const place = autocompleteRef.current?.getPlace();
          
          if (place && place.address_components) {
            const components = {
              street_number: '',
              route: '',
              locality: '',
              administrative_area_level_1: '',
              country: '',
              postal_code: ''
            };

            // Parse address components
            place.address_components.forEach((component: any) => {
              const types = component.types;
              
              if (types.includes('street_number')) {
                components.street_number = component.long_name;
              }
              if (types.includes('route')) {
                components.route = component.long_name;
              }
              if (types.includes('locality')) {
                components.locality = component.long_name;
              }
              if (types.includes('administrative_area_level_1')) {
                components.administrative_area_level_1 = component.long_name;
              }
              if (types.includes('country')) {
                components.country = component.long_name;
              }
              if (types.includes('postal_code')) {
                components.postal_code = component.long_name;
              }
            });

            // Update input value
            if (place.formatted_address) {
              setInputValue(place.formatted_address);
              if (onChange) {
                onChange(place.formatted_address);
              }
            }

            // Pass address components to parent
            if (onAddressComponents) {
              onAddressComponents(components);
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
  }, [isGoogleMapsLoaded, onChange, onPlaceSelected, onAddressComponents]);

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

  return (
    <input
      ref={inputRef}
      type="text"
      value={inputValue}
      onChange={handleInputChange}
      placeholder={placeholder || "Enter address"}
      className={className}
      autoComplete="off"
    />
  );
};