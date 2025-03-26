
import React, { useState, useEffect } from 'react';
import { useUserPreferences } from '@/hooks/useUserPreferences';
import { useThemes } from '@/hooks/useThemes';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Loader2, Save } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { PreferencesFormData } from '@/types/preferences';
import { useToast } from '@/hooks/use-toast';

const countries = [
  'United States', 'Canada', 'Mexico', 'Brazil', 'Argentina', 
  'United Kingdom', 'France', 'Germany', 'Spain', 'Italy', 
  'Switzerland', 'Netherlands', 'Sweden', 'Norway', 'Denmark',
  'Japan', 'China', 'South Korea', 'Australia', 'New Zealand', 
  'Thailand', 'Singapore', 'Malaysia', 'Indonesia', 'India'
];

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
  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const [selectedTheme, setSelectedTheme] = useState<string>('');
  
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
  
  const handleAddTheme = () => {
    if (selectedTheme && !formData.favorite_themes.includes(selectedTheme)) {
      setFormData(prev => ({
        ...prev,
        favorite_themes: [...prev.favorite_themes, selectedTheme]
      }));
      setSelectedTheme('');
    }
  };
  
  const handleAddCountry = () => {
    if (selectedCountry && !formData.preferred_countries.includes(selectedCountry)) {
      setFormData(prev => ({
        ...prev,
        preferred_countries: [...prev.preferred_countries, selectedCountry]
      }));
      setSelectedCountry('');
    }
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
    return (
      <div className="flex justify-center items-center h-40">
        <Loader2 className="w-6 h-6 text-primary animate-spin" />
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium mb-4">Preferences Settings</h3>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Favorite Themes Section */}
        <div className="space-y-3">
          <h4 className="text-md font-medium">Favorite Themes</h4>
          <p className="text-sm text-muted-foreground">
            Select themes you're interested in to see more relevant hotels
          </p>
          
          <div className="flex flex-wrap gap-2 mb-2">
            {formData.favorite_themes.map(theme => (
              <Badge 
                key={theme} 
                variant="outline"
                className="px-3 py-1 bg-fuchsia-950/20 text-fuchsia-300 hover:bg-fuchsia-950/30"
              >
                {theme}
                <button 
                  type="button"
                  className="ml-2 text-fuchsia-300 hover:text-fuchsia-100"
                  onClick={() => handleRemoveTheme(theme)}
                >
                  ×
                </button>
              </Badge>
            ))}
            {formData.favorite_themes.length === 0 && (
              <p className="text-sm italic text-muted-foreground">No favorite themes selected</p>
            )}
          </div>
          
          <div className="flex gap-2">
            <Select value={selectedTheme} onValueChange={setSelectedTheme}>
              <SelectTrigger className="w-full bg-fuchsia-950/20 border border-fuchsia-800/30">
                <SelectValue placeholder="Select a theme" />
              </SelectTrigger>
              <SelectContent>
                {isThemesLoading ? (
                  <SelectItem value="loading" disabled>Loading themes...</SelectItem>
                ) : (
                  themes.map(theme => (
                    <SelectItem key={theme.id} value={theme.name}>
                      {theme.name}
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
            <Button 
              type="button" 
              variant="outline" 
              className="border-fuchsia-600"
              onClick={handleAddTheme}
            >
              Add
            </Button>
          </div>
        </div>
        
        {/* Preferred Countries Section */}
        <div className="space-y-3">
          <h4 className="text-md font-medium">Preferred Countries</h4>
          <p className="text-sm text-muted-foreground">
            Select countries you're interested in to see more relevant hotels
          </p>
          
          <div className="flex flex-wrap gap-2 mb-2">
            {formData.preferred_countries.map(country => (
              <Badge 
                key={country} 
                variant="outline"
                className="px-3 py-1 bg-fuchsia-950/20 text-fuchsia-300 hover:bg-fuchsia-950/30"
              >
                {country}
                <button 
                  type="button"
                  className="ml-2 text-fuchsia-300 hover:text-fuchsia-100"
                  onClick={() => handleRemoveCountry(country)}
                >
                  ×
                </button>
              </Badge>
            ))}
            {formData.preferred_countries.length === 0 && (
              <p className="text-sm italic text-muted-foreground">No preferred countries selected</p>
            )}
          </div>
          
          <div className="flex gap-2">
            <Select value={selectedCountry} onValueChange={setSelectedCountry}>
              <SelectTrigger className="w-full bg-fuchsia-950/20 border border-fuchsia-800/30">
                <SelectValue placeholder="Select a country" />
              </SelectTrigger>
              <SelectContent>
                {countries.map(country => (
                  <SelectItem key={country} value={country}>
                    {country}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button 
              type="button" 
              variant="outline" 
              className="border-fuchsia-600"
              onClick={handleAddCountry}
            >
              Add
            </Button>
          </div>
        </div>
        
        {/* Price Range Section */}
        <div className="space-y-3">
          <h4 className="text-md font-medium">Price Range (per month)</h4>
          <p className="text-sm text-muted-foreground">
            Set your preferred price range for hotels
          </p>
          
          <div className="px-3 pt-6 pb-2">
            <Slider 
              min={0} 
              max={10000} 
              step={100}
              value={[formData.price_range_min, formData.price_range_max]}
              onValueChange={handlePriceRangeChange}
              className="my-6"
            />
            
            <div className="flex justify-between mt-2">
              <div>
                <span className="text-sm font-medium">Min:</span>
                <span className="ml-1 text-fuchsia-400">${formData.price_range_min}</span>
              </div>
              <div>
                <span className="text-sm font-medium">Max:</span>
                <span className="ml-1 text-fuchsia-400">${formData.price_range_max}</span>
              </div>
            </div>
          </div>
        </div>
        
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
    </div>
  );
};

export default UserPreferencesSettings;
