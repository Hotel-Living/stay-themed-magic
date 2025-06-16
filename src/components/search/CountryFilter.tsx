
import { FilterItem } from "./FilterItem";
import { availableCountries } from "../filters/FilterUtils";
import { useTranslation } from "@/hooks/useTranslation";

interface CountryFilterProps {
  activeCountry: string | null;
  onChange: (value: string) => void;
}

export function CountryFilter({ activeCountry, onChange }: CountryFilterProps) {
  const { t } = useTranslation();
  
  return (
    <FilterItem title={t('filters.country').toUpperCase()}>
      {availableCountries.map(country => (
        <label key={country.value} className="flex items-start">
          <input 
            type="radio" 
            name="country"
            checked={activeCountry === country.value}
            onChange={() => {
              console.log("CountryFilter - Country filter changed to:", country.value);
              console.log("CountryFilter - Active country was:", activeCountry);
              onChange(country.value);
            }}
            className="rounded-full border-fuchsia-800/50 text-fuchsia-600 focus:ring-fuchsia-500/50 bg-fuchsia-950/50 h-4 w-4 mr-2 mt-0.5" 
          />
          <span className="text-sm">{t(country.translationKey)}</span>
        </label>
      ))}
    </FilterItem>
  );
}
