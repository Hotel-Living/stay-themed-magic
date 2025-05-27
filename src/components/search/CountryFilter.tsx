
import { FilterItem } from "./FilterItem";

interface CountryFilterProps {
  activeCountry: string | null;
  onChange: (value: string) => void;
}

export function CountryFilter({ activeCountry, onChange }: CountryFilterProps) {
  const countries = [
    { value: "Spain", label: "Spain 🇪🇸" },
    { value: "France", label: "France 🇫🇷" },
    { value: "Italy", label: "Italy 🇮🇹" },
    { value: "USA", label: "USA 🇺🇸" },
    { value: "Egypt", label: "Egypt 🇪🇬" },
    { value: "Turkey", label: "Turkey 🇹🇷" }
  ];

  return (
    <FilterItem title="COUNTRY">
      {countries.map(country => (
        <label key={country.value} className="flex items-start">
          <input 
            type="radio" 
            name="country"
            checked={activeCountry === country.value}
            onChange={() => {
              console.log("Country filter changed to:", country.value);
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
