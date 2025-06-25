
import { FilterItem } from "./FilterItem";
import { useFilterData } from "@/hooks/useFilterData";

interface CountryFilterPTProps {
  activeCountry: string | null;
  onChange: (value: string) => void;
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
          <label key={country.code} className="flex items-start">
            <input 
              type="radio" 
              name="country"
              checked={activeCountry === country.code}
              onChange={() => {
                console.log("CountryFilter - Country filter changed to:", country.code);
                console.log("CountryFilter - Active country was:", activeCountry);
                onChange(country.code);
              }}
              className="rounded-full border-fuchsia-800/50 text-fuchsia-600 focus:ring-fuchsia-500/50 bg-fuchsia-950/50 h-4 w-4 mr-2 mt-0.5" 
            />
            <span className="text-sm">{getPortugueseCountryName(country.code)} {country.flag}</span>
          </label>
        ))
      )}
    </FilterItem>
  );
}
