
import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { useTranslation } from "@/hooks/useTranslation";
import { availableCountries } from "@/components/filters/FilterUtils";

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
  const { t } = useTranslation();
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
        {t('dashboard.propertyForm.country')} {hasError && <span className="text-red-500">*</span>}
      </Label>
      <div className="flex items-center space-x-2">
        <Select 
          value={value} 
          onValueChange={handleChange}
        >
          <SelectTrigger className={cn("bg-[#7A0486] text-white border-white", hasError ? "border-red-500" : "")}>
            <SelectValue placeholder={t('dashboard.propertyForm.selectCountry')} />
          </SelectTrigger>
          <SelectContent className="bg-[#7A0486] border-white max-h-60 overflow-y-auto">
            {availableCountries.map((country) => (
              <SelectItem 
                key={country.value} 
                value={country.value}
                className="text-white hover:bg-[#8A0499] focus:bg-[#8A0499] focus:text-white"
              >
                {country.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button 
          variant="secondary" 
          size="sm" 
          onClick={onCustomClick}
          className="bg-[#1A1F2C] hover:bg-[#2A2F3C] text-white"
        >
          {t('dashboard.propertyForm.custom')}
        </Button>
      </div>
      {hasError && (
        <p className="text-red-500 text-sm mt-1 bg-[#1A1F2C] px-3 py-1 rounded">{errorMessage || error}</p>
      )}
    </div>
  );
};

export default CountrySelector;
