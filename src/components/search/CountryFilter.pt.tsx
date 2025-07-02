
import { FilterItem } from "./FilterItem";

interface CountryFilterPTProps {
  activeCountry: string | null;
  onChange: (value: string | null) => void;
}

export function CountryFilterPT({ activeCountry, onChange }: CountryFilterPTProps) {
  // Exact 60 countries as specified - clean list with Portuguese translations
  const countries = [
    { code: 'DE', name: 'Alemanha' },
    { code: 'AR', name: 'Argentina' },
    { code: 'AU', name: 'Austrália' },
    { code: 'AT', name: 'Áustria' },
    { code: 'BE', name: 'Bélgica' },
    { code: 'BR', name: 'Brasil' },
    { code: 'BG', name: 'Bulgária' },
    { code: 'CA', name: 'Canadá' },
    { code: 'CO', name: 'Colômbia' },
    { code: 'KR', name: 'Coreia do Sul' },
    { code: 'CR', name: 'Costa Rica' },
    { code: 'HR', name: 'Croácia' },
    { code: 'DK', name: 'Dinamarca' },
    { code: 'EC', name: 'Equador' },
    { code: 'EG', name: 'Egito' },
    { code: 'AE', name: 'Emirados Árabes Unidos' },
    { code: 'SK', name: 'Eslováquia' },
    { code: 'ES', name: 'Espanha' },
    { code: 'US', name: 'Estados Unidos' },
    { code: 'EE', name: 'Estónia' },
    { code: 'PH', name: 'Filipinas' },
    { code: 'FI', name: 'Finlândia' },
    { code: 'FR', name: 'França' },
    { code: 'GE', name: 'Geórgia' },
    { code: 'GR', name: 'Grécia' },
    { code: 'HU', name: 'Hungria' },
    { code: 'ID', name: 'Indonésia' },
    { code: 'IE', name: 'Irlanda' },
    { code: 'IS', name: 'Islândia' },
    { code: 'IT', name: 'Itália' },
    { code: 'JP', name: 'Japão' },
    { code: 'KZ', name: 'Cazaquistão' },
    { code: 'LV', name: 'Letónia' },
    { code: 'LT', name: 'Lituânia' },
    { code: 'LU', name: 'Luxemburgo' },
    { code: 'MY', name: 'Malásia' },
    { code: 'MT', name: 'Malta' },
    { code: 'MA', name: 'Marrocos' },
    { code: 'MX', name: 'México' },
    { code: 'NO', name: 'Noruega' },
    { code: 'NZ', name: 'Nova Zelândia' },
    { code: 'PA', name: 'Panamá' },
    { code: 'PY', name: 'Paraguai' },
    { code: 'NL', name: 'Países Baixos' },
    { code: 'PE', name: 'Peru' },
    { code: 'PL', name: 'Polónia' },
    { code: 'PT', name: 'Portugal' },
    { code: 'GB', name: 'Reino Unido' },
    { code: 'CZ', name: 'República Checa' },
    { code: 'DO', name: 'República Dominicana' },
    { code: 'RO', name: 'Roménia' },
    { code: 'SG', name: 'Singapura' },
    { code: 'LK', name: 'Sri Lanka' },
    { code: 'SE', name: 'Suécia' },
    { code: 'CH', name: 'Suíça' },
    { code: 'TW', name: 'Taiwan' },
    { code: 'TH', name: 'Tailândia' },
    { code: 'TR', name: 'Turquia' },
    { code: 'UY', name: 'Uruguai' },
    { code: 'VN', name: 'Vietname' }
  ];

  // Sort alphabetically by Portuguese name
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
