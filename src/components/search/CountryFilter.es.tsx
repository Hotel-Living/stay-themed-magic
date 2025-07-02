import { FilterItem } from "./FilterItem";

interface CountryFilterESProps {
  activeCountry: string | null;
  onChange: (value: string | null) => void;
}

export function CountryFilterES({ activeCountry, onChange }: CountryFilterESProps) {
  // Exact 60 countries as specified - clean list with translations
  const countries = [
    { code: 'DE', name: 'Alemania' },
    { code: 'AR', name: 'Argentina' },
    { code: 'AU', name: 'Australia' },
    { code: 'AT', name: 'Austria' },
    { code: 'BE', name: 'Bélgica' },
    { code: 'BR', name: 'Brasil' },
    { code: 'BG', name: 'Bulgaria' },
    { code: 'CA', name: 'Canadá' },
    { code: 'CO', name: 'Colombia' },
    { code: 'KR', name: 'Corea del Sur' },
    { code: 'CR', name: 'Costa Rica' },
    { code: 'HR', name: 'Croacia' },
    { code: 'DK', name: 'Dinamarca' },
    { code: 'EC', name: 'Ecuador' },
    { code: 'EG', name: 'Egipto' },
    { code: 'AE', name: 'Emiratos Árabes Unidos' },
    { code: 'SK', name: 'Eslovaquia' },
    { code: 'ES', name: 'España' },
    { code: 'US', name: 'Estados Unidos' },
    { code: 'EE', name: 'Estonia' },
    { code: 'PH', name: 'Filipinas' },
    { code: 'FI', name: 'Finlandia' },
    { code: 'FR', name: 'Francia' },
    { code: 'GE', name: 'Georgia' },
    { code: 'GR', name: 'Grecia' },
    { code: 'HU', name: 'Hungría' },
    { code: 'ID', name: 'Indonesia' },
    { code: 'IE', name: 'Irlanda' },
    { code: 'IS', name: 'Islandia' },
    { code: 'IT', name: 'Italia' },
    { code: 'JP', name: 'Japón' },
    { code: 'KZ', name: 'Kazajistán' },
    { code: 'LV', name: 'Letonia' },
    { code: 'LT', name: 'Lituania' },
    { code: 'LU', name: 'Luxemburgo' },
    { code: 'MY', name: 'Malasia' },
    { code: 'MT', name: 'Malta' },
    { code: 'MA', name: 'Marruecos' },
    { code: 'MX', name: 'México' },
    { code: 'NO', name: 'Noruega' },
    { code: 'NZ', name: 'Nueva Zelanda' },
    { code: 'PA', name: 'Panamá' },
    { code: 'PY', name: 'Paraguay' },
    { code: 'NL', name: 'Países Bajos' },
    { code: 'PE', name: 'Perú' },
    { code: 'PL', name: 'Polonia' },
    { code: 'PT', name: 'Portugal' },
    { code: 'GB', name: 'Reino Unido' },
    { code: 'CZ', name: 'República Checa' },
    { code: 'DO', name: 'República Dominicana' },
    { code: 'RO', name: 'Rumanía' },
    { code: 'SG', name: 'Singapur' },
    { code: 'LK', name: 'Sri Lanka' },
    { code: 'SE', name: 'Suecia' },
    { code: 'CH', name: 'Suiza' },
    { code: 'TW', name: 'Taiwán' },
    { code: 'TH', name: 'Tailandia' },
    { code: 'TR', name: 'Turquía' },
    { code: 'UY', name: 'Uruguay' },
    { code: 'VN', name: 'Vietnam' }
  ];

  // Sort alphabetically by Spanish name
  const sortedCountries = countries.sort((a, b) => a.name.localeCompare(b.name));
  
  const handleCountryClick = (countryCode: string) => {
    const newValue = activeCountry === countryCode ? null : countryCode;
    console.log(`🌍 Country filter: ${countries.find(c => c.code === countryCode)?.name} (${countryCode}) selected`);
    onChange(newValue);
  };
  
  return (
    <FilterItem title="PAÍS">
      {sortedCountries.map(country => (
        <label key={country.code} className="flex items-start cursor-pointer hover:bg-fuchsia-800/30 p-1 rounded">
          <input 
            type="checkbox" 
            checked={activeCountry === country.code}
            onChange={() => handleCountryClick(country.code)}
            className="rounded border-fuchsia-800/50 text-fuchsia-600 focus:ring-fuchsia-500/50 bg-fuchsia-950/50 h-4 w-4 mr-2 mt-0.5" 
          />
          <span className="text-sm text-white whitespace-nowrap">
            {country.name}
          </span>
        </label>
      ))}
    </FilterItem>
  );
}