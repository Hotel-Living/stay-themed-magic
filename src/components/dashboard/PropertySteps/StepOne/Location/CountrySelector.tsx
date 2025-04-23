
import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Country } from 'country-state-city';
import { Label } from "@/components/ui/label";

interface CountrySelectorProps {
  value: string;
  onChange: (e: any) => void;
  onValueChange: (value: string) => void;
  onBlur: () => void;
  error: any;
  touched: any;
  errorMessage?: string;
  onCustomClick: () => void;
}

const CountrySelector: React.FC<CountrySelectorProps> = ({
  value,
  onChange,
  onValueChange,
  onBlur,
  error,
  touched,
  errorMessage,
  onCustomClick
}) => {
  const countries = Country.getAllCountries();
  const hasError = touched && error;

  const handleChange = (newValue: string) => {
    onValueChange(newValue);
    if (onChange) {
      onChange({ target: { value: newValue } });
    }
  };

  return (
    <div>
      <Label htmlFor="country" className={cn(hasError ? "text-red-500" : "text-white")}>
        Country {hasError && <span className="text-red-500">*</span>}
      </Label>
      <div className="flex items-center space-x-2">
        <Select 
          value={value} 
          onValueChange={handleChange}
        >
          <SelectTrigger className={cn("bg-[#7A0486] text-white border-white", hasError ? "border-red-500" : "")}>
            <SelectValue placeholder="Select a country" />
          </SelectTrigger>
          <SelectContent className="bg-[#7A0486] border-white">
            <input
              type="text"
              placeholder="Search countries..."
              className="w-full p-2 mb-2 text-white bg-[#8A0499] border border-white/30 rounded focus:outline-none focus:border-white/50"
              onChange={(e) => {
                // Filter will be handled by the select component
              }}
              autoComplete="off"
            />
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
        <Button 
          variant="secondary" 
          size="sm" 
          onClick={onCustomClick}
          className="bg-[#1A1F2C] hover:bg-[#2A2F3C] text-white"
        >
          Custom
        </Button>
      </div>
      {hasError && (
        <p className="text-red-500 text-sm mt-1 bg-[#1A1F2C] px-3 py-1 rounded">{errorMessage || error}</p>
      )}
    </div>
  );
};

export default CountrySelector;
