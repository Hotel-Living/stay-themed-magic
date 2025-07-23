import React, { useRef, useEffect, useState } from 'react';

declare global {
  interface Window {
    google: any;
    initAutocomplete: () => void;
  }
}

interface SimpleAddressAutocompleteProps {
  value?: string;
  onChange?: (value: string) => void;
  onAddressComponents?: (components: any) => void;
  placeholder?: string;
  className?: string;
}

export const SimpleAddressAutocomplete = ({
  value = '',
  onChange,
  onAddressComponents,
  placeholder,
  className
}: SimpleAddressAutocompleteProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    const initGoogleMaps = async () => {
      // Simple, direct approach
      if (window.google?.maps?.places) {
        setupAutocomplete();
        return;
      }

      try {
        // Direct API key - your key that works
        const apiKey = 'AIzaSyBGCKW0b90070alJcyrv-8nSb8kr56c2jM';
        
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&callback=initAutocomplete`;
        script.async = true;
        
        window.initAutocomplete = setupAutocomplete;
        
        document.head.appendChild(script);
      } catch (error) {
        console.error('Failed to load Google Maps:', error);
      }
    };

    const setupAutocomplete = () => {
      if (!inputRef.current || !window.google?.maps?.places) return;

      const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current, {
        types: ['address'],
        fields: ['formatted_address', 'address_components', 'geometry']
      });

      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        
        if (place.formatted_address) {
          setInputValue(place.formatted_address);
          onChange?.(place.formatted_address);
        }

        if (place.address_components && onAddressComponents) {
          const components: any = {
            locality: '',
            country: '',
            postal_code: ''
          };

          place.address_components.forEach((component: any) => {
            const types = component.types;
            
            if (types.includes('locality') || types.includes('administrative_area_level_2')) {
              components.locality = component.long_name;
            }
            if (types.includes('country')) {
              components.country = component.long_name;
            }
            if (types.includes('postal_code')) {
              components.postal_code = component.long_name;
            }
          });

          onAddressComponents(components);
        }
      });
    };

    initGoogleMaps();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    onChange?.(newValue);
  };

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