
import React from 'react';
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

  const handleLanguageChange = (languageCode: string) => {
    i18n.changeLanguage(languageCode);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-3 px-3 py-2 rounded-lg bg-gradient-to-r from-purple-600/20 to-purple-800/20 border border-purple-500/30 text-white hover:bg-purple-700/30 transition-all duration-200 hover:scale-105">
          <Globe className="w-4 h-4" />
          <span className="text-2xl" role="img" aria-label={currentLanguage.name}>
            {currentLanguage.flag}
          </span>
          <span className="text-sm font-medium hidden sm:block">
            {currentLanguage.name}
          </span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="bg-gradient-to-b from-purple-900 to-purple-950 border border-purple-700 shadow-xl backdrop-blur-sm z-50 min-w-[180px]"
      >
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => handleLanguageChange(language.code)}
            className="flex items-center gap-4 px-4 py-3 cursor-pointer bg-transparent text-white hover:bg-purple-800/50 focus:bg-purple-800/50 transition-colors duration-200"
          >
            <span className="text-2xl" role="img" aria-label={language.name}>
              {language.flag}
            </span>
            <span className="text-sm font-medium flex-1">{language.name}</span>
            {i18n.language === language.code && (
              <span className="ml-auto text-xs text-green-400 font-bold">✓</span>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
