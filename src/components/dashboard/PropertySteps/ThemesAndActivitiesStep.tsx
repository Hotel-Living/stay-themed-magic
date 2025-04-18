
import React, { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { AlertCircle } from "lucide-react";

interface ThemesAndActivitiesStepProps {
  onValidationChange?: (isValid: boolean, data?: any) => void;
  initialData?: {
    themes?: string[];
    activities?: string[];
  };
}

export default function ThemesAndActivitiesStep({ 
  onValidationChange = () => {},
  initialData = { themes: [], activities: [] }
}: ThemesAndActivitiesStepProps) {
  const [selectedThemes, setSelectedThemes] = useState<string[]>(initialData.themes || []);
  const [selectedActivities, setSelectedActivities] = useState<string[]>(initialData.activities || []);
  const [error, setError] = useState<string>("");

  // Available themes and activities
  const themes = [
    "Beach", "Mountain", "Urban", "Cultural", "Historic", "Luxury",
    "Budget", "Family-friendly", "Adult-only", "Romantic", "Wellness",
    "Adventure", "Eco-friendly", "Business", "Sports", "Nightlife"
  ];
  
  const activities = [
    "Swimming", "Hiking", "Cycling", "Golf", "Tennis", "Fishing",
    "Skiing", "Surfing", "Yoga", "Meditation", "Spa", "Cooking Classes",
    "Wine Tasting", "City Tours", "Shopping", "Museum Visits", "Live Music"
  ];

  useEffect(() => {
    // Validate selection
    const isValid = selectedThemes.length > 0;
    setError(isValid ? "" : "Please select at least one theme");
    
    // Notify parent component of validation state and data
    onValidationChange(isValid, {
      themes: selectedThemes,
      activities: selectedActivities
    });
  }, [selectedThemes, selectedActivities, onValidationChange]);

  const handleThemeChange = (theme: string) => {
    if (selectedThemes.includes(theme)) {
      setSelectedThemes(selectedThemes.filter(t => t !== theme));
    } else {
      setSelectedThemes([...selectedThemes, theme]);
    }
  };

  const handleActivityChange = (activity: string) => {
    if (selectedActivities.includes(activity)) {
      setSelectedActivities(selectedActivities.filter(a => a !== activity));
    } else {
      setSelectedActivities([...selectedActivities, activity]);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold mb-2 text-white">THEMES AND ACTIVITIES</h2>
      
      {/* Themes Section */}
      <div className="glass-card rounded-xl p-4 space-y-4 bg-[#690695]/40">
        <div>
          <Label className="text-lg font-medium text-white mb-4 block">
            Property Themes <span className="text-red-400">*</span>
          </Label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {themes.map(theme => (
              <div key={theme} className="flex items-center gap-2">
                <Checkbox 
                  id={`theme-${theme}`}
                  checked={selectedThemes.includes(theme)}
                  onCheckedChange={() => handleThemeChange(theme)}
                  className="data-[state=checked]:bg-fuchsia-500 data-[state=checked]:border-fuchsia-500"
                />
                <Label 
                  htmlFor={`theme-${theme}`}
                  className="text-white cursor-pointer"
                >
                  {theme}
                </Label>
              </div>
            ))}
          </div>
        </div>
        
        {/* Activities Section */}
        <div className="mt-8">
          <Label className="text-lg font-medium text-white mb-4 block">
            Available Activities (Optional)
          </Label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {activities.map(activity => (
              <div key={activity} className="flex items-center gap-2">
                <Checkbox 
                  id={`activity-${activity}`}
                  checked={selectedActivities.includes(activity)}
                  onCheckedChange={() => handleActivityChange(activity)}
                  className="data-[state=checked]:bg-fuchsia-500 data-[state=checked]:border-fuchsia-500"
                />
                <Label 
                  htmlFor={`activity-${activity}`}
                  className="text-white cursor-pointer"
                >
                  {activity}
                </Label>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Error Message */}
      {error && (
        <div className="p-3 rounded-md bg-red-500/20 text-red-200 flex items-center gap-2">
          <AlertCircle className="h-5 w-5" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}
