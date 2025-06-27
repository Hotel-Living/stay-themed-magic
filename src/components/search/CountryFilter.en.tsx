
import { FilterItem } from "./FilterItem";
import { useFilterData } from "@/hooks/useFilterData";

interface CountryFilterENProps {
  activeCountry: string | null;
  onChange: (value: string | null) => void;
}

export function CountryFilterEN({ activeCountry, onChange }: CountryFilterENProps) {
  const { countries, loading, error } = useFilterData();
  
  const handleCountryClick = (countryCode: string) => {
    // Toggle selection: if already selected, deselect; otherwise select
    const newValue = activeCountry === countryCode ? null : countryCode;
    console.log("CountryFilter - Country toggled:", countryCode, "->", newValue);
    onChange(newValue);
  };
  
  return (
    <FilterItem title="COUNTRY">
      {loading ? (
        <div className="text-sm text-fuchsia-300/70 italic">Loading countries...</div>
      ) : error ? (
        <div className="text-sm text-fuchsia-300/70 italic">Error loading countries</div>
      ) : countries.length === 0 ? (
        <div className="text-sm text-fuchsia-300/70 italic">No countries available</div>
      ) : (
        countries.map(country => (
          <label key={country.code} className="flex items-start cursor-pointer hover:bg-fuchsia-800/30 p-1 rounded">
            <input 
              type="checkbox" 
              checked={activeCountry === country.code}
              onChange={() => handleCountryClick(country.code)}
              className="rounded border-fuchsia-800/50 text-fuchsia-600 focus:ring-fuchsia-500/50 bg-fuchsia-950/50 h-4 w-4 mr-2 mt-0.5" 
            />
            <span className="text-sm flex items-center text-white">
              {country.name}
              <span className="ml-2">{country.flag}</span>
            </span>
          </label>
        ))
      )}
    </FilterItem>
  );
}
