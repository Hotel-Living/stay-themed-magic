
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
  
  const handleThemeSelection = (themeId: string, isSelected: boolean) => {
    setSelectedThemes(prev => {
      let newThemes;
      if (isSelected) {
        if (!prev.includes(themeId)) {
          toast({
            title: "Theme selected",
            description: "The theme has been added to your selection"
          });
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
    <div className="space-y-8">
      <AffinitiesSection
        openCategory={openCategory}
        setOpenCategory={setOpenCategory}
        openSubmenu={openSubmenu}
        setOpenSubmenu={setOpenSubmenu}
        onThemeSelect={handleThemeSelection}
      />

      <ActivitiesSection
        selectedActivities={selectedActivities}
        onActivityChange={handleActivityChange}
      />

      <CustomActivitiesSection />
    </div>
  );
}
