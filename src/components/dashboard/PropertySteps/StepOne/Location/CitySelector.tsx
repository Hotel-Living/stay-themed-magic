
import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface CitySelectorProps {
  value: string;
  onValueChange: (value: string) => void;
  onBlur: () => void;
  hasError: boolean;
  errorMessage?: string;
  cities: string[];
  disabled: boolean;
  onCustomClick: () => void;
}

const CitySelector: React.FC<CitySelectorProps> = ({
  value,
  onValueChange,
  onBlur,
  hasError,
  errorMessage,
  cities,
  disabled,
  onCustomClick
}) => {
  return (
    <div>
      <Label htmlFor="city" className={cn(hasError ? "text-red-500" : "text-white")}>
        City {hasError && <span className="text-red-500">*</span>}
      </Label>
      <div className="flex items-center space-x-2">
        <Select 
          value={value} 
          onValueChange={onValueChange}
          disabled={disabled}
        >
          <SelectTrigger className={cn("bg-[#7A0486] text-white border-white", hasError ? "border-red-500" : "")}>
            <SelectValue placeholder="Select a city" />
          </SelectTrigger>
          <SelectContent className="bg-[#7A0486] border-white">
            {!cities.length ? (
              <SelectItem 
                value="no-cities" 
                className="text-white hover:bg-[#8A0499] focus:bg-[#8A0499] focus:text-white"
              >
                No cities found for this country
              </SelectItem>
            ) : (
              cities.map((city) => (
                <SelectItem 
                  key={city} 
                  value={city}
                  className="text-white hover:bg-[#8A0499] focus:bg-[#8A0499] focus:text-white"
                >
                  {city}
                </SelectItem>
              ))
            )}
            {!disabled && (
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
          disabled={disabled}
        >
          Custom
        </Button>
      </div>
      {hasError && (
        <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
      )}
    </div>
  );
};

export default CitySelector;
