
import React from "react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/hooks/useTranslation";
import { getCitiesForCountry } from "@/utils/cityData";

interface CitySelectorProps {
  value: string;
  country: string;
  onChange: (e: any) => void;
  onValueChange: (value: string) => void;
  onBlur: () => void;
  error: any;
  touched: any;
  errorMessage?: string;
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
  const { t } = useTranslation();
  const hasError = (touched && error);
  const cities = getCitiesForCountry(country);

  const handleChange = (newValue: string) => {
    onValueChange(newValue);
    onChange({ target: { value: newValue } });
  };

  return (
    <div>
      <Label htmlFor="city" className={cn(hasError ? "text-red-500" : "text-white")}>
        {t('dashboard.propertyForm.city')} {hasError && <span className="text-red-500">*</span>}
      </Label>
      <div className="flex items-center space-x-2">
        <Select
          value={value}
          onValueChange={handleChange}
          disabled={disabled || !country || cities.length === 0}
        >
          <SelectTrigger className={cn(
            "bg-[#7A0486] text-white border-white",
            hasError ? "border-red-500" : "",
            "placeholder:text-white/50"
          )}>
            <SelectValue placeholder={t('dashboard.propertyForm.enterCityName')} />
          </SelectTrigger>
          <SelectContent className="bg-[#7A0486] border-white max-h-60 overflow-y-auto">
            {cities.map((city) => (
              <SelectItem 
                key={city} 
                value={city}
                className="text-white hover:bg-[#8A0499] focus:bg-[#8A0499] focus:text-white"
              >
                {city}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button 
          variant="secondary" 
          size="sm" 
          onClick={onCustomClick}
          disabled={disabled || !country}
          className="bg-[#1A1F2C] hover:bg-[#2A2F3C] text-white"
        >
          {t('dashboard.propertyForm.custom')}
        </Button>
      </div>
      {hasError && (
        <p className="text-red-500 text-sm mt-1 bg-[#1A1F2C] px-3 py-1 rounded">
          {errorMessage || error}
        </p>
      )}
    </div>
  );
};

export default CitySelector;
