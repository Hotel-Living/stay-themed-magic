
import React, { useState } from "react";
import { Globe, Plus, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { themeCategories } from "@/utils/data";

export default function SettingsContent() {
  const { toast } = useToast();
  const [currency, setCurrency] = useState("USD");
  const [newTheme, setNewTheme] = useState("");
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [selectedThemes, setSelectedThemes] = useState<string[]>([]);
  const [themeDescription, setThemeDescription] = useState("");
  
  // Compile list of all themes for selection
  const allThemes = themeCategories.flatMap(category => 
    category.themes.map(theme => theme.name)
  );
  
  // Filter out already selected themes
  const availableThemes = allThemes.filter(theme => !selectedThemes.includes(theme));
  
  const handleAddTheme = (theme: string) => {
    if (theme && !selectedThemes.includes(theme)) {
      setSelectedThemes([...selectedThemes, theme]);
    }
  };
  
  const handleRemoveTheme = (theme: string) => {
    setSelectedThemes(selectedThemes.filter(t => t !== theme));
  };
  
  const handleSaveSettings = () => {
    toast({
      title: "Settings saved",
      description: "Your preferences have been updated successfully.",
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
    <div className="space-y-8">
      <div className="glass-card rounded-xl p-6">
        <h2 className="text-xl font-bold mb-6">Theme Preferences</h2>
        
        <div className="space-y-6">
          <div>
            <Label htmlFor="themes" className="text-base">Your Favorite Themes</Label>
            <p className="text-sm text-muted-foreground mb-3">
              Select themes that interest you the most to see personalized recommendations
            </p>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {selectedThemes.map(theme => (
                <Badge 
                  key={theme} 
                  variant="secondary"
                  className="bg-fuchsia-900/30 hover:bg-fuchsia-900/50 px-3 py-1 text-sm"
                >
                  {theme}
                  <button 
                    className="ml-2 text-fuchsia-300 hover:text-white"
                    onClick={() => handleRemoveTheme(theme)}
                  >
                    ×
                  </button>
                </Badge>
              ))}
              {selectedThemes.length === 0 && (
                <p className="text-sm text-muted-foreground">No themes selected yet</p>
              )}
            </div>
            
            <div className="flex gap-2">
              <Select onValueChange={handleAddTheme}>
                <SelectTrigger className="w-full bg-fuchsia-950/50">
                  <SelectValue placeholder="Select a theme" />
                </SelectTrigger>
                <SelectContent>
                  {availableThemes.map(theme => (
                    <SelectItem key={theme} value={theme}>{theme}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="border-t border-fuchsia-800/20 pt-6">
            <Label className="text-base">Suggest a New Theme</Label>
            <p className="text-sm text-muted-foreground mb-4">
              Don't see a theme that matches your interest? Suggest a new one!
            </p>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="newTheme">Theme Name</Label>
                <Input 
                  id="newTheme" 
                  placeholder="e.g., Sustainable Living" 
                  value={newTheme}
                  onChange={(e) => setNewTheme(e.target.value)}
                  className="bg-fuchsia-950/50"
                />
              </div>
              
              <div>
                <Label htmlFor="themeDescription">Theme Description</Label>
                <Textarea 
                  id="themeDescription" 
                  placeholder="Describe what this theme would include..." 
                  value={themeDescription}
                  onChange={(e) => setThemeDescription(e.target.value)}
                  className="bg-fuchsia-950/50 min-h-[100px]"
                />
              </div>
              
              <Button 
                onClick={handleSuggestTheme} 
                className="flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Submit Theme Suggestion
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="glass-card rounded-xl p-6">
        <h2 className="text-xl font-bold mb-6">Currency & Regional Preferences</h2>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="currency" className="text-base">Preferred Currency</Label>
            <div className="flex items-center gap-2 mt-2">
              <Globe className="h-5 w-5 text-muted-foreground" />
              <Select defaultValue={currency} onValueChange={setCurrency}>
                <SelectTrigger className="w-full bg-fuchsia-950/50">
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USD">USD ($)</SelectItem>
                  <SelectItem value="EUR">EUR (€)</SelectItem>
                  <SelectItem value="GBP">GBP (£)</SelectItem>
                  <SelectItem value="JPY">JPY (¥)</SelectItem>
                  <SelectItem value="CAD">CAD ($)</SelectItem>
                  <SelectItem value="AUD">AUD ($)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>
      
      <div className="glass-card rounded-xl p-6">
        <h2 className="text-xl font-bold mb-6">Notification Settings</h2>
        
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="emailNotifications" className="text-base">Email Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Receive updates about new hotels matching your themes
              </p>
            </div>
            <Switch 
              id="emailNotifications" 
              checked={emailNotifications} 
              onCheckedChange={setEmailNotifications}
            />
          </div>
        </div>
      </div>
      
      <div className="flex justify-end">
        <Button onClick={handleSaveSettings} className="flex items-center gap-2">
          <Save className="h-4 w-4" />
          Save Settings
        </Button>
      </div>
    </div>
  );
}
