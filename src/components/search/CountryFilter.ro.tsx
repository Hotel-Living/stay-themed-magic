
import { FilterItem } from "./FilterItem";
import { useFilterData } from "@/hooks/useFilterData";

interface CountryFilterROProps {
  activeCountry: string | null;
  onChange: (value: string) => void;
}

export function CountryFilterRO({ activeCountry, onChange }: CountryFilterROProps) {
  const { countries, loading, error } = useFilterData();
  
  // Romanian translations for countries
  const getRomanianCountryName = (countryCode: string): string => {
    const translations: Record<string, string> = {
      'ES': 'Spania',
      'FR': 'Franța',
      'IT': 'Italia',
      'US': 'Statele Unite',
      'EG': 'Egipt',
      'TR': 'Turcia',
      'GB': 'Regatul Unit',
      'DE': 'Germania',
      'PT': 'Portugalia',
      'GR': 'Grecia'
    };
    return translations[countryCode] || countryCode;
  };
  
  return (
    <FilterItem title="ȚARĂ">
      {loading ? (
        <div className="text-sm text-fuchsia-300/70 italic">Se încarcă țările...</div>
      ) : error ? (
        <div className="text-sm text-fuchsia-300/70 italic">Eroare la încărcarea țărilor</div>
      ) : countries.length === 0 ? (
        <div className="text-sm text-fuchsia-300/70 italic">Nu sunt țări disponibile</div>
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
            <span className="text-sm">{getRomanianCountryName(country.code)} {country.flag}</span>
          </label>
        ))
      )}
    </FilterItem>
  );
}
