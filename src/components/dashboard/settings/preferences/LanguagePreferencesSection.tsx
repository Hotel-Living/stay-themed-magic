
import React from 'react';
import { X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface LanguagePreferencesSectionProps {
  languagePreferences: string[];
  onLanguageAdd: (language: string) => void;
  onLanguageRemove: (language: string) => void;
}

const AVAILABLE_LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
  { code: 'de', name: 'German' },
  { code: 'it', name: 'Italian' },
  { code: 'pt', name: 'Portuguese' },
  { code: 'zh', name: 'Chinese' },
  { code: 'ja', name: 'Japanese' },
  { code: 'ko', name: 'Korean' },
  { code: 'ar', name: 'Arabic' },
  { code: 'hi', name: 'Hindi' },
  { code: 'ru', name: 'Russian' }
];

export const LanguagePreferencesSection: React.FC<LanguagePreferencesSectionProps> = ({
  languagePreferences,
  onLanguageAdd,
  onLanguageRemove
}) => {
  // Get languages that aren't already selected
  const availableLanguages = AVAILABLE_LANGUAGES.filter(
    lang => !languagePreferences.includes(lang.code)
  );

  const handleSelectLanguage = (languageCode: string) => {
    if (languageCode && !languagePreferences.includes(languageCode)) {
      onLanguageAdd(languageCode);
    }
  };

  return (
    <div className="space-y-3">
      <h4 className="text-md font-medium">Language Preferences</h4>
      <p className="text-sm text-muted-foreground">
        Select languages you speak or are comfortable with
      </p>
      
      {/* Language selection dropdown */}
      <div className="pt-2">
        <Select 
          onValueChange={handleSelectLanguage}
          disabled={availableLanguages.length === 0}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Add a language" />
          </SelectTrigger>
          <SelectContent>
            {availableLanguages.map(language => (
              <SelectItem key={language.code} value={language.code}>
                {language.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      {/* Selected languages */}
      <div className="flex flex-wrap gap-2 pt-2">
        {languagePreferences.length > 0 ? (
          languagePreferences.map(langCode => {
            const language = AVAILABLE_LANGUAGES.find(l => l.code === langCode);
            return (
              <Badge key={langCode} className="bg-fuchsia-600 px-3 py-1 flex items-center gap-1">
                {language?.name || langCode}
                <button
                  type="button"
                  onClick={() => onLanguageRemove(langCode)}
                  className="ml-1 text-white hover:text-red-200 transition-colors"
                >
                  <X className="h-3 w-3" />
                  <span className="sr-only">Remove</span>
                </button>
              </Badge>
            );
          })
        ) : (
          <p className="text-sm text-muted-foreground italic">No languages selected</p>
        )}
      </div>
    </div>
  );
};
