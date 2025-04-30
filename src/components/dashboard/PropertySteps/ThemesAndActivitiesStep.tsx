
import React, { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import DirectThemes from "./themes/DirectThemes";
import { AffinitiesSection } from "./themes/AffinitiesSection";
import { ActivitiesSection } from "./activities/ActivitiesSection";

interface ThemesAndActivitiesStepProps {
  onValidationChange?: (isValid: boolean) => void;
  formData?: any;
  updateFormData?: (field: string, value: any) => void;
}

// Direct themes that should be immediately available for selection
const directThemes: any[] = [];

export default function ThemesAndActivitiesStep({
  onValidationChange = () => {},
  formData = {},
  updateFormData = () => {}
}: ThemesAndActivitiesStepProps) {
  const [selectedThemes, setSelectedThemes] = useState<string[]>(formData.themes || []);
  const [selectedActivities, setSelectedActivities] = useState<string[]>(formData.activities || []);
  const [isValid, setIsValid] = useState(false);
  const { toast } = useToast();
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  // Debug the incoming form data
  useEffect(() => {
    console.log("ThemesAndActivitiesStep - Initial formData:", {
      themes: formData.themes,
      activities: formData.activities
    });
  }, []);

  // Update local state when formData changes
  useEffect(() => {
    if (formData.themes && Array.isArray(formData.themes)) {
      console.log("Setting themes from formData:", formData.themes);
      setSelectedThemes(formData.themes);
    }
    
    if (formData.activities && Array.isArray(formData.activities)) {
      console.log("Setting activities from formData:", formData.activities);
      setSelectedActivities(formData.activities);
    }
  }, [formData.themes, formData.activities]);

  // Update parent form data when local state changes - with debounce to prevent flicker
  useEffect(() => {
    // Store current values for the timeout closure
    const currentThemes = [...selectedThemes];
    const currentActivities = [...selectedActivities];
    
    // For activities, we still want to ensure we have valid activities
    const validActivities = currentActivities.filter(id => {
      if (!id) return false;
      return typeof id === 'string';
    });
    
    console.log("Updating themes in formData:", currentThemes);
    updateFormData('themes', currentThemes);
    
    console.log("Updating activities in formData:", validActivities);
    updateFormData('activities', validActivities);
    
    // Validate - must have at least one theme and activity
    const valid = currentThemes.length > 0 && validActivities.length > 0;
    
    // Only update validation state if it changed
    if (valid !== isValid) {
      setIsValid(valid);
      onValidationChange(valid);
    }
  }, [selectedThemes, selectedActivities, updateFormData, onValidationChange]);

  const handleThemeSelect = (themeId: string, isSelected: boolean) => {
    setSelectedThemes(prev => {
      if (isSelected) {
        if (!prev.includes(themeId)) {
          return [...prev, themeId];
        }
        return prev;
      } else {
        return prev.filter(id => id !== themeId);
      }
    });
    console.log("Theme selection changed:", themeId, isSelected);
  };

  const handleActivityChange = (activityId: string, isChecked: boolean) => {
    console.log(`Activity change in ThemesAndActivitiesStep: ${activityId} is now ${isChecked ? 'selected' : 'deselected'}`);
    
    setSelectedActivities(prev => 
      isChecked 
        ? (prev.includes(activityId) ? prev : [...prev, activityId])
        : prev.filter(id => id !== activityId)
    );
  };

  return (
    <div className="space-y-6 max-w-[80%]">
      <div className="space-y-8">
        <DirectThemes 
          themes={directThemes}
          selectedThemes={selectedThemes} 
          onThemeSelect={handleThemeSelect}
        />
        
        <AffinitiesSection 
          selectedThemes={selectedThemes}
          onThemeSelect={handleThemeSelect}
          openCategory={openCategory}
          setOpenCategory={setOpenCategory}
          openSubmenu={openSubmenu}
          setOpenSubmenu={setOpenSubmenu}
        />
        
        <ActivitiesSection 
          selectedActivities={selectedActivities}
          onActivityChange={handleActivityChange}
        />
      </div>
    </div>
  );
}
