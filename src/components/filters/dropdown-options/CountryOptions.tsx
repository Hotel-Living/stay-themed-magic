
import React from "react";
import { FilterState } from "../FilterTypes";
import { useFilterData } from "@/hooks/useFilterData";
import { useTranslation } from "@/hooks/useTranslation";

interface CountryOptionsProps {
  type: keyof FilterState;
  fontSize: string;
}

export const CountryOptions: React.FC<CountryOptionsProps> = ({ type, fontSize }) => {
  const { t, language } = useTranslation();
  const { countries, loading, error } = useFilterData();
  
  // Get country name in the current language
  const getLocalizedCountryName = (countryCode: string): string => {
    const translations: Record<string, Record<string, string>> = {
      'ES': {
        'en': 'Spain',
        'es': 'España',
        'pt': 'Espanha',
        'ro': 'Spania'
      },
      'FR': {
        'en': 'France',
        'es': 'Francia',
        'pt': 'França',
        'ro': 'Franța'
      },
      'IT': {
        'en': 'Italy',
        'es': 'Italia',
        'pt': 'Itália',
        'ro': 'Italia'
      },
      'US': {
        'en': 'USA',
        'es': 'Estados Unidos',
        'pt': 'Estados Unidos',
        'ro': 'Statele Unite'
      },
      'EG': {
        'en': 'Egypt',
        'es': 'Egipto',
        'pt': 'Egito',
        'ro': 'Egipt'
      },
      'TR': {
        'en': 'Turkey',
        'es': 'Turquía',
        'pt': 'Turquia',
        'ro': 'Turcia'
      },
      'GB': {
        'en': 'United Kingdom',
        'es': 'Reino Unido',
        'pt': 'Reino Unido',
        'ro': 'Regatul Unit'
      },
      'DE': {
        'en': 'Germany',
        'es': 'Alemania',
        'pt': 'Alemanha',
        'ro': 'Germania'
      },
      'PT': {
        'en': 'Portugal',
        'es': 'Portugal',
        'pt': 'Portugal',
        'ro': 'Portugalia'
      },
      'GR': {
        'en': 'Greece',
        'es': 'Grecia',
        'pt': 'Grécia',
        'ro': 'Grecia'
      }
    };
    
    return translations[countryCode]?.[language] || countryCode;
  };
  
  if (loading) {
    return (
      <div className={`w-full text-left px-3 py-2 rounded-md ${fontSize} text-fuchsia-300/70`}>
        {language === 'es' ? 'Cargando países...' : 
         language === 'pt' ? 'Carregando países...' : 
         language === 'ro' ? 'Se încarcă țările...' : 
         'Loading countries...'}
      </div>
    );
  }

  if (error || countries.length === 0) {
    return (
      <div className={`w-full text-left px-3 py-2 rounded-md ${fontSize} text-fuchsia-300/70`}>
        {language === 'es' ? 'No hay países disponibles' : 
         language === 'pt' ? 'Nenhum país disponível' : 
         language === 'ro' ? 'Nu sunt țări disponibile' : 
         'No countries available'}
      </div>
    );
  }
  
  return (
    <>
      {countries.map((country) => (
        <button
          key={country.code}
          onClick={() => {
            console.log("CountryOptions - Country filter selected:", country.code);
            console.log("CountryOptions - Event type:", type);
            document.dispatchEvent(new CustomEvent('updateFilter', { 
              detail: { key: type, value: country.code } 
            }));
          }}
          className={`w-full text-left px-3 py-2 rounded-md ${fontSize} font-bold transition-colors hover:bg-[#460F54]`} 
        >
          {getLocalizedCountryName(country.code)} {country.flag}
        </button>
      ))}
    </>
  );
};
