
import React, { useEffect, useState } from "react";
import { PropertyFormData } from "../hooks/usePropertyFormData";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { DirectThemes } from "../components/DirectThemes";
import { ActivitiesSection } from "../components/ActivitiesSection";
import { FeaturesList } from "../components/FeaturesList";

interface GeneralInformationStep2Props {
  formData: PropertyFormData;
  updateFormData: (field: string, value: any) => void;
  onValidationChange?: (isValid: boolean) => void;
}

export const GeneralInformationStep2 = ({
  formData,
  updateFormData,
  onValidationChange = () => {}
}: GeneralInformationStep2Props) => {
  const [selectedThemes, setSelectedThemes] = useState<string[]>(formData.themes || []);
  const [selectedActivities, setSelectedActivities] = useState<string[]>(formData.activities || []);
  const [hotelFeatures, setHotelFeatures] = useState<Record<string, boolean>>(formData.featuresHotel || {});
  const [roomFeatures, setRoomFeatures] = useState<Record<string, boolean>>(formData.featuresRoom || {});
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  useEffect(() => {
    if (formData.themes && formData.themes.length > 0) {
      setSelectedThemes(formData.themes);
    }
    
    if (formData.activities && formData.activities.length > 0) {
      setSelectedActivities(formData.activities);
    }

    if (formData.featuresHotel) {
      setHotelFeatures(formData.featuresHotel);
    }
    
    if (formData.featuresRoom) {
      setRoomFeatures(formData.featuresRoom);
    }
  }, [formData]);

  useEffect(() => {
    // Update parent form data when local state changes
    updateFormData('themes', selectedThemes);
    updateFormData('activities', selectedActivities);
    updateFormData('featuresHotel', hotelFeatures);
    updateFormData('featuresRoom', roomFeatures);
    
    // Check if any themes and activities are selected
    const isValid = 
      (selectedThemes && selectedThemes.length > 0) || 
      (selectedActivities && selectedActivities.length > 0);
    
    onValidationChange(isValid);
  }, [selectedThemes, selectedActivities, hotelFeatures, roomFeatures, updateFormData, onValidationChange]);

  const handleThemeSelect = (themeId: string, isSelected: boolean) => {
    if (isSelected) {
      setSelectedThemes(prev => [...prev, themeId]);
    } else {
      setSelectedThemes(prev => prev.filter(id => id !== themeId));
    }
  };

  const handleActivityChange = (activityId: string, isChecked: boolean) => {
    setSelectedActivities(prev => 
      isChecked 
        ? [...prev, activityId]
        : prev.filter(a => a !== activityId)
    );
  };

  const handleHotelFeatureChange = (featureKey: string, isChecked: boolean) => {
    setHotelFeatures(prev => ({
      ...prev,
      [featureKey]: isChecked
    }));
  };

  const handleRoomFeatureChange = (featureKey: string, isChecked: boolean) => {
    setRoomFeatures(prev => ({
      ...prev,
      [featureKey]: isChecked
    }));
  };

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Affinities and Themes</h3>
        <p className="text-sm text-gray-400">
          Select themes that match your hotel's unique character and attractions
        </p>
        <DirectThemes 
          selectedThemes={selectedThemes}
          onThemeSelect={handleThemeSelect}
          openCategory={openCategory}
          setOpenCategory={setOpenCategory}
          openSubmenu={openSubmenu}
          setOpenSubmenu={setOpenSubmenu}
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Activities</h3>
        <p className="text-sm text-gray-400">
          Select activities available at or near your property
        </p>
        <ActivitiesSection 
          selectedActivities={selectedActivities}
          onActivityChange={handleActivityChange}
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Hotel Features</h3>
        <p className="text-sm text-gray-400">
          Select amenities and features available at your property
        </p>
        <FeaturesList 
          type="hotel"
          features={hotelFeatures}
          onChange={handleHotelFeatureChange}
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Room Features</h3>
        <p className="text-sm text-gray-400">
          Select amenities and features available in your rooms
        </p>
        <FeaturesList 
          type="room"
          features={roomFeatures}
          onChange={handleRoomFeatureChange}
        />
      </div>
    </div>
  );
};
