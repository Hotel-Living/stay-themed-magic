
import React, { useEffect, useState } from "react";
import { Country } from "country-state-city";
import { ChevronDown } from "lucide-react";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import CustomCountryInput from "./CustomCountryInput";

interface CountrySelectorProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

const CountrySelector: React.FC<CountrySelectorProps> = ({ value, onChange, className }) => {
  const [isCustomCountry, setIsCustomCountry] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  
  const countries = Country.getAllCountries().sort((a, b) => 
    a.name.localeCompare(b.name)
  );

  const filteredCountries = searchTerm 
    ? countries.filter(country => 
        country.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : countries;

  // If value is set and not in the country list, it's a custom country
  useEffect(() => {
    if (value && !countries.some(country => country.name === value)) {
      setIsCustomCountry(true);
    } else {
      setIsCustomCountry(false);
    }
  }, [value, countries]);

  const handleCountrySelect = (countryName: string) => {
    onChange(countryName);
    setIsOpen(false);
    setSearchTerm("");
  };

  const handleCustomCountrySubmit = (customCountry: string) => {
    onChange(customCountry);
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
          onClick={() => setIsOpen(true)}
        >
          <span className={!value ? "text-muted-foreground" : ""}>
            {value || "Select country"}
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
              placeholder="Search countries"
              className="w-full rounded-md border border-fuchsia-800/40 bg-fuchsia-950/70 px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-fuchsia-500/50"
            />
          </div>
          
          <div className="max-h-[200px] overflow-y-auto">
            {filteredCountries.length > 0 ? (
              filteredCountries.map((country) => (
                <div 
                  key={country.isoCode}
                  className="px-3 py-1.5 cursor-pointer hover:bg-fuchsia-800/20 transition-colors"
                  onClick={() => handleCountrySelect(country.name)}
                >
                  <span className="text-sm">{country.name}</span>
                </div>
              ))
            ) : (
              <div className="p-3">
                <p className="text-sm text-fuchsia-300 mb-2">Country not found?</p>
                <CustomCountryInput
                  searchTerm={searchTerm}
                  onSubmit={handleCustomCountrySubmit}
                />
              </div>
            )}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default CountrySelector;
