
import React, { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Loader2 } from 'lucide-react';

interface ThemesSectionProps {
  favoriteThemes: string[];
  onThemeAdd: (theme: string) => void;
  onThemeRemove: (theme: string) => void;
  themes: Array<{ id: string; name: string }>;
  isThemesLoading: boolean;
}

export const ThemesSection: React.FC<ThemesSectionProps> = ({
  favoriteThemes,
  onThemeAdd,
  onThemeRemove,
  themes,
  isThemesLoading
}) => {
  const [selectedTheme, setSelectedTheme] = useState<string>('');

  const handleAddTheme = () => {
    if (selectedTheme && !favoriteThemes.includes(selectedTheme)) {
      onThemeAdd(selectedTheme);
      setSelectedTheme('');
    }
  };

  return (
    <div className="space-y-3">
      <h4 className="text-md font-medium">Favorite Themes</h4>
      <p className="text-sm text-muted-foreground">
        Select themes you're interested in to see more relevant hotels
      </p>
      
      <div className="flex flex-wrap gap-2 mb-2">
        {favoriteThemes.map(theme => (
          <Badge 
            key={theme} 
            variant="outline"
            className="px-3 py-1 bg-fuchsia-950/20 text-fuchsia-300 hover:bg-fuchsia-950/30"
          >
            {theme}
            <button 
              type="button"
              className="ml-2 text-fuchsia-300 hover:text-fuchsia-100"
              onClick={() => onThemeRemove(theme)}
            >
              ×
            </button>
          </Badge>
        ))}
        {favoriteThemes.length === 0 && (
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
              <SelectItem value="loading" disabled>
                <div className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Loading themes...
                </div>
              </SelectItem>
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
  );
};
