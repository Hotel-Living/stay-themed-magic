
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

  // Always set validation to true to allow navigation
  useEffect(() => {
    onValidationChange(true);
  }, [onValidationChange]);

  const handleThemeSelect = (themeId: string, isSelected: boolean) => {
    console.log('THEMES - Theme selection:', { themeId, isSelected });
    const currentThemes = Array.isArray(formData.themes) ? formData.themes : [];
    const updatedThemes = isSelected 
      ? [...currentThemes, themeId]
      : currentThemes.filter((id: string) => id !== themeId);
    console.log('THEMES - Updated themes:', updatedThemes);
    updateFormData('themes', updatedThemes);
    // Also update affinities field for consistency
    updateFormData('affinities', updatedThemes);
  };

  const handleActivityChange = (activity: string, isChecked: boolean) => {
    console.log('ACTIVITIES - Activity selection:', { activity, isChecked });
    const currentActivities = Array.isArray(formData.activities) ? formData.activities : [];
    const updatedActivities = isChecked
      ? [...currentActivities, activity]
      : currentActivities.filter((a: string) => a !== activity);
    console.log('ACTIVITIES - Updated activities:', updatedActivities);
    updateFormData('activities', updatedActivities);
  };

  const handleFeatureToggle = (featureType: 'hotel' | 'room', feature: string) => {
    console.log('FEATURES - Feature toggle:', { featureType, feature });
    const fieldName = featureType === 'hotel' ? 'featuresHotel' : 'featuresRoom';
    const currentFeatures = Array.isArray(formData[fieldName]) ? formData[fieldName] : [];
    const updatedFeatures = currentFeatures.includes(feature)
      ? currentFeatures.filter((f: string) => f !== feature)
      : [...currentFeatures, feature];
    console.log('FEATURES - Updated features:', { fieldName, updatedFeatures });
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
          selectedThemes={Array.isArray(formData.themes) ? formData.themes : []}
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
          selectedActivities={Array.isArray(formData.activities) ? formData.activities : []}
          onActivityChange={handleActivityChange}
        />
      </div>

      {/* Hotel Features */}
      <div className="bg-purple-900/30 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">{t('dashboard.hotelFeatures')}</h3>
        <FeaturesList
          features={hotelFeatures}
          selectedFeatures={Array.isArray(formData.featuresHotel) ? formData.featuresHotel : []}
          onToggle={(feature) => handleFeatureToggle('hotel', feature)}
        />
      </div>

      {/* Room Features */}
      <div className="bg-purple-900/30 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">{t('dashboard.roomFeatures')}</h3>
        <FeaturesList
          features={roomFeatures}
          selectedFeatures={Array.isArray(formData.featuresRoom) ? formData.featuresRoom : []}
          onToggle={(feature) => handleFeatureToggle('room', feature)}
        />
      </div>
    </div>
  );
};

export default GeneralInformationStep2;
