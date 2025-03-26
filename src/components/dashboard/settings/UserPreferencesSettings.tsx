
import React, { useState, useEffect } from 'react';
import { useUserPreferences } from '@/hooks/useUserPreferences';
import { useThemes } from '@/hooks/useThemes';
import { PreferencesFormData } from '@/types/preferences';
import { useToast } from '@/hooks/use-toast';
import { PreferencesForm } from './preferences/PreferencesForm';
import { PreferencesLoading } from './preferences/PreferencesLoading';

export const UserPreferencesSettings = () => {
  const { preferences, isLoading, savePreferences } = useUserPreferences();
  const { data: themes = [], isLoading: isThemesLoading } = useThemes();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState<PreferencesFormData>({
    favorite_themes: [],
    preferred_countries: [],
    price_range_min: 0,
    price_range_max: 5000
  });
  
  const [isSaving, setIsSaving] = useState(false);
  
  // Initialize form with existing preferences
  useEffect(() => {
    if (preferences) {
      setFormData({
        favorite_themes: preferences.favorite_themes || [],
        preferred_countries: preferences.preferred_countries || [],
        price_range_min: preferences.price_range_min || 0,
        price_range_max: preferences.price_range_max || 5000
      });
    }
  }, [preferences]);
  
  const handleRemoveTheme = (theme: string) => {
    setFormData(prev => ({
      ...prev,
      favorite_themes: prev.favorite_themes.filter(t => t !== theme)
    }));
  };
  
  const handleRemoveCountry = (country: string) => {
    setFormData(prev => ({
      ...prev,
      preferred_countries: prev.preferred_countries.filter(c => c !== country)
    }));
  };
  
  const handleAddTheme = (theme: string) => {
    setFormData(prev => ({
      ...prev,
      favorite_themes: [...prev.favorite_themes, theme]
    }));
  };
  
  const handleAddCountry = (country: string) => {
    setFormData(prev => ({
      ...prev,
      preferred_countries: [...prev.preferred_countries, country]
    }));
  };
  
  const handlePriceRangeChange = (value: number[]) => {
    setFormData(prev => ({
      ...prev,
      price_range_min: value[0],
      price_range_max: value[1]
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    try {
      await savePreferences(formData);
    } finally {
      setIsSaving(false);
    }
  };
  
  if (isLoading) {
    return <PreferencesLoading />;
  }
  
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium mb-4">Preferences Settings</h3>
      
      <PreferencesForm
        formData={formData}
        themes={themes}
        isThemesLoading={isThemesLoading}
        isSaving={isSaving}
        onThemeAdd={handleAddTheme}
        onThemeRemove={handleRemoveTheme}
        onCountryAdd={handleAddCountry}
        onCountryRemove={handleRemoveCountry}
        onPriceRangeChange={handlePriceRangeChange}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default UserPreferencesSettings;
