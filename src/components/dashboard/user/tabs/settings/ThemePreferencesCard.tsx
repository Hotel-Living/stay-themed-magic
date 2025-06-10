
import React from "react";
import { Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { themeCategories } from "@/utils/themeConstants";

interface ThemePreferencesCardProps {
  selectedThemes: string[];
  setSelectedThemes: (themes: string[]) => void;
  newTheme: string;
  setNewTheme: (theme: string) => void;
  themeDescription: string;
  setThemeDescription: (description: string) => void;
}

export const ThemePreferencesCard: React.FC<ThemePreferencesCardProps> = ({
  selectedThemes,
  setSelectedThemes,
  newTheme,
  setNewTheme,
  themeDescription,
  setThemeDescription
}) => {
  const { toast } = useToast();

  // Compile list of all themes for selection
  const allThemes = themeCategories.flatMap(category => 
    category.themes.map(theme => theme.name)
  );
  
  // Filter out already selected themes
  const availableThemes = allThemes.filter(theme => !selectedThemes.includes(theme));
  
  const handleAddTheme = (theme: string) => {
    if (theme && !selectedThemes.includes(theme)) {
      setSelectedThemes([...selectedThemes, theme]);
      toast({
        title: "Theme added",
        description: `${theme} has been added to your preferences.`,
      });
    }
  };
  
  const handleRemoveTheme = (theme: string) => {
    setSelectedThemes(selectedThemes.filter(t => t !== theme));
    toast({
      title: "Theme removed",
      description: `${theme} has been removed from your preferences.`,
    });
  };
  
  const handleSuggestTheme = () => {
    if (!newTheme.trim() || !themeDescription.trim()) {
      toast({
        title: "Missing information",
        description: "Please enter both a theme name and description.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Theme suggestion submitted",
      description: "Thank you for your suggestion! We'll review it shortly.",
    });
    
    setNewTheme("");
    setThemeDescription("");
  };

  return (
    <Card>
      <CardHeader className="text-white">
        <CardTitle>Theme Preferences</CardTitle>
        <CardDescription className="text-gray-200">
          Select themes that interest you to get personalized hotel recommendations
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 bg-[#860493]">
        <div>
          <Label htmlFor="themes" className="text-base text-white">Your Favorite Themes</Label>
          <p className="text-sm text-gray-200 mb-3">
            Select themes that interest you the most to see personalized recommendations
          </p>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {selectedThemes.map(theme => (
              <Badge 
                key={theme} 
                variant="secondary"
                className="bg-fuchsia-900/30 hover:bg-fuchsia-900/50 px-3 py-1 text-sm group"
              >
                {theme}
                <button 
                  className="ml-2 text-fuchsia-300 hover:text-white"
                  onClick={() => handleRemoveTheme(theme)}
                  aria-label={`Remove ${theme}`}
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
            {selectedThemes.length === 0 && (
              <p className="text-sm text-gray-200">No themes selected yet</p>
            )}
          </div>
          
          <div className="flex gap-2">
            <Select onValueChange={handleAddTheme}>
              <SelectTrigger className="w-full bg-fuchsia-950/50 text-white">
                <SelectValue placeholder="Select a theme" />
              </SelectTrigger>
              <SelectContent>
                {availableThemes.length > 0 ? (
                  availableThemes.map(theme => (
                    <SelectItem key={theme} value={theme}>{theme}</SelectItem>
                  ))
                ) : (
                  <SelectItem value="none" disabled>All themes selected</SelectItem>
                )}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="mt-8">
          <Label className="text-base text-white">Browse Available Themes</Label>
          <p className="text-sm text-gray-200 mb-3">
            Explore our curated collection of themed hotel experiences
          </p>
          
          <Accordion type="single" collapsible className="w-full">
            {themeCategories.map((category, index) => (
              <AccordionItem key={index} value={`category-${index}`}>
                <AccordionTrigger className="text-fuchsia-200 hover:text-fuchsia-100">
                  {category.name}
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2 pl-2">
                    {category.themes.map((theme, themeIndex) => (
                      <div key={themeIndex} className="flex items-start justify-between py-2 border-b border-fuchsia-800/20 last:border-none">
                        <div>
                          <h4 className="font-medium text-white">{theme.name}</h4>
                          <p className="text-sm text-gray-200">{theme.description}</p>
                        </div>
                        {!selectedThemes.includes(theme.name) ? (
                          <Button 
                            size="sm" 
                            variant="outline"
                            className="ml-2 mt-1 h-8 bg-fuchsia-900/20 hover:bg-fuchsia-800/30 text-white"
                            onClick={() => handleAddTheme(theme.name)}
                          >
                            Add
                          </Button>
                        ) : (
                          <Badge variant="outline" className="ml-2 mt-1 bg-fuchsia-900/40">Added</Badge>
                        )}
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
        
        <div className="border-t border-fuchsia-800/20 pt-6 mt-6">
          <Label className="text-base text-white">Suggest a New Theme</Label>
          <p className="text-sm text-gray-200 mb-4">
            Don't see a theme that matches your interest? Suggest a new one!
          </p>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="newTheme" className="text-white">Theme Name</Label>
              <Input 
                id="newTheme" 
                placeholder="e.g., Sustainable Living" 
                value={newTheme}
                onChange={(e) => setNewTheme(e.target.value)}
                className="bg-fuchsia-950/50 text-white"
              />
            </div>
            
            <div>
              <Label htmlFor="themeDescription" className="text-white">Theme Description</Label>
              <Textarea 
                id="themeDescription" 
                placeholder="Describe what this theme would include..." 
                value={themeDescription}
                onChange={(e) => setThemeDescription(e.target.value)}
                className="bg-fuchsia-950/50 min-h-[100px] text-white"
              />
            </div>
            
            <Button 
              onClick={handleSuggestTheme} 
              className="flex items-center gap-2 text-white"
            >
              <Plus className="h-4 w-4" />
              Submit Theme Suggestion
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
