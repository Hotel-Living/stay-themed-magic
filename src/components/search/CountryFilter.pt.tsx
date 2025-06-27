
import { FilterItem } from "./FilterItem";
import { useFilterData } from "@/hooks/useFilterData";

interface CountryFilterPTProps {
  activeCountry: string | null;
  onChange: (value: string | null) => void;
}

export function CountryFilterPT({ activeCountry, onChange }: CountryFilterPTProps) {
  const { countries, loading, error } = useFilterData();
  
  // Portuguese translations for countries
  const getPortugueseCountryName = (countryCode: string): string => {
    const translations: Record<string, string> = {
      'ES': 'Espanha',
      'FR': 'França',
      'IT': 'Itália',
      'US': 'Estados Unidos',
      'EG': 'Egito',
      'TR': 'Turquia',
      'GB': 'Reino Unido',
      'DE': 'Alemanha',
      'PT': 'Portugal',
      'GR': 'Grécia'
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
        <div className="text-sm text-fuchsia-300/70 italic">Carregando países...</div>
      ) : error ? (
        <div className="text-sm text-fuchsia-300/70 italic">Erro ao carregar países</div>
      ) : countries.length === 0 ? (
        <div className="text-sm text-fuchsia-300/70 italic">Nenhum país disponível</div>
      ) : (
        countries.map(country => (
          <label key={country.code} className="flex items-start cursor-pointer hover:bg-fuchsia-800/30 p-1 rounded">
            <input 
              type="checkbox" 
              checked={activeCountry === country.code}
              onChange={() => handleCountryClick(country.code)}
              className="rounded border-fuchsia-800/50 text-fuchsia-600 focus:ring-fuchsia-500/50 bg-fuchsia-950/50 h-4 w-4 mr-2 mt-0.5" 
            />
            <span className="text-sm flex items-center text-white">
              {getPortugueseCountryName(country.code)}
              <span className="ml-2">{country.flag}</span>
            </span>
          </label>
        ))
      )}
    </FilterItem>
  );
}
