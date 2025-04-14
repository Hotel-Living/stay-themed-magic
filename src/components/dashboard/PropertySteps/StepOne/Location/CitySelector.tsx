
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
      <Label htmlFor="city" className={cn(hasError ? "text-red-500" : "")}>
        City {hasError && <span className="text-red-500">*</span>}
      </Label>
      <div className="flex items-center space-x-2">
        <Select 
          value={value} 
          onValueChange={onValueChange}
          disabled={disabled}
        >
          <SelectTrigger className={cn("w-[180px]", hasError ? "border-red-500" : "")}>
            <SelectValue placeholder="Select a city" />
          </SelectTrigger>
          <SelectContent>
            {!cities.length ? (
              <SelectItem value="no-cities">No cities found for this country</SelectItem>
            ) : (
              cities.map((city) => (
                <SelectItem key={city} value={city}>
                  {city}
                </SelectItem>
              ))
            )}
            {!disabled && <SelectItem value="add-new">+ Add New City</SelectItem>}
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
