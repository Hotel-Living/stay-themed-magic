
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

  // Update local state when formData changes
  useEffect(() => {
    if (formData.themes && formData.themes.length > 0) {
      console.log("Setting themes from formData:", formData.themes);
      setSelectedThemes(formData.themes);
    }
    
    if (formData.activities && formData.activities.length > 0) {
      console.log("Setting activities from formData:", formData.activities);
      setSelectedActivities(formData.activities);
    }
  }, [formData.themes, formData.activities]);

  // Update parent form data when local state changes
  useEffect(() => {
    console.log("Updating themes in formData:", selectedThemes);
    updateFormData('themes', selectedThemes);
    console.log("Updating activities in formData:", selectedActivities);
    updateFormData('activities', selectedActivities);
    
    // Validate - at least one theme and one activity must be selected
    const valid = selectedThemes.length > 0 && selectedActivities.length > 0;
    setIsValid(valid);
    onValidationChange(valid);
  }, [selectedThemes, selectedActivities, updateFormData, onValidationChange]);

  const handleThemeSelect = (themeId: string, isSelected: boolean) => {
    if (isSelected) {
      setSelectedThemes(prev => [...prev, themeId]);
    } else {
      setSelectedThemes(prev => prev.filter(id => id !== themeId));
    }
    console.log("Theme selection changed:", themeId, isSelected, "Current themes:", 
      isSelected ? [...selectedThemes, themeId] : selectedThemes.filter(id => id !== themeId));
  };

  const handleActivityChange = (activity: string, isChecked: boolean) => {
    setSelectedActivities(prev => 
      isChecked 
        ? [...prev, activity]
        : prev.filter(a => a !== activity)
    );
    console.log("Activity selection changed:", activity, isChecked, "Current activities:", 
      isChecked ? [...selectedActivities, activity] : selectedActivities.filter(a => a !== activity));
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
