
import { FilterItem } from "./FilterItem";
import { useFilterData } from "@/hooks/useFilterData";

interface CountryFilterENProps {
  activeCountry: string | null;
  onChange: (value: string) => void;
}

export function CountryFilterEN({ activeCountry, onChange }: CountryFilterENProps) {
  const { countries, loading, error } = useFilterData();
  
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
          <label key={country.code} className="flex items-start">
            <input 
              type="radio" 
              name="country"
              checked={activeCountry === country.code}
              onChange={() => {
                console.log("CountryFilter - Country filter changed to:", country.code);
                console.log("CountryFilter - Active country was:", activeCountry);
                onChange(country.code);
              }}
              className="rounded-full border-fuchsia-800/50 text-fuchsia-600 focus:ring-fuchsia-500/50 bg-fuchsia-950/50 h-4 w-4 mr-2 mt-0.5" 
            />
            <span className="text-sm flex items-center">
              {country.name}
              <span className="ml-2">{country.flag}</span>
            </span>
          </label>
        ))
      )}
    </FilterItem>
  );
}
