
import React, { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const countries = [
  'United States', 'Canada', 'Mexico', 'Brazil', 'Argentina', 
  'United Kingdom', 'France', 'Germany', 'Spain', 'Italy', 
  'Switzerland', 'Netherlands', 'Sweden', 'Norway', 'Denmark',
  'Japan', 'China', 'South Korea', 'Australia', 'New Zealand', 
  'Thailand', 'Singapore', 'Malaysia', 'Indonesia', 'India'
];

interface CountriesSectionProps {
  preferredCountries: string[];
  onCountryAdd: (country: string) => void;
  onCountryRemove: (country: string) => void;
}

export const CountriesSection: React.FC<CountriesSectionProps> = ({
  preferredCountries,
  onCountryAdd,
  onCountryRemove
}) => {
  const [selectedCountry, setSelectedCountry] = useState<string>('');

  const handleAddCountry = () => {
    if (selectedCountry && !preferredCountries.includes(selectedCountry)) {
      onCountryAdd(selectedCountry);
      setSelectedCountry('');
    }
  };

  return (
    <div className="space-y-3">
      <h4 className="text-md font-medium">Preferred Countries</h4>
      <p className="text-sm text-muted-foreground">
        Select countries you're interested in to see more relevant hotels
      </p>
      
      <div className="flex flex-wrap gap-2 mb-2">
        {preferredCountries.map(country => (
          <Badge 
            key={country} 
            variant="outline"
            className="px-3 py-1 bg-fuchsia-950/20 text-fuchsia-300 hover:bg-fuchsia-950/30"
          >
            {country}
            <button 
              type="button"
              className="ml-2 text-fuchsia-300 hover:text-fuchsia-100"
              onClick={() => onCountryRemove(country)}
            >
              ×
            </button>
          </Badge>
        ))}
        {preferredCountries.length === 0 && (
          <p className="text-sm italic text-muted-foreground">No preferred countries selected</p>
        )}
      </div>
      
      <div className="flex gap-2">
        <Select value={selectedCountry} onValueChange={setSelectedCountry}>
          <SelectTrigger className="w-full bg-fuchsia-950/20 border border-fuchsia-800/30">
            <SelectValue placeholder="Select a country" />
          </SelectTrigger>
          <SelectContent>
            {countries.map(country => (
              <SelectItem key={country} value={country}>
                {country}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button 
          type="button" 
          variant="outline" 
          className="border-fuchsia-600"
          onClick={handleAddCountry}
        >
          Add
        </Button>
      </div>
    </div>
  );
};
