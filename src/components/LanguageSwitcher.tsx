
import React, { useEffect } from 'react';
import { Globe } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'pt', name: 'Português', flag: '🇵🇹' },
    { code: 'ro', name: 'Română', flag: '🇷🇴' }
  ];

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  // Automatic language detection based on user's location
  useEffect(() => {
    const detectAndSetLanguage = async () => {
      // Only run auto-detection if language hasn't been manually set
      const hasManualLanguage = localStorage.getItem('i18nextLng');
      if (hasManualLanguage && hasManualLanguage !== 'cimode') {
        return;
      }

      try {
        // Get user's country based on IP using a free geolocation service
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        
        if (data.country_code) {
          const countryCode = data.country_code.toLowerCase();
          let detectedLanguage = 'en'; // Default fallback
          
          // Map countries to languages
          switch (countryCode) {
            case 'ro':
              detectedLanguage = 'ro';
              break;
            case 'es':
            case 'ar': // Argentina
            case 'mx': // Mexico
            case 'co': // Colombia
            case 've': // Venezuela
            case 'pe': // Peru
            case 'cl': // Chile
            case 'ec': // Ecuador
            case 'gt': // Guatemala
            case 'cu': // Cuba
            case 'bo': // Bolivia
            case 'do': // Dominican Republic
            case 'hn': // Honduras
            case 'py': // Paraguay
            case 'sv': // El Salvador
            case 'ni': // Nicaragua
            case 'cr': // Costa Rica
            case 'pa': // Panama
            case 'uy': // Uruguay
              detectedLanguage = 'es';
              break;
            case 'pt':
            case 'br': // Brazil
            case 'ao': // Angola
            case 'mz': // Mozambique
            case 'gw': // Guinea-Bissau
            case 'cv': // Cape Verde
            case 'st': // São Tomé and Príncipe
            case 'tl': // East Timor
              detectedLanguage = 'pt';
              break;
            default:
              detectedLanguage = 'en';
          }
          
          // Only change language if it's different from current and supported
          if (detectedLanguage !== i18n.language && languages.some(lang => lang.code === detectedLanguage)) {
            console.log(`Auto-detected language: ${detectedLanguage} for country: ${countryCode}`);
            i18n.changeLanguage(detectedLanguage);
          }
        }
      } catch (error) {
        console.log('Could not detect user location for language selection:', error);
        // Fallback to browser language detection
        const browserLang = navigator.language.split('-')[0];
        if (languages.some(lang => lang.code === browserLang) && browserLang !== i18n.language) {
          i18n.changeLanguage(browserLang);
        }
      }
    };

    detectAndSetLanguage();
  }, [i18n]);

  const handleLanguageChange = (languageCode: string) => {
    i18n.changeLanguage(languageCode);
    // Store the manual selection to prevent auto-detection override
    localStorage.setItem('i18nextLng', languageCode);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-2 text-white hover:text-white/80 transition-colors">
          <Globe className="w-4 h-4" />
          <span className="text-lg">{currentLanguage.flag}</span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="bg-purple-900 border border-purple-700 shadow-lg z-50"
      >
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => handleLanguageChange(language.code)}
            className="flex items-center gap-3 px-4 py-2 cursor-pointer bg-purple-900 text-white hover:bg-purple-800 focus:bg-purple-800"
          >
            <span className="text-lg">{language.flag}</span>
            <span className="text-sm font-medium">{language.name}</span>
            {i18n.language === language.code && (
              <span className="ml-auto text-xs text-white">✓</span>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
