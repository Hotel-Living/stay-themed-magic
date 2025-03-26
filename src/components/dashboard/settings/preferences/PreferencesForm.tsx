
import React from 'react';
import { Button } from '@/components/ui/button';
import { Loader2, Save } from 'lucide-react';
import { ThemesSection } from './ThemesSection';
import { CountriesSection } from './CountriesSection';
import { PriceRangeSection } from './PriceRangeSection';
import { PreferencesFormData } from '@/types/preferences';

interface PreferencesFormProps {
  formData: PreferencesFormData;
  themes: Array<{ id: string; name: string }>;
  isThemesLoading: boolean;
  isSaving: boolean;
  onThemeAdd: (theme: string) => void;
  onThemeRemove: (theme: string) => void;
  onCountryAdd: (country: string) => void;
  onCountryRemove: (country: string) => void;
  onPriceRangeChange: (values: number[]) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const PreferencesForm: React.FC<PreferencesFormProps> = ({
  formData,
  themes,
  isThemesLoading,
  isSaving,
  onThemeAdd,
  onThemeRemove,
  onCountryAdd,
  onCountryRemove,
  onPriceRangeChange,
  onSubmit
}) => {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {/* Favorite Themes Section */}
      <ThemesSection 
        favoriteThemes={formData.favorite_themes}
        onThemeAdd={onThemeAdd}
        onThemeRemove={onThemeRemove}
        themes={themes}
        isThemesLoading={isThemesLoading}
      />
      
      {/* Preferred Countries Section */}
      <CountriesSection 
        preferredCountries={formData.preferred_countries}
        onCountryAdd={onCountryAdd}
        onCountryRemove={onCountryRemove}
      />
      
      {/* Price Range Section */}
      <PriceRangeSection 
        minPrice={formData.price_range_min}
        maxPrice={formData.price_range_max}
        onPriceRangeChange={onPriceRangeChange}
      />
      
      <div className="pt-4">
        <Button 
          type="submit"
          className="bg-fuchsia-600 hover:bg-fuchsia-700 flex items-center gap-2"
          disabled={isSaving}
        >
          {isSaving ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="h-4 w-4" />
              Save Preferences
            </>
          )}
        </Button>
      </div>
    </form>
  );
};
