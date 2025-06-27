
import { FilterItem } from "./FilterItem";
import { useDynamicFilterData } from "@/hooks/useDynamicFilterData";

interface CountryFilterENProps {
  activeCountry: string | null;
  onChange: (value: string | null) => void;
}

export function CountryFilterEN({ activeCountry, onChange }: CountryFilterENProps) {
  const { countries, loading, error } = useDynamicFilterData();

  const handleCountryClick = (countryValue: string) => {
    const newValue = activeCountry === countryValue ? null : countryValue;
    console.log("CountryFilter - Country toggled:", countryValue, "->", newValue);
    onChange(newValue);
  };

  if (loading) {
    return (
      <FilterItem title="COUNTRY">
        <div className="text-sm text-fuchsia-300/70 px-3 py-2">Loading countries...</div>
      </FilterItem>
    );
  }

  if (error || countries.length === 0) {
    return (
      <FilterItem title="COUNTRY">
        <div className="text-sm text-fuchsia-300/70 px-3 py-2">No countries available</div>
      </FilterItem>
    );
  }

  return (
    <FilterItem title="COUNTRY">
      {countries.map(country => (
        <label key={country.code} className="flex items-start mb-2 cursor-pointer hover:bg-fuchsia-800/30 p-1 rounded">
          <input 
            type="checkbox" 
            checked={activeCountry === country.code}
            onChange={() => handleCountryClick(country.code)}
            className="rounded border-fuchsia-800/50 text-fuchsia-600 focus:ring-fuchsia-500/50 bg-fuchsia-950/50 h-4 w-4 mr-2 mt-0.5" 
          />
          <span className="text-sm font-bold text-white flex-1">{country.name}</span>
          <span className="text-xs text-fuchsia-300/70 ml-2">({country.count})</span>
        </label>
      ))}
    </FilterItem>
  );
}
