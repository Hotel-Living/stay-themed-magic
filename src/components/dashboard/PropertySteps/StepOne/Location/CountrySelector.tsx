
import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { countries } from "@/utils/countries";

interface CountrySelectorProps {
  value: string;
  onValueChange: (value: string) => void;
  onBlur: () => void;
  hasError: boolean;
  errorMessage?: string;
}

export default function CountrySelector({
  value,
  onValueChange,
  onBlur,
  hasError,
  errorMessage
}: CountrySelectorProps) {
  return (
    <div>
      <label htmlFor="country" className="text-white">
        Country <span className="text-red-500">*</span>
      </label>
      <Select 
        value={value} 
        onValueChange={onValueChange}
        onOpenChange={() => !value && onBlur()}
      >
        <SelectTrigger 
          className={`text-white bg-[#7A0486] border-white ${hasError ? "border-red-500" : ""}`}
        >
          <SelectValue placeholder="Select country" />
        </SelectTrigger>
        <SelectContent className="bg-white border-[#7A0486]">
          {countries.map(country => (
            <SelectItem 
              key={country.id} 
              value={country.id} 
              className="text-[#7A0486] hover:bg-[#7A0486]/10 focus:bg-[#7A0486]/10"
            >
              {country.name}
            </SelectItem>
          ))}
          <SelectItem 
            value="add-new" 
            className="text-green-600 hover:bg-[#7A0486]/10 focus:bg-[#7A0486]/10"
          >
            + Add New Country
          </SelectItem>
        </SelectContent>
      </Select>
      {hasError && (
        <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
      )}
    </div>
  );
}
