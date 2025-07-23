import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

interface CountryDropdownProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
}

const ALLOWED_COUNTRIES = [
  { value: 'España', label: 'España' },
  { value: 'Portugal', label: 'Portugal' },
  { value: 'Inglaterra', label: 'Inglaterra' },
  { value: 'Rumania', label: 'Rumania' }
];

export const CountryDropdown = ({ value, onChange, placeholder }: CountryDropdownProps) => {
  const { t } = useTranslation('dashboard/hotel-registration');
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [inputValue, setInputValue] = useState(value || '');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Normalize text for comparison (remove accents, lowercase)
  const normalizeText = (text: string) => {
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  };

  // Filter countries based on search term
  const filteredCountries = ALLOWED_COUNTRIES.filter(country => {
    const normalizedCountry = normalizeText(country.label);
    const normalizedSearch = normalizeText(searchTerm);
    return normalizedCountry.includes(normalizedSearch);
  });

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    setSearchTerm(newValue);
    setIsOpen(true);
    
    // Check if the input exactly matches a country
    const exactMatch = ALLOWED_COUNTRIES.find(
      country => normalizeText(country.label) === normalizeText(newValue)
    );
    
    if (exactMatch && onChange) {
      onChange(exactMatch.value);
    }
  };

  // Handle country selection
  const handleCountrySelect = (country: { value: string; label: string }) => {
    setInputValue(country.label);
    setSearchTerm('');
    setIsOpen(false);
    if (onChange) {
      onChange(country.value);
    }
  };

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchTerm('');
        
        // If no valid country is selected, clear the input
        const isValidCountry = ALLOWED_COUNTRIES.some(
          country => normalizeText(country.label) === normalizeText(inputValue)
        );
        
        if (!isValidCountry) {
          setInputValue('');
          if (onChange) {
            onChange('');
          }
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [inputValue, onChange]);

  // Update input value when prop value changes
  useEffect(() => {
    if (value !== undefined) {
      const country = ALLOWED_COUNTRIES.find(c => c.value === value);
      setInputValue(country ? country.label : value);
    }
  }, [value]);

  return (
    <div ref={dropdownRef} className="relative">
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder || t('basicInfo.countryPlaceholder')}
          className="w-full bg-[#7E26A6] border border-white/30 text-white placeholder:text-white/60 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-white/20 pr-10"
          autoComplete="off"
        />
        <button
          type="button"
          onClick={() => {
            setIsOpen(!isOpen);
            if (!isOpen) {
              inputRef.current?.focus();
            }
          }}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white"
        >
          <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-[#7E26A6] border border-white/30 rounded-md shadow-lg max-h-60 overflow-auto">
          {filteredCountries.length > 0 ? (
            filteredCountries.map((country) => (
              <button
                key={country.value}
                type="button"
                onClick={() => handleCountrySelect(country)}
                className="w-full px-3 py-2 text-left text-white hover:bg-white/10 focus:bg-white/10 focus:outline-none first:rounded-t-md last:rounded-b-md"
              >
                {country.label}
              </button>
            ))
          ) : (
            <div className="px-3 py-2 text-white/60 text-sm">
              No matching countries found
            </div>
          )}
        </div>
      )}
    </div>
  );
};