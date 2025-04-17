
import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Country } from 'country-state-city';
import { Label } from "@/components/ui/label";

interface CountrySelectorProps {
  value: string;
  onValueChange: (value: string) => void;
  onBlur: () => void;
  hasError: boolean;
  errorMessage?: string;
  onCustomClick: () => void;
}

const CountrySelector: React.FC<CountrySelectorProps> = ({
  value,
  onValueChange,
  onBlur,
  hasError,
  errorMessage,
  onCustomClick
}) => {
  const countries = Country.getAllCountries();

  return (
    <div>
      <Label htmlFor="country" className={cn(hasError ? "text-red-500" : "text-white")}>
        Country {hasError && <span className="text-red-500">*</span>}
      </Label>
      <div className="flex items-center space-x-2">
        <Select 
          value={value} 
          onValueChange={onValueChange}
        >
          <SelectTrigger className={cn("bg-[#7A0486] text-white border-white", hasError ? "border-red-500" : "")}>
            <SelectValue placeholder="Select a country" />
          </SelectTrigger>
          <SelectContent className="bg-[#7A0486] border-white">
            {countries.map((country) => (
              <SelectItem 
                key={country.isoCode} 
                value={country.isoCode}
                className="text-white hover:bg-[#8A0499] focus:bg-[#8A0499] focus:text-white"
              >
                {country.name}
              </SelectItem>
            ))}
            <SelectItem 
              value="add-new" 
              className="text-white hover:bg-[#8A0499] focus:bg-[#8A0499] focus:text-white"
            >
              + Add New Country
            </SelectItem>
          </SelectContent>
        </Select>
        <Button variant="secondary" size="sm" onClick={onCustomClick}>
          Custom
        </Button>
      </div>
      {hasError && (
        <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
      )}
    </div>
  );
};

export default CountrySelector;
