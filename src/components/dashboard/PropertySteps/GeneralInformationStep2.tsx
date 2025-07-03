
import React, { useState, useEffect } from "react";
import { useTranslation } from "@/hooks/useTranslation";
import { AffinitiesSection } from "./themes/AffinitiesSection";
import { ActivitiesSection } from "./activities/ActivitiesSection";
import { FeaturesList } from "./features/FeaturesList";
import { hotelFeatures, roomFeatures } from "./features/featuresData";

interface GeneralInformationStep2Props {
  formData: any;
  updateFormData: (field: string, value: any) => void;
  onValidationChange: (isValid: boolean) => void;
}

const GeneralInformationStep2: React.FC<GeneralInformationStep2Props> = ({
  formData,
  updateFormData,
  onValidationChange
}) => {
  const { t } = useTranslation();
  const [validationState, setValidationState] = useState({
    affinities: false,
    activities: false
  });

  // Validate step completion
  useEffect(() => {
    const hasAffinities = formData.themes && formData.themes.length > 0;
    const hasActivities = formData.activities && formData.activities.length > 0;
    
    const newValidationState = {
      affinities: hasAffinities,
      activities: hasActivities
    };
    
    setValidationState(newValidationState);
    
    // Step is valid if both sections have data
    const isValid = hasAffinities && hasActivities;
    onValidationChange(isValid);
  }, [formData.themes, formData.activities, onValidationChange]);

  const handleThemeSelect = (themeId: string, isSelected: boolean) => {
    const currentThemes = formData.themes || [];
    const updatedThemes = isSelected 
      ? [...currentThemes, themeId]
      : currentThemes.filter((id: string) => id !== themeId);
    updateFormData('themes', updatedThemes);
  };

  const handleActivityChange = (activity: string, isChecked: boolean) => {
    const currentActivities = formData.activities || [];
    const updatedActivities = isChecked
      ? [...currentActivities, activity]
      : currentActivities.filter((a: string) => a !== activity);
    updateFormData('activities', updatedActivities);
  };

  const handleFeatureToggle = (featureType: 'hotel' | 'room', feature: string) => {
    const fieldName = featureType === 'hotel' ? 'featuresHotel' : 'featuresRoom';
    const currentFeatures = formData[fieldName] || [];
    const updatedFeatures = currentFeatures.includes(feature)
      ? currentFeatures.filter((f: string) => f !== feature)
      : [...currentFeatures, feature];
    updateFormData(fieldName, updatedFeatures);
  };

  return (
    <div className="space-y-8 max-w-[80%]">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">{t('dashboard.stepTitles.hotelProfile')}</h2>
        <p className="text-gray-300">Define your hotel's personality, activities, and features</p>
      </div>

      {/* Affinities Section */}
      <div className="bg-purple-900/30 rounded-lg p-6">
        <AffinitiesSection
          selectedThemes={formData.themes || []}
          onThemeSelect={handleThemeSelect}
          openCategory={null}
          setOpenCategory={() => {}}
          openSubmenu={null}
          setOpenSubmenu={() => {}}
        />
      </div>

      {/* Activities Section */}
      <div className="bg-purple-900/30 rounded-lg p-6">
        <ActivitiesSection
          selectedActivities={formData.activities || []}
          onActivityChange={handleActivityChange}
        />
      </div>

      {/* Hotel Features */}
      <div className="bg-purple-900/30 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">{t('dashboard.hotelFeatures')}</h3>
        <FeaturesList
          features={hotelFeatures}
          selectedFeatures={formData.featuresHotel || []}
          onToggle={(feature) => handleFeatureToggle('hotel', feature)}
        />
      </div>

      {/* Room Features */}
      <div className="bg-purple-900/30 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">{t('dashboard.roomFeatures')}</h3>
        <FeaturesList
          features={roomFeatures}
          selectedFeatures={formData.featuresRoom || []}
          onToggle={(feature) => handleFeatureToggle('room', feature)}
        />
      </div>
    </div>
  );
};

export default GeneralInformationStep2;
