import React, { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { AffinitiesSection } from "./themes/AffinitiesSection";
import { ActivitiesSection } from "./activities/ActivitiesSection";
import HotelFeaturesStep from "./HotelFeaturesStep";
import { useTranslation } from "@/hooks/useTranslation";
export interface GeneralInformationStep2Props {
  formData: any;
  updateFormData: (field: string, value: any) => void;
  onValidationChange?: (isValid: boolean) => void;
}
export function GeneralInformationStep2({
  formData,
  updateFormData,
  onValidationChange = () => {}
}: GeneralInformationStep2Props) {
  const {
    t
  } = useTranslation();
  const [selectedThemes, setSelectedThemes] = useState<string[]>(formData.themes || []);
  const [selectedActivities, setSelectedActivities] = useState<string[]>(formData.activities || []);
  const {
    toast
  } = useToast();
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

    // Validate based on the requirements in stepsConfig
    const isValid = selectedThemes.length > 0 && selectedActivities.length > 0 && formData.roomTypes && formData.roomTypes.length > 0;
    onValidationChange(isValid);
  }, [selectedThemes, selectedActivities, formData.roomTypes, updateFormData, onValidationChange]);
  const handleThemeSelect = (themeId: string, isSelected: boolean) => {
    if (isSelected) {
      setSelectedThemes(prev => [...prev, themeId]);
    } else {
      setSelectedThemes(prev => prev.filter(id => id !== themeId));
    }
  };
  const handleActivityChange = (activity: string, isChecked: boolean) => {
    setSelectedActivities(prev => isChecked ? [...prev, activity] : prev.filter(a => a !== activity));
  };
  return <div className="space-y-6 max-w-[80%]">
      <div className="text-center mb-6">
        
        
      </div>

      <div className="space-y-8">
        <AffinitiesSection selectedThemes={selectedThemes} onThemeSelect={handleThemeSelect} openCategory={openCategory} setOpenCategory={setOpenCategory} openSubmenu={openSubmenu} setOpenSubmenu={setOpenSubmenu} />
        
        <ActivitiesSection selectedActivities={selectedActivities} onActivityChange={handleActivityChange} />
        
        <HotelFeaturesStep onValidationChange={onValidationChange} formData={formData} updateFormData={updateFormData} />
      </div>
    </div>;
}