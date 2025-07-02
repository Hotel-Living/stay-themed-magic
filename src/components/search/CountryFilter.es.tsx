
import { FilterItem } from "./FilterItem";
import { useFilterData } from "@/hooks/useFilterData";

interface CountryFilterESProps {
  activeCountry: string | null;
  onChange: (value: string | null) => void;
}

export function CountryFilterES({ activeCountry, onChange }: CountryFilterESProps) {
  const { countries, loading, error } = useFilterData();
  
  // Spanish translations for all 60 countries
  const getSpanishCountryName = (countryCode: string): string => {
    const translations: Record<string, string> = {
      'DE': 'Alemania',
      'AR': 'Argentina',
      'AU': 'Australia',
      'AT': 'Austria',
      'BE': 'Bélgica',
      'BR': 'Brasil',
      'BG': 'Bulgaria',
      'CA': 'Canadá',
      'CO': 'Colombia',
      'CR': 'Costa Rica',
      'HR': 'Croacia',
      'DK': 'Dinamarca',
      'EG': 'Egipto',
      'AE': 'Emiratos Árabes Unidos',
      'ES': 'España',
      'US': 'Estados Unidos',
      'EE': 'Estonia',
      'PH': 'Filipinas',
      'FI': 'Finlandia',
      'FR': 'Francia',
      'GE': 'Georgia',
      'GR': 'Grecia',
      'HU': 'Hungría',
      'ID': 'Indonesia',
      'IE': 'Irlanda',
      'IS': 'Islandia',
      'IT': 'Italia',
      'JP': 'Japón',
      'KZ': 'Kazajistán',
      'LV': 'Letonia',
      'LT': 'Lituania',
      'LU': 'Luxemburgo',
      'MY': 'Malasia',
      'MT': 'Malta',
      'MA': 'Marruecos',
      'MX': 'México',
      'NO': 'Noruega',
      'NZ': 'Nueva Zelanda',
      'NL': 'Países Bajos',
      'PA': 'Panamá',
      'PY': 'Paraguay',
      'PE': 'Perú',
      'PL': 'Polonia',
      'PT': 'Portugal',
      'GB': 'Reino Unido',
      'CZ': 'República Checa',
      'DO': 'República Dominicana',
      'RO': 'Rumanía',
      'SG': 'Singapur',
      'LK': 'Sri Lanka',
      'SE': 'Suecia',
      'CH': 'Suiza',
      'TW': 'Taiwán',
      'TH': 'Tailandia',
      'TR': 'Turquía',
      'UY': 'Uruguay',
      'VN': 'Vietnam',
      'KR': 'Corea del Sur',
      'EC': 'Ecuador',
      'SK': 'Eslovaquia'
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
              type="checkbox" 
              checked={activeCountry === country.code}
              onChange={() => handleCountryClick(country.code)}
              className="rounded border-fuchsia-800/50 text-fuchsia-600 focus:ring-fuchsia-500/50 bg-fuchsia-950/50 h-4 w-4 mr-2 mt-0.5" 
            />
            <span className="text-sm flex items-center text-white whitespace-nowrap">
              {getSpanishCountryName(country.code)} {country.code}
              <span className="ml-2">{country.flag}</span>
            </span>
          </label>
        ))
      )}
    </FilterItem>
  );
}
