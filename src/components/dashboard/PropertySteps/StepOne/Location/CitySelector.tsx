
import React, { useEffect, useState } from "react";
import { Country, State, City } from "country-state-city";
import { ChevronDown } from "lucide-react";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import CustomCityInput from "./CustomCityInput";

interface CityData {
  name: string;
  stateCode: string;
  countryCode: string;
  longitude?: string;
  latitude?: string;
}

interface CitySelectorProps {
  value: string;
  onChange: (value: string) => void;
  country: string;
  className?: string;
}

const CitySelector: React.FC<CitySelectorProps> = ({ value, onChange, country, className }) => {
  const [isCustomCity, setIsCustomCity] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [availableCities, setAvailableCities] = useState<CityData[]>([]);
  
  // Get cities based on country
  useEffect(() => {
    if (country) {
      const countryObj = Country.getAllCountries().find(c => c.name === country);
      if (countryObj) {
        // Get states for the country
        const states = State.getStatesOfCountry(countryObj.isoCode);
        
        // Get cities for all states
        const allCities: CityData[] = [];
        states.forEach(state => {
          const citiesInState = City.getCitiesOfState(countryObj.isoCode, state.isoCode);
          allCities.push(...citiesInState);
        });
        
        // Sort cities by name
        allCities.sort((a, b) => a.name.localeCompare(b.name));
        setAvailableCities(allCities);
      } else {
        // Custom country, no cities available
        setAvailableCities([]);
      }
    } else {
      setAvailableCities([]);
    }
  }, [country]);

  // If value is set and not in the city list, it's a custom city
  useEffect(() => {
    if (value && !availableCities.some(city => city.name === value)) {
      setIsCustomCity(true);
    } else {
      setIsCustomCity(false);
    }
  }, [value, availableCities]);

  const filteredCities = searchTerm 
    ? availableCities.filter(city => 
        city.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : availableCities;

  const handleCitySelect = (cityName: string) => {
    onChange(cityName);
    setIsOpen(false);
    setSearchTerm("");
  };

  const handleCustomCitySubmit = (customCity: string) => {
    onChange(customCity);
    setIsOpen(false);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <button 
          className={cn(
            "flex items-center justify-between w-full rounded-md border border-fuchsia-800/40 bg-fuchsia-950/40 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-fuchsia-500/50",
            className
          )}
          onClick={() => country ? setIsOpen(true) : null}
          disabled={!country}
        >
          <span className={!value ? "text-muted-foreground" : ""}>
            {!country 
              ? "Select country first" 
              : value || "Select city"
            }
          </span>
          <ChevronDown className="h-4 w-4 opacity-50" />
        </button>
      </PopoverTrigger>
      
      <PopoverContent className="w-full max-w-xs p-0 bg-fuchsia-950 border-fuchsia-800/40" align="start">
        <div className="flex flex-col">
          <div className="p-2 border-b border-fuchsia-800/40">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search cities"
              className="w-full rounded-md border border-fuchsia-800/40 bg-fuchsia-950/70 px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-fuchsia-500/50"
            />
          </div>
          
          <div className="max-h-[200px] overflow-y-auto">
            {filteredCities.length > 0 ? (
              filteredCities.map((city) => (
                <div 
                  key={`${city.stateCode}-${city.name}`}
                  className="px-3 py-1.5 cursor-pointer hover:bg-fuchsia-800/20 transition-colors"
                  onClick={() => handleCitySelect(city.name)}
                >
                  <span className="text-sm">{city.name}</span>
                </div>
              ))
            ) : (
              <div className="p-3">
                <p className="text-sm text-fuchsia-300 mb-2">City not found?</p>
                <CustomCityInput
                  onSubmit={handleCustomCitySubmit}
                />
              </div>
            )}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default CitySelector;
