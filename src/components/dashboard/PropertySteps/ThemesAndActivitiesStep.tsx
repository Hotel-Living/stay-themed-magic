
import React, { useState, useEffect } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import DirectThemes from "./themes/DirectThemes";
import ThemeCategory from "./themes/ThemeCategory";
import { themeData } from "./themes/themeData";

interface ThemesAndActivitiesStepProps {
  onValidationChange: (isValid: boolean, data?: any) => void;
  initialData?: {
    themes?: string[];
    activities?: string[];
  };
}

export default function ThemesAndActivitiesStep({
  onValidationChange,
  initialData
}: ThemesAndActivitiesStepProps) {
  const [selectedThemes, setSelectedThemes] = useState<string[]>(initialData?.themes || []);
  const [selectedActivities, setSelectedActivities] = useState<string[]>(initialData?.activities || []);
  const [error, setError] = useState<string>("");
  const [isThemesOpen, setIsThemesOpen] = useState(true);
  const [isActivitiesOpen, setIsActivitiesOpen] = useState(false);
  
  // Handle themes selection
  const handleThemeSelect = (theme: string) => {
    setSelectedThemes(prev => {
      const isAlreadySelected = prev.includes(theme);
      if (isAlreadySelected) {
        return prev.filter(t => t !== theme);
      } else {
        return [...prev, theme];
      }
    });
  };
  
  // Handle activities selection
  const handleActivitySelect = (activity: string) => {
    setSelectedActivities(prev => {
      const isAlreadySelected = prev.includes(activity);
      if (isAlreadySelected) {
        return prev.filter(a => a !== activity);
      } else {
        return [...prev, activity];
      }
    });
  };
  
  // Validate selections and update parent
  useEffect(() => {
    const isValid = selectedThemes.length > 0 && selectedActivities.length > 0;
    
    if (!isValid) {
      if (selectedThemes.length === 0) {
        setError("Please select at least one theme");
      } else {
        setError("Please select at least one activity");
      }
    } else {
      setError("");
    }
    
    onValidationChange(isValid, {
      themes: selectedThemes,
      activities: selectedActivities
    });
  }, [selectedThemes, selectedActivities]);
  
  return (
    <div className="space-y-6">
      {/* Themes Section */}
      <Collapsible 
        className="w-full border border-white rounded-lg overflow-hidden bg-fuchsia-900/10"
        open={isThemesOpen}
        onOpenChange={setIsThemesOpen}
      >
        <CollapsibleTrigger className="w-full flex items-center justify-between p-4 text-left border-b border-white">
          <h2 className="font-medium text-white">THEMES</h2>
          {isThemesOpen ? 
            <ChevronUp className="h-5 w-5 text-white" /> : 
            <ChevronDown className="h-5 w-5 text-white" />
          }
        </CollapsibleTrigger>
        <CollapsibleContent className="p-4">
          <DirectThemes 
            selectedThemes={selectedThemes}
            onThemeSelect={handleThemeSelect}
          />
        </CollapsibleContent>
      </Collapsible>
      
      {/* Activities Section */}
      <Collapsible 
        className="w-full border border-white rounded-lg overflow-hidden bg-fuchsia-900/10"
        open={isActivitiesOpen}
        onOpenChange={setIsActivitiesOpen}
      >
        <CollapsibleTrigger className="w-full flex items-center justify-between p-4 text-left border-b border-white">
          <h2 className="font-medium text-white">ACTIVITIES</h2>
          {isActivitiesOpen ? 
            <ChevronUp className="h-5 w-5 text-white" /> : 
            <ChevronDown className="h-5 w-5 text-white" />
          }
        </CollapsibleTrigger>
        <CollapsibleContent className="p-4">
          {themeData.map((category, index) => (
            <ThemeCategory 
              key={index}
              category={category.category}
              subcategories={category.subcategories}
              selectedThemes={selectedActivities}
              onThemeSelect={handleActivitySelect}
            />
          ))}
        </CollapsibleContent>
      </Collapsible>
      
      {/* Validation Error */}
      {error && (
        <div className="p-3 rounded-md text-white flex items-center gap-2 bg-purple-900/30">
          <span>{error}</span>
        </div>
      )}
      
      {/* Success Message */}
      {selectedThemes.length > 0 && selectedActivities.length > 0 && (
        <div className="p-3 rounded-md text-green-400 flex items-center gap-2 bg-green-900/20">
          <span className="text-green-300">Themes and activities selected successfully!</span>
        </div>
      )}
    </div>
  );
}
