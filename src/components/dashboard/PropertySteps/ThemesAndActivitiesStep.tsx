
import React, { useState, useEffect } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface ThemesAndActivitiesStepProps {
  onValidationChange?: (isValid: boolean) => void;
  formData?: any;
  updateFormData?: (field: string, value: any) => void;
}

export default function ThemesAndActivitiesStep({
  onValidationChange = () => {},
  formData = {},
  updateFormData = () => {}
}: ThemesAndActivitiesStepProps) {
  // Initialize from form data if available
  const [selectedThemes, setSelectedThemes] = useState<string[]>(
    formData.themes || []
  );
  const [selectedActivities, setSelectedActivities] = useState<string[]>(
    formData.activities || []
  );
  const [customTheme, setCustomTheme] = useState("");
  const [customActivity, setCustomActivity] = useState("");
  const [showCustomThemeInput, setShowCustomThemeInput] = useState(false);
  const [showCustomActivityInput, setShowCustomActivityInput] = useState(false);

  // Predefined themes and activities
  const themes = [
    "Adventure", "Luxury", "Beach", "City", "Culture", "Eco-friendly",
    "Family", "Historic", "Nature", "Romantic", "Wellness", "Sports"
  ];
  
  const activities = [
    "Swimming", "Hiking", "Spa", "Yoga", "Fishing", "Golf",
    "Tennis", "Diving", "Skiing", "Tours", "Cycling", "Surfing"
  ];

  // When selections change, update form data and validation
  useEffect(() => {
    if (updateFormData) {
      updateFormData('themes', selectedThemes);
      updateFormData('activities', selectedActivities);
    }
    
    // Consider the form valid if at least one theme is selected
    // You can modify this validation logic as needed
    const isValid = selectedThemes.length > 0;
    onValidationChange(isValid);
  }, [selectedThemes, selectedActivities, updateFormData, onValidationChange]);

  const handleThemeChange = (theme: string, checked: boolean) => {
    if (checked) {
      setSelectedThemes(prev => [...prev, theme]);
    } else {
      setSelectedThemes(prev => prev.filter(t => t !== theme));
    }
  };

  const handleActivityChange = (activity: string, checked: boolean) => {
    if (checked) {
      setSelectedActivities(prev => [...prev, activity]);
    } else {
      setSelectedActivities(prev => prev.filter(a => a !== activity));
    }
  };

  const handleAddCustomTheme = () => {
    if (customTheme.trim()) {
      setSelectedThemes(prev => [...prev, customTheme.trim()]);
      setCustomTheme("");
      setShowCustomThemeInput(false);
    }
  };

  const handleAddCustomActivity = () => {
    if (customActivity.trim()) {
      setSelectedActivities(prev => [...prev, customActivity.trim()]);
      setCustomActivity("");
      setShowCustomActivityInput(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold mb-4">THEMES</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {themes.map(theme => (
            <div key={theme} className="flex items-center space-x-2">
              <Checkbox 
                id={`theme-${theme}`} 
                checked={selectedThemes.includes(theme)}
                onCheckedChange={(checked) => handleThemeChange(theme, checked === true)}
                className="border-fuchsia-500/50"
              />
              <Label htmlFor={`theme-${theme}`}>{theme}</Label>
            </div>
          ))}
        </div>
        
        {showCustomThemeInput ? (
          <div className="mt-4 flex items-center gap-2">
            <Input
              value={customTheme}
              onChange={(e) => setCustomTheme(e.target.value)}
              placeholder="Add custom theme"
              className="bg-fuchsia-950/30 border-fuchsia-500/30"
            />
            <Button 
              size="sm"
              onClick={handleAddCustomTheme}
              className="bg-fuchsia-600 hover:bg-fuchsia-700"
            >
              Add
            </Button>
            <Button 
              size="sm" 
              variant="outline" 
              onClick={() => setShowCustomThemeInput(false)}
              className="border-fuchsia-500/50 text-fuchsia-300"
            >
              Cancel
            </Button>
          </div>
        ) : (
          <Button 
            size="sm" 
            className="mt-4 flex items-center bg-fuchsia-700/50 hover:bg-fuchsia-700/70 text-white"
            onClick={() => setShowCustomThemeInput(true)}
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Custom Theme
          </Button>
        )}
      </div>

      <div>
        <h3 className="text-xl font-bold mb-4">ACTIVITIES</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {activities.map(activity => (
            <div key={activity} className="flex items-center space-x-2">
              <Checkbox 
                id={`activity-${activity}`} 
                checked={selectedActivities.includes(activity)}
                onCheckedChange={(checked) => handleActivityChange(activity, checked === true)}
                className="border-fuchsia-500/50"
              />
              <Label htmlFor={`activity-${activity}`}>{activity}</Label>
            </div>
          ))}
        </div>
        
        {showCustomActivityInput ? (
          <div className="mt-4 flex items-center gap-2">
            <Input
              value={customActivity}
              onChange={(e) => setCustomActivity(e.target.value)}
              placeholder="Add custom activity"
              className="bg-fuchsia-950/30 border-fuchsia-500/30"
            />
            <Button 
              size="sm"
              onClick={handleAddCustomActivity}
              className="bg-fuchsia-600 hover:bg-fuchsia-700"
            >
              Add
            </Button>
            <Button 
              size="sm" 
              variant="outline" 
              onClick={() => setShowCustomActivityInput(false)}
              className="border-fuchsia-500/50 text-fuchsia-300"
            >
              Cancel
            </Button>
          </div>
        ) : (
          <Button 
            size="sm" 
            className="mt-4 flex items-center bg-fuchsia-700/50 hover:bg-fuchsia-700/70 text-white"
            onClick={() => setShowCustomActivityInput(true)}
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Custom Activity
          </Button>
        )}
      </div>
    </div>
  );
}
