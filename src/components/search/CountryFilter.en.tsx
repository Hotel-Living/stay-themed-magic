
import { FilterItem } from "./FilterItem";

interface CountryFilterENProps {
  activeCountry: string | null;
  onChange: (value: string) => void;
}

export function CountryFilterEN({ activeCountry, onChange }: CountryFilterENProps) {
  const availableCountries = [
    { value: "ES", label: "Spain 🇪🇸" },
    { value: "FR", label: "France 🇫🇷" },
    { value: "IT", label: "Italy 🇮🇹" },
    { value: "US", label: "USA 🇺🇸" },
    { value: "EG", label: "Egypt 🇪🇬" },
    { value: "TR", label: "Turkey 🇹🇷" },
    { value: "GB", label: "United Kingdom 🇬🇧" },
    { value: "DE", label: "Germany 🇩🇪" },
    { value: "PT", label: "Portugal 🇵🇹" },
    { value: "GR", label: "Greece 🇬🇷" }
  ];
  
  return (
    <FilterItem title="COUNTRY">
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
          <span className="text-sm">{country.label}</span>
        </label>
      ))}
    </FilterItem>
  );
}
