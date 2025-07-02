
import { FilterItem } from "./FilterItem";

interface CountryFilterROProps {
  activeCountry: string | null;
  onChange: (value: string | null) => void;
}

export function CountryFilterRO({ activeCountry, onChange }: CountryFilterROProps) {
  // Exact 60 countries as specified - clean list with Romanian translations
  const countries = [
    { code: 'DE', name: 'Germania' },
    { code: 'AR', name: 'Argentina' },
    { code: 'AU', name: 'Australia' },
    { code: 'AT', name: 'Austria' },
    { code: 'BE', name: 'Belgia' },
    { code: 'BR', name: 'Brazilia' },
    { code: 'BG', name: 'Bulgaria' },
    { code: 'CA', name: 'Canada' },
    { code: 'CO', name: 'Columbia' },
    { code: 'KR', name: 'Coreea de Sud' },
    { code: 'CR', name: 'Costa Rica' },
    { code: 'HR', name: 'Croația' },
    { code: 'DK', name: 'Danemarca' },
    { code: 'EC', name: 'Ecuador' },
    { code: 'EG', name: 'Egipt' },
    { code: 'AE', name: 'Emiratele Arabe Unite' },
    { code: 'SK', name: 'Slovacia' },
    { code: 'ES', name: 'Spania' },
    { code: 'US', name: 'Statele Unite' },
    { code: 'EE', name: 'Estonia' },
    { code: 'PH', name: 'Filipine' },
    { code: 'FI', name: 'Finlanda' },
    { code: 'FR', name: 'Franța' },
    { code: 'GE', name: 'Georgia' },
    { code: 'GR', name: 'Grecia' },
    { code: 'HU', name: 'Ungaria' },
    { code: 'ID', name: 'Indonezia' },
    { code: 'IE', name: 'Irlanda' },
    { code: 'IS', name: 'Islanda' },
    { code: 'IT', name: 'Italia' },
    { code: 'JP', name: 'Japonia' },
    { code: 'KZ', name: 'Kazahstan' },
    { code: 'LV', name: 'Letonia' },
    { code: 'LT', name: 'Lituania' },
    { code: 'LU', name: 'Luxemburg' },
    { code: 'MY', name: 'Malaezia' },
    { code: 'MT', name: 'Malta' },
    { code: 'MA', name: 'Maroc' },
    { code: 'MX', name: 'Mexic' },
    { code: 'NO', name: 'Norvegia' },
    { code: 'NZ', name: 'Noua Zeelandă' },
    { code: 'PA', name: 'Panama' },
    { code: 'PY', name: 'Paraguay' },
    { code: 'NL', name: 'Țările de Jos' },
    { code: 'PE', name: 'Peru' },
    { code: 'PL', name: 'Polonia' },
    { code: 'PT', name: 'Portugalia' },
    { code: 'GB', name: 'Regatul Unit' },
    { code: 'CZ', name: 'Republica Cehă' },
    { code: 'DO', name: 'Republica Dominicană' },
    { code: 'RO', name: 'România' },
    { code: 'SG', name: 'Singapore' },
    { code: 'LK', name: 'Sri Lanka' },
    { code: 'SE', name: 'Suedia' },
    { code: 'CH', name: 'Elveția' },
    { code: 'TW', name: 'Taiwan' },
    { code: 'TH', name: 'Thailanda' },
    { code: 'TR', name: 'Turcia' },
    { code: 'UY', name: 'Uruguay' },
    { code: 'VN', name: 'Vietnam' }
  ];

  // Sort alphabetically by Romanian name
  const sortedCountries = countries.sort((a, b) => a.name.localeCompare(b.name));
  
  const handleCountryClick = (countryCode: string) => {
    const newValue = activeCountry === countryCode ? null : countryCode;
    console.log(`🌍 Country filter: ${countries.find(c => c.code === countryCode)?.name} (${countryCode}) selected`);
    onChange(newValue);
  };
  
  return (
    <FilterItem title="ȚARĂ">
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
