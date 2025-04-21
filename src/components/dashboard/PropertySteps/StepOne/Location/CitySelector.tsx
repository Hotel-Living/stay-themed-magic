
import React, { useEffect, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { City } from 'country-state-city';

interface CitySelectorProps {
  value: string;
  country: string;
  onChange: (e: any) => void;
  onValueChange: (value: string) => void;
  onBlur: () => void;
  error: any;
  touched: any;
  errorMessage?: string;
  cities?: string[];
  disabled?: boolean;
  onCustomClick: () => void;
}

const CitySelector: React.FC<CitySelectorProps> = ({
  value,
  country,
  onChange,
  onValueChange,
  onBlur,
  error,
  touched,
  errorMessage,
  cities: propCities,
  disabled = false,
  onCustomClick
}) => {
  const [cities, setCities] = useState<string[]>([]);
  const hasError = touched && error;

  useEffect(() => {
    if (country) {
      const citiesData = City.getCitiesOfCountry(country) || [];
      setCities(citiesData.map(city => city.name));
    } else {
      setCities([]);
    }
  }, [country]);

  const handleChange = (newValue: string) => {
    onValueChange(newValue);
    if (onChange) {
      // Simulate an event to maintain compatibility
      onChange({ target: { value: newValue } });
    }
  };

  const citiesList = propCities || cities;
  
  return (
    <div>
      <Label htmlFor="city" className={cn(hasError ? "text-red-500" : "text-white")}>
        City {hasError && <span className="text-red-500">*</span>}
      </Label>
      <div className="flex items-center space-x-2">
        <Select 
          value={value} 
          onValueChange={handleChange}
          disabled={disabled || !country}
        >
          <SelectTrigger className={cn("bg-[#7A0486] text-white border-white", hasError ? "border-red-500" : "")}>
            <SelectValue placeholder="Select a city" />
          </SelectTrigger>
          <SelectContent className="bg-[#7A0486] border-white">
            {!citiesList.length ? (
              <SelectItem 
                value="no-cities" 
                className="text-white hover:bg-[#8A0499] focus:bg-[#8A0499] focus:text-white"
              >
                No cities found for this country
              </SelectItem>
            ) : (
              citiesList.map((city) => (
                <SelectItem 
                  key={city} 
                  value={city}
                  className="text-white hover:bg-[#8A0499] focus:bg-[#8A0499] focus:text-white"
                >
                  {city}
                </SelectItem>
              ))
            )}
            {!disabled && country && (
              <SelectItem 
                value="add-new"
                className="text-white hover:bg-[#8A0499] focus:bg-[#8A0499] focus:text-white"
              >
                + Add New City
              </SelectItem>
            )}
          </SelectContent>
        </Select>
        <Button 
          variant="secondary" 
          size="sm" 
          onClick={onCustomClick}
          disabled={disabled || !country}
        >
          Custom
        </Button>
      </div>
      {hasError && (
        <p className="text-red-500 text-sm mt-1">{errorMessage || error}</p>
      )}
    </div>
  );
};

export default CitySelector;
