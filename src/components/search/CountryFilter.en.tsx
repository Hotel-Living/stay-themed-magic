
import { FilterItem } from "./FilterItem";

interface CountryFilterENProps {
  activeCountry: string | null;
  onChange: (value: string | null) => void;
}

export function CountryFilterEN({ activeCountry, onChange }: CountryFilterENProps) {
  const countries = [
    { value: "Austria", label: "Austria" },
    { value: "Belgium", label: "Belgium" },
    { value: "Greece", label: "Greece" },
    { value: "Netherlands", label: "Netherlands" },
    { value: "Spain", label: "Spain" },
    { value: "Thailand", label: "Thailand" }
  ];

  const handleCountryClick = (countryValue: string) => {
    const newValue = activeCountry === countryValue ? null : countryValue;
    console.log("CountryFilter - Country toggled:", countryValue, "->", newValue);
    onChange(newValue);
  };

  return (
    <FilterItem title="COUNTRY">
      {countries.map(country => (
        <label key={country.value} className="flex items-start mb-2 cursor-pointer hover:bg-fuchsia-800/30 p-1 rounded">
          <input 
            type="checkbox" 
            checked={activeCountry === country.value}
            onChange={() => handleCountryClick(country.value)}
            className="rounded border-fuchsia-800/50 text-fuchsia-600 focus:ring-fuchsia-500/50 bg-fuchsia-950/50 h-4 w-4 mr-2 mt-0.5" 
          />
          <span className="text-sm font-bold text-white">{country.label}</span>
        </label>
      ))}
    </FilterItem>
  );
}
