
import React, { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import DirectThemes from "./themes/DirectThemes";
import { AffinitiesSection } from "./themes/AffinitiesSection";
import { ActivitiesSection } from "./activities/ActivitiesSection";
import { themeCategories } from "@/utils/themes";

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
  const [selectedThemes, setSelectedThemes] = useState<string[]>(formData.themes || []);
  const [selectedActivities, setSelectedActivities] = useState<string[]>(formData.activities || []);
  const [isValid, setIsValid] = useState(false);
  const { toast } = useToast();
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  // Update local state when formData changes
  useEffect(() => {
    if (formData.themes && formData.themes.length > 0) {
      setSelectedThemes(formData.themes);
    }
    
    if (formData.activities && formData.activities.length > 0) {
      setSelectedActivities(formData.activities);
    }
  }, [formData.themes, formData.activities]);

  // Update parent form data when local state changes
  useEffect(() => {
    updateFormData('themes', selectedThemes);
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
  };

  const handleActivityChange = (activity: string, isChecked: boolean) => {
    setSelectedActivities(prev => 
      isChecked 
        ? [...prev, activity]
        : prev.filter(a => a !== activity)
    );
  };

  // Get all direct themes from theme categories
  const getAllDirectThemes = () => {
    const directThemes: { id: string; name: string }[] = [];
    
    themeCategories.forEach(category => {
      if (category.themes) {
        directThemes.push(...category.themes.filter(theme => !theme.isAddOption));
      }
    });
    
    return directThemes;
  };

  return (
    <div className="space-y-6 max-w-[80%]">
      <h2 className="text-xl font-bold mb-2 text-white">HOTEL THEMES AND ACTIVITIES</h2>
      
      <div className="space-y-8">
        <DirectThemes 
          themes={getAllDirectThemes()}
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
      
      {!isValid && (
        <div className="p-4 bg-red-500/30 rounded-md">
          <p className="text-white">Please select at least one theme and one activity.</p>
        </div>
      )}
    </div>
  );
}
