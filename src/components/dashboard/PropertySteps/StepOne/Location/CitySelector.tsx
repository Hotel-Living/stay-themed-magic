
import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface CitySelectorProps {
  value: string;
  onValueChange: (value: string) => void;
  onBlur: () => void;
  hasError: boolean;
  errorMessage?: string;
  cities: string[];
  disabled: boolean;
}

export default function CitySelector({
  value,
  onValueChange,
  onBlur,
  hasError,
  errorMessage,
  cities,
  disabled
}: CitySelectorProps) {
  return (
    <div>
      <label htmlFor="city" className="text-white">
        City <span className="text-red-500">*</span>
      </label>
      <Select 
        value={value} 
        onValueChange={onValueChange}
        onOpenChange={() => !value && onBlur()}
        disabled={disabled}
      >
        <SelectTrigger 
          className={`text-white bg-[#7A0486] border-white ${hasError ? "border-red-500" : ""}`}
        >
          <SelectValue placeholder="Select city" />
        </SelectTrigger>
        <SelectContent className="bg-white border-[#7A0486]">
          {cities.map(city => (
            <SelectItem 
              key={city} 
              value={city} 
              className="text-[#7A0486] hover:bg-[#7A0486]/10 focus:bg-[#7A0486]/10"
            >
              {city}
            </SelectItem>
          ))}
          <SelectItem 
            value="add-new" 
            className="text-green-600 hover:bg-[#7A0486]/10 focus:bg-[#7A0486]/10"
          >
            + Add New City
          </SelectItem>
        </SelectContent>
      </Select>
      {hasError && (
        <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
      )}
    </div>
  );
}
