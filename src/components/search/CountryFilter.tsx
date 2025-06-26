
import { FilterItem } from "./FilterItem";

interface CountryFilterProps {
  selectedCountry: string | null;
  onChange: (country: string | null) => void;
}

export function CountryFilter({ selectedCountry, onChange }: CountryFilterProps) {
  const countries = [
    { value: "spain", label: "Spain" },
    { value: "portugal", label: "Portugal" },
    { value: "italy", label: "Italy" },
    { value: "france", label: "France" },
    { value: "germany", label: "Germany" },
    { value: "greece", label: "Greece" },
    { value: "romania", label: "Romania" }
  ];

  const handleCountryClick = (countryValue: string) => {
    const newValue = selectedCountry === countryValue ? null : countryValue;
    onChange(newValue);
  };

  return (
    <FilterItem title="COUNTRY">
      {countries.map(option => (
        <label key={option.value} className="flex items-start mb-2 cursor-pointer hover:bg-fuchsia-800/30 p-1 rounded">
          <input 
            type="checkbox" 
            checked={selectedCountry === option.value}
            onChange={() => handleCountryClick(option.value)}
            className="rounded border-fuchsia-800/50 text-fuchsia-600 focus:ring-fuchsia-500/50 bg-fuchsia-950/50 h-4 w-4 mr-2 mt-0.5" 
          />
          <span className="text-sm font-bold text-white">{option.label}</span>
        </label>
      ))}
    </FilterItem>
  );
}
