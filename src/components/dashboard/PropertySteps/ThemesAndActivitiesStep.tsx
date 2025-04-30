
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
      // Ensure we only use valid UUIDs
      const validUUIDRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
      const validActivities = formData.activities.filter((id: string) => {
        if (!id) return false;
        const isValid = typeof id === 'string' && validUUIDRegex.test(id);
        if (!isValid) {
          console.warn(`Filtering out invalid activity ID: ${id}`);
        }
        return isValid;
      });
      setSelectedActivities(validActivities);
    }
  }, [formData.themes, formData.activities]);

  // Update parent form data when local state changes
  useEffect(() => {
    console.log("Updating themes in formData:", selectedThemes);
    // For themes, we accept any string values - no UUID validation
    updateFormData('themes', selectedThemes);
    
    // For activities, we still enforce UUID format
    const validUUIDRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    const validActivities = selectedActivities.filter(id => {
      if (!id) return false;
      const isValid = typeof id === 'string' && validUUIDRegex.test(id);
      if (!isValid) {
        console.error(`Not updating formData with invalid activity ID: ${id}`);
      }
      return isValid;
    });
    
    console.log("Updating activities in formData:", validActivities);
    updateFormData('activities', validActivities);
    
    // Validate - at least one theme and one activity must be selected
    const valid = selectedThemes.length > 0 && validActivities.length > 0;
    setIsValid(valid);
    onValidationChange(valid);
  }, [selectedThemes, selectedActivities, updateFormData, onValidationChange, toast]);

  const handleThemeSelect = (themeId: string, isSelected: boolean) => {
    if (isSelected) {
      setSelectedThemes(prev => [...prev, themeId]);
    } else {
      setSelectedThemes(prev => prev.filter(id => id !== themeId));
    }
    console.log("Theme selection changed:", themeId, isSelected);
  };

  const handleActivityChange = (activityId: string, isChecked: boolean) => {
    console.log(`Activity change in ThemesAndActivitiesStep: ${activityId} is now ${isChecked ? 'selected' : 'deselected'}`);
    
    // Verify this is a valid UUID before adding to selected activities
    const validUUIDRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!validUUIDRegex.test(activityId)) {
      console.error(`Rejected invalid activity ID: "${activityId}"`);
      toast({
        title: "Invalid Activity Selection",
        description: "Unable to select this activity due to an invalid identifier.",
        variant: "destructive",
      });
      return;
    }
    
    setSelectedActivities(prev => 
      isChecked 
        ? [...prev, activityId]
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
