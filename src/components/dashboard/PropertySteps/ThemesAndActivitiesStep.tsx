
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
  const [showValidationWarning, setShowValidationWarning] = useState<boolean>(false);
  
  // Sync local state with formData when it changes (e.g., when navigating back to this step)
  useEffect(() => {
    if (formData.themes && Array.isArray(formData.themes)) {
      setSelectedThemes(formData.themes);
    }
    
    if (formData.activities && Array.isArray(formData.activities)) {
      setSelectedActivities(formData.activities);
    }
  }, [formData.themes, formData.activities]);
  
  const handleThemeSelection = (themeId: string, isSelected: boolean) => {
    setSelectedThemes(prev => {
      let newThemes;
      if (isSelected) {
        if (!prev.includes(themeId)) {
          toast({
            title: "Affinity selected",
            description: "The affinity has been added to your selection"
          });
        }
        newThemes = [...prev.filter(id => id !== themeId), themeId];
      } else {
        newThemes = prev.filter(id => id !== themeId);
      }
      
      // Update parent form data immediately when selection changes
      updateFormData('themes', newThemes);
      
      return newThemes;
    });
  };

  const handleActivityChange = (activity: string, isChecked: boolean) => {
    setSelectedActivities(prev => {
      const newActivities = isChecked 
        ? [...prev, activity]
        : prev.filter(a => a !== activity);
      
      // Update parent form data immediately when selection changes
      updateFormData('activities', newActivities);
      
      return newActivities;
    });
  };

  useEffect(() => {
    const isValid = selectedThemes.length > 0;
    
    // Only show validation warning if user has interacted with the form
    // and there's an attempt to validate with no themes selected
    if (selectedThemes.length === 0 && showValidationWarning) {
      setShowValidationWarning(true);
    } else if (selectedThemes.length > 0) {
      setShowValidationWarning(false);
    }
    
    onValidationChange(isValid);
  }, [selectedThemes, onValidationChange, showValidationWarning]);

  // When a user interacts with either the themes or activities sections,
  // we consider them to have started filling out the form
  useEffect(() => {
    const handleFormInteraction = () => {
      if (selectedThemes.length === 0) {
        setShowValidationWarning(true);
      }
    };

    // Listen for navigation attempt events from the parent form
    window.addEventListener('attemptStepNavigation', handleFormInteraction as any);
    
    return () => {
      window.removeEventListener('attemptStepNavigation', handleFormInteraction as any);
    };
  }, [selectedThemes.length]);
  
  return (
    <div className="space-y-8 max-w-[80%]">
      {selectedThemes.length === 0 && showValidationWarning && (
        <div className="bg-purple-700 text-white p-4 rounded-lg mb-4">
          <h3 className="text-lg font-semibold mb-2">Please complete all required fields:</h3>
          <ul className="list-disc list-inside">
            <li>Affinities</li>
            <li>Activities</li>
          </ul>
        </div>
      )}

      <AffinitiesSection
        openCategory={openCategory}
        setOpenCategory={setOpenCategory}
        openSubmenu={openSubmenu}
        setOpenSubmenu={setOpenSubmenu}
        onThemeSelect={handleThemeSelection}
        selectedThemes={selectedThemes} // Pass selected themes to properly check/uncheck options
      />

      <ActivitiesSection
        selectedActivities={selectedActivities}
        onActivityChange={handleActivityChange}
      />

      <CustomActivitiesSection />
    </div>
  );
}
