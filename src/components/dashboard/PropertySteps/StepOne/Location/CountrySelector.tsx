
import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Country } from 'country-state-city';
import { Label } from "@/components/ui/label";
import { useTranslation } from "@/hooks/useTranslation";

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
        {t('dashboard.country')} {hasError && <span className="text-red-500">*</span>}
      </Label>
      <div className="flex items-center space-x-2">
        <Select 
          value={value} 
          onValueChange={handleChange}
        >
          <SelectTrigger className={cn("bg-[#7E26A6] text-white border-white placeholder:text-white/70", hasError ? "border-red-500" : "")}>
            <SelectValue placeholder={t('dashboard.selectCountry')} className="text-white" />
          </SelectTrigger>
          <SelectContent className="bg-[#7E26A6] border-white z-50">
            <input
              type="text"
              placeholder="Search countries..."
              className="w-full p-2 mb-2 text-white bg-[#7E26A6] border border-white/30 rounded focus:outline-none focus:border-white/50 placeholder:text-white/70"
              onChange={(e) => {
                // Filter will be handled by the select component
              }}
              autoComplete="off"
            />
            {countries.map((country) => (
              <SelectItem 
                key={country.isoCode} 
                value={country.isoCode}
                className="text-white hover:bg-white/10 focus:bg-white/10 focus:text-white data-[highlighted]:bg-white/10 data-[highlighted]:text-white"
              >
                {country.name}
              </SelectItem>
            ))}
            <SelectItem 
              value="add-new" 
              className="text-white hover:bg-white/10 focus:bg-white/10 focus:text-white data-[highlighted]:bg-white/10 data-[highlighted]:text-white"
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
          {t('dashboard.custom')}
        </Button>
      </div>
      {hasError && (
        <p className="text-red-500 text-sm mt-1 bg-[#1A1F2C] px-3 py-1 rounded">{errorMessage || error}</p>
      )}
    </div>
  );
};

export default CountrySelector;
