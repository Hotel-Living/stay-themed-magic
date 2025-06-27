
import { FilterItem } from "./FilterItem";

interface CountryFilterROProps {
  activeCountry: string | null;
  onChange: (value: string | null) => void;
}

export function CountryFilterRO({ activeCountry, onChange }: CountryFilterROProps) {
  const countries = [
    { value: "Austria", label: "Austria" },
    { value: "Belgium", label: "Belgia" },
    { value: "Greece", label: "Grecia" },
    { value: "Netherlands", label: "Olanda" },
    { value: "Spain", label: "Spania" },
    { value: "Thailand", label: "Thailanda" }
  ];

  const handleCountryClick = (countryValue: string) => {
    const newValue = activeCountry === countryValue ? null : countryValue;
    console.log("CountryFilter - Country toggled:", countryValue, "->", newValue);
    onChange(newValue);
  };

  return (
    <FilterItem title="ȚARĂ">
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
