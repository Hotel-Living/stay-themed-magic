
import React, { useEffect, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { City } from 'country-state-city';
import { Command, CommandInput, CommandEmpty, CommandGroup, CommandItem } from "@/components/ui/command";

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
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const hasError = touched && error;
  const maxDisplayedCities = 100;

  // Load cities more efficiently
  useEffect(() => {
    if (country && isOpen) {
      setLoading(true);
      // Use setTimeout to prevent UI blocking
      setTimeout(() => {
        try {
          const citiesData = City.getCitiesOfCountry(country) || [];
          setCities(citiesData.map(city => city.name));
        } catch (err) {
          console.error("Error loading cities:", err);
          setCities([]);
        } finally {
          setLoading(false);
        }
      }, 10);
    }
  }, [country, isOpen]);

  const handleChange = (newValue: string) => {
    if (newValue === "add-new") {
      onCustomClick();
      return;
    }
    
    onValueChange(newValue);
    if (onChange) {
      // Simulate an event to maintain compatibility
      onChange({ target: { value: newValue } });
    }
  };

  // Filter cities based on search query
  const filteredCities = cities.filter(city => 
    city.toLowerCase().includes(searchQuery.toLowerCase())
  ).slice(0, maxDisplayedCities);

  const citiesList = propCities || filteredCities;
  
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
          onOpenChange={setIsOpen}
        >
          <SelectTrigger className={cn("bg-[#7A0486] text-white border-white", hasError ? "border-red-500" : "")}>
            <SelectValue placeholder="Select a city" />
          </SelectTrigger>
          <SelectContent className="bg-[#7A0486] border-white">
            {loading ? (
              <div className="text-white text-sm p-2">Loading cities...</div>
            ) : (
              <>
                <div className="p-2">
                  <input
                    type="text"
                    placeholder="Search cities..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full p-2 text-white bg-[#8A0499] border border-white/30 rounded focus:outline-none focus:border-white/50"
                  />
                </div>

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
                
                {filteredCities.length > maxDisplayedCities && (
                  <div className="text-white text-xs italic p-2 border-t border-white/20">
                    Showing {maxDisplayedCities} of {cities.length} cities. Please refine your search.
                  </div>
                )}

                {!disabled && country && (
                  <SelectItem 
                    value="add-new"
                    className="text-white hover:bg-[#8A0499] focus:bg-[#8A0499] focus:text-white"
                  >
                    + Add New City
                  </SelectItem>
                )}
              </>
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
