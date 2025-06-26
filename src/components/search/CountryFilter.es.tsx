
import { FilterItem } from "./FilterItem";
import { useFilterData } from "@/hooks/useFilterData";

interface CountryFilterESProps {
  activeCountry: string | null;
  onChange: (value: string | null) => void;
}

export function CountryFilterES({ activeCountry, onChange }: CountryFilterESProps) {
  const { countries, loading, error } = useFilterData();
  
  // Spanish translations for countries
  const getSpanishCountryName = (countryCode: string): string => {
    const translations: Record<string, string> = {
      'ES': 'España',
      'FR': 'Francia',
      'IT': 'Italia',
      'US': 'Estados Unidos',
      'EG': 'Egipto',
      'TR': 'Turquía',
      'GB': 'Reino Unido',
      'DE': 'Alemania',
      'PT': 'Portugal',
      'GR': 'Grecia'
    };
    return translations[countryCode] || countryCode;
  };
  
  const handleCountryClick = (countryCode: string) => {
    // Toggle selection: if already selected, deselect; otherwise select
    const newValue = activeCountry === countryCode ? null : countryCode;
    console.log("CountryFilter - Country toggled:", countryCode, "->", newValue);
    onChange(newValue);
  };
  
  return (
    <FilterItem title="PAÍS">
      {loading ? (
        <div className="text-sm text-fuchsia-300/70 italic">Cargando países...</div>
      ) : error ? (
        <div className="text-sm text-fuchsia-300/70 italic">Error cargando países</div>
      ) : countries.length === 0 ? (
        <div className="text-sm text-fuchsia-300/70 italic">No hay países disponibles</div>
      ) : (
        countries.map(country => (
          <label key={country.code} className="flex items-start cursor-pointer hover:bg-fuchsia-800/30 p-1 rounded">
            <input 
              type="radio" 
              name="country"
              checked={activeCountry === country.code}
              onChange={() => handleCountryClick(country.code)}
              className="rounded-full border-fuchsia-800/50 text-fuchsia-600 focus:ring-fuchsia-500/50 bg-fuchsia-950/50 h-4 w-4 mr-2 mt-0.5" 
            />
            <span className="text-sm flex items-center text-white">
              {getSpanishCountryName(country.code)}
              <span className="ml-2">{country.flag}</span>
            </span>
          </label>
        ))
      )}
    </FilterItem>
  );
}
