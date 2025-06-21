
import { FilterItem } from "./FilterItem";

interface CountryFilterPTProps {
  activeCountry: string | null;
  onChange: (value: string) => void;
}

export function CountryFilterPT({ activeCountry, onChange }: CountryFilterPTProps) {
  const availableCountries = [
    { value: "ES", label: "Espanha 🇪🇸" },
    { value: "FR", label: "França 🇫🇷" },
    { value: "IT", label: "Itália 🇮🇹" },
    { value: "US", label: "Estados Unidos 🇺🇸" },
    { value: "EG", label: "Egito 🇪🇬" },
    { value: "TR", label: "Turquia 🇹🇷" },
    { value: "GB", label: "Reino Unido 🇬🇧" },
    { value: "DE", label: "Alemanha 🇩🇪" },
    { value: "PT", label: "Portugal 🇵🇹" },
    { value: "GR", label: "Grécia 🇬🇷" }
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
