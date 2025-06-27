
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
  const getLocalizedCountryName = (countryName: string): string => {
    const translations: Record<string, Record<string, string>> = {
      'United States': {
        'en': 'United States',
        'es': 'Estados Unidos',
        'pt': 'Estados Unidos',
        'ro': 'Statele Unite'
      },
      'Canada': {
        'en': 'Canada',
        'es': 'Canadá',
        'pt': 'Canadá',
        'ro': 'Canada'
      },
      'Mexico': {
        'en': 'Mexico',
        'es': 'México',
        'pt': 'México',
        'ro': 'Mexic'
      },
      'Spain': {
        'en': 'Spain',
        'es': 'España',
        'pt': 'Espanha',
        'ro': 'Spania'
      },
      'France': {
        'en': 'France',
        'es': 'Francia',
        'pt': 'França',
        'ro': 'Franța'
      },
      'Italy': {
        'en': 'Italy',
        'es': 'Italia',
        'pt': 'Itália',
        'ro': 'Italia'
      },
      'Germany': {
        'en': 'Germany',
        'es': 'Alemania',
        'pt': 'Alemanha',
        'ro': 'Germania'
      },
      'Portugal': {
        'en': 'Portugal',
        'es': 'Portugal',
        'pt': 'Portugal',
        'ro': 'Portugalia'
      },
      'Romania': {
        'en': 'Romania',
        'es': 'Rumania',
        'pt': 'Romênia',
        'ro': 'România'
      },
      'Greece': {
        'en': 'Greece',
        'es': 'Grecia',
        'pt': 'Grécia',
        'ro': 'Grecia'
      },
      'Brazil': {
        'en': 'Brazil',
        'es': 'Brasil',
        'pt': 'Brasil',
        'ro': 'Brazilia'
      },
      'Argentina': {
        'en': 'Argentina',
        'es': 'Argentina',
        'pt': 'Argentina',
        'ro': 'Argentina'
      },
      'Colombia': {
        'en': 'Colombia',
        'es': 'Colombia',
        'pt': 'Colômbia',
        'ro': 'Columbia'
      },
      'Australia': {
        'en': 'Australia',
        'es': 'Australia',
        'pt': 'Austrália',
        'ro': 'Australia'
      },
      'New Zealand': {
        'en': 'New Zealand',
        'es': 'Nueva Zelanda',
        'pt': 'Nova Zelândia',
        'ro': 'Noua Zeelandă'
      },
      'South Africa': {
        'en': 'South Africa',
        'es': 'Sudáfrica',
        'pt': 'África do Sul',
        'ro': 'Africa de Sud'
      },
      'Morocco': {
        'en': 'Morocco',
        'es': 'Marruecos',
        'pt': 'Marrocos',
        'ro': 'Maroc'
      },
      'Egypt': {
        'en': 'Egypt',
        'es': 'Egipto',
        'pt': 'Egito',
        'ro': 'Egipt'
      },
      'Thailand': {
        'en': 'Thailand',
        'es': 'Tailandia',
        'pt': 'Tailândia',
        'ro': 'Thailanda'
      },
      'Indonesia': {
        'en': 'Indonesia',
        'es': 'Indonesia',
        'pt': 'Indonésia',
        'ro': 'Indonezia'
      },
      'Vietnam': {
        'en': 'Vietnam',
        'es': 'Vietnam',
        'pt': 'Vietnã',
        'ro': 'Vietnam'
      },
      'Philippines': {
        'en': 'Philippines',
        'es': 'Filipinas',
        'pt': 'Filipinas',
        'ro': 'Filipine'
      }
    };
    
    return translations[countryName]?.[language] || countryName;
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
          className={`w-full text-left px-3 py-2 rounded-md ${fontSize} font-bold transition-colors hover:bg-[#460F54] flex items-center justify-between`} 
        >
          <span>{getLocalizedCountryName(country.name)}</span>
          <span>{country.flag}</span>
        </button>
      ))}
    </>
  );
};
