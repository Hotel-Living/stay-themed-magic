
import React, { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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
  disabled = false,
  onCustomClick
}) => {
  const [validationError, setValidationError] = useState<string | null>(null);
  const hasError = (touched && error) || validationError;

  const validateCity = async (cityName: string) => {
    if (!cityName) return;

    try {
      const geocoder = new google.maps.Geocoder();
      const response = await geocoder.geocode({
        address: `${cityName}, ${country}`,
        componentRestrictions: {
          country: country
        }
      });

      if (response.results.length > 0) {
        // Check if result is a city
        const isCity = response.results[0].types.some(type => 
          ['locality', 'administrative_area_level_1', 'administrative_area_level_2'].includes(type)
        );

        if (!isCity) {
          setValidationError("The location entered is not a city. Please enter a valid city name.");
          return false;
        }

        setValidationError(null);
        return true;
      } else {
        setValidationError("The city entered was not recognized. Please enter a valid city.");
        return false;
      }
    } catch (err) {
      console.error('Error validating city:', err);
      setValidationError("Could not validate the city. Please try again.");
      return false;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onValueChange(newValue);
    onChange({ target: { value: newValue } });
    setValidationError(null);
  };

  const handleBlur = async () => {
    if (value) {
      await validateCity(value);
    }
    onBlur();
  };

  return (
    <div>
      <Label htmlFor="city" className={cn(hasError ? "text-red-500" : "text-white")}>
        City {hasError && <span className="text-red-500">*</span>}
      </Label>
      <div className="flex items-center space-x-2">
        <Input
          id="city"
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={disabled || !country}
          placeholder="Enter city name"
          className={cn(
            "bg-[#7A0486] text-white border-white",
            hasError ? "border-red-500" : "",
            "placeholder:text-white/50"
          )}
        />
        <Button 
          variant="secondary" 
          size="sm" 
          onClick={onCustomClick}
          disabled={disabled || !country}
          className="bg-[#1A1F2C] hover:bg-[#2A2F3C] text-white"
        >
          Custom
        </Button>
      </div>
      {hasError && (
        <p className="text-red-500 text-sm mt-1 bg-[#1A1F2C] px-3 py-1 rounded">
          {validationError || errorMessage || error}
        </p>
      )}
    </div>
  );
};

export default CitySelector;
