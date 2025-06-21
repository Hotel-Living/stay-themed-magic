
import { FilterItem } from "./FilterItem";

interface CountryFilterROProps {
  activeCountry: string | null;
  onChange: (value: string) => void;
}

export function CountryFilterRO({ activeCountry, onChange }: CountryFilterROProps) {
  const availableCountries = [
    { value: "ES", label: "Spania 🇪🇸" },
    { value: "FR", label: "Franța 🇫🇷" },
    { value: "IT", label: "Italia 🇮🇹" },
    { value: "US", label: "Statele Unite 🇺🇸" },
    { value: "EG", label: "Egipt 🇪🇬" },
    { value: "TR", label: "Turcia 🇹🇷" },
    { value: "GB", label: "Regatul Unit 🇬🇧" },
    { value: "DE", label: "Germania 🇩🇪" },
    { value: "PT", label: "Portugalia 🇵🇹" },
    { value: "GR", label: "Grecia 🇬🇷" }
  ];
  
  return (
    <FilterItem title="ȚARĂ">
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
