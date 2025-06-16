import React, { useState, useEffect, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";
import AffinitiesSection from "./themes/AffinitiesSection";
import { ActivitiesSection } from "./activities/ActivitiesSection";
import HotelFeaturesStep from "./HotelFeaturesStep";

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
  const [selectedThemes, setSelectedThemes] = useState<string[]>([]);
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);
  const { toast } = useToast();
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  // Initialize local state from formData only once
  useEffect(() => {
    if (formData.themes && Array.isArray(formData.themes)) {
      setSelectedThemes(formData.themes);
    }
    if (formData.activities && Array.isArray(formData.activities)) {
      setSelectedActivities(formData.activities);
    }
  }, []); // Only run once on mount

  // Stable validation function
  const validateForm = useCallback(() => {
    const isValid = selectedThemes.length > 0 && selectedActivities.length > 0 && formData.roomTypes && formData.roomTypes.length > 0;
    onValidationChange(isValid);
  }, [selectedThemes.length, selectedActivities.length, formData.roomTypes?.length, onValidationChange]);

  // Update form data when local state changes
  useEffect(() => {
    updateFormData('themes', selectedThemes);
  }, [selectedThemes, updateFormData]);

  useEffect(() => {
    updateFormData('activities', selectedActivities);
  }, [selectedActivities, updateFormData]);

  // Run validation when dependencies change
  useEffect(() => {
    validateForm();
  }, [validateForm]);

  const handleThemeSelect = useCallback((themeId: string, isSelected: boolean) => {
    if (isSelected) {
      setSelectedThemes(prev => [...prev, themeId]);
    } else {
      setSelectedThemes(prev => prev.filter(id => id !== themeId));
    }
  }, []);

  const handleActivityChange = useCallback((activity: string, isChecked: boolean) => {
    setSelectedActivities(prev => isChecked ? [...prev, activity] : prev.filter(a => a !== activity));
  }, []);

  return (
    <div className="space-y-6 max-w-[80%]">
      <div className="space-y-8">
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
        
        <HotelFeaturesStep 
          onValidationChange={onValidationChange} 
          formData={formData} 
          updateFormData={updateFormData} 
        />
      </div>
    </div>
  );
}
