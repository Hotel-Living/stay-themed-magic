
import { FilterItem } from "./FilterItem";

interface CountryFilterESProps {
  activeCountry: string | null;
  onChange: (value: string) => void;
}

export function CountryFilterES({ activeCountry, onChange }: CountryFilterESProps) {
  const availableCountries = [
    { value: "ES", label: "España 🇪🇸" },
    { value: "FR", label: "Francia 🇫🇷" },
    { value: "IT", label: "Italia 🇮🇹" },
    { value: "US", label: "Estados Unidos 🇺🇸" },
    { value: "EG", label: "Egipto 🇪🇬" },
    { value: "TR", label: "Turquía 🇹🇷" },
    { value: "GB", label: "Reino Unido 🇬🇧" },
    { value: "DE", label: "Alemania 🇩🇪" },
    { value: "PT", label: "Portugal 🇵🇹" },
    { value: "GR", label: "Grecia 🇬🇷" }
  ];
  
  return (
    <FilterItem title="PAÍS">
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
