
import React, { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { AffinitiesSection } from "./themes/AffinitiesSection";
import { ActivitiesSection } from "./activities/ActivitiesSection";
import { CustomActivitiesSection } from "./activities/CustomActivitiesSection";

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
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const [selectedThemes, setSelectedThemes] = useState<string[]>(formData.themes || []);
  const { toast } = useToast();
  const [selectedActivities, setSelectedActivities] = useState<string[]>(formData.activities || []);
  
  // Initialize from formData when it changes
  useEffect(() => {
    if (formData.themes && formData.themes.length > 0) {
      setSelectedThemes(formData.themes);
    }
    
    if (formData.activities && formData.activities.length > 0) {
      setSelectedActivities(formData.activities);
    }
  }, [formData]);

  const handleThemeSelection = (themeId: string, isSelected: boolean) => {
    setSelectedThemes(prev => {
      let newThemes;
      if (isSelected) {
        if (!prev.includes(themeId)) {
          // No toast notification
        }
        newThemes = [...prev.filter(id => id !== themeId), themeId];
      } else {
        newThemes = prev.filter(id => id !== themeId);
      }
      
      if (updateFormData) {
        updateFormData('themes', newThemes);
      }
      
      return newThemes;
    });
  };

  const handleActivityChange = (activity: string, isChecked: boolean) => {
    setSelectedActivities(prev => {
      const newActivities = isChecked 
        ? [...prev, activity]
        : prev.filter(a => a !== activity);
      
      if (updateFormData) {
        updateFormData('activities', newActivities);
      }
      
      return newActivities;
    });
  };

  useEffect(() => {
    const isValid = selectedThemes.length > 0;
    onValidationChange(isValid);
  }, [selectedThemes, onValidationChange]);
  
  return (
    <div className="space-y-8 max-w-[80%]">
      <AffinitiesSection
        openCategory={openCategory}
        setOpenCategory={setOpenCategory}
        openSubmenu={openSubmenu}
        setOpenSubmenu={setOpenSubmenu}
        onThemeSelect={handleThemeSelection}
        selectedThemes={selectedThemes}
      />

      <ActivitiesSection
        selectedActivities={selectedActivities}
        onActivityChange={handleActivityChange}
      />

      <CustomActivitiesSection />
    </div>
  );
}
