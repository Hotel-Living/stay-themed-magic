
import React from "react";
import { Moon, Plus, Sun, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface ThemePreferencesCardProps {
  selectedThemes: string[];
  setSelectedThemes: React.Dispatch<React.SetStateAction<string[]>>;
  newTheme: string;
  setNewTheme: React.Dispatch<React.SetStateAction<string>>;
  themeDescription: string;
  setThemeDescription: React.Dispatch<React.SetStateAction<string>>;
}

export const ThemePreferencesCard: React.FC<ThemePreferencesCardProps> = ({
  selectedThemes,
  setSelectedThemes,
  newTheme,
  setNewTheme,
  themeDescription,
  setThemeDescription
}) => {
  const themeOptions = [
    { id: "light", name: "Light", icon: <Sun className="h-4 w-4" /> },
    { id: "dark", name: "Dark", icon: <Moon className="h-4 w-4" /> },
    { id: "system", name: "System", icon: <Sun className="h-4 w-4" /> }
  ];

  const addTheme = () => {
    if (newTheme && !selectedThemes.includes(newTheme)) {
      setSelectedThemes([...selectedThemes, newTheme]);
      setNewTheme("");
      setThemeDescription("");
    }
  };

  const removeTheme = (theme: string) => {
    setSelectedThemes(selectedThemes.filter(t => t !== theme));
  };

  return (
    <Card>
      <CardHeader className="text-white">
        <CardTitle>Theme Preferences</CardTitle>
        <CardDescription className="text-gray-200">Customize your visual experience</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 bg-[#860493]">
        <div className="space-y-2">
          <Label htmlFor="theme" className="text-base text-white">Select Theme</Label>
          <div className="flex gap-2">
            {themeOptions.map(theme => (
              <Button
                key={theme.id}
                variant="outline"
                size="sm"
                className={cn(
                  "flex items-center gap-1 py-2 bg-fuchsia-950/50 text-white border-fuchsia-800",
                  selectedThemes.includes(theme.id) && "bg-fuchsia-800"
                )}
                onClick={() => 
                  selectedThemes.includes(theme.id) 
                    ? removeTheme(theme.id) 
                    : setSelectedThemes([...selectedThemes, theme.id])
                }
              >
                {theme.icon}
                {theme.name}
              </Button>
            ))}
          </div>
        </div>

        <div className="space-y-2 pt-4 border-t border-fuchsia-800">
          <Label htmlFor="custom-theme" className="text-base text-white">Add Custom Theme</Label>
          <div className="flex gap-2">
            <Input
              id="custom-theme"
              value={newTheme}
              onChange={e => setNewTheme(e.target.value)}
              placeholder="Theme name"
              className="bg-fuchsia-950/50 text-white border-fuchsia-800"
            />
            <Button 
              onClick={addTheme} 
              variant="outline" 
              className="bg-fuchsia-950/50 text-white border-fuchsia-800"
              disabled={!newTheme}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {newTheme && (
          <div className="space-y-2">
            <Label htmlFor="theme-description" className="text-sm text-white">Theme Description</Label>
            <Textarea
              id="theme-description"
              value={themeDescription}
              onChange={e => setThemeDescription(e.target.value)}
              placeholder="Describe this theme..."
              className="bg-fuchsia-950/50 text-white border-fuchsia-800"
            />
          </div>
        )}

        {selectedThemes.length > 0 && (
          <div className="space-y-2 pt-4">
            <Label className="text-sm text-white">Selected Themes</Label>
            <div className="space-y-2">
              {selectedThemes.map(theme => (
                <div key={theme} className="flex items-center justify-between p-2 bg-fuchsia-950/50 rounded-md">
                  <span className="text-white">{theme}</span>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => removeTheme(theme)}
                    className="text-white hover:bg-fuchsia-800 hover:text-white"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
